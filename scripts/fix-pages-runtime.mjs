import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const chunk = fileURLToPath(new URL('../assets/static/immutable/chunks/1qchkddf4806h.js', import.meta.url));
const original = await readFile(chunk, 'utf8');
const before = 'let t=(0,s.usePathname)()||"/"';
const after = 'let t=((0,s.usePathname)()||"/").replace(/^\\/Nontime(?=\\/|$)/,"")||"/"';
if (!original.includes(before)) throw new Error('Expected pathname code was not found.');
const updated = original.replace(before, after);
await writeFile(chunk, updated);
console.log('GitHub Pages base path is now ignored by the app router.');
