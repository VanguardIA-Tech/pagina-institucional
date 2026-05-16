import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'

export default function HeroParticleBackground() {
  const [isMobile, setIsMobile] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setIsMobile(mq.matches)
      setReduceMotion(rm.matches)
    }
    sync()
    mq.addEventListener('change', sync)
    rm.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      rm.removeEventListener('change', sync)
    }
  }, [])

  if (reduceMotion) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.4} />
      <ParticleField
        count={isMobile ? 500 : 1800}
        radius={7}
        color="#4A7BFF"
        size={isMobile ? 0.035 : 0.045}
        opacity={0.55}
        variant="constellation"
        enableParallax={!isMobile}
        rotationSpeed={0.02}
        vShapeMix={0.85}
        vShapeDuration={4.5}
      />
    </Canvas>
  )
}
