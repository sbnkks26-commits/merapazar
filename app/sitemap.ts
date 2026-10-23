import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { siteUrl } from "@/lib/format";
import { CAT_KEYS } from "@/lib/kategoriler";
import { ILLER } from "@/lib/iller";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const out: MetadataRoute.Sitemap = [{ url: base, changeFrequency: "hourly", priority: 1 }, { url: `${base}/ilanlar`, changeFrequency: "hourly" }];
  CAT_KEYS.forEach((c) => out.push({ url: `${base}/ilanlar?cat=${c}`, changeFrequency: "daily" }));
  ILLER.forEach((i) => out.push({ url: `${base}/ilanlar?il=${encodeURIComponent(i.ad)}`, changeFrequency: "daily" }));
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const { data } = await sb.from("listings").select("id,updated_at").eq("durum", "yayinda").order("created_at", { ascending: false }).limit(5000);
    data?.forEach((r) => out.push({ url: `${base}/ilan/${r.id}`, lastModified: r.updated_at }));
  }
  return out;
}
