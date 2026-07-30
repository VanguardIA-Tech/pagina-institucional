export const WHATSAPP_E164 = '5591987624620'

export function whatsappLink(text: string): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`
}
