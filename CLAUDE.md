# Projeto: Página Institucional Grupo VanguardIA

## Stack
- React 19 + Vite 6 + TypeScript 6
- Tailwind CSS v4 (com `@tailwindcss/vite`)
- Framer Motion 12 para animações
- Recharts 2 para gráficos
- React Router v7
- Lucide React para ícones

## Comandos
- `npm run dev` — servidor dev (porta padrão Vite)
- `npm run build` — build produção
- `npm run preview` — preview do build

## Estrutura
- `src/components/sections/` — 15 seções da Home + 12 seções da IciaGov
- `src/components/ui/` — componentes compartilhados
- `src/hooks/` — hooks customizados
- `src/pages/` — Home.tsx e IciaGov.tsx
- `src/index.css` — design system tokens + estilos base

## Design System
Todas as cores usam CSS custom properties no `:root`. NUNCA usar cores hardcoded.  
Tokens disponíveis:
- `--va-black`, `--va-white`, `--va-cream`
- `--va-blue-{deep,electric,glow}`
- `--va-green-{deep,vivid,glow}`
- `--va-orange-{deep,vivid,glow}`
- `--va-gold`
- `--va-gray-{50,200,500,700,900}`

Fontes: Inter Display, Inter, Fraunces (italic), JetBrains Mono.

Usar `var(--color-va-blue-electric)` em Tailwind: `text-va-blue-electric` (Tailwind v4 com `@theme`).

## Regras
1. Componentes separados por seção
2. Mobile-first: testar em 375px antes de expandir
3. Framer Motion para revelações: fade-up 600ms, stagger children 80ms
4. NUNCA hardcodar cores — usar tokens
5. SEMPRE incluir a11y: skip-link, focus-visible, prefers-reduced-motion
6. SEMPRE incluir SEO: OG tags, JSON-LD, canonical
7. Imagens com loading="lazy" e width/height explícitos
8. CTA principal: "FALAR COM A VANGUARDIA →" (link externo)
9. Não usar palavras "potencializar", "alavancar", "impulsionar", "disruptivo"

## Build Spec
O arquivo `BUILD_SPEC.md` contém a especificação completa de cada seção.
Construir na ordem: shared components → Home sections 1-15 → IciaGov sections.
