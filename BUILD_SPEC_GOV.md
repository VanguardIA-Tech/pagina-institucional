# BUILD SPEC — IciaGov Page (Batch 2)

**Context:** The Home page (15 sections) is complete with build passing. Now build the `/icia-gov` (Setor Público) page.
**Reuses:** All shared UI components (ScrollProgress, CountUp, RevealSection, SectionContainer) and the NavBar.
**Key difference:** Laranja solar (`--va-orange-vivid`) is primary color instead of azul. More sober tone, less Fraunces italic, more JetBrains Mono technical.

---

## Página IciaGov — 12 Seções

### Components to create in `src/components/sections/`:

### 1. HeroGov.tsx
- Fundo: `radial-gradient(ellipse at top left, #FF6B1A 0%, #B84A00 30%, #00563F 70%, #0A0A0F 100%)` — "amanhecer amazônico institucional"
- Label mono branco: "ICIA.GOV · INTELIGÊNCIA APLICADA PARA O SETOR PÚBLICO · AMAZÔNIA · BRASIL"
- Display XL: "A primeira arquitetura brasileira de Inteligência Aplicada desenhada para o setor público."
  - "primeira arquitetura brasileira" em laranja solar
  - "setor público" em verde vivo
- Subtítulo: sobre CNH da IA, 8.000+ profissionais, Lei 14.133/21, LC 182/2021, LGPD
- Carteirada tripla: +8.000 servidores, 6 programas PMI, CONFORME Lei 14.133/21 + LC 182/2021 + LGPD
- 2 CTAs: [COMEÇAR PELA CNH DA IA ▶] laranja preenchido + [CONHECER ICIA.GOV ▶] outline branco
- Microcopy: "Inexigibilidade de licitação aplicável — Lei 14.133/21, Art. 74."
- Animações: stagger, CountUp nos números, CTAs em 1800ms

### 2. TeseGov.tsx
- Fundo preto + dot grid
- Esquerda: "A administração pública brasileira não tem um problema de tecnologia."
- Laranja italic: "Tem um problema de capacidade instalada para operar a tecnologia que já tem."
- Direita: 3 cards "DIAGNÓSTICO" com ❌ (sistemas legados, IA sem método, consultorias sem capacidade real)
- Faixa verde: "Pelo método VanguardIA, capacidade vem primeiro. Tecnologia vem depois."
- 3 passos: 01 HABILITAR servidores → 02 DIAGNOSTICAR processos → 03 MODERNIZAR com governança
- Frase dourada: "A IA na administração pública só gera valor depois que existe gente preparada para operá-la com responsabilidade pública."

### 3. CNHdaIAServidores.tsx (SEÇÃO MAIS IMPORTANTE)
- Split 60/40: esquerda laranja, direita preto
- Esquerda:
  - Label "02 · POR ONDE COMEÇAR"
  - Display L italic: "CNH da IA para Servidores Públicos."
  - "A porta de entrada de maior valor entregue e menor atrito"
  - 6 checkmarks verde vivo: Diagnóstico, Formação, Avaliação, Certificação, Manutenção contínua, Política institucional
  - CTA pill preto: [COMEÇAR PELA CNH DA IA →]
- Direita (card sobre preto):
  - ⚖️ CONTRATAÇÃO POR INEXIGIBILIDADE
  - "A CNH da IA é metodologia proprietária"
  - ⚡ INEXIGIBILIDADE DE LICITAÇÃO — Lei nº 14.133/21, Art. 74
  - Fundamentos: Objeto singular, Notória especialização, Inviabilidade de competição
  - "A VanguardIA entrega o caderno técnico completo"
- Abaixo: 6 passos do método (DIAGNÓSTICO → FORMAÇÃO → AVALIAÇÃO → CERTIFICAÇÃO → CULTURA → CONTINUIDADE)

