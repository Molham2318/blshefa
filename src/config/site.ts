/**
 * ONE FILE TO CUSTOMIZE THE WHOLE SITE.
 * Change the restaurant name, contact info, hours, menu, offers, images and reservation settings here.
 * Brand colors live in src/index.css (--brand-* variables).
 */

export const SITE = {
  name: "دار النكهة",
  tagline: "كل طبق له حكاية.",
  title: "دار النكهة | مطعم مصري وشرقي راقٍ في القاهرة الجديدة",
  description:
    "دار النكهة مطعم مصري وشرقي في القاهرة الجديدة: مشويات على الفحم، أطباق مصرية أصيلة، حجز طاولات وطلب أونلاين بسهولة.",
  phoneDisplay: "0100 123 4567",
  phoneTel: "+201001234567",
  /** WhatsApp number in international format, digits only */
  whatsapp: "201001234567",
  whatsappDisplay: "0100 123 4567",
  email: "hello@darnakha.example",
  address: "شارع التسعين، القاهرة الجديدة، القاهرة، مصر",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("شارع التسعين، القاهرة الجديدة"),
  mapsEmbed:
    "https://www.google.com/maps?q=" + encodeURIComponent("شارع التسعين، القاهرة الجديدة") + "&output=embed",
  hours: [
    { days: "السبت – الخميس", time: "12:00 ظهراً – 1:00 صباحاً" },
    { days: "الجمعة", time: "1:00 ظهراً – 2:00 صباحاً" },
  ],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
  },
  currency: "جنيه",
  deliveryFee: 30,
  /** Orders at or above this subtotal get free delivery (set 0 to disable) */
  freeDeliveryFrom: 600,
  copyright: "© 2026 دار النكهة. جميع الحقوق محفوظة.",
  heroImage:
    "https://images.unsplash.com/photo-1708615017161-2eff302d0389?auto=format&q=70&fit=crop&w=1400",
  stats: [
    { value: "+8", label: "سنوات من الخبرة" },
    { value: "+50", label: "طبق في المنيو" },
    { value: "+10,000", label: "عميل" },
    { value: "4.9/5", label: "تقييم العملاء" },
  ],
  rating: { score: "4.9", outOf: "5", count: "1,240" },
};

/** Database table IDs used for saving orders and reservations */
export const TABLES = { orders: 99364, reservations: 99365 };

export type Category = { id: string; label: string };
export const CATEGORIES: Category[] = [
  { id: "grill", label: "المشويات" },
  { id: "chicken", label: "الفراخ" },
  { id: "meat", label: "اللحوم" },
  { id: "egyptian", label: "الأطباق المصرية" },
  { id: "starters", label: "المقبلات" },
  { id: "desserts", label: "الحلويات" },
  { id: "drinks", label: "المشروبات" },
];

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const MENU: MenuItem[] = [
  {
    id: "mix-grill", category: "grill", name: "مكس جريل دار النكهة",
    description: "كفتة وكباب وفراخ مشوية مع أرز بسمتي وسلطة.", price: 320,
    image: "https://images.unsplash.com/photo-1653982960203-c8361d7bed96?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "kebab", category: "grill", name: "كباب لحم مشوي",
    description: "قطع لحم طرية متبلة ومشوية على الفحم.", price: 290,
    image: "https://images.unsplash.com/photo-1577367997065-fdd8fd94fb3f?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "kofta", category: "grill", name: "كفتة الفحم",
    description: "كفتة لحم متبلة بتوابلنا الخاصة ومشوية على الفحم.", price: 220,
    image: "https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "half-chicken", category: "chicken", name: "نصف فرخة مشوية",
    description: "نصف فرخة متبلة ومشوية مع أرز وسلطة.", price: 185,
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "shawarma", category: "chicken", name: "شاورما فراخ",
    description: "شاورما فراخ متبلة مع بطاطس وصوص الثوم.", price: 150,
    image: "https://images.unsplash.com/photo-1719282431565-3b30bb7d2658?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "fatta", category: "meat", name: "فتة لحمة",
    description: "أرز وعيش محمص مع صوص الثوم والخل وقطع اللحم.", price: 210,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "warak-enab", category: "egyptian", name: "ورق عنب",
    description: "ورق عنب محشي بالأرز والأعشاب الطازجة على الطريقة المصرية.", price: 85,
    image: "https://images.unsplash.com/photo-1759679134771-835a874351fe?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "hummus", category: "starters", name: "حمص بالطحينة",
    description: "حمص ناعم بالطحينة وزيت الزيتون يقدم مع العيش الساخن.", price: 70,
    image: "https://images.unsplash.com/photo-1772795713617-b09b725d0919?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "lentil-soup", category: "starters", name: "شوربة عدس",
    description: "شوربة عدس دافئة بالكمون تقدم مع الليمون والعيش المحمص.", price: 65,
    image: "https://images.unsplash.com/photo-1605909388460-74ec8b204127?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "om-ali", category: "desserts", name: "أم علي",
    description: "حلوى مصرية ساخنة بالحليب والمكسرات من فرن الدار.", price: 85,
    image: "https://images.unsplash.com/photo-1772729294786-7a264601887b?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "kunafa", category: "desserts", name: "كنافة بالقشطة",
    description: "كنافة مقرمشة محشوة بالقشطة مع القطر.", price: 95,
    image: "https://images.unsplash.com/photo-1778447830669-8fe9626ed738?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "mango", category: "drinks", name: "عصير مانجو طبيعي",
    description: "عصير مانجو طازج من الفاكهة الطبيعية بدون إضافات.", price: 60,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "lemon-mint", category: "drinks", name: "ليمون بالنعناع",
    description: "ليمون منعش مع النعناع الطازج والثلج.", price: 55,
    image: "https://images.unsplash.com/photo-1575596510825-f748919a2bf7?auto=format&q=70&fit=crop&w=600",
  },
  {
    id: "soda", category: "drinks", name: "مشروب غازي",
    description: "مشروب غازي بارد من اختيارك.", price: 35,
    image: "https://images.unsplash.com/photo-1544241907-f3f1f5ded15a?auto=format&q=70&fit=crop&w=600",
  },
];

