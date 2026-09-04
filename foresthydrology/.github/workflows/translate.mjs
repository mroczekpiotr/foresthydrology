import fs from "fs";
import path from "path";

const langs = ["en","es","de","fr","pt","id","ja","zh"];
const root = "posts/pl";
const files = fs.readdirSync(root).filter(f=>f.endsWith(".md"));
if(!process.env.OPENAI_API_KEY){
  console.log("OPENAI_API_KEY not configured; skipping translation.");
  process.exit(0);
}
for(const file of files){
  const source=fs.readFileSync(path.join(root,file),"utf8");
  for(const lang of langs){
    const out=path.join("posts",lang,file);
    if(fs.existsSync(out)) continue;
    const prompt=`Translate the following Polish scientific/popular-science article into ${lang}. Preserve Markdown, headings, formulas, links, hashtags and front matter exactly where possible. Use technically correct terminology in hydrology, forest hydrology, environmental engineering, GIS and remote sensing. Return only the translated Markdown.\n\n${source}`;
    const r=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},
      body:JSON.stringify({model:"gpt-5.6",input:prompt})
    });
    if(!r.ok){console.error(await r.text()); process.exit(1);}
    const data=await r.json();
    const text=(data.output||[]).flatMap(x=>x.content||[]).map(x=>x.text||"").join("");
    fs.mkdirSync(path.dirname(out),{recursive:true});
    fs.writeFileSync(out,text);
  }
}
