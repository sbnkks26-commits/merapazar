import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/PostForm";

export const metadata: Metadata = { title: "Ücretsiz ilan ver", robots: { index: false } };

export default async function IlanVer() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris?next=/ilan-ver");
  return <PostForm userId={user.id} />;
}
