import fs from "node:fs";
import path from "node:path";
const root=path.resolve(import.meta.dirname,"..");
const roots=["index.html","launch","coins","crew","milestones","flywheel","leaderboard","docs","assets/static/immutable/chunks"];
const extensions=new Set([".html",".js",".css"]);
const files=[];
function collect(target){const full=path.join(root,target);const stat=fs.statSync(full);if(stat.isFile()){files.push(full);return}for(const entry of fs.readdirSync(full,{withFileTypes:true})){const child=path.join(full,entry.name);if(entry.isDirectory())collect(path.relative(root,child));else if(extensions.has(path.extname(entry.name)))files.push(child)}}
for(const target of roots)collect(target);

const replacements=[
  [/What a night of(?:<br>)?Nontime ships\./gi,"What Nontime<br>ships overnight."],
  [/What a night of Nontime ships\./gi,"What Nontime ships overnight."],
  [/Six agents\.(?:<br>)?All on Nontime\./gi,"Six agents.<br>Always on."],
  [/its crew activates its Nontime crew/gi,"Nontime activates its crew"],
  [/What a night of overtime ships\./gi,"What Nontime ships overnight."],
  [/the crew is on overtime/gi,"the crew is always on"],
  [/Six agents\.\s*All on overtime\./gi,"Six agents. Always on."],
  [/Six agents\.\s*Nobody clocks out\./gi,"Six agents. Always on."],
  [/Every coin on overtime/gi,"Every coin on Nontime"],
  [/same six on overtime/gi,"same six on Nontime"],
  [/coins on overtime/gi,"coins on Nontime"],
  [/coin on overtime/gi,"coin on Nontime"],
  [/Nothing on overtime\./gi,"Nothing on Nontime yet."],
  [/Nobody is on overtime yet\./gi,"No Nontime crews are active yet."],
  [/No coins on overtime yet\./gi,"No coins on Nontime yet."],
  [/whose crews put in the most overtime/gi,"whose crews ship the most"],
  [/whose crew is putting in the overtime/gi,"whose crew is shipping the most"],
  [/puts in overtime around the clock/gi,"works around the clock"],
  [/put in overtime/gi,"keep shipping"],
  [/work overtime/gi,"work around the clock"],
  [/works overtime/gi,"works around the clock"],
  [/goes on overtime at \$10K/gi,"activates its Nontime crew at $10K"],
  [/goes on overtime/gi,"activates its Nontime crew"],
  [/go on overtime/gi,"activate Nontime"],
  [/Go overtime/gi,"Activate Nontime"],
  [/on overtime, handing/gi,"on Nontime, handing"],
  [/, on overtime\./gi,", around the clock."],
  [/their crew[’']s overtime/gi,"their crew’s active schedule"],
  [/the crew[’']s overtime/gi,"the crew’s active schedule"],
  [/crew[’']s overtime/gi,"crew’s active schedule"],
  [/Double overtime/gi,"Double output"],
  [/OVERTIME AT \$10K/g,"NONTIME AT $10K"],
  [/OVERTIME · 24\/7/g,"NONTIME · 24/7"],
  [/OVERTIME NOW/g,"NONTIME NOW"],
  [/05 OVERTIME/g,"05 NONTIME"],
  [/Overtime leaders/gi,"Nontime leaders"],
  [/Overtime begins/gi,"Nontime begins"],
  [/overtime begins/gi,"Nontime begins"],
  [/What is overtime/gi,"What is Nontime"],
  [/overtime is a launchpad/gi,"Nontime is a launchpad"],
  [/overtime treasury/gi,"Nontime treasury"],
  [/overtime account/gi,"Nontime account"],
  [/overtime never sees/gi,"Nontime never sees"],
  [/overtime\.fun/gi,"nontime.fun"],
  [/overtime/gi,"Nontime"]
];
let changed=0;
const polish=[
  [/What a night of/g,"What Nontime"],
  [/Nontime ships\./g,"ships overnight."],
  [/All on Nontime\./g,"Always on."],
  [/activates its Nontime crew at \$10K/g,"activates at $10K"],
  [/just went on Nontime\./g,"just activated Nontime."],
  [/CREW ON Nontime/g,"NONTIME CREW ACTIVE"],
  [/ON Nontime/g,"NONTIME ACTIVE"],
  [/MOST Nontime/g,"MOST ACTIVE"],
  [/"Nontime STARTS AT \$10K"/g,'"NONTIME STARTS AT $10K"'],
  [/\["\$100K","Nontime"\]/g,'["$100K","DOUBLE OUTPUT"]'],
  [/\["gm","the crew","on Nontime","for"/g,'["gm","the crew","always on","for"'],
  [/j\?"day":"Nontime"/g,'j?"day":"night"']
];
for(const file of files){let source=fs.readFileSync(file,"utf8"),updated=source;for(const [pattern,value] of replacements)updated=updated.replace(pattern,value);for(const [pattern,value] of polish)updated=updated.replace(pattern,value);if(updated!==source){fs.writeFileSync(file,updated);changed++}}
console.log(`Updated ${changed} frontend files.`);
