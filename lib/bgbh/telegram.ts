import crypto from 'crypto';

// Telegram Bot API for the BG Beach Homes bot (alerts, requests, Mini App).
// BGBH_TG_API can point at a local mock server for tests.
export const botToken = () => process.env.BGBH_TG_BOT_TOKEN || '';
export const botUsername = () => (process.env.BGBH_TG_BOT_USERNAME || '').replace(/^@/, '');
export const teamChat = () => process.env.BGBH_TG_CHAT_ID || '';
export const botReady = () => !!(botToken() && botUsername());

export async function tg<T = unknown>(method: string, body: Record<string, unknown>): Promise<{ ok: boolean; result?: T; description?: string; error_code?: number }> {
  const base = process.env.BGBH_TG_API || 'https://api.telegram.org';
  const r = await fetch(`${base}/bot${botToken()}/${method}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  return r.json().catch(() => ({ ok: false, description: `HTTP ${r.status}` }));
}

export type TgUser = { id: number; first_name?: string; last_name?: string; username?: string; language_code?: string };

/** Validates Telegram Mini App initData (https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app). */
export function verifyInitData(initData: string, maxAgeSec = 86400): TgUser | null {
  if (!initData || !botToken()) return null;
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return null;
  params.delete('hash');
  const check = Array.from(params.entries()).map(([k, v]) => `${k}=${v}`).sort().join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken()).digest();
  const calc = crypto.createHmac('sha256', secret).update(check).digest('hex');
  if (calc.length !== hash.length || !crypto.timingSafeEqual(Buffer.from(calc), Buffer.from(hash))) return null;
  const age = Date.now() / 1000 - Number(params.get('auth_date') || 0);
  if (!(age >= 0 && age < maxAgeSec)) return null;
  try { return JSON.parse(params.get('user') || 'null'); } catch { return null; }
}

export const userLabel = (u: Partial<TgUser>) =>
  [[u.first_name, u.last_name].filter(Boolean).join(' '), u.username ? '@' + u.username : '', u.id ? `id ${u.id}` : ''].filter(Boolean).join(' · ');

export const esc = (s: unknown) => String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string));
