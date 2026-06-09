/* Testimonials — looping B2B + B2C marquee columns (left scrolls down, right scrolls up)
   + autoplay 5-creator video carousel with progress timer, clickable dashes, click-to-pause. */
(function testi(){
  const L=document.getElementById("tmarqL"),R=document.getElementById("tmarqR"),V=document.getElementById("tvidc");
  if(!L||!R||!V) return;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PIC={
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"/></svg>',
    tt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.35 2.2 1.6 3.6 3.5 3.9v2.7c-1.25 0-2.45-.4-3.5-1.05v6.05a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6.02.9.07v2.8a2.85 2.85 0 1 0 2 2.72V3z"/></svg>',
    fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>'
  };

  const left=[
    {name:"Guillermo Rauch",type:"b2b",role:"CEO, Vercel",company:"▲ Vercel",av:"img/testi/guillermo.png",q:"The i.ki team absolutely nailed combining smart routing and AI link suggestions in a delightful experience."},
    {name:"Vlad Matsiiako",type:"b2c",role:"SaaS Influencer",followers:"500K followers",handle:"@vladm",plat:"ig",av:"img/testi/vlad.png",q:"i.ki is absolutely amazing — my audience clicks way more since I switched, and the links just look gorgeous."},
    {name:"Charly Poly",type:"b2b",role:"CEO, Defer",company:"Defer",av:"img/testi/charly.png",q:"Why spend a week wiring up tracking when i.ki gives you smart links + analytics in minutes? Total game-changer."},
    {name:"Mara Lin",type:"b2c",role:"Content Creator",followers:"740K followers",handle:"@maracreates",plat:"tt",av:"img/avatars/jessica.jpg",q:"Every link in my bio is an i.ki now. The AI names convert better and I finally see what's actually working."},
    {name:"Devon Park",type:"b2b",role:"Growth Lead, Linear",company:"Linear",av:"img/avatars/logan.jpg",q:"We moved every campaign link to i.ki. The conversion routing alone paid for itself in a week."}
  ];
  const right=[
    {name:"Zeno Rocha",type:"b2c",role:"Content Creator",followers:"1.2M followers",handle:"@zenroch",plat:"tt",av:"img/testi/zeno.png",q:"A must-have for any creator. Branded links plus real-time analytics feel years ahead of what I used before."},
    {name:"Adam Carrigan",type:"b2b",role:"Co-founder, MindsDB",company:"mindsdb",av:"img/testi/adam.png",q:"My team loves i.ki! Great product and a super supportive team."},
    {name:"Ashley Mulligan",type:"b2c",role:"Mega Influencer",followers:"2.7M followers",handle:"@ashmul",plat:"fb",av:"img/testi/ashley.png",q:"i.ki was the only tool that checked all the boxes — smart routing, QR, and analytics my whole team uses."},
    {name:"Sofia Rivas",type:"b2b",role:"Head of Growth, Ramp",company:"Ramp",av:"img/avatars/sophie.jpg",q:"The smart router sends every visitor to the best-converting page automatically. Our ROAS jumped fast."},
    {name:"Kai Tan",type:"b2c",role:"Growth Creator",followers:"920K followers",handle:"@kaigrows",plat:"ig",av:"img/avatars/ethanb.jpg",q:"Posted one i.ki link to my 900K and the dashboard lit up. Best link tool I've used, full stop."}
  ];

  function card(t){
    const meta=t.type==="b2c"?`<i>${t.role} · ${t.followers}</i>`:`<i>${t.role}</i>`;
    const badge=t.type==="b2c"
      ? `<span class="tcard__handle"><span class="tcard__pic tcard__pic--${t.plat}">${PIC[t.plat]}</span>${t.handle}</span>`
      : `<span class="tcard__logo tlogo--word">${t.company}</span>`;
    return `<article class="tcard"><header class="tcard__h"><img class="tcard__av" src="${t.av}" alt="" loading="lazy"/><span class="tcard__id"><b>${t.name}</b>${meta}</span>${badge}</header><p class="tcard__q">${t.q}</p></article>`;
  }
  const build=arr=>arr.map(card).join("");
  L.innerHTML=build(left)+build(left);     // duplicated for a seamless loop
  R.innerHTML=build(right)+build(right);

  /* ---- video carousel ---- */
  /* AI-UGC creator video reviews — real b-roll clips, muted + looping, with review captions */
  const vids=[
    {name:"Charlotte",sub:"iKi Indonesia",av:"img/testi/charlotte-av2.jpg",video:"img/testi/charlotte.mp4",poster:"img/testi/charlotte-pv.jpg",q:"Since i.ki, my smart links route fans to the right page automatically — my shop conversions doubled."},
    {name:"Marcus Bell",sub:"@marcusbell",av:"img/testi/marcus-av.jpg",video:"img/testi/marcus.mp4",poster:"img/testi/marcus.jpg",q:"Every campaign link goes through i.ki now — the AI picks the slug, smart routing does the rest. My CTR jumped."},
    {name:"Hannah Cole",sub:"@hannahcreates",av:"img/testi/hannah-av.jpg",video:"img/testi/hannah.mp4",poster:"img/testi/hannah.jpg",q:"Swapped all my bio links to i.ki. The analytics are gorgeous and I finally know what my audience clicks."},
    {name:"Diego Santos",sub:"@diegoonweb",av:"img/testi/diego-av.jpg",video:"img/testi/diego.mp4",poster:"img/testi/diego.jpg",q:"One i.ki link routes my followers by device and country automatically. Honestly, it feels like cheating."},
    {name:"Eleanor Vance",sub:"@eleanorbuilds",av:"img/testi/priya-av.jpg",video:"img/testi/priya.mp4",poster:"img/testi/priya.jpg",q:"I run my whole audience through i.ki now — branded links, QR, and analytics I actually understand."}
  ];
  const PLAYI='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const slide=v=>`<div class="tvslide tvslide--photo"${v.video?"":` style="background-image:url(${v.poster})"`}>${v.video?`<video class="tvslide__vid" src="${v.video}" poster="${v.poster}" muted loop playsinline preload="metadata"></video>`:""}<div class="tvslide__idtl"><img src="${v.av}" alt="" loading="lazy"/><span><b>${v.name}</b><i>${v.sub}</i></span></div><p class="tvslide__cap">${v.q}</p></div>`;
  V.innerHTML=`<div class="tvidc__stage">${vids.map(slide).join("")}</div>`
    +`<div class="tvidc__bars">${vids.map(()=>'<span class="tvidc__bar"><i></i></span>').join("")}</div>`
    +`<div class="tvidc__overlay"><button class="tvidc__playbtn" aria-label="Play">${PLAYI}</button></div>`;

  const slides=[...V.querySelectorAll(".tvslide")],bars=[...V.querySelectorAll(".tvidc__bar")];
  let idx=0,playing=!reduce,elapsed=0,last=null,visible=false;const DUR=7000;
  function show(i){ idx=i; elapsed=0; slides.forEach((s,k)=>s.classList.toggle("is-on",k===i)); bars.forEach((b,k)=>{b.firstChild.style.width=k<i?"100%":"0%";});
    slides.forEach((s,k)=>{const vd=s.querySelector("video"); if(!vd)return; if(k===i){ try{vd.currentTime=0;}catch(e){} if(playing&&visible)vd.play().catch(()=>{}); } else vd.pause(); }); }
  function setPaused(p){ V.classList.toggle("is-paused",p); const vd=slides[idx].querySelector("video"); if(vd){ if(p)vd.pause(); else if(visible)vd.play().catch(()=>{}); } }
  show(0); setPaused(!playing);
  bars.forEach((b,k)=>b.addEventListener("click",e=>{ e.stopPropagation(); playing=true; show(k); setPaused(false); }));
  V.addEventListener("click",()=>{ playing=!playing; setPaused(!playing); });
  function frame(ts){ if(last==null)last=ts; const dt=ts-last; last=ts; if(playing&&visible){ elapsed+=dt; bars[idx].firstChild.style.width=Math.min(100,elapsed/DUR*100)+"%"; if(elapsed>=DUR) show((idx+1)%vids.length); } requestAnimationFrame(frame); }
  new IntersectionObserver(es=>{ visible=es[0].isIntersecting; const vd=slides[idx].querySelector("video"); if(vd){ if(visible&&playing)vd.play().catch(()=>{}); else vd.pause(); } },{threshold:.2}).observe(V);
  requestAnimationFrame(frame);
})();
