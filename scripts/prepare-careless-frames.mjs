import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
const [sourceFolder, release = 'frames-v3'] = process.argv.slice(2);
if (!sourceFolder || !/^[a-z0-9-]+$/.test(release)) throw Error('Usage: node scripts/prepare-careless-frames.mjs source-folder unique-release');
const manifestPath = 'public/careless/media.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const film = manifest.cinema.master;
const root = path.resolve('public/careless/frames', release);
if (fs.existsSync(root)) throw Error('Release directory exists; use a new release name');
const run = (tool,args) => { const r=spawnSync(tool,args,{encoding:'utf8',windowsHide:true}); if(r.status!==0) throw Error(r.stderr); return r.stdout; };
const sources = manifest.cinema.journey.map((clip,index) => {
 const source = path.resolve(sourceFolder,clip.sourceFile);
 const data=JSON.parse(run('ffprobe',['-v','error','-show_streams','-of','json',source]));
 const video=data.streams.find(s=>s.codec_type==='video');
 return {clip,shot:film.shots[index],source,width:video.width,height:video.height,sha256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex')};
});
if(sources.some(s=>Math.abs(s.width/s.height-sources[0].width/sources[0].height)>.01))throw Error('Use consistently framed source clips before exporting a sequence');
const sourceWidth=Math.min(...sources.map(s=>s.width));
// Do not upscale supplied footage. Full-HD sources automatically produce separate responsive renditions.
const widths=[...new Set([Math.min(960,sourceWidth),Math.min(1920,sourceWidth)])];
const variants=[];
for(const width of widths){
 const id=`w${width}`;const folder=path.join(root,id);fs.mkdirSync(folder,{recursive:true});
 let height=0;
 for(const {clip,shot,source} of sources){
  const first=Math.round(shot.start*24);const count=Math.round((shot.end-shot.start)*24);
  run('ffmpeg',['-hide_banner','-loglevel','error','-ss',String(clip.inPoint),'-i',source,'-vf',`fps=24,scale=${width}:-2:flags=lanczos`,'-frames:v',String(count),'-start_number',String(first),'-an','-c:v','libwebp','-quality','78','-compression_level','4','-threads','2','-n',path.join(folder,'frame-%05d.webp')]);
  console.log(`${id}: ${clip.sourceFile} / ${count} frames`);
 }
 const files=fs.readdirSync(folder).sort();const count=Math.round(film.duration*24);
 if(files.length!==count)throw Error(`Expected ${count} frames; found ${files.length}`);
 const probe=JSON.parse(run('ffprobe',['-v','error','-show_streams','-of','json',path.join(folder,files[0])]));height=probe.streams[0].height;
 const bytes=files.reduce((sum,f)=>sum+fs.statSync(path.join(folder,f)).size,0);
 const firstSecondBytes=files.slice(0,24).reduce((sum,f)=>sum+fs.statSync(path.join(folder,f)).size,0);
 variants.push({id,width,height,pattern:`/careless/frames/${release}/${id}/frame-{frame}.webp`,bytes,firstSecondBytes});
}
film.sequence={fps:24,count:Math.round(film.duration*24),variants};
manifest.cinema.version=3;
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync('docs/CARELESS-FRAME-INSPECTION.json',JSON.stringify({release,sourceFilesUntouched:true,duration:film.duration,sequence:film.sequence,sources:sources.map(({clip,sha256,width,height})=>({source:clip.sourceFile,sha256,width,height}))},null,2)+'\n');
console.log(JSON.stringify(film.sequence));
