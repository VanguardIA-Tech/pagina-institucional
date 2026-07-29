import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const OrbVoiceAgent = lazy(() => import('../ui/OrbVoiceAgent'))

function VoiceLoading() {
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    statusRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div ref={statusRef} className="voice-demo-loading" role="status" tabIndex={-1}>
      Preparando a conversa
    </div>
  )
}

export default function VoiceDemo() {
  const [enabled, setEnabled] = useState(false)

  if (!enabled) {
    return (
      <button
        type="button"
        className="voice-demo-launcher"
        onClick={() => setEnabled(true)}
      >
        <span className="voice-demo-mark" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>
          <strong>Conversar com a VanguardIA</strong>
          <small>Carrega o agente somente depois do clique</small>
        </span>
      </button>
    )
  }

  return (
    <div className="voice-demo-live">
      <Suspense fallback={<VoiceLoading />}>
        <OrbVoiceAgent variant="inline" autoFocus />
      </Suspense>
    </div>
  )
}
