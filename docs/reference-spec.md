# Especificação de referência — carolinasantos.com.br/advocacia-de-familia/

> **Aviso:** este documento descreve a página **original** de 18/11/2026. Depois disso, o site foi ajustado para anúncios em Portugal: as consultas passaram a ser pagas e todas as menções a "consulta gratuita" (textos, botões e mensagens de WhatsApp) foram removidas. Também mudaram os serviços, o título principal, os anos de experiência e o parcelamento. As referências a "Consulta Gratuita" abaixo valem só para o original e não existem mais no site.

Medido no **site original ao vivo** em 18/11/2026 com Edge headless (puppeteer-core), DPR 1, `--force-color-profile=srgb`, fontes carregadas e animações concluídas. Requisições de rastreamento (googletagmanager, google-analytics, googleadservices, doubleclick e Google One Tap) foram **bloqueadas** durante a medição. Nos testes de clique, `gtag_report_conversion` e `window.open` foram substituídos por stubs, para não registrar conversões no Google Ads nem abrir o WhatsApp.
Viewports: **1440×900, 1024×768, 768×1024, 390×844**; a sonda de breakpoints usou altura 900. Os valores estão em px CSS e as caixas em `[x, y, largura, altura]`, com y medido a partir do topo do documento.
Dados brutos estão em `scratchpad/qa/agent1/ref.json` e `ref-interact.json`, e as capturas em `ref_*.png`.

---

## 1. Ordem das seções e mapa do DOM

A página é um documento HTML completo colado no template "blank slate" do tema Extendable (WordPress 7.1.4).
`<body class="wp-singular page-template page-template-blank-slate-template page-template-blank-slate-template-php page page-id-189 wp-custom-logo wp-embed-responsive wp-theme-extendable blank-slate">`

| # | Nó (filho de `article#post-189`) | Observação | Caixa @1440 |
|---|---|---|---|
| 0 | `pre.wp-block-code > code` (vazio) | Faixa com borda `1px solid #ccc` (rgb 204,204,204), raio 4px, padding `.8em 1em` e fonte Menlo/Consolas. O `code` tem 0px de altura. | `[0,0,1440,30.78]` |
| 1–20 | 10×`meta`, `title`, 4×`script`, 3×`link`, `style` | Restos do `<head>` colado, todos com `display:none`: gtag AW, `gtag_report_conversion`, Google Fonts, JSON-LD Attorney e o `<style>` da página | 0×0 |
| 21 | `header#header.header` | `position:fixed; top:0; z-index:50`, sobreposto à faixa `pre` | `[0,0,1440,88]` |
| 22 | `section#inicio.hero` | `display:flex; min-height:100vh` | `[0,30.78,1440,900]` |
| 23 | `section.social-proof` | — | `[0,930.78,1440,544.56]` |
| 24 | `section#servicos.services.section-padding` | 6 `.service-block`. O `.section-header` **não tem** `h2.section-title` (só label e descrição). | `[0,1475.34,1440,2769.56]` |
| 25 | `section#diferenciais.differentials.section-padding` | 6 `a.differential-card` | `[0,4244.91,1440,939.69]` |
| 26 | `section#contato.cta.section-padding` | — | `[0,5184.59,1440,740.34]` |
| 27 | `footer.footer` | — | `[0,5924.94,1440,518.33]` |
| 28 | `div.whatsapp-float` | `fixed; bottom:32px; right:32px; z-index:40`. Contém `div.whatsapp-pulse` **sem CSS** (block, 64×0, sem animação), `a.whatsapp-float-btn` e `span.whatsapp-tooltip`. | `[1344,804,64,64]` (viewport) |
| 29 | `script` (inline: scroll, menu e rastreamento) | — | — |
| 30 | `p.wp-block-paragraph` (vazio) | Altura 0 | `[0,6443.27,1440,0]` |

Filhos de `body`: `noscript` (iframe do GTM-5T2CXTQ8), `article`, e depois scripts e estilos do WP (`wp-block-code-inline-css`, `wp-block-code-theme-inline-css`, Site Kit, wp-consent-api e `wp-emoji-settings` com o loader).
`document.title` = **"Advocacia de família - CAROLINA SANTOS"**. O `<title>` interno, colado no corpo, não é aplicado.

---

## 2. Design tokens

### 2.1 Custom properties (`:root` da página), resolvidas

| Token | Declarado | RGB resolvido |
|---|---|---|
| `--background` / `--primary-foreground` / `--accent-foreground` | `hsl(210,20%,8%)` | `rgb(16,20,24)` |
| `--foreground` / `--card-foreground` | `hsl(180,10%,95%)` | `rgb(241,244,244)` |
| `--card` | `hsl(210,18%,12%)` | `rgb(25,31,36)` |
| `--primary` / `--tiffany` | `hsl(174,50%,55%)` | `rgb(83,198,186)` |
| `--secondary` | `hsl(174,45%,65%)` | `rgb(126,206,198)` |
| `--muted` | `hsl(210,15%,18%)` | `rgb(39,46,53)` |
| `--muted-foreground` | `hsl(180,8%,65%)` | `rgb(159,173,173)` |
| `--accent` / `--gold` | `hsl(42,65%,55%)` | `rgb(215,170,66)` |
| `--gold-light` | `hsl(42,60%,70%)` | `rgb(224,197,133)` |
| `--border` | `hsl(210,15%,20%)` | `rgb(43,51,59)` |
| `--tiffany-light` | `hsl(174,45%,70%)` | `rgb(144,213,206)` (não usado) |
| `--tiffany-dark` | `hsl(174,55%,40%)` | `rgb(46,158,147)` (não usado) |
| `--whatsapp` | `#25D366` | `rgb(37,211,102)` |
| `--whatsapp-hover` | `#20BD5A` | `rgb(32,189,90)` |
| `--urgent` | `hsl(0,70%,55%)` | `rgb(221,60,60)` (não usado) |
| `--radius` | `0.5rem` | (não usado) |

