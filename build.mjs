import fs from 'fs';
const SITE_URL = process.env.SITE_URL || 'https://directorio-ia.example.com'; // TODO: dominio real
const SITE = 'Directorio IA para Creadores';
const NEW = ['opusclip','submagic','suno','udio','luma','pika','turboscribe','castmagic','ideogram','captions','spotter','heygen'];
const cats = JSON.parse(fs.readFileSync('src/categories.json','utf8'));
const plats = {youtube:'YouTube',tiktok:'TikTok y Shorts',instagram:'Instagram y Reels',podcasts:'Podcasts',newsletters:'Newsletters'};
const priceL = {gratis:'Gratis',freemium:'Freemium','de-pago':'De pago','ver-sitio':'Ver sitio'};
const tools = JSON.parse(fs.readFileSync('src/tools.json','utf8'));
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const out='dist'; fs.rmSync(out,{recursive:true,force:true}); fs.mkdirSync(out);
const urls=[];
function page(path,{title,desc,body,ld=[],crumbs}){
  const canon=SITE_URL+path; urls.push(canon);
  if(crumbs) ld.push({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c[0],item:SITE_URL+c[1]}))});
  const html=`<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${canon}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canon}"><meta property="og:site_name" content="${SITE}"><meta property="og:locale" content="es_MX"><meta name="twitter:card" content="summary">
<link rel="stylesheet" href="/style.css">${ld.map(o=>`<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('')}</head><body>
<header class="top"><div class="wrap nav"><a href="/" class="logo">✦ Directorio<b>IA</b></a><nav><a href="/#categorias">Categorías</a><a href="/nuevas/">Nuevas</a><a href="/acerca/">Acerca</a><a href="/patrocina/">Patrocina</a></nav></div></header>
${crumbs?`<nav class="wrap crumbs" aria-label="Migas de pan">${crumbs.map((c,i)=>i<crumbs.length-1?`<a href="${c[1]}">${esc(c[0])}</a> / `:`<span>${esc(c[0])}</span>`).join('')}</nav>`:''}
<main class="wrap">${body}</main>
<footer class="foot"><div class="wrap">© ${new Date().getFullYear()} ${SITE} · <a href="/llms.txt">llms.txt</a> · <a href="/sitemap.xml">Sitemap</a> · <a href="/patrocina/">Patrocina</a></div></footer>
<script src="/app.js" defer></script></body></html>`;
  const f=out+path+(path.endsWith('/')?'index.html':''); fs.mkdirSync(f.replace(/[^/]+$/,''),{recursive:true}); fs.writeFileSync(f,html);
}
const byS=Object.fromEntries(tools.map(t=>[t.slug,t]));
const card=t=>`<article class="card" data-name="${esc((t.name+' '+t.desc).toLowerCase())}" data-plats="${t.platforms.join(' ')}"><h3><a href="/herramientas/${t.slug}/">${esc(t.name)}</a></h3><p>${esc(t.desc)}</p><div class="tags"><span class="price ${t.pricing}">${priceL[t.pricing]}</span>${t.platforms.map(p=>`<span>${plats[p]}</span>`).join('')}</div></article>`;
const grid=l=>`<div class="grid">${l.map(card).join('')}</div>`;
const itemList=(name,l)=>({'@context':'https://schema.org','@type':'ItemList',name,numberOfItems:l.length,itemListElement:l.map((t,i)=>({'@type':'ListItem',position:i+1,url:`${SITE_URL}/herramientas/${t.slug}/`,name:t.name}))});
const newsletter=`<section class="news" id="newsletter"><h2>Recibe las nuevas herramientas cada semana</h2><p>Un correo corto con lo mejor de IA para creadores. Sin spam.</p>
<!-- TODO: implementar /api/subscribe con Resend (API key en variable de entorno, nunca en el código) -->
<form method="post" action="/api/subscribe" class="subs"><label class="sr" for="email">Correo electrónico</label><input id="email" type="email" name="email" required placeholder="tu@correo.com"><button>Suscribirme</button></form><p class="msg" aria-live="polite"></p></section>`;
const platBar=`<div class="pills" role="group" aria-label="Filtrar por plataforma"><button class="pill on" data-p="">Todas</button>${Object.entries(plats).map(([k,v])=>`<button class="pill" data-p="${k}">${v}</button>`).join('')}</div>`;
// Home
const newT=NEW.map(s=>byS[s]).filter(Boolean);
page('/',{title:`${SITE}: herramientas de IA para YouTube, TikTok, podcasts y más`,desc:`Directorio en español de ${tools.length} herramientas de IA para creadores de contenido: guiones, edición, clips, voz, subtítulos, miniaturas y más.`,
 ld:[{'@context':'https://schema.org','@type':'WebSite',name:SITE,url:SITE_URL,inLanguage:'es-MX'},itemList('Herramientas de IA para creadores',tools)],
 body:`<section class="hero"><h1>Las mejores herramientas de IA para creadores de contenido</h1><p>Encuentra la herramienta ideal para tus videos, shorts, podcasts y newsletters. ${tools.length} herramientas en ${cats.length} categorías.</p>
