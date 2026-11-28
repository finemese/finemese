# FineMese — piano monetizzazione (decisione iniziale)

## Decisione di prodotto

Modello scelto per la prima versione commerciale:

- **Gratis con pubblicità limitata**.
- **FineMese Pro con acquisto una tantum**, prezzo iniziale da valutare: **€7,99**.
- Nessun abbonamento nella prima versione.
- Nessuna pubblicità nella versione Pro.

Questa è una decisione di prodotto da implementare e verificare, non una monetizzazione già attiva. Il prezzo va confermato nella Play Console e può essere modificato prima del lancio.

## Esperienza pubblicitaria prevista

Per la prima release:

- Un solo banner adattivo ancorato in basso nella schermata principale autenticata.
- Nessun annuncio nella schermata di accesso/registrazione, durante l'inserimento o la modifica di movimenti, budget e obiettivi, né nelle schermate di conferma o cancellazione account.
- Nessun interstitial, video obbligatorio, annuncio premiato o popup.
- L'annuncio non deve coprire pulsanti, importi, movimenti o contenuti; riservare lo spazio del banner nel layout e verificare le dimensioni su telefoni diversi.
- Non usare categorie o segmenti basati su entrate, uscite, saldo, debiti, categorie di spesa o altri dati finanziari.
- Se l'annuncio non è disponibile o il consenso non è stato raccolto, non mostrare un riquadro vuoto e non bloccare l'app.

## Privacy e consenso (condizione bloccante)

FineMese è destinata anche a utenti nello Spazio economico europeo. Prima di caricare annunci reali:

1. scegliere e integrare una CMP certificata da Google e implementare il flusso Google User Messaging Platform (UMP), ove applicabile;
2. mostrare l'informativa e raccogliere/registrare le scelte di consenso prima di inizializzare o richiedere annunci quando richiesto;
3. offrire un modo facilmente accessibile per rivedere o modificare le scelte sulla privacy;
4. configurare AdMob, le informazioni sull'app e le dichiarazioni richieste da Google Play;
5. aggiornare privacy policy e Data safety descrivendo SDK, dati trattati, finalità, condivisioni e conservazione sulla base dell'integrazione effettiva;
6. verificare il comportamento con annunci di test e dispositivi di test; non cliccare mai sui propri annunci reali.

Non presumere che un annuncio non personalizzato elimini tutti gli obblighi di consenso o informativa. La configurazione definitiva va verificata rispetto alle regole Google vigenti e ai paesi di distribuzione.

## FineMese Pro

- Pro rimuove il banner e ogni altro formato pubblicitario.
- Sblocca soltanto funzioni Pro realmente implementate e descritte chiaramente nello store.
- L'acquisto una tantum va implementato con Google Play Billing tramite una libreria/plugin Capacitor mantenuto e compatibile con la versione Capacitor del progetto.
- Verificare acquisti, ripristino/verifica entitlement, reinstallazione, cambio dispositivo, rimborsi e gestione offline.
- Non dichiarare o mostrare funzioni Pro non ancora sviluppate.
- Il prezzo indicativo iniziale è €7,99, da confermare in Play Console. Non è stato creato alcun prodotto né attivato alcun pagamento.

## Configurazione e segreti

Prima di collegare l'SDK occorrono:
- account AdMob del titolare e app Android registrata;
- App ID AdMob e Ad Unit ID banner di produzione;
- identificativi di test separati per sviluppo e CI;
- CMP/UMP e configurazione del messaggio di consenso;
- prodotto Pro configurato in Play Console.

Gli ID pubblici dell'app/annuncio non sono password, ma non inserire credenziali, chiavi private o segreti in chat o nel repository. Usare test ad unit durante sviluppo e test. Gli annunci di produzione devono restare disattivati fino al completamento del consenso, delle policy e dei test.

## Sequenza di implementazione

1. Completare prima verifica Supabase, cancellazione account e privacy.
2. Scegliere CMP e verificare l'informativa sulla base dei dati/SDK effettivi.
3. Integrare UMP e AdMob con un banner limitato alla schermata principale, inizialmente solo con unità di test.
4. Eseguire build e test Android; verificare layout, consenso, assenza di annunci nelle schermate sensibili e assenza di richieste pubblicitarie per Pro.
5. Implementare e collaudare Google Play Billing e l'entitlement Pro.
6. Solo dopo approvazione e pubblicazione, configurare gli identificativi reali e attivare gli annunci.

## Stato

- [x] Modello commerciale iniziale deciso: Gratis con un banner discreto + Pro senza pubblicità con acquisto una tantum.
- [ ] Account AdMob, app e unità pubblicitaria creati dal titolare.
- [ ] CMP/UMP e flusso consenso integrati e verificati.
- [ ] SDK AdMob integrato e provato solo con unità di test.
- [ ] Funzione di acquisto una tantum Pro implementata e testata.
- [ ] Informativa privacy e Data safety aggiornate sulla base degli SDK e dei flussi reali.
- [ ] Annunci di produzione attivati solo dopo il completamento di tutti i controlli.


## Avanzamento integrazione tecnica (28 novembre 2026)

- [x] SDK AdMob/UMP collegato nel ramo di lavoro con soli App ID e banner unit Google ufficiali di test; gli annunci reali non sono attivi.
- [x] Richiesta consenso UMP prima di richiedere annunci, con blocco richieste se il consenso non consente gli annunci e accesso alle opzioni privacy quando richiesto.
- [x] Banner limitato all'area autenticata e nascosto durante l'inserimento nei campi.
- [x] Workflow Android release APK/AAB completato con successo sul commit `6cb56072cd9c354bbac4afa33d9ea18934f98161`; artefatto `finemese-android-release` disponibile, ma non firmato.
- [x] Workflow iOS Simulator completato con successo sullo stesso commit.
- [ ] Workflow Android debug da ripetere: il run ha fallito per HTTP 429 da Maven Central durante il download di dipendenze, non per un errore di compilazione del codice.
- [ ] Configurare il messaggio UMP nell'account AdMob reale e completare verifica privacy/Data safety prima di sostituire gli ID di test.
- [ ] Specifica del flusso sicuro Google Play Billing Pro: [google-play-billing-pro-design.md](google-play-billing-pro-design.md). Non è ancora stato installato il plugin né attivato alcun prodotto o pagamento.
