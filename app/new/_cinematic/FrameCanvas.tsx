"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { FrameStore, frameIndex, frameURL, type DecodedFrame } from "./frame-store";
import type { Film, FrameVariant } from "./cinema";
import styles from "./careless.module.css";
export type FrameHandle = { seek(progress: number): void };

async function decodeFrame(url: string, parentSignal: AbortSignal): Promise<DecodedFrame> {
 const controller = new AbortController();
 let rejectDeadline: (reason: Error) => void = () => {};
 const deadlinePromise = new Promise<never>((_,reject)=>{rejectDeadline=reject;});
 const abort = () => {controller.abort();rejectDeadline(Error("frame cancelled"));};
 parentSignal.addEventListener("abort",abort,{once:true});
 const deadline = setTimeout(()=>{controller.abort();rejectDeadline(Error("frame timed out"));},6500);
 const decode = async():Promise<DecodedFrame> => {
  const response=await fetch(url,{signal:controller.signal,cache:"force-cache"});
  if(!response.ok)throw Error("frame unavailable");
  const blob=await response.blob();
  if(controller.signal.aborted)throw Error("frame cancelled");
  let frame:DecodedFrame;
  try {
   if(typeof createImageBitmap==="function") {
    const image=await createImageBitmap(blob);
    frame={image,width:image.width,height:image.height,close:()=>image.close()};
   } else {
    const objectURL=URL.createObjectURL(blob);const image=new Image();
    try {image.src=objectURL;await image.decode();} finally {URL.revokeObjectURL(objectURL);}
    frame={image,width:image.naturalWidth,height:image.naturalHeight,close:()=>{image.src="";}};
   }
  } catch {const error=new Error("frame format unsupported");error.name="FrameDecodeError";throw error;}
  if(controller.signal.aborted){frame.close();throw Error("frame cancelled");}
  return frame;
 };
 try {return await Promise.race([decode(),deadlinePromise]);}
 finally {clearTimeout(deadline);parentSignal.removeEventListener("abort",abort);}
}

export const FrameCanvas = forwardRef<FrameHandle,{ film:Film; onPresented(time:number):void; onWaiting(time:number):void; onFailure():void }>(function FrameCanvas({film,onPresented,onWaiting,onFailure},ref){
 const canvas = useRef<HTMLCanvasElement>(null);
 const store = useRef<FrameStore | null>(null);
 const desired = useRef(0);
 const shown = useRef(-1);
 const callbacks = useRef({onPresented,onWaiting,onFailure}); callbacks.current={onPresented,onWaiting,onFailure};
 const sequence = film.sequence!;
 useImperativeHandle(ref,()=>({seek(progress){
  desired.current=Math.max(0,Math.min(1,progress))*film.duration;
  const target=frameIndex(desired.current,sequence.fps,sequence.count);
  if (shown.current >= 0 && Math.abs(target-shown.current)>sequence.fps*.4 && canvas.current) {
   // A fling/return to the hero must never expose an old HQ frame while the target loads.
   canvas.current.style.opacity='0'; shown.current=-1; callbacks.current.onWaiting(desired.current);
  }
  store.current?.select(target);
 }}),[film.duration,sequence]);
 useEffect(()=>{
  const element=canvas.current;if(!element)return;
  const ctx=element.getContext('2d',{alpha:false});if(!ctx){callbacks.current.onFailure();return;}
  const variants=[...sequence.variants].sort((a,b)=>a.width-b.width);
  const mobile=matchMedia('(max-width: 700px)').matches;
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
  const wanted=mobile||connection?.saveData ? Math.min(960,innerWidth*1.8) : Math.min(1920,innerWidth*1.5);
  const variant:FrameVariant=variants.find(v=>v.width>=wanted)||variants[variants.length-1];
  // At most 12 MP of cached decoded frames (~48 MB), plus two in-flight decodes.
  const maxFrames=Math.max(2,Math.min(10,Math.floor(12_000_000/(variant.width*variant.height))));
  const ahead=Math.max(1,Math.floor((maxFrames-1)*.7)); const behind=maxFrames-1-ahead;
  element.width=variant.width; element.height=variant.height;
  element.dataset.variant=variant.id;element.dataset.cacheLimit=String(maxFrames);element.dataset.decodedBudgetMB=String(Math.round(maxFrames*variant.width*variant.height*4/1e6));
  let disposed=false,drawn=0;
  const frameStore=new FrameStore({count:sequence.count,maxFrames,concurrency:2,ahead,behind,
   load:async(index,signal)=>{
    try { return await decodeFrame(frameURL(variant.pattern,index),signal); }
    catch(error) { if(signal.aborted||!variant.fallbackPattern||!(error instanceof Error)||error.name!=="FrameDecodeError")throw error; return decodeFrame(frameURL(variant.fallbackPattern,index),signal); }
   },
   present:(index,frame)=>{
    if(disposed)return;
    if(index===shown.current){element.style.opacity='1';return;}
    ctx.drawImage(frame.image,0,0,element.width,element.height);shown.current=index;drawn++;
    element.style.opacity='1';element.dataset.frame=String(index);element.dataset.framesDrawn=String(drawn);element.dataset.mediaState='ready';element.dataset.cacheSize=String(frameStore.cache.size);
    callbacks.current.onPresented(index/sequence.fps);
   },
   failure:()=>{if(!disposed){element.style.opacity='0';element.dataset.mediaState='fallback';callbacks.current.onFailure();}}
  });
  store.current=frameStore; shown.current=-1;callbacks.current.onWaiting(desired.current);element.style.opacity='0';
  frameStore.select(frameIndex(desired.current,sequence.fps,sequence.count));
  return ()=>{disposed=true;frameStore.dispose();store.current=null;shown.current=-1;element.width=1;element.height=1;};
 },[sequence]);
 return <canvas ref={canvas} className={styles.frameCanvas} data-renderer="frames" data-media-state="loading" aria-hidden="true" style={{opacity:0}}/>;
});
