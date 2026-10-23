"use client";
import { useEffect, useState } from "react";
import { Heart } from "./icons";
import { getFavs, toggleFav } from "@/lib/favs";

export default function FavButton({ id, inline = false }: { id: number; inline?: boolean }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(getFavs().includes(id));
    sync();
    window.addEventListener("favs", sync);
    return () => window.removeEventListener("favs", sync);
  }, [id]);
  return (
    <button
      type="button"
      className={inline ? "btn btn-ghost btn-sm" : "fav"}
      style={inline ? { flex: 1 } : undefined}
      aria-pressed={on}
      aria-label={on ? "Favorilerden çıkar" : "Favorilere ekle"}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOn(toggleFav(id)); }}
    >
      <Heart filled={on} />{inline && " Favori"}
    </button>
  );
}
