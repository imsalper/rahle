/**
 * Rahle (رَحْلَة) — Temel Bilgi ve Veri Tabanı
 * 30 Cüz, Kâri Ses Kaynakları, Namaz Hocası (Rekat & Dualar), 4 Mezhepli Fetva Veritabanı ve Zikir Kütüphanesi
 */

// 1. KÂRİ (SESLENDİRENLER) LİSTESİ
const QARI_LIST = [
  {
    id: "alafasy",
    name: "Mişarî Raşid el-Afasî",
    title: "Kuveyt / Hafs",
    baseUrl: "https://everyayah.com/data/Alafasy_128kbps/"
  },
  {
    id: "abdulbasit",
    name: "Abdülbasit Abdüssamed (Murattal)",
    title: "Mısır / Murattal",
    baseUrl: "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/"
  },
  {
    id: "husary",
    name: "Mahmud Halil el-Husarî",
    title: "Mısır / Tertil Usulü",
    baseUrl: "https://everyayah.com/data/Husary_128kbps/"
  }
];

// 2. 30 CÜZ DETAYLI VERİTABANI
const JUZ_DATABASE = [
  { juz: 1, surahRange: "Fâtiha 1 – Bakara 141", pages: "1 – 21", ayahs: 148, description: "Kur'an'ın açılışı, Fatiha ve Bakara suresi, hidayet ve Hz. İbrahim." },
  { juz: 2, surahRange: "Bakara 142 – Bakara 252", pages: "22 – 41", ayahs: 111, description: "Kıblenin değişmesi, oruç, hac, cihat ve sabır emirleri." },
  { juz: 3, surahRange: "Bakara 253 – Âl-i İmrân 91", pages: "42 – 61", ayahs: 125, description: "Âyetel-Kürsî, infak, faiz yasağı ve Âl-i İmrân girişi." },
  { juz: 4, surahRange: "Âl-i İmrân 92 – Nisâ 23", pages: "62 – 81", ayahs: 131, description: "Uhud Savaşı dersleri, birlik şuuru ve aile hukuku." },
  { juz: 5, surahRange: "Nisâ 24 – Nisâ 147", pages: "82 – 101", ayahs: 124, description: "Kadın hakları, yetimler, miras ve adaletin tesisi." },
  { juz: 6, surahRange: "Nisâ 148 – Mâide 82", pages: "102 – 121", ayahs: 110, description: "Münafıkların vasıfları, helal-haram akitleri ve abdest." },
  { juz: 7, surahRange: "Mâide 83 – En'âm 110", pages: "122 – 141", ayahs: 148, description: "Yeminler, içki-kumar yasağı ve tevhîdin kâinattaki delilleri." },
  { juz: 8, surahRange: "En'âm 111 – A'râf 87", pages: "142 – 161", ayahs: 142, description: "Cahiliye şirk adetleri, Hz. Âdem ve İblis kıssası." },
  { juz: 9, surahRange: "A'râf 88 – Enfâl 40", pages: "162 – 181", ayahs: 159, description: "Peygamberler kıssaları (Nûh, Hûd, Salih, Musa) ve Bedir gazvesi." },
  { juz: 10, surahRange: "Enfâl 41 – Tevbe 93", pages: "182 – 201", ayahs: 127, description: "Ganimet taksimi, müminlerin vasıfları ve Tebük seferi." },
  { juz: 11, surahRange: "Tevbe 94 – Hûd 5", pages: "202 – 221", ayahs: 150, description: "Tevbe eden sahabiler, Yûnus ve Hûd sureleri, sabır." },
  { juz: 12, surahRange: "Hüd 6 – Yûsuf 52", pages: "222 – 241", ayahs: 170, description: "Ahsenü'l-Kasas: Hz. Yusuf'un ibret dolu hayatı ve rüya tabiri." },
  { juz: 13, surahRange: "Yûsuf 53 – İbrâhîm 52", pages: "242 – 261", ayahs: 154, description: "Hz. Yusuf'un Mısır vezirliği, Ra'd (gök gürültüsü) ve İbrahim duası." },
  { juz: 14, surahRange: "Hicr 1 – Nahl 128", pages: "262 – 281", ayahs: 227, description: "Kur'an'ın korunması, kâinattaki nimetler ve bal arısının sırrı." },
  { juz: 15, surahRange: "İsrâ 1 – Kehf 74", pages: "282 – 301", ayahs: 185, description: "İsrâ ve Mirac mucizesi, ana-baba hakkı ve Ashâb-ı Kehf kıssası." },
  { juz: 16, surahRange: "Kehf 75 – Tâhâ 135", pages: "302 – 321", ayahs: 269, description: "Hz. Musa-Hızır, Zülkarneyn, Meryem suresi ve Tâhâ." },
  { juz: 17, surahRange: "Enbiyâ 1 – Hac 78", pages: "322 – 341", ayahs: 190, description: "Hesabın yaklaşması, peygamberlerin duaları ve Hac ibadeti." },
  { juz: 18, surahRange: "Mü'minûn 1 – Furkân 20", pages: "342 – 361", ayahs: 202, description: "Kurtuluşa eren müminlerin vasıfları, Nûr suresi ve iffet." },
  { juz: 19, surahRange: "Furkân 21 – Neml 55", pages: "362 – 381", ayahs: 339, description: "Rahman'ın has kulları, Şuarâ suresi ve Hz. Süleyman ile Hüdhüd." },
  { juz: 20, surahRange: "Neml 56 – Ankebût 45", pages: "382 – 401", ayahs: 171, description: "Belkıs kıssası, Karun'un helaki, örümcek ağı (Ankebût) misali." },
  { juz: 21, surahRange: "Ankebût 46 – Ahzâb 30", pages: "402 – 421", ayahs: 178, description: "Rûm suresinin tefekkür ayetleri, Lokman hekimin nasihatleri ve Secde." },
  { juz: 22, surahRange: "Ahzâb 31 – Yâsîn 27", pages: "422 – 441", ayahs: 169, description: "Ahzâb savaşı, Sebe kavmi, Fâtır ve Yâsîn-i Şerîf girişi." },
  { juz: 23, surahRange: "Yâsîn 28 – Zümer 31", pages: "442 – 461", ayahs: 357, description: "Kur'an'ın kalbi Yâsîn, Sâffât melekleri, Sâd ve Zümer suresi." },
  { juz: 24, surahRange: "Zümer 32 – Fussilet 46", pages: "462 – 481", ayahs: 175, description: "Allah'ın rahmetinden ümit kesmeme, Mü'min suresi ve tevbe." },
  { juz: 25, surahRange: "Fussilet 47 – Câsiye 37", pages: "482 – 501", ayahs: 246, description: "Şûrâ (istişare), Zuhruf, Duhan gecesi ve diz çökenler (Câsiye)." },
  { juz: 26, surahRange: "Ahkâf 1 – Zâriyât 30", pages: "502 – 521", ayahs: 195, description: "Muhammed (s.a.v.) suresi, Fetih müjdesi, Hucurât ahlakı ve Kâf." },
  { juz: 27, surahRange: "Zâriyât 31 – Hadîd 29", pages: "522 – 541", ayahs: 399, description: "Tûr, Necm, Rahmân (nimetler), Vâkıa ve Hadîd (demir)." },
  { juz: 28, surahRange: "Mücâdele 1 – Tahrîm 12", pages: "542 – 561", ayahs: 137, description: "Haşr (Lev enzelnâ), Cuma suresi, Münâfikûn ve Mülk hazırlığı." },
  { juz: 29, surahRange: "Mülk 1 – Mürselât 50", pages: "562 – 581", ayahs: 431, description: "Tebâreke (Mülk), Kalem, Kıyâme, İnsan suresi ve Mürselât." },
  { juz: 30, surahRange: "Nebe 1 – Nâs 6", pages: "582 – 604", ayahs: 564, description: "Amme Cüzü: Nebe, Nâziât, İhlâs, Felak, Nâs ve tüm kısa sureler." }
];

