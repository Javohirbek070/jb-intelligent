// Real projects completed by JB Intelligent / Javohirbek
const PROJECTS_DATA = [
  {
    id: "gymos",
    title: "GymOS — Fitness Club Management ERP",
    category: "saas",
    categoryLabel: "SaaS & ERP",
    badge: "Enterprise ERP",
    date: "Noyabr 2026",
    summary: "Fitnes klublari va sport majmualari uchun to'liq raqamli boshqaruv platformasi. Turniket integratsiyasi, QR a'zolik, real-vaqt moliya va mobil ilova.",
    description: "GymOS — O'zbekistondagi zamonaviy fitnes klublari uchun maxsus ishlab chiqilgan keng ko'lamli boshqaruv tizimi. Tizim a'zolar bazasini yuritish, abonementlarni avtomatik nazorat qilish, murabbiylar jadvali, FaceID/QR turniketlar bilan integratsiya hamda klub egasi uchun jonli analitika va moliyaviy hisobotlarni taqdim etadi.",
    metrics: [
      { label: "A'zolar boshqaruvi", value: "10,000+" },
      { label: "Turniket javob vaqti", value: "< 200ms" },
      { label: "Moliyaviy xatoliklar", value: "0%" }
    ],
    tech: ["Next.js 15", "PostgreSQL", "Supabase", "Tailwind CSS", "Flutter", "Hardware API"],
    liveUrl: "https://gymos-app-five.vercel.app",
    featured: true,
    accentColor: "#10b981",
    highlights: [
      "Elektron QR va RFID turniket apparat integratsiyasi",
      "Kassani real-vaqtda boshqarish va to'lov tahlili",
      "Mijozlar uchun mobil ilova orqali mashg'ulotlarni band qilish",
      "Murabbiylar maoshi va bonuslarini avtomatik hisoblash"
    ]
  },
  {
    id: "apexcut",
    title: "ApexCut CAD — CNC Glass & Sheet Optimizer",
    category: "cad",
    categoryLabel: "Sanoat & CAD",
    badge: "Sanoat Dasturi",
    date: "Noyabr 2026",
    summary: "Shisha, metall va yog'och panellarni CNC dastgohlarda kesishni optimallashtiruvchi professional 2D CAD va nesting algoritmi.",
    description: "ApexCut CAD — sanoat korxonalari uchun xom-ashyoni 96%+ tejamkorlik bilan kesishni ta'minlaydigan ilg'or hisoblash tizimi. Chizmalarni to'g'ridan-to'g'ri brauzerda yoki desktopda tahrirlash, shakllar kutubxonasi, avtomatik guruhlash, qoldiq shisha (remnants) hisobi va CNC mashinalariga DXF hamda G-Code tayyorlab berish imkoniyatini yaratadi.",
    metrics: [
      { label: "Material tejamkorligi", value: "96.4%" },
      { label: "Hisoblash tezligi", value: "0.2 soniya" },
      { label: "CNC mosligi", value: "100% G-Code" }
    ],
    tech: ["React", "HTML5 Canvas 2D", "WebGL", "C++/Rust WASM", "DXF Parser", "Electron"],
    liveUrl: "https://www.apexcut.store",
    featured: true,
    accentColor: "#06b6d4",
    highlights: [
      "Interaktiv 2D CAD chizmachilik va parametrik shakllar",
      "2D Bin-Packing va Genetic nesting algoritmi",
      "Qoldiq materiallarni bazada avtomatik qayta ishlatishga saqlash",
      "Xitoy va Yevropa CNC dastgohlari bilan 100% sinxronizatsiya"
    ]
  },
  {
    id: "lumen-roof",
    title: "Lumen Roof — Architectural Panoramic Roofs",
    category: "web3d",
    categoryLabel: "3D & Veb",
    badge: "Luxury Architecture",
    date: "Noyabr 2026",
    summary: "Premium panoramik shisha tomlar va avtomatlashtirilgan surilma tizimlari uchun biofilik, yuqori konversiyali dizayn shousi.",
    description: "Lumen Roof loyihasi — zamonaviy arxitektura va hashamatli villalar uchun tabiiy yorug'lik simulyatori va avtomatik surilma tom tizimlarini namoyish etuvchi yuqori darajadagi estetik landing page. Dinamik kunduz/tun yorug'lik effektlari, 7 yillik kafolat kalkulyatori va interaktiv konfigurator bilan jihozlangan.",
    metrics: [
      { label: "Yuklanish tezligi", value: "0.38s" },
      { label: "Mijoz konversiyasi", value: "4.8x" },
      { label: "Google PageSpeed", value: "99 / 100" }
    ],
    tech: ["Vanilla High-Performance JS", "CSS 3D Transforms", "GPU Light Shaders", "Responsive Grid"],
    liveUrl: "https://lumen-roof-site.vercel.app",
    featured: true,
    accentColor: "#eab308",
    highlights: [
      "Interaktiv kunduz/tun yorug'lik va energiya tejamkorlik simulyatsiyasi",
      "Tabiiy quyosh burchaklariga moslashuvchan vizual render",
      "Mijozlar uchun to'g'ridan-to'g'ri o'lcham kiritib smeta olish formasi",
      "Ultra-yengil kod bazasi (kutubxonasiz 60fps silliqlik)"
    ]
  },
  {
    id: "favorites",
    title: "Javohirbek's Favorites — 3D VHS Archive",
    category: "web3d",
    categoryLabel: "3D & Veb",
    badge: "3D Tajriba",
    date: "Noyabr 2026",
    summary: "Haqiqiy 3D fizika, bahor animatsiyalari va dinamik yorug'likka ega interaktiv retro kinoteka javoni.",
    description: "Retro VHS kassetalari javoni ko'rinishidagi interaktiv 3D tajriba. Har bir kasseta kursorni kuzatadi, tebranish fizikasi bilan javondan tortib olinadi, ochilganda maxsus SVG siyoh effekti (ink-bleed) va kinematografik modal orqali to'liq ma'lumotlarni ochib beradi.",
    metrics: [
      { label: "Render silliqligi", value: "60 FPS" },
      { label: "Fizik interaktivlik", value: "Spring 3D" },
      { label: "Fayl hajmi", value: "< 70 KB" }
    ],
    tech: ["Modern CSS 3D", "Vanilla JS", "Spring Dynamics", "SVG Ink Filters", "Web Audio"],
    liveUrl: "https://javohirbek-favorites.vercel.app",
    featured: true,
    accentColor: "#6366f1",
    highlights: [
      "Haqiqiy 3D fazoda kursor ta'sirida burchak o'zgarishi",
      "Fizikaga asoslangan bahor (spring) interpolyatsiyasi",
      "Retrofuturistik audio va siyoh yoyilish effektlari",
      "IMDb bilan bog'langan interaktiv modal tizimi"
    ]
  },
  {
    id: "ovozli-chat",
    title: "Ovozli Chat AI — Real-Time Voice Intelligence",
    category: "ai",
    categoryLabel: "AI & Botlar",
    badge: "Sun'iy Intellekt",
    date: "Noyabr 2026",
    summary: "O'zbek va ko'p tillarda real-vaqt ovozli muloqot va intellektual tahlil qiluvchi avtonom yordamchi.",
    description: "Ovozli Chat AI — foydalanuvchi ovozini bir zumda matnga aylantirish, sun'iy intellekt orqali mantiqiy xulosalar chiqarish va tabiiy intonatsiyali inson ovozida javob qaytarish tizimi. Call-markazlar, mijozlar bilan muloqot va shaxsiy ovozli yordamchi sifatida qo'llaniladi.",
    metrics: [
      { label: "Ovoz javob kechikishi", value: "< 450ms" },
      { label: "Til tushunish aniqligi", value: "97.5%" },
      { label: "Avtonom ish vaqti", value: "24/7" }
    ],
    tech: ["WebRTC", "FastAudio Streaming", "Gemini / OpenAI Voice API", "Node.js", "Tailwind"],
    liveUrl: "https://ovozli-chat-five.vercel.app",
    featured: true,
    accentColor: "#a855f7",
    highlights: [
      "Real-vaqt ovozli to'lqin vizualizatori (Web Audio Analyzer)",
      "O'zbek tilining fonetik nozikliklarini tushunuvchi moslashtirilgan LLM",
      "Kechikishlarsiz to'g'ridan-to'g'ri oqimli audio qaytarish (streaming)",
      "Mijozlar buyurtmalarini ovoz orqali qabul qilib CRM ga saqlash"
    ]
  },
  {
    id: "barber-flow",
    title: "Barber Flow — Smart Queue & Booking OS",
    category: "saas",
    categoryLabel: "SaaS & ERP",
    badge: "Smart Booking",
    date: "Oktyabr 2026",
    summary: "Premium sartaroshxonalar va go'zallik salonlari uchun onlayn navbat, usta band qilish va moliyaviy nazorat tizimi.",
    description: "Mijozlarga o'z sevimli ustasini va qulay vaqtini 15 soniya ichida tanlash imkonini beruvchi, navbat kutishni bartaraf qiluvchi onlayn platforma. Admin panel orqali har bir xodimning tushumi, xizmatlar reytingi va SMS/Telegram bildirishnomalari boshqariladi.",
    metrics: [
      { label: "Navbat kutish qisqarishi", value: "-80%" },
      { label: "Oylik bronlar soni", value: "2,500+" },
      { label: "Bron vaqti", value: "15 soniya" }
    ],
    tech: ["Next.js", "Tailwind CSS", "Telegram Bot API", "Server Actions", "Vercel"],
    liveUrl: "https://barber-flow-dun.vercel.app",
    featured: false,
    accentColor: "#f97316",
    highlights: [
      "Mijoz va usta uchun qulay interaktiv vaqt tanlash kalendari",
      "Navbat yaqinlashganda Telegram orqali avtomatik eslatma",
      "Har bir usta bo'yicha daromad va xizmatlar taqsimoti",
      "Kassa va naqd/karta tushumlarini alohida qayd etish"
    ]
  },
  {
    id: "akfa-bot",
    title: "Akfa Servis Bot — Enterprise Customer Care",
    category: "ai",
    categoryLabel: "AI & Botlar",
    badge: "Telegram Bot",
    date: "Oktyabr 2026",
    summary: "Katta hajmdagi mijozlar murojaatlarini qabul qiluvchi, narxlarni avtomatik hisoblovchi va ustalar bazasiga ulovchi bot.",
    description: "Deraza, eshik va fasad tizimlari xizmatlarini avtomatlashtiruvchi Telegram ekotizimi. Foydalanuvchining geolokatsiyasi bo'yicha eng yaqin brigadani belgilash, taxminiy narx kalkulyatori va kafolat muddatini tekshirish modullarini o'z ichiga oladi.",
    metrics: [
      { label: "Ariza qabul tezligi", value: "1 soniya" },
      { label: "Operator yuki tejalishi", value: "70%" },
      { label: "Avtomatik smeta", value: "99% aniqlik" }
    ],
    tech: ["Node.js", "Telegraf API", "Express", "Vercel Serverless", "PostgreSQL"],
    liveUrl: "https://akfa-servis-bot.vercel.app",
    featured: false,
    accentColor: "#3b82f6",
    highlights: [
      "Ko'p bosqichli buyurtma berish va smeta hisoblash dialogi",
      "Rasm va geolokatsiyani qabul qilib ustaga marshrut chizish",
      "CRM bilan to'liq ikki tomonlama ma'lumot almashinuvi",
      "Mijozlarga xizmat sifatini baholash tizimi"
    ]
  },
  {
    id: "kitchen-3d",
    title: "3D Smart Kitchen — Interior Configurator",
    category: "web3d",
    categoryLabel: "3D & Veb",
    badge: "3D Konfigurator",
    date: "Noyabr 2026",
    summary: "Oshxona va mebellarni real-vaqtda 3D fazoda rejalashtirish, material va ranglarini almashtirish interfeysi.",
    description: "Mebel ishlab chiqaruvchilar va xaridorlar uchun mo'ljallangan interaktiv 3D konfigurator. Foydalanuvchi bir tugma bilan fasad materialini (akril, emal, MDF, tabiiy yog'och), stol usti toshini va yoritish rejimlarini o'zgartirishi va darhol xarid narxini ko'rishi mumkin.",
    metrics: [
      { label: "3D Render tezligi", value: "60 FPS" },
      { label: "Material variantlari", value: "48+" },
      { label: "Smeta chiqarish", value: "Darhol" }
    ],
    tech: ["Three.js", "OrbitControls", "PBR Textures", "Vanilla JS", "GLTF Loader"],
    liveUrl: "#order-section",
    featured: false,
    accentColor: "#ec4899",
    highlights: [
      "Real vaqtda fotorealistik materiallar va aks ettirish (reflections)",
      "O'lchamlarni dinamik o'zgartirish va narxni qayta hisoblash",
      "Kamera burchaklarini avtomatik kinematografik aylantirish",
      "Tayyor konfiguratsiyani PDF va rasm sifatida yuklab olish"
    ]
  }
];

