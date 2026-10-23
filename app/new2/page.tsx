import type { Metadata } from 'next';
import Experience from './Experience';
export const metadata: Metadata = {
 title: 'Care Less — Extraordinary experiences. Less to worry about.',
 description: 'Distinctive brands, content that earns attention, conversations that convert, and connected customer experiences. Built around a better day for you.',
 alternates: {canonical:'https://maksnedbailo.site/new2'},
 robots:{index:true,follow:true},
 openGraph:{title:'Care Less — Extraordinary experiences.',description:'Less to worry about.',url:'https://maksnedbailo.site/new2',images:[{url:'/careless/images/01-pool.webp',alt:'Sunset over the Care Less infinity pool'}]},
 twitter:{card:'summary_large_image',title:'Care Less — Extraordinary experiences.',description:'Less to worry about.',images:['/careless/images/01-pool.webp']},
};
export default function Page(){return <Experience/>;}
