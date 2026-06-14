/**
 * Short-template locale dictionary.
 *
 * EN — complete.
 * UK — native Ukrainian (Maks Nedbailo + Care Less studio).
 *
 * Result strings may contain <strong> HTML for metric emphasis
 * — render with dangerouslySetInnerHTML in the table result cell.
 */

import type { Locale } from "@/content/partners/index";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IndustryRow = [string, string, string]; // [useCase, pain, result (may contain <strong>)]

export interface IndustryTab {
  label: string;
  rows: [IndustryRow, IndustryRow, IndustryRow];
}

export interface ShortPageDict {
  header: {
    personalInvitation: string;
    langEn: string;
    langUk: string;
  };

  hero: {
    eyebrow: (partnerName: string) => string;
    headline: string;
    // alt A: "Everyone says 'use AI.' Almost no one tells you where it pays off in your business."
    // alt B: "Before you automate anything, find what's actually worth automating."
    subheadline: (partnerName: string) => string;
    cta: string;
    daysLeft: (n: number) => string;
    offerCloses: string;
    partnerQuoteOverride?: string;
    partnerRoleOverride?: string;
  };

  offer: {
    label: string;
    headline: (partnerName: string) => string;
    normallyLabel: string;
    normallyValue: string;
    giftedLine: (partnerName: string) => string;
    body: string;
    deliverableHeading: string;
    del1: string;
    del2: string;
    del3: string;
  };

  /** Labels for the inline Strategic AI Map sample */
  sampleMap: {
    note: string;
    docTitle: string;
    clientLabel: string;
    sessionLabel: string;
    /** Pain labels for the 6 sample rows (3 pillars × 2 items each) */
    pillarPains: [[string, string], [string, string], [string, string]];
    studioName: string;
    pillarPrefix: (n: number, label: string) => string;
    /** 4-column layout: Problem | Losing Now | AI Feasibility | Priority */
    colPain: string;
    colLosingNow: string;
    colFeasibility: string;
    colPriority: string;
    phase1Heading: string;
    phase1Rec: string;
    phase1Timeline: string;
    phase1IfProceed: string;
    pillarLabels: [string, string, string];
    /** Cost-of-inaction summary strip */
    bleedLabel: string;
    bleedStat: string;
    bleedAnnual: string;
    bleedDesc: (phase1Anchor: string) => string;
    bleedPhase1Label: string;
    bleedPayback: string;
  };

  industry: {
    label: string;
    headline: string;
    sub: string;
    swipeHint: string;
    colUseCase: string;
    colPain: string;
    colResult: string;
    sources: string;
    tabs: {
      manufacturing: IndustryTab;
      professionalServices: IndustryTab;
      ecommerce: IndustryTab;
      investorOperators: IndustryTab;
    };
  };

  process: {
    label: string;
    headline: string;
    steps: { num: string; title: string; body: string; trust?: string }[];
  };

  proof: {
    label: string;
    headline: string;
    liveBadge: string;
    cases: { name: string; desc: string; tag: string; href: string }[];
  };

  cta: {
    headline: (partnerName: string, gender?: 'f' | 'm') => string;
    sub: string;
    primaryCta: string;
    messengerLabel: (channel: "telegram" | "whatsapp") => string;
    /** Guarantee micro-copy shown below the primary CTA button */
    guarantee: string;
  };

  /** Lighter entry point above the footer — for visitors not ready to book the Map yet */
  bottleneckScore: {
    label: string;
    headline: string;
    body: string;
    cta: string;
  };

  faq: {
    label: string;
    headline: string;
    items: {
      q: string;
      a: (vars: { partnerName: string; phase1Anchor: string; gender: 'f' | 'm' }) => string;
    }[];
  };

  footer: {
    credit: string;
    location: string;
  };
}

// ─── EN dictionary ────────────────────────────────────────────────────────────

