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

await mkdir('www/vendor', { recursive: true });
await copyFile(
  'node_modules/@supabase/supabase-js/dist/umd/supabase.js',
  'www/vendor/supabase.js'
);

console.log('FineMese web files and pinned Supabase SDK copied to www/.');
