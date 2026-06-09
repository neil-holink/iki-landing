/* Pricing — finished 3-tier cards + animated billing toggle + trust row + collapsible compare table */
(function pricing(){
  const cardsEl=document.querySelector("#prCards");
  if(!cardsEl) return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CHK='<svg class="prchk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>';
  /* new-feature icons */
  const NFI={
    retarget:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
    share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M12 10v6M9 13h6"/></svg>',
    globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg>',
    spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8z"/></svg>',
    chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.4 7.6 8 9 4.6-1.4 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  };

  const PLANS=[
    {key:"free",pill:"Free",price:{m:0,y:0},desc:"For side projects and small teams",cta:"Get started",type:"ghost",
     features:["Unlimited short links","Click + conversion analytics","QR codes","1 workspace seat","Community support"]},
    {key:"pro",pill:"Pro",price:{m:29,y:23},desc:"For growing teams that ship everyday",cta:"Start free trial",type:"primary",popular:true,micro:"No credit card · cancel anytime",
     features:["Everything in Free","AI Router (device, geo, A/B)","AI Insights & forecasting","10 seats & role permissions","Full API + webhooks","Priority email support"],
     newFeatures:[["retarget","Retargeting social media",false],["share","Shared workspaces & folder",false],["globe","Custom domain",true],["spark","AI smart routing",true]]},
    {key:"ent",pill:"Enterprise",priceText:"Custom",desc:"For organizations with serious volume",cta:"Talk to sales",type:"primary",
     features:["Everything in Pro","Unlimited seats","SSO & SAML","AI agent integration","White-label dashboards","Custom SLA & DPA","Dedicated CSM"],
     newFeatures:[["chart","Advanced traffic insights",false],["shield","Advanced security & audit logs",false],["globe","Unlimited domains",true],["spark","AI data analytics",true]]},
  ];

  let mode="m";
  cardsEl.innerHTML=PLANS.map(p=>{
    const priceBlock = p.priceText
      ? `<div class="prcard__price"><span class="prcard__custom">${p.priceText}</span></div>`
      : `<div class="prcard__price"><span class="prcard__cur">$</span><span class="prcard__num" data-m="${p.price.m}" data-y="${p.price.y}">${p.price.m}</span><span class="prcard__per">/month</span></div>
         <div class="prcard__note" data-note="${p.key}">${p.key==="pro"?'<span class="y-only">billed yearly · $276</span>':''}</div>`;
    const feats=p.features.map((f,i)=>`<li style="--d:${i*0.04}s">${CHK}<span class="${f.startsWith('Everything')?'prfeat--bold':''}">${f}</span></li>`).join("");
    const cta=`<a class="prcard__cta prcard__cta--${p.type}" href="#">${p.cta} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>`;
    const nf = p.newFeatures ? `<div class="prcard__newh">New features</div>
      <ul class="prcard__nf">${p.newFeatures.map(([ic,label,soon])=>`<li><span class="prnf__ic">${NFI[ic]}</span><span class="prnf__l">${label}</span>${soon?'<span class="prnf__soon">Coming soon</span>':''}</li>`).join("")}</ul>` : '';
    return `<div class="prcard ${p.popular?'is-pro':''}">
      ${p.popular?'<span class="prcard__badge">MOST POPULAR</span>':''}
      <div class="prcard__name">${p.pill}</div>
      <p class="prcard__desc">${p.desc}</p>
      ${priceBlock}
      ${cta}
      ${p.micro?`<span class="prcard__micro">${p.micro}</span>`:'<span class="prcard__micro"></span>'}
      <div class="prcard__inc">What's included</div>
      <ul class="prcard__feats">${feats}</ul>
      ${nf}
    </div>`;
  }).join("");

  /* trust row */
  const TRUST=[
    ['<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></svg>',"No credit card required"],
    ['<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3"/><path d="M3 4v4h4"/></svg>',"Cancel anytime"],
    ['<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.4 7.6 8 9 4.6-1.4 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',"14 Days free trial"],
  ];
  const trustEl=document.querySelector("#prTrust");
  if(trustEl) trustEl.innerHTML=TRUST.map(([ic,t])=>`<span class="prtrust"><span class="prtrust__ic">${ic}</span>${t}</span>`).join("");

  /* ---- billing toggle + price tween ---- */
  const toggle=document.querySelector("#prToggle");
  const slider=document.querySelector("#prSlider");
  function moveSlider(){ const on=toggle.querySelector(".prtg.is-on"); if(on&&slider){ slider.style.width=on.offsetWidth+"px"; slider.style.transform=`translateX(${on.offsetLeft-3}px)`; } }
  function tween(el,to){ const from=parseFloat(el.textContent)||0; if(reduced||from===to){el.textContent=to;return;} const t0=performance.now(),dur=420; (function step(t){ const k=Math.min(1,(t-t0)/dur); const e=1-Math.pow(1-k,3); el.textContent=Math.round(from+(to-from)*e); if(k<1)requestAnimationFrame(step); })(t0); }
  function setMode(m){
    mode=m;
    toggle.querySelectorAll(".prtg").forEach(b=>b.classList.toggle("is-on",b.dataset.b===m));
    moveSlider();
    document.querySelectorAll(".prcard__num").forEach(n=>tween(n,+n.dataset[m]));
    document.querySelector(".pr").classList.toggle("pr--yearly",m==="y");
  }
  toggle.addEventListener("click",e=>{const b=e.target.closest(".prtg");if(b)setMode(b.dataset.b);});
  requestAnimationFrame(moveSlider); addEventListener("resize",moveSlider);

  /* ---- Canva-style comparison: sticky plan header + per-group collapsible ---- */
  const crown='<svg class="prt__crown" viewBox="0 0 24 24" fill="currentColor"><path d="M3 8l4.5 3.5L12 4l4.5 7.5L21 8l-1.8 11H4.8z"/></svg>';
  const info='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.5h.01"/></svg>';
  const PH=[["Free","Get started","ghost",false],["Pro","Start free trial","primary",true],["Enterprise","Talk to sales","ghost",false]];
  const GROUPS=[
    ["Links & QR",[["Short links","Unlimited","Unlimited","Unlimited"],["Custom domains",false,true,"Unlimited"],["QR codes",true,true,true],["UTM builder","Basic",true,true]]],
    ["Analytics",[["Click & conversion analytics",true,true,true],["AI Insights & forecasting",false,true,true],["Data retention","30 days","1 year","Custom","How long event-level data stays queryable"]]],
    ["Smart routing",[["AI Router (device, geo)",false,true,true,"Auto-routes each visitor by device, geo and source"],["A/B testing",false,true,true]]],
    ["Team",[["Workspace seats","1","10","Unlimited"],["Roles & permissions",false,true,true],["SSO & SAML",false,false,true]]],
    ["Developer",[["API + webhooks",false,true,true],["White-label dashboards",false,false,true]]],
    ["Support & security",[["Support","Community","Priority","Dedicated CSM"],["Uptime SLA",false,false,"99.99%"],["SOC 2 + GDPR / DPA",false,false,true]]],
  ];
  const dash='<span class="prx">–</span>';
  const GICON={
    "Links & QR":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    "Analytics":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    "Smart routing":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
    "Team":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "Developer":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    "Support & security":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  };
  const cell=v=>v===true?CHK:(v===false?dash:`<span class="prval">${v}</span>`);
  const tableEl=document.querySelector("#prTable");
  const head=`<div class="prt__head"><div class="prt__feat prt__hcell">Compare all features</div>${PH.map(([n,c,t,pro])=>`<div class="prt__hplan ${pro?'is-pro':''}"><span class="prt__hname">${n}${pro?crown:''}</span><a class="prt__hcta prt__hcta--${t}" href="#">${c}</a></div>`).join("")}</div>`;
  const groups=GROUPS.map(([g,items],gi)=>{
    const body=items.map(row=>{const[n,a,b,c,tip]=row;return `<div class="prt__row"><span class="prt__feat">${n}${tip?`<span class="prt__i" title="${tip}">${info}</span>`:''}</span><span>${cell(a)}</span><span class="prt__pro">${cell(b)}</span><span>${cell(c)}</span></div>`;}).join("");
    return `<div class="prt__group ${gi===0?'is-open':''}" data-g="${gi}"><button class="prt__gh" type="button"><span class="prt__gname"><span class="prt__gico">${GICON[g]||''}</span>${g}</span><svg class="prt__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button><div class="prt__gbody">${body}</div></div>`;
  }).join("");
  tableEl.innerHTML=`<div class="prt">${head}${groups}</div>`;
  tableEl.querySelectorAll(".prt__group").forEach(grp=>{
    const body=grp.querySelector(".prt__gbody");
    const set=open=>{ grp.classList.toggle("is-open",open); body.style.maxHeight=open?body.scrollHeight+"px":"0px"; };
    set(grp.classList.contains("is-open"));
    grp.querySelector(".prt__gh").addEventListener("click",()=>set(!grp.classList.contains("is-open")));
  });
  addEventListener("resize",()=>tableEl.querySelectorAll(".prt__group.is-open .prt__gbody").forEach(b=>b.style.maxHeight=b.scrollHeight+"px"));
})();
