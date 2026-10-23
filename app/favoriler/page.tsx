import type { Metadata } from "next";
import FavList from "@/components/FavList";
export const metadata: Metadata = { title: "Favorilerim", robots: { index: false } };
export default function Favoriler() {
  return (
    <div className="wrap section">
      <div className="sec-head"><div><h2>Favorilerim</h2><p>Bu cihazda kaydettiğiniz ilanlar</p></div></div>
      <FavList />
    </div>
  );
}