export type Offer = {
  id: string;
  title: string;
  description: string;
  oldPrice?: number;
  price: number;
  button: string;
  image: string;
  badge: string;
};

export const OFFERS: Offer[] = [
  {
    id: "offer-family", title: "عرض العائلة 🔥",
    description: "مكس جريل كبير + 4 أطباق جانبية + 4 مشروبات",
    oldPrice: 620, price: 499, button: "اطلب العرض", badge: "وفّر 121 جنيه",
    image: "https://images.unsplash.com/photo-1653983194833-7a10838b12f4?auto=format&q=70&fit=crop&w=900",
  },
  {
    id: "offer-lunch", title: "غداء لشخصين ❤️",
    description: "2 وجبة رئيسية + 2 مشروب + مقبلات",
    price: 399, button: "اطلب الآن", badge: "الأكثر طلباً",
    image: "https://images.unsplash.com/photo-1710091691802-7dedb8af9a77?auto=format&q=70&fit=crop&w=900",
  },
];

export const CHEF = {
  name: "الشيف أحمد المصري",
  description:
    "خبرة أكثر من 15 عاماً في المطبخ المصري والشرقي، وشغف بتقديم الأكلات التقليدية بطريقة عصرية.",
  image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&q=70&fit=crop&w=800",
};

export const ABOUT = {
  text: "في دار النكهة، بنجمع بين أصالة المطبخ المصري وروح المطبخ الشرقي الحديث. بنختار مكوناتنا بعناية، ونحضّر كل طبق يومياً علشان نقدم لك طعم يفضل في ذاكرتك.",
  image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?auto=format&q=70&fit=crop&w=900",
};

export const FEATURES = [
  { icon: "🍖", title: "مكونات طازجة يومياً", text: "لحوم وخضار نختارها كل صباح من أفضل الموردين." },
  { icon: "🔥", title: "شواية على الفحم", text: "نكهة الفحم الأصيلة اللي بتفرّق في كل قطعة مشوية." },
  { icon: "👨‍🍳", title: "شيفات محترفون", text: "فريق مطبخ بخبرة طويلة في المطبخ المصري والشرقي." },
  { icon: "❤️", title: "خدمة نهتم بتفاصيلها", text: "استقبال دافئ وخدمة سريعة تخلي زيارتك مريحة." },
];

export const REVIEWS = [
  { name: "محمد أحمد", text: "الأكل ممتاز جداً والخدمة محترمة، والمكان هادي وجميل." },
  { name: "سارة محمود", text: "المكس جريل من أحسن الحاجات اللي جربتها، أكيد هرجع تاني." },
  { name: "كريم علي", text: "المكان مناسب جداً للعائلات والأكل وصل سخن." },
];

export const AREAS = ["داخل المطعم", "التراس", "غرفة خاصة"];
export const TIME_SLOTS = [
  "12:00 ظهراً", "1:00 ظهراً", "2:00 ظهراً", "3:00 عصراً", "4:00 عصراً", "5:00 مساءً",
  "6:00 مساءً", "7:00 مساءً", "8:00 مساءً", "9:00 مساءً", "10:00 مساءً", "11:00 مساءً",
];
export const MAX_GUESTS = 12;

export type GalleryImage = { src: string; alt: string; tall?: boolean };
export const GALLERY: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1577367997065-fdd8fd94fb3f?auto=format&q=70&fit=crop&w=700", alt: "مشويات لحم على الفحم", tall: true },
  { src: "https://images.unsplash.com/photo-1610057098265-05f2bcbedd55?auto=format&q=70&fit=crop&w=700", alt: "فراخ مشوية" },
  { src: "https://images.unsplash.com/photo-1710091691777-3115088962c4?auto=format&q=70&fit=crop&w=700", alt: "أطباق مصرية تقليدية" },
  { src: "https://images.unsplash.com/photo-1778447812923-88a9e3e6b567?auto=format&q=70&fit=crop&w=700", alt: "حلويات شرقية", tall: true },
  { src: "https://images.unsplash.com/photo-1636405189493-181ecf851006?auto=format&q=70&fit=crop&w=700", alt: "صالة المطعم من الداخل" },
  { src: "https://images.unsplash.com/photo-1761078739814-245f6e2943a6?auto=format&q=70&fit=crop&w=700", alt: "الجلسات الخارجية", tall: true },
  { src: "https://images.unsplash.com/photo-1621494548002-bfc916172ead?auto=format&q=70&fit=crop&w=700", alt: "الشيف أثناء تحضير الطعام" },
  { src: "https://images.unsplash.com/photo-1792778238805-10da46498861?auto=format&q=70&fit=crop&w=700", alt: "عائلة تتناول الطعام معاً" },
];

export const NAV_LINKS = [
  { href: "#home", label: "الرئيسية" },
  { href: "#about", label: "من نحن" },
  { href: "#menu", label: "المنيو" },
  { href: "#offers", label: "العروض" },
  { href: "#reservation", label: "الحجز" },
  { href: "#gallery", label: "معرض الصور" },
  { href: "#reviews", label: "آراء العملاء" },
  { href: "#contact", label: "تواصل معنا" },
];

export const formatPrice = (n: number) => `${n.toLocaleString("en-US")} ${SITE.currency}`;
