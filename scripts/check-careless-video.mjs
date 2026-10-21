import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
const manifest = JSON.parse(fs.readFileSync('public/careless/media.json', 'utf8'));
const cinema = manifest.cinema;
assert.equal(cinema.journey.length, 9);
assert.equal(cinema.hero.mode, 'loop');
assert.deepEqual(cinema.journey.map(c => c.sourceFile), ['2.mp4','2a.mp4','3.mp4','4.mp4','5.mp4','6.mp4','7.mp4','8.mp4','9.mp4']);
for (const clip of [cinema.hero, ...cinema.journey]) {
  for (const key of ['src','poster', ...(clip.mode === 'scroll' ? ['endPoster'] : [])]) {
    assert.ok(clip[key].startsWith('/careless/'));
    assert.ok(fs.statSync('public' + clip[key]).size > 1000);
  }
  assert.ok(clip.duration > 0);
  if (clip.mode === 'scroll') assert.ok(clip.inPoint >= 0 && clip.outPoint > clip.inPoint && clip.outPoint < clip.duration);
}
// Exercise the actual timeline with boundary and traversal invariants.
const module = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/new/_cinematic/cinema.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, { exports: module.exports, module, require: () => manifest });
const { locateClip, readCinema, filmAt, cueAt } = module.exports;
assert.equal(locateClip(-1, cinema.journey).index, 0);
assert.equal(locateClip(2, cinema.journey).index, 8);
assert.equal(locateClip(1, cinema.journey).fraction, 1);
let last = -1;
for (let i = 0; i <= 1000; i++) { const at = locateClip(i / 1000, cinema.journey); const time = at.index + at.fraction; assert.ok(time >= last); last = time; }
assert.equal(readCinema({ ...cinema, hero: { ...cinema.hero, src: 'https://untrusted.example/movie.mp4' } }), null);
assert.equal(readCinema({ ...cinema, journey: [{ ...cinema.journey[0], src: '/careless/../secret' }] }), null);
assert.ok(fs.statSync('public' + cinema.master.src).size > 1000000);
assert.equal(cinema.master.shots.length, 9);
assert.equal(cinema.master.shots[1].id, 'clip-2a');
assert.ok(cinema.master.duration > 45 && cinema.master.duration < 46);
assert.ok(cinema.master.shots.reduce((sum, shot) => sum + shot.scrollLength, 0) >= 2400);
let previousTime = -1;
for (let i = 0; i <= 2000; i++) { const frame = filmAt(i / 2000, cinema.master.shots); assert.ok(frame.time >= previousTime); previousTime = frame.time; }
assert.ok(Math.abs(filmAt(1, cinema.master.shots).time - cinema.master.duration) < .05);
for (const cue of cinema.cues) {
 assert.equal(cueAt(cue.start, cue).opacity, 0);
 assert.equal(cueAt(cue.end, cue).opacity, 0);
 assert.equal(cueAt((cue.start + cue.end) / 2, cue).opacity, 1);
 if (cue.actions) assert.ok(['scout','headquarters'].includes(cue.id));
}
const broken = structuredClone(cinema); broken.master.shots[1].start += 1;
assert.equal(readCinema(broken), null);
console.log('PASS ten source mappings, continuous master, 2a placement, cue fade windows, monotonic reversible film clock, safe manifest and assets');
