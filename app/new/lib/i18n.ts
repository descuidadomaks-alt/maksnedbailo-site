/**
 * /new — Care Less brand homepage dictionary.
 * EN (default) + native Ukrainian. No English leaking into the UK view.
 *
 * Source of truth: D:\AI Automation\Service\care-less-positioning.md
 * (founder-bottleneck + losing-deals + anti-hype + operator-not-consultant).
 */

import type { NewLocale } from "./locale";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SampleMapDict {
  docTitle: string;
  clientLabel: string;
  sessionLabel: string;
  studioName: string;
  pillarLabels: [string, string, string];
  /** Pain labels for the 6 sample rows (3 pillars x 2 items each) */
  pillarPains: [[string, string], [string, string], [string, string]];
  pillarPrefix: (n: number, label: string) => string;
  colPain: string;
  colLosingNow: string;
  colFeasibility: string;
  colPriority: string;
  phase1Heading: string;
  phase1Rec: string;
  phase1Timeline: string;
  phase1IfProceed: string;
  bleedLabel: string;
  bleedStat: string;
  bleedAnnual: string;
  bleedDesc: (phase1Anchor: string) => string;
  bleedPhase1Label: string;
  bleedPayback: string;
  note: string;
}

export interface ProofCase {
  name: string;
  desc: string;
  tag: string;
  href: string;
}

export interface NewPageDict {
  header: {
    ctaLabel: string;
    aiMapLabel: string;
    blogLabel: string;
  };

  hero: {
    eyebrow: string;
    /** Each entry renders as its own line (preserves the hook's rhythm) */
    headlineLines: string[];
    sub: string;
    primaryCta: string;
    /** Risk-reversal line shown directly under the hero CTA */
    guarantee: string;
    /** Mono mini-proof strip shown in the hero, above the fold */
    proofStrip: string;
    microcopy: string;
  };

  pain: {
    label: string;
    headline: string;
    lines: string[];
    punch: string;
  };

  reframe: {
    label: string;
    headline: string;
    body: string;
    enemies: { title: string; desc: string }[];
  };

  belief: {
    label: string;
    headline: string;
    body: string;
    roleLine: string;
    signature: string;
  };

  map: {
    label: string;
    headline: string;
    body: string;
    bullets: string[];
    sample: SampleMapDict;
    note: string;
  };

  proof: {
    label: string;
    headline: string;
    sub: string;
    liveBadge: string;
    cases: ProofCase[];
    slotLabel: string;
    videoLabel: string;
    videoHeadline: string;
    videoSub: string;
  };

  whyMe: {
    label: string;
    headline: string;
    colThem: string;
    colMe: string;
    rows: [string, string][];
  };

  cta: {
    label: string;
    headline: string;
    sub: string;
    primaryCta: string;
    guarantee: string;
    secondaryCta: string;
    closing: string;
  };

  faq: {
    label: string;
    headline: string;
    items: { q: string; a: string }[];
  };

  footer: {
    credit: string;
    location: string;
    tagline: string;
    waLabel: string;
  };
}

// ─── EN ─────────────────────────────────────────────────────────────────────

const PILLAR_PAINS_EN: [[string, string], [string, string], [string, string]] = [
  ["Lead response delay (>4h avg)", "Manual booking follow-up"],
  ["Knowledge lives in founder's head", "Meeting notes + action tracking"],
  ["Invoice & document processing", "Weekly reporting to stakeholders"],
];