// 3. KARAOKE AYET ÖRNEKLERİ (FÂTİHA VE İHLÂS SÛRELERİ)
const KARAOKE_SURAHS = {
  1: {
    number: 1,
    name: "Fâtiha Sûresi",
    arabicName: "الفاتحة",
    verses: [
      {
        verseNumber: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        turkish: "Rahmân ve Rahîm olan Allah'ın ismiyle.",
        fileCode: "001001.mp3"
      },
      {
        verseNumber: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        turkish: "Hamd, âlemlerin Rabbi olan Allah'a mahsustur.",
        fileCode: "001002.mp3"
      },
      {
        verseNumber: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        turkish: "O, Rahmândır ve Rahîmdir.",
        fileCode: "001003.mp3"
      },
      {
        verseNumber: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        turkish: "Ceza ve hesap gününün yegâne mâlikidir.",
        fileCode: "001004.mp3"
      },
      {
        verseNumber: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        turkish: "Yalnız sana ibadet eder ve yalnız senden yardım dileriz.",
        fileCode: "001005.mp3"
      },
      {
        verseNumber: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        turkish: "Bizi dosdoğru yola ilet.",
        fileCode: "001006.mp3"
      },
      {
        verseNumber: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        turkish: "Kendilerine lütuf ve ikramda bulunduğun kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil. (Âmin)",
        fileCode: "001007.mp3"
      }
    ]
  },
  112: {
    number: 112,
    name: "İhlâs Sûresi",
    arabicName: "الإخلاص",
    verses: [
      {
        verseNumber: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        turkish: "De ki: O Allah tektir.",
        fileCode: "112001.mp3"
      },
      {
        verseNumber: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        turkish: "Allah Samed'dir (her şey O'na muhtaç, O hiçbir şeye muhtaç değildir).",
        fileCode: "112002.mp3"
      },
      {
        verseNumber: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        turkish: "O doğurmamış ve doğmamıştır.",
        fileCode: "112003.mp3"
      },
      {
        verseNumber: 4,
        arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        turkish: "Hiçbir şey O'na denk ve benzer değildir.",
        fileCode: "112004.mp3"
      }
    ]
  }
};

