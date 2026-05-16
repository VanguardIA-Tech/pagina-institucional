# BUILD SPEC — Página Institucional Grupo VanguardIA v2

**Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Recharts + React Router v7  
**Fontes:** Inter Display, Inter, Fraunces, JetBrains Mono (Google Fonts)  
**Ícones:** Lucide React  
**Rotas:** `/` (empresas privadas) e `/icia-gov` (setor público)  
**Projeto:** `/tmp/pagina-institucional-v2`

---

## 🚨 REGRAS ABSOLUTAS (leia antes de qualquer código)

1. **NUNCA usar:** gradientes roxo-azul, glassmorphism decorativo, "transform your business with AI", 3 cards genéricos + CTA, animações sem propósito
2. **SEMPRE incluir a11y:** skip-link, `:focus-visible`, `prefers-reduced-motion`, `aria-current`, `aria-expanded`, `aria-label`
3. **SEMPRE incluir SEO:** OG tags completas, JSON-LD Organization, canonical URL
4. **Mobile-first:** testar em 375px primeiro, depois expandir
5. **Componentes separados:** cada seção = `src/components/sections/NomeSecao.tsx`
6. **CSS custom properties** no `:root` (já em `index.css`)
7. **Framer Motion** para revelações, stagger, count-up
8. **Recharts** para gráficos
9. **Sem hardcode de cores** — usar tokens CSS

---

## 1. PALETA DE CORES (já definida no index.css)

```
--va-black: #0A0A0F (fundo principal)
--va-white: #FAFAF7 (contraste)
--va-cream: #F5F1E8 (blocos editoriais)
--va-blue-deep: #0B1A3E
--va-blue-electric: #2D5BFF (CTAs, links)
--va-blue-glow: #4A7BFF (hovers)
--va-green-deep: #00563F
--va-green-vivid: #00C896 (dados positivos)
--va-green-glow: #4DFFB8
--va-orange-deep: #B84A00
--va-orange-vivid: #FF6B1A (destaques editoriais)
--va-orange-glow: #FF9550
--va-gold: #C9A66B (frases-âncora, aparece 3x no site)
--va-gray-50 a --va-gray-900 (cinzas funcionais)
```

---

## 2. TIPOGRAFIA (escala já definida no index.css)

- **Display XL:** 48-96px, weight 800, tracking -0.03em, line-height 0.95
- **Display L:** 36-72px, weight 800, tracking -0.025em, line-height 1
- **Display M:** 28-48px, weight 700, line-height 1.05
- **Heading L:** 24-36px, weight 700
- **Heading M:** 20-28px, weight 600
- **Body L:** 18-20px, weight 400, line-height 1.6
- **Body M:** 16-18px, weight 400, line-height 1.65
- **Label:** 12px, weight 500, letter-spacing 0.12em, UPPERCASE
- **Mono:** 14-16px, weight 500, letter-spacing 0.02em

**Fraunces italic** para: frases-âncora, manifesto, aspas de depoimentos
**JetBrains Mono** para: labels técnicos, dados, números

---

## 3. ESTRUTURA DE ARQUIVOS

```
src/
  components/
    sections/
      NavBar.tsx
      Hero.tsx
      LogoBar.tsx
      Tese.tsx
      ArquiteturaICIA.tsx
      EscadaICIA.tsx
      Acessorios.tsx
      Impacto.tsx
      CNHdaIA.tsx
      Clientes.tsx
      Depoimentos.tsx
      DoItHub.tsx
      Parcerias.tsx
      ManifestoCTA.tsx
      Footer.tsx
    ui/
      ScrollProgress.tsx
      CountUp.tsx
      RevealSection.tsx
      SectionContainer.tsx
  pages/
    Home.tsx
    IciaGov.tsx
  hooks/
    useScrollProgress.ts
    useReducedMotion.ts
    useCountUp.ts
  App.tsx
  main.tsx
  index.css
```

---

## 4. HOME PAGE — 15 SEÇÕES (construir na ordem)

### SEÇÃO 1 — NavBar
- Fixo, transparente no topo → sólido (preto + blur) ao scroll > 80px
- Logo SVG branco + links: Tese · Arquitetura · CNH da IA · ICIA OS · Do It Hub · Clientes
- Switcher Empresas | Setor Público + CTA "Falar com a VanguardIA" (pill azul)
- Mobile: hambúrguer → drawer full-screen
- **A11y:** `aria-label="Menu"`, `aria-expanded`, `aria-current="page"` no link ativo, skip-link

