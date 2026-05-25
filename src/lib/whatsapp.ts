export const WHATSAPP_E164 = '5591983012908'

export function whatsappLink(text: string): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`
}
