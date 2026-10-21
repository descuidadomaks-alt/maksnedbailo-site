import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import sharp from 'sharp';
import crypto from 'node:crypto';
const [sourceFolder,release='frames-v3']=process.argv.slice(2);
if(!sourceFolder||!/^[a-z0-9-]+$/.test(release))throw Error('Usage: node scripts/prepare-careless-avif.mjs source-folder existing-frame-release');
const file='public/careless/media.json';const media=JSON.parse(fs.readFileSync(file,'utf8'));const film=media.cinema.master;
const inspectionBefore=JSON.parse(fs.readFileSync('docs/CARELESS-FRAME-INSPECTION.json','utf8'));
if(inspectionBefore.release!==release)throw Error('Frame release mismatch');
for(const source of inspectionBefore.sources){const actual=crypto.createHash('sha256').update(fs.readFileSync(path.resolve(sourceFolder,source.source))).digest('hex');if(actual!==source.sha256)throw Error('Source changed: use a new frame release');}
const variants=[];
for(const fallback of film.sequence.variants.filter(v=>!v.format||v.format==='webp')){
 const id=`${fallback.id}-avif`;const folder=path.resolve('public/careless/frames',release,id);fs.mkdirSync(folder,{recursive:true});
 const {width,height}=fallback;const frameBytes=width*height*3;
 for(const [n,clip] of media.cinema.journey.entries()){
  const shot=film.shots[n];const first=Math.round(shot.start*24);const count=Math.round((shot.end-shot.start)*24);
  const proc=spawn('ffmpeg',['-hide_banner','-loglevel','error','-ss',String(clip.inPoint),'-i',path.resolve(sourceFolder,clip.sourceFile),'-vf',`fps=24,scale=${width}:${height}:flags=lanczos`,'-frames:v',String(count),'-an','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],{windowsHide:true});
  let errors='';proc.stderr.on('data',x=>errors+=x);const ended=new Promise((resolve,reject)=>{proc.on('close',code=>code===0?resolve():reject(Error(errors)));proc.on('error',reject)});
  let pending=Buffer.alloc(0),index=first;
  for await(const chunk of proc.stdout){pending=Buffer.concat([pending,chunk]);while(pending.length>=frameBytes){const raw=pending.subarray(0,frameBytes);pending=pending.subarray(frameBytes);const output=path.join(folder,`frame-${String(index++).padStart(5,'0')}.avif`);if(!fs.existsSync(output))await sharp(raw,{raw:{width,height,channels:3}}).avif({quality:45,effort:1}).toFile(output);}}
  await ended;if(index-first!==count)throw Error('Frame count mismatch');console.log(`${id}: ${clip.sourceFile}`);
 }
 const files=fs.readdirSync(folder).sort();const sum=list=>list.reduce((s,f)=>s+fs.statSync(path.join(folder,f)).size,0);
 variants.push({...fallback,id,format:'avif',pattern:`/careless/frames/${release}/${id}/frame-{frame}.avif`,fallbackPattern:fallback.pattern,bytes:sum(files),firstSecondBytes:sum(files.slice(0,24))});
}
film.sequence.variants=variants;fs.writeFileSync(file,JSON.stringify(media,null,2)+'\n');
const inspection=JSON.parse(fs.readFileSync('docs/CARELESS-FRAME-INSPECTION.json','utf8'));inspection.sequence=film.sequence;fs.writeFileSync('docs/CARELESS-FRAME-INSPECTION.json',JSON.stringify(inspection,null,2)+'\n');console.log(JSON.stringify(variants));
