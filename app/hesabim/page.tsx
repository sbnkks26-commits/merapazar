import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CARD_COLS, type CardListing } from "@/lib/types";
import MyListings from "@/components/MyListings";

export const metadata: Metadata = { title: "İlanlarım", robots: { index: false } };

export default async function Hesabim() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris?next=/hesabim");
  const { data } = await supabase.from("listings").select(CARD_COLS).eq("user_id", user.id).neq("durum", "kaldirildi").order("created_at", { ascending: false });
  const L = (data || []) as unknown as CardListing[];
  return (
    <div className="wrap section">
      <div className="sec-head">
        <div><h2>İlanlarım</h2><p className="num">{L.filter((l) => l.durum === "yayinda").length} yayında · {L.filter((l) => l.durum === "satildi").length} satıldı · {user.email}</p></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="btn btn-accent btn-sm" href="/ilan-ver">Yeni ilan ver</Link>
          <form action="/auth/cikis" method="post"><button className="btn btn-ghost btn-sm" type="submit">Çıkış yap</button></form>
        </div>
      </div>
      <MyListings items={L} />
    </div>
  );
}
