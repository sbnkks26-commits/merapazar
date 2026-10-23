-- MeraPazar veritabanı şeması
-- Supabase > SQL Editor'de bir kez çalıştırın.

create extension if not exists pg_trgm;

-- ============ İLANLAR ============
create table if not exists public.listings (
  id            bigint generated always as identity primary key,
  user_id       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  cat           text not null check (cat in ('buyukbas','kucukbas','kumes')),
  tur           text not null check (char_length(tur) <= 40),
  irk           text check (char_length(irk) <= 60),
  baslik        text not null check (char_length(baslik) between 8 and 90),
  aciklama      text check (char_length(aciklama) <= 3000),
  fiyat         numeric(12,0) not null check (fiyat > 0 and fiyat <= 50000000),
  fiyat_tip     text not null default 'bas' check (fiyat_tip in ('bas','toplam')),
  adet          int not null default 1 check (adet between 1 and 100000),
  yas           int check (yas between 0 and 1000),
  yas_birim     text not null default 'ay' check (yas_birim in ('gün','hafta','ay')),
  cinsiyet      text check (cinsiyet in ('Dişi','Erkek','Karışık')),
  kilo          numeric(8,1) check (kilo > 0 and kilo < 3000),
  gebe          text check (char_length(gebe) <= 40),
  sut           numeric(5,1) check (sut >= 0 and sut < 200),
  kupe          text check (char_length(kupe) <= 30),
  asili         boolean not null default false,
  rapor         boolean not null default false,
  kurbanlik     boolean not null default false,
  pazarlik      boolean not null default false,
  takas         boolean not null default false,
  nakliye       boolean not null default false,
  il            text not null check (char_length(il) <= 30),
  ilce          text not null check (char_length(ilce) <= 40),
  mahalle       text check (char_length(mahalle) <= 80),
  konum         text check (char_length(konum) <= 300),
  satici_ad     text not null check (char_length(satici_ad) between 2 and 80),
  satici_tip    text not null default 'Bireysel',
  tel           text not null check (tel ~ '^5[0-9]{9}$'),
  whatsapp      boolean not null default true,
  fotolar       text[] not null default '{}' check (cardinality(fotolar) <= 8),
  durum         text not null default 'yayinda' check (durum in ('yayinda','satildi','kaldirildi')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists listings_durum_created on public.listings (durum, created_at desc);
create index if not exists listings_cat_tur on public.listings (cat, tur);
create index if not exists listings_il_ilce on public.listings (il, ilce);
create index if not exists listings_fiyat on public.listings (fiyat);
create index if not exists listings_user on public.listings (user_id);
create index if not exists listings_baslik_trgm on public.listings using gin (baslik gin_trgm_ops);

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
drop trigger if exists listings_touch on public.listings;
create trigger listings_touch before update on public.listings
for each row execute function public.touch_updated_at();

-- Kullanıcı başına günde en fazla 20 yeni ilan (spam koruması)
create or replace function public.ilan_limiti() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.listings
      where user_id = new.user_id and created_at > now() - interval '1 day') >= 20 then
    raise exception 'Günlük ilan sınırına ulaştınız (20).';
  end if;
  return new;
end $$;
drop trigger if exists listings_limit on public.listings;
create trigger listings_limit before insert on public.listings
for each row execute function public.ilan_limiti();

alter table public.listings enable row level security;

drop policy if exists "ilanlar herkese acik" on public.listings;
create policy "ilanlar herkese acik" on public.listings for select
  using (durum <> 'kaldirildi' or user_id = auth.uid());
drop policy if exists "kendi ilanini ekle" on public.listings;
create policy "kendi ilanini ekle" on public.listings for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "kendi ilanini guncelle" on public.listings;
create policy "kendi ilanini guncelle" on public.listings for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "kendi ilanini sil" on public.listings;
create policy "kendi ilanini sil" on public.listings for delete to authenticated
  using (user_id = auth.uid());

-- Telefon numarası toplu kazımaya karşı tabloyla birlikte okunamaz;
-- yalnızca "Telefonu göster" düğmesinin çağırdığı fonksiyonla tek tek açılır.
revoke all on public.listings from anon, authenticated;
grant select (id, user_id, cat, tur, irk, baslik, aciklama, fiyat, fiyat_tip, adet, yas, yas_birim,
  cinsiyet, kilo, gebe, sut, kupe, asili, rapor, kurbanlik, pazarlik, takas, nakliye, il, ilce,
  mahalle, konum, satici_ad, satici_tip, whatsapp, fotolar, durum, created_at, updated_at)
  on public.listings to anon, authenticated;
grant insert, update, delete on public.listings to authenticated;

create or replace function public.ilan_telefon(p_id bigint) returns text
language sql security definer set search_path = public stable as $$
  select tel from public.listings where id = p_id and (durum = 'yayinda' or user_id = auth.uid());
$$;
grant execute on function public.ilan_telefon(bigint) to anon, authenticated;

-- Ana sayfa haritası ve kategori sayıları
create or replace function public.il_sayilari() returns table (il text, sayi bigint)
language sql stable as $$
  select il, count(*) from public.listings where durum = 'yayinda' group by il;
$$;
create or replace function public.tur_sayilari() returns table (cat text, tur text, sayi bigint)
language sql stable as $$
  select cat, tur, count(*) from public.listings where durum = 'yayinda' group by cat, tur;
$$;
grant execute on function public.il_sayilari() to anon, authenticated;
grant execute on function public.tur_sayilari() to anon, authenticated;

-- ============ ŞİKÂYETLER ============
create table if not exists public.reports (
  id          bigint generated always as identity primary key,
  listing_id  bigint not null references public.listings(id) on delete cascade,
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  neden       text not null check (char_length(neden) <= 80),
  aciklama    text check (char_length(aciklama) <= 500),
  created_at  timestamptz not null default now(),
  unique (listing_id, user_id)
);
alter table public.reports enable row level security;
drop policy if exists "sikayet gonder" on public.reports;
create policy "sikayet gonder" on public.reports for insert to authenticated
  with check (user_id = auth.uid());
revoke all on public.reports from anon, authenticated;
grant insert (listing_id, neden, aciklama) on public.reports to authenticated;
-- Şikâyetleri yalnızca Supabase panelinden (Table Editor > reports) görürsünüz.

-- ============ FOTOĞRAF DEPOSU ============
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ilan-fotolari', 'ilan-fotolari', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

drop policy if exists "foto yukle" on storage.objects;
create policy "foto yukle" on storage.objects for insert to authenticated
  with check (bucket_id = 'ilan-fotolari' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "foto sil" on storage.objects;
create policy "foto sil" on storage.objects for delete to authenticated
  using (bucket_id = 'ilan-fotolari' and (storage.foldername(name))[1] = auth.uid()::text);
