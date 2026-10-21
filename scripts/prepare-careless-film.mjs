import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
const [inputFolder, release = `film-${Date.now()}`] = process.argv.slice(2);
if (!inputFolder || !/^[a-z0-9-]+$/i.test(release)) throw Error('Usage: node scripts/prepare-careless-film.mjs source-folder unique-release');
const sourceRoot = path.resolve(inputFolder);
const file = path.resolve('public/careless/media.json');
const media = JSON.parse(fs.readFileSync(file, 'utf8'));
const journey = media.cinema.journey;
const folder = path.resolve('public/careless/video', release);
fs.mkdirSync(folder);
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'careless-film-'));
const run = (tool, args) => { const r = spawnSync(tool, args, { encoding: 'utf8', windowsHide: true }); if (r.status !== 0) throw Error(r.stderr || `${tool} unavailable`); return r.stdout; };
const probe = source => JSON.parse(run('ffprobe', ['-v','error','-show_format','-show_streams','-of','json',source]));
const shots = [];
const inspected = [];
let time = 0;
for (const [index, clip] of journey.entries()) {
  if (path.basename(clip.sourceFile) !== clip.sourceFile) throw Error('Source names must be basenames');
  const source = path.join(sourceRoot, clip.sourceFile);
  const data = probe(source);
  const v = data.streams.find(s => s.codec_type === 'video');
  const segment = path.join(temp, `${index}.mp4`);
  run('ffmpeg', ['-hide_banner','-loglevel','error','-ss',String(clip.inPoint),'-i',source,'-t',String(clip.outPoint - clip.inPoint),'-an','-vf','scale=624:624:force_original_aspect_ratio=increase,crop=624:624,setsar=1,fps=24','-c:v','libx264','-preset','fast','-crf','24','-g','1','-keyint_min','1','-bf','0','-pix_fmt','yuv420p','-video_track_timescale','12288','-threads','2','-n',segment]);
  const duration = Number(probe(segment).format.duration);
  shots.push({ id: clip.id, copySceneId: clip.copySceneId, sourceFile: clip.sourceFile, start: time, end: time + duration, scrollLength: clip.scrollLength, poster: clip.poster });
  inspected.push({ sourceFile: clip.sourceFile, sha256: crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'), bytes: fs.statSync(source).size, sourceDuration: Number(data.format.duration), width: v.width, height: v.height, fps: v.avg_frame_rate, audio: data.streams.some(s => s.codec_type === 'audio'), masterStart: time, masterEnd: time + duration });
  time += duration;
  if (clip.id === 'clip-2a') {
    fs.copyFileSync(segment, path.join(folder, '2a.mp4'));
    for (const [suffix, at] of [['first',0],['last',duration - .06]]) run('ffmpeg', ['-hide_banner','-loglevel','error','-ss',String(at),'-i',segment,'-frames:v','1','-c:v','libwebp','-quality','82','-n',path.join(folder, `2a-${suffix}.webp`)]);
    Object.assign(clip, { src: `/careless/video/${release}/2a.mp4`, poster: `/careless/video/${release}/2a-first.webp`, endPoster: `/careless/video/${release}/2a-last.webp` });
    shots[shots.length - 1].poster = clip.poster;
  }
  console.log(`Encoded ${clip.sourceFile}, film ${shots.at(-1).start.toFixed(3)}–${time.toFixed(3)} s`);
}
const concat = path.join(temp, 'concat.txt');
fs.writeFileSync(concat, shots.map((_, index) => `file '${path.join(temp, `${index}.mp4`).replaceAll('\\','/')}'`).join('\n'));
const output = path.join(folder, 'journey.mp4');
run('ffmpeg', ['-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',concat,'-c','copy','-movflags','+faststart','-n',output]);
const duration = Number(probe(output).format.duration);
for (const [suffix, at] of [['first',0],['last',duration - .06]]) run('ffmpeg', ['-hide_banner','-loglevel','error','-ss',String(at),'-i',output,'-frames:v','1','-c:v','libwebp','-quality','82','-n',path.join(folder, `film-${suffix}.webp`)]);
const url = `/careless/video/${release}`;
media.cinema.master = { id: 'film', mode: 'scroll', src: `${url}/journey.mp4`, poster: `${url}/film-first.webp`, endPoster: `${url}/film-last.webp`, duration, fps: 24, position: 'center 45%', mobilePosition: '30% center', settle: false, shots };
// Cues are film-time windows, independent of source-file boundaries.
const shot = id => shots.find(s => s.id === id);
media.cinema.cues = [
  { id: 'surface', scene: 'pool', start: .65, end: shot('clip-2').end - .25 },
  { id: 'coast', scene: 'coast', start: shot('clip-2a').start + .7, end: shot('clip-2a').end - .25 },
  { id: 'discovery', scene: 'discovery', start: shot('clip-3').start + 1.2, end: shot('clip-4').start + 1 },
  { id: 'system', scene: 'tunnel', start: shot('clip-5').start + 1.2, end: shot('clip-6').end - .6 },
  { id: 'colony', scene: 'colony', start: shot('clip-7').start + .55, end: shot('clip-7').end - .35 },
  { id: 'scout', scene: 'scout', start: shot('clip-8').start + 1, end: shot('clip-9').start + .55, actions: true },
  { id: 'headquarters', scene: 'hq', start: shot('clip-9').start + 2, end: duration + .5, actions: true }
].map(cue => ({ ...cue, fade: .65 }));
media.cinema.version = 2;
fs.writeFileSync(file, JSON.stringify(media, null, 2) + '\n');
fs.writeFileSync('docs/CARELESS-FILM-INSPECTION.json', JSON.stringify({ release, duration, bytes: fs.statSync(output).size, width: 624, height: 624, fps: 24, keyframeInterval: 1, sourceFilesUntouched: true, order: inspected, addedTransition: '2a.mp4: camera moves from pool edge along rocky coast toward the ground; inspected at 0, 1.25, 2.54, 3.79 and 5.04 seconds.' }, null, 2) + '\n');
console.log(`Master ready: ${duration.toFixed(3)} s / ${(fs.statSync(output).size / 1e6).toFixed(2)} MB. Previous release and original sources retained.`);
