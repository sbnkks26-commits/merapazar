import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CARD_COLS, type CardListing } from "@/lib/types";
import { CATS, CAT_KEYS } from "@/lib/kategoriler";
import { ILCE_SAYISI, ILLER_ALFA } from "@/lib/iller";
import TurkeyMap from "@/components/TurkeyMap";
import { Card } from "@/components/ListingCards";
import { CatArt } from "@/components/Art";
import { ChevR, Doc, Eye, Shield, Tag } from "@/components/icons";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();
  const [ilR, turR, sonR] = await Promise.all([
    supabase.rpc("il_sayilari"),
    supabase.rpc("tur_sayilari"),
    supabase.from("listings").select(CARD_COLS).eq("durum", "yayinda").order("created_at", { ascending: false }).limit(8),
  ]);
  const counts: Record<string, number> = {};
  (ilR.data as { il: string; sayi: number }[] | null)?.forEach((r) => (counts[r.il] = Number(r.sayi)));
  const tc: Record<string, number> = {};
  (turR.data as { cat: string; tur: string; sayi: number }[] | null)?.forEach((r) => {
    tc[r.cat] = (tc[r.cat] || 0) + Number(r.sayi);
    tc[r.cat + "|" + r.tur] = Number(r.sayi);
  });
  const son = (sonR.data || []) as unknown as CardListing[];
  const toplam = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <section className="hero"><div className="wrap">
        <div>
          <div className="eyebrow">81 il · {ILCE_SAYISI} ilçe · Ücretsiz ilan</div>
          <h1>Hayvanınızı <em>doğru alıcıyla</em> buluşturun.</h1>
          <p className="lead">Büyükbaş, küçükbaş ve kümes hayvanları için Türkiye'nin her köşesinden ilan. Küpe numarası, gebelik, süt verimi ve konum bilgisiyle; aracısız ve komisyonsuz.</p>
          <form className="hsearch" action="/ilanlar" role="search">
            <label className="sr" htmlFor="heroQ">Ne arıyorsunuz?</label>
            <input id="heroQ" name="q" placeholder="Ne arıyorsunuz? Örn. gebe düve" autoComplete="off" />
            <label className="sr" htmlFor="heroIl">İl</label>
            <select id="heroIl" name="il" defaultValue="">
              <option value="">Tüm Türkiye</option>
              {ILLER_ALFA.map((i) => <option key={i.plaka} value={i.ad}>{i.plaka} {i.ad}</option>)}
            </select>
            <button className="btn btn-accent" type="submit">İlanları Bul</button>
          </form>
          <div className="chips">
            <Link className="chip" href="/ilanlar?kurbanlik=1">Kurbanlık</Link>
            <Link className="chip" href="/ilanlar?cat=buyukbas&gebe=1">Gebe düve & inek</Link>
            <Link className="chip" href={`/ilanlar?cat=buyukbas&tur=${encodeURIComponent("İnek")}`}>Süt ineği</Link>
            <Link className="chip" href="/ilanlar?cat=kucukbas&tur=Kuzu">Kuzu</Link>
            <Link className="chip" href={`/ilanlar?cat=kumes&tur=${encodeURIComponent("Yumurtacı Tavuk")}`}>Yumurtacı tavuk</Link>
          </div>
          <div className="stats">
            <div><b className="num">{toplam.toLocaleString("tr-TR")}</b><span>aktif ilan</span></div>
            <div><b className="num">{Object.keys(counts).length}</b><span>ilde ilan var</span></div>
            <div><b className="num">0 ₺</b><span>ilan ücreti</span></div>
          </div>
        </div>
        <TurkeyMap counts={counts} />
      </div></section>

      <section className="section"><div className="wrap">
        <div className="sec-head"><div><h2>Kategoriler</h2><p>Türe ve ırka göre ayrılmış ilanlar</p></div></div>
        <div className="cats">
          {CAT_KEYS.map((k) => (
            <div className="cat" key={k}>
              <Link className="art" href={`/ilanlar?cat=${k}`} aria-label={`${CATS[k].ad} ilanları`}><CatArt cat={k} /></Link>
              <div className="body">
                <h3>{CATS[k].ad}<span className="num">{tc[k] || 0} ilan</span></h3>
                <div className="sublist">
                  {CATS[k].turler.map((t) => (
                    <Link key={t} className="sub" href={`/ilanlar?cat=${k}&tur=${encodeURIComponent(t)}`}>{t}<i className="num">{tc[k + "|" + t] || 0}</i></Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head">
          <div><h2>Son eklenen ilanlar</h2><p>Türkiye genelinde en yeni ilanlar</p></div>
          <Link className="btn btn-ghost btn-sm" href="/ilanlar">Tüm ilanlar <ChevR /></Link>
        </div>
        {son.length ? (
          <div className="grid">{son.map((l) => <Card key={l.id} l={l} />)}</div>
        ) : (
          <div className="empty">
            <h3>İlk ilanı siz verin</h3>
            <p>MeraPazar yeni açıldı. Satılık hayvanınızı birkaç dakikada, ücretsiz olarak ilana koyun; ilanınız bu sayfada ilk sırada görünsün.</p>
            <Link className="btn btn-accent btn-sm" href="/ilan-ver" style={{ marginTop: 10 }}>Ücretsiz ilan ver</Link>
          </div>
        )}
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head"><div><h2>Güvenli alışveriş</h2><p>Canlı hayvan alırken bu dört kurala uyun</p></div></div>
        <div className="trust">
          <div><Eye /><b>Görmeden ödeme yapmayın</b><p>Hayvanı yerinde görün. Kapora ya da "nakliye ücreti" için önceden para göndermeyin.</p></div>
          <div><Tag /><b>Küpe ve pasaportu eşleştirin</b><p>Büyükbaşta kulak küpe numarası hayvan pasaportu ile aynı olmalı; devir işlemi il/ilçe tarım müdürlüğünde yapılır.</p></div>
          <div><Doc /><b>Sağlık durumunu sorun</b><p>Şap, brusella ve şarbon aşı kayıtlarını isteyin. Gerekirse veteriner hekim muayenesi yaptırın.</p></div>
          <div><Shield /><b>Nakliyeyi belgeli yapın</b><p>İl dışı sevklerde veteriner sağlık raporu gerekir. Raporsuz taşımada hayvana el konulabilir.</p></div>
        </div>
      </div></section>
    </>
  );
}
