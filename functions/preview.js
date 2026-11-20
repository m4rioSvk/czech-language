// Writes preview.html with all four Nessie emails side by side, pictures included.
// Run: npm run preview (in functions/), then open functions/preview.html in a browser.
import { readFileSync, writeFileSync } from 'node:fs';
import { renderEmail } from './nessie.js';

const kinds = ['away1', 'away3', 'away7', 'welcome'];
const cards = kinds.map((kind) => {
  const { image } = renderEmail(kind, { name: 'Nami', appUrl: '#' });
  const imageSrc = `data:image/jpeg;base64,${readFileSync(new URL(`./images/${image}`, import.meta.url)).toString('base64')}`;
  return `<div style="flex:0 0 520px">${renderEmail(kind, { name: 'Nami', appUrl: '#', imageSrc }).html}</div>`;
});
const out = new URL('./preview.html', import.meta.url);
writeFileSync(out, `<!doctype html><meta charset="utf-8"><title>Nessie emails</title>
<body style="margin:0;background:#ddd"><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">${cards.join('')}</div>`);
console.log('Wrote', out.pathname);