// Service catalog for the Order Configurator
const SERVICES_CATALOG = [
  {
    id: "landing",
    name: "Landing Page & Korporativ Sayt",
    icon: "globe",
    basePrice: 350,
    baseDays: 5,
    description: "Yuqori konversiyali, premium vizual dizayn, 3D elementlar, 99+ Google PageSpeed ko'rsatkichi.",
    recommendedFor: "Kompaniyalar, yangi startaplar va mahsulot taqdimotlari"
  },
  {
    id: "saas",
    name: "SaaS, ERP & CRM Tizimlari",
    icon: "database",
    basePrice: 850,
    baseDays: 14,
    description: "A'zolar boshqaruvi, to'lovlar, avtomatlashtirilgan hisob-kitob, xodimlar va kassa tahlili.",
    recommendedFor: "Klinikalar, o'quv markazlari, fitnes klublar, ishlab chiqarish"
  },
  {
    id: "ai_bot",
    name: "AI Agent & Telegram Botlar",
    icon: "bot",
    basePrice: 380,
    baseDays: 5,
    description: "24/7 avtonom sotuv botlari, ChatGPT / Claude / Gemini integratsiyasi, ovozli muloqot va CRM sinxronizatsiyasi.",
    recommendedFor: "Onlayn do'konlar, xizmat ko'rsatish va mijozlarni qabul qilish"
  },
  {
    id: "cad_industry",
    name: "CAD, CNC & Sanoat Dasturlari",
    icon: "cpu",
    basePrice: 1200,
    baseDays: 20,
    description: "Material tejash optimizatorlari (Nesting), 2D/3D chizmachilik, DXF/G-code generatsiyasi, Desktop dasturlar.",
    recommendedFor: "Zavodlar, shisha/metall/mebel kesish korxonalari"
  },
  {
    id: "mobile_app",
    name: "Mobil Ilova (iOS & Android)",
    icon: "smartphone",
    basePrice: 950,
    baseDays: 18,
    description: "Flutter yoki React Native asosida tezkor, chiroyli va qulay kross-platforma mobil ilovalar.",
    recommendedFor: "Yetkazib berish xizmatlari, shaxsiy kabinetlar, servislar"
  }
];

