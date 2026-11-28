import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const read = (path) => readFile(new URL('../' + path, import.meta.url), 'utf8');
const [pkg, html, config, schema, deletion, copyScript] = await Promise.all([
  read('package.json'),
  read('index.html'),
  read('config.js'),
  read('supabase/schema.sql'),
  read('supabase/functions/delete-account/index.ts'),
  read('scripts/copy-web.mjs')
]);

assert.match(pkg.dependencies?.['@supabase/supabase-js'] ?? '', /^\d+\.\d+\.\d+$/, 'Supabase SDK must be pinned to an exact version');
assert.match(copyScript, /node_modules\/@supabase\/supabase-js\/dist\/umd\/supabase\.js/, 'web copy step must include the installed Supabase UMD bundle');
assert.match(copyScript, /www\/vendor\/supabase\.js/, 'web copy step must place the SDK in local app assets');
assert.match(html, /<script src="\.\/vendor\/supabase\.js"><\/script>/, 'app must load the local Supabase SDK');
assert.doesNotMatch(html, /cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js|unpkg\.com\/@supabase\/supabase-js/, 'app must not load Supabase SDK from a floating CDN version');
assert.match(config, /https:\/\/[a-z0-9-]+\.supabase\.co/, 'Supabase project URL must use HTTPS');
assert.match(config, /sb_publishable_|eyJ/, 'Supabase client key must be configured');
assert.doesNotMatch(config, /service_role|SUPABASE_SERVICE_ROLE_KEY/i, 'service role key must never be shipped in client config');
for (const table of ['transactions', 'budgets', 'goals']) {
  assert.match(schema, new RegExp('alter table public\\.' + table + ' enable row level security', 'i'), table + ' must enable RLS');
}
assert.match(schema, /auth\.uid\(\) = user_id/, 'RLS policies must constrain rows to the authenticated user');
assert.match(deletion, /body\.confirm !== true/, 'account deletion must require explicit confirmation');
assert.match(deletion, /userClient\.auth\.getUser\(\)/, 'account deletion must validate the JWT user with Auth');
assert.match(deletion, /auth\.admin\.deleteUser\(user\.id\)/, 'account deletion must delete only the authenticated user');
assert.match(deletion, /SUPABASE_SERVICE_ROLE_KEY/, 'admin key must be read only in server-side function');

console.log('FineMese static security checks passed.');