### SEÇÃO 2 — Hero
- Fundo: radial-gradient (azul elétrico → azul profundo → preto) com animação "respiração" 8s
- Label mono: "GRUPO VANGUARDIA · DA AMAZÔNIA PARA O MUNDO · EST. 2020"
- Headline Display XL branco: "A única arquitetura brasileira de Inteligência Aplicada que une método, certificação, processos e dados soberanos em um único sistema."
  - "Inteligência Aplicada" em laranja, "um único sistema" em verde
- Subtítulo + 3 stats cards (+8.000, +600, R$ 1bi+) com CountUp animado
- 2 CTAs: [EMPRESAS ▶] azul preenchido + [SETOR PÚBLICO ▶] outline branco
- Scroll indicator "CONTINUE"
- Animações: stagger palavras (80ms), fade-up, CountUp, CTAs em 1800ms

### SEÇÃO 3 — LogoBar (Prova Social)
- Faixa 120px fundo creme, contraste com hero
- Label vertical "OPERAM CONOSCO" + carrossel infinito 60s com 25+ logos
- Hover: cor original + tooltip nome
- Pause no hover

### SEÇÃO 4 — A Tese
- Fundo preto com grid de pontos 5% opacity
- Grid 12 col: esquerda = headline + frase laranja italic, direita = 3 cards "filme"
- Cards com ❌ vermelho e borda sutil
- Faixa verde central: "O problema não foi a ferramenta. Foi a ordem."
- 3 passos: 01 PESSOAS → 02 PROCESSOS → 03 TECNOLOGIA
- Frase dourada italic no final

### SEÇÃO 5 — Arquitetura ICIA
- Fundo creme editorial
- Label "02 · ARQUITETURA" + Display L
- 3 colunas verticais (PESSOAS/verde, PROCESSOS/azul, TECNOLOGIA/laranja)
- Cada coluna: card 550px, topo faixa colorida 20%, lista de entregas, prova social
- Animação: colunas em stagger 200ms, linhas SVG conectoras desenham em 1.5s
- Faixa preta com frase-âncora italic

### SEÇÃO 6 — Escada ICIA (3 Níveis)
- Fundo gradiente preto→azul
- 3 cards em altura crescente: START (480px), CORE ⭐ (540px), OS (600px)
- Hover: sobe 8px + glow
- Microcopy: "Tickets a partir de R$ 25k setup + R$ 12,9k/mês"

### SEÇÃO 7 — Acessórios
- Fundo creme, grid 2×2 cards horizontais
- Ícones Lucide: Layers (360), Database (Data Lake), Shield (Governança), UserCheck (Residência)
- Hover revela faixa colorida lateral

### SEÇÃO 8 — Impacto Mensurável
- Fundo preto, 4 cards com Recharts:
  1. Bar chart: perda operacional
  2. Donut chart: receita perdida (12%)
  3. Line chart: maturidade digital Norte
  4. Big number: 42% (Fivetran 2025)

### SEÇÃO 9 — CNH da IA
- Split screen 50/50: esquerda laranja, direita foto full-bleed
- +8.000 big number + 6 passos do método abaixo
- CTA outline branco

### SEÇÃO 10 — Clientes
- Grid 6 colunas logos monocromáticos → cor no hover
- Microcopy: Sede Belém · Escritórios Goiânia/Rio/Coimbra · Expansão SP/BSB

### SEÇÃO 11 — Depoimentos
- Fundo creme, carrossel 4 vídeos 9:16
- Autoplay mudo no hover, overlay nome+cargo

### SEÇÃO 12 — Do It Hub
- Fundo gradiente Amazônia (verde→verde vivo→laranja)
- 3 cards: AI Night (azul), AI On Hands (laranja), Conselho ICIA (dourado)
- Galeria fotos scroll horizontal

### SEÇÃO 13 — Parcerias
- Fundo branco, grid logos institucionais: ACP · Conjove · SEBRAE · SINDARPA · OAB-PA · SINDILOJAS-GO

### SEÇÃO 14 — Manifesto + CTA Final
- Fundo preto, 100vh mínimo
- Frase Fraunces dourada: "Manejar o artificial, pra viver mais do que é real."
- "Não vendemos. Conectamos."
- CTA gigante gradiente azul→verde: "FALAR COM A VANGUARDIA →"
- Microcopy: "Resposta em até 24h úteis. Belém · GMT-3."

### SEÇÃO 15 — Footer
- Fundo gray-900, grid 4 colunas
- Logo + links + endereço Tv. Avertano Rocha, 192 · Belém · Pará

---

## 5. PÁGINA /icia-gov (SETOR PÚBLICO)

