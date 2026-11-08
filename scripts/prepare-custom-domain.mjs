import fs from "node:fs";
import path from "node:path";
const root=path.resolve(import.meta.dirname,"..");
const extensions=new Set([".html",".js",".css",".json",".svg"]);
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{if(entry.name===".git"||entry.name==="scripts")return[];const full=path.join(dir,entry.name);return entry.isDirectory()?files(full):extensions.has(path.extname(entry.name).toLowerCase())?[full]:[]})}
let changed=0;
for(const file of files(root)){
  const source=fs.readFileSync(file,"utf8");
  const updated=source.replaceAll("/Nontime/","/");
  if(updated!==source){fs.writeFileSync(file,updated);changed++}
}
console.log(`Prepared ${changed} files for nontime.fun.`);
