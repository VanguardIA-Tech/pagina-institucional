import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Mic, MicOff, Sparkles } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type OrbState = 'idle' | 'listening' | 'speaking'
const MAX_RESPONSES_PER_SESSION = 8

const COLORS: Record<OrbState, { core: string; particle: string; glow: string }> = {
  idle: {
    core: '#2046EA',
    particle: '#6B3FA0',
    glow: 'rgba(32, 70, 234, 0.45)',
  },
  listening: {
    core: '#FF6B1A',
    particle: '#FF9550',
    glow: 'rgba(255, 107, 26, 0.55)',
  },
  speaking: {
    core: '#4A7BFF',
    particle: '#6B3FA0',
    glow: 'rgba(74, 123, 255, 0.6)',
  },
}

type OrbParticlesProps = {
  state: OrbState
  amplitudeRef: React.MutableRefObject<number>
  pointCount: number
}

function OrbParticles({ state, amplitudeRef, pointCount }: OrbParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)

  const { positions, basePositions } = useMemo(() => {
    const base = new Float32Array(pointCount * 3)
    let seed = 77777
    const random = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < pointCount; i++) {
      // Fibonacci sphere for even distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / pointCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 1 + (random() - 0.5) * 0.08
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      base[i * 3 + 2] = r * Math.cos(phi)
    }
    return { positions: new Float32Array(base), basePositions: base }
  }, [pointCount])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useEffect(() => () => geometry.dispose(), [geometry])

  const colorObj = useMemo(() => new THREE.Color(COLORS[state].particle), [state])

  useFrame((_, delta) => {
    const pts = pointsRef.current
    if (!pts) return
    timeRef.current += delta

    const spin =
      state === 'listening' ? 0.35 : state === 'speaking' ? 0.55 : 0.18
    pts.rotation.y += delta * spin
    pts.rotation.x += delta * spin * 0.3

    const amp = amplitudeRef.current
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    const displacement =
      state === 'listening'
        ? -0.18 + Math.sin(timeRef.current * 4) * 0.04
        : state === 'speaking'
          ? 0.12 + amp * 0.55
          : Math.sin(timeRef.current * 1.2) * 0.05

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i]
      const by = basePositions[i + 1]
      const bz = basePositions[i + 2]
      const len = Math.sqrt(bx * bx + by * by + bz * bz)
      const scale = (1 + displacement) / len
      arr[i] = bx * scale
      arr[i + 1] = by * scale
      arr[i + 2] = bz * scale
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={colorObj}
        size={0.04}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function OrbCore({ state }: { state: OrbState }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)
  const color = useMemo(() => new THREE.Color(COLORS[state].core), [state])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (!meshRef.current) return
    const pulse = 1 + Math.sin(timeRef.current * (state === 'idle' ? 1.5 : 4)) * 0.06
    meshRef.current.scale.setScalar(pulse * 0.42)
    meshRef.current.rotation.y += delta * 0.2
    meshRef.current.rotation.x += delta * 0.12
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.55}
        wireframe
      />
    </mesh>
  )
}

type OrbVoiceAgentProps = {
  /** Backend endpoint that creates the Realtime WebRTC session from an SDP offer. */
  tokenEndpoint?: string
  /** Fallback endpoint that mints an ephemeral Realtime client secret. */
  fallbackTokenEndpoint?: string
}

