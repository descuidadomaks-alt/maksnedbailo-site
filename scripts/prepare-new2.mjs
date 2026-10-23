import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const source='public/careless/video/film-v4/film-720.mp4';
const shots=JSON.parse(fs.readFileSync('public/careless/media.json')).cinema.master.shots;
const dir='public/careless/video/new2';fs.mkdirSync(dir,{recursive:true});
for(const [i,s] of shots.entries()){
 const out=`${dir}/${i}.mp4`;
 if(!fs.existsSync(out)){
  const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-ss',String(s.start),'-i',source,'-t',String(s.end-s.start),'-an','-vf','fps=24','-c:v','libx264','-preset','fast','-crf','29','-movflags','+faststart','-pix_fmt','yuv420p','-n',out],{windowsHide:true});
  if(r.status!==0)throw Error(String(r.stderr));
 }
 console.log(`${i}: ${fs.statSync(out).size} bytes`);
}
