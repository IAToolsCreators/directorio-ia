import fs from 'fs';
const SITE_URL = (process.env.SITE_URL || 'https://directorio-ia.example.com').replace(/\/$/,'');
const EMAIL = 'iatools.ia@gmail.com';
const NEW = ['socialblade','1of10','google-trends','morningfame','keywordseverywhere','mubert','artlist','spotify-creators','buzzsprout','kit','substack','typefully','klingai','freepik','adobe-express'];
const cats = JSON.parse(fs.readFileSync('src/categories.json','utf8'));
const tools = JSON.parse(fs.readFileSync('src/tools.json','utf8'));
const PL = ['youtube','tiktok','instagram','podcasts','newsletters'];
const L = {
 es:{pre:'',html:'es-MX',og:'es_MX',site:'Directorio IA para Creadores',
  r:{cat:'categorias',plat:'plataformas',tool:'herramientas',new:'nuevas',about:'acerca',sponsor:'patrocina'},
  plats:{youtube:'YouTube',tiktok:'TikTok y Shorts',instagram:'Instagram y Reels',podcasts:'Podcasts',newsletters:'Newsletters'},
  price:{gratis:'Gratis',freemium:'Freemium','de-pago':'De pago','ver-sitio':'Ver sitio'},
  s:{nav:['Categorías','Nuevas','Acerca','Patrocina'],home:'Inicio',cats:'Categorías',platsW:'Plataformas',crumbs:'Migas de pan',all:'Todas',filter:'Filtrar por plataforma',tools:'herramientas',
   homeTitle:'Directorio IA para Creadores: herramientas de IA para YouTube, TikTok, podcasts y más',homeDesc:n=>`Directorio en español de ${n} herramientas de IA para creadores de contenido: guiones, edición, clips, voz, subtítulos, miniaturas y más.`,
   h1:'Crea más y mejor contenido con IA, sin perder horas buscando',sub:(n,c)=>`Elegimos y explicamos en español las herramientas de IA que de verdad ayudan a creadores de YouTube, TikTok, Instagram, podcasts y newsletters. ${n} herramientas en ${c} categorías, con enlaces oficiales verificados.`,
   search:'Busca: subtítulos, voz, miniaturas…',searchL:'Buscar herramientas',byTask:'Explora por tarea',byTaskI:'¿Qué necesitas hacer hoy? Escoge una tarea y ve directo a las herramientas que la resuelven.',byPlat:'Explora por plataforma',byPlatI:'Herramientas pensadas para el formato y el público de cada red.',
   newH:'Recién agregadas',newI:'Lo último que sumamos al directorio, revisado por nosotros.',seeNew:'Ver todas las nuevas →',allH:'Todas las herramientas',allI:'Filtra por plataforma o usa el buscador de arriba.',none:'No encontramos resultados.',noneP:'No hay herramientas para esta plataforma.',
   nlH:'Un correo a la semana para crear más rápido',nlP:'Cada semana, las herramientas de IA nuevas y más útiles para creadores, explicadas en 5 minutos de lectura. Gratis y sin spam; date de baja cuando quieras.',email:'Correo electrónico',ph:'tu@correo.com',btn:'Suscribirme',
   catT:n=>`${n}: herramientas de IA`,sel:n=>`${n} herramientas seleccionadas.`,platT:v=>`Herramientas de IA para ${v}`,platD:(n,v)=>`${n} herramientas de IA útiles para crear contenido en ${v}.`,platL:(n,v)=>`${n} herramientas útiles para crear, editar y crecer en ${v}.`,
   toolT:n=>`${n}: qué es, para qué sirve y alternativas`,priceW:'Precio',useFor:'¿Para qué sirve?',platsL:'Plataformas',model:'Modelo de precio',plansNote:'(los planes cambian; consulta el sitio oficial)',visit:'Visitar sitio oficial ↗',alts:n=>`Alternativas a ${n}`,
   newT:'Herramientas de IA nuevas',newD:'Las herramientas añadidas recientemente al directorio.',newH1:'Nuevas en el directorio',newL:'Lo más reciente que hemos agregado.',newCrumb:'Nuevas',
   aboutT:'Acerca de',aboutD:'Qué es este directorio y cómo seleccionamos las herramientas.',aboutCrumb:'Acerca',
   about:`<h1>Acerca del directorio</h1><p>Somos un directorio en español de herramientas de inteligencia artificial pensado para creadores de contenido: YouTubers, TikTokers, podcasters y autores de newsletters.</p><h2>Cómo elegimos</h2><p>Solo listamos herramientas reales y activas, verificamos sus enlaces oficiales y las organizamos por tarea y plataforma. Indicamos el modelo de precio general (gratis, freemium o de pago) cuando lo pudimos verificar; si no, marcamos "Ver sitio". Los precios cambian, así que siempre consulta el sitio oficial.</p><h2>Independencia</h2><p>Los patrocinios, cuando existan, estarán siempre marcados claramente como tales.</p>`,
   spT:'Patrocina',spD:'Llega a creadores de contenido hispanohablantes que buscan herramientas de IA.',spCrumb:'Patrocina',
   sp:`<h1>Patrocina el directorio</h1><p>Nuestra audiencia son creadores de contenido que buscan activamente herramientas de IA para trabajar mejor.</p><h2>Formatos disponibles</h2><ul><li>Herramienta destacada en la página de inicio</li><li>Posición destacada en una categoría</li><li>Mención en el newsletter semanal</li></ul><p>Todos los patrocinios se etiquetan como "Patrocinado". Las tarifas se compartirán próximamente.</p><p>¿Te interesa? Escríbenos a <a href="mailto:${EMAIL}">${EMAIL}</a></p>`,
   full:'listado completo',llmsD:n=>`Directorio en español (es-MX) de ${n} herramientas de IA para creadores de contenido (YouTube, TikTok, Instagram, podcasts, newsletters).`,llmsMore:['Listado completo','Nuevas','Acerca','English version'],site:'Sitio',page:'Ficha'}},
 en:{pre:'/en',html:'en-US',og:'en_US',site:'AI Tools Directory for Creators',
  r:{cat:'categories',plat:'platforms',tool:'tools',new:'new',about:'about',sponsor:'sponsor'},
  plats:{youtube:'YouTube',tiktok:'TikTok & Shorts',instagram:'Instagram & Reels',podcasts:'Podcasts',newsletters:'Newsletters'},
  price:{gratis:'Free',freemium:'Freemium','de-pago':'Paid','ver-sitio':'See website'},
  s:{nav:['Categories','New','About','Sponsor'],home:'Home',cats:'Categories',platsW:'Platforms',crumbs:'Breadcrumb',all:'All',filter:'Filter by platform',tools:'tools',
   homeTitle:'AI Tools Directory for Creators: AI tools for YouTube, TikTok, podcasts & more',homeDesc:n=>`A curated directory of ${n} AI tools for content creators: scripting, editing, clips, voice, captions, thumbnails, and more.`,
   h1:'Make better content, faster, with the right AI tools',sub:(n,c)=>`We hand-pick and explain the AI tools that actually help YouTubers, TikTokers, Instagram creators, podcasters, and newsletter writers. ${n} tools across ${c} categories, with verified official links.`,
   search:'Search: captions, voice, thumbnails…',searchL:'Search tools',byTask:'Browse by task',byTaskI:'What do you need to get done today? Pick a task and jump straight to the tools for it.',byPlat:'Browse by platform',byPlatI:'Tools built for the format and audience of each platform.',
   newH:'Just added',newI:'The latest additions to the directory, reviewed by us.',seeNew:'See all new tools →',allH:'All tools',allI:'Filter by platform or use the search bar above.',none:'No results found.',noneP:'No tools for this platform yet.',
   nlH:'One email a week to help you create faster',nlP:'Every week, the newest and most useful AI tools for creators, explained in a 5-minute read. Free, no spam, unsubscribe anytime.',email:'Email address',ph:'you@email.com',btn:'Subscribe',
   catT:n=>`${n}: AI tools`,sel:n=>`${n} hand-picked tools.`,platT:v=>`AI tools for ${v}`,platD:(n,v)=>`${n} AI tools to help you create content for ${v}.`,platL:(n,v)=>`${n} tools to help you create, edit, and grow on ${v}.`,
   toolT:n=>`${n}: what it is, what it's for, and alternatives`,priceW:'Pricing',useFor:'What is it for?',platsL:'Platforms',model:'Pricing model',plansNote:'(plans change; check the official website)',visit:'Visit official website ↗',alts:n=>`${n} alternatives`,
   newT:'New AI tools',newD:'The latest tools added to the directory.',newH1:'New in the directory',newL:'The most recent tools we added.',newCrumb:'New',
   aboutT:'About',aboutD:'What this directory is and how we choose the tools.',aboutCrumb:'About',
   about:`<h1>About the directory</h1><p>We're a curated directory of AI tools for content creators: YouTubers, TikTokers, podcasters, and newsletter writers. The original edition is in Spanish; this is the English version.</p><h2>How we choose</h2><p>We only list real, active tools, verify their official links, and organize them by task and platform. We show the general pricing model (free, freemium, or paid) when we could verify it; otherwise we mark it "See website." Pricing changes, so always check the official site.</p><h2>Independence</h2><p>Sponsorships, when we have them, will always be clearly labeled.</p>`,
   spT:'Sponsor',spD:'Reach content creators who are actively looking for AI tools.',spCrumb:'Sponsor',
   sp:`<h1>Sponsor the directory</h1><p>Our audience is content creators actively looking for AI tools to work smarter.</p><h2>Available placements</h2><ul><li>Featured tool on the home page</li><li>Featured spot in a category</li><li>Mention in the weekly newsletter</li></ul><p>All sponsorships are labeled "Sponsored." Rates coming soon.</p><p>Interested? Email us at <a href="mailto:${EMAIL}">${EMAIL}</a></p>`,
   full:'full list',llmsD:n=>`English edition of a directory of ${n} AI tools for content creators (YouTube, TikTok, Instagram, podcasts, newsletters).`,llmsMore:['Full list','New tools','About','Versión en español'],site:'Website',page:'Directory page'}}};
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const out='dist'; fs.rmSync(out,{recursive:true,force:true}); fs.mkdirSync(out);
const sm=[]; // {es,en}
// key -> path per language
const P=(lg,k,slug)=>{const l=L[lg];return k==='home'?(l.pre||'')+'/':`${l.pre}/${l.r[k]}/${slug?slug+'/':''}`};
const cN=(c,lg)=>lg==='en'?c.name_en:c.name, cD=(c,lg)=>lg==='en'?c.desc_en:c.desc, tD=(t,lg)=>lg==='en'?t.description_en:t.desc;
function page(lg,k,slug,{title,desc,body,ld=[],crumbs}){
  const l=L[lg],s=l.s,path=P(lg,k,slug),alt={es:P('es',k,slug),en:P('en',k,slug)},canon=SITE_URL+path;
  if(lg==='es') sm.push(alt);
  if(crumbs) ld.push({'@context':'https://schema.org','@type':'BreadcrumbList',inLanguage:l.html,itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c[0],item:SITE_URL+c[1]}))});
  const nav=[['/#categorias','/#categories'][lg==='es'?0:1],P(lg,'new'),P(lg,'about'),P(lg,'sponsor')].map((h,i)=>`<a href="${lg==='en'&&i===0?'/en/#categories':h}">${s.nav[i]}</a>`).join('');
  const sw=`<span class="lang" aria-label="Idioma / Language"><a href="${alt.es}" hreflang="es" lang="es" data-lang="es"${lg==='es'?' aria-current="true"':''}>ES</a> | <a href="${alt.en}" hreflang="en" lang="en" data-lang="en"${lg==='en'?' aria-current="true"':''}>EN</a></span>`;
  const html=`<!doctype html><html lang="${l.html}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${canon}">
<link rel="alternate" hreflang="es" href="${SITE_URL+alt.es}"><link rel="alternate" hreflang="en" href="${SITE_URL+alt.en}"><link rel="alternate" hreflang="x-default" href="${SITE_URL+alt.es}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canon}"><meta property="og:site_name" content="${l.site}"><meta property="og:locale" content="${l.og}"><meta property="og:locale:alternate" content="${lg==='es'?'en_US':'es_MX'}"><meta name="twitter:card" content="summary">
<link rel="stylesheet" href="/style.css">${ld.map(o=>`<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('')}</head><body data-lang="${lg}">
<header class="top"><div class="wrap nav"><a href="${P(lg,'home')}" class="logo">✦ ${lg==='es'?'Directorio':'Directory'}<b>IA</b></a><nav>${nav}${sw}</nav></div></header>
${crumbs?`<nav class="wrap crumbs" aria-label="${s.crumbs}">${crumbs.map((c,i)=>i<crumbs.length-1?`<a href="${c[1]}">${esc(c[0])}</a> / `:`<span>${esc(c[0])}</span>`).join('')}</nav>`:''}
<main class="wrap">${body}</main>
<footer class="foot"><div class="wrap">© ${new Date().getFullYear()} ${l.site} · <a href="${l.pre}/llms.txt">llms.txt</a> · <a href="/sitemap.xml">Sitemap</a> · <a href="${P(lg,'sponsor')}">${s.nav[3]}</a></div></footer>
<script src="/app.js" defer></script></body></html>`;
  const f=out+path+'index.html'; fs.mkdirSync(f.replace(/[^/]+$/,''),{recursive:true}); fs.writeFileSync(f,html);
}
const byS=Object.fromEntries(tools.map(t=>[t.slug,t])); const newT=NEW.map(x=>byS[x]).filter(Boolean);
for(const lg of ['es','en']){
 const l=L[lg],s=l.s,plats=l.plats,priceL=l.price,H=P(lg,'home');
 const card=t=>`<article class="card" data-name="${esc((t.name+' '+tD(t,lg)).toLowerCase())}" data-plats="${t.platforms.join(' ')}"><h3><a href="${P(lg,'tool',t.slug)}">${esc(t.name)}</a></h3><p>${esc(tD(t,lg))}</p><div class="tags"><span class="price ${t.pricing}">${priceL[t.pricing]}</span>${t.platforms.map(p=>`<span>${plats[p]}</span>`).join('')}</div></article>`;
 const grid=x=>`<div class="grid">${x.map(card).join('')}</div>`;
 const itemList=(name,x)=>({'@context':'https://schema.org','@type':'ItemList',name,inLanguage:l.html,numberOfItems:x.length,itemListElement:x.map((t,i)=>({'@type':'ListItem',position:i+1,url:SITE_URL+P(lg,'tool',t.slug),name:t.name}))});
 const nl=`<section class="news" id="newsletter"><h2>${s.nlH}</h2><p>${s.nlP}</p><form method="post" action="/api/subscribe" class="subs"><label class="sr" for="email">${s.email}</label><input id="email" type="email" name="email" required placeholder="${s.ph}"><input type="text" name="website" tabindex="-1" autocomplete="off" class="sr" aria-hidden="true"><button>${s.btn}</button></form><p class="msg" aria-live="polite"></p></section>`;
 const bar=`<div class="pills" role="group" aria-label="${s.filter}"><button class="pill on" data-p="">${s.all}</button>${PL.map(k=>`<button class="pill" data-p="${k}">${plats[k]}</button>`).join('')}</div>`;
 const catsId=lg==='es'?'categorias':'categories';
 page(lg,'home',null,{title:s.homeTitle,desc:s.homeDesc(tools.length),ld:[{'@context':'https://schema.org','@type':'WebSite',name:l.site,url:SITE_URL+H,inLanguage:l.html},itemList(l.site,tools)],
  body:`<section class="hero"><h1>${s.h1}</h1><p>${s.sub(tools.length,cats.length)}</p><input id="q" type="search" placeholder="${s.search}" aria-label="${s.searchL}"></section>
