# FineMese — specifica tecnica Google Play Billing (Pro una tantum)

## Scopo e stato

Questa specifica prepara l'acquisto non consumabile FineMese Pro, che rimuove il banner pubblicitario. Non attiva pagamenti e non dichiara Pro disponibile: prodotto, account Play Console, verifica server e test devono ancora essere configurati.

Decisione commerciale già annotata: acquisto una tantum, prezzo indicativo €7,99 da confermare nel Play Console. Nessun abbonamento nella prima release.

## Plugin candidato

Valutazione iniziale: `@capgo/native-purchases`, major v8 per Capacitor 8. Il progetto usa Capacitor 8.6.2. La documentazione del progetto plugin dichiara la corrispondenza major v8 ↔ Capacitor v8 e API per prodotti non consumabili, acquisto, ripristino e token Google Play. Prima di fissare la versione esatta vanno ricontrollati changelog, peer dependencies e build Android/iOS; non installare automaticamente una versione major diversa.

Fonti tecniche consultate:
- https://github.com/Cap-go/capacitor-native-purchases
- https://capgo.app/docs/plugins/native-purchases/
- https://developer.android.com/google/play/billing/integrate
- https://developer.android.com/google/play/billing/lifecycle/one-time

## Contratto di prodotto

- Product ID proposto: `finemese_pro` (non ancora creato in Play Console).
- Tipo: prodotto in-app non consumabile (`PURCHASE_TYPE.INAPP`), mai consumabile.
- Il prezzo mostrato deve provenire da Google Play, localizzato; €7,99 è solo il prezzo obiettivo iniziale e non va hardcoded.
- L'acquisto rimuove soltanto la pubblicità; non promettere funzioni premium non esistenti.
- L'interfaccia deve includere acquista, stato Pro, ripristina/verifica acquisti e messaggi chiari per annullamento, errore, acquisto in sospeso e assenza di rete.
- Nessun banner va richiesto quando l'entitlement Pro è verificato attivo.

## Flusso di sicurezza richiesto

1. L'app interroga Google Play per ottenere il prodotto e il prezzo localizzato.
2. L'utente avvia il checkout nativo di Google Play.
3. L'app invia al backend autenticato il product ID, purchase token e i dati minimi necessari per legare l'acquisto all'utente autenticato. Il token è un dato sensibile: non inserirlo nei log, URL o analytics.
4. Una Edge Function server-side verifica il token con Google Play Developer API, controlla package name, product ID, stato `PURCHASED`, acquisto non revocato/rimborsato e associazione all'utente. Il backend deve usare credenziali Google conservate solo come secrets; mai nel client o nel repository.
5. Solo dopo verifica positiva il backend registra un entitlement Pro idempotente legato a `auth.uid()` e al token/acquisto univoco. Vincoli univoci impediscono di riutilizzare lo stesso token su più account.
6. Il backend acknowledge il prodotto non consumabile solo dopo la verifica e l'assegnazione dell'entitlement. Gli acquisti `PENDING` non sbloccano Pro e non vanno acknowledge finché non passano a `PURCHASED`.
7. Il client legge l'entitlement dal backend; non si fida di un flag locale o di una risposta client-only per concedere Pro.
8. All'avvio, al ritorno in foreground e dopo “Ripristina acquisti”, il client riconcilia gli acquisti con il backend. Gestire revoche/rimborsi e notifiche RTDN sul server quando si configura il canale Google.

## Impostazioni di completamento transazione

Non usare l'acknowledgement automatico predefinito del plugin prima della verifica server. Configurare il plugin in modalità manual finish/acknowledge, inviare il token al backend, quindi completare/acknowledge solo dopo esito positivo. Gestire il recupero degli acquisti non completati all'avvio, entro la finestra Google di tre giorni. Se la verifica fallisce o il backend è irraggiungibile, non concedere Pro e non acknowledge; consentire un nuovo tentativo sicuro.

## Modello dati Supabase da progettare e verificare

Tabella proposta `user_entitlements`:
- `user_id` FK a `auth.users`, con cancellazione a cascata;
- `entitlement_key` (es. `pro_lifetime`);
- `platform` (es. `android`);
- `product_id`;
- `purchase_token_hash` univoco, non il token in chiaro se non indispensabile;
- `status` (active/revoked);
- timestamp di verifica e origine.
RLS: l'utente può leggere solo il proprio entitlement; solo Edge Function con privilegi server può creare/modificare. La chiave service role non deve mai essere usata dal client. La cancellazione account deve eliminare o anonimizzare i dati di acquisto secondo obblighi contabili e privacy verificati, senza lasciare un entitlement orfano.

La struttura definitiva va allineata allo schema live Supabase prima di creare migrazioni. Non è stato applicato alcuno schema.

## Collaudo prima di attivare il prodotto

- Acquisto riuscito, annullato, in sospeso e completato in seguito.
- Riavvio app e ritorno in foreground.
- Ripristino su reinstallazione e secondo dispositivo con lo stesso account store.
- Doppia consegna dello stesso token e tentativo di riutilizzo su un altro account FineMese.
- Offline durante checkout/verifica/acknowledgement e recupero successivo.
- Rimborso/revoca e rimozione dell'entitlement.
- Pro non vede banner; Free vede solo il banner consentito dopo il consenso.
- Prezzo sempre letto dallo store; nessun checkout in ambiente web.
- Verificare su dispositivo Android reale con account tester/licenza Play Console.

## Bloccanti esterni

- Account Google Play Console e prodotto in-app `finemese_pro` creato con prezzo/paesi corretti.
- Accesso sicuro alle credenziali Google Play Developer API e configurazione secrets per la Edge Function.
- Accesso al progetto Supabase live per verificare schema/RLS e distribuire la funzione.
- Dispositivo Android o tester per testare realmente il checkout Play.
- Conferma finale del prezzo commerciale prima di pubblicare.

Nessun segreto o token va condiviso in chat. Non pagare la quota Play Console né reclutare tester per completare questa sola fase di progettazione.
