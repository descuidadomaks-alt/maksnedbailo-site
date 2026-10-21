import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
const [source, release, prepared] = process.argv.slice(2);
if (!source || !/^[a-z0-9-]+$/.test(release || '')) throw Error('Usage: node scripts/prepare-careless-single-film.mjs full.mp4 unique-release [prepared-encodes-folder]');
const run = (tool, args) => { const r = spawnSync(tool, args, {encoding:'utf8', windowsHide:true}); if(r.status !== 0) throw Error(r.stderr); return r.stdout; };
const probe = file => JSON.parse(run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file]));
const input = probe(source), video = input.streams.find(s=>s.codec_type==='video');
if (!video || video.width !== video.height) throw Error('This temporary edit is square. Review delivery aspect/crops before preparing different-aspect footage.');
const duration = Number(input.format.duration), fps = 30;
const folder = path.resolve('public/careless/video',release); fs.mkdirSync(folder);
const variants = [{file:'film-720.mp4',width:720,gop:30,prepared:'720-g30-crf25.mp4'}, {file:'film-540.mp4',width:540,gop:15,prepared:'540-g15-crf25.mp4'}];
for(const variant of variants) {
 const output=path.join(folder,variant.file);
 if(prepared) fs.copyFileSync(path.join(prepared,variant.prepared),output);
 else run('ffmpeg',['-hide_banner','-loglevel','error','-i',source,'-an','-vf',`scale=${variant.width}:${variant.width},fps=30`,'-c:v','libx264','-preset','slow','-crf','25','-g',String(variant.gop),'-keyint_min',String(variant.gop),'-sc_threshold','0','-bf','0','-pix_fmt','yuv420p','-movflags','+faststart','-n',output]);
 variant.bytes=fs.statSync(output).size;variant.duration=Number(probe(output).format.duration);
 if(Math.abs(variant.duration-duration)>.05) throw Error('Duration changed');
}
const media=JSON.parse(fs.readFileSync('public/careless/media.json','utf8'));
// Chapter markers describe the founder's assembled film; they do not load clips.
const boundaries=[0,5.1,10.166667,15.266667,20.466667,25.566667,30.633333,35.733333,40.8,duration];
const url=`/careless/video/${release}`;
const shots=media.cinema.master.shots.map((shot,i)=>({...shot,start:boundaries[i],end:boundaries[i+1],poster:`${url}/chapter-${i}.webp`}));
for(const [i,shot] of shots.entries()) run('ffmpeg',['-hide_banner','-loglevel','error','-ss',String(shot.start),'-i',source,'-frames:v','1','-c:v','libwebp','-quality','82','-n',path.join(folder,`chapter-${i}.webp`)]);
run('ffmpeg',['-hide_banner','-loglevel','error','-ss',String(duration-.067),'-i',source,'-frames:v','1','-c:v','libwebp','-quality','82','-n',path.join(folder,'film-last.webp')]);
media.cinema.version=4;
media.cinema.master={id:'film',mode:'scroll',delivery:'video',sourceFile:path.basename(source),src:`${url}/film-720.mp4`,mobileSrc:`${url}/film-540.mp4`,poster:shots[0].poster,endPoster:`${url}/film-last.webp`,duration,fps,position:'center 45%',mobilePosition:'30% center',settle:false,shots};
const shot=id=>shots.find(s=>s.id===id);
media.cinema.cues=[
 {id:'surface',scene:'pool',start:.65,end:shot('clip-2').end-.25},
 {id:'coast',scene:'coast',start:shot('clip-2a').start+.7,end:shot('clip-2a').end-.25},
 {id:'discovery',scene:'discovery',start:shot('clip-3').start+1.2,end:shot('clip-4').start+1},
 {id:'system',scene:'tunnel',start:shot('clip-5').start+1.2,end:shot('clip-6').end-.6},
 {id:'colony',scene:'colony',start:shot('clip-7').start+.55,end:shot('clip-7').end-.35},
 {id:'scout',scene:'scout',start:shot('clip-8').start+1,end:shot('clip-9').start+.55,actions:true},
 {id:'headquarters',scene:'hq',start:shot('clip-9').start+2,end:duration+.5,actions:true}
].map(cue=>({...cue,fade:.65}));
fs.writeFileSync('public/careless/media.json',JSON.stringify(media,null,2)+'\n');
const inspection={release,sourceFile:path.basename(source),sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),sourceBytes:fs.statSync(source).size,sourceWidth:video.width,sourceHeight:video.height,duration,fps,variants,sourceFilesUntouched:true,notes:['Original source contains a brief dark patch around20.47–20.77s; preserved.','720px square source is not Full HD.','Only one rendition is requested per mount; no frame sequences are loaded.']};
fs.writeFileSync('docs/CARELESS-SINGLE-FILM-INSPECTION.json',JSON.stringify(inspection,null,2)+'\n');
console.log(JSON.stringify(inspection,null,2));