### 4. ProgramasICIAgov.tsx
- Fundo creme
- Header: "A CNH da IA abre a porta. A arquitetura ICIA.GOV constrói a casa."
- Grid 2×3 de 6 cards (cada 280px, borda lateral colorida):
  1. CNH DA IA PARA SERVIDORES (verde) — Certificação adaptada ao regime estatutário
  2. DIAGNÓSTICO DEEP PROCESS GOV (azul) — Mergulho presencial nos processos reais
  3. POLÍTICA INSTITUCIONAL DE IA (dourado) — Documento completo, conforme LGPD
  4. HOUSE LAKE GOVERNAMENTAL (azul profundo) — Lakehouse com camada ouro auditável
  5. AGENTES IPC E AUTOMAÇÃO (laranja) — Trabalhadores digitais auditáveis
  6. ICIA.GOV OS (dourado) — Sistema nervoso da administração
- Frase: "Cada programa é contratável individualmente."

### 5. PorQueCNH.tsx
- Fundo preto, grid 3 cards
- Header: "Por que a CNH da IA é a primeira decisão racional de qualquer gestor público em 2026."
- Card 1 — VALOR ENTREGUE: produtividade, triagem, análise, atendimento
- Card 2 — RISCO BAIXO: educação é menor exposição, sem alteração de sistemas
- Card 3 — VIABILIDADE JURÍDICA: inexigibilidade, Lei 14.133/21, Art. 74
- Faixa verde: "Não capacitar servidores em IA é o risco. Capacitar com método é o caminho seguro."

### 6. GraficosContexto.tsx
- Fundo preto, 4 cards com Recharts
- Card 1: Big number 73% laranja — servidores já usam IA sem método (Pesquisa setorial 2025)
- Card 2: Donut chart — Maturidade digital setor público 2.8/5 (PwC ITDBr 2025)
- Card 3: Bar chart — Triagem documental: sem IA 48h, com CNH 6h
- Card 4: Editorial COP-30 — "2026: o Pará é o palco. O legado depende do que for entregue."

### 7. Conformidade.tsx
- Fundo creme
- Header: "Trabalhamos onde o direito público define o contorno."
- Grid 3×2 de 6 selos: Lei 14.133/21, LC 182/2021, LGPD, Marco Civil, CPSI, Controle Externo
- Microcopy: "Pareceres jurídicos fornecidos sob solicitação."

### 8. COP30.tsx
- Fundo gradiente Amazônia (verde→verde vivo→laranja)
- Header: "COP-30 em Belém. O Pará é a vitrine. A administração pública pode ser parte do legado."
- 2 colunas texto sobre translúcido escuro
- CTA: [CONVERSAR SOBRE O LEGADO COP-30 →]

### 9. DepoimentosGov.tsx
- Fundo creme
- Carrossel com 2 vídeos: Alberto Villar (ACP), Edivaldo Carvalho Neto (SINDARPA)
- 2 slots placeholder: "+ DEPOIMENTO EM BREVE"

### 10. ManifestoCTAGov.tsx
- Fundo preto, 100vh min
- Fraunces dourado: "Modernizar o serviço público não é uma promessa. É uma decisão."
- "Comece pela educação. A escada inteira espera depois."
- CTA gigante gradiente laranja→verde: "FALAR COM A VANGUARDIA GOV →"

---

## CRITICAL RULES
- Read existing components for patterns: NavBar.tsx, Hero.tsx, Tese.tsx — follow same structure
- Laranja solar = primary (replaces azul elétrico in badges, CTAs, accent words)
- More sober: less Fraunces italic, more JetBrains Mono for labels
- NO person names — only "assessoria jurídica especializada em contratos públicos"
- Every section MUST have: mobile responsive, a11y, reduced-motion support
- After building, UPDATE src/pages/IciaGov.tsx to import and render all sections
- Run: npm run build to verify

## Current IciaGov.tsx stub
Already imports NavBar + ScrollProgress. Replace the placeholder content with the full page.
