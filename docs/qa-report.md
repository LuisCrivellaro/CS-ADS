# Relatório de QA — auditoria final da recriação

> **Aviso:** este documento descreve a página **original** de 18/11/2026. Depois disso, o site foi ajustado para anúncios em Portugal: as consultas passaram a ser pagas e todas as menções a "consulta gratuita" (textos, botões e mensagens de WhatsApp) foram removidas. Também mudaram os serviços, o título principal, os anos de experiência e o parcelamento. As referências a "Consulta Gratuita" abaixo valem só para o original e não existem mais no site.

Auditoria independente da recriação estática de <https://carolinasantos.com.br/advocacia-de-familia/>, feita em 18/11/2026 contra o **site original ao vivo**, nas duas formas de entrega do projeto:

- **dev:** `npm run dev` em <http://localhost:5173/>
- **build:** `npm run build` + `vite preview` em <http://localhost:4173/>

**Ambiente:** Edge headless (puppeteer-core), DPR 1 (e DPR 2 em uma rodada), `--force-color-profile=srgb` e `--hide-scrollbars`. Nas larguras abaixo de 768 px, emulação de celular (`isMobile` e `hasTouch`). Fontes e imagens eram aguardadas antes de cada captura. As animações eram congeladas de forma determinística: as finitas no estado final e as infinitas em t=0.

**Segurança dos testes:** `wa.me`, `api.whatsapp.com`, `googletagmanager.com`, `google-analytics.com`, `googleadservices.com`, `doubleclick.net`, `www.google.com` e `accounts.google.com` foram desviados para um endereço morto (`--host-resolver-rules`). Nenhum clique chegou ao WhatsApp e nenhuma conversão foi registrada no Google Ads da cliente. A exceção foi o primeiro comparativo visual (dev), que rodou antes do bloqueio: ele carregou o original 7 vezes, sem cliques, e essas cargas podem ter contado como visitas no Analytics.

Os scripts estão em `scratchpad/tools/agent6/`, e as capturas e os JSONs brutos, em `scratchpad/qa/agent6/`.

---

## 1. Verificações realizadas

| # | Verificação | Como | dev | build |
|---|---|---|---|---|
| 1 | Paridade visual, página inteira e por seção | `compare.mjs` em 1920×1080, 1440×900, 1280×800, 1024×768, 768×1024, 390×844 e 360×740 | ✔ | ✔ |
| 2 | Repetibilidade (ruído de captura) | Original × original e local × local, página inteira e viewport rolado, a 1440 | ✔ | — |
| 3 | Tipografia, caixas, cores e espaçamentos | `--styles`: cerca de 430 elementos × 25 propriedades computadas, mais caixa (tolerância de 1 px), por viewport | ✔ | ✔ |
| 4 | Viewports rolados no celular | 390×844 e 360×740, uma captura a cada 700 px até o fim da página | ✔ | ✔ |
| 5 | DPR 2 (retina) | Viewports rolados a 390×844 e 1440×900 | ✔ | ✔ |
| 6 | Animações | Inventário (nome, duração, atraso, iterações, easing e fill) e quadros intermediários em t = 150, 450, 900 e 1600 ms, a 1440 e 390 | ✔ | ✔ |
| 7 | Header ao rolar | y = 40, 60 e 700 e volta ao topo, a 1440 e 390: classe `.scrolled`, estilos computados e captura | ✔ | ✔ |
| 8 | Menu mobile | Visibilidade do botão a 390, 360, 768 e 1023; abrir e fechar, no topo e com a página rolada: classe, ícones, caixa e captura | ✔ | ✔ |
| 9 | Hover | 13 alvos (logo, nav, CTA do header, botões, cards, serviços, links do rodapé, botão flutuante e tooltip), a 1440 e 1024 | ✔ | ✔ |
| 10 | Foco por teclado | Tab 1 a 6 e 8 vezes, a 1440 e 390: elemento focado, contorno e captura | ✔ | ✔ |
| 11 | Links do WhatsApp | Quantidade, `href`, `target` e `rel` exatos contra o HTML original; clique programático nos 34 e clique real de mouse em todos os visíveis; contagem de `window.open` e de abas novas | ✔ | ✔ |
| 12 | Rastreamento fora de produção | `CS_TRACKING`, `dataLayer` e requisições ao Google | ✔ | ✔ |
| 13 | Rastreamento em produção (simulado) | `CS_TRACKING` forçado para `true` antes dos scripts e `dataLayer.push` instrumentado. Três cenários: gtag nunca responde, responde em 100 ms e responde em 1500 ms | ✔ | ✔ |
| 14 | Console, erros JS, requisições com falha ou 4xx | Nas 7 larguras | ✔ | ✔ |
| 15 | Overflow horizontal | `scrollWidth`, `scrollX` após `scrollTo(5000,0)` e elementos além da borda, nas 7 larguras | ✔ | ✔ |
| 16 | IDs duplicados, imagens e `alt` | Nas 7 larguras, comparados com o original | ✔ | ✔ |
| 17 | Fontes | `document.fonts` carregadas (família, peso e estilo) comparadas com o original nas 7 larguras | ✔ | ✔ |
| 18 | Assets idênticos | SHA-256 de logo, logo 150×150, foto, emoji e das 10 fontes Cormorant contra as URLs originais | ✔ | ✔ |
| 19 | HTML bem formado | Contagem de tags na fonte × DOM parseado (detecta fechamentos implícitos e reparentamento); `lang`; meta no `body` | ✔ | ✔ |
| 20 | Saída do build | Arquivos em `dist/`, URLs no CSS e no HTML gerados | — | ✔ |
| 21 | Deriva de código-fonte | Diff por tokens: parciais × marcação original; regras CSS (cascata completa do original) × CSS do projeto; `main.js` × script original | ✔ | — |

