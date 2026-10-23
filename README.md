# MeraPazar

Türkiye geneli büyükbaş, küçükbaş ve kümes hayvanı ilan sitesi.
Next.js 15 + Supabase (veritabanı, e-posta kodu ile giriş, fotoğraf deposu). Vercel'de ücretsiz çalışır.

## Özellikler
- 81 il ve 973 ilçe, plaka numaralarıyla
- Kategori → tür → ırk ağacı (büyükbaş, küçükbaş, kümes)
- 4 adımlı ilan verme: hayvan bilgileri, en fazla 8 fotoğraf, il/ilçe/mahalle/konum, telefon
- Filtreler: il, ilçe, tür, ırk, fiyat, kurbanlık, gebe, küpeli, nakliye, fotoğraflı, satıcı türü
- İlan sayfası: bilgi tablosu, canlı kilo fiyatı, "Telefonu göster", WhatsApp, harita linki, şikâyet
- İlanlarım: düzenle, satıldı işaretle, sil · Favoriler (cihazda saklanır)
- Türkiye ilan haritası, SEO başlıkları, site haritası, Google ürün verisi
- Güvenlik: telefon numaraları toplu çekilemez, herkes yalnızca kendi ilanını değiştirebilir, kullanıcı başına günde 20 ilan sınırı

## Yayına alma (yaklaşık 20 dakika)

### 1. Supabase (veritabanı)
1. https://supabase.com adresinde ücretsiz hesap açın → **New project**. Bölge olarak **Frankfurt (eu-central-1)** seçin.
2. Sol menü **SQL Editor** → `supabase/schema.sql` dosyasının tamamını yapıştırıp **Run**.
3. **Authentication → Sign In / Providers → Email** açık olsun.
4. **Authentication → Email Templates → Magic Link** şablonuna 6 haneli kodu ekleyin, örneğin:
   `<p>MeraPazar giriş kodunuz: <b>{{ .Token }}</b></p><p>veya <a href="{{ .ConfirmationURL }}">buraya tıklayın</a>.</p>`
5. **Authentication → URL Configuration**: *Site URL* = sitenizin adresi (ör. `https://www.merapazar.com`), *Redirect URLs* listesine `https://www.merapazar.com/auth/callback` ekleyin.
6. **Project Settings → API**: `Project URL` ve `anon public` anahtarını not alın.

> Supabase'in kendi e-posta servisi saatte birkaç e-postayla sınırlıdır. Gerçek kullanımda **Authentication → SMTP Settings** bölümünden bir e-posta servisi bağlayın (Resend, Brevo, Amazon SES vb.).

### 2. GitHub
Bu klasörü GitHub'da yeni bir depoya yükleyin.

### 3. Vercel (barındırma)
1. https://vercel.com → GitHub ile giriş → **Add New → Project** → depoyu seçin.
2. **Environment Variables** bölümüne ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public anahtarı
   - `NEXT_PUBLIC_SITE_URL` = sitenizin adresi
3. **Deploy**. Birkaç dakika sonra site `xxx.vercel.app` adresinde açılır.

### 4. Alan adı
Vercel → Project → **Settings → Domains** bölümüne alan adınızı ekleyin (ör. merapazar.com.tr) ve alan adı firmanızdaki DNS kayıtlarını Vercel'in gösterdiği gibi girin. Ardından Supabase'deki Site URL ve `NEXT_PUBLIC_SITE_URL` değerini yeni adresle güncelleyin.

### 5. Yayın öncesi kontrol listesi
- [x] KVKK veri sorumlusu bilgileri dolduruldu (`app/kvkk/page.tsx`). Metni bir hukukçuya kontrol ettirin.
- [ ] SMTP ayarını yapın.
- [ ] Kendi hesabınızla bir ilan verip telefon, WhatsApp, düzenleme ve silmeyi deneyin.
- [ ] Şikâyetleri Supabase → **Table Editor → reports** tablosundan takip edin; uygunsuz ilanı aynı yerden `listings` tablosunda `durum` alanını `kaldirildi` yaparak yayından kaldırın.

## Yerelde çalıştırma
```bash
cp .env.example .env.local   # değerleri doldurun
npm install
npm run dev                  # http://localhost:3000
```

## Klasörler
- `app/` sayfalar (ana sayfa, ilanlar, ilan detayı, ilan ver, hesabım, giriş, bilgi sayfaları)
- `components/` arayüz parçaları (ilan formu, filtreler, harita, kartlar)
- `lib/` il/ilçe verisi, kategoriler, çizimler, Supabase bağlantısı
- `supabase/schema.sql` tablolar, güvenlik kuralları, fotoğraf deposu
