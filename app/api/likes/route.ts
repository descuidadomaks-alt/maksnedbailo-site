import { NextRequest, NextResponse } from 'next/server';
import { get, put } from '@vercel/blob';

// care_less like button: one real count in the site's private Blob store, no seeding.
// Writes use the blob's ETag (ifMatch), so two likes at the same moment both count.
export const runtime = 'nodejs';
const PATH = 'careless/likes.json';
const recent = new Map<string, number>();
const reply = (body: object, status = 200, cache = 'no-store') => NextResponse.json(body, { status, headers: { 'Cache-Control': cache } });

async function read(): Promise<{ count: number; etag?: string }> {
  const r = await get(PATH, { access: 'private', useCache: false });
  if (!r || r.statusCode !== 200) return { count: 0 };
  const value = await new Response(r.stream).json();
  return { count: Number(value?.count) || 0, etag: r.blob.etag };
}

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return reply({ count: null });
  try { return reply({ count: (await read()).count }, 200, 'public, s-maxage=60, stale-while-revalidate=600'); }
  catch { return reply({ count: null }); }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply({ ok: false }, 403);
  if (!process.env.BLOB_READ_WRITE_TOKEN) return reply({ ok: false }, 503);
  const now = Date.now(), ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  recent.forEach((at, id) => { if (at < now - 86400000) recent.delete(id); });
  if (recent.has(ip)) return reply({ ok: true, count: null });
  recent.set(ip, now);
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const { count, etag } = await read();
      await put(PATH, JSON.stringify({ count: count + 1, updatedAt: new Date(now).toISOString() }), {
        access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: !!etag, ...(etag ? { ifMatch: etag } : {}),
      });
      return reply({ ok: true, count: count + 1 });
    } catch { /* someone else liked at the same moment: read again */ }
  }
  recent.delete(ip);
  return reply({ ok: false }, 503);
}
