/* Demo "Complete the most complex traffic strategy" — 1:1 of the figma dashboard frame (3302:726),
   sliced into 4 auto-playing, tab-switchable product states with motion. */
(function demo(){
  const tabsWrap = document.querySelector("#dtabs");
  const panelsWrap = document.querySelector("#dpanels");
  const urlEl = document.querySelector("#dUrl");
  const stage = document.querySelector("#dstage");
  if(!tabsWrap || !panelsWrap) return;
  const tabs = [...tabsWrap.querySelectorAll(".dtab")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const urls = ["app.i.ki / workspace / acme","app.i.ki / developers / api","app.i.ki / links / launch-day","app.i.ki / analytics"];

  /* ---------- icons ---------- */
  const S = {
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    an:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    camp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    evt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 2 4 13h6l-1 9 8-12h-6z"/></svg>',
    folder:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>',
    tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="0.5" fill="currentColor"/></svg>',
    dom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"/></svg>',
    dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  };

  /* ---------- panel 0 · Links dashboard ---------- */
  const ddrows=[
    ["🛒","i.ki/summer-sale","shop.acme.com/summer-2026/","12,847","$48,210"],
    ["📱","i.ki/app-launch","apps.apple.com/app/acme","8,392","$12,860"],
    ["📰","i.ki/newsletter","acme.com/blog/launch-day","5,124","$2,140"],
    ["🎁","i.ki/refer","acme.com/refer/?r=","3,891","$8,950"],
    ["📄","i.ki/docs","docs.acme.com/quickstart","2,470","—"],
  ];
  const panelDash=`<div class="dd">
    <aside class="dd__side">
      <div class="dd__slbl">WORKSPACE</div>
      <a class="dd__nav is-on">${S.link}<span>Links</span><b class="dd__cnt">1,284</b></a>
      <a class="dd__nav">${S.an}<span>Analytics</span></a>
      <a class="dd__nav">${S.camp}<span>Campaigns</span></a>
      <a class="dd__nav">${S.evt}<span>Events</span></a>
      <div class="dd__slbl dd__slbl--2">LIBRARY</div>
      <a class="dd__nav">${S.folder}<span>Folders</span></a>
      <a class="dd__nav">${S.tag}<span>Tags</span></a>
      <a class="dd__nav">${S.dom}<span>Domains</span></a>
    </aside>
    <div class="dd__main">
      <div class="dd__top">
        <div class="dd__search">${S.search}<span>Search 1,284 links…</span></div>
        <button class="dd__new">+ New link</button>
      </div>
      <div class="dd__tbl">
        <div class="dd__tr dd__tr--h"><span>LINK</span><span>DESTINATION</span><span class="r">CLICKS</span><span class="r">REV.</span></div>
        ${ddrows.map((r,i)=>`<div class="dd__tr" style="--d:${0.12+i*0.08}s"><span class="dd__lk"><i class="dd__fav">${r[0]}</i>${r[1]}</span><span class="dd__dst">${r[2]}</span><span class="dd__clk r">${r[3]}</span><span class="dd__rev r">${r[4]}</span></div>`).join("")}
      </div>
    </div>
  </div>`;

  /* ---------- panel 1 · device / region rules (API) ---------- */
  const curl=`<span class="cl"><span class="t-o">$ curl</span> -X POST https://api.i.ki/links \\</span>
<span class="cl">  -H <span class="t-s">"Authorization: Bearer iki_live_…"</span> \\</span>
<span class="cl">  -d '{</span>
<span class="cl">    <span class="t-k">"url"</span>: <span class="t-s">"https://acme.com/launch"</span>,</span>
<span class="cl">    <span class="t-k">"alias"</span>: <span class="t-s">"launch-day"</span>,</span>
<span class="cl">    <span class="t-k">"router"</span>: {</span>
<span class="cl">      <span class="t-k">"ios"</span>: <span class="t-s">"apps.apple.com/app/acme"</span>,</span>
<span class="cl">      <span class="t-k">"android"</span>: <span class="t-s">"play.google.com/…"</span>,</span>
<span class="cl">      <span class="t-k">"default"</span>: <span class="t-s">"acme.com/launch"</span></span>
<span class="cl">    }</span>
<span class="cl">  }'</span>`;
  const res=`<span class="cl">{</span>
<span class="cl">  <span class="t-k">"id"</span>: <span class="t-s">"lnk_9zG4hX2"</span>,</span>
<span class="cl">  <span class="t-k">"short_url"</span>: <span class="t-s">"https://i.ki/launch-day"</span>,</span>
<span class="cl">  <span class="t-k">"qr_code"</span>: <span class="t-s">"https://i.ki/launch-day.png"</span>,</span>
<span class="cl">  <span class="t-k">"created_at"</span>: <span class="t-s">"2026-05-18T14:42:42Z"</span>,</span>
<span class="cl">  <span class="t-k">"analytics_url"</span>: <span class="t-s">"https://app.i.ki/…/launch-day"</span></span>
<span class="cl">}</span>`;
  const panelCode=`<div class="dc">
    <div class="dc__grid">
      <div class="dc__win">
        <div class="dc__tabs"><span class="is-on">cURL</span><span>JavaScript</span><span>Python</span><span>Go</span><span>Ruby</span></div>
        <pre class="dc__code">${curl}</pre>
      </div>
      <div class="dc__win dc__win--res">
        <div class="dc__resh"><span class="dc__ok">200 OK</span><span class="dc__ms">47ms</span></div>
        <pre class="dc__code">${res}</pre>
      </div>
    </div>
    <div class="dc__hook">
      <span class="dc__hookdot"></span>
      <span class="dc__hooktxt"><b>Webhook delivered</b> · click.created</span>
      <span class="dc__hookurl">→ https://acme.com/webhooks/iki</span>
      <span class="dc__200">200</span>
    </div>
  </div>`;

  /* ---------- panel 2 · short link + QR ---------- */
  function qr(seed=11){const N=25,m=7,size=N*m;let r="",s=seed;const rnd=()=>((s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff);const blk=(x,y)=>(r+=`<rect x="${x*m}" y="${y*m}" width="${m}" height="${m}" rx="1.4" fill="#15140f"/>`);const fin=(ox,oy)=>{for(let y=0;y<7;y++)for(let x=0;x<7;x++)if(x===0||x===6||y===0||y===6||(x>=2&&x<=4&&y>=2&&y<=4))blk(ox+x,oy+y);};const inF=(x,y)=>(x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9)||(x>=9&&x<=15&&y>=9&&y<=15);for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(inF(x,y))continue;if(rnd()>0.52)blk(x,y);}fin(0,0);fin(N-7,0);fin(0,N-7);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${r}</svg>`;}
  const panelQR=`<div class="dq">
    <div class="dq__box"><div class="qr2">${qr()}</div><span class="dq__ki">i.ki</span></div>
    <div class="dq__det">
      <span class="dq__eyebrow">SHARE ANYWHERE</span>
      <h3>One link, one scan-ready QR</h3>
      <p>Every short link ships with a branded, high-res QR — drop it on packaging, posters, or slides and track every scan back to the same analytics.</p>
      <div class="dq__link">${S.link}<span class="grow">i.ki/<b>launch-day</b></span>${S.copy}</div>
      <div class="dq__btns"><button class="dq__b ghost">Copy link</button><button class="dq__b primary">${S.dl} Download QR</button></div>
    </div>
  </div>`;

  /* ---------- panel 3 · analytics ---------- */
  const kpis=[["CLICKS (30D)","284,192","+18.4%",1],["CONVERSIONS","12,840","+9.2%",1],["REVENUE","$184,210","+24.1%",1],["AVG. CTR","8.42%","-0.8%",0]];
  const countries=[["US","United States","42.1%"],["GB","United Kingdom","14.8%"],["DE","Germany","11.2%"],["ID","Indonesia","8.4%"],["JP","Japan","6.9%"]];
  const referrers=[["twitter.com","28.4%"],["linkedin.com","19.7%"],["(direct)","17.2%"],["newsletter","14.0%"],["google.com","9.1%"]];
  const devices=[["iOS","38.4%"],["Android","28.1%"],["macOS","19.2%"],["Windows","12.0%"],["Linux","2.3%"]];
  const spark=`<svg class="da__svg" viewBox="0 0 960 240" preserveAspectRatio="none"><defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".16"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></linearGradient></defs><path class="da__area" d="M0 188 C95 184 150 168 235 160 C330 151 405 120 480 116 C560 112 660 84 740 70 C820 56 905 40 960 32 L960 240 L0 240 Z" fill="url(#dg)"/><path class="da__line" d="M0 188 C95 184 150 168 235 160 C330 151 405 120 480 116 C560 112 660 84 740 70 C820 56 905 40 960 32" fill="none" stroke="#ff5a1f" stroke-width="3"/></svg>`;
  const tile=(title,rows,opt={})=>`<div class="da__tile"><div class="da__th">${title}</div>${rows.map(r=>{
      if(opt.flag) return `<div class="da__row"><span class="da__lbl"><i class="da__cc">${r[0]}</i>${r[1]}</span><span class="da__pct">${r[2]}</span></div>`;
      if(opt.dim) return `<div class="da__row"><span class="da__lbl ${r[0]==="(direct)"?"da__dim":""}">${r[0]}</span><span class="da__pct">${r[1]}</span></div>`;
      return `<div class="da__row"><span class="da__lbl"><i class="da__dv"></i>${r[0]}</span><span class="da__pct">${r[1]}</span></div>`;
    }).join("")}</div>`;
  const panelAn=`<div class="da">
    <div class="da__kpis">${kpis.map(k=>`<div class="da__kpi"><div class="da__kl">${k[0]}</div><div class="da__kn" data-to="${k[1]}">${k[1]}</div><div class="da__kd ${k[3]?"up":"down"}">${k[2]} ${k[3]?"↑":"↓"}</div></div>`).join("")}</div>
    <div class="da__chart"><div class="da__ch"><h5>Clicks · last 30 days</h5><span class="da__live"><span class="da__pd"></span>Live</span></div>${spark}</div>
    <div class="da__tiles">${tile("TOP COUNTRIES",countries,{flag:1})}${tile("TOP REFERRERS",referrers,{dim:1})}${tile("DEVICES",devices,{})}</div>
  </div>`;

  const panels=[panelDash,panelCode,panelQR,panelAn];
  panelsWrap.innerHTML = panels.map((p,i)=>`<div class="dpanel${i===0?" is-active":""}" data-p="${i}">${p}</div>`).join("");
  const panelEls=[...panelsWrap.querySelectorAll(".dpanel")];

  /* ---------- playback ---------- */
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  let hovered=false, running=true, cur=0;
  async function idle(ms){ let t=0; while(t<ms){ await wait(90); if(!running) return; if(!hovered) t+=90; } }

  function countUp(panel){
    panel.querySelectorAll(".da__kn").forEach(el=>{
      const raw=el.dataset.to, m=raw.match(/[\d,.]+/); if(!m) return;
      const pre=raw.slice(0,m.index), suf=raw.slice(m.index+m[0].length);
      const dec=(m[0].split(".")[1]||"").length;
      const target=parseFloat(m[0].replace(/,/g,"")); let t0=null;
      const fmt=v=>{ if(dec) return v.toFixed(dec); return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); };
      function step(ts){ if(!t0)t0=ts; const p=Math.min(1,(ts-t0)/900); const e=1-Math.pow(1-p,3); el.textContent=pre+fmt(target*e)+suf; if(p<1)requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }

  function go(i){
    cur=i;
    tabs.forEach((t,k)=>t.classList.toggle("is-active",k===i));
    panelEls.forEach((p,k)=>p.classList.toggle("is-active",k===i));
    if(urlEl) urlEl.textContent=urls[i];
    const bar=tabs[i].querySelector(".dtab__bar");
    if(bar){ bar.style.animation="none"; void bar.offsetWidth; bar.style.setProperty("--barms",(i===3?4200:3400)+"ms"); bar.style.animation=""; }
    if(i===3 && !reduced) countUp(panelEls[3]);
  }

  async function loop(){
    while(running){
      go(0); if(!running)break; await idle(3600);
      go(1); if(!running)break; await idle(3800);
      go(2); if(!running)break; await idle(3400);
      go(3); if(!running)break; await idle(4200);
    }
  }

  tabs.forEach(t=>t.addEventListener("click",()=>{ go(+t.dataset.i); }));
  if(stage){ stage.addEventListener("mouseenter",()=>hovered=true); stage.addEventListener("mouseleave",()=>hovered=false); }

  if(reduced){ go(0); return; }
  go(0);
  setTimeout(loop,800);
})();
