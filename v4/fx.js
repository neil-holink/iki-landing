/* Capabilities — dub-style auto-cycling feature cards: shared animated stage + 4 card-tabs.
   1 AI Analytics Insights · 2 Custom Link Previews (creator) · 3 Real-time Webhooks · 4 Audit Log */
(function fx(){
  const stage=document.querySelector("#fxStage"), tabsEl=document.querySelector("#fxTabs"), card=document.querySelector("#fxCard");
  if(!stage||!tabsEl) return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IC={
    spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8z"/><path d="M19 14l.9 2.9 3.1 1-3.1 1-.9 2.9-.9-2.9-3.1-1 3.1-1z" opacity=".55"/></svg>',
    img:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.6"/><path d="m21 15-4.2-4.2L9 18.6"/></svg>',
    hook:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16.9a3.2 3.2 0 1 1-2.7 1.5l-3-5.2"/><path d="M8.7 7.5a3.2 3.2 0 1 1 4.6-2.9c0 .6-.2 1.2-.5 1.7l3 5.1"/><path d="M5.9 13.6a3.2 3.2 0 1 0 3.2 5.5h6"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5.5V11c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5.5z"/><path d="M9 11.5l2 2 4-4.5"/></svg>',
    arr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 6l6 6-6 6"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    qr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 21h.01M21 17v.01M17 21v.01"/></svg>',
    dollar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1-1.3-1.8-3-1.8s-3 .8-3 1.8 1 1.6 3 2c2 .4 3 1 3 2.1 0 1.1-1.3 1.9-3 1.9s-3-.8-3-1.8"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/></svg>',
  };
  const CARDS=[
    {k:"ins",ic:IC.spark, t:"AI Analytics Insights", d:"Campaign summaries, opportunity detection, anomaly alerts, next-step recommendations"},
    {k:"og", ic:IC.img,   t:"Custom Link Previews",  d:"Control the OG title, description & image — look right on X, TikTok & LinkedIn"},
    {k:"wh", ic:IC.hook,  t:"Real-time Webhooks",    d:"Click, scan & sale events pushed to Slack, Zapier or your API — signed, with retries"},
    {k:"aud",ic:IC.shield,t:"Audit Log",             d:"Every change tracked — who, what & when, IP and device, instant session revoke"},
  ];

  /* ===== stage 1: AI analytics insights ===== */
  function stIns(){
    return `<div class="fxins">
      <div class="fxins__left">
        <div class="fxins__kpis">
          <div class="fxins__kpi"><i>Clicks · 7d</i><b>48,210</b><em>▲ 12%</em></div>
          <div class="fxins__kpi"><i>Conversion</i><b>6.8%</b><em>▲ 0.9pt</em></div>
        </div>
        <svg class="fxins__svg" viewBox="0 0 360 130" preserveAspectRatio="none">
          <path class="fxins__area" d="M0,102 C30,96 52,84 82,86 C112,88 132,62 162,58 C192,54 212,70 242,50 C272,32 304,42 334,22 L360,16 L360,130 L0,130 Z"/>
          <path class="fxins__line" d="M0,102 C30,96 52,84 82,86 C112,88 132,62 162,58 C192,54 212,70 242,50 C272,32 304,42 334,22 L360,16"/>
        </svg>
        <span class="fxins__read">${IC.spark} AI read <b>48,210</b> clicks in 1.2s</span>
      </div>
      <div class="fxins__right">
        <div class="fxins__ask"><span class="fxins__askic">${IC.spark}</span><span class="fxins__askq" id="fxinsQ"></span><i class="fxins__caret" id="fxinsCaret"></i><button class="fxins__go" id="fxinsGo" type="button">${IC.arr}</button></div>
        <div class="fxins__cards${reduced?' is-gen':''}" id="fxinsCards">
          <div class="fxinsc" style="--d:.12s"><div class="fxinsc__top"><span class="fxinsc__tag">✦ Opportunity</span><span class="fxinsc__pill">+18% est. conversions</span></div><p><b>TikTok converts 2.1×</b> your average — shift spend to it for summer-sale.</p></div>
          <div class="fxinsc" style="--d:.5s"><div class="fxinsc__top"><span class="fxinsc__tag fxinsc__tag--fix">Fix</span><span class="fxinsc__pill fxinsc__pill--red">Recover 312 clicks</span></div><p><b>i.ki/old-promo</b> destination 404s — 312 clicks lost this week.</p></div>
          <div class="fxinsc" style="--d:.88s"><div class="fxinsc__top"><span class="fxinsc__tag fxinsc__tag--time">Timing</span><span class="fxinsc__pill fxinsc__pill--teal">Best window 20:00 JST</span></div><p>Your JP audience peaks at <b>8 PM</b> — schedule the drop then.</p></div>
        </div>
      </div>
    </div>`;
  }
  function insBeat(p,my){
    const q=p.querySelector("#fxinsQ"), caret=p.querySelector("#fxinsCaret"), go=p.querySelector("#fxinsGo"), cards=p.querySelector("#fxinsCards");
    const ASK="Where can I improve summer-sale this week?";
    let i=0;
    const type=setInterval(()=>{ if(my!==gen){clearInterval(type);return;} i+=2; q.textContent=ASK.slice(0,i);
      if(i>=ASK.length){ clearInterval(type); q.textContent=ASK;
        setTimeout(()=>{ if(my!==gen)return; go.classList.add("is-busy"); go.innerHTML='<span class="pvspin"></span>'; caret.style.display="none"; },300);
        setTimeout(()=>{ if(my!==gen)return; go.classList.remove("is-busy"); go.innerHTML=IC.check; go.classList.add("is-done"); cards.classList.add("is-gen"); },1150);
      } },34);
  }

  /* ===== stage 2: custom link previews ===== */
  function stOg(){
    return `<div class="fxog">
      <div class="fxog__post">
        <div class="fxog__phead"><span class="fxog__av">${OGL.x}</span><div class="fxog__who"><b>Acme</b><i>@acmeshop · now</i></div></div>
        <p class="fxog__txt">Summer drop is LIVE 🔥 → <span>i.ki/summer-sale</span></p>
        <div class="fxog__wrap">
          <div class="fxog__prev fxog__prev--before"><div class="fxog__noimg">${IC.img}<i>No preview image</i></div><div class="fxog__meta"><i>shop.acme.com</i><b>untitled-page</b><span>shop.acme.com/collections/summer-sale-2026?utm_so…</span></div></div>
          <div class="fxog__prev fxog__prev--after"><div class="fxog__img"><b>SUMMER<br/>SALE</b><em>−40%</em></div><div class="fxog__meta"><i>i.ki/summer-sale</i><b>Acme Summer Sale — up to 40% off</b><span>Fresh fits for the season. Free shipping this week only.</span></div></div>
        </div>
      </div>
      <div class="fxog__edit">
        <div class="fxog__elbl">${IC.img} Link preview editor</div>
        <label>OG Title</label><div class="fxog__field"><span id="fxogT"></span><i class="fxog__caret"></i></div>
        <label>Description</label><div class="fxog__field fxog__field--mut">Fresh fits for the season. Free shipping this week only.</div>
        <label>Image</label><div class="fxog__field fxog__field--img"><span class="fxog__sw"></span>summer-card.png<b>✦ generated</b></div>
        <div class="fxog__dest"><b>i.ki/summer-sale</b>${IC.arr}<span>shop.acme.com/collections/summer-sale</span></div>
        <div class="fxog__plats"><i>Looks right on</i><span data-p="x">X</span><span data-p="tt">TikTok</span><span data-p="li">LinkedIn</span></div>
      </div>
    </div>`;
  }
  const OGL={
    x:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z"/></svg>',
    tt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
    li:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>',
  };
  const OGP={x:{who:"@acmeshop · now"},tt:{who:"@acmeshop · 2.1M followers"},li:{who:"Acme · 12,408 followers"}};
  function ogBeat(p,my){
    const t=p.querySelector("#fxogT"), post=p.querySelector(".fxog__post"), who=p.querySelector(".fxog__who i");
    const plats=[...p.querySelectorAll(".fxog__plats span")], TITLE="Acme Summer Sale — up to 40% off";
    function skin(k){ post.className="fxog__post fxog__post--"+k+(post.classList.contains("is-after")?" is-after":""); who.textContent=OGP[k].who; const av=post.querySelector(".fxog__av"); if(av)av.innerHTML=OGL[k]; plats.forEach(s=>s.classList.toggle("is-on",s.dataset.p===k)); }
    skin("x");
    let i=0;
    const type=setInterval(()=>{ if(my!==gen){clearInterval(type);return;} i+=2; t.textContent=TITLE.slice(0,i);
      if(i>=TITLE.length){ clearInterval(type); setTimeout(()=>{ if(my!==gen)return; post.classList.add("is-after");
        // once the branded preview is in, show it re-skinning per platform
        const order=["x","tt","li"]; let pi=1;
        const cyc=setInterval(()=>{ if(my!==gen){clearInterval(cyc);return;} skin(order[pi%3]); pi++; },1600);
      },380); } },34);
  }

  /* ===== stage 3: real-time webhooks (dub-style, i.ki-ified) ===== */
  const WHE=[
    {ic:IC.link,  t:"link.clicked", sub:"i.ki/summer-sale · Tokyo"},
    {ic:IC.qr,    t:"qr.scanned",   sub:"i.ki/menu · poster A2"},
    {ic:IC.dollar,t:"sale.recorded",sub:"$129.00 · checkout"},
  ];
  function stWh(){
    const W=780,H=340, ly=170, dx=560;
    const wire=(y)=>`<path class="fxwh__wire" data-y="${y}" d="M400,${ly} C470,${ly} ${dx-70},${y} ${dx},${y}"/>`;
    return `<div class="fxwh">
      <svg class="fxwh__wires" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
        <path class="fxwh__wire fxwh__wire--in" d="M148,${ly} L300,${ly}"/>
        ${wire(70)}${wire(170)}${wire(270)}
      </svg>
      <div class="fxwh__src"><img src="./img/logo.svg" alt=""/><b>i.ki</b><i>events</i></div>
      <span class="fxwh__new" id="fxwhNew">New event</span>
      <div class="fxwh__ev" id="fxwhEv"><span class="fxwh__evic">${WHE[0].ic}</span><div class="fxwh__evtx"><b>${WHE[0].t}</b><i>${WHE[0].sub}</i></div></div>
      <div class="fxwh__pk" id="fxwhPk"></div>
      <div class="fxwh__dest" style="top:70px"><img src="./img/logos/slack.svg" alt=""/><b>Slack</b><span class="fxwh__ok">200</span></div>
      <div class="fxwh__dest" style="top:170px"><img src="./img/logos/si-zapier.svg" alt=""/><b>Zapier</b><span class="fxwh__ok">200</span></div>
      <div class="fxwh__dest fxwh__dest--api" style="top:270px"><code>POST /hooks</code><b>api.acme.com</b><span class="fxwh__ok">200</span></div>
    </div>`;
  }
  function whBeat(p,my){
    const ev=p.querySelector("#fxwhEv"), nw=p.querySelector("#fxwhNew"), pk=p.querySelector("#fxwhPk");
    const dests=[...p.querySelectorAll(".fxwh__dest")], wires=[...p.querySelectorAll(".fxwh__wire:not(.fxwh__wire--in)")], inw=p.querySelector(".fxwh__wire--in");
    let i=0;
    function shot(){
      if(my!==gen)return;
      const e=WHE[i%3], d=dests[i%3], w=wires[i%3], y=[70,170,270][i%3];
      ev.classList.remove("pop"); void ev.offsetWidth;
      ev.innerHTML=`<span class="fxwh__evic">${e.ic}</span><div class="fxwh__evtx"><b>${e.t}</b><i>${e.sub}</i></div>`; ev.classList.add("pop");
      nw.classList.remove("show"); void nw.offsetWidth; nw.classList.add("show");
      inw.classList.add("is-on"); setTimeout(()=>inw.classList.remove("is-on"),500);
      // packet: event card -> destination
      pk.style.transition="none"; pk.style.left=(400/780*100)+"%"; pk.style.top=(170/340*100)+"%"; pk.classList.add("go"); void pk.offsetWidth;
      setTimeout(()=>{ if(my!==gen)return; w.classList.add("is-on"); pk.style.transition="left .5s cubic-bezier(.4,0,.18,1),top .5s cubic-bezier(.4,0,.18,1)"; pk.style.left=(560/780*100)+"%"; pk.style.top=(y/340*100)+"%"; },240);
      setTimeout(()=>{ if(my!==gen)return; pk.classList.remove("go"); w.classList.remove("is-on"); d.classList.add("hit"); setTimeout(()=>d.classList.remove("hit"),620); },800);
      i++;
    }
    shot(); const h=setInterval(()=>{ if(my!==gen){clearInterval(h);return;} shot(); },1850);
  }

  /* ===== stage 4: audit log ===== */
  const AUD=[
    {av:"NA",c:"#7c5cff",h:"<b>nadia@acme</b> changed destination of <code>i.ki/summer-sale</code>",m:"Just now · Tokyo · 103.12.88.4"},
    {av:"LE",c:"#0A84FF",h:"<b>leo@acme</b> exported analytics <code>CSV · 48,210 rows</code>",m:"2m ago · Singapore · 128.106.3.21"},
    {flag:1,av:"!",h:"<b>New login</b> from unrecognized device <code>Chrome · Frankfurt</code>",m:"5m ago · 89.247.61.8"},
    {av:"SY",c:"#0d9488",h:"<b>API key</b> rotated automatically <code>key_live_…9f2</code>",m:"18m ago · system"},
    {av:"MR",c:"#e5484d",h:"<b>mara@acme</b> granted <code>viewer</code> role to leo@acme",m:"1h ago · Jakarta · 36.68.10.2"},
  ];
  function audRow(r){
    return `<div class="fxaud__row${r.flag?' fxaud__row--flag':''}">
      <span class="fxaud__av"${r.c?` style="background:${r.c}"`:''}>${r.av}</span>
      <div class="fxaud__tx"><span class="fxaud__h">${r.h}</span><span class="fxaud__m">${r.m}</span></div>
      ${r.flag?`<button class="fxaud__rv" type="button">Revoke session</button>`:""}
    </div>`;
  }
  function stAud(){
    return `<div class="fxaud">
      <div class="fxaud__card">
        <div class="fxaud__head"><span class="fxaud__sh">${IC.shield}</span><b>Audit log</b><span class="fxaud__live"><i></i>Live</span><span class="fxaud__sp"></span><span class="fxaud__exp">${IC.dl} Export CSV</span></div>
        <div class="fxaud__rows" id="fxaudRows"></div>
      </div>
      <div class="fxaud__side">
        <div class="fxaud__pt">${IC.check}<span>Who, what & when on every change</span></div>
        <div class="fxaud__pt">${IC.check}<span>IP, device & location attached</span></div>
        <div class="fxaud__pt">${IC.check}<span>Revoke sessions in one click</span></div>
        <div class="fxaud__pt">${IC.check}<span>Retention & export for compliance</span></div>
      </div>
    </div>`;
  }
  function audBeat(p,my){
    const wrap=p.querySelector("#fxaudRows"); let i=0;
    function push(){
      if(my!==gen)return;
      if(i>=AUD.length)return;
      const r=AUD[AUD.length-1-i]; /* push oldest first so the feed ends newest-on-top */
      wrap.insertAdjacentHTML("afterbegin",audRow(r));
      const rows=wrap.querySelectorAll(".fxaud__row"); if(rows.length>4) rows[rows.length-1].remove();
      if(r.flag){ const btn=wrap.querySelector(".fxaud__rv");
        setTimeout(()=>{ if(my===gen&&btn){ btn.classList.add("done"); btn.textContent="✓ Revoked"; } },1250); }
      i++;
    }
    push(); const h=setInterval(()=>{ if(my!==gen||i>=AUD.length){clearInterval(h);return;} push(); },980);
  }

  const TPL={ins:stIns,og:stOg,wh:stWh,aud:stAud};
  const BEAT={ins:insBeat,og:ogBeat,wh:whBeat,aud:audBeat};

  /* ===== shell ===== */
  tabsEl.innerHTML=CARDS.map((c,i)=>`<button class="fxtab" data-i="${i}" type="button">
    <span class="fxtab__bar"><i></i></span>
    <span class="fxtab__ic">${c.ic}</span>
    <b class="fxtab__t">${c.t}</b>
    <span class="fxtab__d">${c.d}</span>
    <span class="fxtab__more">Learn more ${IC.arr}</span>
  </button>`).join("");
  stage.innerHTML=CARDS.map((c,i)=>`<div class="fxp" data-k="${c.k}" data-i="${i}"></div>`).join("");
  const tabs=[...tabsEl.querySelectorAll(".fxtab")], panels=[...stage.querySelectorAll(".fxp")];

  let cur=0, gen=0, hovered=false;
  card.addEventListener("mouseenter",()=>hovered=true);
  card.addEventListener("mouseleave",()=>hovered=false);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  function activate(i,my){
    cur=i;
    tabs.forEach((t,k)=>t.classList.toggle("is-on",k===i));
    panels.forEach((pl,k)=>{ const on=k===i; pl.classList.toggle("is-on",on); if(on){ pl.innerHTML=TPL[CARDS[i].k](); const b=BEAT[CARDS[i].k]; if(b&&!reduced) b(pl,my); } else if(!on&&pl.innerHTML&&k!==i){ /* keep last frame for crossfade */ } });
  }
  async function prog(ms,my){
    const bar=tabs[cur].querySelector(".fxtab__bar i"); let t=0;
    while(t<ms){ await wait(80); if(my!==gen)return false; if(!hovered){ t+=80; if(bar)bar.style.height=Math.min(100,t/ms*100)+"%"; } }
    return my===gen;
  }
  async function loop(){
    const my=++gen;
    while(my===gen){
      tabs.forEach(t=>{const b=t.querySelector(".fxtab__bar i"); if(b)b.style.height="0%";});
      activate(cur,my);
      if(!await prog(6400,my))return;
      cur=(cur+1)%CARDS.length;
    }
  }
  tabsEl.addEventListener("click",e=>{
    const t=e.target.closest(".fxtab"); if(!t)return;
    cur=+t.dataset.i; loop();
  });
  if(reduced){ gen++; activate(0,gen); return; }
  let started=false; const go=()=>{ if(started)return; started=true; loop(); };
  if("IntersectionObserver" in window){ const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){go();io.disconnect();}});},{threshold:.22}); io.observe(card); }
  setTimeout(go,9000);
})();
