/**
 * Captures 3 proof screenshots of the Ellie/Connecto widget at 380×520px
 * Run: node scripts/capture-proof.mjs
 */
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const playwrightPath = 'C:/Users/Asus/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright';
const { chromium } = require(playwrightPath);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/automations/ediblehealth');

const PAGE_URL = 'https://www.maksnedbailo.site/automations/ediblehealth';

const SHOTS = [
  {
    name: 'proof-1',
    userName: 'Sarah',
    question: 'where do I start with collagen? bovine or marine?',
  },
  {
    name: 'proof-2',
    userName: 'Claire',
    question: "I'm 52 and going through menopause. Where should I start?",
  },
  {
    name: 'proof-3',
    userName: 'Jo',
    question: "isn't collagen just a trend? I'm sceptical about whether it actually does anything",
  },
];

/** Wait for the textarea to be editable (not disabled/readonly/locked) */
async function waitForInputEditable(page, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ok = await page.evaluate(() => {
      const el = document.querySelector('textarea.connecto-input, input[placeholder*="message"], textarea[placeholder*="message"]');
      if (!el) return false;
      return !el.disabled && !el.readOnly && el.offsetParent !== null;
    });
    if (ok) return true;
    await page.waitForTimeout(500);
  }
  return false;
}

/** Wait for typing indicator to disappear (Ellie finished responding) */
async function waitForResponseDone(page, timeoutMs = 30000) {
  const start = Date.now();
  let stableCount = 0;

  while (Date.now() - start < timeoutMs) {
    // Check for typing indicator (the ... dots)
    const hasTyping = await page.evaluate(() => {
      // Look for elements that typically indicate "typing" state
      const dots = document.querySelector('[class*="typing"], [class*="loading"], [class*="dots"]');
      if (dots) return true;
      // Also check for SVG spinners or pulse animations
      const spinners = document.querySelectorAll('[class*="spin"], [class*="pulse"]');
      return spinners.length > 0;
    });

    if (!hasTyping) {
      stableCount++;
      if (stableCount >= 4) return; // Stable for 2s
    } else {
      stableCount = 0;
    }
    await page.waitForTimeout(500);
  }
}

async function getWidgetBounds(page) {
  return await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const candidates = Array.from(document.querySelectorAll('*')).filter(el => {
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      return (
        (s.position === 'fixed' || s.position === 'absolute') &&
        r.width > 200 &&
        r.height > 200 &&
        r.right >= vw - 60 &&
        r.top > 0 &&
        r.bottom < vh
      );
    }).map(el => {
      const r = el.getBoundingClientRect();
      const hasInput = !!el.querySelector('input, textarea');
      return {
        tag: el.tagName,
        hasInput,
        left: Math.round(r.left),
        top: Math.round(r.top),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    });
    const withInput = candidates.filter(c => c.hasInput);
    return withInput.length > 0 ? withInput[0] : (candidates[0] || null);
  });
}

async function captureShot(page, outPath) {
  const bounds = await getWidgetBounds(page);
  console.log('  Widget bounds:', bounds);
  const vp = page.viewportSize();
  const TARGET_W = 380;
  const TARGET_H = 520;

  let y = bounds
    ? Math.max(0, Math.min(Math.round(bounds.top + bounds.h / 2 - TARGET_H / 2), vp.height - TARGET_H))
    : vp.height - TARGET_H - 20;

  const clip = { x: vp.width - TARGET_W, y, width: TARGET_W, height: TARGET_H };
  console.log(`  Clip: x=${clip.x}, y=${clip.y}, w=${clip.width}, h=${clip.height}`);
  await page.screenshot({ path: outPath, clip, type: 'png' });
  console.log(`  Saved → ${path.basename(outPath)}`);
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const shot of SHOTS) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Capturing ${shot.name}`);

    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();

    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000); // let widget script inject

    // Click widget toggle button (bottom-right)
    const vp = page.viewportSize();
    await page.mouse.click(vp.width - 35, vp.height - 35);
    await page.waitForTimeout(2000);

    // Enter name
    let nameInput = page.locator('input[placeholder*="name"], input[placeholder*="Name"]').first();
    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill(shot.userName);
      await page.locator('button:has-text("Start chat"), button[type="submit"]').first().click();
      console.log(`  Started chat as ${shot.userName}`);

      // Wait for Ellie's greeting to finish before we type
      console.log('  Waiting for greeting to complete...');
      await page.waitForTimeout(5000); // Initial wait
      await waitForResponseDone(page, 20000);
      console.log('  Greeting done');
    }

    // Wait for textarea to become editable
    console.log('  Waiting for input to be editable...');
    const editable = await waitForInputEditable(page, 15000);
    if (!editable) {
      console.warn('  Input not editable after 15s, trying anyway');
    }

    // Type the question
    const msgInput = page.locator('textarea.connecto-input, input[placeholder*="message"], textarea[placeholder*="message"]').first();
    await msgInput.waitFor({ state: 'visible', timeout: 10000 });
    await msgInput.click(); // focus first
    await page.waitForTimeout(300);
    await msgInput.fill(shot.question);
    await page.keyboard.press('Enter');
    console.log('  Question sent');

    // Wait for Ellie to respond fully
    console.log('  Waiting for response...');
    await page.waitForTimeout(5000); // Let response start
    await waitForResponseDone(page, 30000);
    await page.waitForTimeout(2000); // Small buffer after response
    console.log('  Response received');

    // Capture 380×520 crop
    await captureShot(page, path.join(OUT_DIR, `${shot.name}.png`));

    await context.close();
  }

  await browser.close();
  console.log('\n✓ All screenshots captured');
}

run().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
