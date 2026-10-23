"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const raw = sp.get("next") || "/hesabim";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/hesabim";
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(sp.get("hata") ? "Giriş bağlantısının süresi dolmuş. Yeni kod isteyin." : "");

  const send = async (e: React.FormEvent) => {
    e.preventDefault(); setErr("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErr("Geçerli bir e-posta adresi yazın."); return; }
    setBusy(true);
    const { error } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`, shouldCreateUser: true },
    });
    setBusy(false);
    if (error) { setErr(/rate|limit/i.test(error.message) ? "Çok sık denediniz. Bir dakika bekleyip tekrar deneyin." : "Kod gönderilemedi. Adresi kontrol edip tekrar deneyin."); return; }
    setSent(true);
  };
  const verify = async (e: React.FormEvent) => {
    e.preventDefault(); setErr("");
    const t = code.replace(/\D/g, "");
    if (t.length < 6) { setErr("E-postadaki 6 haneli kodu yazın."); return; }
    setBusy(true);
    const { error } = await createClient().auth.verifyOtp({ email: email.trim(), token: t, type: "email" });
    setBusy(false);
    if (error) { setErr("Kod hatalı ya da süresi dolmuş. Yeni kod isteyin."); return; }
    router.push(next); router.refresh();
  };

  return (
    <div className="auth wrap">
      <div className="panel">
        <h1 style={{ fontSize: 24 }}>Giriş yap veya üye ol</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>Şifre yok. E-posta adresinize gelen kodla giriş yaparsınız; ilk girişte hesabınız kendiliğinden açılır.</p>
        {!sent ? (
          <form onSubmit={send} className="fstack" noValidate>
            <div className="field"><label htmlFor="email">E-posta adresi</label>
              <input className="inp" id="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@gmail.com" /></div>
            <button className="btn btn-brand btn-block" disabled={busy}>{busy ? "Gönderiliyor…" : "Giriş kodu gönder"}</button>
          </form>
        ) : (
          <form onSubmit={verify} className="fstack" noValidate>
            <div className="okmsg"><b>{email}</b> adresine bir kod ve giriş bağlantısı gönderdik. Gelen kutunuzda yoksa "Spam" klasörüne bakın.</div>
            <div className="field"><label htmlFor="code">6 haneli kod</label>
              <input className="inp otp num" id="code" inputMode="numeric" autoComplete="one-time-code" maxLength={8} value={code} onChange={(e) => setCode(e.target.value)} placeholder="••••••" /></div>
            <button className="btn btn-brand btn-block" disabled={busy}>{busy ? "Kontrol ediliyor…" : "Giriş yap"}</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setSent(false); setCode(""); }}>Farklı e-posta kullan</button>
          </form>
        )}
        {err && <span className="err" role="alert">{err}</span>}
        <p className="note" style={{ margin: 0 }}>Giriş yaparak <Link href="/kurallar">ilan kurallarını</Link> ve <Link href="/kvkk">KVKK aydınlatma metnini</Link> okuduğunuzu kabul edersiniz.</p>
      </div>
    </div>
  );
}
