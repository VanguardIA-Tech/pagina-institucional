export type TrackingEvent =
  | 'virtual_page_view'
  | 'whatsapp_click'
  | 'cta_click'
  | 'social_click'
  | 'outbound_click'
  | 'navigation_click'
  | 'ui_click'
  | 'section_view'
  | 'scroll_depth'

type TrackingPayload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (
      command: 'event',
      eventName: TrackingEvent,
      parameters: Record<string, unknown>,
    ) => void
  }
}

function clean(value: string | null | undefined, maxLength = 100) {
  return value?.replace(/\s+/g, ' ').trim().slice(0, maxLength) || undefined
}

export function trackEvent(event: TrackingEvent, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') return

  const parameters = {
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    ...payload,
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...parameters,
  })

  window.gtag?.('event', event, parameters)
}

function sectionFor(element: Element) {
  const section = element.closest<HTMLElement>('section[id], main[id], footer[id]')
  return section?.id || 'global'
}

function elementLabel(element: HTMLElement) {
  return clean(
    element.dataset.trackLabel ||
      element.getAttribute('aria-label') ||
      element.textContent,
  )
}

function destination(href: string) {
  try {
    const url = new URL(href, window.location.href)
    return { host: url.hostname, path: url.pathname }
  } catch {
    return { host: undefined, path: undefined }
  }
}

export function classifyInteraction(element: HTMLElement) {
  const anchor = element.closest<HTMLAnchorElement>('a[href]')
  const button = element.closest<HTMLButtonElement>('button')
  const target = anchor || button
  if (!target || target.dataset.trackIgnore === 'true') return null

  const explicitEvent = target.dataset.trackEvent as TrackingEvent | undefined
  const href = anchor?.href || ''
  const { host, path } = destination(href)
  const label = elementLabel(target)
  const common = {
    element_type: anchor ? 'link' : 'button',
    element_label: label,
    section_id: target.dataset.trackSection || sectionFor(target),
    destination_host: host,
    destination_path: path,
  }

  if (explicitEvent) return { event: explicitEvent, payload: common }
  if (/wa\.me|whatsapp\.com/i.test(href)) return { event: 'whatsapp_click' as const, payload: common }
  if (/instagram\.com|linkedin\.com|facebook\.com|youtube\.com/i.test(href)) return { event: 'social_click' as const, payload: common }
  if (anchor && host && host !== window.location.hostname) return { event: 'outbound_click' as const, payload: common }
  if (anchor) return { event: 'navigation_click' as const, payload: common }
  return { event: 'ui_click' as const, payload: common }
}
