import type { CardListing } from "./types";

export const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");
const AY = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
export const tarih = (t: string | number) => { const d = new Date(t); return `${d.getDate()} ${AY[d.getMonth()]} ${d.getFullYear()}`; };
export function once(t: string | number) {
  const m = (Date.now() - new Date(t).getTime()) / 60000;
  if (m < 60) return Math.max(1, Math.round(m)) + " dk önce";
  if (m < 1440) return Math.round(m / 60) + " saat önce";
  if (m < 2880) return "Dün";
  if (m < 43200) return Math.round(m / 1440) + " gün önce";
  return tarih(t);
}
export const telDigits = (t: string) => String(t || "").replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "");
export const fmtTel = (t: string) => { const d = telDigits(t); return d.length === 10 ? `0${d.slice(0,3)} ${d.slice(3,6)} ${d.slice(6,8)} ${d.slice(8)}` : t; };
export const ilanNo = (id: number) => String(10000000 + id);
export function yasStr(l: Pick<CardListing, "yas" | "yas_birim">) {
  if (l.yas == null) return "";
  const y = +l.yas;
  if (l.yas_birim === "ay") {
    if (y >= 24 && y % 12 === 0) return y / 12 + " yaş";
    if (y >= 12) return Math.floor(y / 12) + " yaş" + (y % 12 ? " " + (y % 12) + " ay" : "");
    return y + " aylık";
  }
  return y + " " + (l.yas_birim === "gün" ? "günlük" : "haftalık");
}
export const specLine = (l: CardListing) =>
  [l.irk && !/Bilinmiyor/.test(l.irk) ? l.irk : "", yasStr(l), l.adet > 1 ? l.adet + " baş" : "", l.kilo ? l.kilo + " kg" : ""].filter(Boolean).join(" · ");
export const fotoUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ilan-fotolari/${path}`;
export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
