/* Connect section — live integration hub: radial nodes + flowing wires + category filter + live events */
(function conn(){
  const hub   = document.querySelector("#connHub");
  const wires = document.querySelector("#connWires");
  const nodes = document.querySelector("#connNodes");
  const pills = document.querySelector("#connPills");
  const evtTxt= document.querySelector("#connEvtTxt");
  if(!hub || !wires || !nodes) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- brand glyphs (simple, single-color marks; tinted per brand) ---- */
  const G = {
    bars:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="4" height="10" rx="1.4"/><rect x="10" y="6" width="4" height="15" rx="1.4"/><rect x="17" y="3" width="4" height="18" rx="1.4" opacity=".55"/></svg>',
    triangle:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2 21 20H3z" /></svg>',
    meta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M3 16c2.5 0 4-9 8-9s5.5 9 8 9"/></svg>',
    play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4.5 19 12 6 19.5z"/></svg>',
    spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 2 4 13h6l-1 9 8-12h-6z"/></svg>',
    hash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"/></svg>',
    chat:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"/></svg>',
    note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7v10l8-10v10" /></svg>',
    web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M9 6h6M7.8 8.2 16 16"/></svg>',
    seg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M21 8A9 9 0 0 0 5 6"/><path d="M3 16a9 9 0 0 0 16 2"/></svg>',
    card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/></svg>',
    code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg>',
  };

  /* ---- integrations (name, category, brand color, real logo file or glyph) ---- */
  const L = "img/logos/";
  const ITEMS = [
    { n:"Google Analytics", c:"ads",  col:"#E8710A", logo:L+"google-analytics.svg" },
    { n:"Google Ads",       c:"ads",  col:"#1A73E8", logo:L+"si-googleads.svg" },
    { n:"Meta Ads",         c:"ads",  col:"#0866FF", logo:L+"meta.svg" },
    { n:"TikTok Ads",       c:"ads",  col:"#111827", logo:L+"tiktok.svg" },
    { n:"Mixpanel",         c:"ads",  col:"#7856FF", logo:L+"si-mixpanel.svg" },

    { n:"Slack",            c:"auto", col:"#4A154B", logo:L+"slack.svg" },
    { n:"Zapier",           c:"auto", col:"#FF4F00", logo:L+"si-zapier.svg" },
    { n:"Notion",           c:"auto", col:"#111827", logo:L+"notion.svg" },
    { n:"Discord",          c:"auto", col:"#5865F2", logo:L+"discord.svg" },

    { n:"GitHub",           c:"dev",  col:"#181717", logo:L+"si-github.svg" },
    { n:"Stripe",           c:"dev",  col:"#635BFF", logo:L+"si-stripe.svg" },
    { n:"Shopify",          c:"dev",  col:"#95BF47", logo:L+"si-shopify.svg" },
    { n:"Webhooks",         c:"dev",  col:"#111827", g:G.web },
  ];

  /* ---- layout: place nodes evenly on a ring around the core ---- */
  const SIZE = 520, CX = SIZE/2, CY = SIZE/2, R = 212;
  const start = -Math.PI/2; // start at top
  const built = ITEMS.map((it,i)=>{
    const a = start + (i/ITEMS.length)*Math.PI*2;
    const x = CX + Math.cos(a)*R, y = CY + Math.sin(a)*R;
    return { ...it, x, y, a };
  });

  /* wires (SVG) — from core to each node */
  const svgns = "http://www.w3.org/2000/svg";
  built.forEach((it,i)=>{
    const ln = document.createElementNS(svgns,"line");
    ln.setAttribute("x1",CX); ln.setAttribute("y1",CY);
    ln.setAttribute("x2",it.x); ln.setAttribute("y2",it.y);
    ln.setAttribute("class","cwire"); ln.dataset.cat=it.c; ln.dataset.i=i;
    wires.appendChild(ln);
    // flowing packet on top (dashed, animated via CSS)
    const fl = document.createElementNS(svgns,"line");
    fl.setAttribute("x1",CX); fl.setAttribute("y1",CY);
    fl.setAttribute("x2",it.x); fl.setAttribute("y2",it.y);
    fl.setAttribute("class","cwire cwire--flow"); fl.dataset.cat=it.c; fl.dataset.i=i;
    wires.appendChild(fl);
  });

  /* nodes (HTML, absolutely positioned by %) */
  built.forEach((it,i)=>{
    const el = document.createElement("div");
    el.className="cnode"; el.dataset.cat=it.c; el.dataset.i=i;
    el.style.left=(it.x/SIZE*100)+"%"; el.style.top=(it.y/SIZE*100)+"%";
    el.style.setProperty("--bc", it.col);
    el.style.setProperty("--d", (i*0.05)+"s");
    const inner = it.logo ? `<img class="cnode__logo" src="${it.logo}" alt="${it.n}" draggable="false" />` : it.g;
    el.innerHTML = `<span class="cnode__tile${it.logo?' has-logo':''}">${inner}</span><span class="cnode__name">${it.n}</span>`;
    nodes.appendChild(el);
  });
  const nodeEls = [...nodes.querySelectorAll(".cnode")];
  const wireEls = [...wires.querySelectorAll(".cwire")];

  /* ---- category filter ---- */
  let cat = "ads";
  function apply(c){
    cat=c;
    [...pills.children].forEach(b=>b.classList.toggle("is-active", b.dataset.cat===c));
    nodeEls.forEach(n=>n.classList.toggle("is-dim", n.dataset.cat!==c));
    wireEls.forEach(w=>w.classList.toggle("is-dim", w.dataset.cat!==c));
  }
  pills.addEventListener("click",e=>{ const b=e.target.closest(".cpill"); if(b) apply(b.dataset.cat); });
  apply("ads");

  /* hover a node → temporarily light it + its wire regardless of category */
  nodeEls.forEach(n=>{
    n.addEventListener("mouseenter",()=>{ n.classList.add("is-hot"); wireEls.filter(w=>w.dataset.i===n.dataset.i).forEach(w=>w.classList.add("is-hot")); });
    n.addEventListener("mouseleave",()=>{ n.classList.remove("is-hot"); wireEls.forEach(w=>w.classList.remove("is-hot")); });
  });

  /* ---- live event line + packet pulse on a matching wire ---- */
  if(!reduced){
    const VERBS = [
      e=>`New click · ${e.geo} &nbsp;→&nbsp; logged in ${e.n}`,
      e=>`Conversion · $${e.amt} &nbsp;→&nbsp; synced to ${e.n}`,
      e=>`New signup &nbsp;→&nbsp; pushed to ${e.n}`,
      e=>`Sale · $${e.amt} &nbsp;→&nbsp; event sent to ${e.n}`,
    ];
    const GEO=["Berlin","Tokyo","Jakarta","New York","London","São Paulo","Singapore"];
    const AMT=["12.00","29.90","48.00","99.00","149.00","8.50"];
    const rnd=a=>a[Math.floor(Math.random()*a.length)];
    function fire(){
      // pick a node in the active category to keep it coherent with the filter
      const pool = built.map((it,i)=>({it,i})).filter(o=>o.it.c===cat);
      const pick = rnd(pool.length?pool:built.map((it,i)=>({it,i})));
      const e = { n: pick.it.n, geo: rnd(GEO), amt: rnd(AMT) };
      if(evtTxt){ evtTxt.style.opacity=0; setTimeout(()=>{ evtTxt.innerHTML=rnd(VERBS)(e); evtTxt.style.opacity=1; },180); }
      // pulse the node + send a packet down its wire
      const node = nodeEls[pick.i]; const flow = wireEls.find(w=>w.classList.contains("cwire--flow") && +w.dataset.i===pick.i);
      if(node){ node.classList.add("is-ping"); setTimeout(()=>node.classList.remove("is-ping"),900); }
      if(flow){ flow.classList.add("is-fire"); setTimeout(()=>flow.classList.remove("is-fire"),900); }
    }
    setTimeout(function loop(){ fire(); setTimeout(loop, 2200+Math.random()*1200); }, 900);
  }
})();
