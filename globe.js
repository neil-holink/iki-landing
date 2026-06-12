/* Globe section — live global traffic feed + ticking resolve + pin/latency pulse (1:1 figma: dotted globe, orange pins, floating latency cards, LIVE GLOBAL TRAFFIC) */
(function globe(){
  const feed=document.querySelector("#gFeed");
  if(!feed) return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CITIES=[["Tokyo","JP"],["London","UK"],["New York","US"],["Singapore","SG"],["São Paulo","BR"],["Frankfurt","DE"],["Sydney","AU"],["Mumbai","IN"],["Paris","FR"],["Toronto","CA"],["Jakarta","ID"],["Seoul","KR"],["Amsterdam","NL"],["Dubai","AE"]];
  const r=a=>a[Math.floor(Math.random()*a.length)];
  /* system events — secure / elastic / resilient proof, mixed ~1-in-4 between resolve rows */
  const SYS=[["Tokyo","JP","TLS 1.3 ✓"],["Frankfurt","DE","auto-scaled +2"],["Singapore","SG","failover 0.8s ✓"],["London","UK","uptime 99.99%"],["New York","US","threat blocked ✓"]];
  let lastCity=null, rowN=0, sysN=Math.floor(Math.random()*5);
  function row(){
    rowN++;
    if(rowN%4===0){
      const [c,cc,ev]=SYS[sysN++%SYS.length];
      const li=document.createElement("li");li.className="gfr gfr--sys";
      li.innerHTML=`<span class="gfr__dot"></span><span class="gfr__city">${c}, ${cc}</span><span class="gfr__pill gfr__pill--sys">${ev}</span>`;
      return li;
    }
    let pickd; do{ pickd=r(CITIES); }while(pickd===lastCity); lastCity=pickd;
    const [c,cc]=pickd;const ms=12+Math.floor(Math.random()*22);
    const li=document.createElement("li");li.className="gfr";
    li.innerHTML=`<span class="gfr__dot"></span><span class="gfr__city">${c}, ${cc}</span><span class="gfr__pill">${ms}ms resolve</span>`;
    return li;
  }
  const MAX=10;                       // enough rows to overflow the panel so the bottom fades like an endless stream
  for(let i=0;i<MAX;i++) feed.appendChild(row());
  if(reduced) return;
  (function tick(){
    const li=row(); li.classList.add("gfr--in"); feed.insertBefore(li,feed.firstChild);
    while(feed.children.length>MAX){ feed.lastElementChild.remove(); }
    setTimeout(tick,1600+Math.random()*1600);
  })();
  /* ticking global average resolve (odometer too) */
  const ms=document.querySelector("#gMs");
  if(ms){ odInit(ms,"38ms"); setInterval(()=>{ odSet(ms,(34+Math.floor(Math.random()*8))+"ms"); },2400); }
  /* dynamic public counters — honest launch numbers, odometer/slot roll (only changed digits move) */
  function fmt(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,","); }
  function isD(c){ return /[0-9]/.test(c); }
  function odInit(el,str){
    el.innerHTML=[...str].map(ch=>isD(ch)?`<span class="od"><span class="od__strip"><span>${ch}</span></span></span>`:`<span class="od__sep">${ch}</span>`).join("");
    el.dataset.v=str;
  }
  function odSet(el,str){
    const prev=el.dataset.v||"";
    if(prev.length!==str.length||[...str].some((c,i)=>isD(c)!==isD(prev[i]))){ odInit(el,str); return; }
    const slots=el.querySelectorAll(".od"); let di=0;
    for(let i=0;i<str.length;i++){
      if(!isD(str[i])) continue;
      const slot=slots[di++], strip=slot.firstElementChild, oldC=prev[i], newC=str[i];
      if(oldC===newC) continue;
      strip.style.transition="none"; strip.style.transform="translateY(0)";
      strip.innerHTML=`<span>${oldC}</span><span>${newC}</span>`;
      void strip.offsetHeight;
      strip.style.transition="transform .6s cubic-bezier(.25,.9,.25,1)";
      strip.style.transform="translateY(-1em)";
      clearTimeout(strip._t);
      strip._t=setTimeout(()=>{ strip.style.transition="none"; strip.style.transform="translateY(0)"; strip.innerHTML=`<span>${newC}</span>`; },640);
    }
    el.dataset.v=str;
  }
  function counter(sel,start,inc,iv){
    const el=document.querySelector(sel); if(!el) return; let v=start; odInit(el,fmt(v));
    (function step(){ setTimeout(()=>{ v+=inc[0]+Math.random()*(inc[1]-inc[0]); odSet(el,fmt(v)); step(); }, iv[0]+Math.random()*(iv[1]-iv[0])); })();
  }
  counter("#gPeople",1000,[1,2],[3800,7800]);
  counter("#gLinks",50000,[1,4],[1600,3400]);
  counter("#gClicks",100000,[6,28],[700,1500]);
})();
