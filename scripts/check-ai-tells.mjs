#!/usr/bin/env node
/**
 * Fail the build on characters that fingerprint text as machine written.
 *
 *   node scripts/check-ai-tells.mjs                  # default targets
 *   node scripts/check-ai-tells.mjs content/blog     # specific paths
 *   node scripts/check-ai-tells.mjs --fix-invisible  # strip invisibles, report the rest
 *
 * Two classes, and they are not the same problem.
 *
 * INVISIBLE characters are the serious one. Zero-width joiners, word
 * joiners, variation selectors and the Unicode TAG block (U+E0000-E007F) are
 * the vector for steganographic watermarking: they can carry an entire
 * hidden payload inside text that looks completely ordinary, they survive
 * copy-paste, and no human proofread will ever catch them. Any hit here is
 * treated as a hard failure. There is no legitimate use for them in this
 * content.
 *
 * VISIBLE tells (em dash, en dash, curly quotes, ellipsis, middot, arrows)
 * are the cheap giveaway. They are not proof of anything on their own, but
 * they are what both readers and detectors pattern-match on, and there is an
 * ASCII equivalent for every one of them.
 *
 * Comment-only lines in source files are skipped: they are prose for
 * developers, never served to a crawler. Content files (.md/.mdx) are
 * checked in full.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

/**
 * Default scope is the INDEXED surface, not the whole repo.
 *
 * A repo-wide gate is not meaningful here: most of app/ is archived homepages
 * and client demos that are all noindex, so failing on their punctuation
 * would make the check permanently red and train everyone to ignore it. What
 * matters is the seven routes a crawler can actually reach, plus the shared
 * chrome and data they pull from. Pass --all to sweep everything anyway.
 */
const INDEXED_SURFACE = [
  'content/blog',
  'app/page.tsx',
  'app/layout.tsx',
  'app/ai-map/page.tsx',
  'app/ai-map/new',
  'app/new/_v2',
  'app/new/components',
  'app/(site)',
  'components/BlogListingClient.tsx',
  'components/SiteFooterCopy.tsx',
  'components/CityPageClient.tsx',
  'components/BlogBottomCta.tsx',
  'components/LocalBusinessSchema.tsx',
  'components/FloatingWhatsApp.tsx',
  'lib/cities.ts',
  'lib/blog.ts',
];
const ALL_TARGETS = ['content', 'app', 'components', 'lib'];
const SOURCE_EXT = new Set(['.ts', '.tsx', '.js', '.mjs']);
const CONTENT_EXT = new Set(['.md', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'out', 'dist']);

/** Deleted outright when --fix-invisible is passed. */
const INVISIBLE = new Map([
  [0x200b, 'ZERO WIDTH SPACE'], [0x200c, 'ZERO WIDTH NON-JOINER'],
  [0x200d, 'ZERO WIDTH JOINER'], [0x200e, 'LEFT-TO-RIGHT MARK'],
  [0x200f, 'RIGHT-TO-LEFT MARK'], [0x2060, 'WORD JOINER'],
  [0x2061, 'FUNCTION APPLICATION'], [0x2062, 'INVISIBLE TIMES'],
  [0x2063, 'INVISIBLE SEPARATOR'], [0x2064, 'INVISIBLE PLUS'],
  [0x2066, 'LTR ISOLATE'], [0x2067, 'RTL ISOLATE'],
  [0x2068, 'FIRST STRONG ISOLATE'], [0x2069, 'POP DIRECTIONAL ISOLATE'],
  [0x202a, 'LTR EMBEDDING'], [0x202b, 'RTL EMBEDDING'],
  [0x202c, 'POP DIRECTIONAL FORMATTING'], [0x202d, 'LTR OVERRIDE'],
  [0x202e, 'RTL OVERRIDE'], [0xfeff, 'ZERO WIDTH NO-BREAK SPACE / BOM'],
  [0x00ad, 'SOFT HYPHEN'], [0x180e, 'MONGOLIAN VOWEL SEPARATOR'],
  [0x3164, 'HANGUL FILLER'], [0xffa0, 'HALFWIDTH HANGUL FILLER'],
]);
/** Whole blocks that are invisible. The TAG block is the hidden-message one. */
const INVISIBLE_RANGES = [
  [0xfe00, 0xfe0f, 'VARIATION SELECTOR'],
  [0xe0100, 0xe01ef, 'VARIATION SELECTOR SUPPLEMENT'],
  [0xe0000, 0xe007f, 'TAG CHARACTER (hidden-message vector)'],
];
/** Space-like: replaced with a normal space rather than deleted. */
const ODD_SPACES = new Map([
  [0x00a0, 'NO-BREAK SPACE'], [0x2007, 'FIGURE SPACE'], [0x2009, 'THIN SPACE'],
  [0x200a, 'HAIR SPACE'], [0x202f, 'NARROW NO-BREAK SPACE'],
  [0x205f, 'MEDIUM MATHEMATICAL SPACE'], [0x3000, 'IDEOGRAPHIC SPACE'],
  [0x2002, 'EN SPACE'], [0x2003, 'EM SPACE'], [0x2004, 'THREE-PER-EM SPACE'],
  [0x2005, 'FOUR-PER-EM SPACE'], [0x2006, 'SIX-PER-EM SPACE'],
  [0x2008, 'PUNCTUATION SPACE'],
]);
const VISIBLE = new Map([
  ['—', ['em dash', 'a full stop, colon or comma']],
  ['–', ['en dash', 'a hyphen, or "to" in a range']],
  ['‒', ['figure dash', 'a hyphen']],
  ['―', ['horizontal bar', 'a hyphen']],
  ['‘', ['left single quote', "'"]],
  ['’', ['right single quote', "'"]],
  ['“', ['left double quote', '"']],
  ['”', ['right double quote', '"']],
  ['…', ['ellipsis', '...']],
  ['•', ['bullet', 'a markdown list']],
  ['·', ['middot', '/ or a comma']],
  ['→', ['right arrow', '-> or "to"']],
  ['←', ['left arrow', '<-']],
  ['⇒', ['double arrow', '=>']],
  ['✓', ['check mark', 'an SVG icon']],
  ['✔', ['heavy check mark', 'an SVG icon']],
  ['─', ['box drawing', 'a hyphen']],
  ['′', ['prime', "'"]],
  ['″', ['double prime', '"']],
]);

