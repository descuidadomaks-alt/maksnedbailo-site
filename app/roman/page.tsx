'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import EmblaCarousel from 'embla-carousel'

type Lang = 'ru' | 'en'
type EmblaApi = ReturnType<typeof EmblaCarousel>

// ── Design tokens ──────────────────────────────────────────────────────────────
const D = {
  bg:       '#0E0E0F',
  bg2:      '#15151A',
  cream:    '#F5F1EA',
  mute:     '#9A9389',
  gold:     '#C9A961',
  line:     '#2A2722',
  sand:     '#D9CBB8',
  sandBg:   '#E8DFD0',
  textDark: '#1A1714',
  muteDark: 'rgba(26,23,20,0.5)',
  lineDark: 'rgba(26,23,20,0.13)',
}

const display = { fontFamily: 'var(--rs-display), Georgia, serif' }
const body    = { fontFamily: 'var(--rs-body), system-ui, sans-serif' }
const SP      = 'clamp(3.25rem,5.5vw,5.5rem)'   // 20% less than before

// ── Content ────────────────────────────────────────────────────────────────────
const C = {
  ru: {
    nav: {
      approach: 'Подход', thesis: 'Почему Пхукет', portfolio: 'Объекты',
      founder: 'Об авторе', process: 'Как работаем', faq: 'FAQ',
      contact: 'Связаться', cta: 'Получить подборку',
    },
    hero: {
      eyebrow: 'Независимый инвестиционный советник',
      h1a: 'Пхукет сегодня —', h1b: 'это Дубай 15 лет назад.',
      sub: 'Проверенные off-plan объекты, правовая защита и полное сопровождение сделки — без агентской накрутки.',
      cta: 'Получить подборку', scroll: 'Прокрутить',
    },
    // VERIFIED_GROK — numbers sourced from Roman's public social profiles
    proof: [
      { v: '100K+',  l: 'Подписчиков в соцсетях' },
      { v: '50+',    l: 'Объектов посещено лично' },
      { v: '2',      l: 'Рынка — Phuket + Dubai' },
      { v: '8–12%',  l: 'Проектная доходность' },
    ],
    pos: {
      num: '01', eye: 'Подход',
      h: 'Я не агентство. Я советник.',
      q: '«Агентства продают то, за что им платит девелопер. Я выбираю объекты так, как выбрал бы для себя.»',
      b: 'Я работаю с ограниченным числом клиентов — не потому что так принято, а потому что качество анализа не масштабируется. Каждый объект в моём портфеле я посетил лично, проверил юридическую историю и оценил потенциал выхода.',
      bullets: [
        'Проверяю девелоперов: история сдачи, финансовая устойчивость, репутация',
        'Отбираю верхний 1% предложений с реальной доходностью 8–12% годовых',
        'Сопровождаю от первого звонка до управления активом: юридика, FX, налоги',
      ],
    },
    thesis: {
      num: '02', eye: 'Инвестиционный тезис',
      h: 'Почему Пхукет — и почему сейчас',
      b: 'В 2010 году Дубай считался рискованным рынком. Те, кто рискнул войти, умножили капитал в 4–6 раз за десятилетие. Сегодня Пхукет — это тот же Дубай образца 2010-го. Правительство Таиланда ввело freehold для иностранцев на кондоминиумы, открыло долгосрочные визовые программы, а туристический поток восстановился до рекордных уровней.',
      chartCaption: 'Phuket tourism returns above pre-COVID peak — 2025 projection of 16M+ visitors marks the inflection point that mirrors Dubai\'s 2010 trajectory.',
      // TODO_THESIS_DATA — verify with official Thai Tourism Authority data
      tiles: [
        { v: '8–12%',   l: 'Проектная доходность от аренды' },
        { v: 'Freehold', l: 'Право собственности для иностранцев' },
        { v: '70–80%',  l: 'Рост спроса за последний год' },
      ],
    },
    portfolio: {
      num: '03', eye: 'Текущие возможности',
      h: 'Отобранные объекты',
      verified: '✓ Лично посещено',
      tour: 'AI-тур', req: 'Запросить брошюру',
      from: 'от', yld: 'Доходность',
      // TODO_REAL_ASSET — replace with real property listings from Roman
      props: [
        {
          name: 'VILLA EDEN', loc: 'Bang Tao, Пхукет', price: '$285 000',
          yld: '9–12% / год', tags: ['Freehold', 'Off-plan'],
          desc: 'Премиальный жилой комплекс в 300 м от пляжа. Студии и апартаменты с гарантированным доходом от застройщика.',
          img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1000&q=80&auto=format&fit=crop',
        },
        {
          name: 'THE RESIDENCE', loc: 'Karon Beach, Пхукет', price: '$430 000',
          yld: '8–10% / год', tags: ['Leasehold'],
          desc: 'Бутиковый проект у самого дорогого пляжа Пхукета. Ограниченный выпуск — 32 юнита. Высокий средний чек аренды.',
          img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&q=80&auto=format&fit=crop',
        },
        {
          name: 'PANORAMA VILLAS', loc: 'Kamala Hills, Пхукет', price: '$1 200 000',
          yld: '9–12% / год', tags: ['Freehold'],
          desc: 'Виллы с панорамным видом на Андаманское море. Входят в сеть управления 5★ отеля. Для серьёзного капитала.',
          img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000&q=80&auto=format&fit=crop',
        },
      ],
    },
    founder: {
      num: '04', eye: 'Основатель', h: 'Роман Щигло',
      q: '«Я переехал в Дубай в 2018 году, когда рынок только начинал расти. Пхукет сегодня — это то же самое ощущение: те же ценовые множители, те же возможности для тех, кто входит первым.»',
      b1: 'До 2018 года я работал в ивент-индустрии — строил бизнес, управлял командами, понимал, как работают деньги. Дубай стал моей первой серьёзной инвестиционной ставкой: вошёл, вышел с прибылью 40%, начал помогать другим.',
      b2: 'Сегодня большую часть времени провожу между Пхукетом и Дубаем — лично посещаю объекты, знаю девелоперов по именам, понимаю рынок изнутри. 100 000+ подписчиков в Instagram, YouTube и TikTok следят за моими выездами на объекты.',
      label1: '01 / Dubai', label2: '02 / Phuket',
    },
    process: {
      num: '05', eye: 'Как мы работаем', h: 'От первого звонка до дохода',
      steps: [
        { n: '01', t: 'Аудит портфеля',         b: '15-минутный диагностический звонок: цели, горизонт, капитал, толерантность к риску. Определяем, подходит ли вам Пхукет вообще.',    img: '/roman/process/step-1.jpg' },
        { n: '02', t: 'Персональная подборка',   b: 'Готовлю отбор из проверенных off-plan и внерыночных объектов под ваш профиль. Только то, что прошло мой личный анализ.',          img: '/roman/process/step-2.jpg' },
        { n: '03', t: 'Структурирование сделки', b: 'Юридическое сопровождение, FX-переводы, оформление собственности, визовая поддержка — под ключ.',                               img: '/roman/process/step-3.jpg' },
        { n: '04', t: 'Управление активом',       b: 'Передача проверенной управляющей компании с прозрачной отчётностью. Вы получаете доход, не занимаясь операционкой.',             img: '/roman/process/step-4.jpg' },
      ],
    },
    faq: {
      num: '06', eye: 'Частые вопросы', h: 'FAQ',
      items: [
        { q: 'Могут ли иностранцы владеть недвижимостью в Таиланде?', a: 'Да. Иностранцы могут владеть кондоминиумами на правах freehold (полная собственность) при условии, что их доля в здании не превышает 49%. Для вилл и земли используется leasehold (30+30+30 лет) или тайская компания.', img: '/roman/faq/q1.jpg' },
        { q: 'Как вы получаете вознаграждение?', a: 'Я работаю по модели co-broker: девелопер платит агентскую комиссию, заложенную в цену объекта для любого покупателя. Для вас цена не меняется — вы получаете дополнительный уровень анализа бесплатно.', img: '/roman/faq/q2.jpg' },
        { q: 'Каков минимальный порог входа?', a: 'От $150 000 для студий в правильных проектах. Реалистичный бюджет для объекта с доходностью 8%+ — от $250 000. Для вилл и панорамных проектов — от $500 000.', img: '/roman/faq/q3.jpg' },
        { q: 'Сколько времени занимает сделка?', a: 'От первого звонка до подписания договора — 2–4 недели. Полный цикл включая оформление собственности — 30–90 дней в зависимости от объекта.', img: '/roman/faq/q4.jpg' },
        { q: 'А если меня интересует Дубай?', a: 'Я знаю дубайский рынок не хуже Пхукета — жил и работал там с 2018 года. Если ваш профиль лучше соответствует ОАЭ, скажу об этом честно и помогу с анализом.', img: '/roman/faq/q5.jpg' },
        { q: 'Как вы проверяете девелоперов?', a: 'Смотрю историю сдачи объектов (сроки и качество), финансовую устойчивость, репутацию на рынке, качество управляющей компании.', img: '/roman/faq/q6.jpg' },
      ],
    },
    contact: {
      num: '07', eye: 'Первый шаг',
      hook: 'Готовы рассмотреть Phuket всерьёз?',
      sub: 'Напишите в WhatsApp или Telegram — подготовлю подборку под ваш профиль в течение 48 часов.',
      namePh: 'Ваше имя', contactPh: 'Телефон или @username',
      budgetLabel: 'Бюджет', goalLabel: 'Цель', channelLabel: 'Предпочтительный способ связи',
      budgetOpts: ['< $250K', '$250–500K', '$500K–1M', '$1M+'] as const,
      goalOpts: ['Доходность', 'Рост капитала', 'Оба', 'Lifestyle'] as const,
      channelOpts: ['WhatsApp', 'Telegram', 'Email'] as const,
      submit: 'Отправить заявку',
      successTitle: 'Заявка отправлена',
      successSub: 'В течение 24 часов вернусь.',
    },
    footer: {
      tag: 'Независимый инвестиционный советник', mkt: 'Пхукет · Дубай',
      legal: '© 2025 Roman Shiglo. Информация носит ознакомительный характер и не является инвестиционным советом.',
      nav: 'Навигация',
    },
  },
  en: {
    nav: {
      approach: 'Approach', thesis: 'Why Phuket', portfolio: 'Portfolio',
      founder: 'Founder', process: 'Process', faq: 'FAQ',
      contact: 'Contact', cta: 'Request Portfolio',
    },
    hero: {
      eyebrow: 'Independent Investment Advisory',
      h1a: 'Phuket today is', h1b: 'Dubai 15 years ago.',
      sub: 'Curated off-plan properties, freehold ownership, and end-to-end execution — without the agency markup.',
      cta: 'Request Private Portfolio', scroll: 'Scroll',
    },
    // VERIFIED_GROK — numbers sourced from Roman's public social profiles
    proof: [
      { v: '100K+',  l: 'Followers across socials' },
      { v: '50+',    l: 'Properties walked personally' },
      { v: '2',      l: 'Markets — Phuket + Dubai' },
      { v: '8–12%',  l: 'Projected rental yield' },
    ],
    pos: {
      num: '01', eye: 'Approach',
      h: 'I am not an agency. I am an advisor.',
      q: '"Agencies sell what developers pay them to sell. I choose properties the way I\'d choose for myself."',
      b: 'I work with a limited number of clients — not because it\'s conventional, but because quality analysis doesn\'t scale. Every property in my portfolio I have walked personally, verified the legal history, and assessed the exit potential.',
      bullets: [
        'Vet developers: delivery history, financial strength, market reputation',
        'Hand-pick the top 1% with real returns of 8–12% per year',
        'End-to-end from first call to asset management: legal, FX, taxes',
      ],
    },
    thesis: {
      num: '02', eye: 'Investment Thesis',
      h: 'Why Phuket — and why now',
      b: 'In 2010, Dubai was considered a risky market. Those who moved early multiplied their capital 4–6x over the decade. Today, Phuket is that same Dubai circa 2010. Thailand\'s government has introduced freehold for foreigners, opened long-term visa programs, and tourism has recovered to record levels.',
      chartCaption: 'Phuket tourism returns above pre-COVID peak — 2025 projection of 16M+ visitors mirrors Dubai\'s 2010 inflection.',
      // TODO_THESIS_DATA
      tiles: [
        { v: '8–12%',   l: 'Projected rental yield' },
        { v: 'Freehold', l: 'Ownership available to foreigners' },
        { v: '70–80%',  l: 'Demand growth over past year' },
      ],
    },
    portfolio: {
      num: '03', eye: 'Current Opportunities',
      h: 'Curated Properties',
      verified: '✓ Personally visited',
      tour: 'AI Tour', req: 'Request Brochure',
      from: 'from', yld: 'Yield',
      // TODO_REAL_ASSET
      props: [
        {
          name: 'VILLA EDEN', loc: 'Bang Tao, Phuket', price: '$285,000',
          yld: '9–12% / yr', tags: ['Freehold', 'Off-plan'],
          desc: 'Premium residential complex 300m from the beach. Studios and apartments with developer-guaranteed income.',
          img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1000&q=80&auto=format&fit=crop',
        },
        {
          name: 'THE RESIDENCE', loc: 'Karon Beach, Phuket', price: '$430,000',
          yld: '8–10% / yr', tags: ['Leasehold'],
          desc: 'Boutique project on one of Phuket\'s most prestigious beaches. Limited release — 32 units. High average rental rate.',
          img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&q=80&auto=format&fit=crop',
        },
        {
          name: 'PANORAMA VILLAS', loc: 'Kamala Hills, Phuket', price: '$1,200,000',
          yld: '9–12% / yr', tags: ['Freehold'],
          desc: 'Villas with panoramic Andaman Sea views. Part of a 5★ hotel management network. For serious capital.',
          img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000&q=80&auto=format&fit=crop',
        },
      ],
    },
    founder: {
      num: '04', eye: 'Founder', h: 'Roman Shiglo',
      q: '"I moved to Dubai in 2018, when the market was just beginning to accelerate. Phuket today feels exactly the same — the same price multiples, the same window for those who enter first."',
      b1: 'Before 2018 I worked in the event industry — building businesses, managing teams, understanding how money moves. Dubai was my first serious investment bet: I bought, exited at +40%, and started helping others.',
      b2: 'Today I spend most of my time between Phuket and Dubai — visiting properties personally, knowing developers by name. 100,000+ followers on Instagram, YouTube, and TikTok watch my on-site walkthroughs.',
      label1: '01 / Dubai', label2: '02 / Phuket',
    },
    process: {
      num: '05', eye: 'How We Work', h: 'From first call to rental income',
      steps: [
        { n: '01', t: 'Portfolio Audit',         b: '15-minute diagnostic call: goals, horizon, capital, risk tolerance. We determine whether Phuket is even the right market for you.',        img: '/roman/process/step-1.jpg' },
        { n: '02', t: 'Curated Shortlist',        b: 'I prepare a selection of vetted off-plan and off-market opportunities matched to your profile. Only what has passed my personal analysis.', img: '/roman/process/step-2.jpg' },
        { n: '03', t: 'Structural Execution',     b: 'Legal support, FX transfers, title registration, visa assistance — full turnkey.',                                                        img: '/roman/process/step-3.jpg' },
        { n: '04', t: 'Asset Management',          b: 'Handoff to a vetted local property manager with transparent reporting. You earn income without handling operations.',                    img: '/roman/process/step-4.jpg' },
      ],
    },
    faq: {
      num: '06', eye: 'Common Questions', h: 'FAQ',
      items: [
        { q: 'Can foreigners own property in Thailand?', a: 'Yes. Foreigners can own condominiums on a freehold basis (full ownership) provided their share of the building does not exceed 49%. For villas and land, a leasehold structure (30+30+30 years) or a Thai company is used.', img: '/roman/faq/q1.jpg' },
        { q: 'How are you compensated?', a: 'I operate on a co-broker model: the developer pays an agency commission built into the price for any buyer. Your purchase price doesn\'t change — you get an additional layer of analysis at no cost.', img: '/roman/faq/q2.jpg' },
        { q: 'What is the minimum investment?', a: 'From $150,000 for studios in the right projects. A realistic budget for a quality property with 8%+ yield is from $250,000. For villas, from $500,000.', img: '/roman/faq/q3.jpg' },
        { q: 'How long does a transaction take?', a: 'From first call to signed agreement: 2–4 weeks. Full cycle including title registration: 30–90 days depending on the property.', img: '/roman/faq/q4.jpg' },
        { q: 'What if I want Dubai instead?', a: 'I know the Dubai market as well as Phuket — I lived and worked there from 2018. If your profile is a better fit for the UAE, I\'ll say so honestly.', img: '/roman/faq/q5.jpg' },
        { q: 'How do you vet developers?', a: 'I review delivery history (timing and quality), financial stability, market reputation, and quality of the management company.', img: '/roman/faq/q6.jpg' },
      ],
    },
    contact: {
      num: '07', eye: 'First Step',
      hook: 'Ready to consider Phuket seriously?',
      sub: 'Message on WhatsApp or Telegram — I\'ll prepare a curated selection within 48 hours.',
      namePh: 'Your name', contactPh: 'Phone or @username',
      budgetLabel: 'Budget', goalLabel: 'Primary goal', channelLabel: 'Preferred channel',
      budgetOpts: ['< $250K', '$250–500K', '$500K–1M', '$1M+'] as const,
      goalOpts: ['Yield', 'Capital growth', 'Both', 'Lifestyle'] as const,
      channelOpts: ['WhatsApp', 'Telegram', 'Email'] as const,
      submit: 'Submit Request',
      successTitle: 'Request received',
      successSub: 'I\'ll be in touch within 24 hours.',
    },
    footer: {
      tag: 'Independent Investment Advisory', mkt: 'Phuket · Dubai',
      legal: '© 2025 Roman Shiglo. Information on this site is for informational purposes only and does not constitute investment advice.',
      nav: 'Navigation',
    },
  },
} as const

