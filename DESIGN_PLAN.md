# VanguardIA Portfolio — DESIGN_PLAN.md
# Plano de Redesign Disruptivo

## Diagnóstico do Estado Atual

### O que funciona ✅
- **Cópia excepcional** — a narrativa (Tese → ICIA → Manifesto) é madura e conecta
- **Hierarquia de informação** — a escada natural START → CORE → ENTERPRISE faz sentido
- **Design System base** — tokens CSS de cor estão corretos, tipografia Fraunces + Geist é sólida
- **OrbVoiceAgent** — o conceito do Oráculo Jarvis está implementado (Three.js + WebRTC)
- **Performance** — build limpo, zero erros, SSG rápido

### O que quebra ❌
1. **Layout genérico** — seções empilhadas verticalmente sem ritmo visual. Toda seção é "fundo escuro + texto centralizado". Falta variação de composição
2. **Tipografia subutilizada** — Fraunces é uma fonte editorial linda mas está sendo usada só como heading. Devia ter momentos de "respiro editorial" (parágrafos grandes, citações com peso visual)
3. **Orb isolado** — o Jarvis está num canto fixo, pequeno, quase escondido. Deveria ser o CENTRO da experiência — um elemento vivo que transita entre seções
4. **Logos sem tratamento** — o grid de clientes usa `<Image>` padrão sem tratamento visual. Logos com fundo branco quebram o dark mode
5. **Falta de "momentos"** — página inteira é um fluxo contínuo sem pausas dramáticas. Falta um "uau" visual a cada 2-3 scrolls
6. **Mobile secundário** — o layout foi pensado desktop-first. Em mobile, seções colapsam sem identidade
7. **Navegação sem surpresa** — header fixo com links é o padrão de 2015. Devia sumir/reaparecer, ter transições

## Direção Visual Proposta: "Living System"

### Conceito
A página não é um documento estático — é um **sistema vivo**. Cada seção revela uma camada da VanguardIA como se você estivesse entrando fisicamente na empresa: da superfície (Hero) ao núcleo (Manifesto), com o Oráculo como seu guia.

### Referências
- **Jarvis (Iron Man)** — voz onipresente, partículas que reagem, sensação de "inteligência ambiente"
- **Apple Keynotes** — transições suaves, tipografia monumental, uso dramático de espaço negativo
- **Stripe Press** — editorial web elevado, serif em tela, cor como acento pontual
- **Museu do Amanhã (RJ)** — arquitetura que revela camadas, iluminação que guia o olhar

### Paleta Refinada
```
--vg-void:     #030408  (mais profundo, quase puro)
--vg-deep:     #080B14  
--vg-elev:     #0E1220  
--vg-blue:     #1F3CFF  (acento — usar com PARSIMÔNIA)
--vg-blue-glow: rgba(31,60,255,0.12)  (glow, nunca sólido)
--vg-amber:    #F5A623  (acento secundário — para alertas, destaques)
--vg-paper:    #F4F1EA  (seções claras — usar em 1-2 momentos máximos)
```

### Tipografia com Propósito
- **Fraunces 72px+** — só no Hero e Manifesto. Momentos monumentais
- **Fraunces 24-48px** — headings de seção, citações
- **Geist 14-18px** — corpo, navegação, labels
- **Geist Mono 11-13px** — dados, stats, código, navegação secundária

## 5 Melhorias Prioritárias

### 1. ⭐ Hero Imersivo com Partículas Reativas
**Problema:** Hero atual é texto estático com fade-in. Não causa impacto.
**Solução:** Sistema de partículas Three.js que reage ao mouse/scroll, formando o texto da tese.

```css
/* Hero canvas overlay */
.hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
}
```

