import { useState, useEffect, useCallback } from 'react';
import {
  Star, ChevronRight, ChevronLeft, RotateCcw,
  Eye, HelpCircle, CheckCircle2,
  XCircle, Globe, Compass, CloudRain, Zap,
  TreePine, Sun, ArrowRight, Sparkles,
  Users, MapPin,
  Recycle, Layers, Pencil, Shuffle
} from 'lucide-react';

// ============ TYPES ============
type Page = 'home' | 'topic';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface MatchPair {
  left: string;
  right: string;
}

interface TrueFalseQuestion {
  statement: string;
  answer: boolean;
}

interface MissingWord {
  sentence: string;
  answer: string;
  hint: string;
}

interface TopicData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  videoUrl?: string; // YouTube video URL
  facts: string[];
  quiz: QuizQuestion[];
  match: MatchPair[];
  truefalse: TrueFalseQuestion[];
  missing: MissingWord[];
}

// ============ DATA ============
const topicsData: TopicData[] = [
  {
    id: 1,
    title: "Men haqimda",
    subtitle: "O'zimni o'rganaman",
    description: "Har bir inson o'ziga xos va betakrordir. O'zimiz haqimizda ko'proq bilib olamiz!",
    image: "/images/topic1.jpg",
    color: "#FF6B6B",
    gradient: "from-rose-400 to-orange-400",
    icon: <Users className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Har bir insonning ismi va familiyasi bor",
      "Inson dunyodagi eng buyuk mo'jizadir",
      "Har bir inson o'ziga xos va betakrordir",
      "Biz har xilmiz, lekin tengmiz",
      "O'z fikrimizni bildirishni o'rganishimiz kerak"
    ],
    quiz: [
      { question: "Men kimman?", options: ["O'quvchi", "Daraxt", "Kitob"], correct: 0 },
      { question: "Men qayerda o'qiyman?", options: ["Maktabda", "Bog'da", "Bozorda"], correct: 0 },
      { question: "Insonning ichki olami qanday?", options: ["Ajoyib va murakkab", "Oddiy", "Bo'sh"], correct: 0 },
      { question: "Har bir inson qanday?", options: ["O'ziga xos va betakrordir", "Bir xil", "O'xshash"], correct: 0 },
      { question: "Barcha bolalar...", options: ["Teng", "Farq qiladi", "Har xil"], correct: 0 }
    ],
    match: [
      { left: "Ism", right: "Insonning nomi" },
      { left: "Familiya", right: "Oilaviy nom" },
      { left: "Yosh", right: "Tug'ilgan sanadan" },
      { left: "Sinf", right: "Maktabdagi o'rni" },
      { left: "Do'st", right: "Yaxshi o'rtoq" }
    ],
    truefalse: [
      { statement: "Har bir inson o'ziga xosdir", answer: true },
      { statement: "Barcha odamlar bir xil", answer: false },
      { statement: "O'z fikrimizni aytishimiz kerak", answer: true },
      { statement: "Boshqalarni hurmat qilish shart emas", answer: false },
      { statement: "Biz har xilmiz, lekin tengmiz", answer: true }
    ],
    missing: [
      { sentence: "Har bir inson __ va betakrordir.", answer: "o'ziga xos", hint: "O'ziga xos / bir xil" },
      { sentence: "Inson dunyodagi eng buyuk __.", answer: "mo'jizadir", hint: "mo'jizadir / narsa" },
      { sentence: "Biz har xilmiz, lekin __.", answer: "tengmiz", hint: "tengmiz / farq qilamiz" },
      { sentence: "O'z fikrimizni __ kerak.", answer: "bildirishimiz", hint: "bildirishimiz / yashirishimiz" },
      { sentence: "Barcha bolalar __.", answer: "teng", hint: "teng / har xil" }
    ]
  },
  {
    id: 2,
    title: "Sezgi a'zolari",
    subtitle: "5 ta sodiq yordamchi",
    description: "Ko'rish, eshitish, hid bilish, ta'm bilish va sezish - bizning 5 ta sezgi a'zolarimiz!",
    image: "/images/topic2.jpg",
    color: "#4ECDC4",
    gradient: "from-teal-400 to-cyan-400",
    icon: <Eye className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Ko'z - ko'rish a'zosi, atrofimizni ko'rishimiz uchun",
      "Quloq - eshitish a'zosi, tovushlarni eshitishimiz uchun",
      "Burun - hid bilish a'zosi, hidlarni sezishimiz uchun",
      "Til - ta'm bilish a'zosi, ta'mlarni ajratishimiz uchun",
      "Teri - sezish a'zosi, issiq-sovuqni his qilishimiz uchun"
    ],
    quiz: [
      { question: "Ko'z nima uchun kerak?", options: ["Ko'rish uchun", "Eshitish uchun", "Hid bilish uchun"], correct: 0 },
      { question: "Quloq nima uchun kerak?", options: ["Eshitish uchun", "Ta'm bilish uchun", "Ushlash uchun"], correct: 0 },
      { question: "Burun nima uchun kerak?", options: ["Hid bilish uchun", "Ko'rish uchun", "Yugurish uchun"], correct: 0 },
      { question: "Til nima uchun kerak?", options: ["Ta'm bilish uchun", "Ko'rish uchun", "Eshitish uchun"], correct: 0 },
      { question: "Teri nima uchun kerak?", options: ["Sezish uchun", "Gapirish uchun", "Ko'rish uchun"], correct: 0 }
    ],
    match: [
      { left: "Ko'z", right: "Ko'rish" },
      { left: "Quloq", right: "Eshitish" },
      { left: "Burun", right: "Hid bilish" },
      { left: "Til", right: "Ta'm bilish" },
      { left: "Teri", right: "Sezish" }
    ],
    truefalse: [
      { statement: "Ko'z bilan ko'ramiz", answer: true },
      { statement: "Quloq bilan yuguramiz", answer: false },
      { statement: "Burun bilan hid bilamiz", answer: true },
      { statement: "Til bilan eshitamiz", answer: false },
      { statement: "Teri bilan issiq-sovuqni sezamiz", answer: true }
    ],
    missing: [
      { sentence: "Ko'z __ a'zosidir.", answer: "ko'rish", hint: "ko'rish / eshitish" },
      { sentence: "Quloq __ a'zosidir.", answer: "eshitish", hint: "eshitish / ko'rish" },
      { sentence: "Burun bilan __ bilamiz.", answer: "hid", hint: "hid / ta'm" },
      { sentence: "Til __ bilish a'zosidir.", answer: "ta'm", hint: "ta'm / hid" },
      { sentence: "Teri bilan __ sezamiz.", answer: "issiq-sovuq", hint: "issiq-sovuq / ovoz" }
    ]
  },
  {
    id: 3,
    title: "Yer va koinot",
    subtitle: "Kosmosni kashf etamiz",
    description: "Yer - bizning go'zal uyimiz! Quyosh tizimidagi 8 ta sayyorani o'rganamiz.",
    image: "/images/topic3.jpg",
    color: "#667eea",
    gradient: "from-indigo-500 to-purple-600",
    icon: <Globe className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Yer - Quyosh tizimidagi 3-sayyora",
      "Quyosh tizimida 8 ta sayyora bor",
      "Yer - hayot mavjud bo'lgan yagona sayyora",
      "Oy - Yerning tabiiy yo'ldoshi",
      "Bir yil - 365 kun, Yer Quyosh atrofini to'liq aylanadi"
    ],
    quiz: [
      { question: "Yer qaysi tizimga kiradi?", options: ["Quyosh tizimi", "Yulduzlar tizimi", "Galaktika"], correct: 0 },
      { question: "Yerning tabiiy yo'ldoshi qaysi?", options: ["Oy", "Mars", "Quyosh"], correct: 0 },
      { question: "Qizil sayyora deb qaysi ataladi?", options: ["Mars", "Saturn", "Venera"], correct: 0 },
      { question: "Eng katta sayyora qaysi?", options: ["Yupiter", "Merkuriy", "Yer"], correct: 0 },
      { question: "Yer Quyosh atrofini necha kunda aylanadi?", options: ["365 kun", "24 soat", "88 kun"], correct: 0 }
    ],
    match: [
      { left: "Yer", right: "Hayot mavjud sayyora" },
      { left: "Oy", right: "Yerning yo'ldoshi" },
      { left: "Quyosh", right: "Issiqlik va yorug'lik manbai" },
      { left: "Saturn", right: "Halqali sayyora" },
      { left: "Mars", right: "Qizil sayyora" }
    ],
    truefalse: [
      { statement: "Yer Quyosh atrofida aylanadi", answer: true },
      { statement: "Oy mustaqil sayyora", answer: false },
      { statement: "Quyosh yulduzdir", answer: true },
      { statement: "Saturnning halqasi yo'q", answer: false },
      { statement: "Yupiter gigant sayyoradir", answer: true }
    ],
    missing: [
      { sentence: "Yer __ tizimiga kiradi.", answer: "Quyosh", hint: "Quyosh / Yulduz" },
      { sentence: "Yerning tabiiy yo'ldoshi __.", answer: "Oy", hint: "Oy / Mars" },
      { sentence: "Eng katta sayyora __.", answer: "Yupiter", hint: "Yupiter / Yer" },
      { sentence: "Qizil sayyora __ deb ataladi.", answer: "Mars", hint: "Mars / Venera" },
      { sentence: "Quyosh __ hisoblanadi.", answer: "yulduz", hint: "yulduz / sayyora" }
    ]
  },
  {
    id: 4,
    title: "Materiklar",
    subtitle: "Dunyo bo'ylab sayohat",
    description: "Yer yuzida 6 ta katta materik bor. Ularni birma-bir o'rganamiz!",
    image: "/images/topic4.jpg",
    color: "#FF9F1C",
    gradient: "from-amber-400 to-orange-500",
    icon: <MapPin className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Yer yuzida 6 ta yirik materik bor",
      "Eng katta materik - Yevrosiyo",
      "Eng kichik materik - Avstraliya",
      "Antarktida butunlay muz bilan qoplangan",
      "Afrika issiq materik, u yerda fillar va jirafalar yashaydi"
    ],
    quiz: [
      { question: "Yer yuzida nechta materik bor?", options: ["5 ta", "6 ta", "8 ta"], correct: 1 },
      { question: "Eng katta materik qaysi?", options: ["Afrika", "Yevrosiyo", "Avstraliya"], correct: 1 },
      { question: "Eng kichik materik qaysi?", options: ["Avstraliya", "Afrika", "Janubiy Amerika"], correct: 0 },
      { question: "Muzliklar bilan qoplangan materik qaysi?", options: ["Antarktida", "Afrika", "Osiyo"], correct: 0 },
      { question: "Afrika qanday materik?", options: ["Issiq materik", "Muzli materik", "Eng kichik materik"], correct: 0 }
    ],
    match: [
      { left: "Yevrosiyo", right: "Eng katta materik" },
      { left: "Afrika", right: "Issiq materik" },
      { left: "Antarktida", right: "Eng sovuq materik" },
      { left: "Avstraliya", right: "Eng kichik materik" },
      { left: "Janubiy Amerika", right: "Amazonka joylashgan" }
    ],
    truefalse: [
      { statement: "Yer yuzida 6 ta materik bor", answer: true },
      { statement: "Antarktida issiq materik", answer: false },
      { statement: "Avstraliya eng kichik materik", answer: true },
      { statement: "Afrika muzliklar bilan qoplangan", answer: false },
      { statement: "Yevrosiyo eng katta materik", answer: true }
    ],
    missing: [
      { sentence: "Eng katta materik __.", answer: "Yevrosiyo", hint: "Yevrosiyo / Afrika" },
      { sentence: "Eng kichik materik __.", answer: "Avstraliya", hint: "Avstraliya / Antarktida" },
      { sentence: "Eng sovuq materik __.", answer: "Antarktida", hint: "Antarktida / Afrika" },
      { sentence: "Afrika __ materik hisoblanadi.", answer: "issiq", hint: "issiq / sovuq" },
      { sentence: "Yer yuzida __ ta materik bor.", answer: "6", hint: "6 / 8" }
    ]
  },
  {
    id: 5,
    title: "Yil fasllari",
    subtitle: "To'rt fasl sarguzashti",
    description: "Qish, bahor, yoz, kuz - har bir faslining o'ziga xos go'zalligi bor!",
    image: "/images/topic5.jpg",
    color: "#52B788",
    gradient: "from-emerald-400 to-teal-500",
    icon: <Sun className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Yilda 4 ta fasl bor: qish, bahor, yoz, kuz",
      "Qish - eng sovuq fasl, qor yog'adi",
      "Bahor - gullar ochiladi, tabiat uyg'onadi",
      "Yoz - eng issiq fasl, ta'til vaqti",
      "Kuz - barglar to'kiladi, hosil yig'iladi"
    ],
    quiz: [
      { question: "Yilda nechta fasl bor?", options: ["3 ta", "4 ta", "5 ta"], correct: 1 },
      { question: "Qaysi faslda qor yog'adi?", options: ["Bahor", "Qish", "Yoz"], correct: 1 },
      { question: "Qaysi faslda gullar ochiladi?", options: ["Kuz", "Bahor", "Qish"], correct: 1 },
      { question: "Qaysi faslda mevalar pishadi?", options: ["Yoz", "Qish", "Bahor"], correct: 0 },
      { question: "Eng issiq fasl qaysi?", options: ["Yoz", "Qish", "Bahor"], correct: 0 }
    ],
    match: [
      { left: "Bahor", right: "Gullar ochiladi" },
      { left: "Yoz", right: "Havo issiq bo'ladi" },
      { left: "Kuz", right: "Barglar to'kiladi" },
      { left: "Qish", right: "Qor yog'adi" },
      { left: "Mart", right: "Bahorning birinchi oyi" }
    ],
    truefalse: [
      { statement: "Bahorda daraxtlar gullaydi", answer: true },
      { statement: "Qishda havo issiq bo'ladi", answer: false },
      { statement: "Kuzda barglar sarg'ayadi", answer: true },
      { statement: "Yozda qor yog'adi", answer: false },
      { statement: "Yoz eng issiq fasl", answer: true }
    ],
    missing: [
      { sentence: "Yilda __ ta fasl bor.", answer: "4", hint: "4 / 3" },
      { sentence: "Qor __ faslida yog'adi.", answer: "qish", hint: "qish / bahor" },
      { sentence: "Gullar __ faslida ochiladi.", answer: "bahor", hint: "bahor / kuz" },
      { sentence: "Eng issiq fasl __.", answer: "yoz", hint: "yoz / qish" },
      { sentence: "Barglar __ faslida to'kiladi.", answer: "kuz", hint: "kuz / bahor" }
    ]
  },
  {
    id: 6,
    title: "Dunyo tomonlari",
    subtitle: "Yo'nalishni topamiz",
    description: "Shimol, janub, sharq, g'arb - dunyo tomonlarini bilib, yo'l topishni o'rganamiz!",
    image: "/images/topic6.jpg",
    color: "#457B9D",
    gradient: "from-sky-400 to-blue-600",
    icon: <Compass className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Dunyo tomonlari: shimol, janub, sharq, g'arb",
      "Quyosh sharqdan chiqib, g'arbga botadi",
      "Kompas - dunyo tomonlarini aniqlash asbobi",
      "Kompasning magnitli strelkasi doim shimolga qarab turadi",
      "Yulduzlarga qarab ham yo'l topish mumkin"
    ],
    quiz: [
      { question: "Quyosh qaysi tomondan chiqadi?", options: ["Sharqdan", "G'arbdan", "Shimoldan"], correct: 0 },
      { question: "Kompas nima uchun kerak?", options: ["Yo'l topish uchun", "Vaqt ko'rish uchun", "Ob-havo bilish uchun"], correct: 0 },
      { question: "Kompasning strelkasi qaysi tomonga qarab turadi?", options: ["Shimolga", "Janubga", "Sharqqa"], correct: 0 },
      { question: "Quyosh qaysi tomonga botadi?", options: ["G'arbga", "Sharqqa", "Shimolga"], correct: 0 },
      { question: "Dunyo nechta asosiy tomoni bor?", options: ["4 ta", "2 ta", "6 ta"], correct: 0 }
    ],
    match: [
      { left: "Shimol", right: "Qutb joylashgan tomon" },
      { left: "Sharq", right: "Quyosh chiqish tomoni" },
      { left: "G'arb", right: "Quyosh botish tomoni" },
      { left: "Kompas", right: "Yo'nalishni topish asbobi" },
      { left: "Janub", right: "Shimolning qarama-qarshisi" }
    ],
    truefalse: [
      { statement: "Quyosh sharqdan chiqadi", answer: true },
      { statement: "Kompas vaqt ko'rsatadi", answer: false },
      { statement: "Quyosh g'arbga botadi", answer: true },
      { statement: "Dunyo 2 ta tomoni bor", answer: false },
      { statement: "Kompas strelkasi shimolga qarab turadi", answer: true }
    ],
    missing: [
      { sentence: "Quyosh __dan chiqadi.", answer: "sharq", hint: "sharq / g'arb" },
      { sentence: "Quyosh __ga botadi.", answer: "g'arb", hint: "g'arb / sharq" },
      { sentence: "Kompas __ni ko'rsatadi.", answer: "shimol", hint: "shimol / janub" },
      { sentence: "Kompas __ uchun kerak.", answer: "yo'l topish", hint: "yo'l topish / vaqt bilish" },
      { sentence: "Dunyo __ ta asosiy tomoni bor.", answer: "4", hint: "4 / 2" }
    ]
  },
  {
    id: 7,
    title: "Tabiiy ofatlar",
    subtitle: "Tabiat kuchi bilan tanishamiz",
    description: "Toshqinlar, zilzilalar, do'vullar - tabiiy ofatlar haqida bilib, o'zimizni himoya qilishni o'rganamiz!",
    image: "/images/topic7.jpg",
    color: "#E76F51",
    gradient: "from-orange-400 to-red-500",
    icon: <CloudRain className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Toshqin - suv sathi ko'tarilib, qirg'oqlardan toshib ketishi",
      "Zilzila - yer ostida plitalar harakatlanishi natijasida",
      "Dovul - juda kuchli shamol va yomg'ir",
      "Yong'in - tez tarqaladigan va katta zarar yetkazuvchi ofat",
      "Tabiiy ofatlardan ehtiyot bo'lish kerak!"
    ],
    quiz: [
      { question: "Toshqin nima?", options: ["Suv sathi ko'tarilishi", "Yer silkinishi", "Kuchli shamol"], correct: 0 },
      { question: "Zilzila nima?", options: ["Yer ostida plitalar harakatlanishi", "Suv toshishi", "Qor yog'ishi"], correct: 0 },
      { question: "Dovul nima?", options: ["Juda kuchli shamol", "Yomg'ir", "Qor yog'ishi"], correct: 0 },
      { question: "Zilzila paytida nima qilish kerak?", options: ["Stol ostiga kirish", "Derazadan qarab turish", "Ko'chaga chiqish"], correct: 0 },
      { question: "Tabiiy ofatlar oldindan aytib bo'ladimi?", options: ["Yo'q, oldindan aytib bo'lmaydi", "Ha, har doim", "Faqat zilzilani"], correct: 0 }
    ],
    match: [
      { left: "Toshqin", right: "Suv sathi ko'tarilishi" },
      { left: "Zilzila", right: "Yer silkinishi" },
      { left: "Dovul", right: "Kuchli shamol" },
      { left: "Yong'in", right: "Tez tarqaluvchi ofat" },
      { left: "Qurg'oqchilik", right: "Yomg'ir yog'maydi" }
    ],
    truefalse: [
      { statement: "Toshqin - suv sathi ko'tarilishi", answer: true },
      { statement: "Zilzilada liftga chiqish kerak", answer: false },
      { statement: "Dovul kuchli shamol", answer: true },
      { statement: "Tabiiy ofatlarni to'xtatish mumkin", answer: false },
      { statement: "Zilzila paytida stol ostiga kirish kerak", answer: true }
    ],
    missing: [
      { sentence: "Toshqin - __ sathining ko'tarilishi.", answer: "suv", hint: "suv / yer" },
      { sentence: "Zilzila __ silkinishi.", answer: "yer", hint: "yer / osmon" },
      { sentence: "Dovul - juda __ shamol.", answer: "kuchli", hint: "kuchli / kuchsiz" },
      { sentence: "Zilzila paytida __ ostiga kirish kerak.", answer: "stol", hint: "stol / deraza" },
      { sentence: "Tabiiy ofatlardan __ bo'lish kerak.", answer: "ehtiyot", hint: "ehtiyot / qo'rqmas" }
    ]
  },
  {
    id: 8,
    title: "Energiya",
    subtitle: "Kuch-quvvat olami",
    description: "Elektr energiyasi, issiqlik, yorug'lik - energiya turlari va ulardan foydalanish!",
    image: "/images/topic8.jpg",
    color: "#FFE66D",
    gradient: "from-yellow-400 to-amber-500",
    icon: <Zap className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Energiya bizga harakat qilish imkonini beradi",
      "Quyosh - eng katta energiya manbai",
      "Elektr energiyasi simlar orqali uzatiladi",
      "Issiqlik energiyasi ham energiyaning bir turi",
      "Energiyani tejash har birimizning burchimizdir"
    ],
    quiz: [
      { question: "Bizga yorug'lik va issiqlikni nima beradi?", options: ["Quyosh", "Oy", "Bulut"], correct: 0 },
      { question: "Elektr lampasi nimani tarqatadi?", options: ["Yorug'lik", "Qor", "Tuproq"], correct: 0 },
      { question: "Qishda odamlar nimaga ehtiyoj sezadi?", options: ["Issiqlikka", "Muzga", "Changga"], correct: 0 },
      { question: "Energiya bizga nima uchun kerak?", options: ["Harakat qilish uchun", "Uxlash uchun", "Jim turish uchun"], correct: 0 },
      { question: "Qaysi buyum elektr energiyasi bilan ishlaydi?", options: ["Televizor", "Kitob", "Qalam"], correct: 0 }
    ],
    match: [
      { left: "Quyosh", right: "Yorug'lik manbai" },
      { left: "Pechka", right: "Issiqlik manbai" },
      { left: "Batareya", right: "Energiya manbai" },
      { left: "Lampa", right: "Yorug'lik beradi" },
      { left: "Elektr toki", right: "Qurilmalarni ishlatadi" }
    ],
    truefalse: [
      { statement: "Quyosh yorug'lik beradi", answer: true },
      { statement: "Muz issiqlik beradi", answer: false },
      { statement: "Lampa xonani yoritadi", answer: true },
      { statement: "Elektrsiz qurilmalar ishlaydi", answer: false },
      { statement: "Batareya energiya saqlaydi", answer: true }
    ],
    missing: [
      { sentence: "Quyosh bizga __ va issiqlik beradi.", answer: "yorug'lik", hint: "yorug'lik / soyalik" },
      { sentence: "Lampa xonani __.", answer: "yoritadi", hint: "yoritadi / sovitadi" },
      { sentence: "Qishda bizga __ kerak.", answer: "issiqlik", hint: "issiqlik / sovuqlik" },
      { sentence: "Elektr __ manbai hisoblanadi.", answer: "energiya", hint: "energiya / suv" },
      { sentence: "Batareya ichida __ saqlanadi.", answer: "energiya", hint: "energiya / suv" }
    ]
  },
  {
    id: 9,
    title: "Jonli va jonsiz",
    subtitle: "Tabiat olami",
    description: "Tabiat jonli va jonsiz narsalardan iborat. Ularni farqlashni o'rganamiz!",
    image: "/images/topic9.jpg",
    color: "#2d6a4f",
    gradient: "from-green-500 to-emerald-600",
    icon: <TreePine className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Jonli tabiat: o'sadi, ko'payadi, nafas oladi",
      "Jonli: daraxt, gul, qush, mushuk, baliq, odam",
      "Jonsiz tabiat: o'smaydi, ko'paymaydi",
      "Jonsiz: tosh, suv, quyosh, havo, tog'",
      "Jonli va jonsiz tabiat bir-biriga bog'liq"
    ],
    quiz: [
      { question: "Qaysi biri jonli tabiat?", options: ["Tosh", "Qush", "Suv"], correct: 1 },
      { question: "Qaysi biri jonsiz tabiat?", options: ["Mushuk", "Gul", "Quyosh"], correct: 2 },
      { question: "Jonli tabiat nima qiladi?", options: ["Faqat turadi", "O'sadi va ko'payadi", "O'zgarmaydi"], correct: 1 },
      { question: "Suv qaysi tabiatga kiradi?", options: ["Jonli", "Jonsiz", "Ikkalasi ham"], correct: 1 },
      { question: "Daraxt qaysi tabiat?", options: ["Jonli", "Jonsiz", "Hech qaysi"], correct: 0 }
    ],
    match: [
      { left: "Daraxt", right: "Jonli tabiat" },
      { left: "Tosh", right: "Jonsiz tabiat" },
      { left: "Qush", right: "Jonli tabiat" },
      { left: "Quyosh", right: "Jonsiz tabiat" },
      { left: "Baliq", right: "Jonli tabiat" }
    ],
    truefalse: [
      { statement: "Qush jonli tabiatga kiradi", answer: true },
      { statement: "Tosh o'sadi", answer: false },
      { statement: "Suv jonsiz tabiat", answer: true },
      { statement: "Daraxt nafas oladi", answer: true },
      { statement: "Quyosh jonli", answer: false }
    ],
    missing: [
      { sentence: "Jonli tabiat __ va ko'payadi.", answer: "o'sadi", hint: "o'sadi / turadi" },
      { sentence: "Daraxt __ tabiatga kiradi.", answer: "jonli", hint: "jonli / jonsiz" },
      { sentence: "Tosh __ tabiatga kiradi.", answer: "jonsiz", hint: "jonsiz / jonli" },
      { sentence: "Qush __ tabiatdir.", answer: "jonli", hint: "jonli / jonsiz" },
      { sentence: "Quyosh __ tabiatdir.", answer: "jonsiz", hint: "jonsiz / jonli" }
    ]
  },
  {
    id: 10,
    title: "Ekologiya",
    subtitle: "Tabiatni asraylik",
    description: "Tabiatni asrash, ekologik muammolar va biz qila oladigan yaxshi ishlalar!",
    image: "/images/topic10.jpg",
    color: "#1a936f",
    gradient: "from-emerald-500 to-green-600",
    icon: <Recycle className="w-8 h-8" />,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Misol uchun
    facts: [
      "Ekologiya - tabiatni o'rganuvchi fan",
      "Daraxtlar havoni tozalaydi",
      "Suvni tejash har birimizning burchimiz",
      "Chiqindini saralash muhim",
      "Hayvonlarni asrashimiz kerak"
    ],
    quiz: [
      { question: "Havo ifloslanishini qanday kamaytiramiz?", options: ["Ko'proq mashina ishlatish", "Daraxt ekish", "Axlat tashlash"], correct: 1 },
      { question: "Suvni qanday tejash mumkin?", options: ["Suvni ochiq qoldirish", "Suvni yopib ishlatish", "Suvni isrof qilish"], correct: 1 },
      { question: "Chiqindilarni nima qilish kerak?", options: ["Yerga tashlash", "Saralash va qayta ishlash", "Suvga tashlash"], correct: 1 },
      { question: "Daraxtlar nima uchun muhim?", options: ["Havo tozalaydi", "Axlat qiladi", "Suvni iflos qiladi"], correct: 0 },
      { question: "Plastikni kamaytirish nima uchun kerak?", options: ["Atrofni toza saqlash uchun", "Ko'paytirish uchun", "Suvni iflos qilish uchun"], correct: 0 }
    ],
    match: [
      { left: "Daraxtlar", right: "Havo tozalaydi" },
      { left: "Chiqindi", right: "Saralash kerak" },
      { left: "Suv", right: "Tejash kerak" },
      { left: "Hayvonlar", right: "Asrash kerak" },
      { left: "Plastik", right: "Kamaytirish kerak" }
    ],
    truefalse: [
      { statement: "Daraxt ekish ekologiyaga foydali", answer: true },
      { statement: "Axlatni yerga tashlash to'g'ri", answer: false },
      { statement: "Suvni tejash kerak", answer: true },
      { statement: "Havo ifloslanishi yaxshi holat", answer: false },
      { statement: "Hayvonlarni asrash kerak", answer: true }
    ],
    missing: [
      { sentence: "Daraxtlar __ tozalaydi.", answer: "havo", hint: "havo / suv" },
      { sentence: "Suvni __ kerak.", answer: "tejash", hint: "tejash / isrof qilish" },
      { sentence: "Chiqindini __ kerak.", answer: "saralash", hint: "saralash / tashlash" },
      { sentence: "Hayvonlarni __ kerak.", answer: "asrash", hint: "asrash / yo'q qilish" },
      { sentence: "Tabiatni __ saqlash kerak.", answer: "toza", hint: "toza / iflos" }
    ]
  }
];