export default function OrbVoiceAgent({
  tokenEndpoint = '/api/realtime/session',
  fallbackTokenEndpoint = '/api/realtime/token',
}: OrbVoiceAgentProps) {
  const [state, setState] = useState<OrbState>('idle')
  const [isMobile, setIsMobile] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const micAnalyserRef = useRef<AnalyserNode | null>(null)
  const remoteAnalyserRef = useRef<AnalyserNode | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const amplitudeRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const responseCountRef = useRef<number>(0)

  const [animationDone, setAnimationDone] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDone(true)
    }, reduceMotion ? 100 : 2000)
    return () => clearTimeout(timer)
  }, [reduceMotion])

  // Animation frame loop for amplitude analysis
  useEffect(() => {
    const tick = () => {
      let amp = 0
      const activeAnalyser = state === 'speaking' ? remoteAnalyserRef.current : micAnalyserRef.current
      if (activeAnalyser) {
        const dataArray = new Uint8Array(activeAnalyser.frequencyBinCount)
        activeAnalyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        amp = sum / (dataArray.length * 255)
      }
      amplitudeRef.current = amp
      rafRef.current = requestAnimationFrame(tick)
    }

    if (state !== 'idle') {
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [state])

  const stopSession = useCallback(() => {
    setState('idle')
    responseCountRef.current = 0
    if (pcRef.current) {
      pcRef.current.close()
      pcRef.current = null
    }
    if (dcRef.current) {
      dcRef.current.close()
      dcRef.current = null
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop())
      micStreamRef.current = null
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {})
      audioCtxRef.current = null
    }
    micAnalyserRef.current = null
    remoteAnalyserRef.current = null
    if (audioRef.current) {
      audioRef.current.srcObject = null
    }
    amplitudeRef.current = 0
  }, [])

  const startSession = useCallback(async () => {
    try {
      setError(null)
      setState('listening')

      // 1. Get microphone access
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Microphone API not available')
      }
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      micStreamRef.current = micStream

      // 2. Set up Audio Context and local microphone analyser
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const audioCtx = new AC()
      audioCtxRef.current = audioCtx

      const micSource = audioCtx.createMediaStreamSource(micStream)
      const micAnalyser = audioCtx.createAnalyser()
      micAnalyser.fftSize = 128
      micAnalyser.smoothingTimeConstant = 0.75
      micSource.connect(micAnalyser)
      micAnalyserRef.current = micAnalyser

      // 3. Create local RTCPeerConnection with STUN server
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      })
      pcRef.current = pc

      // 4. Add local mic track to WebRTC
      const track = micStream.getTracks()[0]
      if (!track) {
        throw new Error('Nenhuma faixa de áudio encontrada no microfone.')
      }
      pc.addTrack(track, micStream)

      // 5. Handle remote track (AI speech)
      const audioEl = audioRef.current
      if (!audioEl) {
        throw new Error('Elemento de áudio não inicializado.')
      }

      pc.ontrack = (e) => {
        const remoteStream = e.streams[0]
        audioEl.srcObject = remoteStream

        // Create remote speaking analyser
        const remoteSource = audioCtx.createMediaStreamSource(remoteStream)
        const remoteAnalyser = audioCtx.createAnalyser()
        remoteAnalyser.fftSize = 128
        remoteAnalyser.smoothingTimeConstant = 0.75
        remoteSource.connect(remoteAnalyser)
        remoteAnalyserRef.current = remoteAnalyser
      }

      // 6. Create data channel
      const dc = pc.createDataChannel('oai-events')
      dcRef.current = dc

      const sendRealtimeEvent = (event: unknown) => {
        if (dc.readyState !== 'open') return
        dc.send(JSON.stringify(event))
      }

      const handleKnowledgeSearch = async (callId: string, rawArguments: string) => {
        let query: string
        try {
          const args = JSON.parse(rawArguments || '{}') as { query?: string }
          query = typeof args.query === 'string' ? args.query : ''
        } catch {
          query = ''
        }

        try {
          const knowledgeRes = await fetch('/api/knowledge/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
          })
          const output = knowledgeRes.ok
            ? await knowledgeRes.json()
            : { error: await knowledgeRes.text() }

          sendRealtimeEvent({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: callId,
              output: JSON.stringify(output),
            },
          })
          sendRealtimeEvent({ type: 'response.create' })
        } catch (toolErr) {
          sendRealtimeEvent({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: callId,
              output: JSON.stringify({
                error: toolErr instanceof Error ? toolErr.message : String(toolErr),
              }),
            },
          })
          sendRealtimeEvent({ type: 'response.create' })
        }
      }

      dc.onopen = () => {
        console.log('OpenAI Realtime Data Channel connected')
      }

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data)
          // Handle AI speech indicator events to change state dynamically
          if (
            event.type === 'response.audio.delta' ||
            event.type === 'response.output_audio.delta' ||
            event.type === 'response.audio_transcript.delta'
          ) {
            setState('speaking')
          }
          if (event.type === 'response.done') {
            responseCountRef.current += 1
            if (responseCountRef.current >= MAX_RESPONSES_PER_SESSION) {
              setError('Limite de interações atingido. Reabra a conversa para continuar.')
              stopSession()
              return
            }
            setState('listening')
          }
          if (event.type === 'input_audio_buffer.speech_started') {
            setState('listening')
          }
          if (
            event.type === 'response.function_call_arguments.done' &&
            event.name === 'search_vanguardia_knowledge' &&
            typeof event.call_id === 'string'
          ) {
            handleKnowledgeSearch(event.call_id, event.arguments ?? '')
          }
          if (
            event.type === 'response.output_item.done' &&
            event.item?.type === 'function_call' &&
            event.item?.name === 'search_vanguardia_knowledge' &&
            typeof event.item?.call_id === 'string'
          ) {
            handleKnowledgeSearch(event.item.call_id, event.item.arguments ?? '')
          }
        } catch {
          // Ignore
        }
      }

      // 7. Create WebRTC offer
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      // Wait for ICE gathering to complete so all candidates are included in the SDP offer
      await new Promise<void>((resolve) => {
        if (pc.iceGatheringState === 'complete') {
          resolve()
        } else {
          const checkState = () => {
            if (pc.iceGatheringState === 'complete') {
              pc.removeEventListener('icegatheringstatechange', checkState)
              resolve()
            }
          }
          pc.addEventListener('icegatheringstatechange', checkState)
        }
      })

      // 8. Send local SDP to our backend, which creates the OpenAI Realtime call
      const sdpRes = await fetch(tokenEndpoint, {
        method: 'POST',
        body: pc.localDescription?.sdp ?? offer.sdp,
        headers: {
          'Content-Type': 'application/sdp',
        },
      })

      let answerSdp: string
      if (sdpRes.ok) {
        answerSdp = await sdpRes.text()
      } else {
        const errText = await sdpRes.text()
        console.warn('Backend Realtime session failed, trying ephemeral token fallback:', errText)

        const tokenRes = await fetch(fallbackTokenEndpoint, { method: 'POST' })
        if (!tokenRes.ok) {
          const tokenErrText = await tokenRes.text()
          throw new Error(`OpenAI Realtime connection failed: ${errText || tokenErrText}`)
        }

        const session = await tokenRes.json()
        const token = session.client_secret?.value ?? session.value
        if (!token) {
          throw new Error('No client token received from backend')
        }

        const fallbackSdpRes = await fetch('https://api.openai.com/v1/realtime/calls', {
          method: 'POST',
          body: pc.localDescription?.sdp ?? offer.sdp,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/sdp',
          },
        })

        if (!fallbackSdpRes.ok) {
          const fallbackErrText = await fallbackSdpRes.text()
          throw new Error(`OpenAI Realtime connection failed: ${fallbackErrText}`)
        }

        answerSdp = await fallbackSdpRes.text()
      }

      // 9. Complete connection with answer
      const answer = {
        type: 'answer' as RTCSdpType,
        sdp: answerSdp,
      }
      await pc.setRemoteDescription(answer)

    } catch (err) {
      console.error(err)
      const msg = err instanceof Error ? err.message : String(err)
      const stack = err instanceof Error ? err.stack : undefined
      setError(msg)
      
      // Log to backend
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, stack, userAgent: navigator.userAgent })
      }).catch(() => {})

      stopSession()
    }
  }, [tokenEndpoint, fallbackTokenEndpoint, stopSession])

  // Global uncaught error logging helper
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: event.message,
          stack: event.error?.stack,
          userAgent: navigator.userAgent
        })
      }).catch(() => {})
    }
    window.addEventListener('error', handleGlobalError)
    return () => window.removeEventListener('error', handleGlobalError)
  }, [])

  const onToggle = useCallback(() => {
    if (state === 'idle') {
      startSession()
    } else {
      stopSession()
    }
  }, [state, startSession, stopSession])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pcRef.current) pcRef.current.close()
      if (dcRef.current) dcRef.current.close()
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const orbSize = isMobile ? 120 : 180
  const colors = COLORS[state]

  const label =
    state === 'listening'
      ? 'Parar de ouvir'
      : state === 'speaking'
        ? 'Encerrar conversa'
        : 'Conversar com a VanguardIA'

  return (
    <div
      aria-live="polite"
      className="fixed z-50 pointer-events-none"
      style={
        isMobile
          ? { bottom: 16, right: 16 }
          : { bottom: 24, right: 24 }
      }
    >
      <audio ref={audioRef} autoPlay style={{ display: 'none' }} />
      <AnimatePresence>
        {tooltipOpen && state === 'idle' && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.18 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-va-black/90 backdrop-blur-md border border-white/15 px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] text-white shadow-2xl pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        onFocus={() => setTooltipOpen(true)}
        onBlur={() => setTooltipOpen(false)}
        aria-label={label}
        aria-pressed={state !== 'idle'}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.2, duration: 0.6 }}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        className="pointer-events-auto relative rounded-full overflow-hidden border border-white/10 cursor-pointer"
        style={{
          width: orbSize,
          height: orbSize,
          background:
            'radial-gradient(circle at 50% 45%, rgba(11,26,62,0.95) 0%, rgba(10,10,15,0.98) 70%)',
          boxShadow: `0 0 60px ${colors.glow}, inset 0 0 30px rgba(0,0,0,0.6)`,
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {animationDone && (
          <Canvas
            camera={{ position: [0, 0, 3.4], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[2, 2, 2]} intensity={0.7} />
            <OrbCore state={state} />
            <OrbParticles
              state={state}
              amplitudeRef={amplitudeRef}
              pointCount={isMobile ? 500 : 1200}
            />
          </Canvas>
        )}

        {/* Audio rings on speaking */}
        <AnimatePresence>
          {state === 'speaking' && !reduceMotion && (
            <>
              {[0, 0.4, 0.8].map((delay) => (
                <motion.span
                  key={delay}
                  aria-hidden="true"
                  initial={{ scale: 0.6, opacity: 0.6 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* State icon overlay */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md pointer-events-none"
          style={{
            background: 'rgba(10,10,15,0.6)',
            color:
              state === 'listening'
                ? 'var(--color-va-orange-vivid)'
                : state === 'speaking'
                  ? 'var(--color-va-blue-glow)'
                  : 'var(--color-va-gray-200)',
          }}
        >
          {state === 'listening' ? (
            <Mic size={14} />
          ) : state === 'speaking' ? (
            <Sparkles size={14} />
          ) : (
            <MicOff size={14} />
          )}
        </span>
      </motion.button>

      {error && (
        <p
          role="status"
          className="absolute top-full mt-2 right-0 max-w-[220px] text-[10px] font-mono uppercase tracking-[0.12em] text-va-orange-glow text-right pointer-events-none"
        >
          {error}
        </p>
      )}
    </div>
  )
}