**Cores fixas recorrentes**
- Borda padrão: `rgba(43,51,59,.5)`.
- Tiffany com alfa: `rgba(83,198,186,.1/.2/.3/.5)`.
- Gradiente do hero e do CTA: `linear-gradient(135deg, rgb(12,15,18) 0%, rgb(25,31,36) 50%, rgb(13,38,36) 100%)`.
- `.text-gradient-tiffany`: `linear-gradient(135deg, rgb(83,198,186), rgb(126,206,198))`.
- `.text-gradient-gold`: `linear-gradient(135deg, rgb(215,170,66), rgb(224,197,133))`.
- Ambos os gradientes de texto usam `-webkit-text-fill-color: transparent` e `background-clip: text`.
- `body`: bg `rgb(16,20,24)`, cor `rgb(241,244,244)`, `line-height: 1.6`, `-webkit-font-smoothing: antialiased`. `html` tem `scroll-behavior: smooth`.
- Cores globais do WP (`--wp--preset--color--background:#272725`, `foreground:#fff`) ficam **sobrescritas** pela página.

### 2.2 Fontes efetivamente renderizadas (CDP `getPlatformFontsForNode`)

| Família CSS | Arquivo baixado | Usada em |
|---|---|---|
| `Montserrat` (Google Fonts, variável) | `fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2` | `body` e todo o texto sans. Faces 400/500/600/700 ativas. O `montserrat.woff2` do tema é declarado, mas **nunca é baixado**. |
| `Cormorant Garamond` (Google Fonts, variável) | `…/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2` | `h1`, `h2` (todos), `.logo-name`, `.footer-brand-name`, `.stat-number` (700). Faces carregadas: 400 e 700. |
| `Cormorant` (fonte do tema, `wp-fonts-local`) | `wp-content/uploads/fonts/cormorant-latin-600-normal.woff2` | **`h3.differential-title` e `h4.footer-title`**: essas classes não definem `font-family`, então vale a regra global do WP `h1…h6 { font-family: Cormorant }`. |

Regras globais do WP que vazam para a página e devem ser mantidas:
- `body { font-size: clamp(0.875rem, 0.875rem + ((1vw - 0.2rem) * 0.417), 1.125rem) }` → **18px a partir de ≈1279px**, 16.9357 @1024, 15.8682 @768, 14.2919 @390 e mínimo de 14px abaixo de 320px.
- `h1, h2 { font-weight: 300; letter-spacing: -0.02em; line-height: 1.15 }`.
- `h3 { font-weight: 300; letter-spacing: 0.04em; line-height: 1.15 }`.
- `h4 { font-size: clamp(1.5rem, 1.5rem + ((1vw - 0.48rem) * 0.721), 1.875rem); font-weight: 500; line-height: 1.15 }`.

A página só sobrescreve parte dessas propriedades.
O Google Fonts não serve o peso 300 de Cormorant Garamond, então os títulos com peso computado 300 usam a face **400**.

### 2.3 Tipografia por elemento (computado; "→" indica 1440 / 1024 / 768 / 390)