Mesma estrutura visual da Home, com estas diferenças:
- **Cor primária:** laranja solar (não azul) no switcher ativo
- **Nav links:** Tese · CNH para Servidores · ICIA.GOV · Conformidade · Cases · COP-30
- **Hero:** gradiente próprio (laranja → verde Amazônia → preto)
- **Tom mais sóbrio:** menos italic, mais mono técnico
- **12 seções** (mesma estrutura adaptada)

### Seções específicas:
1. NavBar (switcher GOV ativo, badge "· GOV")
2. Hero Gov (gradiente laranja, carteira tripla: +8.000, 6 programas, Lei 14.133/21)
3. LogoBar (entidades + instituições)
4. Tese Gov (3 diagnósticos específicos do setor público)
5. CNH da IA para Servidores (SEÇÃO MAIS IMPORTANTE — split 60/40, bloco inexigibilidade)
6. Programas ICIA.GOV (grid 2×3: CNH, DEEP, Política IA, House Lake, Agentes IPC, ICIA.GOV OS)
7. Por que a CNH entra rápido (3 cards: Valor, Risco, Contratação)
8. Gráficos de contexto (73% usam IA sem método, maturidade 2.8/5, triagem 48h→6h, COP-30)
9. Conformidade (6 selos: Lei 14.133/21, LC 182/2021, LGPD, Marco Civil, CPSI, Controle Externo)
10. COP-30 e Amazônia (gradiente, narrativa legado)
11. Depoimentos institucionais (Alberto Villar ACP, Edivaldo SINDARPA)
12. Manifesto + CTA Gov

---

## 6. SEO & METADATA (OBRIGATÓRIO)

```html
<!-- Home -->
<title>Grupo VanguardIA — A arquitetura brasileira de Inteligência Aplicada</title>
<meta name="description" content="A única arquitetura brasileira de Inteligência Aplicada que une método, certificação, processos e dados soberanos em um único sistema.">
<meta property="og:title" content="Grupo VanguardIA · Da Amazônia para o Mundo">
<meta property="og:description" content="A arquitetura aplicada da Nova Era.">
<meta property="og:image" content="/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://vanguardiagrupo.com.br">

<!-- JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grupo VanguardIA",
  "description": "A primeira aceleradora de cultura de Inteligência Aplicada do Brasil",
  "url": "https://vanguardiagrupo.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tv. Avertano Rocha, 192",
    "addressLocality": "Belém",
    "addressRegion": "Pará",
    "addressCountry": "BR"
  }
}
</script>
```

---

## 7. COMPONENTES SHARED (criar primeiro)

### ScrollProgress
Barra fina 2px no topo, gradiente azul→verde→laranja, segue scroll.

### CountUp
Hook que anima número de 0 ao valor final em 1.2s quando visível.

### RevealSection
Wrapper Framer Motion: `opacity: 0; y: 40 → opacity: 1; y: 0` em 600ms com IntersectionObserver (threshold 0.12). Respeita prefers-reduced-motion.

### SectionContainer
Padding responsivo, max-width 1280px, margin auto.

---

## 8. ORDEM DE BUILD

1. **Primeiro:** index.css (já está pronto — revisar se necessário)
2. **Segundo:** Componentes shared (ScrollProgress, CountUp, RevealSection, SectionContainer)
3. **Terceiro:** Página Home — seções na ordem (1 a 15)
4. **Quarto:** Página IciaGov — seções na ordem (1 a 12)
5. **Quinto:** SEO — atualizar index.html com OG tags e JSON-LD
6. **Sexto:** Testar build: `npm run build`

---

## 9. CHECKLIST DE QUALIDADE

- [ ] Hero passa no teste dos 8 segundos
- [ ] Nenhuma seção usa palavras proibidas: "potencializar", "alavancar", "impulsionar", "disruptivo"
- [ ] Palavras com cor têm propósito semântico (não decoração)
- [ ] Skip-link funcional (Tab no carregamento)
- [ ] Focus-visible visível em todos links/botões
- [ ] prefers-reduced-motion respeitado
- [ ] aria-current no link ativo da nav
- [ ] aria-expanded no hamburger
- [ ] OG image 1200×630 presente
- [ ] JSON-LD Organization presente
- [ ] canonical URL presente
- [ ] Mobile 375px funcional em todas seções
- [ ] CountUp anima em todos números grandes
- [ ] Carrossel logos pausa no hover
- [ ] Gráficos Recharts responsivos
- [ ] Footer linka /icia-gov discretamente
- [ ] Manifesto Fraunces dourado centralizado
- [ ] CTA final gradiente azul→verde
- [ ] Nenhum hardcode de cor — usar tokens CSS
- [ ] Imagens com loading="lazy", width/height explícitos