<input id="q" type="search" placeholder="Busca: subtítulos, voz, miniaturas…" aria-label="Buscar herramientas"></section>
<section id="categorias"><h2>Categorías</h2><div class="cats">${cats.map(c=>`<a class="cat" href="/categorias/${c.slug}/"><span>${c.icon}</span><b>${esc(c.name)}</b><small>${tools.filter(t=>t.categories.includes(c.slug)).length} herramientas</small></a>`).join('')}</div></section>
<section><h2>Por plataforma</h2><p class="platlinks">${Object.entries(plats).map(([k,v])=>`<a href="/plataformas/${k}/">${v} →</a>`).join('')}</p></section>
<section><h2>Nuevas y destacadas</h2>${grid(newT.slice(0,6))}<p><a href="/nuevas/">Ver todas las nuevas →</a></p></section>
<section id="todas"><h2>Todas las herramientas</h2>${platBar}${grid(tools)}<p class="empty" hidden>No encontramos resultados.</p></section>${newsletter}`});
for(const c of cats){const l=tools.filter(t=>t.categories.includes(c.slug));
 page(`/categorias/${c.slug}/`,{title:`${c.name}: herramientas de IA | ${SITE}`,desc:`${c.desc} ${l.length} herramientas seleccionadas.`,ld:[itemList(c.name,l)],crumbs:[['Inicio','/'],['Categorías','/#categorias'],[c.name,`/categorias/${c.slug}/`]],
 body:`<h1>${c.icon} ${esc(c.name)}</h1><p class="lead">${esc(c.desc)}</p>${platBar}${grid(l)}<p class="empty" hidden>No hay herramientas para esta plataforma.</p>${newsletter}`});}
for(const [k,v] of Object.entries(plats)){const l=tools.filter(t=>t.platforms.includes(k));
 page(`/plataformas/${k}/`,{title:`Herramientas de IA para ${v} | ${SITE}`,desc:`${l.length} herramientas de IA útiles para crear contenido en ${v}.`,ld:[itemList(`IA para ${v}`,l)],crumbs:[['Inicio','/'],['Plataformas','/'],[v,`/plataformas/${k}/`]],
 body:`<h1>Herramientas de IA para ${v}</h1><p class="lead">${l.length} herramientas útiles para crear, editar y crecer en ${v}.</p>${grid(l)}`});}
for(const t of tools){const alts=tools.filter(o=>o.slug!==t.slug&&o.categories[0]===t.categories[0]).slice(0,4);const c0=cats.find(c=>c.slug===t.categories[0]);
 page(`/herramientas/${t.slug}/`,{title:`${t.name}: qué es, para qué sirve y alternativas | ${SITE}`,desc:`${t.desc} Precio: ${priceL[t.pricing]}.`,
 ld:[{'@context':'https://schema.org','@type':'SoftwareApplication',name:t.name,url:t.url,description:t.desc,applicationCategory:'MultimediaApplication',operatingSystem:'Web',inLanguage:'es-MX',...(t.pricing==='gratis'?{offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}}:{})}],
 crumbs:[['Inicio','/'],[c0.name,`/categorias/${c0.slug}/`],[t.name,`/herramientas/${t.slug}/`]],
 body:`<article class="detail"><h1>${esc(t.name)}</h1><p class="lead">${esc(t.desc)}</p>
