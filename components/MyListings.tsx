"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { CardListing } from "@/lib/types";
import { fotoUrl, tarih } from "@/lib/format";
import { AnimalArt } from "./Art";
import { Price } from "./ListingCards";

export default function MyListings({ items }: { items: CardListing[] }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState<CardListing | null>(null);
  const [msg, setMsg] = useState("");
  const act = async (l: CardListing, durum: CardListing["durum"]) => {
    setMsg("");
    const supabase = createClient();
    const { error } = durum === "kaldirildi"
      ? await supabase.from("listings").delete().eq("id", l.id)
      : await supabase.from("listings").update({ durum }).eq("id", l.id);
    if (error) { setMsg("İşlem tamamlanamadı, tekrar deneyin."); return; }
    if (durum === "kaldirildi" && l.fotolar.length) await supabase.storage.from("ilan-fotolari").remove(l.fotolar);
    setMsg(durum === "kaldirildi" ? "İlan silindi." : durum === "satildi" ? "Satıldı olarak işaretlendi." : "İlan yeniden yayında.");
    setConfirm(null);
    router.refresh();
  };
  if (!items.length) return (
    <div className="empty"><h3>Henüz ilanınız yok</h3><p>İlk ilanınızı 4 adımda, birkaç dakikada verin. İlan vermek ücretsizdir.</p>
      <Link className="btn btn-accent btn-sm" href="/ilan-ver" style={{ marginTop: 10 }}>İlan ver</Link></div>
  );
  return (
    <>
      {msg && <div className="okmsg" role="status" style={{ marginBottom: 10 }}>{msg}</div>}
      <div className="mine">
        {items.map((l) => (
          <div className="mrow" key={l.id}>
            <div className="thumb">{l.fotolar[0] ? <img src={fotoUrl(l.fotolar[0])} alt="" /> : <AnimalArt id={l.id} cat={l.cat} tur={l.tur} irk={l.irk} />}</div>
            <div style={{ minWidth: 0 }}>
              <b style={{ display: "block" }}>{l.baslik}</b>
              <div className="price num" style={{ fontSize: 16 }}><Price l={l} /></div>
              <div className="spec">{l.il} / {l.ilce} · {tarih(l.created_at)} · {l.durum === "satildi" ? <b style={{ color: "var(--danger)" }}>Satıldı</b> : <b style={{ color: "var(--ok)" }}>Yayında</b>}</div>
            </div>
            <div className="acts">
              <Link className="btn btn-ghost btn-sm" href={`/ilan/${l.id}`}>Görüntüle</Link>
              <Link className="btn btn-ghost btn-sm" href={`/ilan/${l.id}/duzenle`}>Düzenle</Link>
              <button className="btn btn-ghost btn-sm" onClick={() => act(l, l.durum === "satildi" ? "yayinda" : "satildi")}>{l.durum === "satildi" ? "Yeniden yayınla" : "Satıldı işaretle"}</button>
              <button className="btn btn-danger btn-sm" onClick={() => setConfirm(l)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
      {confirm && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="İlan silinsin mi?" onClick={(e) => e.target === e.currentTarget && setConfirm(null)}>
          <div className="box"><h3>İlan silinsin mi?</h3>
            <p style={{ margin: 0, color: "var(--muted)" }}>"{confirm.baslik}" kalıcı olarak kaldırılır ve geri alınamaz. Hayvanı sattıysanız "Satıldı işaretle" seçeneğini de kullanabilirsiniz.</p>
            <div className="acts"><button className="btn btn-ghost btn-sm" onClick={() => setConfirm(null)}>Vazgeç</button><button className="btn btn-danger btn-sm" onClick={() => act(confirm, "kaldirildi")}>Evet, sil</button></div>
          </div>
        </div>
      )}
    </>
  );
}
