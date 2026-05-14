"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Particle Field ────────────────────────────────────────────────
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Create geometry & attributes
  const { positions, colors } = useMemo(() => {
    const COUNT = 5000;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);

    const color = new THREE.Color("#1F3CFF");

    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8;
      const height = (Math.random() - 0.5) * 14;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius - 2;

      const intensity = 0.2 + Math.random() * 0.8;
      col[i * 3] = color.r * intensity;
      col[i * 3 + 1] = color.g * intensity;
      col[i * 3 + 2] = color.b * intensity;
    }

    return { positions: pos, colors: col };
  }, []);

  // Track mouse
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Animate
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;
    const { x, y } = mouseRef.current;
    const scroll = scrollRef.current * 0.0003;

    for (let i = 0; i < arr.length; i += 3) {
      // Gentle drift
      arr[i] += Math.sin(i * 0.01 + scroll) * delta * 0.05;
      arr[i + 1] += Math.cos(i * 0.007 + scroll) * delta * 0.04;
      arr[i + 2] += Math.cos(i * 0.009) * delta * 0.03;

      // Mouse attraction (subtle)
      arr[i] += x * delta * 0.15;
      arr[i + 1] += y * delta * 0.1;
    }
    posAttr.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        opacity={0.7}
      />
    </points>
  );
}

// ─── Camera Controller ─────────────────────────────────────────────
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

// ─── Exported Component ────────────────────────────────────────────
export default function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 70%)",
        }}
      >
        <CameraController />
        <ParticleField />
      </Canvas>
    </div>
  );
}
