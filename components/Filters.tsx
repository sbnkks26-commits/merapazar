"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { CATS, CAT_KEYS, SATICI_TIP, type CatKey } from "@/lib/kategoriler";
import { IL_BY, ILLER_ALFA } from "@/lib/iller";
import { tl } from "@/lib/format";
import { Filter } from "./icons";

export type F = { q: string; cat: CatKey | ""; tur: string; irk: string; il: string; ilce: string; min: string; max: string; satici: string; kurbanlik: boolean; gebe: boolean; kupe: boolean; nakliye: boolean; foto: boolean; sort: string };
const BOOL: [keyof F, string][] = [["kurbanlik", "Kurbanlık"], ["gebe", "Gebe"], ["kupe", "Küpe numarası girilmiş"], ["nakliye", "Nakliye imkânı"], ["foto", "Fotoğraflı"]];

function toUrl(f: F) {
  const u = new URLSearchParams();
  (Object.keys(f) as (keyof F)[]).forEach((k) => {
    const v = f[k];
    if (typeof v === "boolean") { if (v) u.set(k, "1"); }
    else if (v && !(k === "sort" && v === "yeni")) u.set(k, v);
  });
  return "/ilanlar" + (u.size ? "?" + u : "");
}

export default function Filters({ f: init, total }: { f: F; total: number }) {
  const router = useRouter();
  const [f, setF] = useState<F>(init);
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  useEffect(() => setF(init), [init]);
  const apply = (n: F) => { setF(n); start(() => router.push(toUrl(n), { scroll: false })); };
  const set = (patch: Partial<F>) => apply({ ...f, ...patch });
  const [price, setPrice] = useState({ min: init.min, max: init.max });
  useEffect(() => setPrice({ min: init.min, max: init.max }), [init.min, init.max]);
  useEffect(() => {
    if (price.min === f.min && price.max === f.max) return;
    const t = setTimeout(() => set(price), 500);
    return () => clearTimeout(t);
  });
  const c = f.cat ? CATS[f.cat] : null, il = f.il ? IL_BY[f.il] : null;
  useEffect(() => { const o = () => setOpen(true); window.addEventListener("openfilters", o); return () => window.removeEventListener("openfilters", o); }, []);
  return (
    <>
      <aside className={"filters" + (open ? " open" : "")} aria-label="Filtreler" style={pending ? { opacity: 0.85 } : undefined}>
        <div className="fclose"><h3>Filtrele</h3><button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Kapat</button></div>
        <div className="fgroup"><span className="lbl">Kategori</span>
          <div className="seg">
            <button aria-pressed={!f.cat} onClick={() => set({ cat: "", tur: "", irk: "" })}>Tümü</button>
            {CAT_KEYS.map((k) => <button key={k} aria-pressed={f.cat === k} onClick={() => set({ cat: k, tur: "", irk: "" })}>{CATS[k].kisa}</button>)}
          </div>
        </div>
        {c && <>
          <div className="field"><label htmlFor="fTur">Tür</label>
            <select className="inp" id="fTur" value={f.tur} onChange={(e) => set({ tur: e.target.value, irk: "" })}>
              <option value="">Tümü</option>{c.turler.map((t) => <option key={t}>{t}</option>)}
            </select></div>
          <div className="field"><label htmlFor="fIrk">Irk</label>
            <select className="inp" id="fIrk" value={f.irk} onChange={(e) => set({ irk: e.target.value })}>
              <option value="">Tümü</option>{c.irk(f.tur).map((t) => <option key={t}>{t}</option>)}
            </select></div>
        </>}
        <div className="field"><label htmlFor="fIl">İl</label>
          <select className="inp" id="fIl" value={f.il} onChange={(e) => set({ il: e.target.value, ilce: "" })}>
            <option value="">Tüm Türkiye</option>{ILLER_ALFA.map((i) => <option key={i.plaka} value={i.ad}>{i.plaka} {i.ad}</option>)}
          </select></div>
        {il && <div className="field"><label htmlFor="fIlce">İlçe</label>
          <select className="inp" id="fIlce" value={f.ilce} onChange={(e) => set({ ilce: e.target.value })}>
            <option value="">Tüm ilçeler</option>{il.ilceler.map((t) => <option key={t}>{t}</option>)}
          </select></div>}
        <div className="fgroup"><span className="lbl">Fiyat (₺)</span>
          <div className="row2">
            <input className="inp num" id="fMin" inputMode="numeric" placeholder="En az" aria-label="En az fiyat" value={price.min} onChange={(e) => setPrice({ ...price, min: e.target.value.replace(/\D/g, "") })} />
            <input className="inp num" id="fMax" inputMode="numeric" placeholder="En çok" aria-label="En çok fiyat" value={price.max} onChange={(e) => setPrice({ ...price, max: e.target.value.replace(/\D/g, "") })} />
          </div></div>
        <div className="field"><label htmlFor="fSat">Satıcı</label>
          <select className="inp" id="fSat" value={f.satici} onChange={(e) => set({ satici: e.target.value })}>
            <option value="">Tümü</option>{SATICI_TIP.map((t) => <option key={t}>{t}</option>)}
          </select></div>
        <div className="fgroup"><span className="lbl">Özellikler</span>
          {BOOL.map(([k, l]) => (
            <label className="check" key={k}><input type="checkbox" id={"f_" + k} checked={!!f[k]} onChange={(e) => set({ [k]: e.target.checked } as Partial<F>)} /> {l}</label>
          ))}
        </div>
        <div className="field"><label htmlFor="sortSel">Sıralama</label>
          <select className="inp" id="sortSel" value={f.sort} onChange={(e) => set({ sort: e.target.value })}>
            <option value="yeni">En yeni</option><option value="ucuz">Fiyat: düşükten yükseğe</option><option value="pahali">Fiyat: yüksekten düşüğe</option><option value="eski">En eski</option>
          </select></div>
        <button className="btn btn-ghost btn-sm" onClick={() => apply({ q: "", cat: "", tur: "", irk: "", il: "", ilce: "", min: "", max: "", satici: "", kurbanlik: false, gebe: false, kupe: false, nakliye: false, foto: false, sort: "yeni" })}>Filtreleri temizle</button>
        <div className="fapply"><button className="btn btn-brand btn-block" onClick={() => setOpen(false)}>{pending ? "Yükleniyor…" : `${total.toLocaleString("tr-TR")} sonucu göster`}</button></div>
      </aside>
    </>
  );
}

