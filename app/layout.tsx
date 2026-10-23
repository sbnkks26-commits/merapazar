import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/format";
import { Heart, List, Logo, Plus } from "@/components/icons";
import TabBar from "@/components/TabBar";
import TopSearch from "@/components/TopSearch";
import FavCount from "@/components/FavCount";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], weight: ["500", "700", "800"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "MeraPazar · Büyükbaş, küçükbaş ve kümes hayvanı ilanları", template: "%s · MeraPazar" },
  description: "Türkiye'nin 81 ilinde satılık inek, düve, dana, koyun, keçi, kuzu, tavuk, hindi ve kaz ilanları. Ücretsiz ilan verin, aracısız satın.",
  openGraph: { siteName: "MeraPazar", locale: "tr_TR", type: "website" },
};
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" }, { media: "(prefers-color-scheme: dark)", color: "#131F1A" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <header className="top">
          <div className="wrap">
            <Link className="logo" href="/" aria-label="MeraPazar ana sayfa"><Logo /><span>Mera<b>Pazar</b></span></Link>
            <div className="top-search"><TopSearch /></div>
            <div className="top-actions">
              <Link className="tbtn" href="/favoriler"><Heart /> Favoriler <FavCount /></Link>
              <Link className="tbtn" href={user ? "/hesabim" : "/giris"}><List /> {user ? "İlanlarım" : "Giriş yap"}</Link>
              <Link className="btn btn-accent btn-sm" href="/ilan-ver"><Plus /> Ücretsiz İlan Ver</Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="foot">
          <div className="wrap">
            <div>
              <b>MeraPazar</b>
              Türkiye'nin 81 ilinde büyükbaş, küçükbaş ve kümes hayvanı alıcısını ve satıcısını buluşturan ilan pazarı. İlan vermek ücretsizdir; MeraPazar alım satımda aracı değildir ve ödeme almaz.
            </div>
            <div>
              <b>Kategoriler</b>
              <Link href="/ilanlar?cat=buyukbas">Büyükbaş</Link>
              <Link href="/ilanlar?cat=kucukbas">Küçükbaş</Link>
              <Link href="/ilanlar?cat=kumes">Kümes Hayvanları</Link>
              <Link href="/ilanlar?kurbanlik=1">Kurbanlık</Link>
            </div>
            <div>
              <b>Yardım</b>
              <Link href="/guvenli-alisveris">Güvenli alışveriş rehberi</Link>
              <Link href="/kurallar">İlan verme kuralları</Link>
              <Link href="/kvkk">KVKK aydınlatma metni</Link>
            </div>
          </div>
        </footer>
        <TabBar loggedIn={!!user} />
      </body>
    </html>
  );
}
