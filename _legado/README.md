# Site Institucional — Grupo VanguardIA

> **A clareza não é o oposto da complexidade. É o resultado de dominá-la.**

Página institucional oficial do **Grupo VanguardIA**, peça de posicionamento estratégico para clientes B2B premium (faturamento R$ 5M a R$ 360M/ano). Não é página comercial — é arquitetura narrativa que conecta. O cliente lê, se reconhece, e procura.

**🌐 Produção:** [pagina-institucional-blond.vercel.app](https://pagina-institucional-blond.vercel.app)

---

## 📌 Sobre o projeto

Single-page em **HTML5 + CSS + JavaScript puro**, sem frameworks, sem build step, sem dependências. Toda a página em um único arquivo `index.html`, otimizada para clareza, performance e manutenção direta.

**Filosofia:** padrão "Mega" de proposta-narrativa, com arco emocional crescente do hero ao manifesto final. Cada seção é uma camada de revelação institucional.

### Princípios de design

- **Tipografia tripla:** Fraunces (serif de respiração), Manrope (sans de sustentação), JetBrains Mono (detalhe técnico)
- **Paleta institucional:** azul VanguardIA `#1F3CFF` sobre preto profundo `#050608` e off-white `#F4F1EA`
- **Animações:** scroll com IntersectionObserver, SVG animado para Constelação e orbital do ICIA
- **Rendering:** ritmo visual alternando seções escuras (void/deep) e claras (paper)

---

## 🏛️ Frameworks institucionais

O site comunica os frameworks oficiais do Grupo VanguardIA:

| Framework | Significado |
|-----------|-------------|
| **VanguardIA** | Marca-mãe (sempre com `IA` maiúsculo) |
| **ICIA** | Arquitetura da Inteligência Aplicada. Núcleo do programa, baseado em Inteligência Humana + Inteligência Artificial |
| **ICIA.OS** | Sistema operacional institucional 2025/2030 |
| **DEEP** | Diagnóstico de Eficiência Estruturada de Processos |
| **COPA** | Cliente, Custo de Oportunidade, Conveniência, Comunicação Intencional |
| **CNH da IA** | Certificação corporativa para operar Inteligência Aplicada |

**3 pilares do ICIA:** Pessoas (consciência e formação), Processos (políticas, POPs, TRs, TNRs, DEEP), Tecnologia (aplicada com critério, sem hype).

---

## 🗺️ Estrutura narrativa da página

A página segue uma ordem deliberada, em 13 movimentos:

1. **Hero** — Tese de abertura com palavras se revelando
2. **Origem** — A história da VanguardIA em prosa serif
3. **O Começo** — Tese da Nova Era (Inteligência, Clareza, Eficiência)
4. **CNH da IA** — Certificação corporativa em 6 etapas
5. **ICIA** — Arquitetura da Inteligência Aplicada (núcleo da página)
6. **Do It Hub** — Corpo físico em Belém/PA (AI Night, AI On Hands, Conselho ICIA)
7. **Números** — Stats principais (8.000+ certificados, ICP R$ 5–360M)
8. **Parcerias** — ACP, Conjove, SEBRAE, SINDARPA, OAB
9. **Constelação de Clientes** — Grafo SVG com nós cor-coordenados
10. **Depoimentos & Ecossistema Vivo** — Imagens, vídeos e galeria de eventos
11. **Manifesto Final** — Frase monumental
12. **CTA** — "Não vendemos. Conectamos."
13. **Footer** — 4 colunas (Brand, Sistema, Movimento, Contato)

---

## 📁 Estrutura de arquivos

```
pagina-institucional/
├── index.html         # Página única, autocontida (HTML + CSS + JS)
├── CLAUDE.md          # Briefing institucional completo (contexto para IA)
├── README.md          # Este arquivo
├── .gitignore
└── assets/
    ├── logo-avatar.png
    ├── logo-horizontal.png
    └── logo-vertical.png
```

Mídia institucional (logos de clientes, fotos, vídeos) servida via **Directus CMS** em `https://directus.vanguardiagrupo.com.br/assets/<UUID>`.

---

## 🚀 Rodando localmente

Não precisa instalar nada. Abra `index.html` direto no navegador ou sirva com qualquer servidor estático:

```bash
# Python (recomendado para dev)
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000`.

---

## 📦 Deploy

O site é hospedado na **Vercel** com deploy automático a cada push na branch `main`.

- **URL de produção:** `pagina-institucional-blond.vercel.app`
- **Domínio próprio:** configurar DNS apontando para Vercel
- **Alternativas:** Netlify, GitHub Pages, Cloudflare Pages — qualquer CDN serve

Sem build step. Sem dependências. Push → deploy.

---

## 🎨 Paleta institucional

```css
--vg-blue:      #1F3CFF;   /* Azul VanguardIA primário */
--vg-blue-deep: #1429D6;   /* Azul escuro para hover */
--vg-blue-soft: #4A63FF;   /* Azul claro para acentos */
--bg-void:      #050608;   /* Preto profundo */
--bg-deep:      #0A0C12;   /* Preto secundário */
--bg-elev:      #11141C;   /* Cards escuros */
--bg-paper:     #F4F1EA;   /* Off-white das seções claras */
```

---

## ✍️ Convenções de escrita

- **VanguardIA** com `IA` maiúsculo, sempre. Nunca "Vanguardia"
- **Nunca usar travessões longos** (— em-dash ou – en-dash). Usar vírgula, dois-pontos, ponto
- Tom: maduro, institucional, convidativo. Sem linguagem comercial agressiva
- Itálico (`<em>`) reservado para destaques poéticos em azul `--vg-blue-soft`

---

## 🛠️ Tecnologias

| Camada | Stack |
|--------|-------|
| Markup | HTML5 semântico |
| Estilo | CSS3 com variáveis e Grid/Flexbox |
| Comportamento | JavaScript vanilla (sem dependências) |
| Tipografia | Google Fonts (Fraunces, Manrope, JetBrains Mono) |
| Animação | IntersectionObserver + SVG animado |
| Mídia | Directus CMS |
| Host | Vercel |

---

## 📍 Endereço

Tv. Avertano Rocha, 192 — Belém, Pará
Sede dentro do **Do It Hub**

---

## 🔗 Links institucionais

- **Site:** [grupovanguardia.com.br](https://pagina-institucional-blond.vercel.app)
- **Instagram:** [@grupovanguard.ia](https://www.instagram.com/grupovanguard.ia/)
- **LinkedIn:** [Grupo VanguardIA](https://www.linkedin.com/company/grupovanguardiabr/)
- **Fale com a VanguardIA:** [formbioj.vanguardiagrupo.com.br](https://formbioj.vanguardiagrupo.com.br/)

---

## 🧭 Para continuar o desenvolvimento

O arquivo [`CLAUDE.md`](./CLAUDE.md) contém o briefing completo do projeto: arquitetura, frameworks, convenções, pendências conhecidas e padrões de código. Leia antes de qualquer alteração.

### Convenções de commit

Mensagens em português, descritivas, focadas no "porquê":

```
Clientes: remove fundo branco das logos e atualiza UUID da Facilita
Vídeos: força frame inicial (#t=0.1) para evitar tela preta no mobile
```

### Antes de cada commit, validar

- Sem `VANGUARD.OS`, `DIP` ou `Vanguardia` minúsculo no código
- Sem travessões longos (`—`, `–`)
- Mobile testado em viewport ≤ 880px
- Logos novas em `/assets/` (PNG transparente) ou Directus

---

## 📜 Licença

Conteúdo institucional e código proprietários do **Grupo VanguardIA**. Reprodução não autorizada.

---

© 2026 **Grupo VanguardIA** · *Manejar o artificial, pra viver mais do que é real.*
