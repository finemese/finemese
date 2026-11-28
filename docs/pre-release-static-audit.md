# FineMese — revisione statica pre-release

Data revisione: 27 novembre 2026  
Ambito: revisione dei file presenti nel ramo `work/mobile-build-automation`. Non è un penetration test e non sostituisce prove su Supabase o dispositivi reali.

## Controlli positivi osservati

- Il client usa una chiave Supabase publishable/anon; non è presente una service-role key nel file `config.js`.
- Le query client per movimenti, budget e obiettivi filtrano esplicitamente per l'ID dell'utente autenticato.
- Il file `supabase/schema.sql` abilita RLS sulle tre tabelle e prevede policy per l'utente autenticato con controllo sia in lettura/modifica sia in scrittura.
- Le tre tabelle definite nello schema hanno una foreign key verso `auth.users(id)` con `ON DELETE CASCADE`.
- La funzione `delete-account` richiede POST, JWT valido, conferma esplicita e recupera l'utente tramite Supabase Auth prima della cancellazione amministrativa.
- La chiave `SUPABASE_SERVICE_ROLE_KEY` viene letta esclusivamente nell'ambiente server-side della Edge Function.
- I campi testuali visualizzati nelle liste vengono sottoposti a escaping HTML tramite `esc()`.

## Rischi e verifiche ancora necessarie

1. **Schema live non verificato.** Il file SQL non dimostra che le stesse policy, tabelle e foreign key siano presenti nel progetto Supabase indicato in `config.js`. Eseguire l'audit SQL documentato e verificare ogni tabella pubblica che contiene dati personali.
2. **Cancellazione account non collaudata.** La cascata è definita per le tre tabelle nello schema, ma non è stata provata sul progetto live né verificata per eventuali altre tabelle, Storage, log o dati conservati da fornitori. Eseguire il test solo con un account usa-e-getta.
3. **CORS permissivo.** La funzione risponde con `Access-Control-Allow-Origin: *`. Il JWT obbligatorio limita l'accesso, ma prima del rilascio valutare una allowlist delle origini effettivamente utilizzate, mantenendo il supporto alle richieste native se necessario.
4. **SDK locale aggiornato, ma da collaudare.** Il ramo ora fissa `@supabase/supabase-js` alla versione `2.119.2` sia nel client sia nell'import della Edge Function. `copy:web` copia il bundle UMD locale in `www/vendor/`; i workflow eseguono controlli statici dopo la copia per verificare la presenza del bundle e alcuni requisiti di sicurezza. Resta da verificare il funzionamento nelle WebView Capacitor.
5. **Flussi di autenticazione nativi.** Reset password, conferma email e deep link devono essere configurati e provati su Android reale; il flusso web non dimostra che i link tornino correttamente nell'app Capacitor.
6. **Test automatici applicativi limitati.** Sono stati aggiunti controlli statici eseguiti dai workflow per SDK locale, chiavi client, policy RLS versionate e requisiti della funzione di cancellazione. Non sostituiscono test runtime per isolamento RLS, autenticazione, validazione dati o cancellazione account.
7. **Pagine legali non pubblicabili.** Privacy e cancellazione account contengono campi segnaposto e si trovano sotto `docs/`; non sono state pubblicate su un URL HTTPS pubblico e non sono incluse nella copia degli asset web dell'app.
8. **Firma Android non configurata.** Senza i quattro GitHub Actions secrets la pipeline produce artefatti non firmati, non pronti per il caricamento su Google Play.

## Esito

La revisione statica non ha rilevato una service-role key esposta nel client né una mancanza evidente di policy RLS nello schema versionato. Restano però bloccanti le verifiche live di Supabase, i test con account di prova, i flussi nativi, le pagine legali pubbliche e la firma Android.

Non dichiarare FineMese pronta per la produzione sulla sola base di questa revisione. Non eseguire migrazioni, deploy o cancellazioni sul progetto reale senza aver prima identificato il progetto corretto e predisposto un account di test dedicato.
