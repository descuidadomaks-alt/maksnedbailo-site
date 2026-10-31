import { get, put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';

// Small JSON documents for BG Beach Homes (saved briefs, alert state).
// Production: the site's private Vercel Blob store. Local dev without a Blob token: files in .data/bgbh.
const LOCAL_DIR = path.join(process.cwd(), '.data', 'bgbh');
const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

async function readDoc<T>(name: string, fallback: T): Promise<{ value: T; etag?: string }> {
  if (!useBlob()) {
    try { return { value: JSON.parse(await fs.readFile(path.join(LOCAL_DIR, name), 'utf8')) }; }
    catch { return { value: fallback }; }
  }
  const r = await get(`bgbh/${name}`, { access: 'private', useCache: false });
  if (!r || r.statusCode !== 200) return { value: fallback };
  return { value: await new Response(r.stream).json(), etag: r.blob.etag };
}

async function writeDoc(name: string, value: unknown, etag?: string) {
  const body = JSON.stringify(value);
  if (!useBlob()) {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, name), body);
    return;
  }
  await put(`bgbh/${name}`, body, {
    access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true, ...(etag ? { ifMatch: etag } : {}),
  });
}

/** Read-modify-write with the blob's ETag, retried when two writes collide. */
export async function updateDoc<T>(name: string, fallback: T, change: (value: T) => T | Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { value, etag } = await readDoc(name, fallback);
    const next = await change(value);
    try { await writeDoc(name, next, etag); return next; }
    catch { /* someone else wrote first: read again */ }
  }
  throw new Error('store busy');
}

export async function readOnly<T>(name: string, fallback: T): Promise<T> {
  return (await readDoc(name, fallback)).value;
}

export const storeReady = () => useBlob() || process.env.NODE_ENV !== 'production';
