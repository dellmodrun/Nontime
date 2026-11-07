import fs from "node:fs";
import path from "node:path";

const root=path.resolve(import.meta.dirname,"..");
const htmlFiles=["index.html","launch/index.html","coins/index.html","crew/index.html","milestones/index.html","flywheel/index.html","leaderboard/index.html","docs/index.html"];

for(const relative of htmlFiles){
  const file=path.join(root,relative);
  let html=fs.readFileSync(file,"utf8");
  html=html
    .replace(/<span><svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 20 19"[\s\S]*?<\/svg><\/span>overtime/g,'<span><img src="/Nontime/nontime-logo.png" alt=""></span>Nontime')
    .replace(/aria-label="overtime"/g,'aria-label="Nontime"')
    .replace(/aria-label="overtime on X"/g,'aria-label="Nontime on X"')
    .replace(/<title>overtime<\/title>/gi,'<title>Nontime</title>')
    .replace(/<title>([^<]+) · overtime<\/title>/gi,'<title>$1 · Nontime</title>')
    .replace(/(<meta property="og:title" content=")overtime("\s*\/?>)/gi,'$1Nontime$2')
    .replace(/(<meta property="og:site_name" content=")overtime("\s*\/?>)/gi,'$1Nontime$2')
    .replace(/(<meta name="twitter:title" content=")overtime("\s*\/?>)/gi,'$1Nontime$2')
    .replace(/<link rel="preload" as="image" href="\/Nontime\/assets\/static\/immutable\/chunks\/mark\.svg">/g,'<link rel="preload" as="image" href="/Nontime/nontime-logo.png">')
    .replace(/<link rel="icon" href="\/Nontime\/assets\/static\/immutable\/chunks\/mark\.svg" type="image\/svg\+xml">/g,'<link rel="icon" href="/Nontime/nontime-logo.png" type="image/png">')
    .replace(/<span>overtime\.fun<\/span>/g,'<span>nontime.fun</span>');
  fs.writeFileSync(file,html);
}

const runtime=path.join(root,"assets/static/immutable/chunks/1qchkddf4806h.js");
let js=fs.readFileSync(runtime,"utf8");
const oldBrand='(0,r.jsxs)(n.default,{className:"brand",href:"/","aria-label":"overtime",children:[(0,r.jsx)("span",{dangerouslySetInnerHTML:{__html:(0,l.pix)(l.MARK_ART,10,"var(--hi)","var(--ink)")}}),"overtime"]})';
const newBrand='(0,r.jsxs)(n.default,{className:"brand",href:"/","aria-label":"Nontime",children:[(0,r.jsx)("span",{children:(0,r.jsx)("img",{src:"/Nontime/nontime-logo.png",alt:""})}),"Nontime"]})';
if(js.includes(oldBrand))js=js.replace(oldBrand,newBrand);
else if(!js.includes('src:"/Nontime/nontime-logo.png"'))throw Error("Runtime brand component was not found.");
js=js.replaceAll('"aria-label":"overtime on X"','"aria-label":"Nontime on X"').replaceAll('{children:"overtime.fun"}','{children:"nontime.fun"}');
fs.writeFileSync(runtime,js);

const cssFile=path.join(root,"assets/static/immutable/chunks/2gdc9udo1mjqi.css");
let css=fs.readFileSync(cssFile,"utf8");
if(!css.includes(".brand img{"))css+='\n.brand span{display:block;width:34px;height:34px}.brand img{display:block;width:34px;height:34px;object-fit:cover;border-radius:9px}\n';
fs.writeFileSync(cssFile,css);

const pagesJs=path.join(root,"assets/static/immutable/chunks/pages.js");
fs.writeFileSync(pagesJs,fs.readFileSync(pagesJs,"utf8").replaceAll('overtime.fun/','nontime.fun/'));

const sceneFile=path.join(root,"assets/static/immutable/chunks/15aj5z832go4j.js");
let scene=fs.readFileSync(sceneFile,"utf8");
scene=scene
  .replace('fillText("overtime",10,100)','fillText("nontime",10,100)')
  .replace('fillText("OVERTIME NOW",62,47)','fillText("NONTIME NOW",62,47)')
  .replace('["gn","still up","overtime","up only"]','["gn","still up","nontime","up only"]');
fs.writeFileSync(sceneFile,scene);
