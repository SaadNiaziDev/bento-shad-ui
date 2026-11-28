// Serves _site/ at http://localhost:4321/bento-shad-ui/ (the same base path as GitHub Pages).
// Usage: npm run build && npm run docs && npm run docs:serve
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = fileURLToPath(new URL('../_site/', import.meta.url));
const BASE = '/bento-shad-ui/';
const PORT = Number(process.env.PORT) || 4321;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.xml': 'application/xml', '.dart': 'text/plain; charset=utf-8' };

if (!existsSync(SITE)) {
  console.error('No _site/ yet. Run `npm run build && npm run docs` first.');
  process.exit(1);
}

createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  if (!url.startsWith(BASE)) {
    res.writeHead(302, { Location: BASE });
    return res.end();
  }
  let file = normalize(join(SITE, url.slice(BASE.length)));
  if (!file.startsWith(SITE)) {
    res.writeHead(403);
    return res.end();
  }
  // `npm run docs` empties _site/ while it rebuilds: answer 503 instead of crashing.
  try {
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    const found = existsSync(file);
    if (!found) file = join(SITE, '404.html');
    const body = readFileSync(file);
    res.writeHead(found ? 200 : 404, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8', 'Retry-After': '1' });
    res.end('The docs are rebuilding. Reload in a moment.');
  }
}).listen(PORT, () => console.log(`Docs at http://localhost:${PORT}${BASE}`));
