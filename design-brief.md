# VanguardIA Portfolio — Design Critique & Disruption Plan

## Task
Analyze the current VanguardIA portfolio site (https://vanguardiagrupo.com.br) and propose a disruptive redesign. The code is in /tmp/vanguardia-portfolio (Next.js 16 + React 19 + Tailwind 4 + Framer Motion 12 + Three.js).

## Current state
12 sections: Hero → Origem → Tese → ICIA → Tiers → Do It Hub → Numeros → Parcerias → Depoimentos → Manifesto → CTA → Footer + OrbVoiceAgent (Three.js orb that connects to GPT-Realtime-2)

Stack: Next.js 16.2.6, React 19, Tailwind 4.3, Framer Motion 12, @react-three/fiber 9

## VanguardIA Design System
- Colors: --vg-blue (#1F3CFF), --vg-deep (#0A0C12), --vg-void (#050608), --vg-paper (#F4F1EA)
- Fonts: Fraunces serif, Geist sans, Geist Mono
- Tone: mature, institutional, profound

## What the CEO wants
- DISRUPTIVE. Not a conventional landing page. "Caralho, isso aqui é diferente, aqui tem IA mesmo"
- Reference: Jarvis from Iron Man — AI oracle experience
- The voice agent (GPT-Realtime-2) is the killer feature
- Better than competitors viverdeia.ai and getenter.ai
- Design direction: sci-fi elegance, living system feel, AI-native

## Instructions
1. Load Anthropic design skills in order: frontend-design → design-critique → ui-ux-pro-max → fixing-accessibility → fixing-metadata
2. Read the current source code (page.tsx, Hero.tsx, OrbVoiceAgent.tsx, globals.css, etc.)
3. Audit the current design — what works, what breaks, what's generic
4. Propose a DISRUPTIVE redesign direction
5. Write DESIGN_PLAN.md with concrete, implementable specs

## Output file
/tmp/vanguardia-portfolio/DESIGN_PLAN.md

Include:
- Current state critique (3-5 problems found)
- Design direction (mood, references, visual language)
- Top 5 priority improvements with CSS/code specs
- Motion/interaction system
- Accessibility checklist
