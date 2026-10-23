import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const raw = url.searchParams.get("next") || "/hesabim";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/hesabim";
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return NextResponse.redirect(new URL(`/giris?hata=1&next=${encodeURIComponent(next)}`, url.origin));
}
