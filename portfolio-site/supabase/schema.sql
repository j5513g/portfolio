-- Run in Supabase SQL Editor after creating your project.
-- Then create a public Storage bucket named "journal-images".

create type experience_type as enum ('role', 'leadership', 'certification');

create table journal_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  date date not null,
  date_end date,
  tags text[] not null default '{}',
  images jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table experience_roles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  start_date date not null,
  end_date date,
  description text,
  type experience_type not null default 'role',
  sort_order int not null default 0
);

alter table journal_posts enable row level security;
alter table experience_roles enable row level security;

create policy "public read journal_posts" on journal_posts for select using (true);
create policy "public read experience_roles" on experience_roles for select using (true);
create policy "auth write journal_posts" on journal_posts for all using (auth.role() = 'authenticated');
create policy "auth write experience_roles" on experience_roles for all using (auth.role() = 'authenticated');

-- Storage: create bucket "journal-images" (public) in Dashboard, then run:
-- create policy "public read journal images" on storage.objects for select using (bucket_id = 'journal-images');
-- create policy "auth upload journal images" on storage.objects for insert with check (bucket_id = 'journal-images' and auth.role() = 'authenticated');
-- create policy "auth update journal images" on storage.objects for update using (bucket_id = 'journal-images' and auth.role() = 'authenticated');
-- create policy "auth delete journal images" on storage.objects for delete using (bucket_id = 'journal-images' and auth.role() = 'authenticated');
