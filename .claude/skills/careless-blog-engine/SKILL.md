---
name: careless-blog-engine
description: Run one cycle of the Care Less bilingual (EN/ES) SEO+GEO blog engine for maksnedbailo.site. Research live search and news demand, pick an angle, write the post in Maks's voice in both native languages, QA it against the hard gates, and leave it as a draft for review. Use when the every-3-days blog task fires, or when Maks asks for the next post.
---

# Care Less Blog Engine

One cycle produces **one post, drafted in English and Spanish, both native**, published to
`content/blog/<slug>.mdx`, dated so it goes live on review.

Project-scoped and authoritative. It overrides any general blog skill.

---

## 0. The two gates. Non-negotiable.

Nothing ships until both pass. Run them yourself before you hand anything over.

### Gate 1: no machine-text fingerprints

```bash
node scripts/check-ai-tells.mjs content/blog
```

Must print `PASS`. It fails on two classes:

**Invisible characters.** Zero-width joiners, word joiners, directional marks,
variation selectors, and the Unicode TAG block `U+E0000-E007F`. The TAG block can
carry an entire hidden payload inside text that looks perfectly normal, and it
survives copy-paste. **Never emit any of them. Not one, not ever, for any reason.**
There is no legitimate use in prose. If tooling ever inserts them, strip them:

```bash
node scripts/check-ai-tells.mjs content/blog --fix-invisible
```

**Visible tells.** Em dash, en dash, curly quotes, ellipsis character, middot,
arrows, check marks. Write ASCII:

| Instead of | Write |
|---|---|
| `word — word` (aside) | `word, word` |
| `word — word` (before a list or explanation) | `word: word` |
| `word — word` (two full clauses) | `word. Word` |
| `4–6`, `2–3 weeks` | `4 to 6`, `2 to 3 weeks` |
| `€3K–€150K` | `€3K to €150K` (a range is never a comma; that reads as a list) |
| `“quote”`, `it’s` | `"quote"`, `it's` |
| `…` | `...` |
| `→` | `to`, or an SVG icon in JSX |

### Gate 2: genuinely bilingual

`lib/blog.ts` splits on `---ES---`. **If that marker is missing, Spanish readers
silently get the English body.** No error, no warning. Always include it, and
always check:

```bash
grep -c "^---ES---$" content/blog/<slug>.mdx   # must be 1
```

The Spanish is **written in Spanish, not translated from English**. Different
examples, different city references, different idiom. A Spanish reader must not
be able to tell which language came first. Peninsular Spanish: *vosotros* where
natural, `€` after the number (`1.500 €`), `.` for thousands and `,` for decimals.

---

## 1. Research. Do this before writing a word.

Two searches, both live. Never write from memory: the value is being early and
specific, and your training data is not.

1. **What is hot right now.** `WebSearch` for this week's AI news that touches
   owner-led service businesses. Funding rounds, model launches, a company doing
   something notable or stupid with AI, regulation landing in Spain or the EU.
2. **What people are actually searching.** Long-tail queries a 5 to 50 person
   business owner types. Question-shaped: "can I", "how much does", "is it worth",
   "what happens if". These become H2s verbatim.

Pick the intersection: **a fresh news hook plus a real search query.** A post that
is only news ages out in a week. A post that is only SEO is the same commodity
content everyone else publishes.

Check `content/blog/` first. Do not repeat an angle already covered.

---

## 2. Voice

**The stance: a curious wanderer inside the madness, not a teacher above it.**

Everyone else is writing "5 Ways AI Will Transform Your Business." We are the one
person in the room actually watching what happens, saying the quiet thing out
loud, and occasionally admitting we do not know. We are *in* the mess. We are not
narrating it from a balcony.

Three influences, blended:

- **Ryan Reynolds.** Dry, self-aware, undercuts its own hype. The joke is never
  at the reader's expense and never at the expense of the point. It lands and
  then gets out of the way. Never zany, never exclamation marks, never "🚀".
- **Alex Hormozi.** Blunt arithmetic. Name the number. "That is 40 hours a month.
  At 25 euro an hour that is 1.000 € you set on fire." Short sentences carrying
  real weight.
- **Chase Hughes.** Behavioural precision. Why a person actually does the thing,
  not what they say they do. Observation over assertion.

**Rules of voice:**

- Professional, never kiddish. Dry, never goofy.
- Say less. What survives must carry weight. If a sentence teaches nothing, cut it.
- Opinions, with reasons. "This is overhyped and here is the number that shows it"
  beats "here are the pros and cons."