---

## 2. Resultados — paridade visual (mismatch de pixels, pixelmatch com limiar 0.1)

| Viewport | Altura da página (original = local) | Página inteira (dev) | Página inteira (build) | 1º viewport (dev / build) | Pior seção (dev / build) |
|---|---|---|---|---|---|
| 1920×1080 | 6625 | 0.001% | 0% | 0% / 0% | `.cta` 0.009% / 0% |
| 1440×900 | 6443 | 0.001% | 0% | 0% / 0% | `.cta` 0.012% / 0% |
| 1280×800 | 6428 | 0.002% | 0.002% | 0% / 0% | `.cta` 0.015% / 0.016% |
| 1024×768 | 6494 | 0% | 0.002% | 0% / 0% | — / `.cta` 0.022% |
| 768×1024 | 7760 | 0.002% | 0% | 0% / 0% | `.cta` 0.029% / 0% |
| 390×844 | 10817 | 0% | 0% | 0% / 0% | — / — |
| 360×740 | 11353 | 0% | 0% | 0% / 0% | — / — |

- **Posição das seções:** as caixas de todas as seções (`pre`, header, hero, social-proof, services, differentials, cta, footer e botão flutuante) são idênticas ao original em todas as larguras.
- **Único resíduo:** uma linha de 1 px na borda inferior do selo "Consulta Gratuita" do CTA (`.cta-badge`, cerca de 160×3 px). É **ruído de captura, não diferença de layout**:
  - As caixas subpixel do selo são idênticas (`629.266, 5296.594, 181.453 × 40.391` a 1440).
  - O mesmo resíduo aparece entre **duas capturas do próprio original**: original × original deu 129 px (0.0014%), enquanto local × local deu 0 px e original × local deu 0 px nessa rodada.
  - A causa é o arredondamento da camada composta da animação `pulse-slow` durante a captura de página inteira.
- **Viewports rolados no celular:** a 390×844 e a 360×740, de y=0 até o fim, de 700 em 700 px, o mismatch foi 0% em todas as paradas (dev e build).
- **DPR 2:** a 390×844 e a 1440×900, o mismatch foi 0% em todas as paradas (dev e build).

## 3. Estilos computados e caixas

Cerca de 430 elementos foram comparados por viewport, com tipografia, cores, espaçamentos, bordas, sombras, `object-fit/position`, `display` e caixas. O número de elementos e a estrutura são idênticos em todas as larguras. As únicas diferenças restantes são estas:

| Diferença | Onde | Efeito |
|---|---|---|
| `opacity` de 0.999929 contra 0.999933 em `.scroll-indicator` e `.cta-badge` | dev e build | Nenhum. É o instante em que a animação infinita `pulse-slow` foi pausada (a mesma variação aparece entre duas cargas do original). |
| `background-image` do `.hero` e do `.cta`: `… 0%, … 50%, … 100%` virou `…, …, …` | Só no build | Nenhum (0% de diferença de pixels). O minificador de CSS remove posições de parada que já são o padrão (0/50/100%). O gradiente é matematicamente o mesmo. |

