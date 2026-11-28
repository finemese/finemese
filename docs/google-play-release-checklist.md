# FineMese — checklist prima di Google Play

Questa checklist distingue il lavoro preparato nel repository dai passaggi che richiedono il titolare dell'account o accesso al progetto Supabase.

## Preparato nel ramo di lavoro
- [x] Pipeline GitHub Actions per APK Android debug.
- [x] Pipeline GitHub Actions per APK/AAB Android release.
- [x] Supporto condizionale alla firma tramite GitHub Actions secrets.
- [x] Pipeline iOS per simulatore (non sostituisce un IPA firmato).
- [x] Filtri espliciti per utente autenticato nelle query Supabase del client.
- [x] Funzione Supabase server-side per eliminazione account e azione in app con doppia conferma (non ancora distribuite/collaudate).
- [x] Bozza scheda Play Store.
- [x] Bozza informativa privacy in Markdown e HTML con campi da verificare.
- [x] Modello HTML della pagina esterna per richieste di eliminazione account (docs/account-deletion.html); richiede recapito e tempi reali prima della pubblicazione.
- [x] Script SQL non distruttivo per verificare RLS, policy e vincoli di cancellazione nel progetto Supabase reale (docs/supabase-live-verification.sql).
- [x] Procedura di deploy e collaudo Supabase con account di test (docs/supabase-deployment-and-test.md).
- [x] Revisione statica pre-release con rischi e controlli da completare.
- [x] Controlli statici automatici nei workflow Android e iOS.
- [x] Build CI verificate con successo sul commit `36d71368efe15092367678ae510caeb60156085d` (28 novembre 2026): APK debug, release Android APK/AAB e app iOS Simulator. I controlli statici sono passati in tutti e tre i workflow.
- [x] Artefatto release Android generato: `finemese-android-release` (APK e AAB non firmati perché i secrets di firma non sono configurati). Run: https://github.com/finemese/finemese/actions/runs/46146363750
- [x] Piano monetizzazione iniziale documentato in docs/monetization-plan.md: versione gratuita con un banner limitato + Pro senza pubblicità con acquisto una tantum indicativo di €7,99.

## Bloccanti tecnici prima della pubblicazione
- [ ] Eseguire docs/supabase-live-verification.sql sul progetto Supabase corretto e verificare ogni tabella con dati utente, non solo quelle attese.
- [ ] Distribuire supabase/functions/delete-account nel progetto Supabase reale.
- [ ] Verificare che tutte le tabelle utente abbiano foreign key con cancellazione a cascata; testare eliminazione account e dati con un account dedicato di prova.
- [ ] Verificare le policy RLS effettive su Supabase con due account distinti. Il file SQL nel repository non prova che lo schema sia stato applicato al progetto live.
- [ ] Verificare login, conferma email, reset password, sessione, logout e comportamento di rete su un dispositivo Android reale.
- [x] Fissare una versione esatta dell'SDK Supabase e includere il bundle locale negli asset Capacitor; la build CI conferma che il file sia presente e caricabile.
- [ ] Verificare il funzionamento dell'SDK locale nelle WebView Android/iOS e valutare CORS della Edge Function rispetto ai flussi effettivi.
- [ ] Completare e pubblicare la pagina web esterna per richieste di eliminazione account, con URL da inserire nella Play Console.
- [ ] Pubblicare informativa privacy completa e verificata.
- [ ] Completare Data safety, classificazione contenuti, target audience e dichiarazioni Play Console.
- [ ] Preparare icona 512 × 512, feature graphic 1024 × 500 e screenshot reali.
- [ ] Creare account AdMob, registrare l'app e generare App ID e Ad Unit ID banner.
- [ ] Integrare CMP/Google UMP e flusso di consenso per utenti SEE prima delle richieste pubblicitarie.
- [ ] Integrare AdMob con un solo banner nelle schermate principali autenticate; usare solo unità di test fino al via libera privacy/policy.
- [ ] Implementare Google Play Billing per l'acquisto una tantum Pro e la rimozione degli annunci; prezzo indicativo €7,99 da confermare.
- [ ] Aggiornare privacy policy e Data safety in base agli SDK e ai dati effettivamente trattati.

## Interventi richiesti al titolare
- [ ] Fornire i recapiti del titolare e un indirizzo email di assistenza da pubblicare nell'informativa e nella pagina di eliminazione.
- [ ] Confermare i tempi effettivi di gestione delle richieste e di conservazione dei backup, dopo averli verificati con la configurazione Supabase.
- [ ] Creare/configurare account AdMob e app Android; gli identificativi pubblici dell'app/annunci potranno poi essere inseriti nella configurazione, senza condividere password o chiavi private.
- [ ] Generare una chiave di upload sicura e configurare i quattro repository secrets indicati in docs/capacitor-setup.md. Non inviare password o chiavi in chat.
- [ ] Creare/verificare account Google Play Console e pagare la quota una tantum mostrata da Google.
- [ ] Quando Google Play lo richiede per un nuovo account personale, reclutare almeno 12 tester reali che aderiscano al test chiuso per 14 giorni consecutivi, quindi inviare la richiesta di accesso alla produzione.

## Regola di rilascio
Non caricare un AAB non firmato e non dichiarare l'app pronta per la produzione finché i blocchi sopra non sono stati verificati. La PR di preparazione resta in bozza e non viene unita automaticamente.
