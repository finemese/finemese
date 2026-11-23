# FineMese 1.2 — piano monetizzazione

## Obiettivo
Preparare un modello Free + Premium senza modificare il comportamento della versione pubblicata finché configurazione, privacy e test non sono completati.

## Decisioni di prodotto da validare
- Free: funzioni essenziali attuali; eventuale banner discreto, non sovrapposto ai dati e non inserito nei flussi di inserimento.
- Premium: senza pubblicità.
- Prezzi ipotizzati, non ancora attivi: 2,99 €/mese oppure 19,99 €/anno.
- Le funzioni Premium (statistiche, confronti ed esportazione) saranno definite prima di attivare gli abbonamenti.

## Pubblicità web/PWA
FineMese è una PWA web. La prima soluzione da valutare è Google AdSense per il sito web; AdMob è principalmente destinato ad app Android/iOS distribuite tramite store e non va integrato come se fosse un normale tag web.

Prima di caricare annunci reali:
1. pubblicare e verificare il dominio definitivo;
2. richiedere e ottenere l'approvazione AdSense;
3. configurare una CMP certificata Google e integrata con IAB TCF per il traffico SEE/Regno Unito/Svizzera quando si servono annunci personalizzati;
4. aggiornare privacy policy, cookie policy e informativa pubblicitaria;
5. inserire publisher ID e unità pubblicitarie reali solo dopo l'approvazione;
6. mostrare gli annunci solo agli utenti Free e solo dopo aver rispettato le scelte di consenso.

Non inserire ID dimostrativi, annunci finti o richieste pubblicitarie prima della configurazione. Nessuna pubblicità deve coprire contenuti, controlli o dati finanziari.

## Abbonamenti Premium
Non attivare un semplice flag Premium nel browser: può essere manipolato. Lo stato dell'abbonamento dovrà essere verificato lato server tramite un provider di pagamento e webhook firmati; le chiavi segrete resteranno in funzioni/server, mai in `config.js` o nel browser.

Prima di scegliere il provider:
- verificare se il prodotto resterà esclusivamente web/PWA oppure sarà distribuito anche negli store;
- configurare prezzi, IVA, fatturazione, rinnovi, cancellazioni e rimborsi;
- definire quali funzioni Premium sono effettivamente disponibili;
- testare pagamenti e webhook in ambiente sandbox.

## Requisiti di rilascio
- Conservare intatta la versione corrente e rilasciare prima su un ambiente di test.
- Verificare login, registrazione, recupero password, movimenti, budget e obiettivi con il progetto Supabase effettivamente usato in produzione.
- Verificare RLS e permessi Supabase; non eseguire modifiche SQL in produzione senza backup verificato e approvazione esplicita.
- Predisporre privacy policy, cookie policy, termini, contatti del titolare e procedura di cancellazione account.
- Non pubblicare la versione commerciale finché test tecnici, privacy e pagamenti non sono completati.

## Stato
Questo documento è solo il piano di lavoro. Non attiva annunci, abbonamenti, pagamenti o modifiche al database.


## Distribuzione su App Store e Google Play

La strategia scelta è multipiattaforma: mantenere la PWA web e realizzare anche app iOS e Android.

### Architettura da valutare
- Riutilizzare il più possibile il progetto web esistente, valutando Capacitor per il packaging nativo.
- Prima di scegliere, realizzare una prova tecnica su iOS e Android e verificare accesso, navigazione, gestione sessione, link, notifiche e comportamento offline.
- Non inviare agli store una semplice WebView senza valore aggiunto: Apple richiede un'esperienza con funzionalità e utilità adeguate oltre a un sito riconfezionato.

### Monetizzazione per piattaforma
- Web/PWA: valutare Google AdSense e checkout web conforme alle regole applicabili.
- iOS: per sbloccare funzioni digitali e abbonamenti nell'app, predisporre Apple In-App Purchase/StoreKit, rispettando le regole e le eventuali eccezioni regionali vigenti.
- Android: per funzioni Premium e rimozione ads nell'app distribuita da Google Play, predisporre Google Play Billing, salvo eccezioni applicabili.
- Annunci nelle app native: valutare Google AdMob con configurazione privacy/consenso adeguata.
- Un servizio backend di entitlement dovrà riconoscere gli acquisti verificati e sincronizzare lo stato Premium tra dispositivi e piattaforme; prevedere ripristino acquisti, rinnovi, scadenze, rimborsi e cancellazioni.
- Verificare le regole correnti degli store e i relativi costi/commissioni prima di configurare prezzi e pubblicazione.

### Account e pubblicazione
Serviranno account sviluppatore Apple Developer Program e Google Play Console intestati al titolare corretto, oltre a schede store, icone, screenshot, descrizioni, classificazione contenuti, informative privacy e build firmate.
