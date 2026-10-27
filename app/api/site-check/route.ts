import { NextRequest, NextResponse } from 'next/server';
import { lookup } from 'node:dns';
import { isIP } from 'node:net';
import http from 'node:http';
import https from 'node:https';
import zlib from 'node:zlib';

// care_less "5-second test": fetches one public homepage and checks what a stranger meets first.
// Only public http(s) hosts are reached: every connection (redirects included) resolves through `safeLookup`,
// which refuses private, loopback and link-local addresses, so DNS tricks can't point it inside a network.
export const runtime = 'nodejs';
const MAX_BYTES = 1_500_000, TIMEOUT = 8000, MAX_REDIRECTS = 4;
const attempts = new Map<string, { count: number; until: number }>();
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

function privateAddress(ip: string) {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split('.').map(Number);
    return a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 198 && (b === 18 || b === 19));
  }
  const v = ip.toLowerCase();
  if (v.startsWith('::ffff:')) return privateAddress(v.slice(7));
  return v === '::' || v === '::1' || /^f[cd]/.test(v) || /^fe[89ab]/.test(v) || v.startsWith('ff');
}

const safeLookup: typeof lookup = ((host: string, options: object, callback: (err: Error | null, address?: unknown, family?: number) => void) => {
  lookup(host, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err);
    const list = addresses as { address: string; family: number }[];
    if (!list.length || list.some(a => privateAddress(a.address))) return callback(new Error('blocked address'));
    if ((options as { all?: boolean }).all) return callback(null, list);
    callback(null, list[0].address, list[0].family);
  });
}) as typeof lookup;

function get(url: URL): Promise<{ status: number; location?: string; body: string; type: string }> {
  return new Promise((resolve, reject) => {
    const req = (url.protocol === 'https:' ? https : http).request(url, {
      method: 'GET', lookup: safeLookup, timeout: TIMEOUT,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CareLessCheck/1.0; +https://maksnedbailo.site)', Accept: 'text/html,application/xhtml+xml', 'Accept-Encoding': 'gzip, deflate, br', 'Accept-Language': 'en,es;q=0.8' },
    }, res => {
      const status = res.statusCode || 0, type = String(res.headers['content-type'] || '');
      if (status >= 300 && status < 400) { res.resume(); return resolve({ status, location: res.headers.location, body: '', type }); }
      const enc = String(res.headers['content-encoding'] || '');
      const stream = enc.includes('br') ? res.pipe(zlib.createBrotliDecompress()) : enc.includes('gzip') ? res.pipe(zlib.createGunzip()) : enc.includes('deflate') ? res.pipe(zlib.createInflate()) : res;
      const chunks: Buffer[] = []; let size = 0;
      stream.on('data', (c: Buffer) => { size += c.length; if (size > MAX_BYTES) { req.destroy(); stream.destroy(); return resolve({ status, body: Buffer.concat(chunks).toString('utf8'), type }); } chunks.push(c); });
      stream.on('end', () => resolve({ status, body: Buffer.concat(chunks).toString('utf8'), type }));
      stream.on('error', reject);
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}

const text = (html: string) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const meta = (html: string, name: string) => {
  // Attributes may be quoted or not (minified HTML).
  const tag = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']?${name}(?=["'\\s/>])[^>]*>`, 'i'))?.[0];
  const m = tag?.match(/content=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  return (m?.[1] ?? m?.[2] ?? m?.[3] ?? '').trim();
};

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply({ ok: false }, 403);
  let raw: unknown;
  try { raw = (await request.json())?.url; } catch { return reply({ ok: false }, 400); }
  if (typeof raw !== 'string' || raw.length > 300) return reply({ ok: false, error: 'url' }, 400);
  const now = Date.now(), ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  attempts.forEach((item, id) => { if (item.until < now) attempts.delete(id); });
  const bucket = attempts.get(ip) || { count: 0, until: now + 600000 };
  if (++bucket.count > 10) return reply({ ok: false, error: 'busy' }, 429);
  attempts.set(ip, bucket);

  let url: URL;
  try { url = new URL(/^https?:\/\//i.test(raw.trim()) ? raw.trim() : 'https://' + raw.trim()); } catch { return reply({ ok: false, error: 'url' }, 400); }
  const badUrl = (u: URL) => !/^https?:$/.test(u.protocol) || !!u.username || !!u.password || (u.port && !['80', '443'].includes(u.port)) || !u.hostname.includes('.') || isIP(u.hostname.replace(/^\[|\]$/g, '')) > 0;
  if (badUrl(url)) return reply({ ok: false, error: 'url' }, 400);

  const started = Date.now();
  let page;
  try {
    for (let hop = 0; ; hop++) {
      page = await get(url);
      if (!page.location) break;
      if (hop >= MAX_REDIRECTS) return reply({ ok: false, error: 'unreachable' }, 422);
      url = new URL(page.location, url);
      if (badUrl(url)) return reply({ ok: false, error: 'unreachable' }, 422);
    }
  } catch { return reply({ ok: false, error: 'unreachable' }, 422); }
  const ms = Date.now() - started;
  if (page.status >= 400 || !/html/i.test(page.type)) return reply({ ok: false, error: 'unreachable' }, 422);

  const html = page.body;
  const title = text(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').slice(0, 140);
  const h1s = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map(m => text(m[1])).filter(Boolean);
  const h1 = (h1s[0] || '').slice(0, 160), h1Words = h1.split(/\s+/).filter(Boolean).length;
  const description = meta(html, 'description');
  const links = Array.from(html.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/gi)).map(m => text(m[2]).toLowerCase()).filter(Boolean);
  const cta = /\b(book|call|contact|get (a )?quote|quote|enquire|inquire|order|buy|shop|reserve|schedule|start|get started|talk|reserva|llama|contacta|contacto|presupuesto|pide|compra|empieza|habla)\b/;

  const checks = [
    { id: 'https', ok: url.protocol === 'https:' },
    { id: 'speed', ok: ms < 1500, detail: ms },
    { id: 'title', ok: title.length >= 10 && title.length <= 70, detail: title },
    { id: 'headline', ok: h1Words >= 2 && h1Words <= 14, detail: h1 },
    { id: 'description', ok: description.length >= 50 && description.length <= 170 },
    { id: 'mobile', ok: !!meta(html, 'viewport') },
    { id: 'contact', ok: /href=["']?(tel:|mailto:|https?:\/\/(wa\.me|api\.whatsapp\.com))/i.test(html) || /<form\b/i.test(html) },
    { id: 'action', ok: links.some(l => l.length < 40 && cta.test(l)) },
    { id: 'preview', ok: !!meta(html, 'og:image') },
    { id: 'structured', ok: /application\/ld\+json/i.test(html) },
  ];
  return reply({ ok: true, url: url.href, ms, score: checks.filter(c => c.ok).length, total: checks.length, checks });
}
