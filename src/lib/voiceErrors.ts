export type VoiceErrorKind = 'denied' | 'unavailable' | 'limit' | 'network' | 'unknown'

export interface VoiceErrorFeedback {
  kind: VoiceErrorKind
  message: string
}

export function getVoiceErrorFeedback(error: unknown): VoiceErrorFeedback {
  const message = error instanceof Error ? error.message : String(error)
  const name = error instanceof Error ? error.name : ''

  if (name === 'NotAllowedError' || /permission denied|not allowed/i.test(message)) {
    return {
      kind: 'denied',
      message: 'O microfone está bloqueado. Autorize o acesso no navegador e tente novamente.',
    }
  }

  if (
    /microphone api|notfounderror|notreadableerror|nenhuma faixa de áudio|no audio track/i.test(
      `${name} ${message}`,
    )
  ) {
    return {
      kind: 'unavailable',
      message: 'O microfone não está disponível neste dispositivo. Você pode continuar pelo WhatsApp.',
    }
  }

  if (/429|limit|limite/i.test(message)) {
    return {
      kind: 'limit',
      message: 'O limite de conversas foi atingido. Tente novamente mais tarde.',
    }
  }

  if (/network|fetch|connect|connection|sdp|realtime|api/i.test(message)) {
    return {
      kind: 'network',
      message: 'A conexão com o agente falhou. Verifique sua rede ou continue pelo WhatsApp.',
    }
  }

  return {
    kind: 'unknown',
    message: 'Não foi possível iniciar a conversa agora. Você pode continuar pelo WhatsApp.',
  }
}