// 4. ZİKİR KÜTÜPHANESİ
const DEFAULT_DHIKRS = [
  {
    id: "subhanallah",
    name: "Sübhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    meaning: "Allah her türlü noksan ve kusurdan münezzehtir.",
    virtue: "'Günde yüz defa Sübhanallah diyenin deniz köpüğü kadar günahı olsa bağışlanır.' (Buhari)",
    defaultTarget: 33,
    category: "tesbihat"
  },
  {
    id: "elhamdulillah",
    name: "Elhamdülillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    meaning: "Bütün hamd ve şükürler yalnızca Allah'a aittir.",
    virtue: "'Elhamdülillah mizanı doldurur.' (Müslim)",
    defaultTarget: 33,
    category: "tesbihat"
  },
  {
    id: "allahuekber",
    name: "Allahu Ekber",
    arabic: "اللَّهُ أَكْبَرُ",
    meaning: "Allah en büyüktür; büyüklüğü ölçüye gelmez.",
    virtue: "Namazın ve kainatın en yüce tekbiri.",
    defaultTarget: 34,
    category: "tesbihat"
  },
  {
    id: "kelimeitevhid",
    name: "Lâ ilâhe illallâh",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    meaning: "Allah'tan başka hiçbir ilah yoktur.",
    virtue: "'Zikrin en faziletlisi Lâ ilâhe illallâh'tır.' (Tirmizi)",
    defaultTarget: 100,
    category: "tevhid"
  },
  {
    id: "istigfar",
    name: "Estağfirullah el-Azîm",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ",
    meaning: "Yüce Allah'tan bağışlanma dilerim.",
    virtue: "'Kim istiğfara sarılırsa Allah ona her darlıktan çıkış verir.' (Ebu Davud)",
    defaultTarget: 100,
    category: "tovbe"
  },
  {
    id: "salavat",
    name: "Salavat-ı Şerife",
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ",
    meaning: "Allah'ım! Efendimiz Muhammed'e ve ehline rahmet eyle.",
    virtue: "'Bana bir salat getirene Allah on rahmet eder.' (Müslim)",
    defaultTarget: 100,
    category: "salavat"
  },
  {
    id: "lahavle",
    name: "Lâ havle velâ kuvvete illâ billâh",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    meaning: "Güç ve kuvvet ancak şanı yüce Allah'ındır.",
    virtue: "'Cennet hazinelerinden paha biçilmez bir hazinedir.' (Buhari)",
    defaultTarget: 100,
    category: "dua"
  }
];

