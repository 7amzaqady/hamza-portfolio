import type { Lang } from "../i18n/context";

type Copy = Record<Lang, string>;

export const UI = {
  navHome: { ar: "الرئيسية", en: "Home" },
  navWork: { ar: "الأعمال", en: "Work" },
  navAbout: { ar: "عني", en: "About" },
  navServices: { ar: "الخدمات", en: "Services" },
  navContact: { ar: "تواصل", en: "Contact" },

  menu: { ar: "القائمة", en: "Menu" },
  close: { ar: "إغلاق", en: "Close" },
  langSwitch: { ar: "English", en: "العربية" },
  langLabel: { ar: "اللغة", en: "Language" },

  heroAvailable: { ar: "متاح لمشاريع جديدة", en: "Available for new work" },
  heroScroll: { ar: "انزل للأسفل", en: "Scroll" },
  heroBasedIn: { ar: "مقيم في", en: "Based in" },
  heroSince: { ar: "يعمل منذ 2019", en: "Working since 2019" },

  worksEyebrow: { ar: "أعمال مختارة", en: "Selected work" },
  worksTitle: { ar: "مشاريع تبني علامات", en: "Work that builds brands" },
  worksHint: {
    ar: "اسحب على الصور أو كبّرها لعرض التفاصيل",
    en: "Drag the frames or click to open the case",
  },
  allWorks: { ar: "كل المشاريع", en: "All projects" },
  viewCase: { ar: "افتح المشروع", en: "Open case" },
  closeCase: { ar: "إغلاق", en: "Close" },
  caseServices: { ar: "الخدمات", en: "Services" },
  caseYear: { ar: "السنة", en: "Year" },
  caseClient: { ar: "العميل", en: "Client" },
  caseRole: { ar: "الدور", en: "Role" },
  caseOverview: { ar: "نظرة عامة", en: "Overview" },
  nextCase: { ar: "المشروع التالي", en: "Next project" },

  aboutEyebrow: { ar: "عني", en: "About" },
  aboutTitle: {
    ar: "صمّم لإقناع، مش للتزيين",
    en: "Designed to convince, not to decorate",
  },
  aboutSignature: { ar: "حمزة قاضي", en: "Hamza Qady" },
  experience: { ar: "الخبرة", en: "Experience" },
  capabilities: { ar: "المهارات", en: "Capabilities" },
  downloadCv: { ar: "حمّل السيرة الذاتية", en: "Download CV" },

  servicesEyebrow: { ar: "الخدمات", en: "Services" },
  servicesTitle: {
    ar: "شو بقدر أشتغل عليه",
    en: "What I can take on",
  },
  processEyebrow: { ar: "طريقة العمل", en: "Process" },
  processTitle: { ar: "من أول مكالمة للتسليم", en: "From first call to handover" },

  contactEyebrow: { ar: "تواصل", en: "Contact" },
  contactTitle: {
    ar: "عندك مشروع؟ خلينا نحكي",
    en: "Got a project? Let's talk",
  },
  contactBody: {
    ar: "اكتبلي سطرين عن المشروع، أنا برد خلال 24 ساعة أيام العمل.",
    en: "Send a couple of lines about the project, I reply within 24 hours on weekdays.",
  },
  contactCta: { ar: "أرسل إيميل", en: "Send an email" },
  contactOr: { ar: "أو على", en: "or on" },
  nameLabel: { ar: "الاسم", en: "Name" },
  emailLabel: { ar: "الإيميل", en: "Email" },
  messageLabel: { ar: "الرسالة", en: "Message" },
  sendLabel: { ar: "إرسال", en: "Send" },
  sentTitle: { ar: "وصلت رسالتك", en: "Message sent" },
  sentBody: {
    ar: "شكراً لك، برد عليك بأقرب وقت.",
    en: "Thanks — I'll get back to you shortly.",
  },
  againLabel: { ar: "إرسال رسالة ثانية", en: "Send another" },
  formRequired: { ar: "عبّي كل الحقول", en: "Fill in every field" },
  formEmail: { ar: "الإيميل غلط", en: "Check the email" },

  footerRights: { ar: "كل الحقوق محفوظة", en: "All rights reserved" },
  footerTop: { ar: "فوق", en: "Top" },
  localTime: { ar: "الوقت عندي", en: "Local time" },
  builtWith: { ar: "صُمّم وطُوّر هذا الموقع", en: "Designed & built" },
} satisfies Record<string, Copy>;

export const ABOUT_BODY: Record<Lang, string[]> = {
  ar: [
    "أنا حمزة، مصمم جرافيك وتجارب رقمية من مونتريال. أشتغل مع علامات بتكبر، وعلامات بتغيّر شكلها لأول مرة.",
    "طريقتي بسيطة: أفهم المشكلة كويس، أقلل الخيارات لقرار واحد، وبعدها أنفّذ بتفصيل ممل شوي — بمعنى جيد.",
    "عملت مع علامات أكل، قهوة، صوت، ومجلات بيانات، ومن كل مشروع طلعت بقاعدة تصميم جديدة.",
  ],
  en: [
    "I'm Hamza, a graphic and digital designer based in Montreal. I work with brands that are growing, and brands redesigning for the first time.",
    "My process is simple: understand the problem properly, narrow it to one decision, then execute with a slightly obsessive level of detail — in a good way.",
    "I've worked with food labels, roasters, sound studios and data magazines, and each project left me with a new rule to design by.",
  ],
};

export const CAPABILITIES = {
  ar: [
    "هوية بصرية",
    "أنظمة تصميم",
    "تصميم واجهات",
    "اتجاه فني",
    "موشن جرافيك",
    "تصميم تغليف",
    "تايبوغرافي",
    "تحرير بصري",
    "إشراف طباعة",
  ],
  en: [
    "Brand identity",
    "Design systems",
    "UI design",
    "Art direction",
    "Motion graphics",
    "Packaging",
    "Typography",
    "Editorial design",
    "Print production",
  ],
};
