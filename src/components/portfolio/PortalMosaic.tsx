import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { PortalPreview } from '../../content/publicProof'
import ResponsivePicture from './ResponsivePicture'

function PortalPanel({
  portal,
  index,
  progress,
  reduceMotion,
}: {
  portal: PortalPreview
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reduceMotion: boolean | null
}) {
  const transform = useTransform(
    progress,
    [0, 1],
    ['translate3d(0, 0, 0)', `translate3d(0, ${portal.depth}px, 0)`],
  )

  return (
    <motion.div
      className={`portal-panel portal-panel-${index + 1}`}
      style={reduceMotion ? undefined : { transform }}
    >
      <ResponsivePicture
        base={portal.base}
        alt={`Portal ICIA 360 configurado para ${portal.name}`}
        width={portal.width}
        height={portal.height}
        loading={portal.priority ? 'eager' : 'lazy'}
        fetchPriority={portal.priority ? 'high' : 'auto'}
      />
    </motion.div>
  )
}

export default function PortalMosaic({ portals }: { portals: PortalPreview[] }) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <figure ref={ref} className="portal-mosaic-wrap">
      <div className="portal-mosaic">
        {portals.map((portal, index) => (
          <PortalPanel
            key={portal.id}
            portal={portal}
            index={index}
            progress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
      <figcaption>
        Portais ICIA 360 reais, configurados para operações diferentes.
      </figcaption>
    </figure>
  )
}
