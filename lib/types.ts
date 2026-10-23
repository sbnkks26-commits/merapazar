import type { CatKey } from "./kategoriler";

export type Listing = {
  id: number;
  user_id: string;
  cat: CatKey;
  tur: string;
  irk: string | null;
  baslik: string;
  aciklama: string | null;
  fiyat: number;
  fiyat_tip: "bas" | "toplam";
  adet: number;
  yas: number | null;
  yas_birim: "gün" | "hafta" | "ay";
  cinsiyet: string | null;
  kilo: number | null;
  gebe: string | null;
  sut: number | null;
  kupe: string | null;
  asili: boolean;
  rapor: boolean;
  kurbanlik: boolean;
  pazarlik: boolean;
  takas: boolean;
  nakliye: boolean;
  il: string;
  ilce: string;
  mahalle: string | null;
  konum: string | null;
  satici_ad: string;
  satici_tip: string;
  whatsapp: boolean;
  fotolar: string[];
  durum: "yayinda" | "satildi" | "kaldirildi";
  created_at: string;
  updated_at: string;
};

/** Telefon hariç tüm sütunlar (telefon yalnızca ilan_telefon() ile açılır). */
export const LISTING_COLS =
  "id,user_id,cat,tur,irk,baslik,aciklama,fiyat,fiyat_tip,adet,yas,yas_birim,cinsiyet,kilo,gebe,sut,kupe,asili,rapor,kurbanlik,pazarlik,takas,nakliye,il,ilce,mahalle,konum,satici_ad,satici_tip,whatsapp,fotolar,durum,created_at,updated_at";
export const CARD_COLS =
  "id,user_id,cat,tur,irk,baslik,fiyat,fiyat_tip,adet,yas,yas_birim,kilo,gebe,kupe,asili,rapor,kurbanlik,pazarlik,nakliye,il,ilce,fotolar,durum,created_at";
export type CardListing = Pick<Listing, "id"|"user_id"|"cat"|"tur"|"irk"|"baslik"|"fiyat"|"fiyat_tip"|"adet"|"yas"|"yas_birim"|"kilo"|"gebe"|"kupe"|"asili"|"rapor"|"kurbanlik"|"pazarlik"|"nakliye"|"il"|"ilce"|"fotolar"|"durum"|"created_at">;
