import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type ParticleFieldProps = {
  count?: number
  radius?: number
  color?: string
  size?: number
  opacity?: number
  variant?: 'constellation' | 'orb'
  enableParallax?: boolean
  rotationSpeed?: number
  vShapeMix?: number
  vShapeDuration?: number
}

function generatePositions(
  count: number,
  radius: number,
  variant: 'constellation' | 'orb',
) {
  const base = new Float32Array(count * 3)
  const vShape = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    if (variant === 'orb') {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = radius * (0.88 + Math.random() * 0.18)
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      base[i * 3 + 2] = r * Math.cos(phi)
    } else {
      base[i * 3] = (Math.random() - 0.5) * radius * 2
      base[i * 3 + 1] = (Math.random() - 0.5) * radius * 2
      base[i * 3 + 2] = (Math.random() - 0.5) * radius * 0.4
    }

    // Procedural "V" silhouette in XY plane:
    // V opens at top; two legs meeting at apex (0, -h/2).
    const w = radius * 1.2
    const h = radius * 1.4
    const leg = Math.random() < 0.5 ? -1 : 1
    const t = Math.random()
    const x = leg * (t * (w / 2))
    const y = -h / 2 + t * h
    const jitter = radius * 0.05
    vShape[i * 3] = x + (Math.random() - 0.5) * jitter
    vShape[i * 3 + 1] = y + (Math.random() - 0.5) * jitter
    vShape[i * 3 + 2] = (Math.random() - 0.5) * jitter
  }

  return { base, vShape }
}

export default function ParticleField({
  count = 1500,
  radius = 6,
  color = '#4A7BFF',
  size = 0.045,
  opacity = 0.75,
  variant = 'constellation',
  enableParallax = true,
  rotationSpeed = 0.03,
  vShapeMix = 0,
  vShapeDuration = 0,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  const { base, vShape } = useMemo(
    () => generatePositions(count, radius, variant),
    [count, radius, variant],
  )

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(base)
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [base])

  const colorObj = useMemo(() => new THREE.Color(color), [color])

  useEffect(() => {
    return () => {
      geometry.dispose()
    }
  }, [geometry])

  useEffect(() => {
    if (!enableParallax) return
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enableParallax])

  useFrame((_, delta) => {
    const pts = pointsRef.current
    if (!pts) return

    timeRef.current += delta
    pts.rotation.y += delta * rotationSpeed
    pts.rotation.x = Math.sin(timeRef.current * 0.1) * 0.05

    if (enableParallax) {
      const tx = mouseRef.current.x * 0.4
      const ty = mouseRef.current.y * 0.4
      pts.position.x += (tx - pts.position.x) * 0.04
      pts.position.y += (ty - pts.position.y) * 0.04
    }

    if (vShapeMix > 0 && vShapeDuration > 0) {
      // Coalesce into V then disperse back: 0 → 1 → 0 over duration
      const t = timeRef.current / vShapeDuration
      const k = t < 1 ? Math.sin(Math.PI * t) * vShapeMix : 0
      const posAttr = geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < arr.length; i++) {
        arr[i] = base[i] * (1 - k) + vShape[i] * k
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={colorObj}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