const en: ShortPageDict = {
  header: {
    personalInvitation: "Personal Invitation",
    langEn: "EN",
    langUk: "UK",
  },

  hero: {
    eyebrow: (p) => `Personal invitation through ${p}'s circle`,
    headline: "See where AI actually pays off in your business — and where it doesn't.",
    subheadline: (p) =>
      `A 90-minute Strategic AI Map, ranked by ROI. Normally €1,470 — reserved for you through ${p}.`,
    cta: "Claim Your Complimentary Session",
    daysLeft: (n) => `${n} ${n === 1 ? "day" : "days"} left`,
    offerCloses: "offer closes June 30",
  },

  offer: {
    label: "The Offer",
    headline: (p) => `A €1,470 session — reserved through ${p}`,
    normallyLabel: "Normally",
    normallyValue: "€1,470",
    giftedLine: (p) => `Gifted to you through ${p}. No strings.`,
    body:
      "This isn't a discovery call with a pitch attached. It's a working session. You leave with a one-page map of every AI opportunity in your business — scored, ranked by ROI, and ready to act on. If nothing clears the bar, I'll tell you that. You keep the map either way.",
    deliverableHeading: "You walk away with",
    del1: "3 pillars of your operation scored for AI readiness",
    del2: "4–6 use cases ranked by estimated ROI",
    del3: "Phase 1 quoted — or an honest 'not yet', no charge either way",
  },

  sampleMap: {
    note: "Sample output — yours will be specific to your business",
    docTitle: "Strategic AI Map",
    clientLabel: "[Client Business Name]",
    sessionLabel: "90-MIN SESSION OUTPUT",
    studioName: "care less AI automation",
    pillarPains: [
      ["Lead response delay (>4h avg)", "Manual booking follow-up"],
      ["Knowledge lives in founder's head", "Meeting notes + action tracking"],
      ["Invoice & document processing", "Weekly reporting to stakeholders"],
    ],
    pillarPrefix: (n, label) => `Pillar ${n} — ${label}`,
    colPain: "Problem",
    colLosingNow: "Losing Now",
    colFeasibility: "AI Feasibility",
    colPriority: "Priority",
    phase1Heading: "Phase 1 Recommended Build",
    phase1Rec: "#1 — AI Lead Response System · WhatsApp + website · 24/7",
    phase1Timeline: "2–3 weeks",
    phase1IfProceed: "if you proceed",
    pillarLabels: [
      "Customer-Facing Communication",
      "Internal Knowledge & Ops",
      "Repeatable Execution",
    ],
    bleedLabel: "Example",
    bleedStat: "~€6,000/mo",
    bleedAnnual: "(€72k/yr)",
    bleedDesc: (p) =>
      `This business is leaking ~€6,000/mo (~€72k/yr) — direct costs plus wasted time (~21 hrs/wk). Phase 1 hits the biggest leak first (#1 — lead-response delay, ~€2,400/mo): ${p} one-time. Pays for itself in under 2 months — and the savings compound from there.`,
    bleedPhase1Label: "Phase 1",
    bleedPayback: "Under 2 months",
  },

  industry: {
    label: "Industry",
    headline: "What this looks like in your business",
    sub: "These are the exact patterns we map in the first 30 minutes.",
    swipeHint: "← swipe →",
    colUseCase: "Use case",
    colPain: "Pain it fixes",
    colResult: "Typical result",
    sources:
      "McKinsey The State of AI 2024–2025 · Deloitte smart-manufacturing 2025 · industry benchmarks · client-reported baselines. Figures are directional averages, not guarantees.",
    tabs: {
      manufacturing: {
        label: "Manufacturing",
        rows: [
          [
            "Quote/invoice acceleration",
            "Quotes take days; we lose jobs to whoever replies first.",
            "Prep: ~15 min → ~<strong>1 min</strong>; ~<strong>3×</strong> throughput, same team",
          ],
          [
            "Production scheduling",
            "Scheduling lives in one head and breaks when they're out.",
            "Planning: <strong>~20 hrs/wk → ~5</strong>; on-time delivery <strong>82% → 95%</strong>",
          ],
          [
            "After-sale routing",
            "Requests sit in an inbox; the wrong tech gets dispatched.",
            "<strong>60–70%</strong> tier-1 deflection; ~<strong>50%</strong> faster resolution",
          ],
        ],
      },
      professionalServices: {
        label: "Professional Services",
        rows: [
          [
            "Client intake & conflict check",
            "Onboarding eats half a day of partner time.",
            "Intake → engagement letter in minutes; up to ~<strong>30 hrs/wk</strong> saved",
          ],
          [
            "Document & proposal drafting",
            "Partners draft everything from scratch.",
            "~<strong>25%</strong> faster task completion",
          ],
          [
            "Billable-time capture",
            "We under-bill because nobody logs time accurately.",
            "<strong>5–8%</strong> billable-hour recovery",
          ],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          [
            "Tier-1 support automation",
            "Support drowns in 'where's my order' tickets.",
            "<strong>60–70%</strong> of tier-1 tickets auto-resolved",
          ],
          [
            "Personalisation & recommendations",
            "Generic storefront leaves revenue on the table.",
            "Engaged-chat shoppers convert ~<strong>2–4×</strong> more",
          ],
          [
            "SKU launch copy",
            "Listing copy bottlenecks every launch.",
            "Launch copy in <strong>N languages</strong> in hours, not weeks",
          ],
        ],
      },
      investorOperators: {
        label: "Investor-Operators",
        rows: [
          [
            "Deal sourcing / underwriting",
            "Good deals get missed in the pile.",
            "~<strong>3–4×</strong> more deals screened, same team",
          ],
          [
            "Portfolio digest",
            "Can't see across companies without chasing each one.",
            "Weekly digest; ~<strong>6–10 hrs/wk</strong> recovered",
          ],
          [
            "Asset / property ops",
            "Manual ops drag NOI.",
            "Up to ~<strong>10%</strong> NOI improvement (directional)",
          ],
        ],
      },
    },
  },

  process: {
    label: "Process",
    headline: "How it works",
    steps: [
      {
        num: "01",
        title: "Book",
        body: "Pick a 90-minute slot. Answer 4 pre-call questions so I show up prepared, not generic.",
      },
      {
        num: "02",
        title: "Map",
        body: "We go through your business across 3 pillars. I score it live, in front of you, on a shared screen.",
      },
      {
        num: "03",
        title: "Receive",
        body: "The Strategic AI Map lands within 48 hours — a proper document, not rough notes. Phase 1 quoted if it's worth building.",
        trust: "We do the final analysis after the call. You get a document, not rough notes.",
      },
    ],
  },

  proof: {
    label: "Proof",
    headline: "Live builds",
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
  },

  cta: {
    headline: (p) => `${p} sent you here for a reason.`, // gender-neutral in EN
    sub: "The map is yours either way.",
    primaryCta: "Claim Your Complimentary Session",
    messengerLabel: (channel) =>
      channel === "telegram" ? "Message on Telegram first" : "Message on WhatsApp first",
    guarantee: "Free. No obligation. You keep the map.",
  },

  faq: {
    label: "Questions",
    headline: "Before you book",
    items: [
      {
        q: "Is this a sales call disguised as something else?",
        a: ({ partnerName }) =>
          `No. The Strategic AI Map is a real deliverable — a scored, working document. If you don't want to work together after, the map is still yours. That's the whole point of the gift framing — ${partnerName} wouldn't share this with his circle if it weren't genuine.`,
      },
      {
        q: "How is this different from a consultancy deck, a ChatGPT demo, or hiring a consultant?",
        a: () =>
          "A consultancy takes 6–8 weeks and €8–30k and gives you a presentation. A ChatGPT demo costs nothing and gives you vague excitement. Hiring a consultant means a proposal, a retainer, and months of onboarding. This is 90 minutes and gives you a scored, ROI-ranked map of your business — you decide what to do with it.",
      },
      {
        q: "What if my business is too unique for AI?",
        a: () =>
          "Every founder thinks this. After 90 minutes you'll know specifically which parts of your business AI can touch — and which it genuinely can't. Sometimes the answer is 'almost none of it yet' — and that's a useful answer worth having.",
      },
      {
        q: "What does the map actually look like?",
        a: () =>
          "It's a one-page scored document: three pillars of your business, each broken into pain points, each scored for AI feasibility and estimated ROI. You leave with 4–6 ranked use cases and a Phase 1 recommendation — or an honest 'not yet' if nothing clears the bar. See the sample above.",
      },
      {
        q: "What does Phase 1 typically look like?",
        a: ({ phase1Anchor }) =>
          `A working prototype of your highest-ROI use case — real software you can use on Monday, not a slide deck. I won't pitch a build that doesn't earn its keep: for most businesses the first step is a focused ${phase1Anchor} fix that pays for itself within a couple of months.`,
      },
      {
        q: "Who is this for — and who isn't it?",
        a: () =>
          "For you if: you're running a business doing €50k–€200k+ per month, you can decide and act inside 30 days, and you want numbers, not hype. Not for you if: your business is under €30k/month (the Phase 1 math doesn't work yet), or if every decision needs six stakeholders in the room.",
      },
      {
        q: "Why is {partnerName} giving this away?",
        a: ({ partnerName, gender = 'm' }) => {
          const they = gender === 'f' ? "she's" : "he's";
          const They = gender === 'f' ? "She" : "He";
          return `Because ${they} known me for years and trusts how I work with operators. ${They} gets a small thank-you if you eventually decide to work with me. No pressure — ${they} not selling, ${they} sharing.`.replace("{partnerName}", partnerName);
        },
      },
      {
        q: "In what language can we run the session?",
        a: () => "Ukrainian, Russian, English — or Spanish if you're feeling generous.",
      },
    ],
  },

  bottleneckScore: {
    label: "Not Ready to Book?",
    headline: "Start with the free Bottleneck Score",
    body: "Two minutes, no call required. Answer a few questions about how your business handles customer messages and get an instant score — plus where you're likely losing the most.",
    cta: "Get your Bottleneck Score",
  },

  footer: {
    credit: "care less AI automation",
    location: "Santander, Spain",
  },
};

