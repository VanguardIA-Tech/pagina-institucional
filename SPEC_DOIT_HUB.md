# SPEC — DoItHub Gallery Replacement

## What
Replace the 10 Unsplash placeholder images in the DoItHub horizontal gallery with 1 real video + 3 real photos from the Do It Hub physical space.

## Files to modify
`src/components/sections/DoItHub.tsx`

## Changes

### 1. Replace GALLERY_IMAGES with mixed media array
```ts
type GalleryItem = { type: 'video'; src: string } | { type: 'image'; src: string }
```

Replace the current `GALLERY_IMAGES` string array with:
```ts
const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'video', src: '/images/doit-2.webm' },
  { type: 'image', src: '/images/mesas-doit.webp' },
  { type: 'image', src: '/images/espaco-doit.webp' },
  { type: 'image', src: '/images/estudio-doit.webp' },
]
```

### 2. Update the horizontal gallery rendering
The video item (leftmost, first item) must:
- Use `<video>` element with `autoPlay`, `muted`, `loop`, `playsInline`
- Same card dimensions (320x240, rounded-2xl, border, etc.)
- Show the overlay badge "DO IT HUB · BELÉM · 2026" like photo cards

The image items:
- Same as current implementation, just using local paths

### 3. Layout
- Video comes first (leftmost in horizontal scroll)
- 3 photos follow
- All same card style: `w-[320px] h-[240px] rounded-2xl overflow-hidden group shadow-lg border border-white/5`

### 4. Assets already in place
- `/images/doit-2.webm` (6.3MB)
- `/images/mesas-doit.webp` (237KB)
- `/images/espaco-doit.webp` (1.8MB)
- `/images/estudio-doit.webp` (2.0MB)

## Anti-slop rules
- NUNCA usar gradientes roxo-azul
- NUNCA glassmorphism decorativo
- NENHUM hardcode de cor — usar tokens CSS do projeto
- Manter pattern Framer Motion existente
- Manter acessibilidade (alt text, aria labels)

## Verify
`npm run build` must pass
