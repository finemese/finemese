-- FineMese: verifiche non distruttive sul progetto Supabase LIVE.
-- Eseguire nel SQL Editor del progetto corretto prima della pubblicazione.
-- Questo script NON modifica schema, policy o dati.

-- 1) Verifica che le tabelle previste esistano, abbiano RLS attiva e policy definite.
select
  n.nspname as schema_name,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as rls_forced,
  count(p.policyname) as policy_count,
  coalesce(string_agg(p.policyname, ', ' order by p.policyname), '') as policies
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
left join pg_policies p
  on p.schemaname = n.nspname and p.tablename = c.relname
where n.nspname = 'public'
  and c.relname in ('transactions', 'budgets', 'goals')
  and c.relkind = 'r'
group by n.nspname, c.relname, c.relrowsecurity, c.relforcerowsecurity
order by c.relname;

-- 2) Verifica che ogni tabella abbia una FK verso auth.users con ON DELETE CASCADE.
-- Se una tabella non compare, NON presumere che la cancellazione account elimini i suoi dati.
select
  child.relname as table_name,
  con.conname as constraint_name,
  pg_get_constraintdef(con.oid) as definition,
  case when con.confdeltype = 'c' then 'OK: CASCADE' else 'ATTENZIONE: non CASCADE' end as delete_behavior
from pg_constraint con
join pg_class child on child.oid = con.conrelid
join pg_namespace child_ns on child_ns.oid = child.relnamespace
join pg_class parent on parent.oid = con.confrelid
join pg_namespace parent_ns on parent_ns.oid = parent.relnamespace
where con.contype = 'f'
  and child_ns.nspname = 'public'
  and parent_ns.nspname = 'auth'
  and parent.relname = 'users'
order by child.relname, con.conname;

-- 3) Elenca TUTTE le tabelle pubbliche che contengono una colonna user_id.
-- Controllare anche eventuali tabelle non previste da questo progetto.
select table_schema, table_name
from information_schema.columns
where table_schema = 'public' and column_name = 'user_id'
order by table_name;

-- 4) Test manuale di isolamento RLS (sola lettura).
-- Sostituire i due UUID con ID REALI di due account di TEST distinti.
-- Eseguire ogni blocco separatamente nella stessa sessione SQL.
--
-- begin;
-- set local role authenticated;
-- select set_config('request.jwt.claim.sub', 'UUID_ACCOUNT_A', true);
-- select 'A: righe visibili' as test, 'transactions' as tabella, count(*) from public.transactions;
-- select 'A: righe visibili' as test, 'budgets' as tabella, count(*) from public.budgets;
-- select 'A: righe visibili' as test, 'goals' as tabella, count(*) from public.goals;
-- rollback;
--
-- Ripetere con UUID_ACCOUNT_B e confrontare. Un account non deve vedere i record
-- dell'altro. Per una prova completa, inserire record di test distintivi per A e B
-- e verificare che ciascun utente veda solo i propri.
--
-- IMPORTANTE: questo script non sostituisce i test API con JWT reali né una verifica
-- dell'endpoint delete-account. Non eseguire la cancellazione su account reali.
