# MeraPazar – proje notları

Türkiye geneli hayvan ilan sitesi. Next.js 15 (App Router) + Supabase. Arayüz dili Türkçe.

## Yayın durumu
- Kod GitHub'da: sbnkks26-commits/merapazar (main).
- Henüz yayında değil. Planlanan kurulum:
  1. Supabase connector ile yeni proje (bölge: eu-central-1 Frankfurt), `supabase/schema.sql` çalıştırılır.
  2. Auth: Email OTP açık; Magic Link şablonuna `{{ .Token }}` eklenir; Site URL + `/auth/callback` redirect eklenir.
  3. Netlify connector ile depo yayınlanır (`netlify.toml` hazır). Ortam değişkenleri:
     NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SITE_URL.
  4. Yayın sonrası: bir test ilanı verilip silinir; KVKK sayfasındaki köşeli parantezli alanlar kullanıcının bilgileriyle doldurulur.

## Kurallar
- Örnek/sahte ilan eklenmez; site boş açılır.
- Telefon numarası `listings` tablosundan doğrudan okunamaz, yalnızca `ilan_telefon()` RPC ile (sütun yetkileri schema.sql'de). Yeni sütun eklerken `grant select (...)` listesini ve `lib/types.ts` içindeki `LISTING_COLS`'u güncelleyin.
- Doğrulama: `npm run build` hatasız geçmeli.
