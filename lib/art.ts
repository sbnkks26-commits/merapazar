// @ts-nocheck
/* Fotoğrafsız ilanlar için çizimler. Yalnızca sabit renk tablolarından üretilir; kullanıcı metni SVG içine yazılmaz. */
import { KECI_IRK } from "./kategoriler";
const BREED_COL={'Holstein (Siyah Alaca)':['#F7F5F0','#1E1E1E'],'Simental':['#F3E6CF','#A9632A'],'Angus':['#24201E',null],'Montofon (Esmer)':['#8C7D70',null],'Limuzin':['#C27237',null],'Şarole':['#EFE3C8',null],'Jersey':['#B98A56',null],'Hereford':['#9C4423','#F5EFE6'],'Yerli Kara':['#2C2623',null],'Boz Irk':['#ABA59C',null],'Doğu Anadolu Kırmızısı':['#9B4A2C',null],'Anadolu Mandası':['#2B2826',null]};
export function hash(s: string){let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)}
function scene(cat,inner,seed){
  const sky={buyukbas:['#DCEBDD','#B9D7BE'],kucukbas:['#F3E7C9','#E2CC93'],kumes:['#F4DED3','#E3B9A3']}[cat]||['#E4EAE4','#C9D3C9'];
  const sun=20+(seed%90);
  return `<svg viewBox="0 0 160 110" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="160" height="110" fill="${sky[0]}"/><circle cx="${sun+20}" cy="22" r="9" fill="#FFF7DF" opacity=".9"/><path d="M0 80 Q40 66 80 76 T160 72 V110 H0Z" fill="${sky[1]}"/><path d="M0 92 Q60 84 160 90 V110 H0Z" fill="${sky[1]}" opacity=".7"/>${inner}</svg>`;
}
function cowSVG(irk,tur){
  let [b,s]=BREED_COL[irk]||['#E9DCC4','#7A4A28'];
  const manda=tur==='Manda'||irk==='Anadolu Mandası'; if(manda){b='#2B2826';s=null}
  const dk='rgba(0,0,0,.18)', calf=tur==='Buzağı';
  const fem=/İnek|Düve/.test(tur), bull=/Boğa|Tosun/.test(tur);
  const t=calf?'translate(26 18) scale(.72)':'';
  return `<g transform="${t}"><path d="M42 50 q-12 8 -9 26" stroke="${b}" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="33" cy="77" r="3" fill="${s||dk}"/>
  <rect x="46" y="66" width="8" height="24" rx="3" fill="${b}"/><rect x="58" y="66" width="8" height="24" rx="3" fill="${b}"/><rect x="92" y="66" width="8" height="24" rx="3" fill="${b}"/><rect x="104" y="66" width="8" height="24" rx="3" fill="${b}"/>
  <rect x="46" y="86" width="8" height="4" fill="#3A2E28"/><rect x="58" y="86" width="8" height="4" fill="#3A2E28"/><rect x="92" y="86" width="8" height="4" fill="#3A2E28"/><rect x="104" y="86" width="8" height="4" fill="#3A2E28"/>
  <rect x="38" y="40" width="80" height="34" rx="16" fill="${b}"/>
  ${s?`<ellipse cx="62" cy="52" rx="11" ry="8" fill="${s}"/><ellipse cx="94" cy="62" rx="9" ry="6" fill="${s}"/><ellipse cx="80" cy="46" rx="6" ry="4" fill="${s}"/>`:`<rect x="38" y="62" width="80" height="12" rx="6" fill="${dk}"/>`}
  ${fem?`<ellipse cx="74" cy="76" rx="7" ry="4.5" fill="#EDB0A6"/>`:''}
  ${manda?`<path d="M113 32 q-14 -10 -6 -22 M131 32 q14 -10 6 -22" stroke="#6B625B" stroke-width="5" fill="none" stroke-linecap="round"/>`:bull?`<path d="M114 31 q-6 -6 -2 -11 M130 31 q6 -6 2 -11" stroke="#E8DFC9" stroke-width="3.5" fill="none" stroke-linecap="round"/>`:''}
  <ellipse cx="110" cy="35" rx="8" ry="3.6" fill="${b}" transform="rotate(-20 110 35)"/><ellipse cx="134" cy="35" rx="8" ry="3.6" fill="${b}" transform="rotate(20 134 35)"/>
  <rect x="111" y="30" width="22" height="26" rx="9" fill="${b}"/>
  ${s&&irk==='Simental'?`<rect x="113" y="32" width="18" height="16" rx="7" fill="#F8F2E6"/>`:''}
  <rect x="113" y="46" width="18" height="13" rx="6" fill="${manda?'#4A4440':'#E7C6B8'}"/><circle cx="118" cy="53" r="1.6" fill="#3A2E28"/><circle cx="126" cy="53" r="1.6" fill="#3A2E28"/>
  <circle cx="116.5" cy="39" r="2" fill="#151515"/><circle cx="127.5" cy="39" r="2" fill="#151515"/></g>`;
}
function sheepSVG(irk,tur){
  const keci=/Keçi|Oğlak|Teke/.test(tur)||KECI_IRK.includes(irk)&&irk!=='Melez';
  const young=/Kuzu|Oğlak/.test(tur), t=young?'translate(28 22) scale(.7)':'';
  if(keci){
    const b={'Saanen':'#F4F1EA','Ankara (Tiftik)':'#F2EEE4','Şam (Halep)':'#9C5B34','Malta':'#A47A55','Kilis':'#2A2522','Kıl Keçisi':'#24201E','Honamlı':'#2E2925','Alpin':'#8A6745'}[irk]||'#5B4A3D';
    const horn=tur==='Teke'||irk==='Kıl Keçisi'||irk==='Honamlı'||irk==='Ankara (Tiftik)';
    return `<g transform="${t}"><path d="M48 46 l-6 -10" stroke="${b}" stroke-width="4" stroke-linecap="round"/>
    <rect x="52" y="64" width="6" height="26" rx="2" fill="${b}"/><rect x="62" y="64" width="6" height="26" rx="2" fill="${b}"/><rect x="92" y="64" width="6" height="26" rx="2" fill="${b}"/><rect x="101" y="64" width="6" height="26" rx="2" fill="${b}"/>
    <rect x="46" y="44" width="66" height="26" rx="12" fill="${b}"/>
    ${irk==='Ankara (Tiftik)'?`<path d="M48 66 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" fill="${b}" stroke="#E2DBCB"/>`:''}
    ${horn?`<path d="M112 28 q4 -18 -16 -20" stroke="#8A7A66" stroke-width="4" fill="none" stroke-linecap="round"/>`:''}
    <path d="M104 46 L112 26 L122 30 L130 52 L120 56 Z" fill="${b}"/><ellipse cx="108" cy="32" rx="8" ry="3" fill="${b}" transform="rotate(30 108 32)"/>
    <path d="M124 54 l2 10 l-5 -2z" fill="${b}"/><circle cx="118" cy="36" r="1.8" fill="#151515"/></g>`;
  }
  const wool={'Kıvırcık':'#F5F0E4','Merinos':'#F7F3EA','Romanov':'#6C625A','Karayaka':'#EFE7D5','Norduz':'#EDE3CF'}[irk]||'#F2ECDF';
  const head={'Merinos':'#EFE6D6','Kıvırcık':'#E9DECB','Sakız':'#F1E8DA','Assaf':'#F0E6D4','Dorper':'#1F1C1A'}[irk]||'#3A302A';
  const horn=tur==='Koç';
  let c='';[[56,50],[70,44],[86,44],[100,50],[50,62],[64,60],[80,60],[96,60],[108,62],[62,70],[78,72],[94,70]].forEach(([x,y])=>c+=`<circle cx="${x}" cy="${y}" r="11" fill="${wool}"/>`);
  return `<g transform="${t}"><rect x="56" y="68" width="6" height="22" rx="2" fill="#2E2622"/><rect x="66" y="68" width="6" height="22" rx="2" fill="#2E2622"/><rect x="92" y="68" width="6" height="22" rx="2" fill="#2E2622"/><rect x="102" y="68" width="6" height="22" rx="2" fill="#2E2622"/>
  ${c}<rect x="48" y="46" width="66" height="28" rx="14" fill="${wool}"/>
  <ellipse cx="120" cy="50" rx="11" ry="14" fill="${head}"/><ellipse cx="110" cy="42" rx="8" ry="3.5" fill="${head}" transform="rotate(-25 110 42)"/>
  ${horn?`<path d="M114 40 q-12 -2 -8 10 q4 6 9 1" stroke="#B8A584" stroke-width="5" fill="none" stroke-linecap="round"/>`:''}
  <circle cx="123" cy="47" r="1.8" fill="${head==='#3A302A'||head==='#1F1C1A'?'#F5EFE3':'#151515'}"/></g>`;
}
function birdSVG(tur,irk){
  if(tur==='Kuluçkalık Yumurta'){let e='';[[60,72],[78,70],[96,72],[69,62],[87,61]].forEach(([x,y],i)=>e+=`<ellipse cx="${x}" cy="${y}" rx="8" ry="10.5" fill="${i%2?'#EADBC4':'#D9B48A'}"/>`);return `<path d="M44 70 q36 30 72 0 z" fill="#B07A3E"/>${e}<path d="M44 70 q36 30 72 0" stroke="#8A5B2A" stroke-width="3" fill="#B07A3E"/><path d="M48 76 h64 M52 82 h56" stroke="#8A5B2A" stroke-width="1.5"/>`}
  if(tur==='Civciv'){let g='';[[56,72],[84,70],[112,73]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="11" fill="#F7D34B"/><circle cx="${x+9}" cy="${y-11}" r="7" fill="#F7D34B"/><path d="M${x+15} ${y-12} l6 2 l-6 2z" fill="#E58A1F"/><circle cx="${x+11}" cy="${y-13}" r="1.3" fill="#222"/><path d="M${x-2} ${y+10} v8 M${x+4} ${y+10} v8" stroke="#E58A1F" stroke-width="2"/>`);return g}
  if(tur==='Bıldırcın'){let g='';[[60,70],[96,72]].forEach(([x,y])=>g+=`<ellipse cx="${x}" cy="${y}" rx="17" ry="13" fill="#9A7752"/><circle cx="${x-4}" cy="${y-2}" r="1.6" fill="#E9DCC4"/><circle cx="${x+4}" cy="${y+3}" r="1.6" fill="#E9DCC4"/><circle cx="${x-8}" cy="${y+5}" r="1.6" fill="#E9DCC4"/><circle cx="${x+15}" cy="${y-10}" r="7" fill="#7E5F41"/><path d="M${x+21} ${y-10} l5 2 l-5 2z" fill="#444"/><circle cx="${x+17}" cy="${y-12}" r="1.3" fill="#111"/>`);return g}
  if(tur==='Hindi'){const w=irk==='Beyaz Hindi';let f='';for(let a=-80;a<=80;a+=20){f+=`<ellipse cx="66" cy="34" rx="7" ry="30" fill="${w?'#F1ECE2':(Math.abs(a)%40?'#6B4A2E':'#8A6440')}" stroke="${w?'#D8D0C2':'#3E2A18'}" transform="rotate(${a} 66 64)"/>`}
    return `${f}<ellipse cx="74" cy="66" rx="26" ry="20" fill="${w?'#F7F3EC':'#4A3423'}"/><path d="M92 58 q10 -16 8 -28" stroke="#9FB4D2" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="100" cy="30" r="6" fill="#9FB4D2"/><path d="M104 32 q4 10 -2 16" stroke="#D6362F" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M106 29 l5 1 l-5 2z" fill="#D9B04C"/><path d="M70 84 v8 M80 84 v8" stroke="#C99A55" stroke-width="3"/>`}
  if(tur==='Kaz'||tur==='Ördek'){const kaz=tur==='Kaz';const b=irk==='Toulouse Kazı'?'#8B8781':'#F5F2EC';
    return `<ellipse cx="74" cy="70" rx="${kaz?34:28}" ry="${kaz?17:15}" fill="${b}"/><path d="M46 64 l-10 -6 l4 10z" fill="${b}"/><path d="M${kaz?100:94} 66 q4 -${kaz?30:16} 6 -${kaz?34:20}" stroke="${b}" stroke-width="${kaz?11:12}" fill="none" stroke-linecap="round"/><circle cx="${kaz?107:101}" cy="${kaz?34:47}" r="${kaz?9:9}" fill="${tur==='Ördek'&&irk!=='Pekin Ördeği'?'#2D6B4A':b}"/><path d="M${kaz?114:108} ${kaz?33:46} l11 2 l-11 4z" fill="#EE9A2E"/><circle cx="${kaz?108:102}" cy="${kaz?31:44}" r="1.5" fill="#111"/><ellipse cx="70" cy="68" rx="16" ry="8" fill="rgba(0,0,0,.08)"/><path d="M68 85 v6 M80 85 v6" stroke="#EE9A2E" stroke-width="3"/>`}
  const hor=tur==='Horoz', beç=tur==='Beç Tavuğu';
  const body=beç?'#45474F':irk==='Atak-S'||irk==='Lohmann'?'#9A5A2C':irk==='Leghorn'||irk==='Sussex'?'#F5F1E8':irk==='Brahma'?'#E9E3D6':irk==='Gerze'?'#2B2A2A':hor?'#B45A22':'#B0773E';
  return `${hor?`<path d="M54 62 q-22 -30 -6 -42 q4 20 16 30" fill="#1F5B4B"/><path d="M58 62 q-14 -34 6 -38 q-4 18 6 32" fill="#2F2A26"/>`:`<path d="M52 62 q-10 -18 2 -24 l10 20z" fill="${body}"/>`}
  <ellipse cx="76" cy="66" rx="28" ry="22" fill="${body}"/>${beç?`<circle cx="70" cy="62" r="1.6" fill="#fff"/><circle cx="80" cy="70" r="1.6" fill="#fff"/><circle cx="66" cy="72" r="1.6" fill="#fff"/><circle cx="86" cy="60" r="1.6" fill="#fff"/>`:''}
  <ellipse cx="72" cy="68" rx="15" ry="10" fill="rgba(0,0,0,.12)"/><circle cx="100" cy="44" r="${hor?12:11}" fill="${hor?'#D47A2A':body}"/>
  ${beç?'':`<path d="M92 34 q2 -${hor?12:7} 6 -3 q3 -${hor?11:7} 6 -2 q4 -${hor?9:6} 6 2z" fill="#D6362F"/>`}<path d="M110 44 l8 3 l-8 3z" fill="#E9A92A"/><path d="M104 52 q2 8 -2 10 q-3 -6 2 -10z" fill="#D6362F"/><circle cx="103" cy="41" r="1.8" fill="#111"/>
  <path d="M70 86 v8 M80 86 v8 M66 94 h8 M76 94 h8" stroke="#E9A92A" stroke-width="2.5" stroke-linecap="round"/>`;
}
export function animalArt(l: { id?: string | number; baslik?: string; cat: string; tur: string; irk?: string | null }): string {
  const seed = hash(String(l.id ?? l.baslik ?? l.tur));
  const inner = l.cat === "buyukbas" ? cowSVG(l.irk, l.tur) : l.cat === "kucukbas" ? sheepSVG(l.irk, l.tur) : birdSVG(l.tur, l.irk);
  return scene(l.cat, inner, seed);
}
export const catArt = {
  buyukbas: scene("buyukbas", cowSVG("Simental", "İnek"), 3),
  kucukbas: scene("kucukbas", sheepSVG("Akkaraman", "Koyun"), 40),
  kumes: scene("kumes", birdSVG("Horoz", ""), 70),
};
