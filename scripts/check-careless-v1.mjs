import { readFileSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const baseline = '653f2c321cd82e2ac2af27b6494cb975d0b44d2c';
execFileSync('git',['diff','--exit-code',baseline,'--','app/page.tsx','app/new/_v2','app/new/components','app/new/lib','app/new/sections','app/globals.css','next.config.js'],{stdio:'pipe'});
console.log('PASS homepage source tree, brand styles, unrelated redirect configuration unchanged');
const manifest=JSON.parse(readFileSync('public/careless/media.json','utf8'));
assert.equal(manifest.scenes.length,8);
for(const scene of manifest.scenes){ assert.ok(scene.image.startsWith('/careless/')); assert.ok(existsSync('public'+scene.image)); if(scene.mode==='sequence'){assert.ok(scene.frames.length<=180);for(const frame of scene.frames)assert.ok(existsSync('public'+frame));}}
console.log('PASS all eight manifest scenes reference real local fallback assets');
assert.ok(statSync('public/careless/images/roman-preview.webp').size<100000);
const page=readFileSync('app/new/page.tsx','utf8');assert.ok(!page.includes('permanentRedirect'));
const config=readFileSync('app/new/_cinematic/config.ts','utf8');assert.ok(config.includes('publicApproved: false'));assert.ok(config.includes('https://wa.me/34641935207'));assert.ok(config.includes('https://zcal.co/carelessmaks/ai-map'));
console.log('PASS no /new redirect, Scout gate closed, verified conversion destinations, optimized work image');