<section id="${catsId}"><h2>${s.byTask}</h2><p class="intro">${s.byTaskI}</p><div class="cats">${cats.map(c=>`<a class="cat" href="${P(lg,'cat',c.slug)}"><span>${c.icon}</span><b>${esc(cN(c,lg))}</b><small>${tools.filter(t=>t.categories.includes(c.slug)).length} ${s.tools}</small></a>`).join('')}</div></section>
<section><h2>${s.byPlat}</h2><p class="intro">${s.byPlatI}</p><p class="platlinks">${PL.map(k=>`<a href="${P(lg,'plat',k)}">${plats[k]} →</a>`).join('')}</p></section>
<section><h2>${s.newH}</h2><p class="intro">${s.newI}</p>${grid(newT.slice(0,6))}<p><a href="${P(lg,'new')}">${s.seeNew}</a></p></section>
<section id="todas"><h2>${s.allH}</h2><p class="intro">${s.allI}</p>${bar}${grid(tools)}<p class="empty" hidden>${s.none}</p></section>${nl}`});
 const catsLink=H+'#'+catsId;
 for(const c of cats){const x=tools.filter(t=>t.categories.includes(c.slug));
  page(lg,'cat',c.slug,{title:`${s.catT(cN(c,lg))} | ${l.site}`,desc:`${cD(c,lg)} ${s.sel(x.length)}`,ld:[itemList(cN(c,lg),x)],crumbs:[[s.home,H],[s.cats,catsLink],[cN(c,lg),P(lg,'cat',c.slug)]],
  body:`<h1>${c.icon} ${esc(cN(c,lg))}</h1><p class="lead">${esc(cD(c,lg))}</p>${bar}${grid(x)}<p class="empty" hidden>${s.noneP}</p>${nl}`});}
 for(const k of PL){const v=plats[k],x=tools.filter(t=>t.platforms.includes(k));
  page(lg,'plat',k,{title:`${s.platT(v)} | ${l.site}`,desc:s.platD(x.length,v),ld:[itemList(s.platT(v),x)],crumbs:[[s.home,H],[s.platsW,H],[v,P(lg,'plat',k)]],
  body:`<h1>${s.platT(v)}</h1><p class="lead">${s.platL(x.length,v)}</p>${grid(x)}`});}
 for(const t of tools){const alts=tools.filter(o=>o.slug!==t.slug&&o.categories[0]===t.categories[0]).slice(0,4);const c0=cats.find(c=>c.slug===t.categories[0]);
  page(lg,'tool',t.slug,{title:`${s.toolT(t.name)} | ${l.site}`,desc:`${tD(t,lg)} ${s.priceW}: ${priceL[t.pricing]}.`,
  ld:[{'@context':'https://schema.org','@type':'SoftwareApplication',name:t.name,url:t.url,description:tD(t,lg),applicationCategory:'MultimediaApplication',operatingSystem:'Web',inLanguage:l.html,...(t.pricing==='gratis'?{offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}}:{})}],
  crumbs:[[s.home,H],[cN(c0,lg),P(lg,'cat',c0.slug)],[t.name,P(lg,'tool',t.slug)]],
  body:`<article class="detail"><h1>${esc(t.name)}</h1><p class="lead">${esc(tD(t,lg))}</p><dl><dt>${s.useFor}</dt><dd>${t.categories.map(x=>{const c=cats.find(y=>y.slug===x);return `<a href="${P(lg,'cat',x)}">${esc(cN(c,lg))}</a>`}).join(', ')}</dd>
