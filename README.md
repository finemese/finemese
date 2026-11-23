# FineMese 1.1 — ricostruzione PWA

App web installabile per gestione personale di entrate, uscite, budget e obiettivi con autenticazione Supabase.

## Configurazione
- Configurazione client in `config.js` con URL e chiave publishable Supabase.
- Pubblicare la cartella alla radice di un hosting statico HTTPS.
- In Supabase Auth configurare Site URL e Redirect URLs con l'indirizzo effettivo di pubblicazione.

## Tabelle attese
L'interfaccia usa le tabelle `transactions`, `budgets`, `goals`. Lo schema SQL va verificato rispetto al progetto Supabase prima dell'uso live.

## Stato
Questa è una ricostruzione tecnica basata sulle specifiche disponibili nella conversazione, non una copia binaria verificata del precedente archivio 1.1. Non è ancora stata collaudata con il progetto Supabase né pubblicata.