// 5. NAMAZ HOCASI (REKAT REKAT REHBER, DUALAR VE SURELER)
const NAMAZ_DATABASE = {
  vakitler: [
    {
      id: "sabah",
      name: "Sabah Namazı",
      totalRekat: 4,
      parts: [
        { name: "2 Rekat Sünnet", rekatCount: 2, type: "sunnet" },
        { name: "2 Rekat Farz", rekatCount: 2, type: "farz" }
      ],
      description: "Günün ilk bereketi, fecr vaktinden güneş doğana kadar kılınır.",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "ogle",
      name: "Öğle Namazı",
      totalRekat: 10,
      parts: [
        { name: "4 Rekat İlk Sünnet", rekatCount: 4, type: "sunnet" },
        { name: "4 Rekat Farz", rekatCount: 4, type: "farz" },
        { name: "2 Rekat Son Sünnet", rekatCount: 2, type: "sunnet" }
      ],
      description: "Güneşin zeval vaktinden ikindiye kadar kılınır."
    },
    {
      id: "ikindi",
      name: "İkindi Namazı",
      totalRekat: 8,
      parts: [
        { name: "4 Rekat Sünnet", rekatCount: 4, type: "sunnet" },
        { name: "4 Rekat Farz", rekatCount: 4, type: "farz" }
      ],
      description: "Güneş sararmadan önceki orta namazdır (Salât-ı Vustâ)."
    },
    {
      id: "aksam",
      name: "Akşam Namazı",
      totalRekat: 5,
      parts: [
        { name: "3 Rekat Farz", rekatCount: 3, type: "farz" },
        { name: "2 Rekat Sünnet", rekatCount: 2, type: "sunnet" }
      ],
      description: "Güneş battıktan sonra kılınır; farzı sünnetinden önce eda edilir."
    },
    {
      id: "yatsi",
      name: "Yatsı Namazı + Vitir",
      totalRekat: 13,
      parts: [
        { name: "4 Rekat İlk Sünnet", rekatCount: 4, type: "sunnet" },
        { name: "4 Rekat Farz", rekatCount: 4, type: "farz" },
        { name: "2 Rekat Son Sünnet", rekatCount: 2, type: "sunnet" },
        { name: "3 Rekat Vitir Vacip", rekatCount: 3, type: "vacip" }
      ],
      description: "Şafak kaybolduktan imsak vaktine kadar eda edilir."
    }
  ],

  // 2 Rekatlık Farz Namazın Rekat Rekat Adımları
  rekatAdimlari: [
    {
      rekat: 1,
      baslik: "1. Rekat",
      adimlar: [
        {
          adimNo: 1,
          isim: "Niyet & İftitah Tekbiri",
          erkekDuruş: "Eller kulak memesi hizasına kaldırılır, avuç içleri kıbleye bakar. 'Allahu Ekber' denir.",
          kadinDuruş: "Eller göğüs hizasına kaldırılır, avuç içleri kıbleye bakar. 'Allahu Ekber' denir.",
          duaId: "tekbir"
        },
        {
          adimNo: 2,
          isim: "Kıyam (Ayakta Duruş & Kıraat)",
          erkekDuruş: "Sağ el sol elin bileğini kavrayarak göbek altında bağlanır. Gözler secde yerine bakar.",
          kadinDuruş: "Sağ el sol elin üzerine konularak göğüs üzerinde bağlanır.",
          okunacaklar: ["Sübhaneke Duası", "Eûzü-Besmele", "Fâtiha-i Şerîfe", "Zamm-ı Sûre (Örn: İhlâs Sûresi)"]
        },
        {
          adimNo: 3,
          isim: "Rükû (Eğilme)",
          erkekDuruş: "Sırt düz, bacaklar gergin, eller diz kapaklarını kavrar. 3 defa 'Sübhâne Rabbiye'l-Azîm' denir.",
          kadinDuruş: "Kollar ve sırt hafif eğik, dizler hafif bükük durulur. 3 defa 'Sübhâne Rabbiye'l-Azîm' denir.",
          okunacaklar: ["Semiallahü limen hamideh (Doğrulurken)", "Rabbenâ leke'l-hamd (Ayakta)"]
        },
        {
          adimNo: 4,
          isim: "Secde (2 Defa)",
          erkekDuruş: "Önce dizler, sonra eller, alın ve burun yere konur. Kollar yere yapışmaz, ayak parmakları kıbleye bakar. 3 defa 'Sübhâne Rabbiye'l-A'lâ' denir.",
          kadinDuruş: "Kollar vücuda ve yere yapışık, daha toplu ve alçak durulur. 3 defa 'Sübhâne Rabbiye'l-A'lâ' denir."
        }
      ]
    },
    {
      rekat: 2,
      baslik: "2. Rekat ve Ka'de (Oturuş)",
      adimlar: [
        {
          adimNo: 1,
          isim: "Kıyam (2. Rekat Başlangıcı)",
          aciklama: "Secdeden 'Allahu Ekber' diyerek doğrudan ayağa kalkılır. Besmele çekilir, Fatiha ve Zamm-ı Sure okunur."
        },
        {
          adimNo: 2,
          isim: "Rükû ve Secdeler",
          aciklama: "1. Rekattaki gibi Rükû ve 2 secde eksiksiz tekrarlanır."
        },
        {
          adimNo: 3,
          isim: "Ka'de-i Âhire (Son Oturuş & Selâm)",
          erkekDuruş: "Sol ayak yatırılarak üzerine oturulur, sağ ayak parmakları kıbleye dikilir. Eller dizlerdedir.",
          kadinDuruş: "Ayaklar sağ tarafa yatırılarak kalça üzerine oturulur (Teverrük).",
          okunacaklar: ["Ettehiyyâtü", "Allâhümme Salli & Allâhümme Bârik", "Rabbenâ Âtinâ & Rabbenagfirlî", "Önce sağa, sonra sola selâm: 'Esselâmü aleyküm ve rahmetullâh'"]
        }
      ]
    }
  ],

  // Namazda Okunan Temel Dua Metinleri
  dualar: [
    {
      id: "subhaneke",
      name: "Sübhaneke Duası",
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ",
      okunus: "Sübhânekellâhümme ve bi hamdik ve tebârakesmük ve teâlâ ceddük ve lâ ilâhe gayrük.",
      meal: "Allah'ım! Sen her türlü eksiklikten münezzehsin, sana hamdederim. Senin ismin mübarektir, şanın pek yücedir ve senden başka hiçbir ilah yoktur."
    },
    {
      id: "ettehiyyatu",
      name: "Ettehiyyâtü Duası",
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      okunus: "Ettehiyyâtü lillâhi ve's-salavâtü ve't-tayyibât. Esselâmü aleyke eyyühe'n-nebiyyü ve rahmetullâhi ve berekâtüh. Esselâmü aleynâ ve alâ ibâdillâhi's-salihîn. Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve resûlüh.",
      meal: "Bütün dualar, övgüler, ibadetler ve iyilikler Allah içindir. Ey Peygamber! Selâm, Allah'ın rahmeti ve bereketleri senin üzerine olsun. Selâm bizim ve Allah'ın salih kullarının üzerine olsun. Şahitlik ederim ki Allah'tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed O'nun kulu ve elçisidir."
    },
    {
      id: "sallibarik",
      name: "Salli ve Bârik Duaları",
      arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      okunus: "Allâhümme salli alâ Muhammedin ve alâ âli Muhammed kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm inneke hamîdün mecîd.",
      meal: "Allah'ım! İbrahim'e ve İbrahim'in ailesine rahmet ettiğin gibi Muhammed'e ve Muhammed'in ailesine de rahmet eyle. Şüphesiz Sen övülmeye layık ve şanı yüce olansın."
    },
    {
      id: "rabbena",
      name: "Rabbenâ Duaları",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      okunus: "Rabbenâ âtinâ fi'd-dünyâ haseneten ve fi'l-âhireti haseneten ve kınâ azâbe'n-nâr.",
      meal: "Rabbimiz! Bize dünyada da iyilik ve güzellik ver, ahirette de iyilik ve güzellik ver. Bizi cehennem ateşinin azabından koru."
    },
    {
      id: "kunut",
      name: "Kunut Duası (Vitir Namazı)",
      arabic: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ",
      okunus: "Allâhümme innâ nesteînüke ve nestağfirüke ve nestehdîke ve nü'minü bike ve netûbü ileyk...",
      meal: "Allah'ım! Sen'den yardım dileriz, Sen'den bağışlanma ve hidayet dileriz. Sana iman eder, Sana tevbe ederiz..."
    }
  ]
};