<dl><dt>¿Para qué sirve?</dt><dd>${t.categories.map(s=>{const c=cats.find(x=>x.slug===s);return `<a href="/categorias/${s}/">${esc(c.name)}</a>`}).join(', ')}</dd>
<dt>Plataformas</dt><dd>${t.platforms.map(p=>`<a href="/plataformas/${p}/">${plats[p]}</a>`).join(', ')}</dd>
<dt>Modelo de precio</dt><dd><span class="price ${t.pricing}">${priceL[t.pricing]}</span> <small>(los planes cambian; consulta el sitio oficial)</small></dd></dl>
<p><a class="btn" href="${t.url}" target="_blank" rel="noopener">Visitar sitio oficial ↗</a></p></article>
<section><h2>Alternativas a ${esc(t.name)}</h2>${grid(alts)}</section>`});}
page('/nuevas/',{title:`Herramientas de IA nuevas | ${SITE}`,desc:'Las herramientas añadidas recientemente al directorio.',ld:[itemList('Nuevas',newT)],crumbs:[['Inicio','/'],['Nuevas','/nuevas/']],body:`<h1>Nuevas en el directorio</h1><p class="lead">Lo más reciente que hemos agregado.</p>${grid(newT)}${newsletter}`});
page('/acerca/',{title:`Acerca de | ${SITE}`,desc:'Qué es este directorio y cómo seleccionamos las herramientas.',crumbs:[['Inicio','/'],['Acerca','/acerca/']],body:`<article class="prose"><h1>Acerca del directorio</h1><p>Somos un directorio en español de herramientas de inteligencia artificial pensado para creadores de contenido: YouTubers, TikTokers, podcasters y autores de newsletters.</p><h2>Cómo elegimos</h2><p>Solo listamos herramientas reales y activas, verificamos sus enlaces oficiales y las organizamos por tarea y plataforma. Indicamos el modelo de precio general (gratis, freemium o de pago); los precios exactos cambian, así que siempre consulta el sitio oficial.</p><h2>Independencia</h2><p>Los patrocinios, cuando existan, estarán siempre marcados claramente como tales.</p></article>`});
page('/patrocina/',{title:`Patrocina | ${SITE}`,desc:'Llega a creadores de contenido hispanohablantes que buscan herramientas de IA.',crumbs:[['Inicio','/'],['Patrocina','/patrocina/']],body:`<article class="prose"><h1>Patrocina el directorio</h1><p>Nuestra audiencia son creadores de contenido en español que buscan activamente herramientas de IA para trabajar mejor.</p><h2>Formatos disponibles</h2><ul><li>Herramienta destacada en la página de inicio</li><li>Posición destacada en una categoría</li><li>Mención en el newsletter semanal</li></ul><p>Todos los patrocinios se etiquetan como "Patrocinado". Las tarifas se compartirán próximamente.</p><p>¿Te interesa? Escríbenos a <a href="mailto:patrocinios@example.com">patrocinios@example.com</a> <!-- TODO: correo real --></p></article>`});
// extras
fs.copyFileSync('src/style.css',out+'/style.css'); fs.copyFileSync('src/app.js',out+'/app.js');
fs.writeFileSync(out+'/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(out+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`<url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(out+'/llms.txt',`# ${SITE}\n\n> Directorio en español (es-MX) de ${tools.length} herramientas de IA para creadores de contenido (YouTube, TikTok, Instagram, podcasts, newsletters).\n\n## Categorías\n${cats.map(c=>`- [${c.name}](${SITE_URL}/categorias/${c.slug}/): ${c.desc}`).join('\n')}\n\n## Plataformas\n${Object.entries(plats).map(([k,v])=>`- [${v}](${SITE_URL}/plataformas/${k}/)`).join('\n')}\n\n## Más\n- [Listado completo](${SITE_URL}/llms-full.txt)\n- [Nuevas](${SITE_URL}/nuevas/)\n- [Acerca](${SITE_URL}/acerca/)\n`);
fs.writeFileSync(out+'/llms-full.txt',`# ${SITE} — listado completo\n\n${cats.map(c=>`## ${c.name}\n${c.desc}\n\n${tools.filter(t=>t.categories.includes(c.slug)).map(t=>`- **${t.name}** (${priceL[t.pricing]}; ${t.platforms.map(p=>plats[p]).join(', ')}): ${t.desc} Sitio: ${t.url} — Ficha: ${SITE_URL}/herramientas/${t.slug}/`).join('\n')}`).join('\n\n')}\n`);
console.log(`OK: ${tools.length} herramientas, ${urls.length} páginas`);
for(const c of cats) console.log(c.name+': '+tools.filter(t=>t.categories.includes(c.slug)).length);
