import { readFile, writeFile } from 'node:fs/promises';

const androidManifestPath = 'android/app/src/main/AndroidManifest.xml';
const androidStringsPath = 'android/app/src/main/res/values/strings.xml';
const iosPlistPath = 'ios/App/App/Info.plist';

async function read(path) {
  try { return await readFile(path, 'utf8'); }
  catch { throw new Error(`Required generated native file not found: ${path}`); }
}

let androidManifest = await read(androidManifestPath);
const androidAppId = 'ca-app-pub-3940256099942544~3347511713';
if (!androidManifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  androidManifest = androidManifest.replace(
    /<application([^>]*)>/,
    `<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />`
  );
}
if (!androidManifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  throw new Error('Could not configure AdMob test App ID in AndroidManifest.xml');
}
await writeFile(androidManifestPath, androidManifest);

let androidStrings = await read(androidStringsPath);
if (!androidStrings.includes('name="admob_app_id"')) {
  androidStrings = androidStrings.replace('</resources>', `    <string name="admob_app_id">${androidAppId}</string>\n</resources>`);
}
await writeFile(androidStringsPath, androidStrings);

let iosPlist = await read(iosPlistPath);
const iosAppId = 'ca-app-pub-3940256099942544~1458002511';
if (!iosPlist.includes('<key>GADApplicationIdentifier</key>')) {
  iosPlist = iosPlist.replace('</dict>', `\t<key>GADApplicationIdentifier</key>\n\t<string>${iosAppId}</string>\n</dict>`);
}
if (!iosPlist.includes('<key>GADApplicationIdentifier</key>')) {
  throw new Error('Could not configure AdMob test App ID in Info.plist');
}
await writeFile(iosPlistPath, iosPlist);

console.log('Configured Google-provided AdMob test App IDs for Android and iOS. Replace before production.');
