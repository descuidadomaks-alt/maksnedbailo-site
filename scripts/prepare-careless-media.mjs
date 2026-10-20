import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
// Run from the repository. The input must be a founder-approved clip.
const [scene, input, fpsInput = '12'] = process.argv.slice(2);
const ids = ['pool','coast','discovery','entrance','tunnel','colony','scout','hq'];
const fps = Number(fpsInput);
if (!ids.includes(scene) || !input || !existsSync(input) || !Number.isInteger(fps) || fps < 1 || fps > 24) {
 console.error('Usage: node scripts/prepare-careless-media.mjs <scene-id> <approved-video-path> [fps: 1..24, default 12]'); process.exit(1);
}
const manifestPath = resolve('public/careless/media.json');
const manifest = JSON.parse(readFileSync(manifestPath,'utf8'));
const entry = manifest.scenes.find(s => s.id === scene);
if (!entry) throw Error('Scene absent from manifest');
// A new folder keeps previous frames intact and makes rollback a manifest edit.
const revision = Date.now().toString(36);
const directory = resolve('public/careless/images/sequences', scene, revision);
mkdirSync(directory,{recursive:true});
const result = spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-i',resolve(input),'-an','-vf',`fps=${fps},scale=1280:-2:force_original_aspect_ratio=decrease`,'-frames:v','180','-c:v','libwebp','-quality','78',join(directory,'%04d.webp')],{stdio:'inherit',shell:false});
if (result.status !== 0) throw Error('FFmpeg extraction failed; manifest was not changed.');
const files = readdirSync(directory).filter(f => /^\d{4}\.webp$/.test(f)).sort();
if (!files.length) throw Error('No frames; manifest was not changed.');
entry.frames = files.map(f => `/careless/images/sequences/${scene}/${revision}/${f}`);
entry.mode = 'sequence';
writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(`${scene}: ${files.length} frames. Poster preserved. Review in browser, then deploy manifest and frames together. No video seeking required.`);
