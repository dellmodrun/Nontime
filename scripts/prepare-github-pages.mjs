import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const prefix = '/Nontime';
const routeRoots = ['assets', 'coins', 'crew', 'docs', 'flywheel', 'launch', 'leaderboard', 'milestones'];
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.svg', '.mjs']);

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (textExtensions.has(extname(entry.name).toLowerCase())) files.push(path);
  }
  return files;
}

const roots = routeRoots.join('|');
const absolutePath = new RegExp("([\"'\\x60(=])\\/(" + roots + ")(?=\\/|[\"'\\x60?#)])", 'g');
let changed = 0;
for (const file of await walk(root)) {
  const original = await readFile(file, 'utf8');
  let updated = original.replace(absolutePath, `$1${prefix}/$2`);
  if (extname(file).toLowerCase() === '.html') {
    updated = updated
      .replace(/href=(["'])\/\1/g, `href=$1${prefix}/$1`)
      .replace(/content=(["'])\/\1/g, `content=$1${prefix}/$1`);
  }
  if (updated !== original) {
    await writeFile(file, updated);
    changed += 1;
  }
}
console.log(`Prepared ${changed} files for ${prefix}/.`);
