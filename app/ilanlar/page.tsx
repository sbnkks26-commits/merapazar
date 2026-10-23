import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CARD_COLS, type CardListing } from "@/lib/types";
import { CATS, isCat } from "@/lib/kategoriler";
import { IL_BY } from "@/lib/iller";
import { Row } from "@/components/ListingCards";
import Filters, { FilterBar, type F } from "@/components/Filters";

const PER = 24;
type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

function parse(sp: SP): F {
  const cat = one(sp.cat);
  const il = one(sp.il);
  return {
    q: one(sp.q).slice(0, 80), cat: isCat(cat) ? cat : "", tur: one(sp.tur), irk: one(sp.irk),
    il: IL_BY[il] ? il : "", ilce: one(sp.ilce), min: one(sp.min).replace(/\D/g, ""), max: one(sp.max).replace(/\D/g, ""),
    satici: one(sp.satici), kurbanlik: one(sp.kurbanlik) === "1", gebe: one(sp.gebe) === "1", kupe: one(sp.kupe) === "1",
    nakliye: one(sp.nakliye) === "1", foto: one(sp.foto) === "1", sort: one(sp.sort) || "yeni",
  };
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const f = parse(await searchParams);
  const ne = f.tur || (f.cat ? CATS[f.cat].ad : "Hayvan");
  const yer = f.ilce ? `${f.il} ${f.ilce}` : f.il || "Türkiye";
  return { title: `${yer} satılık ${ne.toLocaleLowerCase("tr")} ilanları`, description: `${yer} genelinde satılık ${ne.toLocaleLowerCase("tr")} ilanları. Fiyat, ırk, yaş ve konuma göre filtreleyin.` };
}

export default async function Ilanlar({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const f = parse(sp);
  const page = Math.max(1, parseInt(one(sp.sayfa)) || 1);
  const supabase = await createClient();
  let q = supabase.from("listings").select(CARD_COLS, { count: "exact" }).eq("durum", "yayinda");
  if (f.cat) q = q.eq("cat", f.cat);
  if (f.tur) q = q.eq("tur", f.tur);
  if (f.irk) q = q.eq("irk", f.irk);
  if (f.il) q = q.eq("il", f.il);
  if (f.ilce) q = q.eq("ilce", f.ilce);
  if (f.min) q = q.gte("fiyat", +f.min);
  if (f.max) q = q.lte("fiyat", +f.max);
  if (f.satici) q = q.eq("satici_tip", f.satici);
  if (f.kurbanlik) q = q.eq("kurbanlik", true);
  if (f.gebe) q = q.not("gebe", "is", null).neq("gebe", "");
  if (f.kupe) q = q.not("kupe", "is", null).neq("kupe", "");
  if (f.nakliye) q = q.eq("nakliye", true);
  if (f.foto) q = q.neq("fotolar", "{}");
  for (const w of f.q.split(/\s+/).map((w) => w.replace(/[^\p{L}\p{N}-]/gu, "")).filter((w) => w.length > 1).slice(0, 5)) {
    q = q.or(["baslik", "tur", "irk", "aciklama", "il", "ilce"].map((c) => `${c}.ilike.%${w}%`).join(","));
  }
  const order = { yeni: ["created_at", false], eski: ["created_at", true], ucuz: ["fiyat", true], pahali: ["fiyat", false] }[f.sort] as [string, boolean] || ["created_at", false];
  q = q.order(order[0], { ascending: order[1] }).range((page - 1) * PER, page * PER - 1);
  const { data, count, error } = await q;
  const rows = (data || []) as unknown as CardListing[];
  const total = count || 0;
  const pages = Math.ceil(total / PER);
  const ttl = f.tur || (f.cat ? CATS[f.cat].ad : "Tüm ilanlar");
  const link = (p: number) => { const u = new URLSearchParams(); Object.entries(sp).forEach(([k, v]) => { const s = one(v); if (s && k !== "sayfa") u.set(k, s); }); if (p > 1) u.set("sayfa", String(p)); return "/ilanlar" + (u.size ? "?" + u : ""); };

  return (
    <div className="wrap listing-layout">
      <Filters f={f} total={total} />
      <section style={{ minWidth: 0 }}>
        <div className="results-head">
          <div>
            <div className="crumbs"><Link href="/">Ana Sayfa</Link>›<Link href="/ilanlar">Hayvanlar</Link>{f.cat && <>›<Link href={`/ilanlar?cat=${f.cat}`}>{CATS[f.cat].ad}</Link></>}{f.il && <>› <span>{f.il}</span></>}</div>
            <h1>{ttl} <span className="num" style={{ fontSize: 15, color: "var(--muted)", fontFamily: "var(--f-body)", fontWeight: 500 }}>{total.toLocaleString("tr-TR")} ilan</span></h1>
          </div>
        </div>
        <FilterBar f={f} />
        {error ? (
          <div className="empty"><h3>İlanlar şu an yüklenemedi</h3><p>Birkaç saniye sonra sayfayı yenileyin.</p></div>
        ) : rows.length ? (
          <>
            <div className="rows">{rows.map((l) => <Row key={l.id} l={l} />)}</div>
            {pages > 1 && (
              <nav className="pager" aria-label="Sayfalar">
                {page > 1 && <Link className="btn btn-ghost btn-sm" href={link(page - 1)}>‹ Önceki</Link>}
                <span className="num" style={{ color: "var(--muted)", fontSize: 14 }}>Sayfa {page} / {pages}</span>
                {page < pages && <Link className="btn btn-ghost btn-sm" href={link(page + 1)}>Sonraki ›</Link>}
              </nav>
            )}
          </>
        ) : (
          <div className="empty">
            <h3>Bu aramaya uygun ilan yok</h3>
            <p>Filtreleri azaltın ya da komşu illere bakın. Aradığınız hayvanı satıyorsanız ilk ilanı siz verin.</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
              <Link className="btn btn-ghost btn-sm" href="/ilanlar">Filtreleri temizle</Link>
              <Link className="btn btn-accent btn-sm" href="/ilan-ver">İlan ver</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