| Elemento | Família | Tamanho | Peso | Line-height | Letter-spacing | Cor |
|---|---|---|---|---|---|---|
| `body` | Montserrat | 18 → 16.94 → 15.87 → 14.29 (clamp) | 400 | 1.6 | normal | `rgb(241,244,244)` |
| `.logo-name` | Cormorant Garamond | 20 | 400 | 32px | normal | foreground |
| `.logo-subtitle` | Montserrat, uppercase | 12 | 500 | 19.2px | 0.1em (1.2px) | primary |
| `.nav-link` (desktop) | Montserrat | 14 | 500 | 22.4px | normal | muted-fg `rgb(159,173,173)` |
| `.mobile-menu .nav-link` | Montserrat | 16 | 500 | 25.6px | normal | muted-fg |
| `.header-cta-btn` | Montserrat | 14 | 600 | 22.4px | normal | #fff |
| `.trust-badge-text`, `.cta-badge-text` | Montserrat | 14 | 500 | 22.4px | normal | primary |
| **`h1.hero-title`** | Cormorant Garamond | 56 / 56 / 48 / 40 | **300** (WP) | **1.2** (67.2 @56) | **−0.02em** (−1.12px @56) | foreground, com spans em gradiente tiffany e gold |
| `.hero-description` | Montserrat | 18 (1.125rem) | 400; `strong` 700 com cor foreground | 1.7 (30.6px) | normal | muted-fg |
| `.btn-whatsapp-large` | Montserrat | 18 | 700 | 28.8px | normal | #fff |
| `.trust-indicator-text`, `.floating-card-subtitle`, `.stat-label`, `.service-tag`, `.cta-trust-item span`, `.footer-links a`, `.contact-label`, `.footer-copyright`, `.footer-brand-subtitle` | Montserrat | 14 | 400 | 22.4px | normal | muted-fg (`.service-tag` em foreground; `.footer-brand-subtitle` em primary) |
| `.floating-card-title` | Montserrat | body clamp | 600 | 1.6 | normal | foreground |
| `.scroll-text` | Montserrat, uppercase | 12 | 400 | 19.2px | 0.2em (2.4px) | muted-fg |
| `h2.social-proof-headline` | Cormorant Garamond | 28 | 300 | 1.15 (32.2) | −0.56px | foreground |
| `.stat-number` | Cormorant Garamond | 40 | 700 | 64px | normal | gradiente (inline, seguido do `.stat-label` também inline, que quebra linha) |
| `.btn-whatsapp` (social proof e menu mobile) | Montserrat | body clamp | 600 | 1.6 | normal | #fff |
| `.section-label` | Montserrat, uppercase | 14 | 600 | 22.4px | 0.1em (1.4px) | primary |
| `.section-description` | Montserrat | body clamp | 400 | 1.7 | normal | muted-fg |
| `h2.section-title` | Cormorant Garamond | 48 / 48 / 40 / 32 | 300 | 1.15 | −0.02em | foreground |
| `.service-block h2` | Cormorant Garamond | 28 | 300 | 1.15 | −0.56px | spans em gradiente; o " e " fica em foreground |
| `.service-block-content` | Montserrat | body clamp | 400; `strong` 700 com cor foreground | 1.8 | normal | muted-fg |
| `.service-keywords` | Montserrat, *italic* | 14 | 400 | 22.4px | normal | muted-fg |
| `.service-cta` | Montserrat | body clamp | 600 | 1.6 | normal | #fff |
| **`h3.differential-title`** | **Cormorant** | 18 | 600 | 1.15 (20.7px) | **0.04em** (0.72px) | foreground |
| `.differential-description` | Montserrat | 14 | 400 | 1.6 | normal | muted-fg |
| `h2.cta-title` | Cormorant Garamond | 48 / 48 / 40 / 32 | 300 | 1.2 | −0.02em | foreground com span tiffany |
| `.cta-description` | Montserrat | 18 | 400; `strong` 700 | 1.7 | normal | muted-fg |
| `.cta-main-btn` | Montserrat | 18 | 700 | 28.8px | normal | #fff |
| `.footer-brand-name` | Cormorant Garamond | 20 | 400 | 32px | normal | foreground |
| `.footer-description` | Montserrat | 14 | 400 | 1.7 | normal | muted-fg |
| **`h4.footer-title`** | **Cormorant** | 28.85 / 25.85 / 24 / 24 (clamp) | 600 | 1.15 | normal | foreground |
| `.contact-value` (e `a`) | Montserrat | body clamp | 400 | 1.6 | normal | foreground |
| `.footer-oab` | Montserrat | 12 | 400 | 19.2px | normal | muted-fg |
| `.whatsapp-tooltip` | Montserrat | 14 | 500 | 22.4px | normal | foreground (inclui emoji em `img.emoji` de 14×14) |
| `pre.wp-block-code` | Menlo, Consolas, monaco, monospace | body clamp | 400 | — | — | foreground |

### 2.4 Ícones SVG (cor real, já que `.icon-sm/-xs/-lg` não definem cor)

| Local | Classe | Tamanho | Cor |
|---|---|---|---|
| Hambúrguer e X do menu | `.icon` | 24 | **primary** fixo (o hover do botão não muda o ícone) |
| WhatsApp no CTA do hero | `.icon` | 24 | **primary** (tiffany sobre o verde) |
| `.floating-card-icon` | `.icon` | 24 | primary |
| `.service-tag` | `.icon-xs` | 16 | primary (`.service-tag svg`) |
| `.trust-badge`, `.cta-badge` | `.icon-xs` | 16 | foreground |
| `.trust-indicator` (2º e 4º com `style="color:var(--accent)"`) | `.icon-sm` | 20 | foreground / gold |
| `.service-block-icon`, `.differential-icon` | `.icon-lg` | 32 | foreground; no hover do card, `rgb(16,20,24)` |
| `.cta-trust-item` | `.icon-sm` | 20 | muted-fg |
| `.contact-item-icon` | `.icon-sm` | 20 | foreground (`margin-top: 4px`) |
| Botões verdes (header, social, service-cta, cta-main `.icon-lg`, float `.icon-lg` com `color:white`) | — | 16/20/32 | #fff |

---

## 3. Containers, espaçamentos e alturas

`.container`: `max-width: 1200px; margin: 0 auto; padding: 0 16px`, o que dá conteúdo de **1168px** a partir de 1200px de largura.
`.section-padding` (services, differentials e cta) já tem 16px de padding lateral, então o container interno fica com largura = viewport − 32px e conteúdo = viewport − 64px quando a viewport tem menos de 1232px.
`.social-proof` tem padding próprio de `64px 16px`.

**Peculiaridade do hero:** o `.container` do hero é *flex item* de `.hero{display:flex}`, então a largura dele é *shrink-to-fit*.
Em 1 coluna (menos de 1024px), quando o conteúdo é mais estreito que a viewport, o container encolhe e centraliza.
Exemplo @1023: container `[37,…,949]`, coluna de 917px. @900 e abaixo, o container ocupa a largura total.

