# Site Institucional VanguardIA

> Este arquivo é o briefing institucional do projeto. Claude Code deve lê-lo antes de qualquer mudança.

## Sobre o projeto

Site institucional do **Grupo VanguardIA** (escreve-se sempre com `IA` maiúsculo, nunca "Vanguardia"). É uma página única (single-page), arquitetada em HTML/CSS/JS puro, sem frameworks, sem build step. Serve como peça de posicionamento institucional para clientes B2B premium (faturamento R$ 5M a R$ 360M/ano), não é página comercial.

**Filosofia da página:** não vende. Conecta. Cliente lê, se reconhece, e procura. Inspirada em padrão "Mega" de proposta-narrativa, com arco emocional crescente do hero ao manifesto final.

**Lema:** "A clareza não é o oposto da complexidade. É o resultado de dominá-la."

## Stack técnica

- HTML5 single file (`index.html`)
- CSS via `<style>` no head, com CSS variables organizadas
- JS via `<script>` ao final, vanilla, sem dependências
- Fontes: Google Fonts (Fraunces serif para conteúdo de respiração, Manrope sans para sustentação técnica, JetBrains Mono para detalhes)
- Logos PNG com fundo transparente em `/assets/`
- Rendering: animações por scroll com IntersectionObserver, SVG animado para grafo da Constelação e orbital do ICIA
- Sem build step, sem npm, sem React. Abre direto no navegador.

## Estrutura narrativa (ordem das seções)

1. **Hero** — Tese de abertura com palavras revelando-se
2. **Origem** (`#origem`) — A história da VanguardIA com prosa serif, capitular azul
3. **O Começo** (`#tese`) — Tese da Nova Era, 3 cards (Inteligência, Clareza, Eficiência) + menção breve ao COPA
4. **ICIA.OS** (`#vos`) — Sistema operacional institucional, 6 macro-pilares (Nova Era, Problema, Sistema, Método, Ferramentaria, Futuro)
5. **ICIA** (`#icia`) — Arquitetura da Inteligência Aplicada. Núcleo da página. Orbital SVG + 3 pilares (Pessoas, Processos, Tecnologia) + Comercial Invisível + 2 produtos
6. **Do It Hub** (`#doit`) — Corpo físico. 3 cards de eventos: AI Night, AI On Hands, Conselho ICIA (este é o featured)
7. **Números** — 4 stats principais (8.000+ certificados, R$ 5-360M ICP, 3-4 programas/mês, ICIA.OS 2026)
8. **Parcerias** (`#parcerias`) — 5 cards categorizados: ACP/Conjove (membros), SEBRAE/SINDARPA/OAB (parcerias)
9. **Constelação de Clientes** (`#clientes`) — Grafo SVG com 50 nós cor-coordenados + lista de chips com mesma cor de cada nó. Hover no chip destaca o nó
10. **Depoimentos & Ecossistema Vivo** (`#depoimentos`) — 3 sub-blocos: 6 imagens, 5 vídeos, 8 itens de galeria de eventos. Slots com `data-bucket-key` prontos para integração com bucket
11. **Manifesto Final** — Frase em itálico monumental: "Manejar o artificial, pra viver mais do que é real."
12. **CTA** (`#cta`) — "Não vendemos. Conectamos." + botão Fale Conosco
13. **Footer** — 4 colunas (Brand, Sistema, Movimento, Contato)

## Paleta de cores institucional

```css
--vg-blue: #1F3CFF;        /* Azul VanguardIA primário */
--vg-blue-deep: #1429D6;   /* Azul escuro para hover/dark */
--vg-blue-soft: #4A63FF;   /* Azul claro para acentos sobre fundo escuro */
--bg-void: #050608;        /* Preto profundo */
--bg-deep: #0A0C12;        /* Preto secundário */
--bg-elev: #11141C;        /* Cards escuros */
--bg-paper: #F4F1EA;       /* Off-white das seções claras */
```

Seções alternam entre fundo escuro (void/deep) e fundo paper (off-white) para criar ritmo visual.

## Frameworks institucionais (use estes nomes corretamente)

- **VanguardIA** — sempre com IA maiúsculo. Nunca "Vanguardia"
- **ICIA** — programa principal. Arquitetura da Inteligência Aplicada. Não é "engenharia de decisão" (texto antigo). É baseado em **Inteligência Humana + Inteligência Artificial = Inteligência Aplicada**
- **ICIA.OS** — sistema operacional institucional 2025/2030 (substituiu o antigo "VANGUARD.OS")
- **DEEP** — Diagnóstico de Eficiência Estruturada de Processos (substituiu o antigo "DIP")
- **COPA** — Cliente, Custo de Oportunidade, Conveniência, Comunicação Intencional. Mencionado de leve (quase não é mais comercializado)
- **3 pilares do ICIA**: Pessoas, Processos, Tecnologia
  - **Pessoas**: conscientização sobre IA aplicada, CNH Corporativo
  - **Processos**: Políticas, POPs, TRs (Tarefas Repetitivas), TNRs (Tarefas Não Repetitivas), DEEP
  - **Tecnologia**: aplicada com critério, sem hype
