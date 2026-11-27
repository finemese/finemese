# Supabase — distribuzione e collaudo FineMese

Questa procedura riguarda il progetto Supabase effettivamente collegato all'app. Non eseguire comandi di deploy o SQL su un progetto non identificato con certezza.

## Prima del deploy
1. Aprire Supabase Dashboard e verificare il progetto e la sua regione.
2. Verificare che l'URL e la chiave publishable configurati in config.js puntino a quel progetto.
3. Verificare che tutte le tabelle con dati personali siano censite. Lo schema previsto da FineMese usa transactions, budgets e goals; controllare anche eventuali tabelle aggiunte in seguito.
4. Eseguire docs/supabase-live-verification.sql nel SQL Editor e conservare l'esito. Lo script è di sola lettura e non applica migrazioni.
5. Verificare che ogni tabella con dati utente abbia RLS attiva, policy coerenti e una FK verso auth.users con ON DELETE CASCADE (oppure una strategia server-side equivalente).

## Distribuire la funzione di eliminazione
Da una macchina fidata con Supabase CLI installata e accesso al progetto:

```bash
supabase login
supabase link --project-ref PROJECT_REF
supabase functions deploy delete-account
```

Sostituire PROJECT_REF con il riferimento del progetto corretto. Non inserire il service role key in file, repository, client, terminali condivisi o chat. La funzione legge SUPABASE_URL, SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY dall'ambiente server-side gestito da Supabase.

## Collaudo obbligatorio con account di prova
1. Creare due account di test A e B, con dati fittizi distintivi in tutte le tabelle.
2. Verificare che A non possa leggere, modificare o cancellare i record di B e viceversa, sia dall'app sia con richieste API autenticate.
3. Con un terzo account usa-e-getta, richiedere l'eliminazione dall'app e controllare che l'utente non esista più in Auth e che tutti i record collegati siano eliminati.
4. Provare chiamate senza JWT, con JWT scaduto e senza conferma esplicita: devono essere rifiutate.
5. Controllare i log della Edge Function e annotare gli eventuali tempi di conservazione dei backup.
6. Ripetere il test dopo ogni modifica alle policy, alle FK o alla funzione.

Non usare account reali né dati finanziari reali per questi test. Non considerare la cancellazione riuscita finché non è stata verificata anche nel database.

## Cosa non fa questa procedura
- Non applica automaticamente schema.sql al progetto live.
- Non modifica le policy RLS esistenti.
- Non verifica da sola i dati del progetto: richiede l'esecuzione da parte di una persona autorizzata.
- Non sostituisce la pagina web esterna di richiesta cancellazione né l'informativa privacy pubblica.
