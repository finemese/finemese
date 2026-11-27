# Informativa privacy FineMese — bozza da completare

> NON PUBBLICARE questa bozza finché i campi tra parentesi quadre non sono compilati e le informazioni non sono state verificate con il progetto Supabase effettivo. È un promemoria redazionale, non una valutazione legale.

**Ultimo aggiornamento:** [DATA]

## Titolare del trattamento
[TITOLARE / RAGIONE SOCIALE E INDIRIZZO]
Contatto privacy: [EMAIL DI CONTATTO]

## Dati trattati
FineMese consente la creazione di un account con email e password. In base alle funzioni utilizzate, l'app tratta:
- Dati account e autenticazione: indirizzo email e identificativi tecnici dell'account.
- Dati finanziari inseriti manualmente: tipo di movimento, importo, categoria, data e descrizione.
- Dati di pianificazione inseriti manualmente: categoria e importo dei budget, nome e importi degli obiettivi di risparmio.
- Dati tecnici necessari al funzionamento e alla sicurezza: [SPECIFICARE LOG, IP, IDENTIFICATORI E TEMPI SOLO DOPO VERIFICA].

FineMese non si collega automaticamente ai conti bancari e non acquisisce credenziali bancarie.

## Finalità e basi giuridiche
[DESCRIVERE E VALIDARE CON CONSULENTE: erogazione del servizio richiesto, sicurezza, obblighi di legge, eventuali comunicazioni di servizio.]

## Fornitore e conservazione
I dati applicativi sono configurati per essere archiviati tramite Supabase. Prima della pubblicazione indicare:
- Entità giuridica e ruolo contrattuale del fornitore.
- Regione in cui è ospitato il progetto e possibili trasferimenti.
- Sub-responsabili rilevanti.
- Tempi di conservazione per account attivi, log, backup e account eliminati.

## Condivisione e sicurezza
[DESCRIVERE SOLO MISURE REALMENTE CONFIGURATE E VERIFICATE: HTTPS/TLS, controlli di accesso, Row Level Security, backup, gestione incidenti.]

## Eliminazione account e diritti
L'eliminazione account dall'app sarà disponibile dopo il deployment e il collaudo della funzione server-side. Per le richieste esterne usare: [URL PAGINA ELIMINAZIONE ACCOUNT].
Per richieste privacy e diritti applicabili: [EMAIL DI CONTATTO E PROCEDURA].

## Minori
[INDICARE SE IL SERVIZIO È DESTINATO A MAGGIORENNI E LE REGOLE APPLICABILI.]

## Modifiche
Le modifiche a questa informativa saranno pubblicate su questa pagina con la data di aggiornamento.

## Da verificare prima di pubblicare
- [ ] Identità e recapiti del titolare.
- [ ] Configurazione reale Supabase, regione, contratti e sub-responsabili.
- [ ] RLS effettivamente attiva su tutte le tabelle e test con due account distinti.
- [ ] Logging, backup, retention e cancellazione completa.
- [ ] Eventuali analytics, crash reporting, notifiche o SDK di terze parti.
- [ ] Coerenza con Google Play Data safety e normativa applicabile.
