(()=>{var e={};e.id=888,e.ids=[888],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},9289:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>w,routeModule:()=>x,serverHooks:()=>m,workAsyncStorage:()=>v,workUnitAsyncStorage:()=>h});var s={};t.r(s),t.d(s,{GET:()=>l,dynamic:()=>d});var n=t(2706),a=t(8203),o=t(5994),i=t(9187),c=t(4512),p=t(3327);let u={maxAge:604800,path:"/",domain:process.env.HOST??"localhost",httpOnly:!0,secure:!0},d="force-dynamic";async function l(e){let{searchParams:r,pathname:t}=new URL(e.url),s=r.get("access_token"),n=t.split("/")[2];if(!s)return i.NextResponse.redirect(new URL("/",e.url));let a=new URL((0,p.P)()+`/api/auth/${n}/callback`);a.searchParams.append("access_token",s);let o=await fetch(a.href),d=await o.json();return(await (0,c.UL)()).set("jwt",d.jwt,u),i.NextResponse.redirect(new URL("/",e.url))}let x=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/connect/[provider]/redirect/route",pathname:"/connect/[provider]/redirect",filename:"route",bundlePath:"app/connect/[provider]/redirect/route"},resolvedPagePath:"/Users/paul/programing/yt-projects/coding-after-thirty-next/src/app/connect/[provider]/redirect/route.tsx",nextConfigOutput:"",userland:s}),{workAsyncStorage:v,workUnitAsyncStorage:h,serverHooks:m}=x;function w(){return(0,o.patchFetch)({workAsyncStorage:v,workUnitAsyncStorage:h})}},6487:()=>{},8335:()=>{},3327:(e,r,t)=>{"use strict";t.d(r,{P:()=>o,cn:()=>a});var s=t(3673),n=t(7317);function a(...e){return(0,n.QP)((0,s.$)(e))}function o(){return process.env.STRAPI_API_URL??"http://localhost:1337"}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,884,452],()=>t(9289));module.exports=s})();