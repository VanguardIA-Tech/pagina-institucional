export const WHATSAPP_E164 = '5591984138412'

export function whatsappLink(text: string): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`
}