// ─── UK dictionary ─────────────────────────────────────────────────────────────
// Native Ukrainian. Tone: confident, plain-spoken, peer-level.
// Preserves Hormozi specificity + Sinek anti-pitch framing.

const uk: ShortPageDict = {
  header: {
    personalInvitation: "Особисте запрошення",
    langEn: "EN",
    langUk: "УК",
  },

  hero: {
    eyebrow: (p) => `Особисте запрошення для людей із кола ${p}`,
    headline: "Побачте, де ШІ справді окупається у вашому бізнесі — а де ні.",
    subheadline: (p) =>
      `90-хвилинна Стратегічна карта ШІ з пріоритетами за ROI. Зазвичай — €1,470. Для вас — зарезервовано через ${p}.`,
    cta: "Забронювати безкоштовну сесію",
    daysLeft: (n) => {
      // Ukrainian plural rules for "day":
      //  1 → день  |  2–4 → дні  |  5–20 → днів  |  11–14 always → днів
      const d = Math.max(0, Math.floor(n));
      const l = d % 10, ll = d % 100;
      const form = (ll >= 11 && ll <= 14) ? "днів"
        : l === 1 ? "день"
        : (l >= 2 && l <= 4) ? "дні"
        : "днів";
      return `${d} ${form} залишилось`;
    },
    offerCloses: "пропозиція закривається 30 червня",
    partnerQuoteOverride:
      "Я знаю Макса вже багато років. Коли комусь із мого кола потрібно тверезо розібратися з ШІ, я відправляю їх до нього. Він не буде продавати вам те, що вам не потрібно.",
    partnerRoleOverride: "радник і ментор",
  },

  offer: {
    label: "Пропозиція",
    headline: (p) => `Сесія вартістю €1,470 — зарезервована через ${p}`,
    normallyLabel: "Зазвичай",
    normallyValue: "€1,470",
    giftedLine: (p) => `Для вас — у подарунок через ${p}. Без жодних зобов'язань.`,
    body:
      "Це не ознайомчий дзвінок із прихованим продажем наприкінці. Це робоча сесія. Після неї у вас буде односторінкова карта всіх можливостей для ШІ у вашому бізнесі — з оцінкою, пріоритетами за ROI і чіткими кроками. Якщо жодна ідея не проходить планку — я прямо вам про це скажу. Карта залишається у вас у будь-якому разі.",
    deliverableHeading: "Що ви отримаєте після сесії",
    del1: "3 ключові напрями вашого бізнесу, оцінені на готовність до ШІ",
    del2: "4–6 сценаріїв використання, розставлених за очікуваним ROI",
    del3: "Оцінку вартості першого етапу — або чесне «ще не час», без оплати",
  },

  sampleMap: {
    note: "Приклад результату — ваша карта буде специфічною під ваш бізнес",
    docTitle: "Стратегічна карта ШІ",
    clientLabel: "[Назва вашого бізнесу]",
    sessionLabel: "РЕЗУЛЬТАТ 90-ХВ. СЕСІЇ",
    studioName: "care less AI automation",
    pillarPains: [
      ["Затримка відповіді на ліди (>4 год)", "Ручне ведення нагадувань про бронювання"],
      ["Знання зосереджені в голові засновника", "Нотатки з нарад та відстеження задач"],
      ["Обробка рахунків та документів", "Щотижнева звітність для стейкхолдерів"],
    ],
    pillarPrefix: (n, label) => `Напрям ${n} — ${label}`,
    colPain: "Проблема",
    colLosingNow: "Втрачаєте зараз",
    colFeasibility: "Здійсненність ШІ",
    colPriority: "Пріоритет",
    phase1Heading: "Рекомендований перший етап",
    phase1Rec: "#1 — Система реагування на ліди · WhatsApp + сайт · цілодобово",
    phase1Timeline: "2–3 тижні",
    phase1IfProceed: "якщо вирішите впроваджувати",
    pillarLabels: [
      "Комунікація з клієнтами",
      "Внутрішні знання та операції",
      "Повторювані процеси",
    ],
    bleedLabel: "Приклад",
    bleedStat: "~€6,000/міс",
    bleedAnnual: "(€72k/рік)",
    bleedDesc: (p) =>
      `Цей бізнес втрачає ~€6,000/міс (~€72k/рік) — прямі витрати плюс згаяний час (~21 год/тиждень). Перший етап б'є по найбільшому витоку (#1 — затримка відповіді на ліди, ~€2,400/міс): ${p} одноразово. Окупність на цей крок — ~2 місяці. Далі економія лише зростає.`,
    bleedPhase1Label: "Перший етап",
    bleedPayback: "~2 міс. окупність",
  },

  industry: {
    label: "Галузь",
    headline: "Як це може виглядати у вашому бізнесі",
    sub: "Саме такі патерни ми розбираємо протягом перших 30 хвилин.",
    swipeHint: "← свайп →",
    colUseCase: "Сценарій використання",
    colPain: "Яку проблему вирішує",
    colResult: "Типовий результат",
    sources:
      "McKinsey The State of AI 2024–2025 · Deloitte smart-manufacturing 2025 · галузеві бенчмарки · базові показники зі слів клієнтів. Цифри є орієнтовними середніми показниками, а не гарантіями.",
    tabs: {
      manufacturing: {
        label: "Виробництво",
        rows: [
          [
            "Прискорення підготовки пропозицій та рахунків",
            "«Комерційні пропозиції готуються днями; ми програємо тим, хто відповідає першим.»",
            "Підготовка: ~15 хв → ~<strong>1 хв</strong>; ~<strong>3×</strong> пропускна здатність, та сама команда",
          ],
          [
            "Планування виробництва",
            "«Усе планування тримається в голові однієї людини й ламається, коли її немає.»",
            "Планування: <strong>~20 год/тиждень → ~5</strong>; вчасна доставка: <strong>82% → 95%</strong>",
          ],
          [
            "Маршрутизація після продажних звернень",
            "«Запити лежать у пошті; на виїзд відправляють не того спеціаліста.»",
            "<strong>60–70%</strong> базових звернень автоматично відсіюються; вирішення ~<strong>50%</strong> швидше",
          ],
        ],
      },
      professionalServices: {
        label: "Професійні послуги",
        rows: [
          [
            "Прийом клієнта та перевірка конфлікту інтересів",
            "«Онбординг забирає пів дня часу партнера.»",
            "Від запиту до листа-зобов'язання за хвилини; до ~<strong>30 год/тиждень</strong> економії",
          ],
          [
            "Підготовка документів і пропозицій",
            "«Партнери щоразу готують усе з нуля.»",
            "Виконання завдань ~<strong>25%</strong> швидше",
          ],
          [
            "Фіксація оплачуваного часу",
            "«Компанія недовиставляє рахунки, бо ніхто точно не фіксує час.»",
            "Повернення <strong>5–8%</strong> оплачуваних годин",
          ],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          [
            "Автоматизація підтримки першої лінії",
            "«Підтримка тоне в запитах «де моє замовлення?».»",
            "<strong>60–70%</strong> звернень першої лінії вирішуються автоматично",
          ],
          [
            "Персоналізація та рекомендації",
            "«Універсальна вітрина залишає гроші на столі.»",
            "Покупці з чатом конвертуються ~<strong>2–4×</strong> краще",
          ],
          [
            "Тексти для запуску нових SKU",
            "«Тексти для карток гальмують кожен запуск.»",
            "Тексти для запуску <strong>N мовами</strong> — за години, а не тижні",
          ],
        ],
      },
      investorOperators: {
        label: "Портфельні оператори",
        rows: [
          [
            "Пошук і первинна оцінка угод",
            "«Хороші угоди губляться в загальному потоці.»",
            "~<strong>3–4×</strong> більше угод перевіряється тією ж командою",
          ],
          [
            "Дайджест портфеля",
            "«Неможливо бачити картину по всіх компаніях, не ганяючись за кожною.»",
            "Щотижневий дайджест; ~<strong>6–10 год/тиждень</strong> повертається",
          ],
          [
            "Операційка активів / нерухомості",
            "«Ручні процеси тягнуть NOI вниз.»",
            "До ~<strong>10%</strong> покращення NOI, орієнтовно",
          ],
        ],
      },
    },
  },

  process: {
    label: "Процес",
    headline: "Як це працює",
    steps: [
      {
        num: "01",
        title: "Забронюйте",
        body: "Оберіть 90-хвилинний слот. Дайте відповідь на 4 запитання перед дзвінком — щоб я прийшов підготовленим, а не з шаблонними ідеями.",
      },
      {
        num: "02",
        title: "Створюємо карту",
        body: "Ми розбираємо ваш бізнес за 3 ключовими напрямами. Я оцінюю їх наживо перед вами на спільному екрані.",
      },
      {
        num: "03",
        title: "Отримайте результат",
        body: "Стратегічна карта ШІ буде у вас протягом 48 годин — повноцінний документ, а не чернетки. Якщо є що будувати — ви також отримаєте оцінку вартості першого етапу.",
        trust: "Фінальний аналіз ми робимо після дзвінка. Ви отримуєте документ, а не сирі нотатки.",
      },
    ],
  },

  proof: {
    label: "Докази",
    headline: "Реальні запущені рішення",
    liveBadge: "LIVE",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "ШІ-агент для обробки лідів. Відповідає за 9 секунд у WhatsApp та на сайті.",
        tag: "UK MedSpa · Відповіді на ліди",
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
        tag: "Демонстрація · Голосовий агент",
        href: "https://chasehughes.com/",
      },
    ],
  },

  cta: {
    headline: (p, g = 'm') => `${p} відправив${g === 'f' ? 'а' : ''} вас сюди не просто так.`,
    sub: "Карта залишається у вас у будь-якому разі.",
    primaryCta: "Забронювати безкоштовну сесію",
    messengerLabel: (channel) =>
      channel === "telegram" ? "Спочатку написати в Telegram" : "Спочатку написати у WhatsApp",
    guarantee: "Безкоштовно. Без зобов'язань. Карта залишається у вас.",
  },

  faq: {
    label: "Питання",
    headline: "Перед бронюванням",
    items: [
      {
        q: "Чи це прихований продажний дзвінок?",
        a: ({ partnerName }) =>
          `Ні. Стратегічна карта ШІ — це реальний результат, а не привід для продажу. Якщо після сесії ви не захочете продовжувати — карта залишається у вас. Саме тому ${partnerName} і поділився цим зі своїм колом: тут немає підступу.`,
      },
      {
        q: "Чим це відрізняється від консалтингу, демо ChatGPT або найму консультанта?",
        a: () =>
          "Консалтинг — це 6–8 тижнів, €8–30k і слайди. Демо ChatGPT — безкоштовно, але без конкретики. Найм консультанта — пропозиція, передоплата, місяці онбордингу. Тут: 90 хвилин — і ви виходите з оцінкою власного бізнесу за ROI. Що з цим робити — ваш вибір.",
      },
      {
        q: "А що, якщо мій бізнес занадто специфічний для ШІ?",
        a: () =>
          "Так думає кожен. Після 90 хвилин ви точно будете знати, яких частин вашого бізнесу ШІ може торкнутися — а яких ні. Іноді відповідь: «поки що майже нічого» — і це теж корисна відповідь.",
      },
      {
        q: "Як виглядає ця карта насправді?",
        a: () =>
          "Односторінковий документ з оцінками: три напрями бізнесу, кожен розбитий на больові точки, кожна — оцінена за здійсненністю ШІ та ROI. Ви виходите з 4–6 пріоритизованими сценаріями та рекомендацією щодо першого кроку — або чесним «ще не час». Дивіться зразок вище.",
      },
      {
        q: "Як зазвичай виглядає перший етап?",
        a: ({ phase1Anchor }) =>
          `Працюючий прототип сценарію з найвищим ROI — реальне ПЗ, яким користуєтесь уже в понеділок, а не стратегічний документ. Я не запропоную рішення, яке не окупається: для більшості бізнесів перший крок — точкове покращення приблизно за ${phase1Anchor}, що повертає вкладене за пару місяців.`,
      },
      {
        q: "Кому це підходить — і кому ні?",
        a: () =>
          "Підходить, якщо: бізнес від €50k–€200k+ на місяць, можете прийняти рішення протягом 30 днів, хочете конкретних цифр, а не хайпу. Не підходить, якщо: бізнес менше €30k на місяць (математика ще не сходиться), або якщо рішення потребує шести стейкхолдерів.",
      },
      {
        q: "Чому {partnerName} ділиться цим безкоштовно?",
        a: ({ partnerName, gender = 'm' }) => {
          const vin = gender === 'f' ? 'вона' : 'він';
          const Vin = gender === 'f' ? 'Вона' : 'Він';
          return `Тому що ${vin} знає мене вже кілька років і довіряє тому, як я працюю з операторами. ${Vin} отримає невелику подяку, якщо ви врешті вирішите зі мною попрацювати. Жодного тиску — ${vin} рекомендує, а не продає.`.replace("{partnerName}", partnerName);
        },
      },
      {
        q: "Якою мовою можна провести сесію?",
        a: () => "Українською, російською, англійською — або іспанською, якщо є настрій.",
      },
    ],
  },

  bottleneckScore: {
    label: "Ще не готові до сесії?",
    headline: "Почніть із безкоштовного Bottleneck Score",
    body: "Дві хвилини, без дзвінка. Відповісте на кілька запитань про те, як ваш бізнес обробляє звернення клієнтів — і отримаєте миттєву оцінку та підказку, де ви найбільше втрачаєте.",
    cta: "Отримати Bottleneck Score",
  },

  footer: {
    credit: "care less AI automation",
    location: "Сантандер, Іспанія",
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const dict: Record<Locale, ShortPageDict> = { en, uk };
export function getDict(locale: Locale): ShortPageDict {
  return dict[locale];
}
