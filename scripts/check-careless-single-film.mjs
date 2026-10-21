import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
const module={exports:{}};
let now=0,id=0;
const tasks=new Map();
const later=(fn,ms)=>{const key=++id;tasks.set(key,{fn,at:now+ms});return key;};
const advance=ms=>{const end=now+ms;for(let n=0;n<10000;n++){const next=[...tasks].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;tasks.delete(next[0]);now=next[1].at;next[1].fn();}now=end;};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/new/_cinematic/filmController.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:module.exports,module,performance:{now:()=>now},setTimeout:later,clearTimeout:id=>tasks.delete(id),requestAnimationFrame:fn=>later(fn,16),cancelAnimationFrame:id=>tasks.delete(id),document:{hidden:false,addEventListener(){},removeEventListener(){}}});
class Video extends EventTarget {
 readyState=0;seeking=false;duration=45.866667;dataset={};time=0;requested=[];plays=0;
 get currentTime(){return this.time;}
 set currentTime(value){this.time=value;this.seeking=true;this.requested.push(value);}
 pause(){} play(){this.plays++;return Promise.resolve();} load(){}
 emit(name){this.dispatchEvent(new Event(name));}
 decoded(){this.readyState=2;this.seeking=false;this.emit('seeked');}
}
const create=()=>{const video=new Video(),shown=[],states=[];const controller=module.exports.controlFilm(video,45.866667,30,{presented:t=>shown.push(t),waiting:()=>states.push('waiting'),failed:()=>states.push('failed')});return{video,shown,states,controller};};
{
 const {video,shown,states,controller}=create();
 video.readyState=1;video.emit('loadedmetadata');advance(16);
 assert.ok(video.plays>0,'metadata-only iOS path must prime muted playback');
 video.readyState=2;video.seeking=false;video.emit('loadeddata');advance(20);
 assert.deepEqual(shown,[0],'initial frame0 must present without a time change');
 advance(9000);assert.ok(!states.includes('failed'),'startup deadline must be cancelled after first decoded frame');
 controller.seek(.9);advance(16);controller.seek(.6);controller.seek(.4);controller.seek(0);
 video.decoded();advance(16);
 assert.deepEqual(shown,[0],'late HQ decode must not present after reset');
 assert.equal(video.requested.at(-1),0);video.decoded();advance(16);
 assert.equal(shown.at(-1),0);
 controller.seek(.7);advance(16);video.decoded();advance(16);const high=shown.at(-1);
 controller.seek(.2);advance(16);video.decoded();advance(16);assert.ok(shown.at(-1)<high,'reverse must present earlier video time');
 const count=shown.length;controller.dispose();video.emit('loadeddata');advance(9000);assert.equal(shown.length,count,'disposed callbacks must not update UI');
}
{
 const {states,controller}=create();advance(8001);assert.deepEqual(states,['failed'],'startup must have a deadline even without metadata');controller.retry();advance(8001);assert.equal(states.at(-1),'failed');controller.dispose();
}
{
 const {video,controller,states}=create();video.readyState=2;video.emit('loadeddata');controller.seek(.9);advance(16);advance(8001);assert.equal(states.at(-1),'failed','a seek that never completes must not hang');controller.dispose();
}
const media=JSON.parse(fs.readFileSync('public/careless/media.json','utf8'));
assert.equal(media.cinema.version,4);assert.equal(media.cinema.master.delivery,'video');assert.equal(media.cinema.master.sequence,undefined);
for(const src of [media.cinema.master.src,media.cinema.master.mobileSrc]) assert.ok(fs.statSync('public'+src).size<21025051);
assert.ok(!fs.readFileSync('app/new/_cinematic/CinematicJourney.tsx','utf8').includes('FrameCanvas'));
console.log('PASS metadata-only startup, frame0, latest-target coalescing, stale HQ reset, reverse seek, startup/seek deadlines, retry/dispose and one-video delivery');