// ── Icons ──────────────────────────────────────────────────────────────────────
const IconWA = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const IconTG = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)
const IconArrowL = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)
const IconArrowR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

// ── Tourism chart — Phuket arrivals 2019-2025E ─────────────────────────────────
// TODO_THESIS_DATA: verify with Thai Tourism Authority official data
const CHART_DATA = [
  { year: '2019', val: 14.5, est: false },
  { year: '2020', val: 6.7,  est: false },
  { year: '2021', val: 0.4,  est: false },
  { year: '2022', val: 11.5, est: false },
  { year: '2023', val: 12.0, est: false },
  { year: '2024', val: 13.4, est: false },
  { year: '2025', val: 16.0, est: true  },
]

function ThesisChart() {
  const max = 16, chartH = 100, barW = 26, gap = 11
  const totalW = CHART_DATA.length * barW + (CHART_DATA.length - 1) * gap
  const svgW   = totalW + 40
  const baseY  = 115
  return (
    <svg viewBox={`0 0 ${svgW} 140`} style={{ width: '100%', maxWidth: 380, display: 'block', overflow: 'visible' }}>
      <line x1="0" y1={baseY} x2={svgW} y2={baseY} stroke={D.lineDark} strokeWidth="1" />
      {CHART_DATA.map((d, i) => {
        const h  = (d.val / max) * chartH
        const x  = 20 + i * (barW + gap)
        const y  = baseY - h
        return (
          <g key={d.year}>
            <rect x={x} y={y} width={barW} height={h}
              fill={d.est ? D.gold : 'rgba(26,23,20,0.2)'} rx="1" />
            {d.est && (
              <text x={x + barW / 2} y={y - 5} textAnchor="middle"
                style={{ fontSize: 8, fill: D.gold, fontFamily: 'var(--rs-body)', fontWeight: '500' }}>
                16M+
              </text>
            )}
            <text x={x + barW / 2} y={baseY + 13} textAnchor="middle"
              style={{ fontSize: 7.5, fill: D.muteDark, fontFamily: 'var(--rs-body)' }}>
              {d.year}{d.est ? 'E' : ''}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Wordmark ──────────────────────────────────────────────────────────────────
function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <div style={{ lineHeight: 1.15 }}>
      <p style={{ ...body, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: light ? D.textDark : D.cream, margin: 0 }}>
        Roman Shiglo
      </p>
      <p style={{ ...body, fontSize: '8px', fontVariant: 'small-caps', letterSpacing: '0.1em', color: light ? D.muteDark : D.mute, margin: 0, marginTop: 1 }}>
        Investment Advisory
      </p>
    </div>
  )
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ num, eye, light = false }: { num: string; eye: string; light?: boolean }) {
  return (
    <div className="rs-reveal" style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem', marginBottom: '2.5rem' }}>
      <span style={{ ...display, fontSize: 'clamp(3rem,7vw,4.5rem)', fontWeight: 300, fontStyle: 'italic', color: D.gold, opacity: .5, lineHeight: 1 }}>
        {num}
      </span>
      <span style={{ ...body, fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '.22em', color: light ? D.muteDark : D.mute }}>
        {eye}
      </span>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function RomanPage() {
  const [lang, setLang]         = useState<Lang>('ru')
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq]   = useState<number | null>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [tappedStep, setTappedStep]   = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', contact: '', budget: '', goal: '', channel: '' })
  const [formSent, setFormSent] = useState(false)
  // Parallax
  const founderRef   = useRef<HTMLDivElement>(null)
  const [parallax, setParallax] = useState(0)
  const reducedMotion = useRef(false)
  // Embla
  const emblaViewport = useRef<HTMLDivElement>(null)
  const emblaApi      = useRef<EmblaApi | null>(null)

  const T = C[lang]

  // ── Nav scroll ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = () => setNavSolid(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  // ── Check reduced motion ─────────────────────────────────────────────────────
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // ── Scroll reveal ────────────────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('rs-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    )
    document.querySelectorAll('.rs-reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [lang])

  // ── Parallax scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (reducedMotion.current || !founderRef.current) return
      const rect = founderRef.current.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setParallax(Math.min(1, Math.max(0, progress)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Embla carousel ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!emblaViewport.current) return
    const isMobile = window.innerWidth < 768
    const api = EmblaCarousel(emblaViewport.current, {
      dragFree: false,
      containScroll: 'trimSnaps',
      align: 'center',
      loop: false,
    })
    emblaApi.current = api
    api.on('select', () => setActiveCard(api.selectedScrollSnap()))
    return () => api.destroy()
  }, [lang])

  const closeMenu = useCallback(() => { setMenuOpen(false); document.body.style.overflow = '' }, [])
  const openMenu  = useCallback(() => { setMenuOpen(true); document.body.style.overflow = 'hidden' }, [])

  const waLink = lang === 'ru'
    ? 'https://wa.me/971563879975?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%A0%D0%BE%D0%BC%D0%B0%D0%BD%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%D0%B1%20%D0%B8%D0%BD%D0%B2%D0%B5%D1%81%D1%82%D0%B8%D1%86%D0%B8%D1%8F%D1%85%20%D0%B2%20%D0%9F%D1%85%D1%83%D0%BA%D0%B5%D1%82'
    : 'https://wa.me/971563879975?text=Hello%20Roman!%20I%27d%20like%20to%20learn%20about%20Phuket%20real%20estate.'

  const navLinks = [
    ['#approach',  T.nav.approach],
    ['#thesis',    T.nav.thesis],
    ['#portfolio', T.nav.portfolio],
    ['#founder',   T.nav.founder],
    ['#process',   T.nav.process],
    ['#faq',       T.nav.faq],
  ] as const

  const props = T.portfolio.props

  return (
    <div style={{ background: D.bg, color: D.cream, ...body, lineHeight: 1.65 }}>

      {/* ── Responsive CSS ───────────────────────────────────────────────── */}
      <style>{`
        @media (min-width: 1024px) {
          .rs-desklinks { display: flex !important; }
          .rs-deskcta   { display: inline-flex !important; }
          .rs-hamburger { display: none !important; }
        }
        @media (min-width: 768px) {
          .rs-2col     { grid-template-columns: 1fr 1fr !important; }
          .rs-3col-f   { grid-template-columns: 1fr 1fr 1fr !important; }
          .rs-proof-grid { flex-direction: row !important; }
          .rs-proof-cell { border-top: none !important; border-left: 1px solid ${D.lineDark} !important; }
          .rs-proof-cell:first-child { border-left: none !important; }
          /* FAQ desktop */
          .rs-faq-grid  { grid-template-columns: 1fr 360px !important; gap: 5rem !important; }
          .rs-faq-img-d { display: block !important; }
          .rs-faq-img-m { display: none !important; }
          /* Process desktop */
          .rs-process-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 5rem !important; align-items: start !important; }
          /* Contact */
          .rs-contact-grid { grid-template-columns: 55% 1fr !important; gap: 0 !important; }
        }
        /* Embla slides */
        .embla__slide { flex: 0 0 calc(100% - 3rem); }
        @media (min-width: 768px) {
          .embla__slide { flex: 0 0 62%; }
        }
        /* Founder */
        @media (min-width: 768px) {
          .founder-layout { flex-direction: row !important; }
          .founder-comp   { flex: 0 0 52% !important; }
        }
      `}</style>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className={`rs-nav ${navSolid ? 'rs-nav-solid' : ''}`}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '0.85rem 1.5rem', borderBottom: '1px solid transparent' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ textDecoration: 'none' }}><Wordmark /></a>

          <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="rs-desklinks">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href}
                style={{ ...body, fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '.2em', color: D.mute, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = D.cream)}
                onMouseLeave={e => (e.currentTarget.style.color = D.mute)}>
                {label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <a href="#contact" className="rs-btn-primary rs-deskcta" style={{ display: 'none', fontSize: '9px', padding: '.65rem 1.4rem' }}>
              {T.nav.cta}
            </a>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', ...body, fontSize: '10px', letterSpacing: '.14em' }}>
              <button onClick={() => setLang('ru')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: lang === 'ru' ? D.cream : D.mute, padding: 0 }}>RU</button>
              <span style={{ color: D.line }}>|</span>
              <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: lang === 'en' ? D.cream : D.mute, padding: 0 }}>EN</button>
            </div>
            <button onClick={openMenu} aria-label="Menu" className="rs-hamburger"
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
              <span style={{ display: 'block', width: 20, height: 1, background: D.cream }} />
              <span style={{ display: 'block', width: 13, height: 1, background: D.cream }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────────────────────── */}
      <div className={`rs-menu ${menuOpen ? 'rs-open' : ''}`} aria-hidden={!menuOpen}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem', borderBottom: `1px solid ${D.line}` }}>
          <Wordmark />
          <button onClick={closeMenu} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.cream }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, padding: '2rem', gap: '1.5rem' }}>
          {[...navLinks, ['#contact', T.nav.contact] as const].map(([href, label]) => (
            <a key={href} href={href} onClick={closeMenu}
              style={{ ...display, fontSize: 'clamp(1.6rem,6.5vw,2.4rem)', fontWeight: 300, fontStyle: 'italic', color: D.cream, textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = D.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = D.cream)}>
              {label}
            </a>
          ))}
        </div>
        <div style={{ padding: '1.25rem 1.5rem', borderTop: `1px solid ${D.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#contact" className="rs-btn-primary" onClick={closeMenu}>{T.nav.cta}</a>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', ...body, fontSize: '10px', letterSpacing: '.14em' }}>
            <button onClick={() => { setLang('ru'); closeMenu() }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: lang === 'ru' ? D.cream : D.mute, padding: 0 }}>RU</button>
            <span style={{ color: D.line }}>|</span>
            <button onClick={() => { setLang('en'); closeMenu() }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: lang === 'en' ? D.cream : D.mute, padding: 0 }}>EN</button>
          </div>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="top" className="rs-grain"
        style={{ position: 'relative', height: '100dvh', minHeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: D.bg }}>
        {/* Video — all three attrs (autoPlay+muted+playsInline) required for iOS Safari */}
        <video
          autoPlay muted loop playsInline preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        >
          <source src="/roman/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,14,15,.12) 0%, rgba(14,14,15,.45) 45%, rgba(14,14,15,.92) 100%)', zIndex: 1 }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 780, padding: '0 1.5rem', width: '100%', margin: '0 auto' }}>
          <p className="rs-a0" style={{ ...body, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.3em', color: D.gold, marginBottom: '1.25rem', fontWeight: 300 }}>
            {T.hero.eyebrow}
          </p>
          <h1 style={{ ...display, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.06, marginBottom: '1.5rem' }}>
            <span className="rs-a1" style={{ display: 'block', fontSize: 'clamp(2.2rem,6.5vw,5.2rem)', color: D.cream }}>
              {T.hero.h1a}
            </span>
            <span className="rs-a2" style={{ display: 'block', fontSize: 'clamp(2.2rem,6.5vw,5.2rem)', color: D.cream }}>
              {T.hero.h1b}
            </span>
          </h1>
          <p className="rs-a3" style={{ ...body, fontSize: 'clamp(.88rem,1.8vw,1.05rem)', color: D.mute, maxWidth: 460, margin: '0 auto 2.5rem', lineHeight: 1.75, fontWeight: 300 }}>
            {T.hero.sub}
          </p>
          <div className="rs-a4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#contact" className="rs-btn-primary" style={{ fontSize: '11px', padding: '1.05rem 3rem', letterSpacing: '.16em' }}>
              {T.hero.cta}
            </a>
            {/* Naked WA + TG icons — no labels, no outlines */}
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ color: D.cream, opacity: .55, transition: 'opacity .2s', display: 'flex' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '.55')}
                aria-label="WhatsApp">
                <IconWA size={22} />
              </a>
              <a href="https://t.me/roman_shiglo" target="_blank" rel="noopener noreferrer"
                style={{ color: D.cream, opacity: .55, transition: 'opacity .2s', display: 'flex' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '.55')}
                aria-label="Telegram">
                <IconTG size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator — absolute bottom, always visible */}
        <div className="rs-a6" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
          <div className="rs-scroll-line" style={{ width: 1, height: 36, background: `linear-gradient(to bottom, transparent, ${D.gold})`, transformOrigin: 'top' }} />
          <span style={{ ...body, fontSize: 9, textTransform: 'uppercase', letterSpacing: '.22em', color: D.mute }}>{T.hero.scroll}</span>
        </div>
      </section>

      {/* ── Proof ribbon — VERIFIED_GROK numbers ─────────────────────────── */}
      <section style={{ background: D.sandBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column' }} className="rs-proof-grid">
          {T.proof.map((item, i) => (
            <div key={i} className="rs-proof-cell"
              style={{ flex: 1, padding: '1.4rem 1.75rem', textAlign: 'center', borderTop: `1px solid ${D.lineDark}` }}>
              <p style={{ ...display, fontSize: 'clamp(1.15rem,2.8vw,1.6rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, lineHeight: 1, marginBottom: '0.2rem' }}>
                {item.v}
              </p>
              <p style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.18em', color: D.muteDark }}>
                {item.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── §01 Approach — dark ───────────────────────────────────────────── */}
      <section id="approach" style={{ padding: `${SP} 1.5rem`, borderTop: `1px solid ${D.line}`, background: D.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num={T.pos.num} eye={T.pos.eye} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(2rem,4vw,3.5rem)', alignItems: 'start' }} className="rs-2col">
            <div>
              <h2 className="rs-reveal" style={{ ...display, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 300, fontStyle: 'italic', color: D.cream, marginBottom: '1.4rem', lineHeight: 1.12 }}>
                {T.pos.h}
              </h2>
              <blockquote className="rs-reveal" style={{ ...display, fontSize: 'clamp(.92rem,1.6vw,1.1rem)', fontStyle: 'italic', fontWeight: 300, color: D.sand, lineHeight: 1.6, paddingLeft: '1.25rem', borderLeft: `2px solid ${D.gold}`, margin: 0 }}>
                {T.pos.q}
              </blockquote>
            </div>
            <div>
              <p className="rs-reveal" style={{ ...body, fontSize: 'clamp(.86rem,1.3vw,.95rem)', color: D.mute, lineHeight: 1.8, marginBottom: '1.6rem', fontWeight: 300 }}>
                {T.pos.b}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                {T.pos.bullets.map((b) => (
                  <li key={b} className="rs-reveal" style={{ display: 'flex', alignItems: 'flex-start', gap: '.9rem', ...body, fontSize: 'clamp(.84rem,1.2vw,.92rem)', color: D.cream, fontWeight: 300, lineHeight: 1.65 }}>
                    <span style={{ marginTop: 6, flexShrink: 0, width: 6, height: 6, background: D.gold }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── §02 Thesis — sand (light) ─────────────────────────────────────── */}
      <section id="thesis" style={{ padding: `${SP} 1.5rem`, background: D.sandBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num={T.thesis.num} eye={T.thesis.eye} light />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(2.5rem,5vw,4rem)', alignItems: 'start' }} className="rs-2col">
            <div>
              <h2 className="rs-reveal" style={{ ...display, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, marginBottom: '1.4rem', lineHeight: 1.12 }}>
                {T.thesis.h}
              </h2>
              <p className="rs-reveal" style={{ ...body, fontSize: 'clamp(.86rem,1.3vw,.95rem)', color: D.muteDark, lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem', maxWidth: 520 }}>
                {T.thesis.b}
              </p>
              {/* Chart */}
              <div className="rs-reveal">
                <ThesisChart />
                <p style={{ ...display, fontSize: '11px', fontStyle: 'italic', color: D.muteDark, marginTop: '0.5rem', maxWidth: 380, lineHeight: 1.55 }}>
                  {T.thesis.chartCaption}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: D.lineDark }}>
              {T.thesis.tiles.map((tile) => (
                <div key={tile.l} className="rs-reveal" style={{ background: D.sandBg, padding: '1.75rem 1.5rem' }}>
                  <p style={{ ...display, fontSize: 'clamp(1.6rem,2.8vw,2.2rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, marginBottom: '0.3rem', lineHeight: 1 }}>
                    {tile.v}
                  </p>
                  <p style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.16em', color: D.muteDark }}>
                    {tile.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── §03 Portfolio — sand (light) — Embla carousel ────────────────── */}
      <section id="portfolio"
        style={{ background: D.sandBg, borderTop: `1px solid ${D.lineDark}`, padding: `${SP} 0`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', marginBottom: '1.5rem' }}>
          <SectionHeader num={T.portfolio.num} eye={T.portfolio.eye} light />
          <h2 className="rs-reveal" style={{ ...display, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, lineHeight: 1.12 }}>
            {T.portfolio.h}
          </h2>
        </div>

        {/* Carousel with external arrows on desktop */}
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 1.5rem', boxSizing: 'border-box' }}>
          {/* Arrow left (desktop) */}
          <button
            onClick={() => emblaApi.current?.scrollPrev()}
            aria-label="Previous"
            style={{ position: 'absolute', left: -12, top: '40%', transform: 'translateY(-50%)', zIndex: 10, width: 40, height: 40, border: `1px solid ${activeCard === 0 ? D.lineDark : D.gold}`, background: D.sandBg, cursor: activeCard === 0 ? 'default' : 'pointer', color: activeCard === 0 ? D.muteDark : D.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}
            className="rs-arrow-btn"
          >
            <IconArrowL />
          </button>
          {/* Arrow right (desktop) */}
          <button
            onClick={() => emblaApi.current?.scrollNext()}
            aria-label="Next"
            style={{ position: 'absolute', right: -12, top: '40%', transform: 'translateY(-50%)', zIndex: 10, width: 40, height: 40, border: `1px solid ${activeCard === props.length - 1 ? D.lineDark : D.gold}`, background: D.sandBg, cursor: activeCard === props.length - 1 ? 'default' : 'pointer', color: activeCard === props.length - 1 ? D.muteDark : D.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}
            className="rs-arrow-btn"
          >
            <IconArrowR />
          </button>

          {/* Embla viewport */}
          <div ref={emblaViewport} style={{ overflow: 'hidden' }}>
            <div className="rs-carousel-track" style={{ gap: '1rem', alignItems: 'stretch' }}>
              {props.map((prop, i) => (
                <div key={prop.name} className="embla__slide" style={{ opacity: i === activeCard ? 1 : 0.5, transition: 'opacity 400ms' }}>
                  <div className="rs-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    {/* Image */}
                    <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', maxHeight: '45vh' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={prop.img} alt={prop.name} loading={i === 0 ? 'eager' : 'lazy'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 600ms ease' }} />
                      {/* ✓ Visited badge — top-left */}
                      <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(14,14,15,0.75)', backdropFilter: 'blur(8px)', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ ...body, fontSize: '8.5px', textTransform: 'uppercase', letterSpacing: '.14em', color: D.gold }}>
                          {T.portfolio.verified}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.2em', color: D.muteDark, marginBottom: '0.3rem' }}>{prop.loc}</p>
                      <h3 style={{ ...display, fontSize: 'clamp(1.2rem,2.2vw,1.6rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, lineHeight: 1.15, marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {prop.name}
                      </h3>
                      {/* Price · Yield */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.6rem' }}>
                        <span style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', color: D.muteDark }}>{T.portfolio.from}</span>
                        <span style={{ ...display, fontSize: '1.1rem', fontWeight: 300, color: D.textDark }}>{prop.price}</span>
                        <span style={{ color: D.lineDark }}>·</span>
                        <span style={{ ...body, fontSize: '12px', color: D.gold, fontWeight: 500 }}>{prop.yld}</span>
                      </div>
                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        {prop.tags.map(tag => (
                          <span key={tag} style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', padding: '3px 8px', border: `1px solid ${D.lineDark}`, color: D.muteDark }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p style={{ ...body, fontSize: '12.5px', color: D.muteDark, lineHeight: 1.7, flex: 1, marginBottom: '1rem', fontWeight: 300 }}>{prop.desc}</p>
                      {/* CTAs */}
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <a href="#contact"
                          style={{ ...body, fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '.12em', color: D.gold, textDecoration: 'none', borderBottom: `1px solid ${D.gold}`, paddingBottom: 1 }}>
                          {T.portfolio.req} →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '1.25rem', padding: '0 1.5rem' }}>
          {props.map((_, i) => (
            <button key={i} onClick={() => emblaApi.current?.scrollTo(i)}
              style={{ width: i === activeCard ? 20 : 6, height: 6, background: i === activeCard ? D.gold : D.lineDark, border: 'none', cursor: 'pointer', transition: 'all .3s', borderRadius: 3, padding: 0 }}
              aria-label={`Go to property ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ── §04 Founder — dark — 2-photo asymmetric composition ─────────── */}
      <section id="founder" style={{ padding: `${SP} 1.5rem`, borderTop: `1px solid ${D.line}`, background: D.bg }} ref={founderRef}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num={T.founder.num} eye={T.founder.eye} />
          {/* Layout: composition left, text right */}
          <div className="founder-layout" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'flex-start' }}>

            {/* Image composition — absolute-positioned overlap */}
            {/* TODO_REAL_ASSET: founder2.jpg — provide landscape shot from Phuket/on-site */}
            <div className="founder-comp" style={{ position: 'relative', width: '100%', paddingBottom: '75%', maxWidth: 540, flexShrink: 0 }}>
              {/* Main portrait — top-left, large, z:2 */}
              <div style={{
                position: 'absolute', left: 0, top: 0, width: '68%', height: '82%',
                zIndex: 2, overflow: 'hidden', border: `1px solid ${D.line}`,
                transform: `translateY(${(parallax - 0.5) * -20}px)`,
                transition: reducedMotion.current ? 'none' : 'transform 60ms linear',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/roman/founder.jpg" alt="Roman Shiglo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                <p style={{ position: 'absolute', bottom: 8, left: 10, ...body, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '.15em', color: D.mute, margin: 0 }}>
                  {T.founder.label1}
                </p>
              </div>
              {/* Secondary — bottom-right, overlapping, z:1 */}
              <div style={{
                position: 'absolute', right: 0, bottom: 0, width: '56%', height: '55%',
                zIndex: 1, overflow: 'hidden', border: `1px solid ${D.line}`,
                transform: `translateY(${(parallax - 0.5) * 20}px)`,
                transition: reducedMotion.current ? 'none' : 'transform 60ms linear',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/roman/founder2.jpg"
                  alt="Roman Shiglo — Phuket"
                  loading="lazy"
                  onError={e => {
                    // fallback — show a branded placeholder
                    const p = (e.target as HTMLImageElement).parentElement!
                    p.style.background = D.bg2
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <p style={{ position: 'absolute', top: 8, right: 10, ...body, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '.15em', color: D.mute, margin: 0 }}>
                  {T.founder.label2}
                </p>
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 className="rs-reveal" style={{ ...display, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, fontStyle: 'italic', color: D.cream, marginBottom: '1.25rem', lineHeight: 1.1 }}>
                {T.founder.h}
              </h2>
              <blockquote className="rs-reveal" style={{ ...display, fontSize: 'clamp(.9rem,1.5vw,1.05rem)', fontStyle: 'italic', fontWeight: 300, color: D.sand, lineHeight: 1.6, paddingLeft: '1.25rem', borderLeft: `2px solid ${D.gold}`, margin: '0 0 1.6rem' }}>
                {T.founder.q}
              </blockquote>
              <p className="rs-reveal" style={{ ...body, fontSize: 'clamp(.84rem,1.2vw,.93rem)', color: D.mute, lineHeight: 1.8, marginBottom: '1rem', fontWeight: 300 }}>
                {T.founder.b1}
              </p>
              <p className="rs-reveal" style={{ ...body, fontSize: 'clamp(.84rem,1.2vw,.93rem)', color: D.mute, lineHeight: 1.8, fontWeight: 300 }}>
                {T.founder.b2}
              </p>
              <div className="rs-reveal" style={{ display: 'flex', gap: '1.25rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
                {[
                  { href: 'https://instagram.com/roman.schiglo', label: 'Instagram' },
                  { href: 'https://youtube.com/@roman_shiglo',   label: 'YouTube' },
                  { href: 'https://tiktok.com/@roman_shiglo',    label: 'TikTok' },
                ].map(({ href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ ...body, fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '.15em', color: D.mute, textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = D.gold)}
                    onMouseLeave={e => (e.currentTarget.style.color = D.mute)}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §05 Process — sand (light) — hover reveals image ─────────────── */}
      <section id="process" style={{ padding: `${SP} 1.5rem`, borderTop: `1px solid ${D.lineDark}`, background: D.sandBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num={T.process.num} eye={T.process.eye} light />
          <h2 className="rs-reveal" style={{ ...display, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, marginBottom: '2.5rem', lineHeight: 1.12 }}>
            {T.process.h}
          </h2>
          <div className="rs-process-row" style={{ display: 'block' }}>
            {/* Steps */}
            <div>
              {T.process.steps.map((step, i) => {
                const isActive = hoveredStep === i || tappedStep === i
                return (
                  <div key={step.n} className="rs-reveal"
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => setTappedStep(tappedStep === i ? null : i)}
                    style={{
                      display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                      paddingBottom: i < T.process.steps.length - 1 ? '2rem' : 0,
                      paddingLeft: '1.25rem',
                      borderLeft: `4px solid ${isActive ? D.gold : 'transparent'}`,
                      opacity: hoveredStep !== null && hoveredStep !== i ? 0.35 : 1,
                      transition: 'opacity 300ms, border-color 250ms',
                      cursor: 'default',
                    }}>
                    <span style={{
                      ...display, fontSize: 'clamp(3.8rem,7vw,5.5rem)', fontWeight: 300, fontStyle: 'italic',
                      color: D.gold, opacity: isActive ? 0.9 : 0.4, lineHeight: 1, flexShrink: 0,
                      transition: 'opacity 250ms', userSelect: 'none', minWidth: '3.8rem',
                    }}>{step.n}</span>
                    <div style={{ paddingTop: '0.5rem', flex: 1 }}>
                      <h3 style={{ ...display, fontSize: 'clamp(1rem,1.7vw,1.25rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, marginBottom: '0.4rem' }}>
                        {step.t}
                      </h3>
                      <p style={{ ...body, fontSize: 'clamp(.82rem,1.2vw,.92rem)', color: D.muteDark, lineHeight: 1.75, fontWeight: 300 }}>
                        {step.b}
                      </p>
                      {/* Mobile: tap to expand image */}
                      <div style={{ overflow: 'hidden', maxHeight: tappedStep === i ? 180 : 0, transition: 'max-height 400ms ease', marginTop: tappedStep === i ? '0.75rem' : 0 }}>
                        <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: D.lineDark }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={step.img} alt={step.t} loading="lazy"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Desktop: sticky image panel */}
            <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              {T.process.steps.map((step, i) => (
                <div key={step.n}
                  className={`rs-step-img ${hoveredStep === i ? 'rs-step-visible' : ''}`}
                  style={{ position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: D.lineDark, border: `1px solid ${D.lineDark}` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={step.img} alt={step.t} loading="lazy"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p style={{ ...display, fontSize: '10px', fontStyle: 'italic', color: D.muteDark, marginTop: '0.4rem' }}>
                    {step.n} — {step.t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── §06 FAQ — sand (light) — image on right ──────────────────────── */}
      <section id="faq" style={{ padding: `${SP} 1.5rem`, borderTop: `1px solid ${D.lineDark}`, background: D.sandBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader num={T.faq.num} eye={T.faq.eye} light />
          <h2 className="rs-reveal" style={{ ...display, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 300, fontStyle: 'italic', color: D.textDark, marginBottom: '2.5rem', lineHeight: 1.12 }}>
            {T.faq.h}
          </h2>
          <div className="rs-faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            {/* Accordion */}
            <div>
              {T.faq.items.map((item, i) => (
                <div key={i} className="rs-reveal" style={{ borderTop: `1px solid ${D.lineDark}` }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-expanded={openFaq === i}>
                    <span style={{ ...display, fontSize: 'clamp(.92rem,1.5vw,1.05rem)', color: D.textDark, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.45 }}>
                      {item.q}
                    </span>
                    <span className={`rs-faq-icon ${openFaq === i ? 'rs-rotated' : ''}`}
                      style={{ ...body, fontSize: '1.3rem', fontWeight: 300, color: D.gold, flexShrink: 0, lineHeight: 1 }}>
                      +
                    </span>
                  </button>
                  <div className={`rs-faq-body ${openFaq === i ? 'rs-open' : ''}`}>
                    <p style={{ ...body, fontSize: 'clamp(.82rem,1.2vw,.92rem)', color: D.muteDark, lineHeight: 1.8, paddingBottom: '1.25rem', fontWeight: 300 }}>
                      {item.a}
                    </p>
                    {/* Mobile: image below answer */}
                    <div className="rs-faq-img-m" style={{ overflow: 'hidden', aspectRatio: '16/9', background: D.lineDark, marginBottom: '1.25rem' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt="" loading="lazy"
                        onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: openFaq === i ? 1 : 0, transition: 'opacity 400ms' }} />
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${D.lineDark}` }} />
            </div>
            {/* Desktop: sticky image */}
            <div style={{ display: 'none', position: 'relative' }} className="rs-faq-img-d">
              <div style={{ position: 'sticky', top: 100 }}>
                {T.faq.items.map((item, i) => (
                  <div key={i} style={{
                    position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0,
                    opacity: openFaq === i ? 1 : 0,
                    transform: openFaq === i ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 380ms ease, transform 380ms ease',
                    pointerEvents: openFaq === i ? 'auto' : 'none',
                  }}>
                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: D.lineDark }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt="" loading="lazy"
                        onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = D.lineDark }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §07 Contact — dark — split-screen creative ───────────────────── */}
      <section id="contact"
        style={{ borderTop: `1px solid ${D.line}`, background: D.bg, position: 'relative', overflow: 'hidden' }}>
        <div className="rs-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', minHeight: '80vh' }}>
          {/* Left: form */}
          <div style={{ padding: `${SP} clamp(1.5rem,4vw,3.5rem)`, position: 'relative', zIndex: 2 }}>
            {/* Giant section number — background decoration */}
            <div aria-hidden style={{
              position: 'absolute', top: 0, right: '1rem', ...display,
              fontSize: 'clamp(80px,12vw,160px)', fontWeight: 300, fontStyle: 'italic',
              color: D.gold, opacity: .12, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>07</div>

            <SectionHeader num={T.contact.num} eye={T.contact.eye} />
            <h2 className="rs-reveal" style={{ ...display, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, fontStyle: 'italic', color: D.cream, marginBottom: '2rem', lineHeight: 1.15, maxWidth: 420 }}>
              {T.contact.hook}
            </h2>

            {formSent ? (
              <div className="rs-reveal" style={{ padding: '2rem 0' }}>
                <div style={{ width: 44, height: 44, border: `1px solid ${D.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={D.gold} strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p style={{ ...display, fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontStyle: 'italic', fontWeight: 300, color: D.cream, marginBottom: '.5rem' }}>
                  {T.contact.successTitle}
                </p>
                <p style={{ ...body, fontSize: '13px', color: D.mute, fontWeight: 300 }}>
                  {T.contact.successSub}
                </p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setFormSent(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', maxWidth: 480 }}>
                {/* Name */}
                <div>
                  <label style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.18em', color: D.mute, display: 'block', marginBottom: '.35rem' }}>
                    {lang === 'ru' ? 'Имя' : 'Name'}
                  </label>
                  <input required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder={T.contact.namePh}
                    style={{ width: '100%', background: 'transparent', borderBottom: `1px solid ${D.line}`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', color: D.cream, padding: '.6rem 0', ...body, fontSize: '14px', fontWeight: 300, outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }}
                    onFocus={e => (e.target.style.borderBottomColor = D.gold)}
                    onBlur={e => (e.target.style.borderBottomColor = D.line)} />
                </div>
                {/* Contact — no country preselection */}
                <div>
                  <label style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.18em', color: D.mute, display: 'block', marginBottom: '.35rem' }}>
                    {lang === 'ru' ? 'Телефон или Telegram' : 'Phone or Telegram'}
                  </label>
                  <input required value={formData.contact} onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))}
                    placeholder={T.contact.contactPh}
                    style={{ width: '100%', background: 'transparent', borderBottom: `1px solid ${D.line}`, borderTop: 'none', borderLeft: 'none', borderRight: 'none', color: D.cream, padding: '.6rem 0', ...body, fontSize: '14px', fontWeight: 300, outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }}
                    onFocus={e => (e.target.style.borderBottomColor = D.gold)}
                    onBlur={e => (e.target.style.borderBottomColor = D.line)} />
                </div>
                {/* Toggle groups */}
                {([
                  { key: 'budget',  label: T.contact.budgetLabel,  opts: T.contact.budgetOpts },
                  { key: 'goal',    label: T.contact.goalLabel,    opts: T.contact.goalOpts },
                  { key: 'channel', label: T.contact.channelLabel, opts: T.contact.channelOpts },
                ] as const).map(({ key, label, opts }) => (
                  <div key={key}>
                    <label style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.18em', color: D.mute, display: 'block', marginBottom: '.5rem' }}>{label}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                      {opts.map(opt => {
                        const active = formData[key] === opt
                        return (
                          <button key={opt} type="button"
                            onClick={() => setFormData(p => ({ ...p, [key]: opt }))}
                            style={{ padding: '.4rem .8rem', border: `1px solid ${active ? D.gold : D.line}`, background: active ? 'rgba(201,169,97,.1)' : 'transparent', color: active ? D.gold : D.mute, ...body, fontSize: '11px', cursor: 'pointer', transition: 'all .2s' }}>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
                <button type="submit" className="rs-btn-primary" style={{ marginTop: '.5rem', width: '100%', justifyContent: 'center', fontSize: '11px', letterSpacing: '.16em', padding: '1.05rem' }}>
                  {T.contact.submit}
                </button>
              </form>
            )}
          </div>

          {/* Right: founder2 full-bleed image */}
          {/* TODO_REAL_ASSET: replace with founder2.jpg (landscape, Roman in t-shirt / on-location Phuket shot) */}
          <div style={{ position: 'relative', minHeight: 320, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/roman/founder2.jpg"
              alt=""
              loading="lazy"
              onError={e => {
                const img = e.target as HTMLImageElement
                img.src = '/roman/founder.jpg' // fallback to main photo
              }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Dark tint overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,14,15,0.35)' }} />
          </div>
        </div>
      </section>

      {/* ── Footer — minimal ─────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${D.line}`, background: D.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: `clamp(2.5rem,4vw,4rem) 1.5rem` }}>
          <div style={{ display: 'grid', gap: '2rem', marginBottom: '2.5rem' }} className="rs-3col-f">
            {/* Brand */}
            <div>
              <div style={{ marginBottom: '0.6rem' }}><Wordmark /></div>
              <p style={{ ...body, fontSize: '12px', color: D.mute }}>{T.footer.mkt}</p>
            </div>
            {/* Nav */}
            <div>
              <p style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.18em', color: D.mute, marginBottom: '1rem' }}>{T.footer.nav}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {[...navLinks, ['#contact', T.nav.contact] as const].map(([href, label]) => (
                  <a key={href} href={href}
                    style={{ ...body, fontSize: '12.5px', color: D.mute, textDecoration: 'none', fontWeight: 300, transition: 'color .2s', width: 'fit-content' }}
                    onMouseEnter={e => (e.currentTarget.style.color = D.cream)}
                    onMouseLeave={e => (e.currentTarget.style.color = D.mute)}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div>
              <p style={{ ...body, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.18em', color: D.mute, marginBottom: '1rem' }}>{T.nav.contact}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  style={{ ...body, fontSize: '12.5px', color: D.mute, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color .2s', width: 'fit-content' }}
                  onMouseEnter={e => (e.currentTarget.style.color = D.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = D.mute)}>
                  <IconWA /> WhatsApp · +971 56 387 9975
                </a>
                <a href="https://t.me/roman_shiglo" target="_blank" rel="noopener noreferrer"
                  style={{ ...body, fontSize: '12.5px', color: D.mute, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color .2s', width: 'fit-content' }}
                  onMouseEnter={e => (e.currentTarget.style.color = D.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = D.mute)}>
                  <IconTG /> Telegram · @roman_shiglo
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {[
                  { href: 'https://instagram.com/roman.schiglo', label: 'IG' },
                  { href: 'https://youtube.com/@roman_shiglo',   label: 'YT' },
                  { href: 'https://tiktok.com/@roman_shiglo',    label: 'TT' },
                ].map(({ href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ width: 30, height: 30, border: `1px solid ${D.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...body, fontSize: '8.5px', letterSpacing: '.1em', color: D.mute, textDecoration: 'none', transition: 'border-color .25s, color .25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = D.gold; e.currentTarget.style.color = D.gold }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = D.line; e.currentTarget.style.color = D.mute }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.75rem', borderTop: `1px solid ${D.line}` }}>
            <p style={{ ...body, fontSize: '10px', color: D.mute, fontWeight: 300, maxWidth: 560, lineHeight: 1.6 }}>{T.footer.legal}</p>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', ...body, fontSize: '10px', letterSpacing: '.14em' }}>
              <button onClick={() => setLang('ru')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: lang === 'ru' ? D.cream : D.mute, padding: 0 }}>RU</button>
              <span style={{ color: D.line }}>|</span>
              <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: lang === 'en' ? D.cream : D.mute, padding: 0 }}>EN</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
