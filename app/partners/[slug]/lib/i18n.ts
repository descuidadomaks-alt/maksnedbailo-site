/**
 * Short-template locale dictionary.
 *
 * EN — complete and production-ready.
 * UK — native Ukrainian translation provided by Maks.
 *
 * Remaining TODO_UK: FAQ answers (5) and industry rows for
 * Manufacturing, E-commerce, and Investor-Operators tabs.
 * Search TODO_UK to find them.
 */

import type { Locale } from "@/content/partners/index";

// ─── Industry data types ───────────────────────────────────────────────────────

export type IndustryRow = [string, string, string]; // [useCase, pain, result]

export interface IndustryTab {
  label: string;
  rows: [IndustryRow, IndustryRow, IndustryRow];
}

// ─── Full dictionary shape ─────────────────────────────────────────────────────

export interface ShortPageDict {
  header: {
    personalInvitation: string;
    langEn: string;
    langUk: string;
  };

  hero: {
    eyebrow: (partnerName: string) => string;
    // ── headline in use ──────────────────────────────────────────────────────
    headline: string;
    // alt A (swap below if Maks prefers):
    // EN: "Everyone says 'use AI.' Almost no one tells you where it pays off in your business."
    // alt B:
    // EN: "Before you automate anything, find what's actually worth automating."
    subheadline: (partnerName: string) => string;
    cta: string;
    daysLeft: (n: number) => string;
    offerCloses: string;
    /** Locale-specific partner quote — falls back to config.partnerQuote if absent */
    partnerQuoteOverride?: string;
    /** Locale-specific partner role/title — falls back to config.partnerTitle if absent */
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
    sampleNote: string;
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Label: (phase1Anchor: string) => string;
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
    headline: (partnerName: string) => string;
    sub: string;
    primaryCta: string;
    messengerLabel: (channel: "telegram" | "whatsapp") => string;
  };

  faq: {
    label: string;
    headline: string;
    items: {
      q: string;
      a: (vars: { partnerName: string; phase1Anchor: string }) => string;
    }[];
  };

  footer: {
    credit: string;
    location: string;
  };
}

// ─── EN dictionary ─────────────────────────────────────────────────────────────

