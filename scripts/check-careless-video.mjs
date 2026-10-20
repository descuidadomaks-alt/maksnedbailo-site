import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
const manifest = JSON.parse(fs.readFileSync('public/careless/media.json', 'utf8'));
const cinema = manifest.cinema;
assert.equal(cinema.journey.length, 8);
assert.equal(cinema.hero.mode, 'loop');
assert.deepEqual(cinema.journey.map(c => c.sourceFile), ['2.mp4','3.mp4','4.mp4','5.mp4','6.mp4','7.mp4','8.mp4','9.mp4']);
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
const { locateClip, readCinema } = module.exports;
assert.equal(locateClip(-1, cinema.journey).index, 0);
assert.equal(locateClip(2, cinema.journey).index, 7);
assert.equal(locateClip(1, cinema.journey).fraction, 1);
let last = -1;
for (let i = 0; i <= 1000; i++) { const at = locateClip(i / 1000, cinema.journey); const time = at.index + at.fraction; assert.ok(time >= last); last = time; }
assert.equal(readCinema({ ...cinema, hero: { ...cinema.hero, src: 'https://untrusted.example/movie.mp4' } }), null);
assert.equal(readCinema({ ...cinema, journey: [{ ...cinema.journey[0], src: '/careless/../secret' }] }), null);
console.log('PASS all nine files/posters, trim bounds, reversible weighted timeline and manifest URL validation');
