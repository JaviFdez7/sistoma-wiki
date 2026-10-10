import fs from 'node:fs';
const raw=JSON.parse(fs.readFileSync('research/encyclopedia.json','utf8'));
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').replace(/&amp;/g,'&').trim();
const slug=s=>s.replaceAll('+',' plus').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const rows=raw.map((r,i)=>{
 const eyebrow=plain(r.html.match(/class="vf-enc-eyebrow"[^>]*>(.*?)<\/div>/s)?.[1]||'');
 const kind=i<16?'material':i<22?'station':i<47?'ship':'component';
 const size=eyebrow.match(/\bS[1-4]\b/)?.[0]||'';
 const id=slug(r.name)+(r.name==='Hollow Caldera'?'-'+size.toLowerCase():'');
 const stats=[...r.html.matchAll(/<span class="l">(.*?)<\/span><span class="v">(.*?)<\/span>/gs)].map(m=>({label:plain(m[1]),value:plain(m[2])}));
 const meta=plain(r.html.match(/class="vf-enc-meta">(.*?)<\/div>/s)?.[1]||'');
 const price=meta.match(/(?:Precio base|Precio) ([\d.,]+) CR/)?.[1]||'';
 const category=kind==='ship'?'Naves':kind==='station'?'Estaciones':eyebrow.split(' · ')[0];
 const summary=kind==='ship'?`${eyebrow.split(' · ').slice(2).join(' · ')} de ${eyebrow.split(' · ')[0]}, tamaño ${size}. ${meta.replace(/^Precio [\d.,]+ CR\s*/,'')}.`:kind==='station'?({ 'Estación Meridian':'Centro de operaciones de MSP en órbita terrestre. Punto de inicio del piloto, con astillero, fabricación y servicios completos.', 'Refinería Cairn':'Base industrial de la Unión de Mineros Libres en Ceres. Refinado, mercado y servicios para mineros y transportistas.', 'Rust Hollow':'Centro de industria Hollow y desguace. Una estación sin ley orientada a la minería, al reciclaje y a las naves de trabajo.', 'Blackwake':'Estación del Sindicato Nox en los troyanos de Júpiter. Mercado clandestino, refinado y astillero en espacio sin ley.', 'Depósito Helios':'Parada de combustible y reparaciones en el sistema interior, entre Mercurio y Venus. Útil para planificar viajes largos.', 'Astillero de Fobos':'Astillero de la República de Tharsis junto a Marte. Acceso a buques Tharsis, componentes y su cadena de contratos.' }[r.name]||'Estación de Sol.') :kind==='component'?`Componente de ${eyebrow.toLowerCase()}. Consulta sus prestaciones, compatibilidad y materiales de fabricación.`:`Recurso de la categoría ${category.toLowerCase()}. Aquí encontrarás su origen, usos industriales y cotizaciones observadas.`;
 return {id,name:r.name,kind,category,size,eyebrow,meta,price,summary,stats,image:id==='msp-albor-mk-i'?'/visuals/albor-hangar.webp':'',html:r.html,text:r.text};
});
const nameMap=new Map(rows.map(r=>[r.name,r.id]));
const keyMap=new Map();
for(const r of raw) for(const m of r.html.matchAll(/<button[^>]*(?:data-testid="enc-link-([^"\s]+)"|data-link="([^"\s]+)")[^>]*>(.*?)<\/button>/gs)){
 const name=plain(m[3].replace(/<span class="q">.*?<\/span>/gs,''));
 const key=m[1]||m[2];
 const id=name==='Hollow Caldera'?rows.find(r=>r.name===name&&key.endsWith(r.size.toLowerCase()))?.id:nameMap.get(name);if(id)keyMap.set(key,id);
}
const clean=s=>s.replace(/<svg\b[^>]*>.*?<\/svg>/gs,'').replace(/<canvas\b[^>]*>.*?<\/canvas>/gs,'').replace(/<script\b[^>]*>.*?<\/script>/gs,'').replace(/\s(?:style|title|aria-label|data-testid|data-engine|data-state|width|height|type)="[^"]*"/g,'').replace(/\son\w+="[^"]*"/g,'').replace(/<button([^>]*)>(.*?)<\/button>/gs,(_,attrs,body)=>{const key=attrs.match(/data-link="([^"]+)"/)?.[1];return key&&keyMap.has(key)?`<a href="/entrada/${keyMap.get(key)}/" class="vf-enc-chip">${body}</a>`:`<span class="vf-enc-chip">${body}</span>`;});
for(const [i,r] of rows.entries()){
 let html=raw[i].html;
 // Preserve factual tables and relationships; omit the game's authored lore and prose.
 html=html.replace(/<header\b[^>]*>.*?<\/header>/s,'').replace(/<p class="vf-enc-summary"[^>]*>.*?<\/p>/gs,'').replace(/<section[^>]*><h3[^>]*>Historia<\/h3>.*?<\/section>/gs,'').replace(/<span class="vf-enc-holo-hint">.*?<\/span>/gs,'');
 html=html.replace(/<button([^>]*)data-testid="enc-link-([^"]+)"([^>]*)>/g,'<button$1data-link="$2"$3>');
 r.body=clean(html).replaceAll('Precios de ahora','Precios capturados el 10/10/2026');
 let sectionIndex=0;
 r.body=r.body.replace(/<h([34])([^>]*)>/g,(_,level,attrs)=>`<h${level}${attrs} id="ficha-seccion-${sectionIndex++}">`);
 r.sections=[...r.body.matchAll(/<h[34][^>]*>(.*?)<\/h[34]>/gs)].map(m=>plain(m[1]));
 r.searchText=plain(r.body)+' '+r.summary;
 delete r.html;delete r.text;
}
fs.mkdirSync('data',{recursive:true});
fs.writeFileSync('data/catalog.json',JSON.stringify(rows,null,2));
const fabrication=JSON.parse(fs.readFileSync('research/menus.json','utf8')).find(r=>r.name==='Fabricación').text;
const blueprints=[];
 for(const m of fabrication.matchAll(/(?:^|\n)(?:1,0 SCU )?([^\n]+?)i? · nivel (\d+)\n([^\n]+)\n([^\n]+?) \+ ([\d.,]+) CR · (\d+) min\nAPRENDER · ([\d.,]+) CR(?:\n((?:Requiere|Se gana)[^\n]+))?/g)){
 const name=m[1].replace(/i$/,'');
 blueprints.push({name,id:nameMap.get(name)||'',level:Number(m[2]),ingredients:m[4].split(' + ').map(s=>{const x=s.match(/^([\d.,]+) (.+)$/);return {name:x?.[2]||s,amount:Number((x?.[1]||'0').replace(',','.'))};}),fee:Number(m[5].replace(/\./g,'').replace(',','.')),minutes:Number(m[6]),learn:Number(m[7].replace(/\./g,'')),requirement:m[8]||'Sin requisito de rango observado'});
}
fs.writeFileSync('data/blueprints.json',JSON.stringify(blueprints,null,2));
const counts=Object.fromEntries(['ship','station','material','component'].map(k=>[k,rows.filter(r=>r.kind===k).length]));
console.log({records:rows.length,counts,links:keyMap.size,blueprints:blueprints.length});
