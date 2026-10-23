import Link from "next/link";
import type { CardListing } from "@/lib/types";
import { fotoUrl, once, specLine, tl } from "@/lib/format";
import { AnimalArt } from "./Art";
import FavButton from "./FavButton";
import { Pin } from "./icons";

function Thumb({ l }: { l: CardListing }) {
  const p = l.fotolar?.[0];
  return p ? <img src={fotoUrl(p)} alt={l.baslik} loading="lazy" /> : <AnimalArt id={l.id} cat={l.cat} tur={l.tur} irk={l.irk} />;
}
function Badges({ l }: { l: CardListing }) {
  return (
    <div className="badges">
      {l.durum === "satildi" && <span className="bdg sold">Satıldı</span>}
      {l.kurbanlik && <span className="bdg kurban">Kurbanlık</span>}
    </div>
  );
}
export function Price({ l }: { l: Pick<CardListing, "fiyat" | "fiyat_tip" | "adet"> }) {
  return (
    <>
      {tl(l.fiyat)}
      {l.adet > 1 && <small>{l.fiyat_tip === "bas" ? "/ baş" : "toplam"}</small>}
    </>
  );
}
export function Card({ l }: { l: CardListing }) {
  return (
    <Link href={`/ilan/${l.id}`} className="card">
      <div className="thumb"><Thumb l={l} /><Badges l={l} /><FavButton id={l.id} /></div>
      <div className="info">
        <div className="price num"><Price l={l} /></div>
        <div className="ttl">{l.baslik}</div>
        <div className="spec">{specLine(l)}</div>
        <div className="meta"><Pin /><span>{l.il} / {l.ilce}</span><span style={{ marginLeft: "auto" }}>{once(l.created_at)}</span></div>
      </div>
    </Link>
  );
}
export function Row({ l }: { l: CardListing }) {
  const sp = specLine(l);
  return (
    <Link href={`/ilan/${l.id}`} className="rowc">
      <div className="thumb"><Thumb l={l} /><Badges l={l} /></div>
      <div className="mid">
        <div className="ttl">{l.baslik}</div>
        <div className="spec">{l.tur}{sp ? " · " + sp : ""}</div>
        <div className="tags">
          {l.gebe && <span className="tag ok">Gebe {l.gebe}</span>}
          {l.kupe && <span className="tag ok">Küpeli</span>}
          {l.asili && <span className="tag">Aşılı</span>}
          {l.rapor && <span className="tag">Sağlık raporlu</span>}
          {l.nakliye && <span className="tag">Nakliye var</span>}
          {l.pazarlik && <span className="tag">Pazarlık payı</span>}
        </div>
      </div>
      <div className="right">
        <div className="price num"><Price l={l} /></div>
        <div className="meta"><Pin /><span>{l.il} / {l.ilce}</span></div>
        <div className="meta"><span>{once(l.created_at)}</span></div>
        <div><FavButton id={l.id} /></div>
      </div>
    </Link>
  );
}
