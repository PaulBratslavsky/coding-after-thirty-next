exports.id=227,exports.ids=[227],exports.modules={2083:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,1066,23)),Promise.resolve().then(r.t.bind(r,5197,23)),Promise.resolve().then(r.bind(r,6038))},2331:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,1902,23)),Promise.resolve().then(r.t.bind(r,7801,23)),Promise.resolve().then(r.bind(r,4155))},4155:(e,t,r)=>{"use strict";r.d(t,{Carousel:()=>m,CarouselContent:()=>p,CarouselItem:()=>h,CarouselNext:()=>v,CarouselPrevious:()=>g});var s=r(5512),l=r(8009),o=r(7203),a=r(5668),n=r(5907),i=r(4195),c=r(9383);let d=(0,r(1643).F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),u=l.forwardRef(({className:e,variant:t,size:r,asChild:l=!1,...o},a)=>{let n=l?c.DX:"button";return(0,s.jsx)(n,{className:(0,i.cn)(d({variant:t,size:r,className:e})),ref:a,...o})});u.displayName="Button";let x=l.createContext(null);function f(){let e=l.useContext(x);if(!e)throw Error("useCarousel must be used within a <Carousel />");return e}let m=l.forwardRef(({orientation:e="horizontal",opts:t,setApi:r,plugins:a,className:n,children:c,...d},u)=>{let[f,m]=(0,o.A)({...t,axis:"horizontal"===e?"x":"y"},a),[p,h]=l.useState(!1),[g,v]=l.useState(!1),b=l.useCallback(e=>{e&&(h(e.canScrollPrev()),v(e.canScrollNext()))},[]),C=l.useCallback(()=>{m?.scrollPrev()},[m]),N=l.useCallback(()=>{m?.scrollNext()},[m]),j=l.useCallback(e=>{"ArrowLeft"===e.key?(e.preventDefault(),C()):"ArrowRight"===e.key&&(e.preventDefault(),N())},[C,N]);return l.useEffect(()=>{m&&r&&r(m)},[m,r]),l.useEffect(()=>{if(m)return b(m),m.on("reInit",b),m.on("select",b),()=>{m?.off("select",b)}},[m,b]),(0,s.jsx)(x.Provider,{value:{carouselRef:f,api:m,opts:t,orientation:e||(t?.axis==="y"?"vertical":"horizontal"),scrollPrev:C,scrollNext:N,canScrollPrev:p,canScrollNext:g},children:(0,s.jsx)("div",{ref:u,onKeyDownCapture:j,className:(0,i.cn)("relative",n),role:"region","aria-roledescription":"carousel",...d,children:c})})});m.displayName="Carousel";let p=l.forwardRef(({className:e,...t},r)=>{let{carouselRef:l,orientation:o}=f();return(0,s.jsx)("div",{ref:l,className:"overflow-hidden",children:(0,s.jsx)("div",{ref:r,className:(0,i.cn)("flex","horizontal"===o?"-ml-4":"-mt-4 flex-col",e),...t})})});p.displayName="CarouselContent";let h=l.forwardRef(({className:e,...t},r)=>{let{orientation:l}=f();return(0,s.jsx)("div",{ref:r,role:"group","aria-roledescription":"slide",className:(0,i.cn)("min-w-0 shrink-0 grow-0 basis-full","horizontal"===l?"pl-4":"pt-4",e),...t})});h.displayName="CarouselItem";let g=l.forwardRef(({className:e,variant:t="outline",size:r="icon",...l},o)=>{let{orientation:n,scrollPrev:c,canScrollPrev:d}=f();return(0,s.jsxs)(u,{ref:o,variant:t,size:r,className:(0,i.cn)("absolute  h-8 w-8 rounded-full","horizontal"===n?"-left-12 top-1/2 -translate-y-1/2":"-top-12 left-1/2 -translate-x-1/2 rotate-90",e),disabled:!d,onClick:c,...l,children:[(0,s.jsx)(a.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"sr-only",children:"Previous slide"})]})});g.displayName="CarouselPrevious";let v=l.forwardRef(({className:e,variant:t="outline",size:r="icon",...l},o)=>{let{orientation:a,scrollNext:c,canScrollNext:d}=f();return(0,s.jsxs)(u,{ref:o,variant:t,size:r,className:(0,i.cn)("absolute h-8 w-8 rounded-full","horizontal"===a?"-right-12 top-1/2 -translate-y-1/2":"-bottom-12 left-1/2 -translate-x-1/2 rotate-90",e),disabled:!d,onClick:c,...l,children:[(0,s.jsx)(n.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"sr-only",children:"Next slide"})]})});v.displayName="CarouselNext"},5752:(e,t,r)=>{"use strict";r.d(t,{x:()=>w});var s=r(6301),l=r(2740),o=r(308),a=r(5635);let n=process.env.STRAPI_API_URL??"http://localhost:1337";function i({src:e,alt:t,className:r,...s}){let o=null==e?null:e.startsWith("data:")||e.startsWith("http")||e.startsWith("//")?e:`${n}${e}`;return o?(0,l.jsx)(a.default,{src:o,alt:t??"No alternative text provided",className:r,...s}):null}var c=r(5999),d=r(6536),u=r(5069),x=r(5564),f=r(930),m=r(5796),p=r(4810),h=r(6038),g=r(3327);let v=s.forwardRef(({className:e,...t},r)=>(0,l.jsx)("div",{ref:r,className:(0,g.cn)("rounded-xl border bg-card text-card-foreground shadow",e),...t}));v.displayName="Card",s.forwardRef(({className:e,...t},r)=>(0,l.jsx)("div",{ref:r,className:(0,g.cn)("flex flex-col space-y-1.5 p-6",e),...t})).displayName="CardHeader",s.forwardRef(({className:e,...t},r)=>(0,l.jsx)("div",{ref:r,className:(0,g.cn)("font-semibold leading-none tracking-tight",e),...t})).displayName="CardTitle",s.forwardRef(({className:e,...t},r)=>(0,l.jsx)("div",{ref:r,className:(0,g.cn)("text-sm text-muted-foreground",e),...t})).displayName="CardDescription";let b=s.forwardRef(({className:e,...t},r)=>(0,l.jsx)("div",{ref:r,className:(0,g.cn)("p-6 pt-0",e),...t}));function C({icon:e,className:t,size:r=24}){let s={Frame:d.A,Download:u.A,Globe:x.A,Sparkles:f.A,LayoutPanelLeft:m.A,Palette:p.A}[e];return s?(0,l.jsx)(s,{className:t,size:r}):null}function N({heading:e,subHeading:t,icon:r}){return(0,l.jsx)(h.CarouselItem,{className:"md:basis-1/2 lg:basis-1/3",children:(0,l.jsx)("div",{className:"h-full p-1",children:(0,l.jsx)(v,{className:"h-full shadow-md",children:(0,l.jsxs)(b,{className:"flex flex-col items-start gap-5 p-7",children:[(0,l.jsx)("div",{className:"inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2",children:(0,l.jsx)(C,{icon:r,className:"text-primary",size:20})}),(0,l.jsxs)("div",{children:[(0,l.jsx)("h4",{className:"mb-2 text-lg font-semibold text-foreground",children:e}),(0,l.jsx)("p",{className:"text-muted-foreground",children:t})]})]})})})})}b.displayName="CardContent",s.forwardRef(({className:e,...t},r)=>(0,l.jsx)("div",{ref:r,className:(0,g.cn)("flex items-center p-6 pt-0",e),...t})).displayName="CardFooter";var j=r(1405);let y={"blocks.hero":function({subHeading:e,heading:t,text:r,links:s,image:a}){return(0,l.jsxs)("section",{className:"container h-full flex flex-col items-center gap-10 pb-10 pt-20 sm:gap-14 lg:flex-row",children:[(0,l.jsxs)("div",{className:"flex flex-1 flex-col items-center gap-8 lg:items-start lg:gap-10",children:[(0,l.jsx)("div",{className:"flex items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60",children:(0,l.jsx)("span",{className:"text-sm text-secondary-foreground",children:e})}),(0,l.jsx)("h1",{className:"max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl sm:leading-tight lg:text-left",children:t}),(0,l.jsx)("p",{className:"max-w-md text-center text-lg text-muted-foreground lg:text-left",children:r}),(0,l.jsx)("div",{className:"grid grid-cols-2 gap-3",children:s.map((e,t)=>(0,l.jsx)(c.$,{size:"lg",asChild:!0,variant:"outline",className:"h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10",children:(0,l.jsx)(o.default,{href:e.href,target:e.isExternal?"_blank":"_self",rel:"noopener noreferrer",prefetch:!0,children:e.label})},t))})]}),(0,l.jsxs)("div",{className:"relative flex-1",children:[(0,l.jsx)(i,{alt:a.alternativeText,src:a.url,height:1080,width:1920,className:"rounded-xl border border-border shadow-lg"}),(0,l.jsx)("div",{className:"absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]"})]})]})},"blocks.card-carousel":function({cards:e}){return(0,l.jsx)("section",{className:"container flex flex-col items-center gap-6 py-24 sm:gap-7",children:(0,l.jsxs)(h.Carousel,{opts:{loop:!0,align:"start"},className:"mt-6 w-full px-4 xl:px-0",children:[(0,l.jsx)(h.CarouselPrevious,{className:"-left-6 size-7 xl:-left-12 xl:size-8"}),(0,l.jsx)(h.CarouselContent,{className:"pb-4",children:e.map(e=>(0,l.jsx)(N,{...e},e.id))}),(0,l.jsx)(h.CarouselNext,{className:"-right-6 size-7 xl:-right-12 xl:size-8"})]})})},"blocks.heading":function({heading:e,subHeading:t,text:r}){return(0,l.jsxs)("section",{className:"container flex flex-col items-center gap-6 pt-24 pb-2 sm:gap-7",children:[(0,l.jsxs)("div",{className:"flex flex-col gap-3",children:[t&&(0,l.jsx)("span",{className:"font-bold uppercase text-primary text-center",children:t}),(0,l.jsx)("h2",{className:"font-heading text-3xl font-semibold sm:text-4xl text-center",children:e})]}),r&&(0,l.jsx)("p",{className:"text-lg text-muted-foreground max-w-2xl text-center",children:r})]})},"blocks.content-with-image":function(e){if(!e)return null;let{reverse:t,image:r,heading:s,subHeading:a,text:n,link:c}=e;return(0,l.jsxs)("section",{className:(0,g.cn)("container flex flex-col gap-10 py-24 md:items-center md:gap-24",t?"md:flex-row-reverse":"md:flex-row"),children:[(0,l.jsx)("div",{className:"relative flex-1",children:(0,l.jsx)(i,{src:r.url,alt:r.name,width:713,height:497.7,className:"rounded-xl border border-border shadow-lg"})}),(0,l.jsxs)("div",{className:"flex flex-1 flex-col items-start gap-5",children:[(0,l.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,l.jsx)("span",{className:"font-bold uppercase text-primary text-left",children:a}),(0,l.jsx)("h2",{className:"font-heading text-3xl font-semibold sm:text-4xl text-left",children:s})]}),(0,l.jsx)(j.o,{className:"richtext text-lg text-muted-foreground max-w-lg text-left",children:n}),c&&(0,l.jsx)(o.default,{href:c.href,target:c.isExternal?"_blank":"_self",rel:"noopener noreferrer",prefetch:!0,children:c.label})]})]})}};function w({blocks:e}){return e.map((e,t)=>(function(e,t){let r=y[e.__component];return r?(0,s.createElement)(r,{...e,key:t}):null})(e,t))}},6038:(e,t,r)=>{"use strict";r.d(t,{Carousel:()=>l,CarouselContent:()=>o,CarouselItem:()=>a,CarouselNext:()=>i,CarouselPrevious:()=>n});var s=r(6760);let l=(0,s.registerClientReference)(function(){throw Error("Attempted to call Carousel() from the server but Carousel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/paul/programing/yt-projects/coding-after-thirty-next/src/components/ui/carousel.tsx","Carousel"),o=(0,s.registerClientReference)(function(){throw Error("Attempted to call CarouselContent() from the server but CarouselContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/paul/programing/yt-projects/coding-after-thirty-next/src/components/ui/carousel.tsx","CarouselContent"),a=(0,s.registerClientReference)(function(){throw Error("Attempted to call CarouselItem() from the server but CarouselItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/paul/programing/yt-projects/coding-after-thirty-next/src/components/ui/carousel.tsx","CarouselItem"),n=(0,s.registerClientReference)(function(){throw Error("Attempted to call CarouselPrevious() from the server but CarouselPrevious is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/paul/programing/yt-projects/coding-after-thirty-next/src/components/ui/carousel.tsx","CarouselPrevious"),i=(0,s.registerClientReference)(function(){throw Error("Attempted to call CarouselNext() from the server but CarouselNext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/paul/programing/yt-projects/coding-after-thirty-next/src/components/ui/carousel.tsx","CarouselNext")},440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(8077);let l=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]}};