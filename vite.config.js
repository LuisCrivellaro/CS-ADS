import { defineConfig, normalizePath } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const PARTIALS_DIR = normalizePath(path.join(root, 'src/partials'));
const INCLUDE_RE = /<!--\s*@include\s+([\w./-]+)\s*-->/g;

/**
 * Inlines `<!-- @include file.html -->` markers from src/partials at dev and build time,
 * so each page section lives in its own file without any runtime cost.
 */
function htmlPartials() {
  const render = (source, depth = 0) =>
    source.replace(INCLUDE_RE, (_, file) => {
      if (depth > 5) throw new Error(`Partial include depth exceeded at ${file}`);
      return render(fs.readFileSync(path.join(PARTIALS_DIR, file), 'utf8'), depth + 1);
    });

  return {
    name: 'html-partials',
    transformIndexHtml: { order: 'pre', handler: (html) => render(html) },
    handleHotUpdate({ file, server }) {
      if (normalizePath(file).startsWith(PARTIALS_DIR)) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  plugins: [htmlPartials()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
});
