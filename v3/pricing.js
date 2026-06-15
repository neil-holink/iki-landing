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
  /* ---- ahrefs-style hover affordances + popover media ---- */
  const PLAYTRI='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  const IICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 11v5"/><path d="M12 7.6h.01"/></svg>';
  const ARR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
  const QRIC='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3V3zm2 2v3h3V5H5zM14 3h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm11-2h3v2h-3v-2zm5 0h-2v5h2v-5zm-5 3h3v4h-2v-2h-1v-2zm0 3h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>';
  const ROUTERIC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>';
  const MEDIA={ router:{ic:ROUTERIC,label:"AI routing in action"}, insights:{ic:NFI.chart,label:"Live insights"}, qr:{ic:QRIC,label:"QR generator"} };
  function vidTile(m){ const d=MEDIA[m]; if(!d) return ""; return `<div class="prpop__vid"><span class="prpop__vidic">${d.ic}</span><span class="prpop__playbtn">${PLAYTRI}</span><span class="prpop__vidlabel">${d.label}</span><div class="prpop__scrub"><i></i></div></div>`; }
  /* feature → tooltip copy (+ optional video preview). Keep apostrophe-free for safe data-attrs. */
  const INFO={
    "Unlimited short links":{t:"Create as many branded short links as you need — no monthly cap, ever."},
    "Click + conversion analytics":{t:"Track clicks, unique visitors, devices and conversions in real time.",media:"insights"},
    "QR codes":{t:"Generate a styled, scannable QR for any link — logo-ready and high-resolution.",media:"qr"},
    "1 workspace seat":{t:"A single seat to manage your links. Upgrade to invite teammates."},
    "Community support":{t:"Get help from our community forum and product docs."},
    "Everything in Free":{t:"Includes every feature from the Free plan."},
    "1 custom domain":{t:"Bring your own branded domain (e.g. go.brand.com) for links people trust."},
    "Bulk link creation":{t:"Create hundreds of links at once via CSV import or the API."},
    "3 workspace seats":{t:"Invite up to 3 teammates to collaborate in one workspace."},
    "Email support":{t:"Reach our team by email with a next-business-day response."},
    "Everything in Starter":{t:"Includes every feature from the Starter plan."},
    "AI Router (device, geo, A/B)":{t:"Auto-route every visitor by device, location and source — or split-test destinations.",media:"router"},
    "AI Insights & forecasting":{t:"AI surfaces what is driving clicks and forecasts where your traffic is heading.",media:"insights"},
    "10 seats & role permissions":{t:"Up to 10 teammates with granular, role-based permissions."},
    "Full API + webhooks":{t:"Automate everything with a complete REST API and real-time webhooks."},
    "Priority email support":{t:"Front-of-the-line email support with faster response times."},
    "Everything in Pro":{t:"Includes every feature from the Pro plan."},
    "Unlimited seats":{t:"Add your whole organization — no per-seat limits."},
    "SSO & SAML":{t:"Single sign-on via SAML for secure, centralized access."},
    "AI agent integration":{t:"Let AI agents create and route links programmatically."},
    "White-label dashboards":{t:"Share fully branded analytics dashboards with your clients."},
    "Custom SLA & DPA":{t:"A custom uptime SLA and a signed data-processing agreement."},
    "Dedicated CSM":{t:"A dedicated customer success manager for onboarding and growth."},
    "Retargeting social media":{t:"Drop retargeting pixels on every click to re-engage your visitors."},
    "Shared workspaces & folder":{t:"Organize links into shared folders across your whole team."},
    "Custom domain":{t:"Connect additional branded domains. Rolling out soon."},
    "AI smart routing":{t:"Next-gen AI routing that learns from your conversions. Rolling out soon.",media:"router"},
    "Advanced traffic insights":{t:"Deep cohort, funnel and attribution analytics.",media:"insights"},
    "Advanced security & audit logs":{t:"A full audit trail plus advanced security controls."},
    "Unlimited domains":{t:"Connect unlimited branded domains. Rolling out soon."},
    "AI data analytics":{t:"Query your link data in plain language. Rolling out soon."},
    "10-day data retention":{t:"Click and conversion history stays queryable for 10 days."},
    "30-day data retention":{t:"Click and conversion history stays queryable for 30 days."},
    "60-day data retention":{t:"Click and conversion history stays queryable for 60 days."},
    "90-day data retention":{t:"Click and conversion history stays queryable for 90 days."},
  };
  function affFor(label){ const info=INFO[label]; if(!info) return {aff:"",dp:""};
    const aff=`<button class="praff ${info.media?'praff--vid':''}" type="button" tabindex="-1" aria-label="More info">${info.media?PLAYTRI:IICON}</button>`;
    const dp=` data-pop="1" data-t="${info.t}"${info.media?` data-media="${info.media}" data-more="1"`:''}`;
    return {aff,dp};
  }

  const PLANS=[
    {key:"free",pill:"Free",price:{m:0,y:0},desc:"For side projects and small teams",cta:"Get started",type:"ghost",
     features:["Unlimited short links","Click + conversion analytics","10-day data retention","QR codes","1 workspace seat","Community support"]},
    {key:"starter",pill:"Starter",price:{m:12,y:9},desc:"For solo creators and freelancers",cta:"Start free trial",type:"ghost",
     features:["Everything in Free","1 custom domain","Bulk link creation","30-day data retention","3 workspace seats","Email support"]},
    {key:"pro",pill:"Pro",price:{m:29,y:23},desc:"For growing teams that ship everyday",cta:"Start free trial",type:"primary",popular:true,
     features:["Everything in Starter","AI Router (device, geo, A/B)","AI Insights & forecasting","60-day data retention","10 seats & role permissions","Full API + webhooks","Priority email support"],
     newFeatures:[["retarget","Retargeting social media",false],["share","Shared workspaces & folder",false],["globe","Custom domain",true],["spark","AI smart routing",true]]},
    {key:"ent",pill:"Enterprise",priceText:"Custom",desc:"For organizations with serious volume",cta:"Talk to sales",type:"primary",
     features:["Everything in Pro","Unlimited seats","SSO & SAML","AI agent integration","White-label dashboards","90-day data retention","Custom SLA & DPA","Dedicated CSM"],
     newFeatures:[["chart","Advanced traffic insights",false],["shield","Advanced security & audit logs",false],["globe","Unlimited domains",true],["spark","AI data analytics",true]]},
  ];

  let mode="m";
  cardsEl.innerHTML=PLANS.map(p=>{
    const yNote = (p.price && p.price.y>0) ? `<span class="y-only">billed yearly · $${p.price.y*12}</span>` : '';
    const priceBlock = p.priceText
      ? `<div class="prcard__price"><span class="prcard__custom">${p.priceText}</span></div>`
      : `<div class="prcard__price"><span class="prcard__cur">$</span><span class="prcard__num" data-m="${p.price.m}" data-y="${p.price.y}">${p.price.m}</span><span class="prcard__per">/month</span></div>
         <div class="prcard__note" data-note="${p.key}">${yNote}</div>`;
    const feats=p.features.map((f,i)=>{const{aff,dp}=affFor(f);return `<li style="--d:${i*0.04}s"${dp}>${CHK}<span class="${f.startsWith('Everything')?'prfeat--bold':''}">${f}</span>${aff}</li>`;}).join("");
    const cta=`<a class="prcard__cta prcard__cta--${p.type}" href="#">${p.cta} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>`;
    const nf = p.newFeatures ? `<div class="prcard__newh">New features:</div>
      <ul class="prcard__nf">${p.newFeatures.map(([ic,label,soon])=>{const{aff,dp}=affFor(label);return `<li${dp}><span class="prnf__ic">${NFI[ic]}</span><span class="prnf__l">${label}</span>${aff}${soon?'<span class="prnf__soon">Coming soon</span>':''}</li>`;}).join("")}</ul>` : '';
    return `<div class="prcard ${p.popular?'is-pro':''}">
      ${p.popular?'<span class="prcard__badge">MOST POPULAR</span>':''}
      <div class="prcard__name">${p.pill}</div>
      <p class="prcard__desc">${p.desc}</p>
      ${priceBlock}
      ${cta}
      <div class="prcard__inc">What's included:</div>
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
  if(trustEl) trustEl.innerHTML='<div class="pr__trustbar">'+TRUST.map(([ic,t])=>`<span class="prtrust"><span class="prtrust__ic">${ic}</span>${t}</span>`).join("")+'</div>';

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
  const PH=[["Free","Get started","ghost",false],["Starter","Start free trial","ghost",false],["Pro","Start free trial","primary",true],["Enterprise","Talk to sales","primary",false]];
  const GROUPS=[
    ["Links & QR",[
      ["Short links","Unlimited","Unlimited","Unlimited","Unlimited","Branded short links with no monthly cap."],
      ["Custom domains",false,"1","3","Unlimited","Use your own branded domain so links look like you."],
      ["QR codes",true,true,true,true,"Styled, high-res QR codes for any link."],
      ["UTM builder","Basic",true,true,true,"Build and save UTM-tagged campaign links."],
      ["Bulk link creation",false,true,true,true,"Create links in bulk via CSV import or the API."]]],
    ["Analytics",[
      ["Click & conversion analytics",true,true,true,true,"Real-time clicks, unique visitors and conversions."],
      ["AI Insights & forecasting",false,false,true,true,"AI explains your data and forecasts where it is heading."],
      ["Advanced traffic insights",false,false,false,true,"Cohorts, funnels and multi-touch attribution."],
      ["Data retention","10 days","30 days","60 days","90 days","How long click and conversion history stays queryable."]]],
    ["Smart routing",[
      ["AI Router (device, geo)",false,false,true,true,"Auto-routes each visitor by device, geo and source."],
      ["A/B testing",false,false,true,true,"Split-test destinations and let the winner take traffic."],
      ["Retargeting & deep links",false,false,false,true,"Retarget visitors and route them to in-app deep links."]]],
    ["Team",[
      ["Workspace seats","1","3","10","Unlimited","Teammates who can create and manage links."],
      ["Shared workspaces & folders",false,true,true,true,"Organize links into shared team folders."],
      ["Roles & permissions",false,false,true,true,"Granular, role-based access for every teammate."],
      ["SSO / SAML / SCIM",false,false,false,true,"Enterprise single sign-on and user provisioning."]]],
    ["Developer",[
      ["API + webhooks",false,false,true,true,"A full REST API plus real-time webhooks."],
      ["White-label dashboards",false,false,false,true,"Branded, embeddable analytics dashboards for clients."]]],
    ["Support & security",[
      ["Support","Community","Email","Priority","Dedicated CSM","How you reach our team for help."],
      ["Uptime SLA",false,false,false,"99.99%","A contractual uptime guarantee."],
      ["Audit logs",false,false,false,true,"A full audit trail of workspace activity."],
      ["SOC 2 + GDPR / DPA",false,false,false,true,"Security certifications and data agreements."]]],
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
    const body=items.map(row=>{const[n,...rest]=row;const tip=rest.length>4?rest[4]:null;const vals=rest.slice(0,4);const name=tip?`<span class="prt__tip" data-pop="1" data-t="${tip}">${n}</span>`:n;return `<div class="prt__row"><span class="prt__feat">${name}</span>${vals.map((v,i)=>`<span class="${i===2?'prt__pro':''}">${cell(v)}</span>`).join("")}</div>`;}).join("");
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

  /* ---- shared hover popover (ahrefs-style) — drives card rows + compare labels ---- */
  const section=document.querySelector(".pr");
  if(section){
    const pop=document.createElement("div"); pop.className="prpop"; section.appendChild(pop);
    let hideT=null;
    function show(el){
      clearTimeout(hideT);
      const t=el.getAttribute("data-t")||"";
      const media=el.getAttribute("data-media")||"";
      const more=el.getAttribute("data-more")==="1";
      pop.innerHTML=`<p class="prpop__t">${t}</p>${more?`<span class="prpop__more">Learn more ${ARR}</span>`:""}${media?vidTile(media):""}`;
      const sr=section.getBoundingClientRect(), er=el.getBoundingClientRect();
      const pw=pop.offsetWidth||264, ph=pop.offsetHeight;
      let x=er.right-sr.left+12;
      if(er.right+12+pw > sr.right-6) x=er.left-sr.left-pw-12;   /* flip to the left if it would overflow the section */
      if(x<6) x=6;
      let y=er.top-sr.top-6;
      const maxY=section.offsetHeight-ph-8; if(y>maxY) y=Math.max(6,maxY);
      pop.style.left=x+"px"; pop.style.top=y+"px"; pop.classList.add("is-on");
    }
    function hide(){ hideT=setTimeout(()=>pop.classList.remove("is-on"),130); }
    pop.addEventListener("mouseenter",()=>clearTimeout(hideT));
    pop.addEventListener("mouseleave",hide);
    section.querySelectorAll("[data-pop]").forEach(el=>{
      el.addEventListener("mouseenter",()=>show(el));
      el.addEventListener("mouseleave",hide);
    });
  }
})();
