import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Build an offline edition from the routes Astro actually emitted.
// CSS, fonts, logos, browser JavaScript and favicon are inline; hosted pages remain unchanged.
const output = fileURLToPath(new URL('../dist/', import.meta.url));
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
async function projectPages(directory = 'projects') {
  let entries;
  try { entries = await readdir(output + directory, { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const pages = [];
  for (const entry of entries) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) pages.push(...await projectPages(path));
    else if (entry.name === 'index.html') {
      const route = directory.slice('projects/'.length);
      pages.push({ source: path, destination: `project-${route.replaceAll('/', '-')}.html`, url: `${base}/projects/${route}/` });
    }
  }
  return pages;
}
const pages = [
  { source: 'index.html', destination: 'preview.html', url: `${base}/` },
  ...await projectPages(),
];
if (new Set(pages.map(page => page.destination)).size !== pages.length) throw new Error('Offline preview filename collision');
const favicon = Buffer.from(await readFile(output + 'favicon.svg')).toString('base64');
async function inline(html) {
  const resource = url => output + url.slice(base.length).replace(/^\//, '');
  async function inlineFonts(css) {
    for (const match of [...css.matchAll(/url\((?:["']?)([^\)"']+)(?:["']?)\)/g)]) {
      const url = match[1];
      if (url.startsWith(`${base}/_astro/`) && /\.(?:ttf|woff2?)$/.test(url)) {
        const type = url.endsWith('.ttf') ? 'font/ttf' : url.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
        css = css.replace(match[0], `url(data:${type};base64,${Buffer.from(await readFile(resource(url))).toString('base64')})`);
      }
    }
    return css;
  }
  for (const match of [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)]) {
    const href = match[0].match(/href="([^"]+)"/)?.[1];
    if (href && href.startsWith(`${base}/_astro/`)) html = html.replace(match[0], `<style>${await inlineFonts(await readFile(resource(href), 'utf8'))}</style>`);
  }
  for (const match of [...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g)]) {
    if (match[1].startsWith(`${base}/_astro/`)) html = html.replace(match[0], `<script type="module">${await readFile(resource(match[1]), 'utf8')}</script>`);
  }
  for (const match of [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)]) {
    const url = match[1];
    if (!url.startsWith(`${base}/_astro/`)) continue;
    const extension = url.split('.').pop();
    const type = { svg: 'image/svg+xml', png: 'image/png', ico: 'image/x-icon', jpg: 'image/jpeg', webp: 'image/webp' }[extension];
    if (!type) throw new Error(`Unsupported offline image type: ${url}`);
    const data = Buffer.from(await readFile(resource(url))).toString('base64');
    html = html.replace(match[0], match[0].replace(`src="${url}"`, `src="data:${type};base64,${data}"`));
  }
  html = html.replaceAll(`href="${base}/favicon.svg"`, `href="data:image/svg+xml;base64,${favicon}"`);
  for (const page of pages) html = html.replaceAll(`href="${page.url}"`, `href="${page.destination}"`);
  html = html.replaceAll(`href="${base}/#`, 'href="preview.html#');
  html = html.replaceAll(`href="${base}/licenses/`, 'href="licenses/');
  return html;
}
for (const page of pages) await writeFile(output + page.destination, await inline(await readFile(output + page.source, 'utf8')));
console.log(`Self-contained offline previews generated (${pages.length} pages).`);