const en: NewPageDict = {
  header: {
    ctaLabel: "Book the Bottleneck Map",
    aiMapLabel: "AI Map",
    blogLabel: "Blog",
  },

  hero: {
    eyebrow: "The founder bottleneck",
    headlineLines: [
      "You're not losing deals because of your team.",
      "You're losing them because you're the bottleneck —",
      "and you can't be everywhere.",
    ],
    sub: "I find the one leak costing you the most — and plug it with AI that actually works. Or I tell you straight where AI isn't the answer.",
    primaryCta: "Book the Bottleneck Map",
    guarantee: "10× the value or you don't pay — and you keep the map.",
    proofStrip: "3 systems live now · Amira · Elena Hotel & SPA · Voice AI",
    microcopy: "90 minutes. One-page map. No price talk yet — that's step two.",
  },

  pain: {
    label: "Sound familiar?",
    headline: "Every decision still routes through you.",
    lines: [
      "Every decision routes through you — even the small ones.",
      "Three €20k deals are sitting in the pipeline because you didn't have time to review them this week.",
      "You win when you're in the room. You lose when you delegate it. But you can't be in four rooms at once.",
      "You tried an AI tool once. It gave a real client hallucinated garbage. Never again.",
    ],
    punch: "If you got hit by a bus tomorrow, does the business survive past Friday?",
  },

  reframe: {
    label: "Before we talk about AI",
    headline: "You don't need another AI tool.",
    body: "Most AI advice right now is hype — and you can't automate chaos. The question isn't “which AI tool?” It's “what's actually worth fixing first?”",
    enemies: [
      {
        title: "AI hype",
        desc: "Gurus screaming “AI agents,” courses that hand you a chatbot that hallucinates in front of your clients.",
      },
      {
        title: "Deck consultants",
        desc: "Never run a real business. They hand you buzzwords, cash the check, and leave.",
      },
      {
        title: "Tool bloat",
        desc: "€2k/month in SaaS nobody logs into. You can't automate chaos — you have to fix it first.",
      },
    ],
  },

  belief: {
    label: "Why I do this",
    headline: "Most founders build a prison and call it a business.",
    body: "It only runs because they personally hold it together. And throwing AI at a messy business doesn't fix it — it just scales the mess. I learned that the hard way: I let go without the right systems, and nearly watched it crash. So now I help founders find the safest, highest-return first move — before they waste money building the wrong thing.",
    roleLine: "Operator, not consultant. I've been the trapped founder — this isn't theory for me.",
    signature: "— Maks Nedbailo, founder, Care Less",
  },

  map: {
    label: "The mechanism",
    headline: "The Bottleneck Map — 90 minutes, ROI-ranked.",
    body: "ROI-first diagnosis, not tools. Process before automation — you can't automate chaos. We spend 90 minutes finding the 3 areas where you're the bottleneck, what each one is costing you, and what's actually worth fixing.",
    bullets: [
      "The 3 areas where you're the bottleneck",
      "What each one is costing you — in time, money, or both",
      "What's worth automating, delegating, simplifying, or ignoring",
      "The one fix to start with — ranked by ROI",
      "Human + AI, never AI-first. Process before automation.",
    ],
    note: "Even Klarna went AI-first, hit a quality wall, and rehired humans. We start where they ended up.",
    sample: {
      docTitle: "Bottleneck Map",
      clientLabel: "[Your Business Name]",
      sessionLabel: "90-MIN SESSION OUTPUT",
      studioName: "Care Less",
      pillarLabels: ["Customer-Facing Communication", "Internal Knowledge & Ops", "Repeatable Execution"],
      pillarPains: PILLAR_PAINS_EN,
      pillarPrefix: (n, label) => `Area ${n} — ${label}`,
      colPain: "Problem",
      colLosingNow: "Losing Now",
      colFeasibility: "AI Feasibility",
      colPriority: "Priority",
      phase1Heading: "Recommended First Move",
      phase1Rec: "#1 — AI Lead Response System · WhatsApp + website · 24/7",
      phase1Timeline: "2–3 weeks",
      phase1IfProceed: "if you proceed",
      bleedLabel: "Example: leaking",
      bleedStat: "~€6,000/mo",
      bleedAnnual: "(~€72k/yr)",
      bleedDesc: (phase1Anchor) =>
        `This business leaks ~€6,000/mo (~€72k/yr) — direct costs plus wasted founder time (~21 hrs/wk). The first move targets the biggest leak (#1 — lead-response delay, ~€2,400/mo): ${phase1Anchor} one-time. Pays for itself in under 2 months — and the savings compound.`,
      bleedPhase1Label: "First move",
      bleedPayback: "Under 2 months",
      note: "Sample output — yours will be specific to your business.",
    },
  },

  proof: {
    label: "Proof",
    headline: "Real systems, live now.",
    sub: "Software in production, handling real conversations every day.",
    liveBadge: "LIVE",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "AI lead-response agent. Replies in 9 seconds across WhatsApp and the website.",
        tag: "UK MedSpa · Lead response",
        href: "/automations/hcmedspa",
      },
      {
        name: "Elena Hotel & SPA",
        desc: "AI agent handles booking requests and answers guest questions — 24/7 via WhatsApp and the website.",
        tag: "Hotel · Booking & Support",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        name: "Voice AI on Site",
        desc: "Voice agent answers site visitor questions in real time — no forms, no waiting.",
        tag: "Demo · Voice Agent",
        href: "https://chasehughes.com/",
      },
    ],
    slotLabel: "More case studies from first sessions — coming soon.",
    videoLabel: "What it's like to work with me",
    videoHeadline: "Hear it from people who've worked with me.",
    videoSub: "Reliable, clear, and focused on the result — not the tooling.",
  },

  whyMe: {
    label: "Why me",
    headline: "Why this isn't another agency pitch.",
    colThem: "Them",
    colMe: "Care Less",
    rows: [
      ["Consultant with a deck", "Operator who's been the trapped founder"],
      ["“AI will transform everything”", "Here's where AI pays off — and where it doesn't"],
      ["Sells you tools", "Sells you clarity, then the one fix worth building"],
      ["Claims to know your industry", "Doesn't pretend to — and doesn't need to"],
    ],
  },

  cta: {
    label: "Find your one leak",
    headline: "Find the leak. Fix it first. Or don't — your call.",
    sub: "90 minutes. One-page, ROI-ranked map of where your time, money, and founder-energy are leaking.",
    primaryCta: "Book the Bottleneck Map",
    guarantee: "10× the value, or you don't pay — and you keep the map either way.",
    secondaryCta: "Message me first",
    closing: "If there's no clear opportunity, I'll tell you. That's part of the work.",
  },

  faq: {
    label: "FAQ",
    headline: "Before you book",
    items: [
      {
        q: "Is this just a sales call?",
        a: "No. It's 90 minutes of real diagnostic work. You'll leave with a one-page map even if we never work together again. If there's no clear opportunity, I'll tell you straight — that's part of the deal.",
      },
      {
        q: "What if AI isn't the answer for my business?",
        a: "Then I'll tell you that, plainly. Sometimes the highest-ROI fix is a process change or a hire — not software. I'd rather lose a sale than oversell you something you don't need.",
      },
      {
        q: "What do I actually walk away with?",
        a: "A one-page, ROI-ranked map: the 3 areas where you're the bottleneck, what each is costing you, what's worth automating / delegating / simplifying / ignoring, and the one fix to start with.",
      },
      {
        q: "Who is this for?",
        a: "Owner-operated businesses around €3–10M revenue, 20–50 staff, where the founder is still the operating system — every decision routes through you, you decide alone, and you have real budget.",
      },
      {
        q: "Who is this NOT for?",
        a: "Solopreneurs under €1M (no team to free up), and 100–1000-employee companies (committee decisions, 6-month cycles — a different process entirely). If that's you, this probably isn't the right fit yet.",
      },
    ],
  },

  footer: {
    credit: "care less AI automation",
    location: "Santander, Spain",
    tagline: "ROI-first AI diagnosis for owner-led businesses. Honest about where AI helps — and where it doesn't.",
    waLabel: "Quick question? Message me on WhatsApp",
  },
};

