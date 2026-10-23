"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { CATS, CAT_KEYS, SATICI_TIP, type CatKey } from "@/lib/kategoriler";
import { IL_BY, ILLER_ALFA } from "@/lib/iller";
import { fmtTel, fotoUrl, telDigits } from "@/lib/format";
import { CatArt } from "./Art";
import { Camera, ChevL, ChevR, Shield } from "./icons";

export type Draft = {
  cat: CatKey | ""; tur: string; irk: string; baslik: string; aciklama: string; fiyat: string; fiyat_tip: "bas" | "toplam";
  adet: string; yas: string; yas_birim: "gün" | "hafta" | "ay"; cinsiyet: string; kilo: string; gebe: string; sut: string; kupe: string;
  asili: boolean; rapor: boolean; kurbanlik: boolean; pazarlik: boolean; takas: boolean; nakliye: boolean;
  il: string; ilce: string; mahalle: string; konum: string; satici_ad: string; tel: string; satici_tip: string; whatsapp: boolean; fotolar: string[];
};
export const blankDraft = (): Draft => ({
  cat: "", tur: "", irk: "", baslik: "", aciklama: "", fiyat: "", fiyat_tip: "bas", adet: "1", yas: "", yas_birim: "ay", cinsiyet: "Dişi",
  kilo: "", gebe: "", sut: "", kupe: "", asili: false, rapor: false, kurbanlik: false, pazarlik: true, takas: false, nakliye: false,
  il: "", ilce: "", mahalle: "", konum: "", satici_ad: "", tel: "", satici_tip: "Bireysel", whatsapp: true, fotolar: [],
});
const STEPS = ["Kategori", "Hayvan bilgileri", "Fotoğraf", "Konum & iletişim"];
const DKEY = "mp_draft";
type Errs = Record<string, string>;

function shrink(file: File, maxW: number, q: number): Promise<Blob> {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, maxW / Math.max(img.width, img.height)), c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => (b ? res(b) : rej(new Error("blob"))), "image/jpeg", q);
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("img")); };
    img.src = url;
  });
}