- First person, singular, real. Maks builds these systems and sees them fail.
  Failure modes are the most valuable thing on the page.
- Admit limits. "I do not know yet" is credibility, and it is the single most
  underused sentence in this category.
- **Never** open with "In today's fast-paced world", "In an era where",
  "Let's dive in", "Buckle up", or a dictionary definition.
- **Never** use: leverage (as a verb), unlock, supercharge, game-changer,
  seamless, revolutionize, transform your business, delve, tapestry, landscape
  (figurative), "it's not just X, it's Y", "the truth is".
- Vary sentence length hard. A four-word sentence after a thirty-word one is what
  human writing looks like.

**Never fabricate.** Every number is real and attributed with a source and a date.
No invented case studies, no invented clients, no invented statistics. If a claim
cannot be sourced, cut it or mark it plainly as an estimate.

---

## 3. SEO and GEO

SEO gets the click. GEO gets quoted by ChatGPT, Claude, Perplexity and AI
Overviews. They need different things and both matter.

**SEO**

- One primary keyword, three to five secondary. Primary in the title, the first
  100 words, one H2, and the slug.
- Title 50 to 60 characters. Description 140 to 160. Both must read like a person
  wrote them, not a template.
- Slug short, hyphenated, keyword-bearing, no dates.
- Two to four internal links per post minimum. Always link `/ai-map` at least
  once, plus a city page (`/es/<city>` or `/en/<city>`) when the topic is local.
  Use descriptive anchor text, never "click here".
- 1.200 to 2.000 words for a pillar topic, 600 to 900 for a news reaction. Long
  enough to answer fully, never padded.
- Local intent: name the city, the neighbourhood, the actual businesses. "A
  clinic in Chamberí" beats "a business in Spain".

**GEO. This is what gets you cited.**

- **Open with the answer.** A `**TL;DR:**` line at the top that answers the
  headline question in two or three sentences, standalone. This is the block an
  answer engine lifts. It has to make sense with zero surrounding context.
- **H2s are questions.** Phrased the way a person asks them. Each section answers
  its own H2 in the first sentence, then supports it.
- **Extractable facts.** Short declarative sentences carrying one number and its
  source. "Klarna's agent did the work of 853 full-time staff (Klarna, Q3 2025)."
  A model can quote that. It cannot quote a paragraph of throat-clearing.
- **Comparison tables.** Answer engines lift tables intact. Any post comparing
  options gets one.
- **Real entities.** Name companies, tools, cities, regulations. Entity density is
  what makes a page look authoritative to a retrieval system.
- **A dated position.** "As of <month year>, X is true, and here is what changes
  it." Recency plus a falsifiable claim is what gets cited over a competitor.

---

## 4. Structure

```markdown
---
title: "<50 to 60 chars, primary keyword, no em dash>"
titleEs: "<native Spanish, not a translation>"
date: "YYYY-MM-DD"
excerpt: "<140 to 160 chars, answers the question>"
excerptEs: "<native Spanish>"
coverImage: "https://images.unsplash.com/photo-<id>?w=1200&q=80"
keywords: ["primary", "secondary", "long tail", "local ES", "local EN"]
---

**TL;DR:** <the whole answer, 2 to 3 sentences, standalone>

## <A question a real owner types>
<Answer in sentence one. Then the evidence.>

## <Next question>
...

## What this actually costs
<Real numbers. Ranges written "X to Y". Sourced.>

## Where it goes wrong
<Failure modes. The most valuable section. Never skip it.>

---ES---

**TL;DR:** <written in Spanish, Spanish examples, Spanish cities>
...
```

`date` is today or later. `lib/blog.ts` hides future dates, so a future date is
how you stage a post.

---

## 5. Cycle checklist

1. `ls content/blog/` and skim recent titles. No repeats.
2. Two live searches: news hook, search demand.
3. Pick the intersection. Write the primary keyword down before drafting.
4. Draft English. TL;DR first, question H2s, failure modes, real numbers.
5. Write Spanish natively below `---ES---`. New examples, Spanish cities.
6. Internal links: `/ai-map` plus a city page where relevant.
7. `node scripts/check-ai-tells.mjs content/blog` until `PASS`.
8. `grep -c "^---ES---$"` returns 1.
9. Read the first paragraph aloud. If it sounds like a press release, rewrite it.
10. Report: slug, both titles, primary keyword, the hook, word counts, gate results.

Leave it as a draft. Maks reviews before it goes live.
