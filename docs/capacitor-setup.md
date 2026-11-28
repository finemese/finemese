# Avvio app native FineMese con Capacitor

Questa guida prepara il progetto per creare app iOS e Android a partire dalla stessa interfaccia web. Le pipeline CI generano pacchetti di test e rilascio, ma non pubblicano automaticamente sugli store.

## Requisiti

- Node.js 22 o superiore.
- Android: Android Studio e Android SDK per prove locali.
- iOS: Mac con Xcode 26 o superiore (Capacitor 8).
- Account sviluppatore Google Play per la pubblicazione Android.
- Account Apple Developer per TestFlight e App Store.

## Primo avvio

Dalla cartella principale del repository:

```bash
npm install
npm run test:static
npm run copy:web
```

Il pacchetto `@supabase/supabase-js` è fissato a una versione esatta in `package.json`; `copy:web` include il bundle UMD locale in `www/vendor/supabase.js`, così la WebView non deve scaricare l'SDK da una CDN a runtime.

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

## Firma Android

La pipeline `.github/workflows/android-release.yml` genera APK e AAB di rilascio. Senza credenziali di firma produce pacchetti non firmati, utili per verifiche tecniche ma non caricabili come release definitiva su Google Play.

Per attivare la firma nella pipeline, configurare nel repository GitHub (Settings → Secrets and variables → Actions) questi quattro repository secrets:

- `ANDROID_KEYSTORE_BASE64`: contenuto del keystore di upload codificato in Base64.
- `ANDROID_KEYSTORE_PASSWORD`: password del keystore.
- `ANDROID_KEY_ALIAS`: alias della chiave.
- `ANDROID_KEY_PASSWORD`: password della chiave.

Non inserire mai questi valori nel codice, nei file del repository o nelle chat. Conservare una copia di backup sicura del keystore: perderlo può complicare gli aggiornamenti futuri dell'app. La chiave di upload deve essere gestita in accordo con la configurazione Play App Signing del proprio account.

La pipeline verifica la firma dell'APK e dell'AAB quando tutti e quattro i secrets sono configurati. La presenza dei secrets non sostituisce la configurazione dell'app in Play Console.

## Attenzione: prima dei test reali

1. Verificare che URL e chiave publishable Supabase in `config.js` corrispondano al progetto di test/produzione autorizzato. Non inserire mai la chiave `service_role` nell'app.
2. Verificare login, registrazione, conferma email, recupero password, sessione persistente e logout su entrambe le piattaforme.
3. Configurare in Supabase gli URL di redirect/deep link adatti alle app native prima di testare eventuali flussi che li richiedono.
4. Verificare RLS e accesso ai dati. Non eseguire migrazioni SQL in produzione in questa fase.
5. Le cartelle `ios/`, `android/` e `www/` sono generate localmente e sono escluse dal repository in questo setup.

## Stato della preparazione

- GitHub Actions genera i progetti nativi Capacitor durante la build, senza versionare `ios/`, `android/` e `www/` nel repository.
- La build Android di debug è stata completata con successo.
- La pipeline Android di rilascio produce APK e AAB; la firma è predisposta ma richiede i quattro secrets descritti sopra.
- La pipeline iOS compila correttamente l'app per il simulatore. Questo artefatto non è un IPA installabile su un iPhone reale.
- Le compilazioni riuscite attestano la costruzione tecnica, non il collaudo completo su dispositivi reali né la prontezza per gli store.

Prima della pubblicazione restano da completare: test su dispositivi reali, verifica dello schema e delle policy RLS nel progetto Supabase effettivo, test dei flussi di autenticazione e deep link, configurazione della firma e di Play Console, scheda Store, informativa privacy e dichiarazioni Data safety. La monetizzazione non è ancora integrata: va definito il modello commerciale prima di implementare acquisti o pubblicità.

## Eliminazione account e dati

L'interfaccia include un'azione di eliminazione account con doppia conferma. La funzione server-side è in `supabase/functions/delete-account/index.ts` e richiede JWT valido (`verify_jwt = true`). La funzione verifica la sessione con Supabase Auth e usa la chiave amministrativa solo lato server per eliminare l'utente. Non copiare mai `SUPABASE_SERVICE_ROLE_KEY` nel client, in `config.js` o nei secrets del repository.

Prima di attivare questa funzione nel progetto Supabase:
1. Verificare che tutte le tabelle con dati utente abbiano foreign key verso `auth.users` con `ON DELETE CASCADE`, oppure aggiungere una procedura server-side che elimini esplicitamente i record collegati.
2. Distribuire la funzione con Supabase CLI: `supabase functions deploy delete-account`.
3. Provare con un account di test e verificare che account e dati vengano effettivamente eliminati.
4. Pubblicare una pagina web accessibile dall'esterno con le istruzioni per richiedere la cancellazione, e inserire il relativo URL nella Play Console. Il pulsante in app da solo non sostituisce il requisito del link web di Google Play.
5. Aggiornare privacy policy e dichiarazioni Data safety in base al comportamento reale.

La funzione e il pulsante sono presenti nel repository ma non sono ancora distribuiti né collaudati sul progetto Supabase collegato.