export function FilterBar({ f }: { f: F }) {
  const router = useRouter();
  const set = (p: Partial<F>) => router.push(toUrl({ ...f, ...p }), { scroll: false });
  const active: [Partial<F>, string][] = [];
  if (f.q) active.push([{ q: "" }, `"${f.q}"`]);
  if (f.il) active.push([{ il: "", ilce: "" }, f.il]);
  if (f.ilce) active.push([{ ilce: "" }, f.ilce]);
  if (f.irk) active.push([{ irk: "" }, f.irk]);
  BOOL.forEach(([k, l]) => { if (f[k]) active.push([{ [k]: false } as Partial<F>, l]); });
  if (f.min || f.max) active.push([{ min: "", max: "" }, `${f.min ? tl(+f.min) : "0"} – ${f.max ? tl(+f.max) : "∞"}`]);
  if (f.satici) active.push([{ satici: "" }, f.satici]);
  return (
    <div className="activef">
      <button className="btn btn-ghost btn-sm mfbtn" style={{ borderRadius: 20 }} onClick={() => window.dispatchEvent(new Event("openfilters"))}><Filter /> Filtrele{active.length ? ` (${active.length})` : ""}</button>
      {active.map(([p, l], i) => <button key={i} onClick={() => set(p)}>{l} ✕</button>)}
    </div>
  );
}