const en: ShortPageDict = {
  header: {
    personalInvitation: "Personal Invitation",
    langEn: "EN",
    langUk: "UK",
  },

  hero: {
    eyebrow: (p) => `Personal invitation through ${p}'s circle`,
    headline:
      "See where AI actually pays off in your business — and where it doesn't.",
    subheadline: (p) =>
      `A 90-minute Strategic AI Map, ranked by ROI. Normally €1,500 — reserved for you through ${p}.`,
    cta: "Claim Your Complimentary Session",
    daysLeft: (n) => `${n} ${n === 1 ? "day" : "days"} left`,
    offerCloses: "offer closes June 30",
    // EN uses config values directly — no overrides needed
  },

  offer: {
    label: "The Offer",
    headline: (p) => `A €1,500 session — reserved through ${p}`,
    normallyLabel: "Normally",
    normallyValue: "€1,500",
    giftedLine: (p) => `Gifted to you through ${p}. No strings.`,
    body:
      "This isn't a discovery call with a pitch attached. It's a working session. You leave with a one-page map of every AI opportunity in your business — scored, ranked by ROI, and ready to act on. If nothing clears the bar, I'll tell you that. You keep the map either way.",
    deliverableHeading: "You walk away with",
    del1: "3 pillars of your operation scored for AI readiness",
    del2: "4–6 use cases ranked by estimated ROI",
    del3: "Phase 1 quoted (or an honest 'not yet' — no charge either way)",
    sampleNote: "Sample output — yours will be specific to your business",
    stat1Value: "3", stat1Label: "pillars scored",
    stat2Value: "6", stat2Label: "use cases ranked",
    stat3Label: (p) => `${p} quoted`,
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
            "«Quotes take days; we lose jobs to whoever replies first.»",
            "Invoice/quote prep ~15 min → ~1 min; ~3× throughput, same team",
          ],
          [
            "Production scheduling",
            "«Scheduling lives in one head and breaks when they’re out.»",
            "Planning ~20 hrs/wk → ~5; on-time delivery 82% → 95%",
          ],
          [
            "After-sale routing",
            "«Requests sit in an inbox; the wrong tech gets dispatched.»",
            "60–70% tier-1 deflection; ~50% faster resolution",
          ],
        ],
      },
      professionalServices: {
        label: "Professional Services",
        rows: [
          [
            "Client intake & conflict check",
            "«Onboarding eats half a day of partner time.»",
            "Intake → engagement letter in minutes; up to ~30 hrs/wk saved on doc tasks",
          ],
          [
            "Document & proposal drafting",
            "«Partners draft everything from scratch.»",
            "~25% faster task completion",
          ],
          [
            "Billable-time capture",
            "«We under-bill because nobody logs time accurately.»",
            "5–8% billable-hour recovery",
          ],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          [
            "Tier-1 support automation",
            "«Support drowns in ‘where’s my order’ tickets.»",
            "60–70% of tier-1 tickets auto-resolved",
          ],
          [
            "Personalisation / recommendations",
            "«Generic storefront leaves revenue on the table.»",
            "Engaged-chat shoppers convert ~2–4× more",
          ],
          [
            "SKU launch copy",
            "«Listing copy bottlenecks every launch.»",
            "Launch copy in N languages in hours, not weeks",
          ],
        ],
      },
      investorOperators: {
        label: "Investor-Operators",
        rows: [
          [
            "Deal sourcing / underwriting",
            "«Good deals get missed in the pile.»",
            "~3–4× more deals screened, same team",
          ],
          [
            "Portfolio digest",
            "«Can’t see across companies without chasing each one.»",
            "Weekly cross-portfolio digest; ~6–10 hrs/wk recovered",
          ],
          [
            "Asset / property ops",
            "«Manual ops drag NOI.»",
            "Up to ~10% NOI improvement (directional)",
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
        body: "The Strategic AI Map lands within 48 hours — a proper document, not rough notes. Phase 1 quoted if it’s worth building.",
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
        name: "Cosmetic Suite",
        desc: "WhatsApp + Instagram lead capture. Qualification and booking, automated.",
        tag: "Aesthetic clinic · Lead capture",
        href: "/automations/cosmeticsuite",
      },
    ],
  },

  cta: {
    headline: (p) => `${p} sent you here for a reason.`,
    sub: "The map is yours either way.",
    primaryCta: "Claim Your Complimentary Session",
    messengerLabel: (channel) =>
      channel === "telegram" ? "Message on Telegram first" : "Message on WhatsApp first",
  },

  faq: {
    label: "Questions",
    headline: "Before you book",
    items: [
      {
        q: "What does the map actually look like?",
        a: () =>
          "It’s a one-page scored document. Three pillars of your business (customer-facing comms, internal knowledge, repeatable execution), each broken into pain points. Each gets an AI-feasibility score and an estimated ROI. You leave with 4–6 ranked use cases and a clear recommendation on Phase 1 — or an honest ‘not yet’ if none of them clear the bar.",
      },
      {
        q: "Who is this for — and who isn’t it?",
        a: () =>
          "It works if you’re running a business doing €50k–€200k+ per month, you can act inside 30 days, and you want numbers, not hype. It doesn’t work if your business is under €30k/month (the Phase 1 ROI math doesn’t support it yet), or if every decision needs six people in the room.",
      },
      {
        q: "How is this different from a consultancy deck or a ChatGPT demo?",
        a: () =>
          "A consultancy charges €8–30k and gives you a presentation. A ChatGPT demo is free and gives you vague excitement. This is 90 minutes and gives you a scored, ranked, ROI-mapped document — and a clear decision point on whether to build anything. If nothing clears the bar, you keep the map and owe nothing.",
      },
      {
        q: "What’s the catch?",
        a: ({ partnerName, phase1Anchor }) =>
          `There isn’t one in the way you’re thinking. The session is complimentary through ${partnerName}. If something’s worth building, I’ll quote Phase 1 — typically ${phase1Anchor}, 2–3 weeks, Ukrainian dev capacity. If not, I’ll say so. No pitch, no follow-up sequence, no proposal you didn’t ask for.`,
      },
      {
        q: "Who’s Maks?",
        a: () =>
          "Maks Nedbailo. Built DCoast as a design agency, watched founders drown in operations they couldn’t delegate, pivoted to fix that one thing. Care Less is small — me plus a vetted Ukrainian dev network. Two live builds in production: Amira (UK MedSpa) and Cosmetic Suite. I won’t sell you something you don’t need.",
      },
    ],
  },

  footer: {
    credit: "care less AI automation",
    location: "Santander, Spain",
  },
};

// ─── UK dictionary ─────────────────────────────────────────────────────────────
// Native Ukrainian translation by Maks Nedbailo.
//
// Remaining TODO_UK:
//  - FAQ answers (5 items) — provided as questions only; answers still in EN
//  - Industry rows: Manufacturing (3 rows), E-commerce (3 rows), Investor-Operators (3 rows)
//
// Notes on name grammar:
//  - Functions receive partnerName in GENITIVE form (e.g. "Влада") for sentence contexts
//    ("через Влада", "зарезервовано через Влада")
//  - cta.headline receives partnerName in NOMINATIVE form ("Влад") — ShortPage handles this
//    via config.partnerNameUk vs config.partnerNameGenitiveUk

