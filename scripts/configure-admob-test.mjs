import { readFile, writeFile } from 'node:fs/promises';

const platform = process.argv[2];
if (!['android', 'ios'].includes(platform)) {
  throw new Error('Usage: node scripts/configure-admob-test.mjs android|ios');
}

async function read(path) {
  try { return await readFile(path, 'utf8'); }
  catch { throw new Error(`Required generated native file not found: ${path}`); }
}

if (platform === 'android') {
  const manifestPath = 'android/app/src/main/AndroidManifest.xml';
  const stringsPath = 'android/app/src/main/res/values/strings.xml';
  const appId = 'ca-app-pub-3940256099942544~3347511713';

  let manifest = await read(manifestPath);
  if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
    manifest = manifest.replace(
      /<application([^>]*)>/,
      `<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />`
    );
  }
  if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
    throw new Error('Could not configure AdMob test App ID in AndroidManifest.xml');
  }
  await writeFile(manifestPath, manifest);

  let strings = await read(stringsPath);
  if (!strings.includes('name="admob_app_id"')) {
    strings = strings.replace('</resources>', `    <string name="admob_app_id">${appId}</string>\n</resources>`);
  }
  await writeFile(stringsPath, strings);
}

if (platform === 'ios') {
  const plistPath = 'ios/App/App/Info.plist';
  const appId = 'ca-app-pub-3940256099942544~1458002511';
  let plist = await read(plistPath);
  if (!plist.includes('<key>GADApplicationIdentifier</key>')) {
    plist = plist.replace('</dict>', `\t<key>GADApplicationIdentifier</key>\n\t<string>${appId}</string>\n</dict>`);
  }
  if (!plist.includes('<key>GADApplicationIdentifier</key>')) {
    throw new Error('Could not configure AdMob test App ID in Info.plist');
  }
  await writeFile(plistPath, plist);
}

console.log(`Configured Google-provided AdMob test App ID for ${platform}. Replace it before production.`);
