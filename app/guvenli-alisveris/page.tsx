import type { Metadata } from "next";
export const metadata: Metadata = { title: "Güvenli alışveriş rehberi", description: "Canlı hayvan alırken dolandırıcılıktan korunma, küpe ve pasaport kontrolü, nakil belgeleri." };
export default function Page() {
  return (
    <div className="wrap section"><div className="prose">
      <h1 style={{ fontSize: 30 }}>Güvenli alışveriş rehberi</h1>
      <p>MeraPazar alıcı ile satıcıyı buluşturur; ödeme almaz ve alım satıma aracılık etmez. Aşağıdaki kurallar sizi dolandırıcılığa ve sağlık riskine karşı korur.</p>
      <h2>Ödeme</h2>
      <ul>
        <li>Hayvanı görmeden kapora, "nakliye ücreti" veya "sigorta bedeli" göndermeyin. Bu, en sık görülen dolandırıcılık yöntemidir.</li>
        <li>Piyasanın çok altındaki fiyatlara şüpheyle yaklaşın.</li>
        <li>Ödemeyi hayvanı teslim alırken yapın; mümkünse banka havalesiyle ve açıklamaya küpe numarasını yazarak.</li>
      </ul>
      <h2>Büyükbaşta küpe ve pasaport</h2>
      <ul>
        <li>Kulaktaki küpe numarası hayvan pasaportundaki numara ile aynı olmalıdır.</li>
        <li>Mülkiyet devri il veya ilçe tarım ve orman müdürlüğünde yapılır. Devri yapılmayan hayvan kayıtlarda eski sahibinde görünür.</li>
        <li>Küçükbaşta da küpe ve işletme kaydı istenir; kayıtsız hayvan almayın.</li>
      </ul>
      <h2>Sağlık</h2>
      <ul>
        <li>Şap, brusella, şarbon ve çiçek aşı kayıtlarını isteyin.</li>
        <li>Gebe hayvanda tohumlama belgesi ve tarihini sorun; gerekirse veteriner hekime muayene ettirin.</li>
        <li>Kümes hayvanlarında Newcastle, Gumboro ve IB aşılarını sorun.</li>
      </ul>
      <h2>Nakil</h2>
      <ul>
        <li>İl dışına sevkte veteriner sağlık raporu zorunludur. Raporsuz taşınan hayvana el konulabilir ve ceza kesilebilir.</li>
        <li>Taşımayı hayvan taşımaya uygun araçla yapın.</li>
      </ul>
      <h2>Şüpheli ilan</h2>
      <p>Şüpheli bir ilanla karşılaşırsanız ilan sayfasındaki "Bu ilanı şikâyet et" düğmesini kullanın. Dolandırıldığınızı düşünüyorsanız en yakın karakola veya Cumhuriyet Başsavcılığına başvurun.</p>
    </div></div>
  );
}
