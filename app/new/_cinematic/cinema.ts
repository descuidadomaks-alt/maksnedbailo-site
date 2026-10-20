import manifest from "../../../public/careless/media.json";

export type AmbientClip = { id: string; mode: "loop"; src: string; poster: string; duration: number; position: string; mobilePosition: string };
export type ScrollClip = { id: string; copySceneId: string; sourceFile: string; mode: "scroll"; src: string; poster: string; endPoster: string; duration: number; inPoint: number; outPoint: number; scrollLength: number; position: string; mobilePosition: string; transition: "cut" | "dissolve"; transitionDuration: number; fps: number };
export type Cinema = { version: number; introScroll: number; hero: AmbientClip; journey: ScrollClip[] };

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
    journey.push({ ...item, id: String(item.id), copySceneId: String(item.copySceneId), mode: "scroll", duration, inPoint, outPoint: number(item.outPoint, duration - .05, inPoint + .01, duration - .01), scrollLength: number(item.scrollLength, 58, 20, 160), fps: number(item.fps, 24, 1, 60), transition: item.transition === "cut" ? "cut" : "dissolve", transitionDuration: number(item.transitionDuration, .18, 0, .6), position: typeof item.position === "string" ? item.position : "center", mobilePosition: typeof item.mobilePosition === "string" ? item.mobilePosition : "center" });
  }
  return { version: 1, introScroll: number(input.introScroll, 70, 20, 100), hero: { ...input.hero, mode: "loop" }, journey };
}

export const initialCinema = readCinema(manifest.cinema)!;
export const clampProgress = (value: number) => Math.max(0, Math.min(1, value));

export function locateClip(progress: number, clips: ScrollClip[]) {
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
