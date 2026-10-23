export type Il = { plaka: string; ad: string; lat: number; lon: number; ilceler: string[] };

const IL_RAW = `Adana|37.00|35.32|Aladağ,Ceyhan,Çukurova,Feke,İmamoğlu,Karaisalı,Karataş,Kozan,Pozantı,Saimbeyli,Sarıçam,Seyhan,Tufanbeyli,Yumurtalık,Yüreğir
Adıyaman|37.76|38.28|Besni,Çelikhan,Gerger,Gölbaşı,Kahta,Merkez,Samsat,Sincik,Tut
Afyonkarahisar|38.76|30.54|Başmakçı,Bayat,Bolvadin,Çay,Çobanlar,Dazkırı,Dinar,Emirdağ,Evciler,Hocalar,İhsaniye,İscehisar,Kızılören,Merkez,Sandıklı,Sinanpaşa,Sultandağı,Şuhut
Ağrı|39.72|43.05|Diyadin,Doğubayazıt,Eleşkirt,Hamur,Merkez,Patnos,Taşlıçay,Tutak
Amasya|40.65|35.83|Göynücek,Gümüşhacıköy,Hamamözü,Merkez,Merzifon,Suluova,Taşova
Ankara|39.93|32.86|Akyurt,Altındağ,Ayaş,Bala,Beypazarı,Çamlıdere,Çankaya,Çubuk,Elmadağ,Etimesgut,Evren,Gölbaşı,Güdül,Haymana,Kahramankazan,Kalecik,Keçiören,Kızılcahamam,Mamak,Nallıhan,Polatlı,Pursaklar,Sincan,Şereflikoçhisar,Yenimahalle
Antalya|36.89|30.71|Akseki,Aksu,Alanya,Demre,Döşemealtı,Elmalı,Finike,Gazipaşa,Gündoğmuş,İbradı,Kaş,Kemer,Kepez,Konyaaltı,Korkuteli,Kumluca,Manavgat,Muratpaşa,Serik
Artvin|41.18|41.82|Ardanuç,Arhavi,Borçka,Hopa,Kemalpaşa,Merkez,Murgul,Şavşat,Yusufeli
Aydın|37.85|27.84|Bozdoğan,Buharkent,Çine,Didim,Efeler,Germencik,İncirliova,Karacasu,Karpuzlu,Koçarlı,Köşk,Kuşadası,Kuyucak,Nazilli,Söke,Sultanhisar,Yenipazar
Balıkesir|39.65|27.88|Altıeylül,Ayvalık,Balya,Bandırma,Bigadiç,Burhaniye,Dursunbey,Edremit,Erdek,Gömeç,Gönen,Havran,İvrindi,Karesi,Kepsut,Manyas,Marmara,Savaştepe,Sındırgı,Susurluk
Bilecik|40.14|29.98|Bozüyük,Gölpazarı,İnhisar,Merkez,Osmaneli,Pazaryeri,Söğüt,Yenipazar
Bingöl|38.88|40.50|Adaklı,Genç,Karlıova,Kiğı,Merkez,Solhan,Yayladere,Yedisu
Bitlis|38.40|42.11|Adilcevaz,Ahlat,Güroymak,Hizan,Merkez,Mutki,Tatvan
Bolu|40.74|31.61|Dörtdivan,Gerede,Göynük,Kıbrıscık,Mengen,Merkez,Mudurnu,Seben,Yeniçağa
Burdur|37.72|30.29|Ağlasun,Altınyayla,Bucak,Çavdır,Çeltikçi,Gölhisar,Karamanlı,Kemer,Merkez,Tefenni,Yeşilova
Bursa|40.19|29.06|Büyükorhan,Gemlik,Gürsu,Harmancık,İnegöl,İznik,Karacabey,Keles,Kestel,Mudanya,Mustafakemalpaşa,Nilüfer,Orhaneli,Orhangazi,Osmangazi,Yenişehir,Yıldırım
Çanakkale|40.15|26.41|Ayvacık,Bayramiç,Biga,Bozcaada,Çan,Eceabat,Ezine,Gelibolu,Gökçeada,Lapseki,Merkez,Yenice
Çankırı|40.60|33.62|Atkaracalar,Bayramören,Çerkeş,Eldivan,Ilgaz,Kızılırmak,Korgun,Kurşunlu,Merkez,Orta,Şabanözü,Yapraklı
Çorum|40.55|34.95|Alaca,Bayat,Boğazkale,Dodurga,İskilip,Kargı,Laçin,Mecitözü,Merkez,Oğuzlar,Ortaköy,Osmancık,Sungurlu,Uğurludağ
Denizli|37.78|29.09|Acıpayam,Babadağ,Baklan,Bekilli,Beyağaç,Bozkurt,Buldan,Çal,Çameli,Çardak,Çivril,Güney,Honaz,Kale,Merkezefendi,Pamukkale,Sarayköy,Serinhisar,Tavas
Diyarbakır|37.91|40.23|Bağlar,Bismil,Çermik,Çınar,Çüngüş,Dicle,Eğil,Ergani,Hani,Hazro,Kayapınar,Kocaköy,Kulp,Lice,Silvan,Sur,Yenişehir
Edirne|41.68|26.56|Enez,Havsa,İpsala,Keşan,Lalapaşa,Meriç,Merkez,Süloğlu,Uzunköprü
Elazığ|38.67|39.22|Ağın,Alacakaya,Arıcak,Baskil,Karakoçan,Keban,Kovancılar,Maden,Merkez,Palu,Sivrice
Erzincan|39.75|39.49|Çayırlı,İliç,Kemah,Kemaliye,Merkez,Otlukbeli,Refahiye,Tercan,Üzümlü
Erzurum|39.90|41.27|Aşkale,Aziziye,Çat,Hınıs,Horasan,İspir,Karaçoban,Karayazı,Köprüköy,Narman,Oltu,Olur,Palandöken,Pasinler,Pazaryolu,Şenkaya,Tekman,Tortum,Uzundere,Yakutiye
Eskişehir|39.78|30.52|Alpu,Beylikova,Çifteler,Günyüzü,Han,İnönü,Mahmudiye,Mihalgazi,Mihalıççık,Odunpazarı,Sarıcakaya,Seyitgazi,Sivrihisar,Tepebaşı
Gaziantep|37.07|37.38|Araban,İslahiye,Karkamış,Nizip,Nurdağı,Oğuzeli,Şahinbey,Şehitkamil,Yavuzeli
Giresun|40.91|38.39|Alucra,Bulancak,Çamoluk,Çanakçı,Dereli,Doğankent,Espiye,Eynesil,Görele,Güce,Keşap,Merkez,Piraziz,Şebinkarahisar,Tirebolu,Yağlıdere
Gümüşhane|40.46|39.48|Kelkit,Köse,Kürtün,Merkez,Şiran,Torul
Hakkari|37.57|43.74|Çukurca,Derecik,Merkez,Şemdinli,Yüksekova
Hatay|36.20|36.16|Altınözü,Antakya,Arsuz,Belen,Defne,Dörtyol,Erzin,Hassa,İskenderun,Kırıkhan,Kumlu,Payas,Reyhanlı,Samandağ,Yayladağı
Isparta|37.76|30.55|Aksu,Atabey,Eğirdir,Gelendost,Gönen,Keçiborlu,Merkez,Senirkent,Sütçüler,Şarkikaraağaç,Uluborlu,Yalvaç,Yenişarbademli
Mersin|36.81|34.64|Akdeniz,Anamur,Aydıncık,Bozyazı,Çamlıyayla,Erdemli,Gülnar,Mezitli,Mut,Silifke,Tarsus,Toroslar,Yenişehir
İstanbul|41.01|28.98|Adalar,Arnavutköy,Ataşehir,Avcılar,Bağcılar,Bahçelievler,Bakırköy,Başakşehir,Bayrampaşa,Beşiktaş,Beykoz,Beylikdüzü,Beyoğlu,Büyükçekmece,Çatalca,Çekmeköy,Esenler,Esenyurt,Eyüpsultan,Fatih,Gaziosmanpaşa,Güngören,Kadıköy,Kağıthane,Kartal,Küçükçekmece,Maltepe,Pendik,Sancaktepe,Sarıyer,Silivri,Sultanbeyli,Sultangazi,Şile,Şişli,Tuzla,Ümraniye,Üsküdar,Zeytinburnu
İzmir|38.42|27.14|Aliağa,Balçova,Bayındır,Bayraklı,Bergama,Beydağ,Bornova,Buca,Çeşme,Çiğli,Dikili,Foça,Gaziemir,Güzelbahçe,Karabağlar,Karaburun,Karşıyaka,Kemalpaşa,Kınık,Kiraz,Konak,Menderes,Menemen,Narlıdere,Ödemiş,Seferihisar,Selçuk,Tire,Torbalı,Urla
Kars|40.60|43.10|Akyaka,Arpaçay,Digor,Kağızman,Merkez,Sarıkamış,Selim,Susuz
Kastamonu|41.38|33.78|Abana,Ağlı,Araç,Azdavay,Bozkurt,Cide,Çatalzeytin,Daday,Devrekani,Doğanyurt,Hanönü,İhsangazi,İnebolu,Küre,Merkez,Pınarbaşı,Seydiler,Şenpazar,Taşköprü,Tosya
Kayseri|38.73|35.49|Akkışla,Bünyan,Develi,Felahiye,Hacılar,İncesu,Kocasinan,Melikgazi,Özvatan,Pınarbaşı,Sarıoğlan,Sarız,Talas,Tomarza,Yahyalı,Yeşilhisar
Kırklareli|41.73|27.22|Babaeski,Demirköy,Kofçaz,Lüleburgaz,Merkez,Pehlivanköy,Pınarhisar,Vize
Kırşehir|39.15|34.16|Akçakent,Akpınar,Boztepe,Çiçekdağı,Kaman,Merkez,Mucur
Kocaeli|40.77|29.92|Başiskele,Çayırova,Darıca,Derince,Dilovası,Gebze,Gölcük,İzmit,Kandıra,Karamürsel,Kartepe,Körfez
Konya|37.87|32.48|Ahırlı,Akören,Akşehir,Altınekin,Beyşehir,Bozkır,Cihanbeyli,Çeltik,Çumra,Derbent,Derebucak,Doğanhisar,Emirgazi,Ereğli,Güneysınır,Hadim,Halkapınar,Hüyük,Ilgın,Kadınhanı,Karapınar,Karatay,Kulu,Meram,Sarayönü,Selçuklu,Seydişehir,Taşkent,Tuzlukçu,Yalıhüyük,Yunak
Kütahya|39.42|29.98|Altıntaş,Aslanapa,Çavdarhisar,Domaniç,Dumlupınar,Emet,Gediz,Hisarcık,Merkez,Pazarlar,Simav,Şaphane,Tavşanlı
Malatya|38.35|38.31|Akçadağ,Arapgir,Arguvan,Battalgazi,Darende,Doğanşehir,Doğanyol,Hekimhan,Kale,Kuluncak,Pütürge,Yazıhan,Yeşilyurt
Manisa|38.61|27.43|Ahmetli,Akhisar,Alaşehir,Demirci,Gölmarmara,Gördes,Kırkağaç,Köprübaşı,Kula,Salihli,Sarıgöl,Saruhanlı,Selendi,Soma,Şehzadeler,Turgutlu,Yunusemre
Kahramanmaraş|37.58|36.94|Afşin,Andırın,Çağlayancerit,Dulkadiroğlu,Ekinözü,Elbistan,Göksun,Nurhak,Onikişubat,Pazarcık,Türkoğlu
Mardin|37.31|40.74|Artuklu,Dargeçit,Derik,Kızıltepe,Mazıdağı,Midyat,Nusaybin,Ömerli,Savur,Yeşilli
Muğla|37.22|28.36|Bodrum,Dalaman,Datça,Fethiye,Kavaklıdere,Köyceğiz,Marmaris,Menteşe,Milas,Ortaca,Seydikemer,Ula,Yatağan
Muş|38.74|41.49|Bulanık,Hasköy,Korkut,Malazgirt,Merkez,Varto
Nevşehir|38.62|34.71|Acıgöl,Avanos,Derinkuyu,Gülşehir,Hacıbektaş,Kozaklı,Merkez,Ürgüp
Niğde|37.97|34.68|Altunhisar,Bor,Çamardı,Çiftlik,Merkez,Ulukışla
Ordu|40.98|37.88|Akkuş,Altınordu,Aybastı,Çamaş,Çatalpınar,Çaybaşı,Fatsa,Gölköy,Gülyalı,Gürgentepe,İkizce,Kabadüz,Kabataş,Korgan,Kumru,Mesudiye,Perşembe,Ulubey,Ünye
Rize|41.02|40.52|Ardeşen,Çamlıhemşin,Çayeli,Derepazarı,Fındıklı,Güneysu,Hemşin,İkizdere,İyidere,Kalkandere,Merkez,Pazar
Sakarya|40.78|30.40|Adapazarı,Akyazı,Arifiye,Erenler,Ferizli,Geyve,Hendek,Karapürçek,Karasu,Kaynarca,Kocaali,Pamukova,Sapanca,Serdivan,Söğütlü,Taraklı
Samsun|41.29|36.33|Alaçam,Asarcık,Atakum,Ayvacık,Bafra,Canik,Çarşamba,Havza,İlkadım,Kavak,Ladik,Ondokuzmayıs,Salıpazarı,Tekkeköy,Terme,Vezirköprü,Yakakent
Siirt|37.93|41.94|Baykan,Eruh,Kurtalan,Merkez,Pervari,Şirvan,Tillo
Sinop|42.03|35.15|Ayancık,Boyabat,Dikmen,Durağan,Erfelek,Gerze,Merkez,Saraydüzü,Türkeli
Sivas|39.75|37.02|Akıncılar,Altınyayla,Divriği,Doğanşar,Gemerek,Gölova,Gürün,Hafik,İmranlı,Kangal,Koyulhisar,Merkez,Suşehri,Şarkışla,Ulaş,Yıldızeli,Zara
Tekirdağ|40.98|27.51|Çerkezköy,Çorlu,Ergene,Hayrabolu,Kapaklı,Malkara,Marmaraereğlisi,Muratlı,Saray,Süleymanpaşa,Şarköy
Tokat|40.31|36.55|Almus,Artova,Başçiftlik,Erbaa,Merkez,Niksar,Pazar,Reşadiye,Sulusaray,Turhal,Yeşilyurt,Zile
Trabzon|41.00|39.72|Akçaabat,Araklı,Arsin,Beşikdüzü,Çarşıbaşı,Çaykara,Dernekpazarı,Düzköy,Hayrat,Köprübaşı,Maçka,Of,Ortahisar,Sürmene,Şalpazarı,Tonya,Vakfıkebir,Yomra
Tunceli|39.11|39.55|Çemişgezek,Hozat,Mazgirt,Merkez,Nazımiye,Ovacık,Pertek,Pülümür
Şanlıurfa|37.16|38.79|Akçakale,Birecik,Bozova,Ceylanpınar,Eyyübiye,Halfeti,Haliliye,Harran,Hilvan,Karaköprü,Siverek,Suruç,Viranşehir
Uşak|38.68|29.41|Banaz,Eşme,Karahallı,Merkez,Sivaslı,Ulubey
Van|38.50|43.38|Bahçesaray,Başkale,Çaldıran,Çatak,Edremit,Erciş,Gevaş,Gürpınar,İpekyolu,Muradiye,Özalp,Saray,Tuşba
Yozgat|39.82|34.81|Akdağmadeni,Aydıncık,Boğazlıyan,Çandır,Çayıralan,Çekerek,Kadışehri,Merkez,Saraykent,Sarıkaya,Sorgun,Şefaatli,Yenifakılı,Yerköy
Zonguldak|41.45|31.79|Alaplı,Çaycuma,Devrek,Ereğli,Gökçebey,Kilimli,Kozlu,Merkez
Aksaray|38.37|34.03|Ağaçören,Eskil,Gülağaç,Güzelyurt,Merkez,Ortaköy,Sarıyahşi,Sultanhanı
Bayburt|40.26|40.23|Aydıntepe,Demirözü,Merkez
Karaman|37.18|33.22|Ayrancı,Başyayla,Ermenek,Kazımkarabekir,Merkez,Sarıveliler
Kırıkkale|39.85|33.51|Bahşılı,Balışeyh,Çelebi,Delice,Karakeçili,Keskin,Merkez,Sulakyurt,Yahşihan
Batman|37.88|41.13|Beşiri,Gercüş,Hasankeyf,Kozluk,Merkez,Sason
Şırnak|37.52|42.46|Beytüşşebap,Cizre,Güçlükonak,İdil,Merkez,Silopi,Uludere
Bartın|41.63|32.34|Amasra,Kurucaşile,Merkez,Ulus
Ardahan|41.11|42.70|Çıldır,Damal,Göle,Hanak,Merkez,Posof
Iğdır|39.92|44.04|Aralık,Karakoyunlu,Merkez,Tuzluca
Yalova|40.65|29.27|Altınova,Armutlu,Çınarcık,Çiftlikköy,Merkez,Termal
Karabük|41.20|32.62|Eflani,Eskipazar,Merkez,Ovacık,Safranbolu,Yenice
Kilis|36.72|37.12|Elbeyli,Merkez,Musabeyli,Polateli
Osmaniye|37.07|36.25|Bahçe,Düziçi,Hasanbeyli,Kadirli,Merkez,Sumbas,Toprakkale
Düzce|40.84|31.16|Akçakoca,Cumayeri,Çilimli,Gölyaka,Gümüşova,Kaynaşlı,Merkez,Yığılca`;

export const ILLER: Il[] = IL_RAW.split("\n").map((l, i) => {
  const [ad, lat, lon, ilce] = l.split("|");
  return { plaka: String(i + 1).padStart(2, "0"), ad, lat: +lat, lon: +lon, ilceler: ilce.split(",") };
});
export const IL_BY: Record<string, Il> = Object.fromEntries(ILLER.map((i) => [i.ad, i]));
export const ILLER_ALFA = [...ILLER].sort((a, b) => a.ad.localeCompare(b.ad, "tr"));
export const ILCE_SAYISI = ILLER.reduce((t, i) => t + i.ilceler.length, 0);
