-- HDM Industrial — Personnel requests (Request Engine persistence)
-- Doc 09 §84-85: online submission persists BEFORE any success is shown.
-- Applied via Supabase SQL editor or `supabase db push`. RLS enabled: the
-- anon key can only INSERT (public form); reads are restricted to the
-- service role / authenticated back-office.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- personnel_requests: one row per submitted request
-- ---------------------------------------------------------------------------
create table if not exists public.personnel_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  status text not null default 'RECEIVED'
    check (status in ('RECEIVED', 'IN_REVIEW', 'CONTACTED', 'CLOSED')),
  locale text not null check (locale in ('es', 'ca', 'en', 'pt')),
  source text not null default 'web',
  mode text not null check (mode in ('expert', 'assisted')),
  need_type text,
  sector text,
  project jsonb,
  logistics jsonb,
  certification_required text,
  certification_requirements text,
  job_description text,
  approximate_quantity integer,
  -- Contact (PII): stored only at submission time, never in the browser draft.
  company_name text not null,
  contact_name text not null,
  contact_email text,
  contact_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists personnel_requests_status_idx on public.personnel_requests (status);
create index if not exists personnel_requests_created_idx on public.personnel_requests (created_at desc);

-- ---------------------------------------------------------------------------
-- request_profiles: one row per requested profile line
-- ---------------------------------------------------------------------------
create table if not exists public.request_profiles (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.personnel_requests (id) on delete cascade,
  profession text not null,
  specialization text,
  quantity integer not null check (quantity between 1 and 500),
  requirements text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists request_profiles_request_idx on public.request_profiles (request_id);

-- ---------------------------------------------------------------------------
-- request_attachments: METADATA ONLY (§36: private uploads, never public URLs)
-- Binary upload happens through a separate private channel after review;
-- the web form transmits names/sizes/mime so HDM knows what to expect.
-- ---------------------------------------------------------------------------
create table if not exists public.request_attachments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.personnel_requests (id) on delete cascade,
  file_name text not null,
  size_bytes bigint not null,
  mime_type text not null,
  status text not null default 'metadata_only'
    check (status in ('metadata_only', 'received', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists request_attachments_request_idx on public.request_attachments (request_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.personnel_requests enable row level security;
alter table public.request_profiles enable row level security;
alter table public.request_attachments enable row level security;

-- Public form (anon key): INSERT only. No SELECT/UPDATE/DELETE for anon.
create policy "anon can insert requests"
  on public.personnel_requests for insert
  to anon
  with check (true);

create policy "anon can insert request profiles"
  on public.request_profiles for insert
  to anon
  with check (true);

create policy "anon can insert request attachments"
  on public.request_attachments for insert
  to anon
  with check (true);

-- Back-office reads/updates happen with the service role (bypasses RLS) or
-- via authenticated policies added later with the back-office. No public read.

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists personnel_requests_updated_at on public.personnel_requests;
create trigger personnel_requests_updated_at
  before update on public.personnel_requests
  for each row execute function public.set_updated_at();
