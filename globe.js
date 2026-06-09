/* Globe section — live global traffic feed + ticking resolve + pin/latency pulse (1:1 figma: dotted globe, orange pins, floating latency cards, LIVE GLOBAL TRAFFIC) */
(function globe(){
  const feed=document.querySelector("#gFeed");
  if(!feed) return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CITIES=[["Tokyo","JP"],["London","UK"],["New York","US"],["Singapore","SG"],["São Paulo","BR"],["Frankfurt","DE"],["Sydney","AU"],["Mumbai","IN"],["Paris","FR"],["Toronto","CA"],["Jakarta","ID"],["Seoul","KR"],["Amsterdam","NL"],["Dubai","AE"]];
  const r=a=>a[Math.floor(Math.random()*a.length)];
  function row(){
    const [c,cc]=r(CITIES);const ms=12+Math.floor(Math.random()*22);
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
  /* ticking global average resolve */
  const ms=document.querySelector("#gMs");
  if(ms) setInterval(()=>{ ms.textContent=(34+Math.floor(Math.random()*8))+"ms"; },2400);
})();