| Seção | Padding | Altura @1440×900 | @1024×768 | @768×1024 | @390×844 |
|---|---|---|---|---|---|
| `pre.wp-block-code` | `.8em 1em` (14.4/18 @1440) | 30.78 | 29.09 | 27.38 | 24.84 |
| `.header` (fixo) | `20px 0` → `.scrolled`: `12px 0` | 88 (73 com `.scrolled`) | 88 | 88 | 88 (menu aberto: 372.66) |
| `.hero` | 0 (`.hero-content`: `112px` topo, `64px` base) | 900 (= 100vh) | 1014.47 | 1788.52 | 1595.38 |
| `.social-proof` | `64px 16px` | 544.56 | 541.16 | 563.14 | 959.58 |
| `.services` | `112px 16px` (≥1280) / `80px 16px` | 2769.56 | 2831.22 | 2994.53 | 4363.09 |
| `.differentials` | idem | 939.69 | 897.08 | 1160.75 | 1993.52 |
| `.cta` | idem | 740.34 | 676.34 | 657.16 | 876.89 |
| `.footer` | 0 (`.footer-grid` `64px 0`; `.footer-bottom` `32px 0`); `border-top` 1px | 518.33 | 504.67 | 568.14 | 1004.13 |
| **Documento** | — | **6443** | **6494** | **7760** | **10817** |

**Medidas internas (@1440, salvo indicação)**
- `.header-content`: flex, space-between, 48 de altura. `.logo-img` 48×48 com raio 8px; gap do logo-link 12px.
- `.nav-desktop`: gap 32px. Links em `x` 609 / 682 / 839.
- `.header-cta-btn`: padding `10px 20px`, gap 8px, raio 9999px, 189.47×42.39.
- Hero em 2 colunas `552px 552px`, gap 64px.
- `.trust-badge`: padding `8px 16px`, bg `rgba(83,198,186,.1)`, borda `rgba(83,198,186,.2)`, mb 24px. No hero, h1 com mb 24px, descrição com mb 32px e `max-width` 600px.
- `.hero-buttons`: gap 16px, mb 48px. `.btn-whatsapp-large`: padding `20px 40px`, gap 12px, 448.69×68.8.
- `.hero-trust-indicators`: gap 24px, `padding-top` 24px, `border-top` na cor da borda padrão, wrap. São 2 linhas @1440, @1024 e @390, e 1 linha @768.
- Imagem do hero: wrapper com raio 16px, `overflow: hidden` e sombra `rgba(0,0,0,.5) 0 20px 60px -15px`. O overlay vai de `rgba(16,20,24,.8)` em baixo até transparente.
- `.hero-image-glow`: `inset -16px`, gradiente tiffany→gold a .2, raio 24px, `blur(32px)`.
- `.hero-floating-card`: posicionado em `bottom:-24px; left:-24px`, padding 20px, raio 16px, gap 12px. O ícone tem 48×48, círculo `rgba(83,198,186,.2)`. A 768 e 390 o card fica em `x = -8`, cortado pela borda da viewport.
- Cantos decorativos: 96×96 em `-12px`. O de cima é primary (2px, raio 24px no canto superior direito); o de baixo é gold (raio 24px no canto inferior esquerdo).
- Orbs do hero: tiffany 600×600 em `top/right -160px`; gold 400×400 em `bottom 80px; left -160px`. Ambos com `blur(80px)` e `opacity .4`. Grade 60×60 com `opacity .05`.
- `.scroll-indicator`: `bottom 32px`, centralizado com `translateX(-50%)`. O mouse tem 24×40, borda 2px `rgba(83,198,186,.5)`; o ponto tem 6×12 em primary.
- Social proof: conteúdo com máx. 900px, centralizado.
  - `.services-list`: gap 12px, mb 32px. Tags com padding `8px 16px` e bg `rgba(39,46,53,.5)`; 2 linhas (4+1) @1440.
  - `.stats-row`: gap 32px, mb 40px, colunas de 201px @1440. `.stat-box`: padding 24px, raio 16px, 142.8 de altura.
  - CTA do social proof: padding `16px 32px`, 393.28×60.8.
- Services: `.section-header` com máx. 800px e mb 48px.
  - `.service-block`: padding 40px, raio 16px, mb 32px. Altura 387.36 nos blocos com `.service-keywords` (1º, 2º e 5º) e 347.97 nos demais.
  - Header do bloco: gap 16px, mb 24px; ícone 64×64 com raio 16px e bg `rgba(83,198,186,.1)`.
  - Texto com mb 24px. Keywords com `margin-top` e `padding-top` de 16px e `border-top`.
  - `.service-cta`: padding `14px 24px`, gap 8px.
- Differentials: padrão em listras a 45° com `opacity .02` e tamanho 40px. `.divider-tiffany` de 64×4, raio 2px, mb 24px.
  - Grid com gap 24px. Cards com padding 32px, raio 16px, bg `rgb(16,20,24)`, altura 272.25 ou 249.86.
  - Ícone 64×64 com mb 20px.
- CTA: conteúdo com máx. 768px. Badge com mb 32px. Descrição com máx. 640px e mb 40px.
  - `.cta-main-btn`: padding `20px 40px`, gap 16px, 540×72, mb 48px.
  - Trust badges com gap 32px. Orb de 600px centralizado com `translate(-50%,-50%)`.
- Footer: grid com gap 48px, padding `64px 0`, 3 colunas de 357.33px @1440.
  - `.footer-brand`: gap 12px, mb 24px. `.footer-logo` com raio 8px.
  - Título com mb 24px. Itens `li` com mb 12px. `.contact-item`: gap 12px, mb 16px.
  - `.footer-bottom`: `border-top`, padding `32px 0`, gap 16px.
