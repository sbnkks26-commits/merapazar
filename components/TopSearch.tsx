"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function Inner() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); router.push(`/ilanlar${q.trim() ? "?q=" + encodeURIComponent(q.trim()) : ""}`); }}>
      <label className="sr" htmlFor="topQ">İlanlarda ara</label>
      <input id="topQ" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Simental düve, kurbanlık koç, köy tavuğu…" autoComplete="off" />
      <button type="submit">Ara</button>
    </form>
  );
}
export default function TopSearch() { return <Suspense><Inner /></Suspense>; }