// 6. 4 MEZHEPLİ AI FETVA VERİTABANI (RAG BİLGİ BANKASI)
const FIQH_DATABASE = [
  {
    keywords: ["kan", "abdest", "kanama", "vücuttan kan", "kan akması", "yara"],
    question: "Vücuttan kan akması abdesti bozar mı?",
    rulings: {
      hanefi: {
        ruling: "ABDEST BOZULUR",
        status: "caiz_degil",
        explanation: "Yaradan veya vücudun herhangi bir yerinden çıkan kan, akıcı olup yaranın kenarını aşarsa abdest bozulur. İğne ucu kadar kalıp dağılmayan kan bozmaz.",
        sources: [
          { book: "el-Mültekâ & el-Hidâye", author: "Merğinânî", detail: "Kitâbü't-Tahâre, Cilt 1" },
          { book: "İbn Mâce & Dârekutnî Hadisi", author: "Hz. Aişe rivayeti", detail: "'Kimin burnu kanarsa veya kan akarsa gidip abdest tazelesin.'", grade: "Hasen / Sahih lighayrihî" }
        ]
      },
      safii: {
        ruling: "ABDEST BOZULMAZ",
        status: "caiz",
        explanation: "Ön ve arka avret mahalleri dışındaki vücudun herhangi bir yerinden kan, irin veya cerahat çıkması ne kadar çok olursa olsun abdesti bozmaz.",
        sources: [
          { book: "el-Ümm & el-Mecmû'", author: "İmam Şâfiî, İmam Nevevî", detail: "Taharet Bölümü, Cilt 2" },
          { book: "Buhari (Muallak) & Ebu Davud", author: "Cabir b. Abdullah rivayeti", detail: "Zâtü'r-Rikâ gazvesinde ensardan bir sahabi vücuduna üç ok isabet edip kanlar aktığı halde namazına devam etmiştir.", grade: "Sahih" }
        ]
      },
      maliki: {
        ruling: "ABDEST BOZULMAZ (MÜSTEHAP ABDEST ALMAK)",
        status: "caiz",
        explanation: "Vücuttan çıkan kan, iltihap ve benzeri sıvılar iki tabii yol dışından çıktığı için abdesti bozmaz. Ancak kanayan yerin yıkanması ve temizlenmesi menduptur.",
        sources: [
          { book: "el-Müdevvene & Muhtasaru Halîl", author: "İmam Mâlik", detail: "Abdesti Bozan Haller bahsi" }
        ]
      },
      hanbeli: {
        ruling: "ÇOK İSE BOZAR, AZ İSE BOZMAZ",
        status: "sartli",
        explanation: "Vücuttan çıkan kan çok miktarda ve fahiş ise abdesti bozar; az miktarda ise örfe göre affedilir ve abdest bozulmaz.",
        sources: [
          { book: "el-Muğnî", author: "İbn Kudâme", detail: "Cilt 1, s. 234" }
        ]
      }
    }
  },
  {
    keywords: ["deniz", "karides", "kalamar", "midye", "ıstakoz", "yengeç", "deniz ürünleri", "balık"],
    question: "Balık dışındaki deniz canlılarını (karides, midye, kalamar vb.) yemek caiz midir?",
    rulings: {
      hanefi: {
        ruling: "YALNIZCA BALIK ŞEKLİNDE OLANLAR HELÂLDİR; DİĞERLERİ TAHRÎMEN MEKRÛH / CAİZ DEĞİL",
        status: "mekruh",
        explanation: "Hanefi mezhebine göre deniz canlılarından yalnızca 'semek' (balık) türüne girenler helaldir. Midye, kalamar, karides, ıstakoz ve ahtapot balık suretinde olmadığından ve haşerata benzediğinden yenmesi helal görülmemiştir.",
        sources: [
          { book: "Bedâiu's-Sanâi'", author: "Kâsânî", detail: "Zebâih Bölümü, Cilt 5, s. 35" },
          { book: "Ayet: A'râf Suresi 157", author: "Kur'an-ı Kerim", detail: "'...Onlara pis ve murdar şeyleri (habâis) haram kılar.'", grade: "Âyet-i Kerîme" }
        ]
      },
      safii: {
        ruling: "TAMAMI HELÂLDİR VE CAİZDİR",
        status: "caiz",
        explanation: "Denizde yaşayan ve sadece suda barınabilen her türlü deniz canlısı (balık, midye, karides, kalamar, ıstakoz) temiz ve helaldir. Boğazlanmaya ihtiyaç olmaksızın yenebilir.",
        sources: [
          { book: "el-Mecmû' Şerhu'l-Mühezzeb", author: "İmam Nevevî", detail: "Yiyecekler Bahsi, Cilt 9" },
          { book: "Hadis: Mâide Suresi 96 & Ebu Davud", author: "Peygamber Efendimiz (s.a.v.)", detail: "'Denizin suyu temiz, ölüsü (avı) ise helaldir.'", grade: "Sahih Hadis (Tirmizi, Ebu Davud)" }
        ]
      },
      maliki: {
        ruling: "TAMAMI HELÂLDİR",
        status: "caiz",
        explanation: "Deniz canlılarının hepsi (köpekbalığı, yunus, kabuklular dahil) istisnasız helaldir. Sadece denizde yaşayan canlılar için hiçbir kısıtlama yoktur.",
        sources: [
          { book: "eş-Şerhu'l-Kebîr", author: "Derdîr", detail: "Helaller Bölümü" }
        ]
      },
      hanbeli: {
        ruling: "TİMSAH VE ZEHİRLİ OLANLAR HARİÇ TAMAMI HELÂLDİR",
        status: "caiz",
        explanation: "Karides, midye, kalamar helaldir. Sadece hem karada hem suda yaşayan kurbağa ve timsah gibi yırtıcı olanlar istisnadır.",
        sources: [
          { book: "el-İnsâf & el-Muğnî", author: "Merdâvî, İbn Kudâme", detail: "Etler Bölümü" }
        ]
      }
    }
  },
  {
    keywords: ["kaza", "namaz", "kaza namazı", "terk", "kılınmayan namazlar"],
    question: "Geçmişte kılınmayan namazların kazası gerekir mi, yoksa sadece tevbe yeterli midir?",
    rulings: {
      hanefi: {
        ruling: "KAZA EDİLMESİ KESİNLİKLE FARZDIR",
        status: "farz",
        explanation: "Kasten veya unutarak kılınmayan namazların kazası farzdır. Namaz borcu zimmette kalır; tevbe etmekle kaza borcu düşmez, her ikisi de lazımdır.",
        sources: [
          { book: "Reddü'l-Muhtâr (İbn Âbidîn)", author: "İbn Âbidîn", detail: "Salâtü'l-Fevâit Bahsi" },
          { book: "Hadis-i Şerif", author: "Buhari & Müslim", detail: "'Kim bir namazı unutur veya uyuyup kalırsa, hatırladığında onu kılsın; onun kefareti ancak budur.'", grade: "Müttefekun Aleyh (Sahih)" }
        ]
      },
      safii: {
        ruling: "VAKİT KAYBETMEKSİZİN KAZA ETMEK FARZDIR",
        status: "farz",
        explanation: "Namazı mazeretsiz terk eden kişinin, tüm nafileleri bırakıp bir an evvel geçmiş namazlarını kaza etmesi en öncelikli farzdır.",
        sources: [
          { book: "Minhâcü't-Tâlibîn", author: "İmam Nevevî", detail: "Kitabü's-Salat" }
        ]
      },
      maliki: {
        ruling: "GÜCÜ YETTİKÇE HER GÜN KAZA KILMAK FARZDIR",
        status: "farz",
        explanation: "Kişi günlük yaşamını ve geçimini aksatmayacak şekilde düzenli olarak kaza namazı kılmakla mükelleftir.",
        sources: [
          { book: "Hâşiyetü'd-Dusûkî", author: "Dusûkî", detail: "Cilt 1" }
        ]
      },
      hanbeli: {
        ruling: "DÖRT MEZHEBİN İTTİFAKIYLA KAZASI ŞARTTIR",
        status: "farz",
        explanation: "Zimmet ancak kaza ile temizlenir; tevbe geçmiş borcu ortadan kaldırmaz.",
        sources: [
          { book: "el-Muğnî", author: "İbn Kudâme", detail: "Fevât Bahsi" }
        ]
      }
    }
  },
  {
    keywords: ["oruç", "unutup", "yemek", "içmek", "unutarak", "bozulur mu"],
    question: "Oruçlu olduğunu unutarak bir şey yiyip içmek orucu bozar mı?",
    rulings: {
      hanefi: {
        ruling: "ORUÇ BOZULMAZ, DEVAM EDİLİR",
        status: "caiz",
        explanation: "Unutarak yiyip içen kimsenin orucu bozulmaz. Hatırladığı anda hemen ağzındakini çıkarıp ağzını çalkalamalı ve orucuna devam etmelidir.",
        sources: [
          { book: "el-Hidâye", author: "Merğinânî", detail: "Savm Bölümü" },
          { book: "Buhari & Müslim Hadisi", author: "Ebu Hureyre rivayeti", detail: "'Oruçlu olduğunu unutarak yiyip içen kimse orucunu tamamlasın. Çünkü onu Allah yedirmiş ve içirmiştir.'", grade: "Sahih (Müttefekun Aleyh)" }
        ]
      },
      safii: {
        ruling: "ORUÇ BOZULMAZ",
        status: "caiz",
        explanation: "Unutarak yapılan fiillerde oruç sahihtir, kaza veya kefaret gerekmez.",
        sources: [
          { book: "Muğni'l-Muhtâc", author: "Hatîb eş-Şirbînî", detail: "Oruç Bahsi" }
        ]
      },
      maliki: {
        ruling: "FARZ ORUÇTA KAZA GEREKİR (MEZHEPTEKİ MEŞHUR GÖRÜŞ)",
        status: "sartli",
        explanation: "Maliki mezhebinde unutarak yemek yiyen kimsenin o günkü orucunu akşama kadar tutması, ancak Ramazan'dan sonra o günü kaza etmesi vaciptir.",
        sources: [
          { book: "el-Kavânînü'l-Fıkhiyye", author: "İbn Cüzey", detail: "Orucu Bozan Şeyler" }
        ]
      },
      hanbeli: {
        ruling: "ORUÇ KESİNLİKLE BOZULMAZ",
        status: "caiz",
        explanation: "Hadis-i şerifin açık lafzı gereğince oruç geçerlidir, kaza gerekmez.",
        sources: [
          { book: "el-Muğnî", author: "İbn Kudâme", detail: "Savm Bölümü" }
        ]
      }
    }
  }
];

