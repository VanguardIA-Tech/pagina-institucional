"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function OrbCore({ isListening }: { isListening: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.4 + Math.random() * 0.6;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(t * 2) * 0.03 * (isListening ? 2 : 1)
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.003;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      ringRef.current.scale.setScalar(
        1 + Math.sin(t * 1.5) * 0.05 * (isListening ? 3 : 1)
      );
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
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
          opacity={isListening ? 0.7 : 0.3}
        />
      </mesh>
      {/* Glow ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.15, 0.015, 16, 100]} />
        <meshBasicMaterial
          color="#4A63FF"
          transparent
          opacity={isListening ? 0.9 : 0.4}
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
          opacity={isListening ? 0.8 : 0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function OrbVoiceAgent() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "speaking">(
    "idle"
  );
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startVoice = useCallback(async () => {
    if (pcRef.current) return;
    setStatus("listening");
    setIsListening(true);

    try {
      // Create ephemeral token via our API route
      const tokenRes = await fetch("/api/realtime-token");
      const { client_secret } = await tokenRes.json();

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Remote audio
      audioRef.current = document.createElement("audio");
      audioRef.current.autoplay = true;
      pc.ontrack = (e) => {
        if (audioRef.current) audioRef.current.srcObject = e.streams[0];
      };

      // Local mic
      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(ms.getTracks()[0]);

      // Data channel for events
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

      // WebRTC offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Connect to OpenAI
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

      setStatus("listening");
    } catch (err) {
      console.error("Voice connection failed:", err);
      setStatus("idle");
      setIsListening(false);
    }
  }, []);

  const stopVoice = useCallback(() => {
    pcRef.current?.close();
    pcRef.current = null;
    dcRef.current = null;
    if (audioRef.current) {
      audioRef.current.srcObject = null;
      audioRef.current = null;
    }
    setStatus("idle");
    setIsListening(false);
  }, []);

  const toggle = () => {
    if (status === "idle") startVoice();
    else stopVoice();
  };

  const statusLabel = {
    idle: "Falar com o Oráculo",
    listening: "Ouvindo...",
    speaking: "Respondendo...",
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
      {/* Status label */}
      <span className="text-xs font-mono text-vg-text-muted tracking-widest uppercase">
        {statusLabel[status]}
      </span>

      {/* Orb container */}
      <button
        onClick={toggle}
        className="relative w-20 h-20 rounded-full cursor-pointer group"
        aria-label={statusLabel[status]}
      >
        <div className="absolute inset-0 rounded-full bg-vg-blue-glow blur-xl animate-pulse-glow" />
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          className="absolute inset-0 !bg-transparent"
        >
          <ambientLight intensity={0.3} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
            <OrbCore isListening={isListening} />
          </Float>
        </Canvas>
        <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-vg-blue-soft/50 transition-colors duration-500" />
      </button>
    </div>
  );
}
