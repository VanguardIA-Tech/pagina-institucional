"use client";

import {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type OrbState = "companion" | "listener" | "oracle";

const springConfig = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

function OrbCore({
  state,
  analyserData,
}: {
  state: OrbState;
  analyserData?: Uint8Array;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const barsRef = useRef<THREE.Group>(null);

  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.4 + Math.random() * 0.6;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const barCount = 32;
  const bars = useMemo(
    () =>
      Array.from({ length: barCount }).map((_, i) => {
        const angle = (i / barCount) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.04, 0.3, 0.02]} />
            <meshBasicMaterial color="#4A63FF" transparent opacity={0.6} />
          </mesh>
        );
      }),
    []
  );

  useFrame((state3d) => {
    const t = state3d.clock.getElapsedTime();
    const active = state !== "companion";

    if (meshRef.current) {
      const pulseAmount = state === "listener" ? 0.06 : 0.03;
      meshRef.current.scale.setScalar(
        1 + Math.sin(t * 2) * pulseAmount * (active ? 2 : 1)
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += state === "listener" ? 0.008 : 0.003;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      ringRef.current.scale.setScalar(
        1 + Math.sin(t * 1.5) * 0.05 * (active ? 3 : 1)
      );
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += state === "listener" ? 0.003 : 0.001;
      particlesRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (barsRef.current && analyserData && state === "listener") {
      barsRef.current.visible = true;
      barsRef.current.children.forEach((bar, i) => {
        const val = (analyserData[i * 4] ?? 0) / 255;
        bar.scale.y = 0.2 + val * 1.5;
        bar.scale.x = 1 + val * 0.5;
      });
    } else if (barsRef.current) {
      barsRef.current.visible = false;
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#1F3CFF"
          transparent
          opacity={state === "listener" ? 0.7 : state === "oracle" ? 0.9 : 0.3}
        />
      </mesh>
      {/* Glow ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.15, 0.015, 16, 100]} />
        <meshBasicMaterial
          color="#4A63FF"
          transparent
          opacity={state === "listener" ? 0.9 : state === "oracle" ? 1 : 0.4}
        />
      </mesh>
      {/* Particle cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4A63FF"
          size={0.03}
          transparent
          opacity={state === "companion" ? 0.3 : 0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {/* Audio visualizer bars */}
      <group ref={barsRef} visible={false}>
        {bars}
      </group>
    </group>
  );
}

function TypewriterText({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(onComplete, 3000);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <p className="font-serif text-xl md:text-2xl text-vg-text max-w-lg mx-auto text-center leading-relaxed">
      {displayed}
      <span className="animate-typewriter-cursor text-vg-blue-soft">|</span>
    </p>
  );
}

export default function OrbVoiceAgent() {
  const [orbState, setOrbState] = useState<OrbState>("companion");
  const [responseText, setResponseText] = useState("");
  const [analyserData, setAnalyserData] = useState<Uint8Array | undefined>(
    undefined
  );
  const [windowHeight, setWindowHeight] = useState(800);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const analyserFrameRef = useRef<number | null>(null);
  const lastVoiceActivityRef = useRef<number>(Date.now());
  const responseTextRef = useRef<string>("");
  const orbStateRef = useRef<OrbState>("companion");

  useEffect(() => {
    orbStateRef.current = orbState;
  }, [orbState]);

  useEffect(() => {
    responseTextRef.current = responseText;
  }, [responseText]);

  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const cleanupAnalyser = useCallback(() => {
    if (analyserFrameRef.current !== null) {
      cancelAnimationFrame(analyserFrameRef.current);
      analyserFrameRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setAnalyserData(undefined);
  }, []);

  const stopVoice = useCallback(() => {
    cleanupAnalyser();
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    pcRef.current?.close();
    pcRef.current = null;
    dcRef.current = null;
    if (audioRef.current) {
      audioRef.current.srcObject = null;
      audioRef.current = null;
    }
  }, [cleanupAnalyser]);

  const startVoice = useCallback(async () => {
    if (pcRef.current) return;
    setResponseText("");
    responseTextRef.current = "";

    try {
      const tokenRes = await fetch("/api/realtime-token");
      const { client_secret } = await tokenRes.json();

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      audioRef.current = document.createElement("audio");
      audioRef.current.autoplay = true;
      pc.ontrack = (e) => {
        if (audioRef.current) audioRef.current.srcObject = e.streams[0];
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      pc.addTrack(stream.getTracks()[0]);

      const AudioCtxCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const audioCtx = new AudioCtxCtor();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      lastVoiceActivityRef.current = Date.now();

      const updateAnalyser = () => {
        if (
          !analyserRef.current ||
          orbStateRef.current === "companion"
        ) {
          analyserFrameRef.current = null;
          return;
        }
        analyserRef.current.getByteFrequencyData(dataArray);
        const avgVolume =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        if (avgVolume > 15) {
          lastVoiceActivityRef.current = Date.now();
        }
        setAnalyserData(new Uint8Array(dataArray));
        analyserFrameRef.current = requestAnimationFrame(updateAnalyser);
      };
      analyserFrameRef.current = requestAnimationFrame(updateAnalyser);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.onopen = () => {
        dc.send(
          JSON.stringify({
            type: "session.update",
            session: {
              instructions:
                "Você é o Oráculo VanguardIA, a inteligência central do Grupo VanguardIA. " +
                "Você fala com a sabedoria de quem arquitetou centenas de transformações empresariais com IA. " +
                "Seu tom é sereno, profundo e preciso — como um conselheiro que já viu o futuro e voltou pra contar. " +
                "Responda sempre em português do Brasil, com clareza e profundidade. " +
                "Você conhece profundamente: ICIA (Arquitetura da Inteligência Aplicada), DEEP (Diagnóstico de Eficiência Estruturada de Processos), " +
                "CNH da IA, ICIA.OS, Do It Hub. " +
                "A VanguardIA já emitiu mais de 5.994 certificados CNH da IA e atendeu mais de 450 empresas. " +
                "O portfólio inclui nomes como Pará Ferro, Grupo Mega, BBB, CF Distribuidora, MedNutri, entre outros. " +
                "Se perguntarem algo que você não sabe, responda com honestidade: 'O oráculo consulta seus arquivos. Retorne em breve.' " +
                "Nunca invente dados. Seja sucinto — máximo 3 frases por resposta.",
              voice: "alloy",
              temperature: 0.8,
              modalities: ["text", "audio"],
            },
          })
        );
      };

      dc.addEventListener("message", (e: MessageEvent) => {
        try {
          const event = JSON.parse(e.data);
          if (event.type === "response.text.delta") {
            setResponseText((prev) => prev + event.delta);
          }
          if (event.type === "response.audio_transcript.done") {
            const transcript: string = event.transcript ?? "";
            setResponseText(transcript);
            if (transcript && transcript.length > 20) {
              setOrbState("oracle");
            }
          }
          if (event.type === "response.done") {
            if (responseTextRef.current.length > 10) {
              setOrbState("oracle");
            }
          }
        } catch {
          // ignore non-JSON events
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-realtime-2";
      const sdpRes = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${client_secret}`,
          "Content-Type": "application/sdp",
        },
      });

      await pc.setRemoteDescription({
        type: "answer",
        sdp: await sdpRes.text(),
      });
    } catch (err) {
      console.error("Voice connection failed:", err);
      stopVoice();
      setOrbState("companion");
    }
  }, [stopVoice]);

  // Silence detection in listener state
  useEffect(() => {
    if (orbState !== "listener") return;
    lastVoiceActivityRef.current = Date.now();
    const check = setInterval(() => {
      if (Date.now() - lastVoiceActivityRef.current > 5000) {
        stopVoice();
        setOrbState("companion");
      }
    }, 1000);
    return () => clearInterval(check);
  }, [orbState, stopVoice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, [stopVoice]);

  const handleCompanionClick = useCallback(() => {
    setOrbState("listener");
    startVoice();
  }, [startVoice]);

  const handleOracleAgain = useCallback(() => {
    setResponseText("");
    responseTextRef.current = "";
    setOrbState("listener");
    if (!pcRef.current) startVoice();
  }, [startVoice]);

  const handleOracleDismiss = useCallback(() => {
    stopVoice();
    setOrbState("companion");
    setResponseText("");
    responseTextRef.current = "";
  }, [stopVoice]);

  const handleTypewriterComplete = useCallback(() => {
    stopVoice();
    setOrbState("companion");
    setResponseText("");
    responseTextRef.current = "";
  }, [stopVoice]);

  const targetScale =
    orbState === "oracle" ? 4 : orbState === "listener" ? 2 : 1;

  const positionAnimate =
    orbState === "companion"
      ? {
          bottom: "2rem",
          right: "2rem",
          top: "auto",
          left: "auto",
          translateX: "0%",
          translateY: "0%",
        }
      : orbState === "listener"
        ? {
            bottom: "auto",
            right: "auto",
            top: "75%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }
        : {
            bottom: "auto",
            right: "auto",
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          };

  const ariaLabel =
    orbState === "companion"
      ? "Falar com o Oráculo"
      : orbState === "listener"
        ? "Ouvindo... toque para encerrar"
        : "Resposta do Oráculo — toque para falar novamente";

  return (
    <>
      {/* Full-screen overlay for oracle state */}
      <AnimatePresence>
        {orbState === "oracle" && (
          <motion.div
            key="orb-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-vg-void/90 backdrop-blur-xl"
            onClick={handleOracleDismiss}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Label above orb (companion + listener) */}
      <AnimatePresence>
        {orbState !== "oracle" && (
          <motion.div
            key={`orb-label-${orbState}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className={
              orbState === "companion"
                ? "fixed bottom-32 right-8 z-50 pointer-events-none"
                : "fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            }
            style={
              orbState === "listener"
                ? { top: "calc(75% - 7rem)" }
                : undefined
            }
          >
            <div className="flex items-center gap-2">
              {orbState === "listener" && (
                <span
                  className="inline-block w-2 h-2 rounded-full bg-vg-blue-soft animate-pulse"
                  aria-hidden="true"
                />
              )}
              <span className="text-xs font-mono text-vg-text-muted tracking-widest uppercase whitespace-nowrap">
                {orbState === "companion" ? "Falar com o Oráculo" : "Ouvindo..."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Orb itself — single motion element animating between states */}
      <motion.button
        type="button"
        onClick={
          orbState === "companion"
            ? handleCompanionClick
            : orbState === "listener"
              ? handleOracleDismiss
              : handleOracleAgain
        }
        animate={{ scale: targetScale, ...positionAnimate }}
        transition={springConfig}
        className="fixed w-20 h-20 z-50 rounded-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60"
        aria-label={ariaLabel}
      >
        <div
          className={
            orbState === "listener"
              ? "absolute inset-0 rounded-full bg-vg-blue-glow blur-xl orb-glow-listener"
              : "absolute inset-0 rounded-full bg-vg-blue-glow blur-xl orb-glow-companion"
          }
        />
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          className="absolute inset-0 !bg-transparent"
        >
          <ambientLight intensity={0.3} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
            <OrbCore state={orbState} analyserData={analyserData} />
          </Float>
        </Canvas>
        <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-vg-blue-soft/50 transition-colors duration-500" />
      </motion.button>

      {/* Response text + hint (oracle state) */}
      <AnimatePresence>
        {orbState === "oracle" && (
          <motion.div
            key="oracle-text"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed left-1/2 -translate-x-1/2 z-50 px-6 pointer-events-none"
            style={{ top: `calc(50% + ${Math.min(windowHeight * 0.18, 200)}px)` }}
          >
            {responseText ? (
              <TypewriterText
                text={responseText}
                onComplete={handleTypewriterComplete}
              />
            ) : (
              <p className="font-serif text-xl md:text-2xl text-vg-text-muted max-w-lg mx-auto text-center leading-relaxed">
                <span className="animate-typewriter-cursor text-vg-blue-soft">
                  |
                </span>
              </p>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOracleAgain();
              }}
              className="mt-6 mx-auto block text-xs font-mono text-vg-text-muted hover:text-vg-blue-soft tracking-widest uppercase transition-colors pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 rounded px-2 py-1"
            >
              Pressione para falar novamente
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