// 7. GÜNÜN MANEVİ BİLGİ VE HADİS KÖŞESİ
const DAILY_INSPIRATIONS = [
  {
    verse: "Bilesiniz ki, kalpler ancak Allah'ı anmakla huzur ve sükûna kavuşur.",
    source: "Ra'd Sûresi, 28. Âyet",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
  },
  {
    verse: "Öyleyse beni anın ki ben de sizi anayım. Bana şükredin, nankörlük etmeyin.",
    source: "Bakara Sûresi, 152. Âyet",
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ"
  },
  {
    verse: "Namazı dosdoğru kılın; çünkü namaz, insanı hayasızlıktan ve kötülükten alıkoyar.",
    source: "Ankebût Sûresi, 45. Âyet",
    arabic: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ"
  }
];

// 8. HATİM DUASI METNİ
const HATIM_DUASI = {
  arabic: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ
اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ.
اَللّٰهُمَّ رَبَّنَا تَقَبَّلْ مِنَّا، إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ. وَتُبْ عَلَيْنَا يَا مَوْلَانَا، إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ.
اَللّٰهُمَّ اجْعَلِ الْقُرْآنَ لَنَا فِي الدُّنْيَا قَرِينًا، وَفِي الْقَبْرِ مُؤْنِسًا، وَفِي الْقِيَامَةِ شَفِيعًا، وَعَلَى الصِّرَاطِ نُورًا، وَإِلَى الْجَنَّةِ رَفِيقًا.
آمِينَ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ.`,
  turkish: `Rahman ve Rahim olan Allah'ın adıyla.
Âlemlerin Rabbi olan Allah'a hamdolsun. Salât ve selâm Efendimiz Hazreti Muhammed'e, onun âline ve ashabına olsun.
Allah'ım! Okuduğumuz hatm-i şerifi dergâh-ı izzetinde kabul eyle. Sen duaları hakkıyla işiten ve bilensin.
Allah'ım! Yüce Kur'an'ı dünyada bize yoldaş, kabirde can dostu, kıyamet gününde şefaatçi, sırat köprüsünde aydınlık ve cennete ulaştıran mukaddes bir nur eyle.
Dualarımızı kabul eyle ey merhametlilerin en merhametlisi olan Allah'ım! Âmin.`
};
