import { mkdir, copyFile } from 'node:fs/promises';

const files = [
  'index.html',
  'config.js',
  'manifest.webmanifest',
  'icon.svg'
];

await mkdir('www', { recursive: true });
for (const file of files) {
  await copyFile(file, `www/${file}`);
}
console.log('FineMese web files copied to www/.');
