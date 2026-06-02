/**
 * Direct sales page i18n — /ai-map
 *
 * EN — complete. UK — native Ukrainian (confident, plain-spoken, Hormozi/Sinek tone).
 * No partner-specific framing. No "free/gifted/complimentary."
 */

import type { DirectLocale } from "./locale";
import type { IndustryTab } from "@/app/partners/[slug]/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DirectPageDict {
  header: { langEn: string; langUk: string };

  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta: string;
    daysLeft: (n: number) => string;
    offerCloses: string;
    priceChip: string;
  };

  problem: {
    label: string;
    headline: string;
    body: string;
  };

  offer: {
    label: string;
    headline: string;
    subhead: string;
    body: string;
    valueLabel: string;
    del1: string;
    del2: string;
    del3: string;
    anchorLabel: string;
    anchorValue: string;
    currentPriceLabel: string;
    currentPriceValue: string;
    creditNote: string;
    // shared map labels come from ShortPageDict via getDict() in DirectPage
  };

  guarantee: {
    label: string;
    headline: string;
    body: string;
    highlight: string;
  };

  close: {
    label: string;
    headline: string;
    included1: string;
    included2: string;
    included3: string;
    creditLine: string;
    guaranteeLine: string;
    deadlineChip: string;
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
    sub: string;
    slotLabel: string;
    cases: { name: string; desc: string; tag: string; href: string }[];
  };

  faq: {
    label: string;
    headline: string;
    items: { q: string; a: (vars: { phase1Anchor: string }) => string }[];
  };

  finalCta: {
    headline: string;
    sub: string;
    cta: string;
    messengerLabel: string;
    guarantee: string;
  };

  footer: { credit: string; location: string };

  // Industry tabs — same shape as partner page (passed to SectionShortIndustry)
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
}

// ─── EN ───────────────────────────────────────────────────────────────────────

