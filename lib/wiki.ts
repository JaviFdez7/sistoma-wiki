import catalogData from '@/data/catalog.json';
export const catalog=catalogData;
export type Entry=typeof catalog[number];
export const categories=[...new Set(catalog.map(x=>x.category))];
export const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const numberEs=(s:string)=>Number(s.replace(/\./g,'').replace(',','.').replace(/[^\d.\-]/g,''));
export const format=(n:number)=>new Intl.NumberFormat('es-ES',{maximumFractionDigits:2}).format(n);
export const metric=(e:Entry,label:string)=>e.stats.find(x=>x.label.toLowerCase().startsWith(label.toLowerCase()))?.value||'—';
