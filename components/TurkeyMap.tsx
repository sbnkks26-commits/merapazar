"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ILLER, IL_BY } from "@/lib/iller";

const X = (lon: number) => (lon - 25.6) * 50.5 + 14;
const Y = (lat: number) => (42.25 - lat) * 65 + 12;
const LABELS = new Set(["İstanbul","Ankara","İzmir","Konya","Erzurum","Diyarbakır","Samsun","Antalya","Van","Trabzon"]);

export default function TurkeyMap({ counts }: { counts: Record<string, number> }) {
  const router = useRouter();
  const [tip, setTip] = useState<string | null>(null);
  const tot = Object.values(counts).reduce((a, b) => a + b, 0);
  const ilc = Object.keys(counts).length;
  const t = tip ? IL_BY[tip] : null;
  const go = (il: string) => router.push(`/ilanlar?il=${encodeURIComponent(il)}`);
  return (
    <div className="mapcard">
      <header><h2>İl il canlı ilanlar</h2><small className="num">{tot} ilan · {ilc} il</small></header>
      <svg className="trmap" viewBox="0 0 1000 460" role="group" aria-label="Türkiye ilan haritası">
        {ILLER.map((il) => {
          const c = counts[il.ad] || 0, x = X(il.lon), y = Y(il.lat), r = c ? 8 + Math.min(10, Math.sqrt(c) * 3) : 6;
          return (
            <g key={il.plaka} className="p" tabIndex={0} role="link" aria-label={`${il.ad}: ${c} ilan`}
              onMouseEnter={() => setTip(il.ad)} onFocus={() => setTip(il.ad)} onClick={() => go(il.ad)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(il.ad); } }}>
              {c > 0 && <circle className="halo" cx={x} cy={y} r={r + 6} />}
              <circle className={"d" + (c ? " has" : "")} cx={x} cy={y} r={r} />
              {LABELS.has(il.ad) && <text x={x} y={y + r + 16} textAnchor="middle">{il.ad}</text>}
            </g>
          );
        })}
      </svg>
      <div className="maptip">
        {t ? <><span className="plate">{t.plaka}</span><b>{t.ad}</b> · {counts[t.ad] || 0} ilan · {t.ilceler.length} ilçe</> : "Bir ile dokunun, o ildeki ilanları görün."}
      </div>
    </div>
  );
}