const en: DirectPageDict = {
  header: { langEn: "EN", langUk: "UK" },

  hero: {
    eyebrow: "Strategic AI Map",
    headline: "See where AI actually pays off in your business — and where it doesn't.",
    subheadline:
      "A 90-minute working session that maps every AI opportunity in your business, ranked by ROI. Delivered as a one-page document within 48 hours.",
    cta: "Book your Strategic AI Map",
    daysLeft: (n) => `${n} ${n === 1 ? "day" : "days"} left`,
    offerCloses: "offer closes June 30",
    priceChip: "€997 — was €1,500",
  },

  problem: {
    label: "The Problem",
    headline: "Your operation is leaking money. You just can't see where.",
    body:
      "Slow response times lose leads before you even know they existed. Manual work that should be automated costs you hours every week. Decisions bottlenecked at you slow everything down. Separately, each one is annoying. Together, they compound into thousands of euros a month leaving your business. The problem isn't the leaks — it's that you don't have a map of them.",
  },

  offer: {
    label: "The Solution",
    headline: "The Strategic AI Map",
    subhead:
      "A 90-minute working session + a one-page ROI-ranked document, delivered within 48 hours.",
    body:
      "We go through your business across three pillars — customer communication, internal operations, and repeatable execution. Every pain point gets scored for AI feasibility and estimated ROI. You leave with a clear, ranked, actionable map of what to fix and what to automate first. No pitch. No proposal you didn't ask for.",
    valueLabel: "What you get",
    del1: "Your operation mapped across 3 pillars",
    del2: "4–6 use cases ranked by estimated ROI",
    del3: "Phase 1 quoted — or an honest 'not yet'",
    anchorLabel: "Full price",
    anchorValue: "€1,500",
    currentPriceLabel: "Until June 30",
    currentPriceValue: "€997",
    creditNote:
      "The €997 is fully credited toward Phase 1 if you proceed — so the map effectively costs you nothing.",
  },

  guarantee: {
    label: "Guarantee",
    headline: "The 10× Guarantee",
    body:
      "In 90 minutes I'll identify at least €10,000 per year in recoverable cost or wasted time in your business — quantified and ROI-ranked on your map. If I can't find it, you pay nothing and you keep the map.",
    highlight: "A 10× return before we build a single thing.",
  },

  close: {
    label: "The Offer",
    headline: "Everything you need to know what to build — and whether to build it.",
    included1: "90-minute Strategic AI Map session",
    included2: "One-page ROI-ranked map, delivered within 48 hours",
    included3: "Phase 1 quoted — or an honest 'not yet'",
    creditLine:
      "Fully credited toward Phase 1 — the map effectively costs you nothing if you proceed.",
    guaranteeLine: "10× guarantee: find €10k+/yr in your business — or you pay nothing.",
    deadlineChip: "€997 until June 30 · was €1,500",
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
        body: "We go through your business across 3 pillars. Every pain point gets scored for AI feasibility and estimated ROI.",
      },
      {
        num: "03",
        title: "Receive",
        body: "Your Strategic AI Map lands within 48 hours — a proper document, not rough notes. Phase 1 quoted if it's worth building.",
        trust: "We do the final analysis after the call. You get a document, not rough notes.",
      },
    ],
  },

  proof: {
    label: "Proof",
    headline: "Live builds",
    liveBadge: "LIVE",
    sub: "Software in production, handling real conversations every day.",
    slotLabel: "More case studies from first sessions — coming soon.",
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

  faq: {
    label: "Questions",
    headline: "Before you book",
    items: [
      {
        q: "Why €997? Why isn't this free?",
        a: ({ phase1Anchor }) =>
          `Because it's a real working session with a real deliverable — not a discovery call or a free audit. The €997 is also fully credited toward Phase 1 if you proceed: if your map leads to a build, the session costs you nothing. If it doesn't, you've paid €997 for clarity on your entire operation. That's a good deal either way.`,
      },
      {
        q: "Is €997 worth it?",
        a: () =>
          "The 10× guarantee puts that question to rest: if I can't find at least €10,000/year in recoverable value in your business, you pay nothing and you keep the map. If I can — you're paying €997 to find €10k+/yr in savings or recovered revenue. And the €997 comes off your Phase 1 build.",
      },
      {
        q: "What if I can't implement what's on the map?",
        a: ({ phase1Anchor }) =>
          `That's exactly what Phase 1 is — done-for-you implementation of the highest-ROI use case from your map. Typically ${phase1Anchor}, 2–3 weeks. If you want to proceed, I'll quote it. If you don't, the map and the clarity are yours either way.`,
      },
      {
        q: "How is this different from a consultancy deck, a ChatGPT demo, or hiring a consultant?",
        a: () =>
          "A consultancy takes 6–8 weeks and €8–30k and gives you a presentation. A ChatGPT demo is free and gives you vague excitement. Hiring a consultant means a proposal, a retainer, and months of onboarding. This is 90 minutes and gives you a scored, ROI-ranked map of your own business — and you decide what to do with it.",
      },
      {
        q: "What if my business is too unique for AI?",
        a: () =>
          "Every founder thinks this. After 90 minutes you'll know specifically which parts of your business AI can touch — and which it genuinely can't. Sometimes the answer is 'almost none of it yet' — and that's a useful answer worth having.",
      },
      {
        q: "What does the map actually look like?",
        a: () =>
          "It's a one-page scored document: three pillars of your business, each broken into pain points, each scored for AI feasibility and estimated ROI. You leave with 4–6 ranked use cases and a clear Phase 1 recommendation — or an honest 'not yet' if nothing clears the bar. See the sample above.",
      },
      {
        q: "What does Phase 1 typically look like?",
        a: ({ phase1Anchor }) =>
          `A working prototype of the highest-ROI use case from your map. Typically ${phase1Anchor}, 2–3 weeks, built with Ukrainian dev capacity. Real software you can use on Monday — not a strategy document.`,
      },
      {
        q: "Who is this for?",
        a: () =>
          "For you if: you're running a business doing €30k–€200k+ per month, you can decide and act inside 30 days, and you want numbers, not hype. Not for you if: every decision needs six stakeholders, or you're looking for someone to sell you an AI tool.",
      },
      {
        q: "In what language can we run the session?",
        a: () => "Ukrainian, Russian, English — or Spanish if you're feeling generous.",
      },
    ],
  },

  finalCta: {
    headline: "Get your map. Know your number.",
    sub: "90 minutes. €997. Fully credited toward Phase 1.",
    cta: "Book your Strategic AI Map",
    messengerLabel: "Message on Telegram first",
    guarantee: "10× guarantee: find €10k+/yr — or pay nothing.",
  },

  footer: { credit: "care less AI automation", location: "Santander, Spain" },

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
          ["Quote/invoice acceleration", "\"Quotes take days; we lose jobs to whoever replies first.\"", "Prep: ~15 min → ~<strong>1 min</strong>; ~<strong>3×</strong> throughput, same team"],
          ["Production scheduling", "\"Scheduling lives in one head and breaks when they're out.\"", "Planning: <strong>~20 hrs/wk → ~5</strong>; on-time delivery <strong>82% → 95%</strong>"],
          ["After-sale routing", "\"Requests sit in an inbox; the wrong tech gets dispatched.\"", "<strong>60–70%</strong> tier-1 deflection; ~<strong>50%</strong> faster resolution"],
        ],
      },
      professionalServices: {
        label: "Professional Services",
        rows: [
          ["Client intake & conflict check", "\"Onboarding eats half a day of partner time.\"", "Intake → engagement letter in minutes; up to ~<strong>30 hrs/wk</strong> saved"],
          ["Document & proposal drafting", "\"Partners draft everything from scratch.\"", "~<strong>25%</strong> faster task completion"],
          ["Billable-time capture", "\"We under-bill because nobody logs time accurately.\"", "<strong>5–8%</strong> billable-hour recovery"],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          ["Tier-1 support automation", "\"Support drowns in 'where's my order' tickets.\"", "<strong>60–70%</strong> of tier-1 tickets auto-resolved"],
          ["Personalisation & recommendations", "\"Generic storefront leaves revenue on the table.\"", "Engaged-chat shoppers convert ~<strong>2–4×</strong> more"],
          ["SKU launch copy", "\"Listing copy bottlenecks every launch.\"", "Launch copy in <strong>N languages</strong> in hours, not weeks"],
        ],
      },
      investorOperators: {
        label: "Investor-Operators",
        rows: [
          ["Deal sourcing / underwriting", "\"Good deals get missed in the pile.\"", "~<strong>3–4×</strong> more deals screened, same team"],
          ["Portfolio digest", "\"Can't see across companies without chasing each one.\"", "Weekly digest; ~<strong>6–10 hrs/wk</strong> recovered"],
          ["Asset / property ops", "\"Manual ops drag NOI.\"", "Up to ~<strong>10%</strong> NOI improvement (directional)"],
        ],
      },
    },
  },
};

