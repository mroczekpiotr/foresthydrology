
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const langs = {en:'English', es:'Spanish', de:'German'};
const root = process.cwd();
const apiKey = process.env.OPENAI_API_KEY;
if(!apiKey){ console.log('OPENAI_API_KEY not set; skipping automatic translation. Existing translations are kept.'); process.exit(0); }
const client = new OpenAI({apiKey});
const terms = fs.readFileSync(path.join(root,'_data/terminology.json'),'utf8');

const articleDirs = fs.readdirSync(path.join(root,'articles'));
for(const slug of articleDirs){
  const dir=path.join(root,'articles',slug);
  const source=path.join(dir,'article.pl.md');
  if(!fs.existsSync(source)) continue;
  const original=fs.readFileSync(source,'utf8');
  for(const [code,name] of Object.entries(langs)){
    const target=path.join(dir,`article.${code}.md`);
    const prompt=`Translate the following Polish scientific popular-education article into ${name}.
Preserve Markdown structure, headings, tables, formulas, URLs and special placeholders exactly.
Do not translate or alter placeholders such as [VIDEO:...].
Use consistent scientific terminology. The following bilingual terminology dictionary has priority:
${terms}

Return only the translated Markdown, with no commentary.

SOURCE:
${original}`;
    try{
      const response=await client.responses.create({
        model:'gpt-5',
        input:prompt,
        store:false
      });
      fs.writeFileSync(target,response.output_text,'utf8');
      console.log(`Translated ${slug} -> ${code}`);
    }catch(err){
      console.error(`Translation failed for ${slug} -> ${code}:`,err.message);
      process.exitCode=1;
    }
  }
}
