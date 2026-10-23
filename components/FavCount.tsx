"use client";
import { useEffect, useState } from "react";
import { getFavs } from "@/lib/favs";

export default function FavCount() {
  const [n, setN] = useState(0);
  useEffect(() => { const s = () => setN(getFavs().length); s(); window.addEventListener("favs", s); return () => window.removeEventListener("favs", s); }, []);
  return <span className="cnt num">{n}</span>;
}
