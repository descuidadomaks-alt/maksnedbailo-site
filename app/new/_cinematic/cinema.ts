import manifest from "../../../public/careless/media.json";

export type AmbientClip = { id: string; mode: "loop"; src: string; poster: string; duration: number; position: string; mobilePosition: string };
export type ScrollClip = { id: string; copySceneId: string; sourceFile: string; mode: "scroll"; src: string; poster: string; endPoster: string; duration: number; inPoint: number; outPoint: number; scrollLength: number; position: string; mobilePosition: string; transition: "cut" | "dissolve"; transitionDuration: number; fps: number };
export type FilmShot = { id: string; copySceneId: string; sourceFile: string; start: number; end: number; scrollLength: number; poster: string };
export type FilmCue = { id: string; scene: string; start: number; end: number; fade: number; actions?: boolean };
export type FrameVariant = { id: string; width: number; height: number; pattern: string; bytes: number; firstSecondBytes: number; format?: "avif" | "webp"; fallbackPattern?: string };
export type FrameSequence = { fps: number; count: number; variants: FrameVariant[] };
export type Film = { id: string; mode: "scroll"; src: string; poster: string; endPoster: string; duration: number; fps: number; position: string; mobilePosition: string; settle: boolean; shots: FilmShot[]; sequence?: FrameSequence };
export type Cinema = { version: number; introScroll: number; hero: AmbientClip; journey: ScrollClip[]; master: Film; cues: FilmCue[] };

const local = (value: unknown): value is string => typeof value === "string" && value.startsWith("/careless/") && !value.includes("..");
const number = (value: unknown, fallback: number, min: number, max: number) => typeof value === "number" && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;

export function readCinema(value: unknown): Cinema | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Partial<Cinema>;
  if (!input.hero || !local(input.hero.src) || !local(input.hero.poster) || !Array.isArray(input.journey) || !input.journey.length) return null;
  const journey: ScrollClip[] = [];
  for (const item of input.journey.slice(0, 12)) {
    if (!item || !local(item.src) || !local(item.poster) || !local(item.endPoster)) return null;
    const duration = number(item.duration, 5, .1, 60);
    const inPoint = number(item.inPoint, 0, 0, duration - .05);
    journey.push({ ...item, id: String(item.id), copySceneId: String(item.copySceneId), mode: "scroll", duration, inPoint, outPoint: number(item.outPoint, duration - .05, inPoint + .01, duration - .01), scrollLength: number(item.scrollLength, 250, 20, 600), fps: number(item.fps, 24, 1, 60), transition: item.transition === "cut" ? "cut" : "dissolve", transitionDuration: number(item.transitionDuration, .18, 0, .6), position: typeof item.position === "string" ? item.position : "center", mobilePosition: typeof item.mobilePosition === "string" ? item.mobilePosition : "center" });
  }
  const film = input.master;
  if (!film || !local(film.src) || !local(film.poster) || !local(film.endPoster) || !Array.isArray(film.shots) || film.shots.length !== journey.length) return null;
  const duration = number(film.duration, 45.5, 1, 300);
  let previous = 0;
  const shots: FilmShot[] = [];
  for (const item of film.shots) {
    if (!item || !local(item.poster) || !Number.isFinite(item.start) || !Number.isFinite(item.end) || Math.abs(item.start - previous) > .05 || item.end <= item.start || item.end > duration + .05) return null;
    shots.push({ ...item, scrollLength: number(item.scrollLength, 250, 20, 600) }); previous = item.end;
  }
  if (Math.abs(previous - duration) > .05 || !Array.isArray(input.cues)) return null;
  const cues = input.cues.filter(cue => cue && typeof cue.id === "string" && typeof cue.scene === "string" && Number.isFinite(cue.start) && Number.isFinite(cue.end) && cue.end > cue.start && cue.start >= 0 && cue.start < duration).slice(0, 16).map(cue => ({ ...cue, fade: number(cue.fade, .65, .1, 2) }));
  const sequence = film.sequence;
  if (!sequence) return null;
  if (sequence && (!Number.isInteger(sequence.count) || sequence.count < 2 || sequence.count > 18000 || !Number.isFinite(sequence.fps) || sequence.fps < 1 || sequence.fps > 60 || Math.abs(sequence.count / sequence.fps - duration) > .1 || !Array.isArray(sequence.variants) || !sequence.variants.length || sequence.variants.some(v => !local(v.pattern) || !v.pattern.includes("{frame}") || (!!v.fallbackPattern && !local(v.fallbackPattern)) || !Number.isFinite(v.width) || !Number.isFinite(v.height) || v.width < 100 || v.height < 100 || v.width > 3840 || v.height > 3840))) return null;
  return { version: sequence ? 3 : 2, introScroll: number(input.introScroll, 85, 20, 100), hero: { ...input.hero, mode: "loop" }, journey, master: { ...film, duration, fps: number(film.fps, 24, 1, 60), settle: film.settle === true, shots }, cues };
}

export const initialCinema = readCinema(manifest.cinema)!;
export const clampProgress = (value: number) => Math.max(0, Math.min(1, value));

export function cueAt(time: number, cue: FilmCue) {
  const enter = clampProgress((time - cue.start) / cue.fade);
  const exit = clampProgress((cue.end - time) / cue.fade);
  return { opacity: Math.min(enter, exit), y: (1 - enter) * 20 - (1 - exit) * 14 };
}

export function filmAt(progress: number, shots: FilmShot[]) {
  const at = locateClip(progress, shots);
  const shot = shots[at.index];
  return { ...at, time: shot.start + (shot.end - shot.start) * at.fraction };
}

export function locateClip(progress: number, clips: { scrollLength: number }[]) {
  const total = clips.reduce((sum, clip) => sum + clip.scrollLength, 0);
  const distance = clampProgress(progress) * total;
  let before = 0;
  for (let index = 0; index < clips.length; index++) {
    const clip = clips[index];
    if (distance < before + clip.scrollLength || index === clips.length - 1) return { index, fraction: clampProgress((distance - before) / clip.scrollLength), before, total };
    before += clip.scrollLength;
  }
  return { index: 0, fraction: 0, before: 0, total };
}