- WhatsApp flutuante: botão de 64×64 em círculo, sombra `rgba(37,211,102,.5) 0 10px 40px -10px`.
  - Tooltip: padding `12px 16px`, raio 8px, bg card, `margin-right` 16px, `white-space: nowrap`, sombra `rgba(0,0,0,.5) 0 10px 30px -10px`, caixa 271.7×48.39.

---

## 4. Breakpoints (mobile-first, `min-width`)

| Propriedade | <640 | ≥640 | ≥768 | ≥1024 | ≥1280 |
|---|---|---|---|---|---|
| `.hero-title` | 40px | **48px** | 48 | **56px** | 56 |
| `.hero-buttons` | column (botão com largura total, 358×97.59 @390) | **row** | row | row | row |
| `.section-title` / `.cta-title` | 32px | **40px** | 40 | **48px** | 48 |
| `.logo-text` | none (só o logo) | **block** | block | block | block |
| `.stats-row` | 2 colunas (`1fr` com mínimo automático: 271.5 iguais @639; 145.25 / 148.75 @390) | **4 colunas** (desiguais @640: 131.58 / 144.73 / 120.94 / 148.75; iguais a 151.75 @767) | 4 (152 @768) | 4 (201 @1024+) | 4 |
| `.differentials-grid` | 1 coluna | **2 colunas** | 2 (340 @768) | **3 colunas** (304 @1024; 373.33 @1440) | 3 |
| `.header-cta` | none | none | **block** | block | block |
| `.mobile-menu-btn` | block | block | **none** | none | none |
| `.nav-desktop` | none | none | none | **flex** | flex |
| `.footer-grid` | 1 coluna | 1 | **3 colunas** (213.33 @768) | 3 (298.66 @1024) | 3 (357.33 @1440) |
| `.footer-bottom` | column, centralizado | column | **row, space-between, left** | row | row |
| `.hero-content` | 1 coluna, gap 48 | idem | idem | **2 colunas, gap 64** | idem |
| `.section-padding` | `80px 16px` | idem | idem | idem | **`112px 16px`** |

Observações:
- **Entre 768 e 1023px não há navegação nenhuma.** O hambúrguer some a partir de 768 e o menu desktop só aparece a partir de 1024; o header mostra apenas o logo e o botão "Consulta Gratuita".
- **Valores fluidos (clamp do WP, sem breakpoint):** tamanho do `body` (e tudo que o herda, além do padding do `pre`) e do `h4`, cujo valor fica em 24 até 768, 25.85 @1024, 27.69 @1280, 28.85 @1440 e 30 a partir de ≈1600. O `h3.differential-title` fica fixo em 18px e o `.service-block h2` fixo em 28px.
- **Altura do documento na sonda (altura 900):** 8911 @639, 8213 @640, 8144 @767, 7760 @768, 7593 @1023, 6494 @1024, 6250 @1279 e 6442 @1280.

---

## 5. Animações e estados interativos

### 5.1 `@keyframes`

| Animação | Elementos | Duração | Delay | Easing | Iterações / fill | Keyframes (amostras medidas) |
|---|---|---|---|---|---|---|
| `fade-up` | `.animate-fade-up` (coluna de texto do hero) | 0.8s | 0 | ease-out | 1 / forwards | `opacity 0→1`, `translateY(30px→0)`. Aos 25% fica em 0.378 / 18.66px; aos 50%, 0.685 / 9.46px; aos 75%, 0.907 / 2.80px. |
| `fade-up` | `.hero-image-container` (via `style` inline, que também traz `opacity:0`) | 0.8s | **0.3s** | ease-out | 1 / forwards | Igual ao anterior. Fica invisível durante o delay porque o `opacity:0` é inline. |
| `float` | `.hero-floating-card` | 6s | 0 | ease-in-out | infinite | `translateY 0 → -10px (50%) → 0` |
| `pulse-slow` | `.scroll-indicator`, `.cta-badge` | 3s | 0 | ease-in-out | infinite | `opacity 1 → 0.7 (50%) → 1`. O `translateX(-50%)` do indicador é preservado. |
| `bounce` | `.scroll-dot` | 1s | 0 | ease-in-out | infinite | `translateY 0 → -5px → 0` |
| `pulse-ring` | **nenhum** (definida e não usada; `.whatsapp-pulse` não tem CSS) | — | — | — | — | — |

Com `prefers-reduced-motion: reduce` (CSS do tema Extendable), toda animação e transição passa a durar 0.01ms com 1 iteração, e o `scroll-behavior` volta a ser `auto`.

### 5.2 Hover

Medido com `mouse.move` e 900ms de espera. "→" indica o estado final.

