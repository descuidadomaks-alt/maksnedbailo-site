export type DecodedFrame = { image: CanvasImageSource; width: number; height: number; close(): void };
export type FrameStoreOptions = {
 count: number; maxFrames: number; concurrency: number; ahead: number; behind: number;
 load(index: number, signal: AbortSignal): Promise<DecodedFrame>;
 present(index: number, frame: DecodedFrame): void;
 failure(index: number): void;
};
// Bound decoded memory, prioritize the latest target and never present late requests.
export class FrameStore {
 readonly cache = new Map<number, DecodedFrame>();
 readonly pending = new Map<number, AbortController>();
 private failures = new Map<number, number>();
 private target = 0;
 private direction = 1;
 private disposed = false;
 constructor(private options: FrameStoreOptions) {}
 select(index: number) {
  if (this.disposed) return;
  const next = Math.max(0, Math.min(this.options.count - 1, Math.round(index)));
  if (next !== this.target) this.direction = next > this.target ? 1 : -1;
  this.target = next;
  for (const [key, controller] of Array.from(this.pending)) if (Math.abs(key - next) > this.options.ahead + this.options.behind) { controller.abort(); this.pending.delete(key); }
  const frame = this.cache.get(next);
  if (frame) this.options.present(next, frame);
  this.evict(); this.pump();
 }
 private candidates() {
  const result = [this.target];
  for (let n = 1; n <= this.options.ahead; n++) {
   result.push(this.target + n * this.direction);
   if (n <= this.options.behind) result.push(this.target - n * this.direction);
  }
  return result.filter(i => i >= 0 && i < this.options.count);
 }
 private evict() {
  const ranked = Array.from(this.cache.keys()).sort((a,b) => Math.abs(b-this.target)-Math.abs(a-this.target));
  while (this.cache.size > this.options.maxFrames) { const key = ranked.shift()!; this.cache.get(key)?.close(); this.cache.delete(key); }
 }
 private pump() {
  if (this.disposed) return;
  for (const index of this.candidates()) {
   if (this.pending.size >= this.options.concurrency) break;
   if (this.cache.has(index) || this.pending.has(index) || Date.now() - (this.failures.get(index) || 0) < 2500) continue;
   const controller = new AbortController(); this.pending.set(index, controller);
   this.options.load(index,controller.signal).then(frame => {
    if (this.disposed || controller.signal.aborted) { frame.close(); return; }
    this.cache.set(index,frame); this.evict();
    if (index === this.target) this.options.present(index,frame);
   }).catch(() => {
    if (!this.disposed && !controller.signal.aborted) { this.failures.set(index,Date.now()); if (index === this.target) this.options.failure(index); }
   }).finally(() => { if (this.pending.get(index) === controller) this.pending.delete(index); this.pump(); });
  }
 }
 dispose() {
  this.disposed = true;
  for (const controller of Array.from(this.pending.values())) controller.abort();
  for (const frame of Array.from(this.cache.values())) frame.close();
  this.pending.clear(); this.cache.clear();
 }
}
export const frameIndex = (time: number, fps: number, count: number) => Math.max(0,Math.min(count-1,Math.round(time*fps)));
export const frameURL = (pattern: string, index: number) => pattern.replace('{frame}', String(index).padStart(5,'0'));
