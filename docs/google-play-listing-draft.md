# Google Play — bozza scheda FineMese

> Bozza interna: non pubblicare finché non sono completati collaudo, privacy policy, Data safety, firma e verifica dei requisiti Play Console.

## Nome app
FineMese

## Descrizione breve
Gestisci entrate, uscite, budget e obiettivi di risparmio.

## Descrizione completa
FineMese ti aiuta a tenere sotto controllo il denaro del mese, con una panoramica semplice delle tue entrate e delle tue uscite.

**Con FineMese puoi:**
- Registrare entrate e uscite con importo, categoria, data e descrizione.
- Consultare il riepilogo mensile di entrate, uscite e saldo.
- Impostare limiti di budget per categoria.
- Creare obiettivi di risparmio e visualizzare gli importi registrati.
- Accedere con il tuo account per ritrovare i dati associati al profilo.

FineMese è uno strumento di organizzazione personale. Non è una banca, non offre consulenza finanziaria e non effettua pagamenti o collegamenti automatici ai conti bancari.

## Categoria candidata
Finanza (da confermare nella Play Console).

## Contatti e URL da fornire prima della pubblicazione
- Email assistenza: DA INSERIRE dal titolare.
- URL privacy policy pubblica: DA PUBBLICARE e verificare.
- URL sito web: DA DEFINIRE.
- URL per richiesta di eliminazione account/dati: DA PUBBLICARE e verificare.

## Asset grafici richiesti da Google Play
- Icona app PNG 512 × 512.
- Immagine feature graphic 1024 × 500.
- Screenshot reali dell'app su telefono (minimo richiesto dalla Play Console per il tipo di scheda).
Gli asset vanno generati a partire dalla UI reale e controllati prima del caricamento.

## Dati e dichiarazioni da verificare
L'app attualmente prevede account email/password e memorizza su Supabase dati inseriti dall'utente: movimenti (importo, tipo, categoria, descrizione, data), budget e obiettivi di risparmio. Prima della dichiarazione Data safety bisogna verificare il progetto Supabase effettivo, logging, backup, retention, eventuali sub-processors, cifratura in transito/a riposo e procedure di cancellazione. Non copiare questa descrizione nella Data safety senza tale verifica.

## Funzioni non ancora presenti / da non dichiarare
- Pagamenti, abbonamenti o acquisti in-app.
- Pubblicità.
- Collegamento automatico ai conti bancari.
- Esportazione dei dati.
- Eliminazione account: interfaccia e funzione server-side predisposte nel repository, ma da distribuire e collaudare sul progetto Supabase reale; resta obbligatorio pubblicare anche un URL web esterno per le richieste di cancellazione.
- Avanzamento automatico del budget o versamenti agli obiettivi.
