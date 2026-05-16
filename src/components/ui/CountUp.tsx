import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

type CountUpProps = {
  to: number
  from?: number
  duration?: number
  format?: (value: number) => string
  prefix?: string
  suffix?: string
  className?: string
}

const defaultFormat = (value: number) =>
  Math.round(value).toLocaleString('pt-BR')

export default function CountUp({
  to,
  from = 0,
  duration = 1.2,
  format = defaultFormat,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      setDisplay(to)
      return
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1] as const,
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, prefersReducedMotion, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  )
}