## 4. Interações

| Verificação | Resultado (dev e build) |
|---|---|
| Animações | Mesmo inventário do original a 1440 e 390, com as mesmas durações, atrasos, iterações e easing. São 6 animações CSS: `fade-up` 800 ms (e 800 ms com atraso de 300 ms na foto), `float` 6 s, `pulse-slow` 3 s (×2) e `bounce` 1 s. Também aparecem as mesmas 23 transições de `text-underline-offset` disparadas na carga pelo CSS do WP. Quadros intermediários em 150, 450, 900 e 1600 ms: 0% de diferença. |
| Header ao rolar | `.scrolled` entra entre y=40 e y=60 e sai ao voltar ao topo. Os valores são iguais ao original: fundo `rgba(16,20,24,.95)`, `blur(12px)`, padding de 20 para 12 px, borda `1px rgba(43,51,59,.5)` e altura de 88 para 73 px. Capturas: 0% em todos os estados, a 1440 e 390. |
| Menu mobile | A 390 e 360 (no topo e rolado), o menu abre e fecha, o hambúrguer e o X alternam e a caixa do menu é igual. Capturas aberto e fechado: 0%. A 768 e 1023 o botão fica oculto, como no original: de 768 a 1023 px o header só mostra o logo e o botão "Consulta Gratuita", sem links de navegação. Capturas: 0%. |
| Hover | 13 alvos × 2 larguras, todos com `:hover` ativo. Os estilos computados são iguais: por exemplo, botões com `scale(1.05)`, CTAs de serviço com `scale(1.02)`, cards de diferencial com `translateY(-5px)` e o botão flutuante com `scale(1.1)`. Capturas: 0%. A tooltip "💬 Fale Conosco – Consulta Gratuita" aparece igual. |
| Foco por teclado | Tab 1 a 6 e 8 vezes, a 1440 e 390: mesmo elemento focado (logo, links, botão do menu, CTAs), mesmo contorno e mesma rolagem automática. Capturas: 0%. |
| "Saiba mais" (indicador de rolagem) | Não recebe clique de mouse no ponto central, porque `.hero-content` (a 1440) e o card flutuante (a 390) ficam por cima. **O original se comporta exatamente igual** (mesmo `elementFromPoint`). Foi mantido por fidelidade. |

## 5. Links do WhatsApp e rastreamento

**Links:**
- São **34** links `wa.me`, com **27** `href` distintos. O `href`, o `target="_blank"` e o `rel="noopener noreferrer"` de cada um são idênticos ao HTML original, na mesma ordem.
- O clique programático nos 34 gerou exatamente **34 `window.open(href, '_blank', 'noopener')`** e **34 abas novas**, uma por clique. A página não navegou: `preventDefault` funcionou.
- Clique real de mouse: 29 dos 30 links visíveis a 1440 e 25 dos 26 visíveis a 390 abriram uma aba cada, com o `href` certo. A exceção é o "Saiba mais", pelo motivo explicado na seção 4.

**Fora de produção (localhost):**
- `CS_TRACKING=false`.
- O `dataLayer` fica vazio e não há nenhuma requisição ao Google.
- O clique abre o WhatsApp na hora, dentro do próprio gesto do usuário.

**Produção simulada** (`CS_TRACKING` travado em `true`; as tags do Google foram pedidas e bloqueadas):

| Etapa | Resultado |
|---|---|
| Carga da página | Pede `gtag/js?id=GT-M6BTZ9RT` e `gtm.js?id=GTM-5T2CXTQ8`. O `dataLayer` recebe, em ordem: `consent default` (todos `denied`, 32 regiões, `wait_for_update:500`, idêntico ao Site Kit), `set linker {domains:[carolinasantos.com.br]}`, `js`, `config GT-M6BTZ9RT`, `config AW-17141670851` e `{gtm.start, event:'gtm.js'}`. |
| Payloads do clique | `event contact_link_click {link_type:'whatsapp', transport_type:'beacon', event_source:'site-kit'}`, igual ao que o Site Kit envia no original. Depois, `event conversion {send_to:'AW-17141670851/mvQGCPvC8ukbEMPH5O0_', event_callback}`, igual ao `gtag_report_conversion` original. |
| gtag nunca responde (bloqueador) | 1 aba após cerca de 1000 ms (fallback) |
| gtag responde em 100 ms | 1 aba após cerca de 100 ms (callback). O fallback não abre outra. |
| gtag responde em 1500 ms | 1 aba após cerca de 1000 ms (fallback). O callback tardio não abre outra. |
| Domínios em que o rastreamento liga (regex `(^\|\.)carolinasantos\.com\.br$`) | `carolinasantos.com.br`, `www.` e qualquer subdomínio: **ligado**. `localhost`, `127.0.0.1`, `carolinasantos.com.br.evil.com` e `fakecarolinasantos.com.br`: **desligado**. |

