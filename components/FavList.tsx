"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CARD_COLS, type CardListing } from "@/lib/types";
import { getFavs } from "@/lib/favs";
import { Card } from "./ListingCards";

export default function FavList() {
  const [items, setItems] = useState<CardListing[] | null>(null);
  useEffect(() => {
    const ids = getFavs().slice(-200);
    if (!ids.length) { setItems([]); return; }
    createClient().from("listings").select(CARD_COLS).in("id", ids).then(({ data }) => {
      const L = (data || []) as unknown as CardListing[];
      setItems(L.sort((a, b) => ids.indexOf(b.id) - ids.indexOf(a.id)));
    });
  }, []);
  if (items === null) return <div className="empty"><p>Yükleniyor…</p></div>;
  if (!items.length) return (
    <div className="empty"><h3>Henüz favori ilanınız yok</h3><p>İlanlardaki kalp simgesine dokunarak takip etmek istediklerinizi buraya ekleyin.</p>
      <Link className="btn btn-brand btn-sm" href="/ilanlar" style={{ marginTop: 10 }}>İlanlara göz at</Link></div>
  );
  return <div className="grid">{items.map((l) => <Card key={l.id} l={l} />)}</div>;
}
