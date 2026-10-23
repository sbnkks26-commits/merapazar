import type { Metadata } from "next";
export const metadata: Metadata = { title: "İlan verme kuralları" };
export default function Page() {
  return (
    <div className="wrap section"><div className="prose">
      <h1 style={{ fontSize: 30 }}>İlan verme kuralları</h1>
      <ul>
        <li>İlan yalnızca size ait ya da satma yetkiniz olan canlı hayvan için verilir.</li>
        <li>Başlık, fiyat, ırk, yaş ve sağlık bilgileri doğru olmalıdır. Fotoğraflar ilandaki hayvana ait olmalıdır.</li>
        <li>Her hayvan veya sürü için tek ilan verin. Aynı ilanı tekrar tekrar yayınlamayın; bir kullanıcı günde en fazla 20 ilan verebilir.</li>
        <li>Yaban hayatı türleri, koruma altındaki hayvanlar ve satışı yasak olan türler için ilan verilemez.</li>
        <li>Hasta, karantinadaki veya kayıtsız (küpesiz) büyükbaş hayvanlar için ilan verilemez.</li>
        <li>İlanda IBAN, kimlik numarası veya başka kişilerin bilgileri paylaşılamaz.</li>
        <li>Hayvan satıldığında ilanı "Satıldı" olarak işaretleyin ya da silin.</li>
        <li>Kurallara aykırı ilanlar uyarı yapılmadan kaldırılabilir, tekrarlayan ihlallerde hesap kapatılabilir.</li>
      </ul>
    </div></div>
  );
}
