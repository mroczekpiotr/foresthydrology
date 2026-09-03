
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const LANGS = ['pl','en','es','de'];

const ui = JSON.parse(fs.readFileSync(path.join(ROOT,'_data/translations.json'),'utf8'));
const site = JSON.parse(fs.readFileSync(path.join(ROOT,'_data/site.json'),'utf8'));

function esc(s=''){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'); }

function markdown(md){
  let s = md.replace(/\r/g,'').trim();
  s = s.replace(/^### (.*)$/gm,'<h3>$1</h3>');
  s = s.replace(/^## (.*)$/gm,'<h2>$1</h2>');
  s = s.replace(/^# (.*)$/gm,'<h1>$1</h1>');
  s = s.replace(/\[VIDEO:([A-Za-z0-9_-]+)\]/g,(_,id)=>`<div class="video"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>`);
  // Tables
  s = s.replace(/((?:^\|.*\|\n)+)/gm, block => {
    const rows = block.trim().split('\n').filter(Boolean);
    if(rows.length<2) return block;
    const cells = r => r.split('|').slice(1,-1).map(x=>x.trim());
    const head = cells(rows[0]);
    const body = rows.slice(2).map(cells);
    return `<table><thead><tr>${head.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${body.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table>\n`;
  });
  s = s.replace(/^[-*] (.*)$/gm,'<li>$1</li>');
  s = s.replace(/(<li>.*<\/li>\n?)+/g,m=>`<ul>${m}</ul>`);
  s = s.replace(/^\d+\. (.*)$/gm,'<li>$1</li>');
  s = s.replace(/(<li>.*<\/li>\n?)+/g,m=>`<ol>${m}</ol>`);
  s = s.replace(/^>\s?(.*)$/gm,'<blockquote>$1</blockquote>');
  s = s.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  s = s.replace(/\*(.*?)\*/g,'<em>$1</em>');
  s = s.replace(/`([^`]+)`/g,'<code>$1</code>');
  s = s.split(/\n{2,}/).map(x=>{
    x=x.trim();
    if(!x || /^<h[1-3]|^<ul|^<ol|^<table|^<div|^<blockquote/.test(x)) return x;
    return `<p>${x.replace(/\n/g,' ')}</p>`;
  }).join('\n');
  return s;
}

function shell(lang, title, content, article=false){
  const t=ui[lang];
  const prefix=article?'../../':'';
  const articleNav=article?`<a href="../">${t['nav.articles']}</a>`:'';
  return `<!doctype html><html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${esc(site.tagline[lang])}"><title>${esc(title)} — ForestHydrology</title>
<link rel="stylesheet" href="${prefix}assets/css/style.css"></head>
<body>
<header><div class="container nav"><a class="brand" href="${prefix}${lang}/">FOREST<span>HYDROLOGY</span></a>
<nav><a href="${prefix}${lang}/">${t['nav.home']}</a><a href="${prefix}${lang}/articles/">${t['nav.articles']}</a><a href="#">${t['nav.tutorials']}</a><a href="#">${t['nav.research']}</a><a href="#">${t['nav.about']}</a>
<div class="lang">${LANGS.map(l=>`<a class="${l===lang?'active':''}" data-lang="${l}" href="${article?'../'.repeat(0):''}${l}/">${l.toUpperCase()}</a>`).join('')}</div></nav><span class="mobile">☰</span></div></header>
${content}<footer><div class="container">${t.footer}</div></footer>
<script src="${prefix}assets/js/main.js"></script></body></html>`;
}

function getArticles(){
  const base=path.join(ROOT,'articles');
  return fs.readdirSync(base).filter(x=>fs.existsSync(path.join(base,x,'metadata.json'))).map(slug=>{
    return {slug,meta:JSON.parse(fs.readFileSync(path.join(base,slug,'metadata.json'),'utf8'))};
  }).sort((a,b)=>b.meta.date.localeCompare(a.meta.date));
}

fs.rmSync(DIST,{recursive:true,force:true});
fs.mkdirSync(DIST,{recursive:true});
const articles=getArticles();

for(const lang of LANGS){
  fs.mkdirSync(path.join(DIST,lang,'articles'),{recursive:true});
  // index
  const cards=articles.map(a=>`<a class="card" href="articles/${a.slug}.html"><div class="meta">${esc(a.meta.category)} · ${a.meta.date}</div><h3>${esc(a.meta.title[lang])}</h3><p>${esc(a.meta.title[lang])}</p></a>`).join('');
  const home=`<main><section class="hero"><div class="container"><div class="eyebrow">${site.tagline[lang].split('•')[0].trim().toUpperCase()}</div><h1>${ui[lang]['home.title']}</h1><p class="lead">${ui[lang]['home.lead']}</p></div></section>
  <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">${site.tagline[lang]}</div><h2>${ui[lang]['home.latest']}</h2></div></div><div class="grid">${cards}</div></div></section></main>`;
  fs.writeFileSync(path.join(DIST,lang,'index.html'),shell(lang,ui[lang]['home.title'],home));

  const list=`<main class="section"><div class="container"><div class="eyebrow">FORESTHYDROLOGY</div><h1>${ui[lang]['nav.articles']}</h1><div class="grid">${cards}</div></div></main>`;
  fs.writeFileSync(path.join(DIST,lang,'articles','index.html'),shell(lang,ui[lang]['nav.articles'],list));
}

for(const a of articles){
  for(const lang of LANGS){
    const mdPath=path.join(ROOT,'articles',a.slug,`article.${lang}.md`);
    if(!fs.existsSync(mdPath)) continue;
    const md=fs.readFileSync(mdPath,'utf8');
    const body=`<main class="article"><a href="../../${lang}/articles/">${ui[lang]['article.back']}</a>
      <div class="meta" style="margin-top:30px">${esc(a.meta.category)} · ${a.meta.date}</div>
      <h1>${esc(a.meta.title[lang])}</h1>
      <div class="tags">${(a.meta.tags||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
      ${markdown(md)}
      <div class="sources"><strong>${ui[lang]['article.sources']}</strong></div>
    </main>`;
    fs.writeFileSync(path.join(DIST,lang,'articles',`${a.slug}.html`),shell(lang,a.meta.title[lang],body,true));
  }
}

// Root redirect
fs.writeFileSync(path.join(DIST,'index.html'),`<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=pl/"><script>location.replace('pl/')</script>`);

// robots + sitemap
fs.writeFileSync(path.join(DIST,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: https://foresthydrology.com/sitemap.xml\n`);
const urls=LANGS.flatMap(l=>[
  `https://foresthydrology.com/${l}/`,
  `https://foresthydrology.com/${l}/articles/`,
  ...articles.map(a=>`https://foresthydrology.com/${l}/articles/${a.slug}.html`)
]);
fs.writeFileSync(path.join(DIST,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${urls.length} URLs.`);
