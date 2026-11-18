# Advocacia de Família — Dra. Carolina Santos

Recriação fiel da página <https://carolinasantos.com.br/advocacia-de-familia/>.
Site estático (HTML + CSS + JS puros) servido e empacotado com [Vite](https://vitejs.dev/), sem framework.

## Como rodar

```bash
npm install
```

```bash
npm run dev
```

Abre em <http://localhost:5173/>. Para gerar e testar a versão de produção:

```bash
npm run build
```

```bash
npm run preview
```

O build sai em `dist/` e o preview roda em <http://localhost:4173/>.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | `<head>` (SEO, fontes, Google Ads) e esqueleto da página com os `<!-- @include … -->` |
| `src/partials/*.html` | Uma seção por arquivo: header, hero, social-proof, services, differentials, cta, footer, whatsapp-float |
| `src/styles/main.css` | Entrada de CSS — mantém a ordem de cascata do original |
| `src/styles/wp/` | Camada do WordPress do original (tema Extendable + estilos de blocos) e a fonte "Cormorant" usada em h3/h4 |
| `src/styles/base.css` | Reset, variáveis de cor, utilitários, botões, cards e keyframes |
| `src/styles/sections/*.css` | Estilos de cada seção |
| `src/styles/icons.css`, `responsive.css` | Tamanhos de ícones e media queries (640/768/1024/1280 px) |
| `src/main.js` | Header ao rolar, menu mobile e rastreamento de cliques no WhatsApp |
| `public/assets/img`, `public/fonts` | Imagens e fontes originais baixadas do site |
| `docs/` | Especificação de referência e relatório de QA |

Os parciais são inseridos no HTML em tempo de dev/build por um plugin de ~20 linhas em `vite.config.js`. Não há custo em runtime.

## Diferenças intencionais em relação ao original

- **Tags do Google:** consent mode, a tag do Google `GT-M6BTZ9RT`, o Google Ads `AW-17141670851` com a conversão "Clique WhatsApp (1)" e o Tag Manager `GTM-5T2CXTQ8` (os mesmos do original) só carregam no domínio `carolinasantos.com.br`. Em `localhost`, o clique abre o WhatsApp direto, sem registrar conversões falsas. Em produção, se o gtag for bloqueado (ex.: por um bloqueador de anúncios), o link abre mesmo assim após 1 s. No original, nesse caso, o link não abre.
- **Assets:** imagens, a fonte Cormorant e o emoji 💬 (Twemoji, que o script de emoji do WordPress injeta) são servidos localmente. Montserrat e Cormorant Garamond continuam vindo do Google Fonts, como no original.
- **Ajustes de conteúdo pedidos pela doutora (campanhas para brasileiros em Portugal):**
  - As consultas são **pagas**. Nenhum texto, botão ou mensagem pronta do WhatsApp promete mais atendimento sem cobrança.
  - Título principal: "Advogada para Brasileiros em Portugal — Especialista em Advocacia de Família".
  - 20 anos de experiência.
  - Parcelamento sem a expressão "sem juros".
  - 4 novas áreas de atuação, também listadas no rodapé.
- **Faixa vazia no topo:** a faixa de 30 px com borda cinza no topo da página é um bloco de código vazio do WordPress que existe no original. Ela foi mantida por fidelidade (`index.html`, `<pre class="wp-block-code">`). Para removê-la, apague essa linha.
