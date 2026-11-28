import { mkdir, copyFile } from 'node:fs/promises';
import { build } from 'esbuild';

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

await build({
  entryPoints: ['src/admob.js'],
  bundle: true,
  format: 'iife',
  target: ['es2020'],
  outfile: 'www/vendor/finemese-admob.js',
  logLevel: 'info'
});

console.log('FineMese web files, pinned Supabase SDK and bundled AdMob module copied to www/.');
