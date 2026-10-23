import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LISTING_COLS, type Listing } from "@/lib/types";
import PostForm, { type Draft } from "@/components/PostForm";
import { fmtTel } from "@/lib/format";

export const metadata = { title: "İlanı düzenle", robots: { index: false } };

export default async function Duzenle({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/giris?next=/ilan/${id}/duzenle`);
  const { data } = await supabase.from("listings").select(LISTING_COLS).eq("id", id).eq("user_id", user.id).maybeSingle();
  if (!data) notFound();
  const l = data as unknown as Listing;
  const { data: tel } = await supabase.rpc("ilan_telefon", { p_id: id });
  const s = (v: unknown) => (v == null ? "" : String(v));
  const initial: Draft = {
    cat: l.cat, tur: l.tur, irk: s(l.irk), baslik: l.baslik, aciklama: s(l.aciklama), fiyat: s(l.fiyat), fiyat_tip: l.fiyat_tip,
    adet: s(l.adet), yas: s(l.yas), yas_birim: l.yas_birim, cinsiyet: s(l.cinsiyet), kilo: s(l.kilo), gebe: s(l.gebe), sut: s(l.sut), kupe: s(l.kupe),
    asili: l.asili, rapor: l.rapor, kurbanlik: l.kurbanlik, pazarlik: l.pazarlik, takas: l.takas, nakliye: l.nakliye,
    il: l.il, ilce: l.ilce, mahalle: s(l.mahalle), konum: s(l.konum), satici_ad: l.satici_ad, tel: fmtTel(s(tel)), satici_tip: l.satici_tip,
    whatsapp: l.whatsapp, fotolar: l.fotolar,
  };
  return <PostForm userId={user.id} initial={initial} editId={id} />;
}
