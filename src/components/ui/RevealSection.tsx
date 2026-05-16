import type { ReactNode, ElementType } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

type RevealSectionProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  stagger?: boolean
  staggerAmount?: number
  amount?: number
  id?: string
  'aria-labelledby'?: string
}

export default function RevealSection({
  children,
  as = 'section',
  className,
  delay = 0,
  stagger = false,
  staggerAmount = 0.08,
  amount = 0.12,
  id,
  ...rest
}: RevealSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion(as as any) as any

  const containerVariants: Variants = stagger
    ? {
        hidden: { opacity: prefersReducedMotion ? 1 : 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerAmount,
            delayChildren: prefersReducedMotion ? 0 : delay,
          },
        },
      }
    : {
        hidden: {
          opacity: prefersReducedMotion ? 1 : 0,
          y: prefersReducedMotion ? 0 : 40,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: prefersReducedMotion ? 0 : delay,
          },
        },
      }

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerVariants}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}