| Alvo | Mudanças | Transição |
|---|---|---|
| `.logo-link` → `.logo-img` | `transform: scale(1.05)` | transform 0.3s ease |
| `.nav-link` (desktop) | cor `rgb(159,173,173)` → `rgb(83,198,186)`. O `::after` (2px, primary, `bottom:-4px`) vai de largura 0 → 100% (41.28px em "Sobre"). | color 0.3s; width 0.3s |
| `.mobile-menu .nav-link` | cor → primary. O `::after` vai de 0 → 358px (o link é block e ocupa a largura toda). | idem |
| `.header-cta-btn` | bg → `#20BD5A`, `scale(1.05)`, **sem sombra** | all 0.3s ease |
| `.btn-whatsapp` (CTA do hero, social proof, menu mobile) | bg → `#20BD5A`, `scale(1.05)`, sombra `rgba(37,211,102,.5) 0 10px 40px -10px` | all 0.3s ease |
| `.service-block` | `border-color` `rgba(43,51,59,.5)` → `rgba(83,198,186,.3)`, sombra `rgba(0,0,0,.3) 0 20px 60px -15px` | all 0.5s ease |
| `.service-cta` | bg → `#20BD5A`, `scale(1.02)` | all 0.3s ease |
| `.differential-card` | borda → `rgba(83,198,186,.3)`, `translateY(-5px)`, sem sombra. O `.differential-icon` passa de bg `rgba(83,198,186,.1)` para `rgb(83,198,186)` (0.3s). O ícone vai de `rgb(241,244,244)` para `rgb(16,20,24)` **instantaneamente** (o SVG não tem transição). | card all 0.5s ease |
| `.cta-main-btn` | bg → `#20BD5A`, `scale(1.05)`, sombra `rgba(37,211,102,.6) 0 20px 60px -15px` | all 0.3s ease |
| `.footer-links a` | cor muted-fg → primary | color 0.3s |
| `.contact-value a` | cor foreground → primary | color 0.3s |
| `.whatsapp-float-btn` | bg → `#20BD5A`, `scale(1.1)`, sombra `.5 0 10px 40px -10px` → `rgba(37,211,102,.6) 0 15px 50px -10px` | all 0.3s ease |
| `.whatsapp-float:hover .whatsapp-tooltip` | `opacity 0 → 1`. A tooltip fica à esquerda do botão (`right:100%`, `margin-right:16px`, centrada na vertical) e tem `pointer-events:none`. | opacity 0.3s |
| `.mobile-menu-btn` | cor foreground → primary; sem efeito visual, porque o SVG `.icon` já é primary | color 0.3s |
| Sem hover | `.scroll-indicator`, `.footer-brand`, `.service-tag`, `.stat-box`, `.trust-badge`. `.btn-tiffany` e `.card-elegant` têm CSS, mas não aparecem no DOM. | — |

O **`.scroll-indicator` nunca recebe clique nem hover**: em todas as larguras ele fica coberto pelo `.hero > .container` (`z-index:10`). O `elementFromPoint` no centro dele retorna `.hero-content` @1440, `.hero-image-overlay` de 768 a 1023 e `.hero-floating-card` @390.

### 5.3 Foco

Não há estilo de foco próprio. Vale o anel padrão do navegador em `:focus-visible` (`outline: auto 1px`, offset 1px).
O `a:focus { text-decoration-style: dashed }` do tema não aparece, porque `text-decoration-line` é `none`.
Ordem do Tab @1440: logo → Sobre → Áreas de Atuação → Contato → …

---

## 6. Interações

### 6.1 Header `.scrolled` (listener de `scroll`, condição `scrollY > 50`)

| scrollY | Classe | Altura | Padding | Fundo | `backdrop-filter` | `border-bottom` |
|---|---|---|---|---|---|---|
| 0 e 50 | `header` | 88 | `20px 0` | transparente | none | none (0px) |
| 51 e 400 | `header scrolled` | **73** | `12px 0` | `rgba(16,20,24,.95)` | `blur(12px)` | `1px solid rgba(43,51,59,.5)` |

A transição é `all 0.5s ease`. Amostra aos 250ms: padding 13.86px, alfa .73, `blur(9.2px)`.
A cor da borda transiciona a partir de `currentColor` (`rgb(241,244,244)`), o que deixa uma **linha clara momentânea** (`rgba(118,124,128,.62)` no meio da transição). O mesmo comportamento acontece @390.

### 6.2 Menu mobile (abaixo de 768px)

O clique em `#mobile-menu-btn` alterna `.active` em `#mobile-menu` e o display dos ícones (`#menu-icon` ↔ `#close-icon`, via `style.display`).

| Estado | `.mobile-menu` | Header | Itens |
|---|---|---|---|
| Fechado | `display:none` | 88px | — |
| Aberto | flex column, gap 16, padding `16px 0`, `margin-top` 16, `border-top` 1px `rgba(43,51,59,.5)`, caixa `[16,84,358,268.66]` | **372.66px**, fundo **transparente** em scrollY 0 (o menu se sobrepõe ao texto do hero; ver `ref_390_menu_open.png`) | 3 `.nav-link` (block, 16px/500, padding `8px 0`, 41.59 de altura) e `.btn-whatsapp` (flex, `justify-content:center`, `margin-top:8px` inline, 358×54.88) |

Detalhes:
- O menu **não fecha** ao clicar num link nem ao rolar.
- O ícone começa com `display:inline` (botão 40×43). Depois de abrir e fechar, passa a `display:block` (botão 40×40) e o ícone desce 1.5px.
- O botão herda a fonte padrão de `<button>` (13.33px Arial), sem efeito visual.

### 6.3 Interceptação dos links do WhatsApp (conversão Google Ads)

No original, o handler é registrado em `DOMContentLoaded` e pega todos os `a[href*="wa.me"]` (34 links).
O clique chama `e.preventDefault()` e depois `gtag_report_conversion(href)`; se a função não existir, chama `window.open(href,'_blank')`.

