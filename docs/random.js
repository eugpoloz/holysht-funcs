"use strict";async function randomUserGenerator(a){function b(){var a=d.length;return Math.floor(Math.random()*a)}for(var c,d=a.users,e=a.howMany,f=e===void 0?3:e,g=new Set([]),h=0;h<f;h++){for(c=b();g.has(c);)c=b();g.add(c)}return d.filter(function(a,b){return g.has(b)})}