import { animalArt, catArt } from "@/lib/art";
import type { CatKey } from "@/lib/kategoriler";

/* SVG yalnızca sabit tablolardan üretilir; kullanıcı metni içermez. */
export function AnimalArt(props: { id?: number; cat: string; tur: string; irk?: string | null }) {
  return <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: animalArt(props) }} />;
}
export function CatArt({ cat }: { cat: CatKey }) {
  return <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: catArt[cat] }} />;
}