```js
function gtag_report_conversion(url){ var callback=function(){ if(typeof(url)!='undefined'){ window.open(url,'_blank'); } };
  gtag('event','conversion',{'send_to':'AW-17141670851/mvQGCPvC8ukbEMPH5O0_','event_callback':callback}); return false; }
```

Resultado medido: 34/34 cliques com `defaultPrevented`, 34 chamadas de conversão e nenhuma navegação direta.
**O original não tem fallback:** se o gtag.js não carregar (bloqueador de anúncios), o `event_callback` nunca dispara e o WhatsApp não abre.
O gtag do Ads é carregado duas vezes: pelo `<head>` colado (`AW-17141670851`) e pelo Site Kit (`GT-M6BTZ9RT`, que também faz `config AW-17141670851`). Há ainda o GTM `GTM-5T2CXTQ8` e consent mode com padrão `denied` para a lista de regiões do EEE, Reino Unido e Suíça.

### 6.4 Inventário dos links `wa.me`

São **34 links**, todos para `https://wa.me/5511918582706`, com `target="_blank"` e `rel="noopener noreferrer"`.

| Seção | # | Elemento e rótulo | Texto pré-preenchido (decodificado) |
|---|---|---|---|
| Header | 1 | `a.logo-link` (logo e "Dra. Carolina / Advogada") | Olá Dra. Carolina, vim pelo site e gostaria de saber mais. |
| | 2 | `.nav-desktop` "Sobre" | Olá Dra. Carolina, vim pelo site e gostaria de saber mais sobre a senhora. |
| | 3 | `.nav-desktop` "Áreas de Atuação" | Olá Dra. Carolina, vim pelo site e gostaria de saber mais sobre as áreas de atuação. |
| | 4 | `.nav-desktop` "Contato" | Olá Dra. Carolina, vim pelo site e gostaria de agendar uma consulta. |
| | 5 | `.header-cta-btn` "Consulta Gratuita" | Olá Dra. Carolina, gostaria de agendar uma consulta gratuita. |
| | 6–8 | `.mobile-menu` Sobre / Áreas de Atuação / Contato | Mesmos textos dos itens 2–4 |
| | 9 | `.mobile-menu .btn-whatsapp` "Consulta Gratuita" | Olá Dra. Carolina, gostaria de agendar uma consulta gratuita. |
| Hero | 10 | `.btn-whatsapp-large` "Agende sua Consulta GRATUITA" | Olá Dra. Carolina, gostaria de agendar uma consulta gratuita. |
| | 11 | `.scroll-indicator` "Saiba mais" (não clicável, ver 5.2) | Olá Dra. Carolina, gostaria de mais informações. |
| Social proof | 12 | `.btn-whatsapp` "Quero Resolver Meu Caso Agora" | Olá Dra. Carolina, gostaria de agendar uma consulta gratuita. |
| Serviços | 13 | "Fale sobre seu caso agora" | Olá Dra. Carolina, gostaria de saber mais sobre Divórcio e Dissolução de União Estável. |
| | 14 | "Proteja seus direitos agora" | Olá Dra. Carolina, gostaria de saber mais sobre Guarda de Menor e Ação de Alimentos. |
| | 15 | "Realize o sonho da adoção" | Olá Dra. Carolina, gostaria de saber mais sobre Adoção e Direito da Criança. |
| | 16 | "Peça ajuda agora – Sigilo Total" | Olá Dra. Carolina, preciso de ajuda urgente com violência doméstica. |
| | 17 | "Consulte uma especialista internacional" | Olá Dra. Carolina, tenho um caso internacional e preciso de orientação. |
| | 18 | "Atendimento onde você estiver" | Olá Dra. Carolina, estou no exterior e preciso de orientação jurídica. |
| Diferenciais | 19 | Card "Experiência" | Olá Dra. Carolina, gostaria de saber mais sobre sua experiência. |
| | 20 | Card "On-line" | Olá Dra. Carolina, gostaria de agendar uma consulta online. |
| | 21 | Card "Parcelamento" | Olá Dra. Carolina, gostaria de saber sobre parcelamento de honorários. |
| | 22 | Card "Estratégia" | Olá Dra. Carolina, gostaria de conhecer suas estratégias jurídicas. |
| | 23 | Card "Acervo" | Olá Dra. Carolina, gostaria de saber mais sobre o acervo jurídico. |
| | 24 | Card "Sigilo Absoluto" | Olá Dra. Carolina, gostaria de agendar uma consulta sigilosa. |
| CTA | 25 | `.cta-main-btn` "AGENDAR CONSULTA GRATUITA AGORA →" | Olá Dra. Carolina, gostaria de agendar minha consulta gratuita. |
| Footer | 26 | `a.footer-brand` | Olá Dra. Carolina, vim pelo site. |
| | 27 | "Divórcio e União Estável" | Olá Dra. Carolina, gostaria de saber sobre Divórcio. |
| | 28 | "Guarda de Menor" | Olá Dra. Carolina, gostaria de saber sobre Guarda de Menor. |
| | 29 | "Ação de Alimentos" | Olá Dra. Carolina, gostaria de saber sobre Pensão Alimentícia. |
| | 30 | "Adoção" | Olá Dra. Carolina, gostaria de saber sobre Adoção. |
| | 31 | "Violência Doméstica" | Olá Dra. Carolina, preciso de ajuda com violência doméstica. |
| | 32 | "Direito Internacional" | Olá Dra. Carolina, tenho um caso internacional. |
| | 33 | `.contact-value a` "+55 11 91858-2706" | **(sem `?text=`)**: `https://wa.me/5511918582706` |
| Flutuante | 34 | `.whatsapp-float-btn` (`aria-label="Contato via WhatsApp"`) | Olá Dra. Carolina, gostaria de agendar uma consulta gratuita. |

