import fs from 'node:fs';
import assert from 'node:assert/strict';
const c=JSON.parse(fs.readFileSync('data/catalog.json','utf8'));
const b=JSON.parse(fs.readFileSync('data/blueprints.json','utf8'));
const ids=new Set(c.map(e=>e.id));
assert.equal(c.length,130);assert.equal(ids.size,130);assert.equal(b.length,29);
for(const [kind,count] of Object.entries({ship:25,station:6,material:16,component:83}))assert.equal(c.filter(e=>e.kind===kind).length,count);
let links=0;
for(const e of c){assert.ok(e.body.length>40,e.id);assert.ok(!/<script|on\w+=|<button|<canvas/.test(e.body));for(const m of e.body.matchAll(/href="\/entrada\/([^/]+)\//g)){assert.ok(ids.has(m[1]),e.id+' links to '+m[1]);links++}if(e.image)assert.ok(fs.existsSync('public'+e.image))}
for(const r of b){assert.ok(ids.has(r.id),r.name);assert.ok(r.ingredients.length>0);for(const m of r.ingredients)assert.ok(m.amount>0,r.name);assert.ok(r.minutes>0);assert.ok(r.fee>=0);}
console.log(`Verified: ${c.length} unique articles, ${b.length} recipes, ${links} factual internal links.`);
console.log('Body classes:',[...new Set(c.flatMap(e=>[...e.body.matchAll(/class="([^"]+)/g)].map(m=>m[1])))].join(', '));
