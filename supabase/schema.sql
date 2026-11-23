-- FineMese: schema iniziale Supabase
-- Eseguire nel SQL Editor del progetto Supabase collegato a FineMese.
-- Le policy RLS fanno sì che ogni utente possa leggere e modificare solo i propri dati.

create extension if not exists pgcrypto;

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('income', 'expense')),
  amount numeric(12,2) not null check (amount > 0),
  category text not null default 'Altro',
  description text not null default '',
  transaction_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month text not null check (month ~ '^\d{4}-(0[1-9]|1[0-2])$'),
  category text not null,
  amount numeric(12,2) not null check (amount > 0),
  created_at timestamptz not null default now(),
  constraint budgets_user_month_category_unique unique (user_id, month, category)
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 60),
  target_amount numeric(12,2) not null check (target_amount > 0),
  current_amount numeric(12,2) not null default 0 check (current_amount >= 0),
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_date_idx
  on public.transactions (user_id, transaction_date desc);
create index if not exists budgets_user_month_idx
  on public.budgets (user_id, month desc);
create index if not exists goals_user_created_idx
  on public.goals (user_id, created_at desc);

alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
alter table public.goals enable row level security;

drop policy if exists "Users manage own transactions" on public.transactions;
create policy "Users manage own transactions"
  on public.transactions for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users manage own budgets" on public.budgets;
create policy "Users manage own budgets"
  on public.budgets for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users manage own goals" on public.goals;
create policy "Users manage own goals"
  on public.goals for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.transactions to authenticated;
grant select, insert, update, delete on public.budgets to authenticated;
grant select, insert, update, delete on public.goals to authenticated;
