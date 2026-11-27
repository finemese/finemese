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
- [x] Bozza informativa privacy con campi da verificare.

## Bloccanti tecnici prima della pubblicazione
- [ ] Distribuire `supabase/functions/delete-account` nel progetto Supabase reale.
- [ ] Verificare che tutte le tabelle utente abbiano foreign key con cancellazione a cascata; testare eliminazione account e dati.
- [ ] Verificare le policy RLS effettive su Supabase con due account distinti. Il file SQL nel repository non prova che lo schema sia stato applicato al progetto live.
- [ ] Verificare login, conferma email, reset password, sessione, logout e comportamento di rete su un dispositivo Android reale.
- [ ] Creare una pagina web pubblica per richieste di eliminazione account, con URL da inserire nella Play Console.
- [ ] Pubblicare informativa privacy completa e verificata.
- [ ] Completare Data safety, classificazione contenuti, target audience e dichiarazioni Play Console.
- [ ] Preparare icona 512 × 512, feature graphic 1024 × 500 e screenshot reali.
- [ ] Definire modello di monetizzazione e implementare l'eventuale acquisto in-app o pubblicità nel rispetto delle policy. Attualmente non c'è monetizzazione attiva.

## Interventi richiesti al titolare
- [ ] Creare/verificare account Google Play Console e pagare la quota una tantum mostrata da Google.
- [ ] Generare una chiave di upload sicura e configurare i quattro repository secrets indicati in `docs/capacitor-setup.md`. Non inviare password o chiavi in chat.
- [ ] Fornire i recapiti del titolare e un indirizzo email di assistenza da pubblicare nell'informativa e nella scheda.
- [ ] Scegliere il modello commerciale prima di attivare i pagamenti.
- [ ] Quando Google Play lo richiede per un nuovo account personale, reclutare almeno 12 tester reali che aderiscano al test chiuso per 14 giorni consecutivi, quindi inviare la richiesta di accesso alla produzione.

## Regola di rilascio
Non caricare un AAB non firmato e non dichiarare l'app pronta per la produzione finché i blocchi sopra non sono stati verificati. La PR di preparazione resta in bozza e non viene unita automaticamente.
