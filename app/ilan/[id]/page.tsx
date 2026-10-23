import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LISTING_COLS, type Listing } from "@/lib/types";
import { CATS } from "@/lib/kategoriler";
import { IL_BY } from "@/lib/iller";
import { fotoUrl, ilanNo, once, siteUrl, tarih, tl, yasStr } from "@/lib/format";
import { Price } from "@/components/ListingCards";
import FavButton from "@/components/FavButton";
import Gallery from "@/components/Gallery";
import { ContactBox, CopyNo, ReportButton } from "@/components/DetailClient";
import { Pin } from "@/components/icons";

type P = { params: Promise<{ id: string }>; searchParams?: Promise<Record<string, string | string[] | undefined>> };

async function load(idStr: string) {
  const id = parseInt(idStr);
  if (!Number.isFinite(id) || id < 1) return null;
  const supabase = await createClient();
  const [{ data }, { data: u }] = await Promise.all([
    supabase.from("listings").select(LISTING_COLS).eq("id", id).maybeSingle(),
    supabase.auth.getUser(),
  ]);
  return data ? { l: data as unknown as Listing, uid: u.user?.id || null } : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await load((await params).id);
  if (!r) return { title: "İlan bulunamadı" };
  const { l } = r;
  const desc = `${l.il}/${l.ilce} · ${tl(l.fiyat)} · ${l.tur}${l.irk ? " · " + l.irk : ""}. ${(l.aciklama || "").slice(0, 120)}`;
  return {
    title: `${l.baslik} - ${l.il} ${l.ilce}`,
    description: desc,
    alternates: { canonical: `${siteUrl()}/ilan/${l.id}` },
    openGraph: { title: l.baslik, description: desc, images: l.fotolar[0] ? [fotoUrl(l.fotolar[0])] : undefined },
  };
}