- **Do It Hub** — espaço físico em Belém/PA onde a VanguardIA opera. 3 eventos: AI Night (mensal aberto), AI On Hands (workshop prático), Conselho ICIA (almoço fechado mensal)

## Endereço físico

- Tv. Avertano Rocha, 192 — Belém, Pará
- Sede dentro do Do It Hub
- Link Maps: https://share.google/PnydkKl8FugSdUjLa

## Links externos importantes

- Formulário Fale Conosco: `https://formbioj.vanguardiagrupo.com.br/?utm_source=home&utm_medium=bio_home&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnLVC0WIY5wR03GGrm3wmk7aJJ15JyYVNI9NBXWEB1yr2GBIaPoBivarV04o0_aem_VekgoPfNaLqnnZ-VFUcw2g`
- Instagram: `https://www.instagram.com/grupovanguard.ia/`
- LinkedIn: `https://www.linkedin.com/company/grupovanguardiabr/posts/?feedView=all`

Todos os 3 botões "Fale Conosco" da página apontam pro formulário com `target="_blank"`.

## Convenções de escrita

- **Nunca usar travessões longos** (— em-dash ou – en-dash). Use vírgula, dois-pontos, ou ponto
- **VanguardIA** com IA maiúsculo, sempre
- Tom: maduro, institucional, convidativo. Sem linguagem comercial agressiva. Sem CTAs do tipo "compre agora"
- Itálico (em tags `<em>`) é usado para destaques poéticos e palavras-chave em azul `--vg-blue-soft`

## Constelação de Clientes (a parte mais técnica)

Cada cliente tem uma cor única da paleta de 50 cores. A mesma cor aparece:
1. Na bolinha do chip (com glow)
2. No background sutil do chip
3. No nó da constelação (com halo pulsando)

O JavaScript lê a lista de chips do DOM, atribui cor por índice, e gera os nós SVG com a mesma cor. Hover no chip destaca o nó correspondente. Tem lógica de matching via `data-idx`.

A paleta está hardcoded no JS, no objeto `palette[]`. Posições 0 e 1 são azul VanguardIA (PARAFERRO) e vermelho (GRUPO MEGA). As outras 48 posições são cores que se distinguem visualmente.

Para adicionar/trocar cliente, edita a lista `<span class="client-chip">NOME</span>` na seção `#clientes`. A ordem dita a cor.

## Pendências conhecidas (do que ainda falta)

- [ ] Logos reais dos 5 parceiros (ACP, Conjove, SEBRAE, SINDARPA, OAB) substituindo placeholders na seção `#parcerias`
- [ ] 48 nomes reais de clientes (atualmente "CLIENTE 03" até "CLIENTE 50") na seção `#clientes`
- [ ] Conexão dos slots de Depoimentos com o bucket de mídia (atualmente todos com `data-bucket-key` esperando integração). 6 imagens + 5 vídeos + 8 itens de galeria
- [ ] Validar a história real de fundação na seção Origem (atualmente é prosa institucional construída a partir do DNA documentado)
- [ ] Decidir formato final dos vídeos (auto-host? YouTube? Vimeo? hosted no bucket?)

## Como continuar trabalhando aqui

Quando Claude Code receber tarefas neste projeto:

1. **Sempre começar abrindo o `index.html`** completo para entender a estrutura antes de qualquer edição
2. **Para mudanças de copy**: edita texto direto. Cuidar para não introduzir travessões longos
3. **Para novas seções**: seguir o padrão dos containers existentes (`<section class="section-...">` com `id`, container, header com `eyebrow`, conteúdo)
4. **CSS**: adicionar variáveis novas em `:root`. Manter unidade nas seções (cada seção tem seu próprio bloco de CSS no topo do arquivo)
5. **Mobile**: testar em viewport ≤ 880px. A maioria das seções tem media queries dedicados
6. **Imagens novas**: salvar em `/assets/`. PNG com transparência se for logo
7. **Antes de commit**: validar com busca por "VANGUARD.OS", "DIP", "Vanguardia" minúsculo, em-dash. Devem retornar 0

## Como rodar localmente

Não precisa de build. Abre `index.html` direto no navegador, ou serve com qualquer servidor estático:

```bash
# Python
python3 -m http.server 8000

# Node (se tiver instalado)
npx serve .
```

Depois acessa `http://localhost:8000`.

## Deploy sugerido

- **Vercel**: zero config. Conecta o repo GitHub, ele identifica como static site, faz deploy automático em cada push
- **Netlify**: idem
- **GitHub Pages**: ativa nas Settings do repo, aponta pra branch `main`, raiz

Para domínio próprio (ex: `vanguardia.com.br`), configurar DNS apontando para o provedor escolhido.
