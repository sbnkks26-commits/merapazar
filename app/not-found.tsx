import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingBlock: 40 }}>
      <div className="empty"><h3>Aradığınız sayfa bulunamadı</h3><p>İlan yayından kaldırılmış ya da bağlantı hatalı olabilir.</p>
        <Link className="btn btn-brand btn-sm" href="/ilanlar" style={{ marginTop: 10 }}>İlanlara dön</Link></div>
    </div>
  );
}