## 6. Técnico

| Item | Resultado (dev e build, nas 7 larguras) |
|---|---|
| Console e erros JS | 0 erros e 0 avisos na página local |
| Requisições com falha ou 4xx | Nenhuma |
| Overflow horizontal | `scrollWidth = clientWidth` e `scrollX = 0` após `scrollTo(5000,0)`. Os únicos elementos além da borda são os `.gradient-orb` decorativos, cortados por `overflow:hidden`, nas mesmas posições do original. |
| IDs duplicados | Nenhum (nem no original) |
| Imagens | 4 imagens carregadas (logo 361×443 duas vezes, foto 917×974 e emoji 150×150). Os textos `alt` são idênticos ao original. |
| Fontes | O conjunto carregado é idêntico ao do original em todas as larguras: Montserrat 400/500/600/700, Cormorant Garamond 400/700 e Cormorant 600. O `montserrat.woff2` do tema, declarado no original, **nunca é usado lá** (nenhuma face "Montserrat 100 900" carregada), o que confirma que pode ser omitido. |
| Assets auto-hospedados | Os 14 arquivos (3 imagens, emoji e 10 fontes Cormorant) têm SHA-256 **idêntico** ao dos originais. Isso vale para dev e para `dist/`. |
| HTML | A contagem de tags da fonte bate com a do DOM parseado: sem fechamentos implícitos nem reparentamento. `lang="pt-BR"`, nenhum `meta`, `link`, `title` ou `style` dentro do `body`, e 430 elementos no build (431 no dev, por causa do script `/@vite/client`). |
| Build | `dist/index.html` 53.72 kB (9.34 kB gzip), CSS 56.74 kB (10.31 kB gzip) e JS 1.83 kB (0.88 kB gzip). O CSS não tem `@import` pendente. As 10 `url(/fonts/…)` existem em `dist/fonts/`, e as imagens e o emoji, em `dist/assets/img/`. |

## 7. Deriva de código-fonte

- **Marcação:** o diff por tokens dos 8 parciais contra o corpo original (933 × 934 tokens) mostra só as localizações documentadas:
  - Os 3 `src` de imagem (logo, foto e logo do rodapé) apontam para `/assets/img/…`.
  - O caractere 💬 da tooltip virou o `<img class="emoji">` do Twemoji, que é exatamente o que o `wp-emoji-loader` insere no original.
  - Todo o resto é idêntico: textos, classes, estilos inline, SVGs, `alt`s e todos os `href`.
- **CSS:** foram comparadas 476 regras do original (estilos inline do WP, `extendable/style.css`, `paragraph/style.min.css`, `wp-fonts-local`, o `<style>` da página e os estilos do bloco de código no fim do `body`) com as 444 regras do projeto. Todas as regras de layout e aparência são idênticas e estão na mesma ordem. As diferenças são:
  - 32 `@font-face` das fontes do tema Extendable (Archivo… Space Mono, incluindo um Montserrat 100–900) não foram copiados. Nenhuma delas é usada pela página (ver Fontes, na seção 6).
  - Os 10 `@font-face` da Cormorant passaram a apontar para `/fonts/…`.
  - Os 3 estilos do `wp-block-code` foram para a camada WP, antes do CSS da página (no original vêm no fim do `body`). Isso não tem efeito: nenhuma regra da página mira `pre` ou `code`, e `.wp-block-code` vence o reset `*` por especificidade. A faixa `pre` tem caixa e pixels idênticos.
- **JS:** `main.js` reproduz o script original linha a linha (header ao rolar, menu mobile, interceptação de todos os `a[href*="wa.me"]`). As únicas mudanças são o rastreamento condicionado a `CS_TRACKING`, o fallback de 1 s e o evento `contact_link_click` do Site Kit, todos desvios aceitos.

---

## 8. Defeitos encontrados

**Nenhum defeito real e reproduzível foi encontrado**, nem no dev nem no build. Todas as diferenças medidas são:
- ruído de captura, comprovado também entre duas capturas do próprio original;
- equivalências sem efeito visual (minificação do gradiente);
- ou desvios aceitos e documentados.