const uk: ShortPageDict = {
  header: {
    personalInvitation: "Особисте запрошення",
    langEn: "EN",
    langUk: "УК",
  },

  hero: {
    eyebrow: (p) => `Особисте запрошення для людей із кола ${p}`,
    headline:
      "Побачте, де ШІ справді окупається у вашому бізнесі — а де ні.",
    subheadline: (p) =>
      `90-хвилинна Стратегічна мапа ШІ з пріоритетами за очікуваною окупністю. Зазвичай — €1,500. Для вас — зарезервовано через ${p}.`,
    cta: "Забронювати безкоштовну сесію",
    daysLeft: (n) => {
      const l = n % 10, ll = n % 100;
      const form =
        ll >= 11 && ll <= 14 ? "днів"
        : l === 1 ? "день"
        : l >= 2 && l <= 4 ? "дні"
        : "днів";
      return `${n} ${form} залишилось`;
    },
    offerCloses: "пропозиція закривається 30 червня",
    // Partner-specific Ukrainian quote & role — overrides config.partnerQuote / config.partnerTitle
    partnerQuoteOverride:
      "Я знаю Макса вже багато років. Коли комусь із мого кола потрібно тверезо розібратися з ШІ, я відправляю їх до нього. Він не буде продавати вам те, що вам не потрібно.",
    partnerRoleOverride: "шаман і радник",
  },

  offer: {
    label: "Пропозиція",
    headline: (p) => `Сесія вартістю €1,500 — зарезервована для вас через ${p}`,
    normallyLabel: "Зазвичай",
    normallyValue: "€1,500",
    giftedLine: (p) => `Для вас — у подарунок через ${p}. Без жодних зобов’язань.`,
    body:
      "Це не ознайомчий дзвінок із прихованим продажем наприкінці. Це робоча сесія. Після неї у вас буде односторінкова мапа всіх можливостей для впровадження ШІ у вашому бізнесі — з оцінкою, пріоритетами за окупністю та чіткими наступними кроками. Якщо жодна ідея не проходить планку доцільності, я прямо вам про це скажу. Мапа в будь-якому разі залишається у вас.",
    deliverableHeading: "Що ви отримаєте після сесії",
    del1: "3 ключові напрями вашого бізнесу, оцінені на готовність до ШІ",
    del2: "4–6 сценаріїв використання, розставлених за очікуваною окупністю",
    del3: "Оцінку вартості першого етапу або чесне «ще не час» — без оплати в будь-якому випадку",
    sampleNote: "Приклад результату — ваша мапа буде адаптована саме під ваш бізнес",
    stat1Value: "3", stat1Label: "напрями оцінено",
    stat2Value: "6", stat2Label: "сценаріїв пріоритизовано",
    stat3Label: () => "оцінка першого етапу",
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
            "Підготовка рахунку/пропозиції: ~15 хв → ~1 хв; приблизно у 3× більша пропускна здатність тієї ж команди",
          ],
          [
            "Планування виробництва",
            "«Усе планування тримається в голові однієї людини й ламається, коли її немає.»",
            "Планування: ~20 год/тиждень → ~5; вчасна доставка: 82% → 95%",
          ],
          [
            "Маршрутизація післяпродажних звернень",
            "«Запити лежать у пошті; на виїзд відправляють не того спеціаліста.»",
            "60–70% базових звернень відсіюються автоматично; вирішення приблизно на 50% швидше",
          ],
        ],
      },
      professionalServices: {
        label: "Професійні послуги",
        rows: [
          [
            "Прийом клієнта та перевірка конфлікту інтересів",
            "«Онбординг забирає пів дня часу партнера.»",
            "Від первинного запиту до листа-зобов’язання — за кілька хвилин; до ~30 годин на тиждень економії на документах",
          ],
          [
            "Підготовка документів і пропозицій",
            "«Партнери щоразу готують усе з нуля.»",
            "Виконання завдань приблизно на 25% швидше",
          ],
          [
            "Фіксація оплачуваного часу",
            "«Компанія недовиставляє рахунки, бо ніхто точно не фіксує час.»",
            "Повернення 5–8% оплачуваних годин",
          ],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          [
            "Автоматизація підтримки першої лінії",
            "«Підтримка тоне в запитах «де моє замовлення?».»",
            "60–70% звернень першої лінії вирішуються автоматично",
          ],
          [
            "Персоналізація та рекомендації",
            "«Універсальна вітрина залишає гроші на столі.»",
            "Покупці, які взаємодіють із чатом, конвертуються приблизно у 2–4× краще",
          ],
          [
            "Тексти для запуску нових SKU",
            "«Тексти для карток товарів гальмують кожен запуск.»",
            "Тексти для запуску N мовами — за години, а не тижні",
          ],
        ],
      },
      investorOperators: {
        label: "Інвестори-оператори",
        rows: [
          [
            "Пошук і первинна оцінка угод",
            "«Хороші угоди губляться в загальному потоці.»",
            "Приблизно у 3–4× більше угод перевіряється тією ж командою",
          ],
          [
            "Дайджест портфеля",
            "«Неможливо бачити картину по всіх компаніях, не ганяючись за кожною окремо.»",
            "Щотижневий дайджест по всьому портфелю; ~6–10 годин на тиждень повертається команді",
          ],
          [
            "Операційка активів / нерухомості",
            "«Ручні процеси тягнуть NOI вниз.»",
            "До ~10% покращення NOI, орієнтовно",
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
        body: "Оберіть 90-хвилинний слот і дайте відповідь на 4 запитання перед дзвінком, щоб я прийшов підготовленим, а не з шаблонними ідеями.",
      },
      {
        num: "02",
        title: "Створюємо мапу",
        body: "Ми розбираємо ваш бізнес за 3 ключовими напрямами. Я оцінюю їх наживо перед вами на спільному екрані.",
      },
      {
        num: "03",
        title: "Отримайте результат",
        body: "Стратегічна мапа ШІ буде у вас протягом 48 годин — це буде повноцінний документ, а не чернеткові нотатки. Якщо ідею варто реалізовувати, ви також отримаєте оцінку вартості першого етапу.",
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
        name: "Cosmetic Suite",
        desc: "Збір лідів із WhatsApp та Instagram. Кваліфікація й запис — автоматизовано.",
        tag: "Естетична клініка · Збір лідів",
        href: "/automations/cosmeticsuite",
      },
    ],
  },

  cta: {
    // Note: receives nominative form ("Влад") from ShortPage — see partnerNameUk in config
    headline: (p) => `${p} відправив вас сюди не просто так.`,
    sub: "Мапа залишається у вас у будь-якому випадку.",
    primaryCta: "Забронювати безкоштовну сесію",
    messengerLabel: (channel) =>
      channel === "telegram"
        ? "Спочатку написати в Telegram"
        : "Спочатку написати у WhatsApp",
  },

  faq: {
    label: "Питання",
    headline: "Перед бронюванням",
    items: [
      {
        q: "Як насправді виглядає ця мапа?",
        // TODO_UK: translate FAQ answer 1
        a: () =>
          "It’s a one-page scored document. Three pillars of your business (customer-facing comms, internal knowledge, repeatable execution), each broken into pain points. Each gets an AI-feasibility score and an estimated ROI. You leave with 4–6 ranked use cases and a clear recommendation on Phase 1 — or an honest ‘not yet’ if none clear the bar.",
      },
      {
        q: "Кому це підходить — і кому ні?",
        // TODO_UK: translate FAQ answer 2
        a: () =>
          "It works if you’re running a business doing €50k–€200k+ per month, you can act inside 30 days, and you want numbers, not hype. It doesn’t work if your business is under €30k/month (the Phase 1 ROI math doesn’t support it yet), or if every decision needs six people in the room.",
      },
      {
        q: "Чим це відрізняється від консалтингової презентації або демо ChatGPT?",
        // TODO_UK: translate FAQ answer 3
        a: () =>
          "A consultancy charges €8–30k and gives you a presentation. A ChatGPT demo is free and gives you vague excitement. This is 90 minutes and gives you a scored, ranked, ROI-mapped document — and a clear decision point. If nothing clears the bar, you keep the map and owe nothing.",
      },
      {
        q: "У чому підступ?",
        // TODO_UK: translate FAQ answer 4 (receives genitive partnerName from ShortPage)
        a: ({ partnerName, phase1Anchor }) =>
          `There isn’t one in the way you’re thinking. The session is complimentary through ${partnerName}. If something’s worth building, I’ll quote Phase 1 — typically ${phase1Anchor}, 2–3 weeks, Ukrainian dev capacity. If not, I’ll say so. No pitch, no follow-up sequence, no proposal you didn’t ask for.`,
      },
      {
        q: "Хто такий Макс?",
        // TODO_UK: translate FAQ answer 5
        a: () =>
          "Maks Nedbailo. Built DCoast as a design agency, watched founders drown in operations they couldn’t delegate, pivoted to fix that one thing. Care Less is small — me plus a vetted Ukrainian dev network. Two live builds in production: Amira (UK MedSpa) and Cosmetic Suite. I won’t sell you something you don’t need.",
      },
    ],
  },

  footer: {
    credit: "care less AI automation",
    location: "Сантандер, Іспанія",
  },
};

// ─── Exported getter ───────────────────────────────────────────────────────────

export const dict: Record<Locale, ShortPageDict> = { en, uk };

export function getDict(locale: Locale): ShortPageDict {
  return dict[locale];
}