/**
 * Named entities that render as a tell. `&quot;` and `&apos;` are fine and
 * deliberately absent: they produce straight ASCII marks.
 */
const ENTITY_TELLS = new Map([
  ['&ldquo;', 'left double quote (entity)'],
  ['&rdquo;', 'right double quote (entity)'],
  ['&lsquo;', 'left single quote (entity)'],
  ['&rsquo;', 'right single quote (entity)'],
  ['&mdash;', 'em dash (entity)'],
  ['&ndash;', 'en dash (entity)'],
  ['&hellip;', 'ellipsis (entity)'],
  ['&middot;', 'middot (entity)'],
  ['&bull;', 'bullet (entity)'],
  ['&rarr;', 'right arrow (entity)'],
  ['&larr;', 'left arrow (entity)'],
  ['&#8212;', 'em dash (numeric entity)'],
  ['&#8211;', 'en dash (numeric entity)'],
  ['&#8230;', 'ellipsis (numeric entity)'],
]);

const isInvisible = (cp) =>
  INVISIBLE.has(cp) || INVISIBLE_RANGES.some(([lo, hi]) => cp >= lo && cp <= hi);
const invisibleName = (cp) =>
  INVISIBLE.get(cp) ?? INVISIBLE_RANGES.find(([lo, hi]) => cp >= lo && cp <= hi)?.[2] ?? 'unknown';

function walk(target, acc = []) {
  let st;
  try { st = statSync(target); } catch { return acc; }
  if (st.isFile()) {
    const e = extname(target);
    if (SOURCE_EXT.has(e) || CONTENT_EXT.has(e)) acc.push(target);
    return acc;
  }
  for (const name of readdirSync(target)) {
    if (SKIP_DIRS.has(name)) continue;
    walk(join(target, name), acc);
  }
  return acc;
}

const isCommentLine = (line) => {
  const t = line.trim();
  // `{/*` covers JSX comments, which React evaluates to nothing and never
  // emits into the HTML, so their decorative rules are not shipped bytes.
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('{/*');
};