**Especificação:** 
- 5000 partículas azuis (#1F3CFF) que flutuam como poeira digital
- No hover, partículas são atraídas ao cursor (campo gravitacional)
- No scroll, partículas reorganizam em padrões geométricos
- O texto do Hero flutua SOBRE as partículas com backdrop-blur sutil
- Componente: `<HeroParticles />` usando @react-three/fiber

### 2. ⭐ Oráculo Jarvis Onipresente
**Problema:** Orb está fixo no canto, pequeno, parece afterthought.
**Solução:** O Orb transita entre 3 estados: Companion → Listener → Oracle.

**Estados:**
| Estado | Posição | Tamanho | Comportamento |
|--------|---------|---------|---------------|
| **Companion** | Canto inferior direito | 80px | Pulsa suavemente, partículas orbitam |
| **Listener** | Centro inferior | 160px | Anel expande, partículas aceleram |
| **Oracle** | Centro da tela | 320px | Overlay escurece, resposta aparece como texto |

**Transições:**
```tsx
// Orb viaja entre estados com spring physics
<motion.div
  animate={{
    scale: isListening ? 2 : isSpeaking ? 4 : 1,
    x: isSpeaking ? 0 : 0,
    y: isSpeaking ? -windowHeight/4 : 0,
  }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
/>
```

**Interação:**
- Clique no Companion → ativa microfone → transição suave pra Listener
- Fala detectada → partículas formam waveform ao redor do Orb
- Resposta do GPT-Realtime-2 → texto aparece letra por letra abaixo do Orb (typewriter)
- Silêncio por 5s → volta ao estado Companion

### 3. ⭐ Seções com "Reveal Architecture"
**Problema:** Seções só fazem fade-in. Sem personalidade.
**Solução:** Cada seção tem seu próprio mecanismo de revelação, como camadas de um prédio sendo construído.

**Mecanismos por seção:**

| Seção | Mecanismo |
|-------|-----------|
| **Origem** | Texto revela letra por letra com cursor piscando (máquina de escrever editorial) |
| **Tese** | Cards dos 3 filmes deslizam em staggered horizontal |
| **ICIA** | 3 camadas revelam de baixo pra cima (Cultural → Diagnóstica → Execução) |
| **Tiers** | Cards escalonados em "escada" visual (START menor, ENTERPRISE maior) |
| **Do It Hub** | Imagem do espaço físico com parallax suave |
| **Numeros** | Logos em carrossel infinito que desacelera no hover |
| **Manifesto** | Texto gigante com blur-in (desfoca → foca) + partículas ao redor |

**Implementação:**
```tsx
// Exemplo: ICIA layers reveal
<motion.div
  initial={{ clipPath: "inset(100% 0 0 0)" }}
  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
>
  {/* Conteúdo da camada */}
</motion.div>
```

### 4. ⭐ Logos com Tratamento Dark-Mode
**Problema:** Logos com fundo branco quebram o dark mode.
**Solução:** Processar logos com filter CSS + backdrop treatment.

```css
.client-logo {
  filter: brightness(0) invert(1) opacity(0.6);
  transition: filter 0.3s ease, opacity 0.3s ease;
}
.client-logo:hover {
  filter: brightness(0) invert(1) opacity(1);
  transform: scale(1.05);
}
```

**Grid aprimorado:**
- Colunas: 6 (desktop) → 4 (tablet) → 3 (mobile)
- Cada célula: fundo `bg-white/[0.02]` com border `border-white/[0.04]`
- Hover: glow azul sutil (`box-shadow: 0 0 20px var(--vg-blue-glow)`)
- Animação: logos entram em staggered cascade com `staggerChildren: 0.05`

### 5. ⭐ Navegação "Invisible UI"
**Problema:** Header fixo com links é genérico.
**Solução:** Navegação desaparece no scroll-down, reaparece no scroll-up. Links são minimalistas.

```tsx
// Header com hide/show no scroll
const [hidden, setHidden] = useState(false);
useEffect(() => {
  let lastScroll = 0;
  const handleScroll = () => {
    const current = window.scrollY;
    setHidden(current > lastScroll && current > 200);
    lastScroll = current;
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Estilo do header:**
- Fundo: `bg-vg-void/80 backdrop-blur-xl` com border-bottom sutil
- Links: `text-xs font-mono tracking-[0.2em]` sem sublinhado
- Indicador de seção ativa: bolinha azul que desliza entre links
- Mobile: hamburguer menu com overlay full-screen

## Plano de Ação

### Fase 1 — Fundação Disruptiva (hoje)
1. Hero com partículas reativas (Three.js)
2. Header "Invisible UI"
3. Tratamento dark-mode nos logos

### Fase 2 — Experiência Jarvis (amanhã)
4. OrbVoiceAgent com 3 estados + transições
5. Typewriter effect pras respostas do Oráculo
6. Audio visualizer (waveform) no estado Listener

### Fase 3 — Reveal Architecture (essa semana)
7. Mecanismos de revelação por seção
8. Transições entre seções (scroll-snap ou morphing)
9. Mobile responsive refinado

### Fase 4 — Polimento (antes do lançamento)
10. Acessibilidade (focus states, aria labels, reduced motion)
11. SEO metadata (já parcialmente implementado)
12. Performance audit (Lighthouse 95+)
