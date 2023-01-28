#!/usr/bin/env node
'use strict';

var a = require('prompts');
var h = require('minimist');
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');

(async()=>{console.log("\x1B[H\x1B[2J");let l=h(process.argv.slice(1),{alias:{tests:"t"},default:{cwd:path.join(process.cwd(),"tests")},string:["t"]});function p(t){let n=[],s=fs.readFileSync(path.join(process.cwd(),t)).toString().matchAll(/(?<=(?!test\.skip)^test(?:\.\w+)?\(['"]).*?(?=['"])/gm);for(let o of s)n.push({title:o[0],value:`--match='${o}'`,description:t.slice(6)});return n}function f(){let t=[],n=l.tests.split(",");for(let e of n)if(!!fs.existsSync(path.join(l.cwd,e))){console.log(e);for(let s of fs.readdirSync(path.join(l.cwd,e)).filter(o=>!o.startsWith(".")))if(/\.test\.(mjs|js|ts|cjs)$/.test(s))t.push({title:`${s}`,description:`${e}`,value:`tests/${e}/${s}`});else {if(!fs.existsSync(path.join(l.cwd,e,s)))continue;for(let o of fs.readdirSync(path.join(l.cwd,e,s)).filter(u=>!u.startsWith(".")))/\.test\.(mjs|js|ts|cjs)$/.test(o)&&t.push({title:`${o}`,description:`${e}/${s}`,value:`tests/${e}/${s}/${o}`});}}return t}let i=await a([{type:"autocomplete",name:"test",message:"Select Test",limit:50,choices:f()},{type:"select",name:"command",message:"Command",choices:[{title:"Watch",value:"--watch --colors",description:"Invoke with watch mode"},{title:"Run",value:"--colors",description:"Run all tests"},{title:"Specific",value:"find",description:"Run a specific test"}]}]);if(i.command==="find"){let t=await a([{type:"autocomplete",name:"test",message:"Choose Test",limit:50,choices:p(i.test)},{type:"select",name:"command",message:"Command",choices:[{title:"Watch",value:"--watch --colors",description:"Invoke with watch mode"},{title:"Run",value:"--colors",description:"Run all tests"}]}]);if(t.command===void 0){console.log(`
Exited, no tests will run
`);return}child_process.spawn("ava",[i.test,...t.test.split(" "),...t.command.split(" ")],{stdio:"inherit"}).on("exit",function(n){n||console.log("Exited Spawned AVA Process");});}else {if(i.command===void 0){console.log(`
Exited, no tests will run
`);return}child_process.spawn("ava",[i.test,...i.command.split(" ")],{stdio:"inherit"}).on("exit",function(t){t||console.log("Exited Spawned AVA Process");});}})();