export default async function Detay({ params, searchParams }: P) {
  const r = await load((await params).id);
  const sp = (await searchParams) || {};
  if (!r) notFound();
  const { l, uid } = r;
  const own = uid === l.user_id;
  const il = IL_BY[l.il];
  const perKg = l.kilo && l.fiyat ? (l.fiyat_tip === "bas" || l.adet <= 1 ? l.fiyat / l.kilo : l.fiyat / (l.kilo * l.adet)) : 0;
  const yn = (v: boolean) => (v ? <dd className="yes">Evet</dd> : <dd>Hayır</dd>);
  const rows: [string, React.ReactNode][] = [
    ["İlan No", <dd className="num">{ilanNo(l.id)}</dd>], ["İlan Tarihi", <dd>{tarih(l.created_at)}</dd>],
    ["Kategori", <dd>{CATS[l.cat].ad}</dd>], ["Tür", <dd>{l.tur}</dd>], ["Irk", <dd>{l.irk || "-"}</dd>],
    ["Cinsiyet", <dd>{l.cinsiyet || "-"}</dd>], ["Yaş", <dd>{yasStr(l) || "-"}</dd>], ["Adet", <dd className="num">{l.adet} baş</dd>],
  ];
  if (l.kilo) rows.push(["Canlı ağırlık", <dd className="num">{l.kilo} kg{l.adet > 1 ? " (ort.)" : ""}</dd>]);
  if (l.cat !== "kumes") rows.push(["Gebelik", l.gebe ? <dd className="yes">{l.gebe}</dd> : <dd>-</dd>]);
  if (l.sut) rows.push(["Süt verimi", <dd className="num">{l.sut} lt / gün</dd>]);
  if (l.cat !== "kumes") rows.push(["Kulak küpe no", <dd className="num">{l.kupe || "-"}</dd>]);
  rows.push(["Aşıları yapıldı", yn(l.asili)], ["Sağlık raporu", yn(l.rapor)], ["Kurbanlık", yn(l.kurbanlik)], ["Pazarlık payı", yn(l.pazarlik)], ["Takas", yn(l.takas)], ["Nakliye imkânı", yn(l.nakliye)]);
  const q = encodeURIComponent([l.mahalle, l.ilce, l.il, "Türkiye"].filter(Boolean).join(", "));
  const k = (l.konum || "").trim();
  const mapUrl = /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google\.)/.test(k) ? k
    : /^-?\d{1,2}(\.\d+)?\s*,\s*-?\d{1,3}(\.\d+)?$/.test(k) ? `https://www.google.com/maps?q=${encodeURIComponent(k)}`
    : `https://www.google.com/maps/search/?api=1&query=${q}`;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: l.baslik, description: l.aciklama || l.baslik,
    image: l.fotolar.map(fotoUrl), offers: { "@type": "Offer", priceCurrency: "TRY", price: l.fiyat, availability: l.durum === "yayinda" ? "https://schema.org/InStock" : "https://schema.org/SoldOut" },
  };

  return (
    <div className="wrap"><div className="detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div style={{ minWidth: 0 }}>
        {(sp.yeni || sp.guncellendi) && own && <div className="okmsg" role="status" style={{ marginBottom: 12 }}>{sp.yeni ? "İlanınız yayında. Herkes bu sayfayı görebilir." : "Değişiklikler kaydedildi."}</div>}
        <div className="crumbs" style={{ marginBottom: 8 }}>
          <Link href="/ilanlar">İlanlar</Link>›<Link href={`/ilanlar?cat=${l.cat}`}>{CATS[l.cat].ad}</Link>›<Link href={`/ilanlar?cat=${l.cat}&tur=${encodeURIComponent(l.tur)}`}>{l.tur}</Link>
        </div>
        <div className="dtitle">
          <h1>{l.baslik}</h1>
          <div className="meta"><Pin /><span>{il && <span className="plate">{il.plaka}</span>}{l.il} / {l.ilce}{l.mahalle ? " / " + l.mahalle : ""}</span><span>· {once(l.created_at)}</span>
            {l.durum === "satildi" && <span className="bdg sold">Satıldı</span>}{l.durum === "kaldirildi" && <span className="bdg sold">Yayında değil</span>}</div>
        </div>
        <Gallery l={{ id: l.id, cat: l.cat, tur: l.tur, irk: l.irk, baslik: l.baslik }} fotolar={l.fotolar.map(fotoUrl)} />
        <div className="panel" style={{ marginTop: 14 }}><h2>İlan bilgileri</h2>
          <dl className="dl">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt>{v}</div>)}</dl></div>
        <div className="panel" style={{ marginTop: 14 }}><h2>Açıklama</h2><div className="desc">{l.aciklama || "Açıklama girilmemiş."}</div></div>
        <div className="panel" style={{ marginTop: 14 }}><h2>Konum</h2>
          <div className="locbox"><div className="pin"><Pin size={22} /></div><div style={{ minWidth: 0 }}>
            <b>{l.il} / {l.ilce}</b>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>{l.mahalle ? l.mahalle + " · " : ""}{il ? `Plaka ${il.plaka}` : ""}</div>
            <a className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} href={mapUrl} target="_blank" rel="noopener noreferrer nofollow">Haritada aç ↗</a>
          </div></div></div>
      </div>
      <aside className="side">
        <div className="panel pricebox">
          <span className="price num"><Price l={l} /></span>
          {l.adet > 1 && l.fiyat_tip === "bas" && <span className="sub2 num">{l.adet} baş toplam: {tl(l.fiyat * l.adet)}</span>}
          {l.adet > 1 && l.fiyat_tip === "toplam" && <span className="sub2 num">Baş başına: {tl(l.fiyat / l.adet)}</span>}
          {perKg > 0 && l.cat !== "kumes" && <span className="sub2 num">Canlı kilo fiyatı ≈ {tl(perKg)} / kg</span>}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}><FavButton id={l.id} inline /><CopyNo no={ilanNo(l.id)} /></div>
        </div>
        <div className="panel stack">
          <div className="seller"><div className="avatar">{l.satici_ad.trim().charAt(0).toLocaleUpperCase("tr")}</div><div><b>{l.satici_ad}</b><span>{l.satici_tip}</span></div></div>
          {l.durum === "yayinda" || own ? <ContactBox id={l.id} baslik={l.baslik} whatsapp={l.whatsapp} /> : <div className="note">Bu hayvan satıldı; iletişim bilgisi gizlendi.</div>}
          {own && <Link className="btn btn-ghost btn-block" href={`/ilan/${l.id}/duzenle`}>İlanı düzenle</Link>}
        </div>
        <div className="safety"><b>Satın almadan önce</b><ul><li>Hayvanı görmeden kapora göndermeyin.</li><li>Küpe numarasını pasaportla karşılaştırın.</li><li>İl dışı nakil için veteriner sağlık raporu isteyin.</li></ul></div>
        {!own && <ReportButton id={l.id} loggedIn={!!uid} />}
      </aside>
    </div></div>
  );
}
