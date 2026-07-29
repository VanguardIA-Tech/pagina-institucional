import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { Testimonial } from '../../content/publicProof'
import ResponsivePicture from './ResponsivePicture'

function ActiveVideo({
  testimonial,
  onEnded,
}: {
  testimonial: Testimonial
  onEnded: () => void
}) {
  const startPlayback = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return
    video.focus({ preventScroll: true })
    video.play().catch(() => {
      video.focus()
    })
  }, [])

  return (
    <video
      ref={startPlayback}
      className="testimonial-video"
      controls
      preload="none"
      playsInline
      poster={`${testimonial.posterBase}.webp`}
      aria-label={`Depoimento de ${testimonial.organization}`}
      onEnded={onEnded}
    >
      <source src={testimonial.videoUrl} />
      <track
        kind="captions"
        srcLang="pt-BR"
        label="Português"
        src={testimonial.captionSrc}
        default
      />
      Seu navegador não consegue reproduzir este vídeo.
    </video>
  )
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const posterButtonRef = useRef<HTMLButtonElement>(null)

  const active = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [activeId, items],
  )
  const orderedItems = useMemo(
    () => [
      ...items.filter((item) => item.featured),
      ...items.filter((item) => !item.featured),
    ],
    [items],
  )
  const featuredCount = orderedItems.filter((item) => item.featured).length

  if (!active) return null

  const selectTestimonial = (id: string) => {
    setActiveId(id)
    setPlayingId(null)
  }

  const finishPlayback = () => {
    setPlayingId(null)
    window.requestAnimationFrame(() => {
      posterButtonRef.current?.focus({ preventScroll: true })
    })
  }

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const keyTargets: Record<string, number> = {
      ArrowRight: (index + 1) % orderedItems.length,
      ArrowDown: (index + 1) % orderedItems.length,
      ArrowLeft: (index - 1 + orderedItems.length) % orderedItems.length,
      ArrowUp: (index - 1 + orderedItems.length) % orderedItems.length,
      Home: 0,
      End: orderedItems.length - 1,
    }
    const targetIndex = keyTargets[event.key]
    if (targetIndex === undefined) return

    event.preventDefault()
    const target = orderedItems[targetIndex]
    selectTestimonial(target.id)
    document.getElementById(`testimonial-tab-${target.id}`)?.focus()
  }

  return (
    <section
      id="depoimentos"
      className="portfolio-testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="portfolio-section-frame">
        <div className="testimonial-heading">
          <h2 id="testimonials-title">A prova tem voz.</h2>
          <p>
            Sete lideranças contam o que mudou quando a IA deixou de ser ferramenta
            solta e entrou na operação.
          </p>
        </div>

        <div className="testimonial-layout">
          <div className="testimonial-selector" role="tablist" aria-label="Depoimentos">
            {orderedItems.map((item, index) => (
              <Fragment key={item.id}>
                {index === 0 && (
                  <span className="testimonial-selector-label" aria-hidden="true">
                    Em destaque
                  </span>
                )}
                {index === featuredCount && (
                  <span className="testimonial-selector-label" aria-hidden="true">
                    Outras vozes
                  </span>
                )}
                <button
                  id={`testimonial-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={item.id === active.id}
                  aria-controls="testimonial-stage"
                  tabIndex={item.id === active.id ? 0 : -1}
                  className={`${item.id === active.id ? 'is-active' : ''} ${item.featured ? 'is-featured' : 'is-secondary'}`}
                  onClick={() => selectTestimonial(item.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item.organization}
                </button>
              </Fragment>
            ))}
          </div>

          <div
            id="testimonial-stage"
            className="testimonial-stage"
            role="tabpanel"
            aria-labelledby={`testimonial-tab-${active.id}`}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={active.id}
                className="testimonial-stage-inner"
                initial={
                  reduceMotion
                    ? { opacity: 0.65 }
                    : { opacity: 0.65, transform: 'translate3d(24px, 0, 0)' }
                }
                animate={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                exit={
                  reduceMotion
                    ? { opacity: 0.65 }
                    : { opacity: 0.65, transform: 'translate3d(-24px, 0, 0)' }
                }
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              >
                {playingId === active.id ? (
                  <ActiveVideo
                    testimonial={active}
                    onEnded={finishPlayback}
                  />
                ) : (
                  <button
                    ref={posterButtonRef}
                    type="button"
                    className="testimonial-poster"
                    aria-label={`Reproduzir depoimento de ${active.organization}`}
                    onClick={() => setPlayingId(active.id)}
                  >
                    <ResponsivePicture
                      base={active.posterBase}
                      fallbackExtension="jpg"
                      alt=""
                      width={720}
                      height={1280}
                    />
                    <span className="testimonial-play" aria-hidden="true">
                      <svg viewBox="0 0 48 48" role="presentation">
                        <path d="M18 12.5 36 24 18 35.5Z" />
                      </svg>
                    </span>
                    <span className="testimonial-poster-label">
                      <strong>{active.organization}</strong>
                      <small>Assistir depoimento</small>
                    </span>
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