O `href` usa `Olá%20…` com acentos literais (não codificados), exatamente como no original.
Links visíveis por largura (medido):
- @1440 e @1024: 30 (os itens 6–9, do menu mobile, ficam ocultos).
- @768: 27 (os itens 2–4 e 6–9 ficam ocultos e inacessíveis).
- @390: 26 (os itens 2–9 ficam ocultos; 6–9 aparecem quando o menu abre).

---

## 7. Imagens

| Imagem | Arquivo original | Natural | Renderizado e recorte |
|---|---|---|---|
| `#logo-img.logo-img` | `uploads/2025/05/WhatsApp-Image-2025-03-25-at-16.59.53-1-copia.jpeg` | 361×443 | Caixa de **48×48** em todas as larguras, `object-fit: contain`, centrada, raio 8px. A imagem visível fica com 39.11×48 e faixas transparentes de 4.44px nas laterais. Hover: `scale(1.05)`. |
| `#hero-img.hero-image` | `uploads/2025/05/WhatsApp-Image-2025-03-25-at-17.01.55.jpeg` | 917×974 | `width:100%`, `aspect-ratio 4/5`, `object-fit: cover`, `object-position 50% 50%`. Tamanhos: 552×690 @1440; 464×580 @1024; 736×920 @768; 358×447.5 @390; ≈917×1146 @1023 (derivado da coluna de 917px). A escala é pela altura e o recorte horizontal é de **15.0%** (7.5% de cada lado); a região visível da fonte é ≈779×974, a partir de x≈69. Raio 16px (wrapper). |
| `#footer-logo.footer-logo` | Mesmo arquivo do logo | 361×443 | Declarada como 56×56, mas, como flex item com `min-width:auto`, **encolhe para 45.63×56**, que é exatamente a proporção da imagem (sem faixas). Raio 8px. É igual em todas as larguras. |
| `img.emoji` (na tooltip) | `s.w.org/images/core/emoji/17.0.2/svg/1f4ac.svg` (Twemoji inserido pelo `wp-emoji-loader`) | 150×150 (SVG) | 14×14 (1em), `vertical-align:-0.1em`, `margin: 0 .07em` (estilo `img.emoji` do WP) |

Favicons: `…-copia-150x150.jpeg` (32×32) e `…-copia.jpeg` (192×192 e apple-touch-icon).

---

## 8. Desvios aceitos (local × original)

- **Imagens e fontes** são cópias auto-hospedadas e idênticas: `/assets/img/*`, `/fonts/cormorant-latin(-ext)-*-normal.woff2`. Montserrat e Cormorant Garamond continuam vindo do Google Fonts, com a mesma URL do original.
- **Emoji 💬:** o original renderiza o `img.emoji` do Twemoji (`1f4ac.svg`) que o `wp-emoji-loader` do WordPress insere. O local usa o mesmo SVG em `/assets/img/emoji/1f4ac.svg`, já como `<img class="emoji">` estático.
- **Google Ads (gtag `AW-17141670851`)** só é carregado no domínio de produção (`window.CS_TRACKING`). Fora dele, o clique abre o WhatsApp direto com `window.open(url,'_blank','noopener')`. Em produção, envia a mesma conversão `AW-17141670851/mvQGCPvC8ukbEMPH5O0_` e tem fallback de 1s, que o original não tem.
- **Nós sem renderização:** os restos do `<head>` colado dentro do `article` (meta, title, scripts, link e style), os scripts do WP, o Site Kit e o loader de emoji não são reproduzidos.

### Verificação cruzada com http://localhost:5173/

Rodei as mesmas medições nas 4 larguras. Tipografia computada, fontes renderizadas, caixas, layout, imagens, os 34 links, estados de hover, menu mobile, header `.scrolled`, foco e breakpoints ficaram **idênticos**. As únicas diferenças foram:
- Fase da animação `float` (±3px em `.hero-floating-card`) e de `pulse-slow`, que dependem do instante da medição.
- Amostras no meio da transição do header (diferença de alguns ms).
- O comportamento de clique e rastreamento descrito acima.

### Discrepâncias não visuais observadas (não corrigidas)

1. **Tags do Site Kit:** o original também carrega o GTM `GTM-5T2CXTQ8` (com `noscript`) e o GA4/Google tag `GT-M6BTZ9RT`, com consent mode. O local só tem o `AW-17141670851`.
2. **`og:image` no local é relativo** (`/assets/img/logo-cs.jpeg`). No original (Yoast) é absoluto: `https://carolinasantos.com.br/wp-content/uploads/2025/05/WhatsApp-Image-2025-03-25-at-16.59.53-1-copia.jpeg`.
3. **Metadados OG:** o original expõe dois conjuntos. O do Yoast, no `<head>`, tem `og:type=article`, `og:title="Advocacia de família - CAROLINA SANTOS"` e `twitter:label1/data1`. O da página, no corpo, tem `og:type=website` e `og:title="Dra. Carolina Santos | …"`. O local só tem o segundo.

Ferramentas: `scratchpad/tools/agent1/measure.mjs`, `interact.mjs`, `probe.mjs` e `diff.mjs`.
