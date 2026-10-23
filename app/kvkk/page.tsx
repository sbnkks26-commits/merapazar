import type { Metadata } from "next";
export const metadata: Metadata = { title: "KVKK aydınlatma metni" };
/* DİKKAT: Yayına almadan önce köşeli parantezli alanları kendi bilgilerinizle doldurun ve metni bir hukukçuya kontrol ettirin. */
const VERI_SORUMLUSU = "[Ad Soyad / Şirket Unvanı]";
const ADRES = "[Açık adres]";
const EPOSTA = "[iletisim@alanadiniz.com]";
export default function Page() {
  return (
    <div className="wrap section"><div className="prose">
      <h1 style={{ fontSize: 30 }}>Kişisel verilerin korunması aydınlatma metni</h1>
      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatıyla {VERI_SORUMLUSU} ("MeraPazar"), {ADRES} adresinde, kişisel verilerinizi aşağıda açıklanan şekilde işler.</p>
      <h2>İşlenen veriler</h2>
      <ul>
        <li>Kimlik ve iletişim: ilanda girdiğiniz ad soyad veya işletme adı, cep telefonu, e-posta adresi.</li>
        <li>İlan bilgileri: hayvan bilgileri, fotoğraflar, il, ilçe, mahalle ve isteğe bağlı konum.</li>
        <li>İşlem güvenliği: giriş kayıtları, IP adresi ve tarayıcı bilgileri.</li>
      </ul>
      <h2>Amaçlar ve hukuki sebepler</h2>
      <p>Verileriniz; üyelik ve ilan hizmetinin sunulması (KVKK m.5/2-c, sözleşmenin ifası), alıcıların satıcıya ulaşabilmesi için telefon numarasının ilan sayfasında gösterilmesi (m.5/2-c ve açık rızanız), dolandırıcılığın önlenmesi ve hukuki yükümlülüklerin yerine getirilmesi (m.5/2-ç ve f) amaçlarıyla işlenir.</p>
      <h2>Aktarım</h2>
      <p>Veriler, barındırma ve veritabanı hizmeti aldığımız yurt dışındaki hizmet sağlayıcılara (Supabase, Vercel) KVKK m.9 kapsamında aktarılır. Talep halinde yetkili kamu kurumlarıyla paylaşılabilir.</p>
      <h2>Saklama süresi</h2>
      <p>İlan verileri ilan silinene kadar, hesap verileri hesap kapatılana kadar, işlem güvenliği kayıtları ilgili mevzuatta öngörülen süre boyunca saklanır.</p>
      <h2>Haklarınız</h2>
      <p>KVKK m.11 uyarınca verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve itiraz etme haklarına sahipsiniz. Başvurularınızı {EPOSTA} adresine iletebilirsiniz.</p>
    </div></div>
  );
}
