import { useEffect, useMemo, useRef, useState } from 'react'

type FrequencyData = Uint8Array<ArrayBuffer>

export type AudioVisualizer = {
  /** Shared Uint8Array of frequency bins — updated in place each frame. */
  data: FrequencyData
  /** Average normalized amplitude across bins (0–1), updated each frame. */
  amplitudeRef: React.MutableRefObject<number>
  /** True if the mic stream is live. */
  active: boolean
  /** Error message if mic access failed. */
  error: string | null
}

type Options = {
  enabled: boolean
  fftSize?: number
}

export default function useAudioVisualizer({
  enabled,
  fftSize = 128,
}: Options): AudioVisualizer {
  const bins = fftSize / 2
  const data = useMemo(() => new Uint8Array(new ArrayBuffer(bins)), [bins])
  const amplitudeRef = useRef<number>(0)
  const [active, setActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false
    let stream: MediaStream | null = null
    let ctx: AudioContext | null = null
    let analyser: AnalyserNode | null = null
    let source: MediaStreamAudioSourceNode | null = null
    let rafId = 0

    const start = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Microphone API not available')
        }
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext
        ctx = new AC()
        analyser = ctx.createAnalyser()
        analyser.fftSize = fftSize
        analyser.smoothingTimeConstant = 0.75
        source = ctx.createMediaStreamSource(stream)
        source.connect(analyser)

        setActive(true)

        const tick = () => {
          if (cancelled || !analyser) return
          analyser.getByteFrequencyData(data)
          let sum = 0
          for (let i = 0; i < data.length; i++) {
            sum += data[i]
          }
          amplitudeRef.current = sum / (data.length * 255)
          rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Microphone access denied')
          setActive(false)
        }
      }
    }

    start()

    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
      try {
        source?.disconnect()
        analyser?.disconnect()
      } catch {
        /* noop */
      }
      stream?.getTracks().forEach((t) => t.stop())
      if (ctx && ctx.state !== 'closed') {
        ctx.close().catch(() => {})
      }
      amplitudeRef.current = 0
      setActive(false)
    }
  }, [enabled, fftSize, data])

  return { data, amplitudeRef, active, error }
}
