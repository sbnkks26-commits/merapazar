export type CatKey = "buyukbas" | "kucukbas" | "kumes";

export const KOYUN_IRK = ["Akkaraman","Morkaraman","İvesi","Merinos","Kıvırcık","Sakız","Romanov","Assaf","Dorper","Norduz","Karayaka","Hemşin","İmroz","Melez"];
export const KECI_IRK = ["Kıl Keçisi","Saanen","Malta","Şam (Halep)","Ankara (Tiftik)","Kilis","Honamlı","Alpin","Melez"];

export const CATS: Record<CatKey, { ad: string; kisa: string; turler: string[]; irk: (tur?: string) => string[]; yasBirim: "ay" | "hafta" }> = {
  buyukbas: {
    ad: "Büyükbaş", kisa: "Büyükbaş",
    turler: ["İnek","Gebe Düve","Düve","Dana","Tosun","Boğa","Buzağı","Manda"],
    irk: () => ["Simental","Holstein (Siyah Alaca)","Montofon (Esmer)","Angus","Limuzin","Şarole","Jersey","Hereford","Yerli Kara","Boz Irk","Doğu Anadolu Kırmızısı","Anadolu Mandası","Melez"],
    yasBirim: "ay",
  },
  kucukbas: {
    ad: "Küçükbaş", kisa: "Küçükbaş",
    turler: ["Koyun","Kuzu","Koç","Toklu","Keçi","Oğlak","Teke"],
    irk: (t) => (/Keçi|Oğlak|Teke/.test(t || "") ? KECI_IRK : t ? KOYUN_IRK : [...KOYUN_IRK.slice(0, -1), ...KECI_IRK]),
    yasBirim: "ay",
  },
  kumes: {
    ad: "Kümes Hayvanları", kisa: "Kümes",
    turler: ["Yumurtacı Tavuk","Köy Tavuğu","Horoz","Civciv","Hindi","Kaz","Ördek","Bıldırcın","Beç Tavuğu","Kuluçkalık Yumurta"],
    irk: () => ["Atak-S","Lohmann","Gerze","Denizli","Brahma","Sussex","Leghorn","Bronz Hindi","Beyaz Hindi","Pekin Ördeği","Toulouse Kazı","Japon Bıldırcını","Melez / Bilinmiyor"],
    yasBirim: "hafta",
  },
};
export const CAT_KEYS = Object.keys(CATS) as CatKey[];
export const isCat = (c: unknown): c is CatKey => typeof c === "string" && c in CATS;
export const SATICI_TIP = ["Bireysel", "Çiftlik / İşletme", "Kooperatif", "Celep / Tüccar"];