// Floating emoji decorations for header
const EMOJIS = ['🌟','🦋','🌈','🚀','🎨','🦄','🌺','⭐','🎯','🍀','🌙','🎪','🦁','🐬','🌸'];

// YouTube video ID ni URL dan ajratib olish funksiyasi
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // youtube.com/watch?v=VIDEO_ID
  const regExp1 = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match1 = url.match(regExp1);
  if (match1 && match1[7].length === 11) {
    return match1[7];
  }
  
  // youtu.be/VIDEO_ID
  const regExp2 = /^.*youtu\.be\/([^#&?]*).*/;
  const match2 = url.match(regExp2);
  if (match2 && match2[1].length === 11) {
    return match2[1];
  }
  
  // Agar URL da faqat ID bo'lsa
  if (url.length === 11 && /^[a-zA-Z0-9_-]+$/.test(url)) {
    return url;
  }
  
  return null;
};

// ============ MAIN APP ============
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [quizState, setQuizState] = useState({ currentQ: 0, score: 0, answered: false, selected: -1 });
  const [matchState, setMatchState] = useState<{left: string|null, right: string|null, matched: string[], shuffledLeft: MatchPair[], shuffledRight: MatchPair[]}>({ left: null, right: null, matched: [], shuffledLeft: [], shuffledRight: [] });
  const [tfState, setTfState] = useState({ currentQ: 0, score: 0, answered: false, selected: null as boolean|null });
  const [missingState, setMissingState] = useState({ currentQ: 0, score: 0, answer: '', answered: false });
  const [totalStars, setTotalStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState<'quiz'|'match'|'truefalse'|'missing'>('quiz');
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);
  const [floatingEmojis] = useState(() =>
    Array.from({length: 18}, (_, i) => ({
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 1.2 + Math.random() * 1.5,
    }))
  );

  useEffect(() => {
    const saved = localStorage.getItem('tabiiyfanlar-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setTotalStars(data.stars || 0);
      setCompletedTopics(data.completed || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tabiiyfanlar-progress', JSON.stringify({ stars: totalStars, completed: completedTopics }));
  }, [totalStars, completedTopics]);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const openTopic = (topic: TopicData) => {
    setSelectedTopic(topic);
    setCurrentPage('topic');
    // Reset all game states
    setQuizState({ currentQ: 0, score: 0, answered: false, selected: -1 });
    const shuffledLeft = [...topic.match].sort(() => Math.random() - 0.5);
    const shuffledRight = [...topic.match].sort(() => Math.random() - 0.5);
    setMatchState({ left: null, right: null, matched: [], shuffledLeft, shuffledRight });
    setTfState({ currentQ: 0, score: 0, answered: false, selected: null });
    setMissingState({ currentQ: 0, score: 0, answer: '', answered: false });
    setActiveTab('quiz');
  };

  const switchTab = (tab: 'quiz'|'match'|'truefalse'|'missing') => {
    setActiveTab(tab);
    // Reset only that tab's state, not activeTab
    if (tab === 'quiz') setQuizState({ currentQ: 0, score: 0, answered: false, selected: -1 });
    if (tab === 'match' && selectedTopic) {
      const shuffledLeft = [...selectedTopic.match].sort(() => Math.random() - 0.5);
      const shuffledRight = [...selectedTopic.match].sort(() => Math.random() - 0.5);
      setMatchState({ left: null, right: null, matched: [], shuffledLeft, shuffledRight });
    }
    if (tab === 'truefalse') setTfState({ currentQ: 0, score: 0, answered: false, selected: null });
    if (tab === 'missing') setMissingState({ currentQ: 0, score: 0, answer: '', answered: false });
  };

  // ============ CREATIVE HEADER ============
  const CreativeHeader = () => (
    <header className="relative overflow-hidden" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)'}}>
      {/* Animated star field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({length: 40}).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animation: `twinkle ${1 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating emoji decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingEmojis.map((item, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              fontSize: `${item.size}rem`,
              opacity: 0.25,
              animation: `floatEmoji ${item.duration}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{background: '#a855f7', animation: 'pulse 4s ease-in-out infinite'}} />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{background: '#06b6d4', animation: 'pulse 3s ease-in-out infinite', animationDelay: '1s'}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full opacity-5 blur-3xl" style={{background: '#f59e0b'}} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* Rocket + mascot row */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Rocket */}
          <div style={{animation: 'rocketWobble 2s ease-in-out infinite'}}>
            <span style={{fontSize: '2.8rem'}}>🚀</span>
          </div>

          {/* Main logo bubble */}
          <div className="relative">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)',
                animation: 'spinSlow 8s linear infinite',
                boxShadow: '0 0 30px rgba(245,158,11,0.5), 0 0 60px rgba(139,92,246,0.3)'
              }}
            >
              🌍
            </div>
            {/* orbit ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400 opacity-50"
              style={{
                width: '120%', height: '120%',
                top: '-10%', left: '-10%',
                animation: 'spinSlow 5s linear infinite reverse'
              }}
            />
          </div>

          {/* Star */}
          <div style={{animation: 'rocketWobble 2.5s ease-in-out infinite', animationDelay: '0.5s'}}>
            <span style={{fontSize: '2.5rem'}}>⭐</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-3">
          <h1
            className="text-4xl md:text-6xl font-black mb-2 leading-tight"
            style={{
              background: 'linear-gradient(90deg, #fbbf24, #f87171, #a78bfa, #34d399, #60a5fa)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'rainbowShift 3s linear infinite',
              fontFamily: "'Nunito', sans-serif",
              textShadow: 'none',
              letterSpacing: '-1px'
            }}
          >
            Tabiiy Fanlar
          </h1>

          {/* Fun subtitle with bouncing letters feel */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl" style={{animation: 'bounce 1s ease-in-out infinite'}}>🎓</span>
            <p className="text-lg md:text-xl font-bold text-white/90">
              2-sinf o'quvchilari uchun
            </p>
            <span className="text-2xl" style={{animation: 'bounce 1s ease-in-out infinite', animationDelay: '0.3s'}}>📚</span>
          </div>

          <p className="text-sm md:text-base text-white/60 max-w-lg mx-auto">
            10 ta mavzu • Testlar • O'yinlar • Ko'plab sarguzashtlar! 🌟
          </p>
        </div>

        {/* Stats badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            { icon: '⭐', label: `${totalStars} yulduz`, bg: 'from-yellow-500 to-amber-600' },
            { icon: '🏆', label: `${completedTopics.length}/10 mavzu`, bg: 'from-purple-500 to-indigo-600' },
            { icon: '📝', label: '40+ topshiriq', bg: 'from-teal-500 to-cyan-600' },
          ].map((badge, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg bg-gradient-to-r ${badge.bg}`}
              style={{animation: `popIn 0.5s ease-out forwards`, animationDelay: `${i * 0.15}s`, opacity: 0}}
            >
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Fun waving hand */}
        <div className="text-center mt-4">
          <span className="text-3xl inline-block" style={{animation: 'wave 1.5s ease-in-out infinite'}}>👋</span>
          <p className="text-white/50 text-sm mt-1">Keling, birga o'rganamiz!</p>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 60" className="w-full" style={{display:'block', marginBottom:'-2px'}}>
          <path fill="#f0fdf4" d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </header>
  );

  // ============ HOME PAGE ============
  const HomePage = () => (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #fef9c3 50%, #fdf4ff 100%)'}}>
      <CreativeHeader />

      {/* Topics Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16 pt-8">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
          <span className="text-3xl">🗺️</span>
          <span>Mavzularni tanlang!</span>
          <span className="text-3xl">👇</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topicsData.map((topic, idx) => (
            <button
              key={topic.id}
              onClick={() => openTopic(topic)}
              className={`group relative bg-gradient-to-br ${topic.gradient} rounded-3xl p-5 text-white text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Completion badge */}
              {completedTopics.includes(topic.id) && (
                <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-1.5 shadow-lg z-10">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                  {topic.icon}
                </div>
                <span className="text-3xl font-black opacity-30">{topic.id}</span>
              </div>

              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <h3 className="text-xl font-bold mb-1">{topic.title}</h3>
              <p className="text-sm opacity-90 mb-3">{topic.subtitle}</p>

              <div className="flex items-center gap-1 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Boshlash</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  // ============ TOPIC DETAIL PAGE ============
  const TopicPage = () => {
    if (!selectedTopic) return null;
    const topic = selectedTopic;

    const tabs = [
      { key: 'quiz' as const, label: 'Test', emoji: '📝', icon: <HelpCircle className="w-4 h-4" /> },
      { key: 'match' as const, label: 'Moslashtir', emoji: '🔗', icon: <Layers className="w-4 h-4" /> },
      { key: 'truefalse' as const, label: "To'g'ri/Yo'q", emoji: '✅', icon: <CheckCircle2 className="w-4 h-4" /> },
      { key: 'missing' as const, label: "So'z qo'sh", emoji: '✏️', icon: <Pencil className="w-4 h-4" /> },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Banner */}
        <div className={`relative bg-gradient-to-br ${topic.gradient} py-8 md:py-12 px-4 overflow-hidden`}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${30 + Math.random() * 60}px`,
                  height: `${30 + Math.random() * 60}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Bosh sahifa</span>
            </button>

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="w-full md:w-1/2">
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 inline-flex mb-4">
                  {topic.icon}
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{topic.title}</h1>
                <p className="text-lg text-white/90 mb-4">{topic.subtitle}</p>
                <p className="text-white/80 leading-relaxed">{topic.description}</p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img src={topic.image} alt={topic.title} className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facts Section */}
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Qiziqarli faktlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {topic.facts.map((fact, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-md flex items-start gap-3 hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl p-2 flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>

          {/* Video Section - Faktlar bo'limi ostida */}
          {topic.videoUrl && (() => {
            const videoId = getYouTubeVideoId(topic.videoUrl);
            return videoId ? (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🎥</span>
                  Video Dars
                </h2>
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            ) : null;
          })()}

          {/* Activity Tabs */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Tab buttons */}
            <div className="flex border-b overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => switchTab(tab.key)}
                  className={`flex items-center gap-2 px-4 md:px-5 py-4 font-bold text-sm whitespace-nowrap transition-all flex-1 justify-center ${
                    activeTab === tab.key
                      ? 'text-purple-600 bg-purple-50 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base">{tab.emoji}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'quiz' && <QuizGame quiz={topic.quiz} />}
              {activeTab === 'match' && <MatchGame />}
              {activeTab === 'truefalse' && <TrueFalseGame questions={topic.truefalse} />}
              {activeTab === 'missing' && <MissingWordGame words={topic.missing} />}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ QUIZ GAME ============
  function QuizGame({ quiz }: { quiz: QuizQuestion[] }) {
    const { currentQ, score, answered, selected } = quizState;

    if (currentQ >= quiz.length) {
      const stars = score >= quiz.length * 0.8 ? 3 : score >= quiz.length * 0.5 ? 2 : 1;
      return (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Tabriklaymiz!</h3>
          <p className="text-gray-600 mb-4">Siz {quiz.length} ta savoldan <strong>{score}</strong> tasiga to'g'ri javob berdingiz!</p>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <Star key={s} className={`w-10 h-10 ${s <= stars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <button
            onClick={() => setQuizState({ currentQ: 0, score: 0, answered: false, selected: -1 })}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            Qayta boshlash
          </button>
        </div>
      );
    }

    const q = quiz[currentQ];

    const handleAnswer = (idx: number) => {
      if (answered) return;
      setQuizState(prev => ({ ...prev, answered: true, selected: idx }));
      if (idx === q.correct) {
        setTotalStars(prev => prev + 1);
        triggerConfetti();
      }
    };

    const nextQuestion = () => {
      setQuizState(prev => ({
        currentQ: prev.currentQ + 1,
        score: prev.selected === quiz[prev.currentQ].correct ? prev.score + 1 : prev.score,
        answered: false,
        selected: -1
      }));
    };

    return (
      <div>
        <div className="mb-6">
          <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
            <span>📝 Savol {currentQ + 1}/{quiz.length}</span>
            <span>⭐ Ball: {score}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${((currentQ + 1) / quiz.length) * 100}%` }} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6">{q.question}</h3>

        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-2xl font-medium transition-all active:scale-95 ${
                answered && idx === q.correct
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                  : answered && idx === selected && idx !== q.correct
                  ? 'bg-gradient-to-r from-red-400 to-rose-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-purple-50 text-gray-700 border-2 border-transparent hover:border-purple-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  answered && idx === q.correct ? 'bg-white/30' : answered && idx === selected ? 'bg-white/30' : 'bg-white shadow'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
                {answered && idx === q.correct && <CheckCircle2 className="w-5 h-5 ml-auto" />}
                {answered && idx === selected && idx !== q.correct && <XCircle className="w-5 h-5 ml-auto" />}
              </div>
            </button>
          ))}
        </div>

        {answered && (
          <div className="mt-6 text-center">
            <p className={`text-lg font-bold mb-4 ${selected === q.correct ? 'text-green-600' : 'text-red-500'}`}>
              {selected === q.correct ? "🎉 Ajoyib! To'g'ri javob!" : "❌ Noto'g'ri. To'g'ri javob: " + q.options[q.correct]}
            </p>
            <button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
            >
              Keyingi savol <ChevronRight className="w-5 h-5 inline ml-1" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ MATCH GAME ============
  function MatchGame() {
    const { left, matched, shuffledLeft, shuffledRight } = matchState;
    const allMatched = selectedTopic ? matched.length === selectedTopic.match.length * 2 : false;

    if (allMatched) {
      return (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ajoyib! Barcha juftliklar topildi!</h3>
          <button
            onClick={() => {
              if (selectedTopic) {
                const sl = [...selectedTopic.match].sort(() => Math.random() - 0.5);
                const sr = [...selectedTopic.match].sort(() => Math.random() - 0.5);
                setMatchState({ left: null, right: null, matched: [], shuffledLeft: sl, shuffledRight: sr });
              }
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
          >
            <Shuffle className="w-5 h-5 inline mr-2" />
            Qayta boshlash
          </button>
        </div>
      );
    }

    const pairs = selectedTopic?.match || [];

    const handleLeft = (val: string) => {
      if (matched.includes('L-' + val)) return;
      setMatchState(prev => ({ ...prev, left: val }));
    };

    const handleRight = (val: string) => {
      if (matched.includes('R-' + val) || !matchState.left) return;
      const correctPair = pairs.find(p => p.left === matchState.left);
      if (correctPair && correctPair.right === val) {
        setMatchState(prev => ({
          ...prev,
          left: null,
          matched: [...prev.matched, 'L-' + prev.left, 'R-' + val],
        }));
        setTotalStars(prev => prev + 1);
        triggerConfetti();
      } else {
        setMatchState(prev => ({ ...prev, left: null }));
      }
    };

    return (
      <div>
        <p className="text-center text-gray-600 font-medium mb-6">🔗 Chap va o'ng tomonlarni bir-biriga moslang</p>
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-500">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
            {matched.length / 2}/{pairs.length} juftlik
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div className="space-y-3">
            {shuffledLeft.map((p, idx) => {
              const isMatched = matched.includes('L-' + p.left);
              const isSelected = left === p.left;
              return (
                <button
                  key={'L' + idx}
                  onClick={() => handleLeft(p.left)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-2xl font-bold text-center transition-all active:scale-95 ${
                    isMatched
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                      : isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:shadow-md'
                  }`}
                >
                  {isMatched ? '✓ ' : ''}{p.left}
                </button>
              );
            })}
          </div>
          <div className="space-y-3">
            {shuffledRight.map((p, idx) => {
              const isMatched = matched.includes('R-' + p.right);
              return (
                <button
                  key={'R' + idx}
                  onClick={() => handleRight(p.right)}
                  disabled={isMatched || !left}
                  className={`w-full p-4 rounded-2xl font-bold text-center transition-all active:scale-95 ${
                    isMatched
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                      : left
                      ? 'bg-gradient-to-r from-pink-100 to-rose-200 text-pink-700 hover:shadow-md cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isMatched ? '✓ ' : ''}{p.right}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ============ TRUE/FALSE GAME ============
  function TrueFalseGame({ questions }: { questions: TrueFalseQuestion[] }) {
    const { currentQ, score, answered, selected } = tfState;

    if (currentQ >= questions.length) {
      const stars = score >= questions.length * 0.8 ? 3 : score >= questions.length * 0.5 ? 2 : 1;
      return (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🎊</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Tabriklaymiz!</h3>
          <p className="text-gray-600 mb-4">{questions.length} tasidan <strong>{score}</strong> tasiga to'g'ri javob!</p>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <Star key={s} className={`w-10 h-10 ${s <= stars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <button
            onClick={() => setTfState({ currentQ: 0, score: 0, answered: false, selected: null })}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            Qayta boshlash
          </button>
        </div>
      );
    }

    const q = questions[currentQ];

    const handleAnswer = (ans: boolean) => {
      if (answered) return;
      const correct = ans === q.answer;
      setTfState(prev => ({ ...prev, answered: true, selected: ans, score: correct ? prev.score + 1 : prev.score }));
      if (correct) { setTotalStars(prev => prev + 1); triggerConfetti(); }
    };

    const nextQuestion = () => {
      setTfState(prev => ({ currentQ: prev.currentQ + 1, score: prev.score, answered: false, selected: null }));
    };

    return (
      <div>
        <div className="mb-6">
          <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
            <span>✅ Savol {currentQ + 1}/{questions.length}</span>
            <span>⭐ Ball: {score}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transition-all duration-500" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
          <p className="text-xl font-bold text-gray-800 text-center leading-relaxed">{q.statement}</p>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => handleAnswer(true)}
            disabled={answered}
            className={`flex-1 max-w-[180px] px-6 py-5 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
              answered && q.answer === true
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg scale-105'
                : answered && q.answer !== true
                ? 'bg-gray-200 text-gray-400'
                : 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-700 hover:shadow-lg border-2 border-green-300'
            }`}
          >
            <CheckCircle2 className="w-6 h-6 inline mr-2" />
            To'g'ri ✅
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={answered}
            className={`flex-1 max-w-[180px] px-6 py-5 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
              answered && q.answer === false
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg scale-105'
                : answered && q.answer !== false
                ? 'bg-gray-200 text-gray-400'
                : 'bg-gradient-to-r from-red-100 to-rose-200 text-red-700 hover:shadow-lg border-2 border-red-300'
            }`}
          >
            <XCircle className="w-6 h-6 inline mr-2" />
            Noto'g'ri ❌
          </button>
        </div>

        {answered && (
          <div className="text-center">
            <p className={`text-lg font-bold mb-4 ${selected === q.answer ? 'text-green-600' : 'text-red-500'}`}>
              {selected === q.answer
                ? "🎉 To'g'ri! Barakalla!"
                : `❌ Noto'g'ri! Bu ifoda ${q.answer ? "TO'G'RI" : "NOTO'G'RI"} edi`}
            </p>
            <button onClick={nextQuestion} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg">
              Keyingi <ChevronRight className="w-5 h-5 inline ml-1" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ MISSING WORD GAME ============
  function MissingWordGame({ words }: { words: MissingWord[] }) {
    const { currentQ, score, answer, answered } = missingState;

    if (currentQ >= words.length) {
      const stars = score >= words.length * 0.8 ? 3 : score >= words.length * 0.5 ? 2 : 1;
      return (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Zo'r! Tugatdingiz!</h3>
          <p className="text-gray-600 mb-4">{words.length} tasidan <strong>{score}</strong> tasiga to'g'ri javob!</p>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <Star key={s} className={`w-10 h-10 ${s <= stars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <button
            onClick={() => setMissingState({ currentQ: 0, score: 0, answer: '', answered: false })}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            Qayta boshlash
          </button>
        </div>
      );
    }

    const w = words[currentQ];

    const handleCheck = () => {
      if (answered || !answer.trim()) return;
      const correct = answer.trim().toLowerCase() === w.answer.toLowerCase();
      setMissingState(prev => ({ ...prev, answered: true, score: correct ? prev.score + 1 : prev.score }));
      if (correct) { setTotalStars(prev => prev + 1); triggerConfetti(); }
    };

    const nextQuestion = () => {
      setMissingState(prev => ({ currentQ: prev.currentQ + 1, score: prev.score, answer: '', answered: false }));
    };

    return (
      <div>
        <div className="mb-6">
          <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
            <span>✏️ Savol {currentQ + 1}/{words.length}</span>
            <span>⭐ Ball: {score}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500" style={{ width: `${((currentQ + 1) / words.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-100">
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-loose">
            {w.sentence.split('__').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={`inline-block min-w-[90px] px-3 py-1 rounded-lg mx-1 text-center font-bold ${
                    answered
                      ? answer.trim().toLowerCase() === w.answer.toLowerCase()
                        ? 'bg-green-400 text-white'
                        : 'bg-red-400 text-white'
                      : 'bg-white border-2 border-purple-400 text-purple-600'
                  }`}>
                    {answered ? w.answer : (answer || '_ _ _')}
                  </span>
                )}
              </span>
            ))}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span>💡</span>
            <span>Ko'rsatma: {w.hint}</span>
          </p>
        </div>

        {!answered ? (
          <div className="space-y-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setMissingState(prev => ({ ...prev, answer: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              placeholder="Javobingizni yozing..."
              className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg font-medium"
            />
            <button
              onClick={handleCheck}
              disabled={!answer.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg disabled:opacity-50 active:scale-95"
            >
              Tekshirish ✓
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className={`text-lg font-bold mb-4 ${answer.trim().toLowerCase() === w.answer.toLowerCase() ? 'text-green-600' : 'text-red-500'}`}>
              {answer.trim().toLowerCase() === w.answer.toLowerCase()
                ? "🎉 Ajoyib! To'g'ri javob!"
                : `❌ To'g'ri javob: "${w.answer}"`}
            </p>
            <button onClick={nextQuestion} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg">
              Keyingi <ChevronRight className="w-5 h-5 inline ml-1" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ CONFETTI ============
  function Confetti() {
    if (!showConfetti) return null;
    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
              animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
              animationDelay: `${Math.random() * 1}s`,
              width: `${8 + Math.random() * 10}px`,
              height: `${8 + Math.random() * 10}px`,
              background: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C', '#667eea', '#52B788', '#f472b6'][i % 7],
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>
    );
  }

  // ============ FOOTER ============
  function Footer() {
    return (
      <footer style={{background: 'linear-gradient(135deg, #1a1a2e, #16213e)'}} className="text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl mb-3">🌍 🚀 ⭐</div>
          <p className="text-xl font-bold text-white/90 mb-1">Tabiiy Fanlar — 2-sinf</p>
          <p className="text-white/50 text-sm">Boshlang'ich sinf o'quvchilari uchun interaktiv ta'lim platformasi</p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-white/30">
            <span>10 ta mavzu</span><span>•</span>
            <span>40+ topshiriq</span><span>•</span>
            <span>4 ta faoliyat turi</span>
          </div>
        </div>
      </footer>
    );
  }

  // ============ RENDER ============
  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        @keyframes rocketWobble {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rainbowShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
      `}</style>

      <Confetti />

      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gray-200">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(completedTopics.length / 10) * 100}%`,
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b)'
            }}
          />
        </div>
      </div>

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'topic' && <TopicPage />}
      </main>

      <Footer />
    </div>
  );
}
