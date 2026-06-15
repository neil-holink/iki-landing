/* Hero: MANUAL shorten box + LIVE dashboard motion underneath */
const $ = (s) => document.querySelector(s);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
addEventListener("scroll", () => $("#nav").classList.toggle("s", scrollY > 8), { passive: true });

const LINKSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

function qrSvg(seed = 11) {
  const N = 25, m = 7, size = N * m; let r = "", s = seed;
  const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const blk = (x, y) => (r += `<rect x="${x*m}" y="${y*m}" width="${m}" height="${m}" rx="1.4" fill="#171717"/>`);
  const fin = (ox, oy) => { for (let y=0;y<7;y++) for (let x=0;x<7;x++) if (x===0||x===6||y===0||y===6||(x>=2&&x<=4&&y>=2&&y<=4)) blk(ox+x,oy+y); };
  const inF = (x,y) => (x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9)||(x>=9&&x<=15&&y>=9&&y<=15);
  for (let y=0;y<N;y++) for (let x=0;x<N;x++){ if(inF(x,y))continue; if(rnd()>0.52) blk(x,y); }
  fin(0,0); fin(N-7,0); fin(0,N-7);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${r}</svg>`;
}
const toastEl = $("#toast"); let tT;
function toast(m){ toastEl.textContent = m; toastEl.classList.add("show"); clearTimeout(tT); tT=setTimeout(()=>toastEl.classList.remove("show"),2200); }
const commas = (n) => n.toLocaleString("en-US");

/* ---------- MANUAL shorten box ---------- */
(function shorten(){
  const card = $("#card"), form = $("#shortForm"), input = $("#urlin"), links = $("#links");
  let busy = false;
  function slug(u){ try{ const x=new URL(u); const p=x.pathname.split("/").filter(Boolean).pop()||x.hostname.split(".")[0]; return (p.replace(/[^a-z0-9-]/gi,"").slice(0,16)||"holink").toLowerCase(); }catch{ return (u.replace(/[^a-z0-9-]/gi,"").slice(0,16)||"holink").toLowerCase(); } }
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(card.classList.contains("done")){ card.classList.remove("done"); return; }
    if(busy) return; busy=true; card.classList.add("loading");
    setTimeout(()=>{
      const sl="i.ki/"+slug(input.value||"holink");
      $("#shortText").textContent=sl;
      $("#qr").innerHTML=qrSvg()+'<span class="qr__logo">✦</span>';
      card.classList.remove("loading"); card.classList.add("done");
      const li=document.createElement("li"); li.className="new"; li.dataset.clicks="0";
      li.innerHTML=`<span class="lk__ic">${LINKSVG}</span><div class="lk__t"><b>${sl}</b><small>AI routing · just now</small></div><span class="lk__n">just now</span><span class="lk__bar"></span>`;
      links.prepend(li); while(links.children.length>4) links.lastElementChild.remove();
      busy=false;
    }, reduced?0:850);
  });
  $("#backBtn").addEventListener("click",()=>card.classList.remove("done"));
  $("#copyLink").addEventListener("click",async()=>{ try{ await navigator.clipboard.writeText("https://"+$("#shortText").textContent);}catch{} toast($("#shortText").textContent+" copied to clipboard"); });
  $("#dlBtn").addEventListener("click",()=>{ const svg=$("#qr").querySelector("svg"); if(svg){ const b=new Blob([svg.outerHTML],{type:"image/svg+xml"}); const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download="i.ki-qr.svg"; a.click(); } toast("QR code downloaded"); });
})();

/* ---------- LIVE dashboard motion (the "underneath" showcase) ---------- */
(function dashboard(){
  if(reduced) return;
  const list = $("#links"); if(!list) return;

  // seed each existing row with a numeric click value
  [...list.children].forEach(li=>{ const n=li.querySelector(".lk__n"); const v=parseInt((n.textContent||"0").replace(/[^0-9]/g,""))||0; li.dataset.clicks=v; });

  // 1) clicks tick up live on every row that has a number
  setInterval(()=>{
    [...list.children].forEach(li=>{
      const n=li.querySelector(".lk__n"); if(!n) return;
      let v=parseInt(li.dataset.clicks||"0");
      if(isNaN(v)) return;
      v += Math.floor(Math.random()*9); li.dataset.clicks=v;
      n.textContent=commas(v);
    });
  }, 900);

  // 2) new tracked links stream in (FIFO)
  const SLUGS=["spring-drop","webinar-23","ios-app","bf-sale","newsletter","referral","pricing","changelog","demo","tiktok-bio","launch-kit","promo-q3"];
  const ROUTES=["iOS → App Store","Android → Play Store","Ads → Landing page","Direct → Docs","Email → Pricing","Social → Instagram","QR → Menu","Referral → Signup"];
  const r=a=>a[Math.floor(Math.random()*a.length)];
  function newRow(){
    const v=120+Math.floor(Math.random()*900);
    const li=document.createElement("li"); li.className="new"; li.dataset.clicks=v;
    li.innerHTML=`<span class="lk__ic">${LINKSVG}</span><div class="lk__t"><b>i.ki/${r(SLUGS)}</b><small>${r(ROUTES)}</small></div><span class="lk__n">${commas(v)}</span><span class="lk__bar"></span>`;
    list.prepend(li);
    while(list.children.length>4){ const last=list.lastElementChild; last.style.transition="opacity .35s,transform .35s"; last.style.opacity="0"; last.style.transform="translateY(8px)"; setTimeout(()=>last.isConnected&&last.remove(),350); break; }
  }
  const tick=()=>{ newRow(); setTimeout(tick, 3200+Math.random()*2200); };
  setTimeout(tick, 2600);
})();
