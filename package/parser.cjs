'use strict';

var promises = require('fs/promises');
var path = require('path');
var f = require('chalk');

var v=t=>async(o,r)=>{let i=typeof o=="string"?path.join(process.cwd(),"tests",o):path.join(process.cwd(),"tests","dev.liquid"),a=await promises.readFile(i);if(!a)throw new Error("Developer sample file could not be located in: "+i);let l=path.relative(process.cwd(),i),p=a.toString(),e=f.magenta.bold("-".repeat(50));t.log(f.blueBright(l));let s=NaN;if(typeof r=="function"){let n=await r(p);if(typeof n=="object"&&isNaN(s)){for(s=n.repeat;s>0;){Object.assign(n,await r(p));let d=n.repeat-s+1;n.logger?(t.log(e),t.log(f.magenta(`Repeat ${d} ${f.gray("of")} ${n.repeat}`)),t.log(e)):t.log(f.magenta(`Repeat ${d} ${f.gray("of")} ${n.repeat}`)),s--;}typeof n.finish=="function"&&n.finish();}t.pass();}else if(typeof o=="function"){let n=await o(p);if(typeof n=="object"&&isNaN(s)){for(s=n.repeat;s>0;){Object.assign(n,o(p));let d=n.repeat-s+1;n.logger?(t.log(e),t.log(f.magenta(`Repeat ${d} ${f.gray("of")} ${n.repeat}`)),t.log(e)):t.log(f.magenta(`Repeat ${d} ${f.gray("of")} ${n.repeat}`)),s--;}typeof n.finish=="function"&&n.finish();}t.pass();}else throw TypeError("Missing callback type")};var C={ast:void 0,stack(...t){let o=[],r;t.length===1?Array.isArray(t[0])?o=t[0]:typeof t[0]=="function"&&(r=t[0]):t.length===2&&(Array.isArray(t[0])?o=t[0]:typeof t[1]=="function"&&(r=t[1]));let i=[];for(let a=0;a<this.ast.nodes.length;a++){let l=this.ast.nodes[a],p=[l];for(let e of p){if(o.length>0){o.includes("scope")&&(console.log(f.cyan.dim(l.tag)+f.gray(" (scope)")),console.log(e.scope,`
`)),o.includes("objects")&&(console.log(f.cyan.dim(l.tag)+f.gray(" (objects)")),console.log(e.objects,`
`)),o.includes("filters")&&(console.log(f.cyan.dim(l.tag)+f.gray(" (filters)")),console.log(e.filters,`
`)),o.includes("arguments")&&(console.log(f.cyan.dim(l.tag)+f.gray(" (arguments)")),console.log(e.arguments,`
`)),typeof r=="function"&&r(e);continue}i.push({tag:e.tag,root:e.root,index:e.index,start:e.start,type:e.type,end:e.end,scope:e.scope,offsets:e.offsets,errors:e.errors,languageId:e.languageId,literal:e.regionLiteral,var:e.var,line:e.line,children:e.children.map(({tag:s})=>s),filters:e.filters||null,arguments:e.arguments||null,objects:e.objects||null,parent:e.parent.tag==="ROOT"?"ROOT":{tag:e.parent.tag,start:e.parent.start,end:e.parent.end,index:e.parent.index,root:e.parent.root,languageId:e.parent.languageId,children:e.parent.children.length}}),e.parent&&p.push(...e.children),typeof r=="function"&&r(e);}}return i},errors:t=>o=>{let r=o.diagnostics();if(r!==null)for(let i of r.diagnostics)t.log(f.gray.dim("---------------------------------------------")),t.log(f.gray("message: ")+f.red(i.message)),t.log(f.gray("capture: ")+f.yellowBright(JSON.stringify(o.getText(i.range)))),t.log(f.blue.dim("diagnostic:"),{doFormat:i.data.doFormat,range:i.range},`
`);}};var E=t=>o=>{let r=t.length;for(let i=0;i<r;i++){let a=t[i],l=i===r-1;o(a,{last:l,index:i,size:r,tokens:a.match(/{[{%][\s\S]*?[%}]}/g)});}},q=t=>async(o,r)=>{for(let i=0;i<o.length;i++){let a=o[i],l=path.join(process.cwd(),"tests","samples",t,a.endsWith(".txt")?a:a+".liquid"),p=await promises.readFile(l);if(!p)throw new Error("Sample file could not be located in: "+l);let e=p.toString();r(e);}};var D=async t=>{let o=path.join(process.cwd(),"tests","samples",t),r=await promises.readFile(o);if(!r)throw new Error("Sample file could not be located in: "+o);return r.toString()};function c(t,...o){let r=typeof t=="string"?[t]:t.raw,i=r.length,a="",l=null;for(let s=0;s<i;s++)a+=r[s].replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`"),s<o.length&&(a+=o[s]);let p=a.split(`
`),e=p.length;for(let s=0;s<e;s++){let n=p[s].match(/^(\s+)\S+/);if(n){let d=n[1].length;l=l?Math.min(l,d):d;}}if(l!==null){let s=l;a=p.map(n=>n[0]===" "?n.slice(s):n).join(`
`);}return a.trim().replace(/\\n/g,`
`)}var z=c,B=c,M=c,J=c,L=c,W=c,G=c,H=c,K=c,Q=c,U=c,V=c,X=c,Y=c,Z=c;

exports.css = L;
exports.dev = v;
exports.explore = C;
exports.forSample = q;
exports.forSnippet = E;
exports.getSample = D;
exports.html = B;
exports.js = Q;
exports.json = H;
exports.jsonc = K;
exports.jsx = U;
exports.liquid = z;
exports.md = Z;
exports.sass = G;
exports.scss = W;
exports.ts = V;
exports.tsx = X;
exports.xhtml = M;
exports.xml = J;
exports.yaml = Y;