function scan(file) {
  const src = readFileSync(file, 'utf8');
  const isContent = CONTENT_EXT.has(extname(file));
  const invisibleHits = [];
  const visibleHits = [];

  // Block-comment state, so the CONTINUATION lines of a multi-line comment
  // are skipped too. Without it, the second and later lines of a `{/* ... */}`
  // block get scanned as if they were markup and report every em dash the
  // author wrote for other developers.
  let inBlock = false;

  src.split('\n').forEach((line, i) => {
    if (!isContent) {
      const opens = line.lastIndexOf('/*');
      const closes = line.lastIndexOf('*/');
      const wasInBlock = inBlock;
      if (opens > -1 && opens > closes) inBlock = true;
      else if (closes > -1 && closes > opens) inBlock = false;
      if (wasInBlock || inBlock || isCommentLine(line)) return;
    }
    // HTML entities render as the very characters we are stripping, but the
    // source is pure ASCII so a per-character scan walks straight past them.
    // `&ldquo;{quote}&rdquo;` in JSX ships curly quotes to the crawler.
    if (!isContent) {
      for (const [entity, name] of ENTITY_TELLS) {
        let from = 0;
        while (true) {
          const at = line.indexOf(entity, from);
          if (at === -1) break;
          visibleHits.push({ line: i + 1, ch: entity, info: [name, 'the ASCII entity'] });
          from = at + entity.length;
        }
      }
    }

    const chars = [...line];
    chars.forEach((ch, idx) => {
      const cp = ch.codePointAt(0);
      // U+FE0F directly after a pictograph is the emoji presentation
      // selector doing its actual job, not a hidden payload. A BARE one,
      // with no emoji in front of it, is the suspicious case, so only that
      // gets reported.
      if (cp === 0xfe0f) {
        const prevCp = chars[idx - 1]?.codePointAt(0) ?? 0;
        if (prevCp >= 0x2190 && prevCp !== 0xfe0f) return;
      }
      if (isInvisible(cp)) invisibleHits.push({ line: i + 1, cp, name: invisibleName(cp) });
      else if (ODD_SPACES.has(cp)) invisibleHits.push({ line: i + 1, cp, name: ODD_SPACES.get(cp) });
      else if (VISIBLE.has(ch)) visibleHits.push({ line: i + 1, ch, info: VISIBLE.get(ch) });
    });
  });
  return { src, invisibleHits, visibleHits };
}

function stripInvisible(src) {
  let out = '';
  for (const ch of src) {
    const cp = ch.codePointAt(0);
    if (isInvisible(cp)) continue;
    out += ODD_SPACES.has(cp) ? ' ' : ch;
  }
  return out;
}

const args = process.argv.slice(2);
const fixInvisible = args.includes('--fix-invisible');
const targets = args.filter((a) => !a.startsWith('--'));
const scanAll = args.includes('--all');
const files = (targets.length ? targets : scanAll ? ALL_TARGETS : INDEXED_SURFACE)
  .flatMap((t) => walk(t));

let invisibleTotal = 0, visibleTotal = 0, fixedFiles = 0;
const invisibleByName = new Map(), visibleByName = new Map();
const dirty = [];

for (const file of files) {
  const { src, invisibleHits, visibleHits } = scan(file);
  if (!invisibleHits.length && !visibleHits.length) continue;
  dirty.push({ file, invisibleHits, visibleHits });
  invisibleTotal += invisibleHits.length;
  visibleTotal += visibleHits.length;
  for (const h of invisibleHits) invisibleByName.set(h.name, (invisibleByName.get(h.name) ?? 0) + 1);
  for (const h of visibleHits) visibleByName.set(h.info[0], (visibleByName.get(h.info[0]) ?? 0) + 1);
  if (fixInvisible && invisibleHits.length) {
    writeFileSync(file, stripInvisible(src), 'utf8');
    fixedFiles++;
  }
}

const rel = (f) => relative(process.cwd(), f).replace(/\\/g, '/');

if (invisibleTotal) {
  console.log('\nINVISIBLE CHARACTERS  (watermark / hidden-payload vector)');
  for (const { file, invisibleHits } of dirty) {
    if (!invisibleHits.length) continue;
    console.log(`  ${rel(file)}`);
    for (const h of invisibleHits.slice(0, 6)) {
      console.log(`      L${h.line}  U+${h.cp.toString(16).toUpperCase().padStart(4, '0')}  ${h.name}`);
    }
    if (invisibleHits.length > 6) console.log(`      ... ${invisibleHits.length - 6} more`);
  }
  for (const [name, n] of [...invisibleByName].sort((a, b) => b[1] - a[1])) {
    console.log(`   ${String(n).padStart(5)}x  ${name}`);
  }
}

if (visibleTotal) {
  console.log('\nVISIBLE TELLS');
  for (const { file, visibleHits } of dirty) {
    if (!visibleHits.length) continue;
    const per = new Map();
    for (const h of visibleHits) per.set(h.info[0], (per.get(h.info[0]) ?? 0) + 1);
    const summary = [...per].map(([k, v]) => `${k} x${v}`).join(', ');
    console.log(`  ${String(visibleHits.length).padStart(4)}  ${rel(file)}  (${summary})`);
  }
  console.log('\n  replace with:');
  for (const [ch, [name, fix]] of VISIBLE) {
    if (visibleByName.has(name)) console.log(`     ${name.padEnd(20)} -> ${fix}`);
  }
}

console.log(
  `\nscanned ${files.length} files  |  invisible: ${invisibleTotal}  |  visible tells: ${visibleTotal}`
);
if (fixInvisible) console.log(`stripped invisible characters from ${fixedFiles} files`);

if (invisibleTotal || visibleTotal) {
  console.log('\nFAIL');
  process.exit(1);
}
console.log('PASS');
