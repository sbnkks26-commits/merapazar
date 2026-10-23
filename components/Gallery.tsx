"use client";
import { useState } from "react";
import { AnimalArt } from "./Art";
import { ChevL, ChevR } from "./icons";

export default function Gallery({ l, fotolar }: { l: { id: number; cat: string; tur: string; irk: string | null; baslik: string }; fotolar: string[] }) {
  const [i, setI] = useState(0);
  const n = fotolar.length;
  return (
    <div className="gallery">
      <div className="gmain">
        {n ? <img src={fotolar[i]} alt={`${l.baslik} fotoğraf ${i + 1}`} /> : <AnimalArt id={l.id} cat={l.cat} tur={l.tur} irk={l.irk} />}
        {n > 1 && <>
          <button className="gnav l" onClick={() => setI((i - 1 + n) % n)} aria-label="Önceki fotoğraf"><ChevL /></button>
          <button className="gnav r" onClick={() => setI((i + 1) % n)} aria-label="Sonraki fotoğraf"><ChevR /></button>
        </>}
        <span className="gcount num">{n ? i + 1 : 1} / {Math.max(1, n)}</span>
      </div>
      {n > 1 && <div className="gthumbs">{fotolar.map((p, k) => (
        <button key={p} onClick={() => setI(k)} aria-current={k === i} aria-label={`Fotoğraf ${k + 1}`}><img src={p} alt="" /></button>
      ))}</div>}
      {!n && <div className="note">Satıcı fotoğraf eklemedi; görsel temsilîdir.</div>}
    </div>
  );
}