<dt>${s.platsL}</dt><dd>${t.platforms.map(p=>`<a href="${P(lg,'plat',p)}">${plats[p]}</a>`).join(', ')}</dd><dt>${s.model}</dt><dd><span class="price ${t.pricing}">${priceL[t.pricing]}</span> <small>${s.plansNote}</small></dd></dl>
<p><a class="btn" href="${t.url}" target="_blank" rel="noopener">${s.visit}</a></p></article><section><h2>${s.alts(esc(t.name))}</h2>${grid(alts)}</section>`});}
 page(lg,'new',null,{title:`${s.newT} | ${l.site}`,desc:s.newD,ld:[itemList(s.newT,newT)],crumbs:[[s.home,H],[s.newCrumb,P(lg,'new')]],body:`<h1>${s.newH1}</h1><p class="lead">${s.newL}</p>${grid(newT)}${nl}`});
 page(lg,'about',null,{title:`${s.aboutT} | ${l.site}`,desc:s.aboutD,crumbs:[[s.home,H],[s.aboutCrumb,P(lg,'about')]],body:`<article class="prose">${s.about}</article>`});
 page(lg,'sponsor',null,{title:`${s.spT} | ${l.site}`,desc:s.spD,crumbs:[[s.home,H],[s.spCrumb,P(lg,'sponsor')]],body:`<article class="prose">${s.sp}</article>`});
 const other=lg==='es'?'/en':'';
 fs.mkdirSync(out+l.pre,{recursive:true});
 fs.writeFileSync(out+l.pre+'/llms.txt',`# ${l.site}\n\n> ${s.llmsD(tools.length)}\n\n## ${s.cats}\n${cats.map(c=>`- [${cN(c,lg)}](${SITE_URL+P(lg,'cat',c.slug)}): ${cD(c,lg)}`).join('\n')}\n\n## ${s.platsW}\n${PL.map(k=>`- [${plats[k]}](${SITE_URL+P(lg,'plat',k)})`).join('\n')}\n\n## +\n- [${s.llmsMore[0]}](${SITE_URL+l.pre}/llms-full.txt)\n- [${s.llmsMore[1]}](${SITE_URL+P(lg,'new')})\n- [${s.llmsMore[2]}](${SITE_URL+P(lg,'about')})\n- [${s.llmsMore[3]}](${SITE_URL+other}/llms.txt)\n`);
 fs.writeFileSync(out+l.pre+'/llms-full.txt',`# ${l.site} — ${s.full}\n\n${cats.map(c=>`## ${cN(c,lg)}\n${cD(c,lg)}\n\n${tools.filter(t=>t.categories.includes(c.slug)).map(t=>`- **${t.name}** (${priceL[t.pricing]}; ${t.platforms.map(p=>plats[p]).join(', ')}): ${tD(t,lg)} ${s.site}: ${t.url} — ${s.page}: ${SITE_URL+P(lg,'tool',t.slug)}`).join('\n')}`).join('\n\n')}\n`);
}
fs.copyFileSync('src/style.css',out+'/style.css'); fs.copyFileSync('src/app.js',out+'/app.js');
fs.writeFileSync(out+'/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
const xl=a=>`<xhtml:link rel="alternate" hreflang="es" href="${SITE_URL+a.es}"/><xhtml:link rel="alternate" hreflang="en" href="${SITE_URL+a.en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL+a.es}"/>`;
fs.writeFileSync(out+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sm.flatMap(a=>[a.es,a.en].map(u=>`<url><loc>${SITE_URL+u}</loc>${xl(a)}</url>`)).join('\n')}\n</urlset>\n`);
console.log(`OK: ${tools.length} tools, ${sm.length*2} pages`);
