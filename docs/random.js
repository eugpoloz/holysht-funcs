"use strict";async function randomUserGenerator(a){function b(){var a=j,b=a.length;return Math.floor(Math.random()*b)}var c=a.filteredUsers,filteredUsers=c===void 0?[]:c,d=a.group_id,group_id=d===void 0?[1,2]:d,e=a.howMany,howMany=e===void 0?3:e,f=group_id.join(","),g=await fetch("/api.php?method=users.get&fields=user_id,username,avatar&limit=100&group_id="+f),h=await g.json(),j=h.response.users;if(0<filteredUsers.length){var n=new Set(filteredUsers);j=j.filter(function(a){var b=a.username;return!n.has(b)})}for(var k,l=new Set([]),m=0;m<howMany;m++){for(k=b();l.has(k);)k=b();l.add(k)}return j.filter(function(a,b){return l.has(b)})}