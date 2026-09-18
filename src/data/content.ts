import work01 from "../assets/work/work-01.jpg";
import work02 from "../assets/work/work-02.jpg";
import work03 from "../assets/work/work-03.jpg";
import work04 from "../assets/work/work-04.jpg";
import work05 from "../assets/work/work-05.jpg";
import work06 from "../assets/work/work-06.jpg";

import type { Lang } from "../i18n/context";

export const PROFILE = {
  name: { ar: "حمزة قاضي", en: "Hamza Qady" },
  initials: { ar: "ح.ق", en: "HQ" },
  role: { ar: "مصمم جرافيك وتجارب رقمية", en: "Graphic & Digital Designer" },
  location: { ar: "مونتريال، كندا", en: "Montreal, Canada" },
  email: "hello@hamzaqady.com",
  socials: [
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export type Work = {
  id: string;
  index: string;
  title: Record<Lang, string>;
  category: Record<Lang, string>;
  year: string;
  services: Record<Lang, string[]>;
  summary: Record<Lang, string>;
  description: Record<Lang, string[]>;
  image: string;
};

export const WORKS: Work[] = [
  {
    id: "awn",
    index: "01",
    title: { ar: "عون", en: "AWN" },
    category: { ar: "هوية بصرية", en: "Brand Identity" },
    year: "2025",
    services: {
      ar: ["استراتيجية العلامة", "شعار ونظام بصري", "مطبوعات"],
      en: ["Brand strategy", "Logo & visual system", "Print collateral"],
    },
    summary: {
      ar: "هوية كاملة لعلامة أغذية طبيعية، مبنية على الشكل العضوي والبساطة.",
      en: "A complete identity for a natural foods label, built on organic form and restraint.",
    },
    description: {
      ar: [
        "عون علامة أغذية طبيعية بتحتاج هوية تفصلها عن الضجة الموجودة بالرفوف. بلشنا من كلمة وحدة: الأصالة.",
        "بنينا نظام بصري حوالين شكل عضوي واحد يتكرر بالنقش والنقش البارز (embossing)، مع لوحة لون هادية ولمسة برتقالية وحدة تعمل كمحطة نظر بالرف.",
        "النظام طُبّق على تغليف، أكياس، بطاقات، وقوالب سوشال، مع دليل هوية من 48 صفحة يحدد القواعد لكل قناة.",
      ],
      en: [
        "AWN is a natural foods label that needed an identity able to cut through a crowded shelf.",
        "We built the system around one organic mark, repeated through debossing, pattern and print, on a quiet palette with a single vermilion signal color.",
        "The system shipped across packaging, paper bags, cards and social templates, documented in a 48-page brand guideline.",
      ],
    },
    image: work01,
  },
  {
    id: "layl",
    index: "02",
    title: { ar: "مهرجان ليل", en: "LAYAL Festival" },
    category: { ar: "حملة ملصقات", en: "Poster Campaign" },
    year: "2025",
    services: {
      ar: ["اتجاه فني", "تايبوغرافي", "تصميم ملصقات"],
      en: ["Art direction", "Typography", "Poster design"],
    },
    summary: {
      ar: "سلسلة ملصقات لمهرجان موسيقي، تايبوغرافي جسور وتباين عالٍ.",
      en: "A poster series for a music festival — loud typography, high contrast.",
    },
    description: {
      ar: [
        "ليل مهرجان موسيقي مستقل، وطلبوا هوية إعلانية تعيش على الحيط وفي الفيد، مش بالمطبوعات الفخمة.",
        "اعتمدنا شبكة صارمة، حروف ضخمة تُقصّ عند الحواف، ولونين فقط: أبيض مكسور وأخضر حامض يوصل للإضاءة الليلية.",
        "أنتجنا 12 ملصق رئيسي + نسخ متحركة لكل منصة، وكل نسخة تشتغل مستقلة وبنفس الوقت تنتمي للعائلة.",
      ],
      en: [
        "LAYAL is an independent music festival that needed advertising work built for walls and feeds, not premium print.",
        "We used a strict grid, oversized type cropped at the edges, and only two colors: broken white and an acid green that reads as night lighting.",
        "The result is 12 key posters plus motion variants per platform — each one stands alone and still belongs to the same family.",
      ],
    },
    image: work02,
  },
  {
    id: "nabd",
    index: "03",
    title: { ar: "نبض", en: "NABD" },
    category: { ar: "تصميم منتج", en: "Product Design" },
    year: "2024",
    services: {
      ar: ["UX", "نظام تصميم", "واجهة داكنة"],
      en: ["UX", "Design system", "Dark UI"],
    },
    summary: {
      ar: "تطبيق تتبع لياقة: تدفق واضح وواجهة داكنة مبنية على نظام تصميم كامل.",
      en: "A fitness tracking app: clear flows and a dark UI backed by a full design system.",
    },
    description: {
      ar: [
        "نبض تطبيق لتتبع التمارين والنوم، وكانت مشكلته إن المستخدم يفتحه مرة وبعدها يتركه.",
        "أعدنا ترتيب التدفق حوالين هدف واحد: تسجيل التمرين بأقل من 20 ثانية، وحذفنا كل خطوة ماله لزوم.",
        "بنينا نظام تصميم داكن بـ 42 مكوّن، مع تباعد وأحجام واضحة، وحوّلناه لتوكنز جاهزة للتنفيذ مع فريق التطوير.",
      ],
      en: [
        "NABD tracks workouts and sleep, but users would open it once and abandon it.",
        "We rebuilt the flow around a single promise: log a workout in under 20 seconds, cutting every unnecessary step.",
        "We shipped a dark design system of 42 components with a clear type and spacing scale, delivered as tokens ready for the dev team.",
      ],
    },
    image: work03,
  },
  {
    id: "qahwa",
    index: "04",
    title: { ar: "قهوة المرّ", en: "Al Murr Coffee" },
    category: { ar: "تغليف", en: "Packaging" },
    year: "2024",
    services: {
      ar: ["تصميم تغليف", "تسمية", "إنتاج طباعي"],
      en: ["Packaging design", "Naming", "Print production"],
    },
    summary: {
      ar: "نظام تغليف لمحمصة قهوة مختصة، يشتغل على الرف ويشتغل باليد.",
      en: "A packaging system for a specialty roaster that works on shelf and in hand.",
    },
    description: {
      ar: [
        "محمصة صغيرة بتعمل تحميص مختص، بدها تغليف يوضح الفرق بين درجات التحميص بدون ما يصير مزدحم.",
        "استخدمنا لون واحد لكل درجة تحميص على خلفية سوداء مطفية، مع بطاقة معلومات قابلة للتغيير بدل إعادة طبع الكيس كامل.",
        "هيك قدرت المحمصة تضيف درجات جديدة بتكلفة طباعة أقل، وضل الشكل موحّد على الرف.",
      ],
      en: [
        "A small specialty roaster needed packaging that communicates roast levels without becoming noisy.",
        "We assigned one color per roast over a matte black base, with a swappable info card instead of reprinting the whole bag.",
        "That let the roaster launch new roasts at lower print cost while keeping the shelf presence consistent.",
      ],
    },
    image: work04,
  },
  {
    id: "sada",
    index: "05",
    title: { ar: "صدى", en: "SADA" },
    category: { ar: "موشن وهوية متحركة", en: "Motion & Identity" },
    year: "2023",
    services: {
      ar: ["موشن جرافيك", "هوية متحركة", "ساوند ديزاين"],
      en: ["Motion graphics", "Animated identity", "Sound design"],
    },
    summary: {
      ar: "هوية متحركة لاستوديو صوت، كل عنصر بصري يتصرف مثل الموجة.",
      en: "An animated identity for a sound studio where every element behaves like a wave.",
    },
    description: {
      ar: [
        "صدى استوديو صوت، فالهوية لازم تُسمع قبل ما تُقرأ. بنينا الشعار على موجة تتغير شدتها حسب الاستخدام.",
        "كل عنصر بصري مشتق من منحنى واحد: النهايات، الانتقالات، وحتى أشرطة التحميل.",
        "النتيجة هوية تعيش بالفيديو والإنترو والتيك توك، وبنفس الوقت تصلح للتوقيع الثابت.",
      ],
      en: [
        "SADA is a sound studio, so the identity had to be heard before it was read. The logo is built on a wave whose amplitude shifts with use.",
        "Every visual element derives from a single curve: corners, transitions and even loading bars.",
        "The result is an identity that lives in video, intros and social, yet still survives as a static signature.",
      ],
    },
    image: work05,
  },
  {
    id: "marsad",
    index: "06",
    title: { ar: "مرصد", en: "MARSAD" },
    category: { ar: "تصميم ويب", en: "Web Design" },
    year: "2023",
    services: {
      ar: ["تصميم واجهات", "تحرير وتايبوغرافي", "تنفيذ أمامي"],
      en: ["UI design", "Editorial layout", "Front-end"],
    },
    summary: {
      ar: "موقع لمجلة تحقيقات بيانات: تحرير ورقي بروح رقمية.",
      en: "A site for a data journalism magazine: print editorial with a digital pulse.",
    },
    description: {
      ar: [
        "مرصد مجلة تحقيقات بيانات، بدها موقع يوصل المعلومة بسرعة ويحس القارئ إنه يقرأ مجلة مطبوعة.",
        "قسّمنا الصفحة لشبكة 12 عمود، وبعناصر تفاعلية تظهر فقط لما القارئ يحتاجها.",
        "كمان نبّهنا على الأداء: الصفحة تفتح بأقل من ثانية على موبايل متوسط، بدون ما نخسر الجمال.",
      ],
      en: [
        "MARSAD is a data journalism magazine that needed a fast reading experience with the feel of print.",
        "We designed on a 12-column grid and kept interactivity to what a reader actually needs at each scroll depth.",
        "Performance was part of the brief: full load under a second on a mid-range phone, with no compromise on craft.",
      ],
    },
    image: work06,
  },
];

export const SERVICES = [
  {
    id: "branding",
    title: { ar: "هوية بصرية", en: "Brand Identity" },
    body: {
      ar: "من الاستراتيجية للشعار للنظام البصري الكامل، مع دليل استخدام يخلي الهوية تعيش سنوات.",
      en: "From strategy to logo to a full visual system, documented in guidelines that keep the brand alive for years.",
    },
  },
  {
    id: "ui",
    title: { ar: "تصميم واجهات ومنتج", en: "UI & Product Design" },
    body: {
      ar: "واجهات داكنة وفاتحة، أنظمة تصميم، وتدفقات مستخدم مبنية على قرار واحد واضح.",
      en: "Light and dark interfaces, design systems and user flows built around one clear decision.",
    },
  },
  {
    id: "motion",
    title: { ar: "موشن وهوية متحركة", en: "Motion & Animated Identity" },
    body: {
      ar: "هوية تتحرك: إنترو، إعلانات قصيرة، وأنظمة حركة متسقة لكل منصة.",
      en: "Identity in movement: intros, short-form ads and a consistent motion system per platform.",
    },
  },
  {
    id: "art",
    title: { ar: "اتجاه فني وطباعة", en: "Art Direction & Print" },
    body: {
      ar: "حملات، ملصقات، وتغليف مع إشراف كامل على الإنتاج والطباعة.",
      en: "Campaigns, posters and packaging with full supervision of production and print.",
    },
  },
];

export const PROCESS = [
  {
    step: { ar: "١", en: "01" },
    title: { ar: "فهم", en: "Understand" },
    body: {
      ar: "جلسة معك، أسئلة مباشرة، وتحديد مين المستخدم وشو المشكلة الحقيقية — قبل أي تصميم.",
      en: "A session with you, direct questions, and a clear read on who the audience is and what the real problem is — before any design.",
    },
  },
  {
    step: { ar: "٢", en: "02" },
    title: { ar: "اتجاه", en: "Direction" },
    body: {
      ar: "لوحين أو تلات اتجاهات بصرية واضحة، كل واحد بمزاجه، وبعدها قرار واحد نهائي.",
      en: "Two or three distinct visual directions, each with its own mood, then one final decision.",
    },
  },
  {
    step: { ar: "٣", en: "03" },
    title: { ar: "تنفيذ", en: "Craft" },
    body: {
      ar: "شغل تفصيلي على كل عنصر: المسافات، التايبوغرافي، وحتى زوايا الصور.",
      en: "Detailed work on every element: spacing, typography, even the angles of the photography.",
    },
  },
  {
    step: { ar: "٤", en: "04" },
    title: { ar: "تسليم", en: "Handover" },
    body: {
      ar: "ملفات منظمة، دليل استخدام، ودعم بعد التسليم لحد ما كل شي يمشي صح.",
      en: "Organized files, usage guidelines, and support after delivery until everything runs right.",
    },
  },
];

export type TimelineItem = {
  period: string;
  title: Record<Lang, string>;
  place: Record<Lang, string>;
};

export const TIMELINE: TimelineItem[] = [
  {
    period: "2023 — الآن",
    title: { ar: "مصمم مستقل", en: "Independent Designer" },
    place: { ar: "عمل حر", en: "Freelance" },
  },
  {
    period: "2021 — 2023",
    title: { ar: "مدير فني", en: "Art Director" },
    place: { ar: "استوديو تصميم", en: "Design Studio" },
  },
  {
    period: "2019 — 2021",
    title: { ar: "مصمم جرافيك", en: "Graphic Designer" },
    place: { ar: "وكالة تسويق", en: "Marketing Agency" },
  },
];

export const STATS = [
  { value: "7+", label: { ar: "سنوات خبرة", en: "Years of practice" } },
  { value: "90+", label: { ar: "مشروع منجز", en: "Projects shipped" } },
  { value: "12", label: { ar: "جائزة وترشيح", en: "Awards & features" } },
  { value: "6", label: { ar: "دول عمل معها", en: "Countries worked with" } },
];