// ─── UK ───────────────────────────────────────────────────────────────────────

const uk: DirectPageDict = {
  header: { langEn: "EN", langUk: "УК" },

  hero: {
    eyebrow: "Стратегічна карта ШІ",
    headline: "Побачте, де ШІ справді окупається у вашому бізнесі — а де ні.",
    subheadline:
      "90-хвилинна робоча сесія, яка відображає кожну можливість для ШІ у вашому бізнесі з пріоритетами за ROI. Результат — односторінковий документ протягом 48 годин.",
    cta: "Забронювати Стратегічну карту ШІ",
    daysLeft: (n) => {
      const l = n % 10, ll = n % 100;
      const form = (ll >= 11 && ll <= 14) ? "днів" : l === 1 ? "день" : (l >= 2 && l <= 4) ? "дні" : "днів";
      return `${n} ${form} залишилось`;
    },
    offerCloses: "пропозиція закривається 30 червня",
    priceChip: "€997 — було €1,500",
  },

  problem: {
    label: "Проблема",
    headline: "Ваш бізнес втрачає гроші. Просто не видно де.",
    body:
      "Повільні відповіді на запити = втрачені ліди, ще до того як ви дізналися про них. Ручні процеси, які мали б бути автоматизовані = зайві години щотижня. Рішення, що зависають на вас = вузькі місця скрізь. Окремо — кожне дратує. Разом — це тисячі євро на місяць, що виходять з бізнесу. Проблема не в самих витоках — у тому, що у вас немає карти.",
  },

  offer: {
    label: "Рішення",
    headline: "Стратегічна карта ШІ",
    subhead:
      "90-хвилинна робоча сесія + односторінковий документ з пріоритетами за ROI протягом 48 годин.",
    body:
      "Ми розбираємо ваш бізнес за трьома напрямами — комунікація з клієнтами, внутрішні операції, повторювані процеси. Кожне вузьке місце оцінюється за здійсненністю ШІ та очікуваним ROI. Ви отримуєте чітку, пріоритизовану, готову до дій карту — що виправити і що автоматизувати в першу чергу. Без прихованих продажів.",
    valueLabel: "Що ви отримуєте",
    del1: "Бізнес відображено за 3 ключовими напрямами",
    del2: "4–6 сценаріїв, пріоритизованих за ROI",
    del3: "Оцінка першого етапу — або чесне «ще не час»",
    anchorLabel: "Повна ціна",
    anchorValue: "€1,500",
    currentPriceLabel: "До 30 червня",
    currentPriceValue: "€997",
    creditNote:
      "€997 повністю зараховуються в рахунок першого етапу — карта фактично обходиться вам безкоштовно, якщо ви вирішите рухатися далі.",
  },

  guarantee: {
    label: "Гарантія",
    headline: "Гарантія 10×",
    body:
      "За 90 хвилин я визначу щонайменше €10,000 на рік у відновлювальних витратах або змарнованому часі у вашому бізнесі — з конкретними цифрами та пріоритетами на вашій карті. Якщо не знайду — ви не платите нічого, і карта залишається у вас.",
    highlight: "Повернення 10× ще до того, як ми збудуємо хоч щось.",
  },

  close: {
    label: "Пропозиція",
    headline: "Все, що потрібно — щоб знати, що будувати і чи варто.",
    included1: "90-хвилинна сесія Стратегічної карти ШІ",
    included2: "Односторінковий ROI-пріоритизований документ протягом 48 годин",
    included3: "Оцінка першого етапу — або чесне «ще не час»",
    creditLine:
      "Повністю зараховується в перший етап — карта фактично безкоштовна, якщо ви вирішите рухатися далі.",
    guaranteeLine: "Гарантія 10×: знайдемо €10k+/рік у вашому бізнесі — або ви не платите нічого.",
    deadlineChip: "€997 до 30 червня · було €1,500",
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
        body: "Ми розбираємо ваш бізнес за 3 ключовими напрямами. Кожне вузьке місце отримує оцінку за здійсненністю ШІ та очікуваним ROI.",
      },
      {
        num: "03",
        title: "Отримайте результат",
        body: "Стратегічна карта ШІ буде у вас протягом 48 годин — повноцінний документ. Якщо є що будувати — ви також отримаєте оцінку вартості першого етапу.",
        trust: "Фінальний аналіз ми робимо після дзвінка. Ви отримуєте документ, а не сирі нотатки.",
      },
    ],
  },

  proof: {
    label: "Докази",
    headline: "Реальні запущені рішення",
    liveBadge: "LIVE",
    sub: "Програмне забезпечення в продакшені, реальні розмови щодня.",
    slotLabel: "Кейси з перших сесій — скоро.",
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

  faq: {
    label: "Питання",
    headline: "Перед бронюванням",
    items: [
      {
        q: "Чому €997? Чому не безкоштовно?",
        a: () =>
          "Тому що це реальна робоча сесія з реальним результатом — не ознайомчий дзвінок і не безкоштовний аудит. €997 також повністю зараховуються в перший етап: якщо карта веде до побудови — сесія коштує вам нічого. Якщо ні — ви заплатили €997 за чіткість щодо всього вашого бізнесу. Вигідно в обох випадках.",
      },
      {
        q: "Чи варта €997?",
        a: () =>
          "Гарантія 10× закриває це питання: якщо я не знайду щонайменше €10,000 на рік відновлюваних витрат у вашому бізнесі — ви не платите нічого. Якщо знайду — ви платите €997, щоб знайти €10k+/рік. І €997 знімаються з вартості першого етапу.",
      },
      {
        q: "А якщо я не зможу впровадити те, що є на карті?",
        a: ({ phase1Anchor }) =>
          `Саме для цього і є перший етап — готова реалізація найпріоритетнішого сценарію. Зазвичай ${phase1Anchor}, 2–3 тижні. Якщо захочете рухатися — я дам оцінку. Якщо ні — карта і ясність залишаються у вас.`,
      },
      {
        q: "Чим це відрізняється від консалтингу, демо ChatGPT або найму консультанта?",
        a: () =>
          "Консалтинг — 6–8 тижнів, €8–30k і слайди. Демо ChatGPT — безкоштовно, але без конкретики. Найм консультанта — пропозиція, передоплата, місяці онбордингу. Тут: 90 хвилин — і ви виходите з оцінкою власного бізнесу за ROI. Що з цим робити — ваш вибір.",
      },
      {
        q: "А що, якщо мій бізнес занадто специфічний для ШІ?",
        a: () =>
          "Так думає кожен. Після 90 хвилин ви точно будете знати, яких частин вашого бізнесу ШІ може торкнутися — а яких ні. Іноді відповідь: «поки що майже нічого» — і це теж корисна відповідь.",
      },
      {
        q: "Як виглядає ця карта насправді?",
        a: () =>
          "Односторінковий документ з оцінками: три напрями бізнесу, кожен розбитий на больові точки, кожна — оцінена за здійсненністю ШІ та ROI. Ви виходите з 4–6 пріоритизованими сценаріями та рекомендацією. Дивіться зразок вище.",
      },
      {
        q: "Як зазвичай виглядає перший етап?",
        a: ({ phase1Anchor }) =>
          `Працюючий прототип сценарію з найвищим ROI з вашої карти. Зазвичай ${phase1Anchor}, 2–3 тижні, команда перевірених українських девелоперів. Реальне програмне забезпечення на понеділок — не стратегічний документ.`,
      },
      {
        q: "Кому це підходить?",
        a: () =>
          "Підходить, якщо: бізнес від €30k–€200k+ на місяць, можете прийняти рішення протягом 30 днів, хочете конкретних цифр, а не хайпу. Не підходить, якщо рішення потребує шести стейкхолдерів або ви шукаєте того, хто продасть вам ШІ-інструмент.",
      },
      {
        q: "Якою мовою можна провести сесію?",
        a: () => "Українською, російською, англійською — або іспанською, якщо є настрій.",
      },
    ],
  },

  finalCta: {
    headline: "Отримайте карту. Дізнайтеся свої цифри.",
    sub: "90 хвилин. €997. Повністю зараховується в перший етап.",
    cta: "Забронювати Стратегічну карту ШІ",
    messengerLabel: "Спочатку написати в Telegram",
    guarantee: "Гарантія 10×: знайдемо €10k+/рік — або ви не платите нічого.",
  },

  footer: { credit: "care less AI automation", location: "Сантандер, Іспанія" },

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
          ["Прискорення підготовки пропозицій та рахунків", "«Комерційні пропозиції готуються днями; ми програємо тим, хто відповідає першим.»", "Підготовка: ~15 хв → ~<strong>1 хв</strong>; ~<strong>3×</strong> пропускна здатність, та сама команда"],
          ["Планування виробництва", "«Усе планування тримається в голові однієї людини й ламається, коли її немає.»", "Планування: <strong>~20 год/тиждень → ~5</strong>; вчасна доставка: <strong>82% → 95%</strong>"],
          ["Маршрутизація після продажних звернень", "«Запити лежать у пошті; на виїзд відправляють не того спеціаліста.»", "<strong>60–70%</strong> базових звернень автоматично відсіюються; вирішення ~<strong>50%</strong> швидше"],
        ],
      },
      professionalServices: {
        label: "Професійні послуги",
        rows: [
          ["Прийом клієнта та перевірка конфлікту інтересів", "«Онбординг забирає пів дня часу партнера.»", "Від запиту до листа-зобов'язання за хвилини; до ~<strong>30 год/тиждень</strong> економії"],
          ["Підготовка документів і пропозицій", "«Партнери щоразу готують усе з нуля.»", "Виконання завдань ~<strong>25%</strong> швидше"],
          ["Фіксація оплачуваного часу", "«Компанія недовиставляє рахунки, бо ніхто точно не фіксує час.»", "Повернення <strong>5–8%</strong> оплачуваних годин"],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          ["Автоматизація підтримки першої лінії", "«Підтримка тоне в запитах «де моє замовлення?».»", "<strong>60–70%</strong> звернень першої лінії вирішуються автоматично"],
          ["Персоналізація та рекомендації", "«Універсальна вітрина залишає гроші на столі.»", "Покупці з чатом конвертуються ~<strong>2–4×</strong> краще"],
          ["Тексти для запуску нових SKU", "«Тексти для карток гальмують кожен запуск.»", "Тексти для запуску <strong>N мовами</strong> — за години, а не тижні"],
        ],
      },
      investorOperators: {
        label: "Портфельні оператори",
        rows: [
          ["Пошук і первинна оцінка угод", "«Хороші угоди губляться в загальному потоці.»", "~<strong>3–4×</strong> більше угод перевіряється тією ж командою"],
          ["Дайджест портфеля", "«Неможливо бачити картину по всіх компаніях, не ганяючись за кожною.»", "Щотижневий дайджест; ~<strong>6–10 год/тиждень</strong> повертається"],
          ["Операційка активів / нерухомості", "«Ручні процеси тягнуть NOI вниз.»", "До ~<strong>10%</strong> покращення NOI, орієнтовно"],
        ],
      },
    },
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const directDict: Record<DirectLocale, DirectPageDict> = { en, uk };

export function getDirectDict(locale: DirectLocale): DirectPageDict {
  return directDict[locale];
}
