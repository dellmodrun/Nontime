import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const extensions = new Set(['.html', '.js', '.json']);
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (extensions.has(extname(entry.name).toLowerCase())) files.push(path);
  }
  return files;
}

let changed = 0;
for (const file of await walk(root)) {
  const original = await readFile(file, 'utf8');
  const updated = original
    .replaceAll('https://x.com/overtimeagent_', 'https://x.com/nontimelaunch')
    .replaceAll('https://x.com/useOvertime', 'https://x.com/nontimelaunch')
    .replaceAll('src="/?embed', 'src="/Nontime/?embed')
    .replaceAll('href="/mark.svg"', 'href="/Nontime/assets/static/immutable/chunks/mark.svg"');
  if (updated !== original) {
    await writeFile(file, updated);
    changed += 1;
  }
}
console.log(`Updated X and embedded scene paths in ${changed} files.`);
