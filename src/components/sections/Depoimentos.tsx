import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from 'lucide-react'
import RevealSection from '../ui/RevealSection'

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  videoUrl?: string
  posterUrl?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ellen',
    name: 'Ellen Martins',
    role: 'Socia-Diretora',
    company: 'Alves Martins Advocacia',
    // Fallback/Mock video or CDN if available
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-39871-large.mp4', 
  },
  {
    id: 'afonso',
    name: 'Afonso Lobato',
    role: 'Sócio',
    company: 'Silveira Athias Advogados',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-a-coffee-shop-41873-large.mp4',
  },
  {
    id: 'alberto',
    name: 'Alberto Villar',
    role: 'Presidente',
    company: 'Associação Comercial do Pará (ACP)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-presentation-in-a-business-meeting-41870-large.mp4',
  },
  {
    id: 'edivaldo',
    name: 'Edivaldo Carvalho Neto',
    role: 'Diretor',
    company: 'SINDARPA',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-with-blue-screen-40058-large.mp4',
  },
]

export default function Depoimentos() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({
    ellen: true,
    afonso: true,
    alberto: true,
    edivaldo: true,
  })
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 280 + 16 // card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleMouseEnter = (id: string) => {
    const video = videoRefs.current[id]
    if (video) {
      video.muted = true
      video.play().catch(() => {})
      setActiveId(id)
    }
  }

  const handleMouseLeave = (id: string) => {
    const video = videoRefs.current[id]
    if (video) {
      // Pause unless this video was explicitly clicked to play with audio
      if (mutedStates[id]) {
        video.pause()
        setActiveId(null)
      }
    }
  }

  const handleVideoClick = (id: string) => {
    const video = videoRefs.current[id]
    if (video) {
      const isCurrentlyMuted = mutedStates[id]
      // Unmute and play or pause
      if (isCurrentlyMuted) {
        // Mute all other videos
        Object.keys(videoRefs.current).forEach((key) => {
          const otherVideo = videoRefs.current[key]
          if (otherVideo && key !== id) {
            otherVideo.muted = true
            otherVideo.pause()
            setMutedStates((prev) => ({ ...prev, [key]: true }))
          }
        })

        video.muted = false
        video.play().catch(() => {})
        setMutedStates((prev) => ({ ...prev, [id]: false }))
        setActiveId(id)
      } else {
        video.muted = true
        video.pause()
        setMutedStates((prev) => ({ ...prev, [id]: true }))
      }
    }
  }

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-headline"
      className="bg-va-cream text-va-black py-24 lg:py-32 overflow-hidden border-t border-va-gray-200"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 lg:mb-20">
          <div>
            <RevealSection as="div" className="mb-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700 mb-2">
                08 · DEPOIMENTOS
              </p>
              <div className="h-px bg-va-gray-500 max-w-[120px]" />
            </RevealSection>
            <h2
              id="depoimentos-headline"
              className="font-display font-extrabold tracking-[-0.025em] leading-[1.05]"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              Vendo é{' '}
              <span className="font-editorial italic font-normal text-va-orange-deep">
                diferente de ler
              </span>
              .
            </h2>
          </div>
          
          {/* Nav buttons (visible on desktop and mobile) */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-va-gray-500/20 text-va-black hover:bg-va-black hover:text-white hover:border-va-black transition-colors"
              aria-label="Depoimentos anteriores"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-va-gray-500/20 text-va-black hover:bg-va-black hover:text-white hover:border-va-black transition-colors"
              aria-label="Próximos depoimentos"
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Video list (horizontal scroll on mobile / flex on desktop) */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none touch-pan-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {TESTIMONIALS.map((t) => {
            const isHovered = activeId === t.id
            const isMuted = mutedStates[t.id]
            
            return (
              <div
                key={t.id}
                className="relative flex-shrink-0 w-[280px] h-[500px] rounded-2xl overflow-hidden snap-start bg-va-black text-white group cursor-pointer border border-va-gray-200/10 shadow-lg"
                onMouseEnter={() => handleMouseEnter(t.id)}
                onMouseLeave={() => handleMouseLeave(t.id)}
                onClick={() => handleVideoClick(t.id)}
              >
                {/* Background video */}
                {t.videoUrl ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[t.id] = el
                    }}
                    src={t.videoUrl}
                    poster={t.posterUrl}
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-va-blue-deep to-va-black z-0" />
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-va-black via-transparent to-black/30 z-10" />

                {/* Sound indicator overlay (top right) */}
                {isHovered && t.videoUrl && (
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md p-2 rounded-full text-white">
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </div>
                )}

                {/* Center play icon overlay when not playing with sound */}
                {isMuted && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 rounded-full bg-white/95 text-va-black flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
                      <Play size={24} className="ml-1 fill-current" />
                    </div>
                  </div>
                )}

                {/* Video text details (bottom overlay) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-va-black via-va-black/80 to-transparent pt-12">
                  <p className="font-display font-extrabold text-lg text-white leading-tight">
                    {t.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-va-orange-glow mt-1">
                    {t.role}
                  </p>
                  <p className="font-display font-medium text-xs text-va-gray-200 mt-0.5">
                    {t.company}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