export default function PostForm({ userId, initial, editId }: { userId: string; initial?: Draft; editId?: number }) {
  const router = useRouter();
  const [d, setD] = useState<Draft>(initial || blankDraft());
  const [step, setStep] = useState(editId ? 1 : 0);
  const [errs, setErrs] = useState<Errs>({});
  const [busy, setBusy] = useState("");
  const [fail, setFail] = useState("");
  const loaded = useRef(!!editId);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    try { const v = JSON.parse(localStorage.getItem(DKEY) || "null"); if (v && typeof v === "object") setD({ ...blankDraft(), ...v }); } catch {}
  }, []);
  useEffect(() => { if (!editId && loaded.current) { try { localStorage.setItem(DKEY, JSON.stringify(d)); } catch {} } }, [d, editId]);

  const up = (p: Partial<Draft>) => setD((x) => ({ ...x, ...p }));
  const c = d.cat ? CATS[d.cat] : null;
  const kum = d.cat === "kumes";

  function validate(st: number) {
    const e: Errs = {};
    if (st === 0) { if (!d.cat) e.cat = "Kategori seçin."; else if (!d.tur) e.tur = "Tür seçin."; }
    if (st === 1) {
      if (d.baslik.trim().length < 8) e.d_baslik = "Başlık en az 8 karakter olmalı.";
      const fi = +d.fiyat.replace(/\D/g, "");
      if (!fi) e.d_fiyat = "Fiyat girin."; else if (fi > 50000000) e.d_fiyat = "Fiyat çok yüksek görünüyor.";
      if (!(+d.adet >= 1)) e.d_adet = "Adet en az 1 olmalı.";
      if (d.kilo && !(+d.kilo.replace(",", ".") > 0)) e.d_kilo = "Geçerli bir kilo girin.";
    }
    if (st === 3) {
      if (!d.il) e.d_il = "İl seçin.";
      if (!d.ilce) e.d_ilce = "İlçe seçin.";
      if (d.satici_ad.trim().length < 2) e.d_satici_ad = "Adınızı yazın.";
      if (!/^5\d{9}$/.test(telDigits(d.tel))) e.d_tel = "05 ile başlayan 11 haneli cep numarası girin.";
    }
    setErrs(e);
    const first = Object.keys(e)[0];
    if (first) { const el = document.getElementById(first); el?.scrollIntoView({ block: "center", behavior: "smooth" }); (el as HTMLElement | null)?.focus?.({ preventScroll: true }); }
    return !first;
  }

  async function addPhotos(files: FileList | null) {
    if (!files) return;
    const supabase = createClient();
    let list = [...d.fotolar];
    for (const file of Array.from(files)) {
      if (list.length >= 8) { setFail("En fazla 8 fotoğraf ekleyebilirsiniz."); break; }
      if (!/^image\//.test(file.type)) { setFail("Yalnızca fotoğraf dosyası ekleyin."); continue; }
      setBusy(`Fotoğraf yükleniyor (${list.length + 1})…`);
      try {
        const blob = await shrink(file, 1600, 0.82);
        const path = `${userId}/${crypto.randomUUID()}.jpg`;
        const { error } = await supabase.storage.from("ilan-fotolari").upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
        if (error) throw error;
        list = [...list, path];
        setD((x) => ({ ...x, fotolar: list }));
      } catch { setFail("Fotoğraf yüklenemedi, tekrar deneyin."); }
    }
    setBusy("");
  }

  async function submit() {
    setBusy("Kaydediliyor…"); setFail("");
    const num = (v: string) => (v.trim() === "" ? null : +v.replace(",", "."));
    const row = {
      cat: d.cat, tur: d.tur, irk: d.irk || null, baslik: d.baslik.trim(), aciklama: d.aciklama.trim() || null,
      fiyat: +d.fiyat.replace(/\D/g, ""), fiyat_tip: d.fiyat_tip, adet: Math.max(1, parseInt(d.adet) || 1),
      yas: d.yas.trim() === "" ? null : parseInt(d.yas), yas_birim: d.yas_birim, cinsiyet: d.cinsiyet || null,
      kilo: num(d.kilo), gebe: kum ? null : d.gebe.trim() || null, sut: kum ? null : num(d.sut), kupe: kum ? null : d.kupe.trim() || null,
      asili: d.asili, rapor: d.rapor, kurbanlik: kum ? false : d.kurbanlik, pazarlik: d.pazarlik, takas: d.takas, nakliye: d.nakliye,
      il: d.il, ilce: d.ilce, mahalle: d.mahalle.trim() || null, konum: d.konum.trim() || null,
      satici_ad: d.satici_ad.trim(), satici_tip: d.satici_tip, tel: telDigits(d.tel), whatsapp: d.whatsapp, fotolar: d.fotolar,
    };
    const supabase = createClient();
    const res = editId
      ? await supabase.from("listings").update(row).eq("id", editId).select("id").single()
      : await supabase.from("listings").insert(row).select("id").single();
    if (res.error || !res.data) {
      setBusy("");
      const m = res.error?.message || "";
      setFail(/Günlük ilan sınırı/.test(m) ? "Günlük ilan sınırına ulaştınız (20). Yarın tekrar deneyin." : /JWT|auth/i.test(m) ? "Oturumunuzun süresi doldu. Tekrar giriş yapın." : "İlan kaydedilemedi. Bilgileri kontrol edip tekrar deneyin.");
      return;
    }
    if (!editId) { try { localStorage.removeItem(DKEY); } catch {} }
    router.push(`/ilan/${res.data.id}?${editId ? "guncellendi" : "yeni"}=1`);
    router.refresh();
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(step)) return;
    if (step < 3) { setStep(step + 1); window.scrollTo(0, 0); } else submit();
  };

  const Err = ({ k }: { k: string }) => (errs[k] ? <span className="err">{errs[k]}</span> : null);
  const inp = (k: keyof Draft, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input className={"inp" + (errs["d_" + k] ? " bad" : "")} id={"d_" + k} value={d[k] as string} onChange={(e) => up({ [k]: e.target.value } as Partial<Draft>)} {...props} />
  );
  const chk = (k: keyof Draft, label: string) => (
    <label className="check"><input type="checkbox" id={"d_" + k} checked={!!d[k]} onChange={(e) => up({ [k]: e.target.checked } as Partial<Draft>)} /> {label}</label>
  );
  const seg = (k: keyof Draft, opts: [string, string][]) => (
    <div className="seg">{opts.map(([v, l]) => <button type="button" key={v} aria-pressed={d[k] === v} onClick={() => up({ [k]: v } as Partial<Draft>)}>{l}</button>)}</div>
  );
  const il = d.il ? IL_BY[d.il] : null;

  return (
    <div className="post wrap">
      <div className="crumbs"><Link href="/">Ana Sayfa</Link>›<span>{editId ? "İlanı düzenle" : "Ücretsiz ilan ver"}</span></div>
      <h1 style={{ fontSize: 26, marginTop: 6 }}>{editId ? "İlanı düzenle" : "Ücretsiz ilan ver"}</h1>
      <div className="steps">{STEPS.map((s, i) => <div key={s} className={i <= step ? "on" : ""}>{i + 1}. {s}</div>)}</div>
      <form onSubmit={onSubmit} noValidate>
        <div className="panel fstack">
          {step === 0 && <>
            <div className="lbl">Hangi hayvanı satıyorsunuz?</div>
            <div className="bigpick" id="cat">
              {CAT_KEYS.map((k) => (
                <button type="button" key={k} aria-pressed={d.cat === k} onClick={() => up({ cat: k, tur: "", irk: "", yas_birim: CATS[k].yasBirim, kurbanlik: k === "kumes" ? false : d.kurbanlik })}>
                  <div className="art"><CatArt cat={k} /></div><b>{CATS[k].ad}</b>
                </button>
              ))}
            </div>
            <Err k="cat" />
            {c && <>
              <div className="fgroup" id="tur"><span className="lbl">Tür</span>
                <div className="seg">{c.turler.map((t) => <button type="button" key={t} aria-pressed={d.tur === t} onClick={() => up({ tur: t, irk: c.irk(t).includes(d.irk) ? d.irk : "" })}>{t}</button>)}</div>
                <Err k="tur" /></div>
              <div className="field"><label htmlFor="d_irk">Irk</label>
                <select className="inp" id="d_irk" value={d.irk} onChange={(e) => up({ irk: e.target.value })}>
                  <option value="">Seçin</option>{c.irk(d.tur).map((t) => <option key={t}>{t}</option>)}
                </select><span className="hint">Emin değilseniz "Melez" seçin.</span></div>
            </>}
          </>}

          {step === 1 && <div className="fgrid">
            <div className="field" style={{ gridColumn: "1/-1" }}><label htmlFor="d_baslik">İlan başlığı</label>
              {inp("baslik", { maxLength: 90, placeholder: kum ? "Örn. Gezen köy tavuğu, yumurtlamaya başladı" : d.cat === "kucukbas" ? "Örn. Kurbanlık Akkaraman koç, 2 dişli" : "Örn. Simental gebe düve, 6 aylık gebe" })}
              <span className="hint">Irk, yaş ve en önemli özelliği yazın.</span><Err k="d_baslik" /></div>
            <div className="field"><label htmlFor="d_fiyat">Fiyat (₺)</label>{inp("fiyat", { inputMode: "numeric", placeholder: "0", className: "inp num" + (errs.d_fiyat ? " bad" : "") })}<Err k="d_fiyat" /></div>
            <div className="field"><span className="lbl">Fiyat neye göre?</span>{seg("fiyat_tip", [["bas", "Baş başına"], ["toplam", "Toplam fiyat"]])}</div>
            <div className="field"><label htmlFor="d_adet">Adet (baş)</label>{inp("adet", { inputMode: "numeric", className: "inp num" })}<Err k="d_adet" /></div>
            <div className="field"><label htmlFor="d_yas">Yaş</label><div className="row2">{inp("yas", { inputMode: "numeric", placeholder: "0", className: "inp num" })}
              <select className="inp" id="d_yas_birim" aria-label="Yaş birimi" value={d.yas_birim} onChange={(e) => up({ yas_birim: e.target.value as Draft["yas_birim"] })}>{["gün", "hafta", "ay"].map((u) => <option key={u}>{u}</option>)}</select></div></div>
            <div className="field"><span className="lbl">Cinsiyet</span>{seg("cinsiyet", [["Dişi", "Dişi"], ["Erkek", "Erkek"], ["Karışık", "Karışık"]])}</div>
            <div className="field"><label htmlFor="d_kilo">Canlı ağırlık (kg)</label>{inp("kilo", { inputMode: "decimal", placeholder: "Ortalama", className: "inp num" })}<span className="hint">Alıcılar kilo fiyatını buna göre hesaplar.</span><Err k="d_kilo" /></div>
            {!kum && <div className="field"><label htmlFor="d_gebe">Gebelik</label>{inp("gebe", { maxLength: 40, placeholder: "Örn. 6 aylık (boş bırakılabilir)" })}</div>}
            {!kum && <div className="field"><label htmlFor="d_sut">Süt verimi (lt/gün)</label>{inp("sut", { inputMode: "decimal", placeholder: "Sağmal değilse boş bırakın", className: "inp num" })}</div>}
            {!kum && <div className="field"><label htmlFor="d_kupe">Kulak küpe numarası</label>{inp("kupe", { maxLength: 30, placeholder: "TR 0000000000", className: "inp num" })}<span className="hint">Küpe numarası alıcıya güven verir.</span></div>}
            <div className="fgroup" style={{ gridColumn: "1/-1" }}><span className="lbl">Durum ve koşullar</span>
              <div className="fgrid">{chk("asili", "Aşıları yapıldı")}{chk("rapor", "Veteriner sağlık raporu var")}{!kum && chk("kurbanlik", "Kurbanlık")}{chk("pazarlik", "Pazarlık payı var")}{chk("takas", "Takas olur")}{chk("nakliye", "Nakliye imkânı var")}</div></div>
            <div className="field" style={{ gridColumn: "1/-1" }}><label htmlFor="d_aciklama">Açıklama</label>
              <textarea className="inp" id="d_aciklama" maxLength={3000} value={d.aciklama} onChange={(e) => up({ aciklama: e.target.value })} placeholder="Beslenme, bakım, soy, satış nedeni, görme saatleri…" /></div>
          </div>}

          {step === 2 && <>
            <div className="lbl">Fotoğraflar <span style={{ color: "var(--muted)", fontWeight: 500 }}>(en fazla 8, ilki vitrin olur)</span></div>
            <div className="photos">
              {d.fotolar.map((p, i) => (
                <div className="ph" key={p}><img src={fotoUrl(p)} alt={`Fotoğraf ${i + 1}`} />
                  <button type="button" className="x" aria-label="Fotoğrafı kaldır" onClick={() => up({ fotolar: d.fotolar.filter((x) => x !== p) })}>✕</button>
                  {i === 0 ? <span className="bdg kurban v">Vitrin</span> : <button type="button" className="bdg v" style={{ border: 0, cursor: "pointer" }} onClick={() => up({ fotolar: [p, ...d.fotolar.filter((x) => x !== p)] })}>Vitrin yap</button>}
                </div>
              ))}
              {d.fotolar.length < 8 && (
                <label className="drop" htmlFor="fileIn" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addPhotos(e.dataTransfer.files); }}>
                  <Camera /><b>Fotoğraf ekle</b><span>Dokunun veya sürükleyin</span>
                </label>
              )}
            </div>
            <input ref={fileRef} type="file" id="fileIn" accept="image/*" multiple hidden onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
            <div className="note">Hayvanı yandan, önden ve gün ışığında çekin. Küpe ve dişleri gösteren fotoğraflar ilanınızı öne çıkarır. Fotoğraf eklemezseniz ilanınızda temsilî çizim görünür.</div>
          </>}

          {step === 3 && <>
            <div className="fgrid">
              <div className="field"><label htmlFor="d_il">İl</label>
                <select className={"inp" + (errs.d_il ? " bad" : "")} id="d_il" value={d.il} onChange={(e) => up({ il: e.target.value, ilce: "" })}>
                  <option value="">İl seçin</option>{ILLER_ALFA.map((i) => <option key={i.plaka} value={i.ad}>{i.plaka} {i.ad}</option>)}
                </select><Err k="d_il" /></div>
              <div className="field"><label htmlFor="d_ilce">İlçe</label>
                <select className={"inp" + (errs.d_ilce ? " bad" : "")} id="d_ilce" value={d.ilce} disabled={!il} onChange={(e) => up({ ilce: e.target.value })}>
                  <option value="">{il ? "İlçe seçin" : "Önce il seçin"}</option>{il?.ilceler.map((t) => <option key={t}>{t}</option>)}
                </select><Err k="d_ilce" /></div>
              <div className="field"><label htmlFor="d_mahalle">Mahalle / köy</label>{inp("mahalle", { maxLength: 80, placeholder: "Örn. Yeşilköy" })}</div>
              <div className="field"><label htmlFor="d_konum">Konum (isteğe bağlı)</label>{inp("konum", { maxLength: 300, placeholder: "Google Haritalar linki veya 39.92, 32.85" })}
                <span className="hint">Haritalar uygulamasında çiftliğinizi bulup "Paylaş" ile linki yapıştırın.</span></div>
              <div className="field"><label htmlFor="d_satici_ad">Adınız soyadınız / işletme adı</label>{inp("satici_ad", { maxLength: 80, autoComplete: "name" })}<Err k="d_satici_ad" /></div>
              <div className="field"><label htmlFor="d_tel">Cep telefonu</label>
                {inp("tel", { type: "tel", inputMode: "tel", placeholder: "05XX XXX XX XX", autoComplete: "tel", className: "inp num" + (errs.d_tel ? " bad" : ""), onBlur: () => up({ tel: fmtTel(d.tel) }) })}
                <span className="hint">Numaranız ilan sayfasında "Telefonu göster" ile açılır.</span><Err k="d_tel" /></div>
              <div className="field"><span className="lbl">Satıcı türü</span>{seg("satici_tip", SATICI_TIP.map((t) => [t, t]))}</div>
              <div className="field" style={{ justifyContent: "end" }}>{chk("whatsapp", "WhatsApp ile ulaşılabilirim")}</div>
            </div>
            <div className="notice"><Shield size={20} /><span>Yayınlayarak ilan bilgilerinin doğru olduğunu, hayvanın size ait olduğunu ve <Link href="/kurallar">ilan kurallarını</Link> kabul ettiğinizi beyan edersiniz. İlanda kimlik veya IBAN bilgisi paylaşmayın.</span></div>
          </>}
        </div>
        {(busy || fail) && <p className={fail ? "err" : "note"} style={{ marginTop: 12 }} role="status">{fail || busy}</p>}
        <div className="formnav">
          {step > 0 ? <button type="button" className="btn btn-ghost" onClick={() => { setStep(step - 1); window.scrollTo(0, 0); }}><ChevL /> Geri</button> : <span />}
          {step < 3
            ? <button type="submit" className="btn btn-brand" disabled={!!busy}>Devam <ChevR /></button>
            : <button type="submit" className="btn btn-accent" disabled={!!busy}>{busy || (editId ? "Değişiklikleri kaydet" : "İlanı yayınla")}</button>}
        </div>
      </form>
      {!editId && <p className="note" style={{ marginTop: 14 }}>Taslağınız bu cihazda otomatik saklanır.</p>}
    </div>
  );
}
