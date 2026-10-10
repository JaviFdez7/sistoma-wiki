import sharp from 'sharp';
import fs from 'node:fs/promises';
await fs.mkdir('public/visuals',{recursive:true});
const crops=[
 ['space','0.9.60-accesibilidad.jpg',null],
 ['hangar','0.9.50-bienvenida.jpg',null],
 ['meridian','0.9.60-accesibilidad.jpg',{left:0,top:45,width:900,height:645}],
 ['albor-flight','0.9.60-accesibilidad.jpg',{left:580,top:335,width:460,height:260}],
 ['albor-hangar','0.9.50-bienvenida.jpg',{left:400,top:325,width:760,height:320}],
 ['radar','0.9.60-accesibilidad.jpg',{left:1200,top:0,width:400,height:355}],
 ['ship-systems','0.9.60-accesibilidad.jpg',{left:1200,top:525,width:400,height:375}],
 ['station-services','0.9.50-bienvenida.jpg',{left:205,top:5,width:715,height:330}],
 ['flight-controls','0.9.60-accesibilidad.jpg',{left:495,top:750,width:615,height:150}],
];
for(const [name,source,rect] of crops){let img=sharp('public/assets/'+source);if(rect)img=img.extract(rect);await img.webp({quality:92}).toFile('public/visuals/'+name+'.webp');}
// Earlier encyclopedia crops contained navigation UI, not ship views.
const catalog=JSON.parse(await fs.readFile('data/catalog.json','utf8'));
for(const entry of catalog){if(entry.kind==='ship')entry.image=entry.id==='msp-albor-mk-i'?'/visuals/albor-hangar.webp':'';}
await fs.writeFile('data/catalog.json',JSON.stringify(catalog,null,2)+'\n');
console.log('9 imágenes reales preparadas; referencias de naves corregidas.');
