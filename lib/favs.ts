const KEY = "mp_favs";
export function getFavs(): number[] {
  try { const v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v.filter((x) => Number.isInteger(x)) : []; } catch { return []; }
}
export function toggleFav(id: number): boolean {
  const f = getFavs();
  const on = !f.includes(id);
  const next = on ? [...f, id] : f.filter((x) => x !== id);
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  window.dispatchEvent(new Event("favs"));
  return on;
}
