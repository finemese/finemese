# Avvio app native FineMese con Capacitor

Questa guida prepara il progetto per creare app iOS e Android a partire dalla stessa interfaccia web. Non pubblica automaticamente nulla sugli store.

## Requisiti

- Node.js 22 o superiore.
- Android: Android Studio e Android SDK.
- iOS: Mac con Xcode 26 o superiore (Capacitor 8).
- Account sviluppatore Apple e Google Play solo nella successiva fase di pubblicazione.

## Primo avvio

Dalla cartella principale del repository:

```bash
npm install
npm run copy:web
```

Aggiungere le piattaforme una sola volta:

```bash
npm run cap:add:android
npm run cap:add:ios
```

I comandi iOS devono essere eseguiti su Mac con Xcode. Dopo aver aggiunto le piattaforme:

```bash
npm run cap:sync
npm run cap:open:android
npm run cap:open:ios
```

Aprire e provare i progetti nativi in Android Studio e Xcode su emulatori/dispositivi.

## Attenzione: prima dei test reali

1. Verificare che URL e chiave publishable Supabase in `config.js` corrispondano al progetto di test/produzione autorizzato. Non inserire mai la chiave `service_role` nell'app.
2. Verificare login, registrazione, conferma email, recupero password, sessione persistente e logout su entrambe le piattaforme.
3. Configurare in Supabase gli URL di redirect/deep link adatti alle app native prima di testare eventuali flussi che li richiedono.
4. Verificare RLS e accesso ai dati. Non eseguire migrazioni SQL in produzione in questa fase.
5. Le cartelle `ios/`, `android/` e `www/` sono generate localmente e sono escluse dal repository in questo setup. Se si decide di versionare i progetti nativi per CI/release, aggiornare consapevolmente `.gitignore`.

## Stato della preparazione

- GitHub Actions genera i progetti nativi Capacitor durante la build, senza versionare `ios/`, `android/` e `www/` nel repository.
- La build Android di debug è stata completata e l'APK è disponibile come artefatto della relativa esecuzione GitHub Actions.
- È presente una pipeline separata per APK/AAB Android di rilascio non firmati.
- È presente una pipeline macOS per compilare l'app iOS destinata al simulatore. La prima esecuzione ha evidenziato un percorso Xcode errato, corretto nella pipeline; la nuova esecuzione è in verifica.

Questi risultati attestano la compilazione, non il collaudo completo su dispositivi reali né la prontezza per gli store. Per Google Play serve firmare l'AAB di rilascio. Per App Store serve un archivio iOS firmato con certificati e provisioning Apple. Restano inoltre da collaudare Supabase, login, sessione, redirect/deep link, RLS e flussi dati con l'ambiente autorizzato.
