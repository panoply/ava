'use strict';

var E = require('esthetic');
var j = require('ava');
var promises = require('fs/promises');
var path = require('path');
var cliHighlight = require('cli-highlight');
var t = require('chalk');

var N={keyword:t.cyanBright,built_in:t.cyanBright,type:t.cyan.dim,literal:t.hex("#ef3b7d"),number:t.green,regexp:t.red,string:t.yellowBright,subst:t.white,symbol:t.white,class:t.white,function:t.cyanBright,title:t.white,params:t.white,comment:t.gray,doctag:t.green,meta:t.white,"meta-keyword":t.white,"meta-string":t.white,section:t.white,tag:t.hex("#BECAFF"),name:e=>/(end)?comment/.test(e)?t.gray(e):t.hex("#FF93BC")(e),"builtin-name":t.white,attr:t.hex("#91EBC2"),attribute:t.white,variable:t.white,bullet:t.white,code:t.white,emphasis:t.italic,strong:t.bold,formula:t.white,link:t.underline,quote:t.white,"selector-tag":t.hex("#e75378"),"selector-id":t.hex("#9EE34F"),"selector-class":t.hex("#9EE34F"),"selector-attr":t.hex("#9EE34F"),"selector-pseudo":t.hex("#9EE34F"),"template-tag":t.white,"template-variable":t.white,addition:t.green,deletion:t.red,default:cliHighlight.plain};function p(e){return e.replace(/(\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~]/g,"")}function H(e){return t.gray(p(e))}function y(e){return /{[{%]-?|-?[%}]}/.test(e)?e:t.yellowBright(p(e))}function M(e){return p(e).replace(/-?\s*[a-zA-Z._]+/g,q).replace(/[|,.:]/g,r=>t.hex("#e75378")(p(r))).replace(/(?:=|[!=]=|[<>]=?|(?:and|or|contains|with|in|null)\b)/g,C).replace(/["'][\s\S]*?["']/g,y)}function Z(e){return /\./.test(e)?e.replace(/[a-zA-Z_.]*\.?/g,r=>t.white(r)):/break|continue|else/.test(e)?t.hex("#ef3b7d")(e):t.white(e)}function _(e){return p(e).replace(/[a-zA-Z_]+\b[:]?/g,T).replace(/[|,.:]/g,r=>t.hex("#e75378")(p(r))).replace(/["'][\s\S]*?["']/g,y)}function C(e){return /null|false|nil|true/.test(e)?t.hex("#FF91E3")(e):t.hex("#cb3f6e")(p(e))}function T(e){return /:$/.test(e)?t.hex("#7ef0ff")(e):/\./.test(e)?Z(e):t.white(e)}function q(e){return /comment|endcomment/.test(e)?t.gray(p(e)):/\s*#/.test(e)?t.gray(p(e)):t.hex("#ef3b7d")(e)}function W(e){return e.replace(/(?<=\s{2,})[a-zA-Z0-9][a-zA-Z0-9_-]+/g,r=>t.hex("#ef3b7d")(p(r))).replace(/\B[#.][a-zA-Z#_.-]+/g,r=>t.hex("#9EE34F")(p(r)))}function I(e){return e.replace(/(?<=\s+)[a-zA-Z-]+(?=:)/g,r=>t.hex("#81D4FA")(p(r)))}function J(e){return e=e.replace(/^.*?(?={)/gm,W).replace(/(?<={)[\s\S]+?(?=})/g,I).replace(/--[a-zA-Z0-9_-]+/g,r=>t.whiteBright(p(r))).replace(/(?<=[:]\s)[a-z]+(?=;)/g,r=>t.yellowBright(p(r))).replace(/\s(\d+|\d+[a-z]+)/g,r=>t.magenta(p(r))),e}function m(e,r={}){return Object.assign(r,{theme:N,language:"html",ignoreIllegals:!0}),cliHighlight.highlight(e,r).replace(/(?<={%-?\s*style\s*-?%})[\s\S]+?(?={%-?\s*endstyle\s*-%})/g,J).replace(/(?<={%-?)[\s\S]*?(?=-?%})/g,M).replace(/(?<={{)[\s\S]*?(?=}})/g,_).replace(/{{-|{%-|{{|{%|}}|%}|-}}|-%}/g,H)}var se=(e,r)=>{let a=typeof e=="string"?path.join(process.cwd(),"tests",e):path.join(process.cwd(),"tests","dev.txt");return j(t.hex("#ff75d1")("\xC6STHETIC DEVELOPMENT"),async s=>{let i=await promises.readFile(a);if(!i)throw new Error("Sample file could not be located in: "+a);let g=path.relative(process.cwd(),a),c=i.toString(),f=t.magenta.bold("-".repeat(50)),{language:l}=E.rules();s.log(t.blueBright(g));let o=NaN;if(typeof r=="function"){let n=await r(c,m);if(typeof n=="object"&&isNaN(o)){for(o=n.repeat||0;o>0;)Object.assign(n,await r.bind(s)(n.source,m)),n.logger?(s.log(f),s.log(t.magenta(`Repeat ${n.repeat-o+1} ${t.gray("of")} ${n.repeat}`)),s.log(f),n.colors===!0?s.log(m(n.source,{language:l})):s.log(n.source)):s.log(t.magenta(`Repeat ${n.repeat-o+1} ${t.gray("of")} ${n.repeat}`)),o--;n.logger!==!0&&(n.colors===!0?s.log(m(n.source,{language:E.rules().language})):s.log(n.source)),typeof n.finish=="function"&&n.finish();}s.pass();}else if(typeof e=="function"){let n=await e(c,m);if(typeof n=="object"&&isNaN(o)){for(o=n.repeat;o>0;)Object.assign(n,e(n.source,m)),n.logger?(s.log(f),s.log(t.magenta(`Repeat ${n.repeat-o+1} ${t.gray("of")} ${n.repeat}`)),s.log(f),n.colors===!0?s.log(m(n.source,{language:l})):s.log(n.source)):s.log(t.magenta(`Repeat ${n.repeat-o+1} ${t.gray("of")} ${n.repeat}`)),o--;n.logger!==!0&&(n.colors===!0?s.log(m(n.source,{language:l})):s.log(n.source)),typeof n.finish=="function"&&n.finish();}s.pass();}else throw TypeError("Missing callback type")})};var R=(e,r)=>[e,"```js",JSON.stringify(r,null,2),"```"].join(`
`),v=e=>[`<h3>Rules</h3>
`,"```js",JSON.stringify(e,null,2),"```"].join(`
`),F=e=>r=>async a=>{let s=e.length;for(let i=0;i<s;i++){let g=e[i],c=i===s-1;a.bind({index:i,size:s,last:c})(g,r,v(r));}};F.files=e=>r=>async a=>{let s=e.length;for(let i=0;i<s;i++){let g=e[i],c=i===s-1,f=path.join(path.dirname(j.meta.file),"samples",g),l=f.slice(f.indexOf("/")),o=await promises.readFile(l);if(!o)throw new Error("Sample file could not be located in: "+l);let n=o.toString();if(!n.trimStart().startsWith("~~~"))throw new Error([`

Missing description in sample file - Descriptions are required for file samples`,`and must be present and contained between tripple tildes, eg:

~~~
Some Description
~~~`].join(`
`));let b=n.indexOf("~~~",3);if(b<0)throw new Error("Missing closing description dashes, eg: ~~~");let w=`### Snapshot ${i+1}
`+n.slice(3,b).trim(),d=n.slice(b+3).trimStart();a.bind({index:i,size:s,last:c})(d,r,R(w,r));}};var V=e=>r=>{let a=e.length;for(let s=0;s<a;s++){let i=e[s],g=s===a-1;r.bind({last:g,index:s,size:a})(i[0],i[1]);}},$=e=>r=>a=>{if(!Array.isArray(r))throw new Error(['When using the "forRule" runner, you must provide an array list of rules.','Otherwise use the "forSample" or "forAssert" runners.'].join(`
`));let s={samples:e.length,rules:r.length};for(let i=0;i<s.samples;i++){let g=e[i];for(let c=0;c<s.rules;c++)a.bind({size:s,index:{sample:i,rule:c}})(g,r[c],v(r[c]));}};$.files=e=>r=>async a=>{if(!Array.isArray(r))throw new Error(['When using the "forRule" runner, you must provide an array list of rules.','Otherwise use the "forSample" or "forAssert" runners.'].join(`
`));let s={samples:e.length,rules:r.length};for(let i=0;i<s.samples;i++){let g=e[i],c=path.join(path.dirname(j.meta.file),"samples",g),f=c.slice(c.indexOf("/")),l=await promises.readFile(f);if(!l)throw new Error("Sample file could not be located in: "+f);let o=l.toString();if(!o.trimStart().startsWith("~~~"))throw new Error([`

Missing description in sample file - Descriptions are required for file samples`,`and must be present and contained between tripple tildes, eg:

~~~
Some Description
~~~`].join(`
`));let x=o.indexOf("~~~",3);if(x<0)throw new Error("Missing closing description dashes, eg: ~~~");let b=`### Snapshot ${i+1}
`+o.slice(3,x).trim(),w=o.slice(x+3).trimStart();for(let d=0;d<s.rules;d++)a.bind({size:s,index:{sample:i,rule:d}})(w,r[d],R(b,r[d]));}};function u(e,...r){let a=typeof e=="string"?[e]:e.raw,s=a.length,i="",g=null;for(let l=0;l<s;l++)i+=a[l].replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`"),l<r.length&&(i+=r[l]);let c=i.split(`
`),f=c.length;for(let l=0;l<f;l++){let o=c[l].match(/^(\s+)\S+/);if(o){let n=o[1].length;g=g?Math.min(g,n):n;}}if(g!==null){let l=g;i=c.map(o=>o[0]===" "?o.slice(l):o).join(`
`);}return i.trim().replace(/\\n/g,`
`)}var ge=u,pe=u,ue=u,fe=u,he=u,me=u,de=u,be=u,xe=u,we=u,ye=u,Ee=u,Se=u,je=u,ze=u;

exports.css = he;
exports.dev = se;
exports.forAssert = V;
exports.forRule = $;
exports.forSample = F;
exports.html = pe;
exports.js = we;
exports.json = be;
exports.jsonc = xe;
exports.jsx = ye;
exports.liquid = ge;
exports.md = ze;
exports.sass = de;
exports.scss = me;
exports.ts = Ee;
exports.tsx = Se;
exports.xhtml = ue;
exports.xml = fe;
exports.yaml = je;