## 9. Correções feitas

Nenhuma alteração foi necessária nos arquivos do projeto. Este relatório (`docs/qa-report.md`) é o único arquivo novo. O `dist/` foi regenerado com `npm run build` (está no `.gitignore`).

## 10. Diferenças conhecidas e por que são aceitáveis

1. **Tags do Google só em produção.** É um desvio aceito. Fora de `carolinasantos.com.br` (dev, preview, staging em outro domínio), nenhum dado vai ao Google. Em produção, os payloads são iguais aos do original.
2. **Fallback de 1 s e `noopener` no `window.open`.** É um desvio aceito. O original só abre o WhatsApp no `event_callback` do gtag, então com bloqueador de anúncios o link não abre lá. O `noopener` não muda o que o usuário vê (abre uma aba), só impede a nova aba de acessar a página.
3. **Diferenças menores de rastreamento, sem efeito para o usuário:**
   - O local não chama `gtag('set','developer_id.dZTNiMT',true)`, que é a atribuição do plugin Site Kit, inexistente aqui.
   - Não repete o segundo `config AW-…` nem o segundo `gtag/js?id=AW-17141670851` que o HTML colado no original adiciona. O `config AW-…` único já carrega o destino de Ads.
   - Dispara `contact_link_click` antes da `conversion` (no original, a ordem é a inversa, porque o listener do Site Kit fica no `document`).
   - Não inclui o `<noscript>` do GTM (que rastrearia mesmo fora de produção), o `googlesitekit-consent-mode.js` e o `wp-consent-api.js`. Sem um plugin de consentimento, esses dois não alteram o consent default.
4. **Emoji sempre em Twemoji.** O `wp-emoji-loader` do original só troca o 💬 pelo SVG quando o navegador não desenha o emoji nativo, o que acontece no Windows e no Edge/Chrome dos testes. Em aparelhos com suporte completo (por exemplo, Apple), o original mostra o emoji nativo, e o local mostra sempre o mesmo SVG. É um desvio aceito (assets auto-hospedados).
5. **Fontes do tema não declaradas.** São 32 `@font-face` que o original declara mas nunca baixa. Não há diferença de renderização (conjunto de fontes carregadas idêntico).
6. **`<head>` composto.** O `<title>`, o `canonical`, o `robots` e os metadados Open Graph e Twitter do Yoast são os efetivos do original, com uma exceção: a `og:description` usa o texto da própria página no lugar do resumo automático do Yoast (que concatena o menu: "Dra. Carolina Advogada Sobre Áreas de Atuação…"). As metas `description`, `author` e `keywords`, além de `twitter:title` e `twitter:description`, vêm do HTML da página. No original elas ficam coladas dentro do `body`; aqui foram para o `head`, onde valem. O grafo JSON-LD do Yoast não foi reproduzido, só o JSON-LD `Attorney` da página. Também não foram reproduzidos o `<title>` interno (ignorado pelo navegador), os links de feed, oEmbed e REST, as `speculationrules` e o script do "Sign in with Google". Testei esse script no original com `accounts.google.com` liberado: ele não insere iframe, One Tap nem botão (`shouldShowOneTapPrompt:false`). Nada disso é visível.
7. **Gradientes minificados no build.** Ver a seção 3: a string computada é diferente, mas o desenho é idêntico.
8. **Comportamentos herdados do original, mantidos por fidelidade:** o "Saiba mais" não é clicável no centro, e a faixa vazia de 30 px do `pre.wp-block-code` continua no topo (README).

## 11. Observações para a publicação (fora do escopo de fidelidade)

- **Caminhos absolutos:** os assets usam caminhos a partir da raiz (`/assets/…`, `/fonts/…` e o JS/CSS do build). Publique o `dist/` na raiz de um domínio ou subdomínio. Para servir em um subcaminho (por exemplo `/advocacia-de-familia/`), é preciso configurar `base` no Vite e ajustar as URLs de `/fonts` e `/assets/img`.
- **Bloqueador de pop-up no iOS Safari:** em produção, quando o gtag responde, o WhatsApp é aberto dentro do `event_callback`, que é assíncrono. O Safari pode bloquear um `window.open` fora do gesto do usuário. O original tem o mesmo comportamento e isso não pôde ser reproduzido neste ambiente. Se a taxa de abertura no iPhone for importante, vale testar em um aparelho real.
