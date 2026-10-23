"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Plus, Search, User } from "./icons";

export default function TabBar({ loggedIn }: { loggedIn: boolean }) {
  const p = usePathname();
  const cur = (m: boolean) => (m ? "page" : undefined);
  return (
    <nav className="tabbar" aria-label="Alt menü">
      <Link href="/" aria-current={cur(p === "/")}><Home />Ana Sayfa</Link>
      <Link href="/ilanlar" aria-current={cur(p.startsWith("/ilanlar") || p.startsWith("/ilan/"))}><Search />İlanlar</Link>
      <Link href="/ilan-ver" aria-current={cur(p === "/ilan-ver")}><span className="plus"><Plus size={22} /></span>İlan Ver</Link>
      <Link href="/favoriler" aria-current={cur(p === "/favoriler")}><Heart size={22} />Favoriler</Link>
      <Link href={loggedIn ? "/hesabim" : "/giris"} aria-current={cur(p === "/hesabim" || p === "/giris")}><User />{loggedIn ? "İlanlarım" : "Giriş"}</Link>
    </nav>
  );
}
