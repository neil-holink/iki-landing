/* Smart Router — auto-cycling deep-link routing with live redirect-speed readout */
(function router(){
  const stage=document.querySelector("#rtStage");
  if(!stage) return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wires=document.querySelector("#rtWires");
  const nodesEl=document.querySelector("#rtNodes");
  const visitor=document.querySelector("#rtVisitor");
  const packet=document.querySelector("#rtPacket");
  const speed=document.querySelector("#rtSpeed");
  const core=document.querySelector("#rtCore");

  const IC={
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M11 18h2"/></svg>',
    play:'<svg viewBox="0 0 24 24" fill="#fff"><path d="M6 4.5 19 12 6 19.5z"/></svg>',
    share:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5"/></svg>',
    globe:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg>',
    lang:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 5 5M4 14l5-5 2-3M2 5h11M8 2h1"/><path d="m21.5 22-4.5-9-4.5 9M14 18h6"/></svg>',
    bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 2 4 13h6l-1 9 8-12h-6z"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  };
  const W=920,H=500,CX=460,CY=250;
  const NODES={
    appstore:{x:720,y:120,col:"#0A84FF",ic:IC.phone,t:"App Store",d:"iOS → App Store"},
    play:{x:200,y:120,col:"#1FB35A",ic:IC.play,t:"Google Play",d:"Android → Play Store"},
    social:{x:150,y:362,col:"#7856FF",ic:IC.share,t:"Social / Landing",d:"Referral → campaign page"},
    english:{x:770,y:362,col:"#E5484D",ic:IC.globe,t:"English Campaign",d:"US → English page"},
    japanese:{x:460,y:430,col:"#FF5A1F",ic:IC.lang,t:"Japanese Portal",d:"日本語 → localized site"},
  };
  const svgns="http://www.w3.org/2000/svg";
  Object.entries(NODES).forEach(([k,n])=>{
    const ln=document.createElementNS(svgns,"line");ln.setAttribute("x1",CX);ln.setAttribute("y1",CY);ln.setAttribute("x2",n.x);ln.setAttribute("y2",n.y);ln.setAttribute("class","rwire");ln.dataset.k=k;wires.appendChild(ln);
    const el=document.createElement("div");el.className="rnode";el.dataset.k=k;el.style.left=(n.x/W*100)+"%";el.style.top=(n.y/H*100)+"%";
    el.innerHTML=`<span class="rnode__ic" style="background:${n.col}">${n.ic}</span><span class="rnode__tx"><b>${n.t}</b><small>${n.d}</small></span>`;
    nodesEl.appendChild(el);
  });
  // inbound dashed wire: visitor → router
  const inLn=document.createElementNS(svgns,"line");inLn.setAttribute("x1",460);inLn.setAttribute("y1",60);inLn.setAttribute("x2",CX);inLn.setAttribute("y2",CY);inLn.setAttribute("class","rwire");inLn.dataset.k="in";wires.insertBefore(inLn,wires.firstChild);
  const wireEls=[...wires.querySelectorAll(".rwire")];

  const SCEN=[
    {dev:"iOS",city:"San Francisco",dest:"appstore"},
    {dev:"Android",city:"Jakarta",dest:"play"},
    {dev:"Referral",city:"Berlin",dest:"social"},
    {dev:"US",city:"New York",dest:"english"},
    {dev:"日本語",city:"Tokyo",dest:"japanese"},
  ];
  function setVisitor(s){ visitor.innerHTML=`<span class="rt__pin">${IC.pin}</span>Visitor · ${s.dev} · ${s.city}`; }

  const VX=460,VY=52; // visitor pill anchor
  function setSpeed(ms){ speed.innerHTML=`${IC.bolt} Redirected in ${ms}ms`; }
  if(reduced){ setVisitor(SCEN[0]); visitor.classList.add("show"); nodesEl.querySelector('.rnode[data-k="appstore"]').classList.add("is-on"); wireEls.find(w=>w.dataset.k==="appstore")?.classList.add("is-on"); setSpeed(41); speed.classList.add("show"); return; }

  let i=0;
  function clearAll(){ nodesEl.querySelectorAll(".rnode").forEach(n=>n.classList.remove("is-on")); wireEls.forEach(w=>w.classList.remove("is-on")); wires.querySelectorAll(".rt__beam").forEach(b=>b.remove()); packet.classList.remove("go"); speed.classList.remove("show"); core.classList.remove("hit"); }
  function at(x,y,ms){ packet.style.transition=ms?`left ${ms}ms cubic-bezier(.4,0,.18,1),top ${ms}ms cubic-bezier(.4,0,.18,1)`:"none"; packet.style.left=(x/W*100)+"%"; packet.style.top=(y/H*100)+"%"; }
  function boom(){ core.classList.add("hit"); setTimeout(()=>core.classList.remove("hit"),460); }
  function step(){
    clearAll();
    const s=SCEN[i%SCEN.length]; const n=NODES[s.dest];
    setVisitor(s); visitor.classList.add("show");
    // leg 1 — visitor → router (incoming shot)
    at(VX,VY,0); packet.classList.add("go"); void packet.offsetWidth;
    const inW=wireEls.find(w=>w.dataset.k==="in");
    setTimeout(()=>{ inW&&inW.classList.add("is-on"); at(CX,CY,360); },90);   // dashed string lights, dot flies in
    setTimeout(()=>{ boom(); inW&&inW.classList.remove("is-on"); },90+360);   // 💥 router decides
    // leg 2 — router → destination (dashed string + dot flies out)
    setTimeout(()=>{ wireEls.find(w=>w.dataset.k===s.dest)?.classList.add("is-on"); at(n.x,n.y,420); },90+470);
    setTimeout(()=>{ nodesEl.querySelector(`.rnode[data-k="${s.dest}"]`)?.classList.add("is-on"); setSpeed(33+Math.floor(Math.random()*16)); speed.classList.add("show"); packet.classList.remove("go"); },90+470+440); // 💥 routed
    i++;
    setTimeout(step, 3400);
  }
  let started=false; const go=()=>{ if(started)return; started=true; step(); };
  if("IntersectionObserver" in window){ const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){go();io.disconnect();}});},{threshold:0.25}); io.observe(stage); }
  setTimeout(go,1000);
})();