// ─── UK ─────────────────────────────────────────────────────────────────────

const PILLAR_PAINS_UK: [[string, string], [string, string], [string, string]] = [
  ["Затримка відповіді на ліди (>4 год)", "Ручне ведення нагадувань про бронювання"],
  ["Знання зосереджені в голові засновника", "Нотатки з нарад та відстеження задач"],
  ["Обробка рахунків та документів", "Щотижнева звітність для стейкхолдерів"],
];

const uk: NewPageDict = {
  header: {
    ctaLabel: "Забронювати Карту вузьких місць",
    aiMapLabel: "AI Карта",
    blogLabel: "Блог",
  },

  hero: {
    eyebrow: "Вузьке місце — засновник",
    headlineLines: [
      "Ви втрачаєте угоди не через команду.",
      "Ви втрачаєте їх, бо вузьке місце — це ви,",
      "а бути всюди одразу неможливо.",
    ],
    sub: "Я знаходжу витік, який коштує вам найдорожче — і закриваю його за допомогою ШІ, що реально працює. Або чесно кажу, де ШІ не є рішенням.",
    primaryCta: "Забронювати Карту вузьких місць",
    guarantee: "10× віддачі — або ви не платите. Карта залишається у вас.",
    proofStrip: "3 системи вже працюють · Amira · Elena Hotel & SPA · Голосовий ШІ",
    microcopy: "90 хвилин. Карта на одну сторінку. Про ціну поки не йдеться — це наступний крок.",
  },

  pain: {
    label: "Знайомо?",
    headline: "Кожне рішення досі проходить через вас.",
    lines: [
      "Кожне рішення проходить через вас — навіть дрібні.",
      "Три угоди по €20k зависли у воронці, бо цього тижня ви не встигли їх переглянути.",
      "Ви перемагаєте, коли ви в кімнаті. Програєте, коли делегуєте. Але в чотирьох кімнатах одночасно бути не можна.",
      "Ви вже пробували ШІ-інструмент. Він видав реальному клієнту нісенітницю. Більше ніколи.",
    ],
    punch: "Якщо завтра вас зіб'є автобус — бізнес переживе хоча б до п'ятниці?",
  },

  reframe: {
    label: "Перш ніж говорити про ШІ",
    headline: "Вам не потрібен ще один ШІ-інструмент.",
    body: "Більшість порад про ШІ зараз — це хайп, а хаос автоматизувати не можна. Питання не «який інструмент ШІ?». Питання — «що насправді варто виправити першим?»",
    enemies: [
      {
        title: "ШІ-хайп",
        desc: "Гуру кричать про «ШІ-агентів», курси віддають вам чат-бота, який вигадує нісенітниці прямо перед вашими клієнтами.",
      },
      {
        title: "Консультанти з презентаціями",
        desc: "Ніколи не керували реальним бізнесом. Віддають баззворди, забирають оплату — і зникають.",
      },
      {
        title: "Перевантаженість сервісами",
        desc: "€2000/міс на SaaS, у які ніхто не заходить. Хаос автоматизувати не можна — спочатку його треба прибрати.",
      },
    ],
  },

  belief: {
    label: "Чому я цим займаюсь",
    headline: "Більшість засновників будують в'язницю і називають її бізнесом.",
    body: "Він тримається лише тому, що вони особисто все утримують на собі. А накидати ШІ на хаотичний бізнес — це не вирішення, це лише масштабування хаосу. Я зрозумів це на власному досвіді: відпустив контроль без потрібних систем — і мало не побачив, як усе руйнується. Тому тепер я допомагаю засновникам знайти найбезпечніший крок із найбільшою віддачею — перш ніж вони витратять гроші на щось не те.",
    roleLine: "Оператор, не консультант. Я сам був тим засновником-заручником — для мене це не теорія.",
    signature: "— Макс Недбайло, засновник Care Less",
  },

  map: {
    label: "Механізм",
    headline: "Карта вузьких місць — 90 хвилин, пріоритет за ROI.",
    body: "ROI-перш-за-все діагностика, а не інструменти. Спочатку процес, потім автоматизація — хаос автоматизувати не можна. За 90 хвилин ми знаходимо 3 напрями, де вузьке місце — це ви, скільки кожен з них вам коштує, і що насправді варто виправити.",
    bullets: [
      "3 напрями, де вузьке місце — це ви",
      "Скільки кожен з них коштує — у часі, грошах або і тому, і тому",
      "Що варто автоматизувати, делегувати, спростити або ігнорувати",
      "Один фікс, з якого варто почати — за пріоритетом ROI",
      "Людина + ШІ, ніколи ШІ-перш-за-все. Спочатку процес, потім автоматизація.",
    ],
    note: "Навіть Klarna спершу зробила ставку на ШІ, вперлась у стелю якості — і повернула людей. Ми починаємо там, де вони закінчили.",
    sample: {
      docTitle: "Карта вузьких місць",
      clientLabel: "[Назва вашого бізнесу]",
      sessionLabel: "РЕЗУЛЬТАТ 90-ХВ. СЕСІЇ",
      studioName: "Care Less",
      pillarLabels: ["Комунікація з клієнтами", "Внутрішні знання та операції", "Повторювані процеси"],
      pillarPains: PILLAR_PAINS_UK,
      pillarPrefix: (n, label) => `Напрям ${n} — ${label}`,
      colPain: "Проблема",
      colLosingNow: "Втрачаєте зараз",
      colFeasibility: "Здійсненність ШІ",
      colPriority: "Пріоритет",
      phase1Heading: "Рекомендований перший крок",
      phase1Rec: "#1 — Система реагування на ліди · WhatsApp + сайт · цілодобово",
      phase1Timeline: "2–3 тижні",
      phase1IfProceed: "якщо вирішите впроваджувати",
      bleedLabel: "Приклад витоку",
      bleedStat: "~€6,000/міс",
      bleedAnnual: "(~€72k/рік)",
      bleedDesc: (phase1Anchor) =>
        `Цей бізнес втрачає ~€6,000/міс (~€72k/рік) — прямі витрати плюс згаяний час засновника (~21 год/тиждень). Перший крок закриває найбільший витік (#1 — затримка відповіді на ліди, ~€2,400/міс): ${phase1Anchor} одноразово. Окупність — менш ніж 2 місяці, і економія тільки зростає.`,
      bleedPhase1Label: "Перший крок",
      bleedPayback: "Менш ніж 2 місяці",
      note: "Приклад результату — ваша карта буде специфічною під ваш бізнес.",
    },
  },

  proof: {
    label: "Докази",
    headline: "Реальні системи, які працюють просто зараз.",
    sub: "Програмне забезпечення в продакшені, реальні розмови щодня.",
    liveBadge: "LIVE",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "ШІ-агент для обробки лідів. Відповідає за 9 секунд у WhatsApp та на сайті.",
        tag: "UK Med Spa · Реагування на ліди",
        href: "/automations/hcmedspa",
      },
      {
        name: "Elena Hotel & SPA",
        desc: "ШІ-агент обробляє запити на бронювання і відповідає на питання гостей — цілодобово у WhatsApp та на сайті.",
        tag: "Готель · Бронювання та підтримка",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        name: "Voice AI on Site",
        desc: "Голосовий агент відповідає на запитання відвідувачів сайту в реальному часі — без форм, без очікування.",
        tag: "Демо · Голосовий агент",
        href: "https://chasehughes.com/",
      },
    ],
    slotLabel: "Кейси з перших сесій — скоро.",
    videoLabel: "Як це — працювати зі мною",
    videoHeadline: "Послухайте тих, хто вже працював зі мною.",
    videoSub: "Надійність, чіткість і фокус на результаті — а не на інструментах.",
  },

  whyMe: {
    label: "Чому я",
    headline: "Чому це не чергова пропозиція від агентства.",
    colThem: "Інші",
    colMe: "Care Less",
    rows: [
      ["Консультант з презентацією", "Оператор, який сам був засновником-заручником"],
      ["«ШІ змінить все»", "Я покажу, де ШІ окупається — а де ні"],
      ["Продає вам інструменти", "Продає ясність, а потім — один фікс, який варто будувати"],
      ["Стверджує, що знає вашу галузь", "Не вдає цього — і йому це не потрібно"],
    ],
  },

  cta: {
    label: "Знайдіть свій витік",
    headline: "Знайдіть витік. Виправте його першим. Або ні — рішення за вами.",
    sub: "90 хвилин. Карта на одну сторінку, з пріоритетами за ROI: де саме витікають ваш час, гроші та енергія засновника.",
    primaryCta: "Забронювати Карту вузьких місць",
    guarantee: "10× віддачі — або ви не платите. Карта залишається у вас у будь-якому разі.",
    secondaryCta: "Написати спочатку",
    closing: "Якщо чіткої можливості немає — я так і скажу. Це теж частина роботи.",
  },

  faq: {
    label: "FAQ",
    headline: "Перш ніж забронювати",
    items: [
      {
        q: "Це просто продажний дзвінок?",
        a: "Ні. Це 90 хвилин реальної діагностичної роботи. Ви підете з картою на одну сторінку, навіть якщо ми більше ніколи не працюватимемо разом. Якщо чіткої можливості немає — я так і скажу, це частина угоди.",
      },
      {
        q: "А якщо ШІ — не рішення для мого бізнесу?",
        a: "Тоді я прямо це скажу. Іноді найвигідніший за ROI крок — це зміна процесу або найм людини, а не софт. Я краще втрачу продаж, ніж продам вам те, що вам не потрібне.",
      },
      {
        q: "Що я отримаю в результаті?",
        a: "Карту на одну сторінку з пріоритетами за ROI: 3 напрями, де вузьке місце — це ви, скільки коштує кожен з них, що варто автоматизувати / делегувати / спростити / ігнорувати, і один фікс, з якого варто почати.",
      },
      {
        q: "Кому це підходить?",
        a: "Власникам бізнесів із виручкою приблизно €3–10 млн, 20–50 співробітників, де засновник досі є операційною системою — кожне рішення проходить через вас, ви вирішуєте самостійно і маєте реальний бюджет.",
      },
      {
        q: "Кому це НЕ підходить?",
        a: "Соло-підприємцям з виручкою до €1 млн (немає команди, яку треба розвантажити) та компаніям зі 100–1000 співробітниками (рішення комітетом, цикли по 6 місяців — це зовсім інший процес). Якщо це про вас, поки що це, ймовірно, не той формат.",
      },
    ],
  },

  footer: {
    credit: "care less AI automation",
    location: "Сантандер, Іспанія",
    tagline: "ROI-перш-за-все діагностика ШІ для бізнесів під керівництвом власника. Чесно про те, де ШІ допомагає — а де ні.",
    waLabel: "Швидке питання? Напишіть мені у WhatsApp",
  },
};

// ─── Accessor ───────────────────────────────────────────────────────────────

export function getNewDict(locale: NewLocale): NewPageDict {
  return locale === "uk" ? uk : en;
}
