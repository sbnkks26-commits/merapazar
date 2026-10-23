"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { fmtTel, telDigits } from "@/lib/format";
import { Copy, Phone, Wa } from "./icons";

async function copy(text: string, done: (m: string) => void) {
  try { await navigator.clipboard.writeText(text); done("Kopyalandı"); } catch { done("Kopyalanamadı"); }
}

export function CopyNo({ no }: { no: string }) {
  const [m, setM] = useState("");
  return <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => copy(no, (x) => { setM(x); setTimeout(() => setM(""), 1800); })}><Copy /> {m || "İlan no"}</button>;
}

export function ContactBox({ id, baslik, whatsapp }: { id: number; baslik: string; whatsapp: boolean }) {
  const [tel, setTel] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const reveal = async () => {
    setErr("");
    const { data, error } = await createClient().rpc("ilan_telefon", { p_id: id });
    if (error || !data) { setErr("Numara alınamadı. Sayfayı yenileyip tekrar deneyin."); return null; }
    setTel(data as string);
    return data as string;
  };
  const waHref = tel ? `https://wa.me/90${telDigits(tel)}?text=${encodeURIComponent(`Merhaba, MeraPazar'daki "${baslik}" ilanınız (No: ${10000000 + id}) hakkında yazıyorum.`)}` : "";
  return (
    <>
      {tel ? (
        <>
          <div className="phone num"><span>{fmtTel(tel)}</span>
            <button className="btn btn-ghost btn-sm" aria-label="Numarayı kopyala" onClick={() => copy(fmtTel(tel), (m) => { setMsg(m === "Kopyalandı" ? "Numara kopyalandı" : m); setTimeout(() => setMsg(""), 1800); })}><Copy /></button></div>
          <a className="btn btn-brand btn-block" href={`tel:+90${telDigits(tel)}`}><Phone /> Ara</a>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{msg || "Aradığınızda \"MeraPazar'daki ilanınız için arıyorum\" deyin."}</span>
        </>
      ) : (
        <button className="btn btn-brand btn-block" onClick={reveal}><Phone /> Telefonu göster</button>
      )}
      {whatsapp && (tel
        ? <a className="btn btn-ghost btn-block" href={waHref} target="_blank" rel="noopener noreferrer"><Wa /> WhatsApp'tan yaz</a>
        : <button className="btn btn-ghost btn-block" onClick={reveal}><Wa /> WhatsApp'tan yaz</button>)}
      {err && <span className="err">{err}</span>}
    </>
  );
}

const NEDEN = ["Dolandırıcılık şüphesi (kapora istiyor)", "Yanlış kategori veya bilgi", "Hayvan satıldı ama ilan duruyor", "Hasta veya kötü koşullarda hayvan", "Diğer"];
export function ReportButton({ id, loggedIn }: { id: number; loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [neden, setNeden] = useState(NEDEN[0]);
  const [not, setNot] = useState("");
  const [state, setState] = useState<"" | "ok" | "err" | "dup">("");
  if (state === "ok" || state === "dup") return <div className="okmsg">{state === "ok" ? "Şikâyetiniz alındı. Teşekkürler." : "Bu ilanı daha önce şikâyet ettiniz."}</div>;
  if (!loggedIn) return <Link className="btn btn-ghost btn-sm" href={`/giris?next=/ilan/${id}`}>Şikâyet için giriş yapın</Link>;
  const send = async () => {
    const { error } = await createClient().from("reports").insert({ listing_id: id, neden, aciklama: not.slice(0, 500) || null });
    setState(!error ? "ok" : error.code === "23505" ? "dup" : "err");
    setOpen(false);
  };
  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={() => setOpen(true)}>Bu ilanı şikâyet et</button>
      {state === "err" && <span className="err">Şikâyet gönderilemedi, tekrar deneyin.</span>}
      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="İlanı şikâyet et" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="box">
            <h3>İlanı şikâyet et</h3>
            <div className="field"><label htmlFor="repWhy">Neden?</label>
              <select className="inp" id="repWhy" value={neden} onChange={(e) => setNeden(e.target.value)}>{NEDEN.map((n) => <option key={n}>{n}</option>)}</select></div>
            <textarea className="inp" id="repNote" placeholder="Ek açıklama (isteğe bağlı)" style={{ minHeight: 80 }} value={not} onChange={(e) => setNot(e.target.value)} maxLength={500} />
            <div className="acts"><button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Vazgeç</button><button className="btn btn-danger btn-sm" onClick={send}>Şikâyeti gönder</button></div>
          </div>
        </div>
      )}
    </>
  );
}