// Add-on options
const ADDONS_CATALOG = [
  { id: "telegram_sync", name: "Telegram Bot & Guruhga Xabarnoma", price: 80, days: 1, desc: "Barcha arizalar lahzada Telegramingizga keladi" },
  { id: "payments", name: "To'lov Shlyuzlari (Click / Payme / Uzum)", price: 140, days: 2, desc: "Mijozlardan onlayn to'lovlarni qabul qilish" },
  { id: "ai_integration", name: "Sun'iy Intellekt (AI Chatbot / Voice)", price: 180, days: 3, desc: "Mijozlarga o'zbek/rus/ingliz tilida aqlli javoblar" },
  { id: "admin_dash", name: "Admin Boshqaruv Paneli (Dashboard)", price: 160, days: 3, desc: "Sayt va tizimni qulay boshqarish interfeysi" },
  { id: "multilang", name: "Ko'p Tilli Tizim (O'zbek, Rus, Ingliz)", price: 70, days: 1, desc: "Saytni 3 ta tilda mukammal ishga tushirish" },
  { id: "web3d_fx", name: "3D Interaktiv Elementlar & Animatsiyalar", price: 150, days: 2, desc: "Mijozlarni hayratda qoldiruvchi vizual effektlar" },
  { id: "vip_support", name: "1 Yillik Kafolatlangan Texnik Ko'mak", price: 120, days: 0, desc: "Xavfsizlik, yangilanishlar va 24/7 nazorat" }
];
