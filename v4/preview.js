/* Product preview — smooth dub-style tabbed product window, i.ki-branded step-by-step demos.
   Tab 0: AI Suggest & Shorten   Tab 1: Analytics   Tab 2: Affiliate (Applications → Payouts → Overview)
   Single-driver loop: clicking a tab cancels the current play and restarts from that tab. */
(function preview(){
  const stage=document.querySelector("#pvStage");
  const tabsWrap=document.querySelector("#pvTabs");
  const urlEl=document.querySelector("#pvUrl");
  const cursor=document.querySelector("#pvCursor");
  const stepsEl=document.querySelector("#pvSteps");
  const win=document.querySelector("#pvWin");
  if(!stage||!tabsWrap) return;
  const tabs=[...tabsWrap.querySelectorAll(".pvtab")];
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const urls=["app.i.ki / links / new","app.i.ki / qr / new","app.i.ki / links / summer-sale","app.i.ki / links / summer-sale / routing","app.i.ki / analytics"];
  const stepSets=[
    ["Paste your long link","AI generates 3 names","Pick the best short link"],
    ["Paste your URL","QR generated instantly","Edit it anytime — no reprint"],
    ["Open your link","Tag, describe & expire","Save — live in 38ms"],
    ["Open your smart link","Add a routing rule","Each visitor → right place"],
    ["Track every click live","Watch the trend build","Break it down by source"],
  ];
  const I={
    spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8z"/></svg>',
    copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    over:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h7V3H3zM14 21h7v-9h-7zM14 3v6h7V3zM3 21h7v-6H3z"/></svg>',
    pay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    app:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>',
    cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    glob:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg>',
    brush:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.6-.2-1.1-.6-1.5-.3-.4-.5-.8-.5-1.3a1.5 1.5 0 0 1 1.5-1.5H17a4 4 0 0 0 4-4c0-4.4-4-9.2-9-9.2z"/><circle cx="7.5" cy="11.5" r="1.1"/><circle cx="12" cy="7.5" r="1.1"/><circle cx="16.5" cy="11.5" r="1.1"/></svg>',
    doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
    portal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    regen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></svg>',
    qr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/><path d="M21 21h.01M21 17v.01M17 21v.01"/></svg>',
    arrr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.6 2.9 21 11.3a2 2 0 0 1 0 2.8l-6.9 6.9a2 2 0 0 1-2.8 0L2.9 12.6A2 2 0 0 1 2.3 11l.6-6a2 2 0 0 1 1.8-1.8l6-.6c.7-.07 1.4.18 1.9.7z"/><circle cx="8.5" cy="8.5" r="1.3"/></svg>',
  };

  /* ===== panel 0: AI ===== */
  /* AI Suggest & Shorten — mirrors the hero mechanism (paste → Shorten → pick/Choose → active + free banner) */
  const AI_DEST="https://shop.acme.com/collections/summer-sale-2026?utm_source=tiktok";
  const AI_DOM="i.ki";
  const AI_NAMES=["summer-sale","acme-summer","summer-2026"];
  const AI_MATCH=["98%","95%","92%"];
  /* shared hero-style domain dropdown (same .h2domlist component as the hero) */
  function pvDomList(idAttr,sel){
    sel=sel||"i.ki";
    const item=(d,n,extra)=>`<button class="h2domitem${extra||""}${d===sel?" is-sel":""}" data-d="${d}" type="button"><span class="h2domitem__l"><span class="h2domitem__d">${d}/</span><span class="h2domitem__n">${n}</span></span><span class="h2domitem__ck">${I.check}</span></button>`;
    return `<div class="h2domlist pvdoml" id="${idAttr}" hidden>
      <div class="h2domlbl">i.ki domains</div>
      ${item("i.ki","Default short domain")}${item("iki.link","Short i.ki domain")}${item("iki.to","Short i.ki domain")}
      <div class="h2domdiv"></div>
      <div class="h2domlbl">Your own domain <span class="h2dompro">Pro</span></div>
      ${item("go.acme.com","Your verified brand domain"," h2domitem--custom")}
      <button class="h2domitem h2domitem--add" type="button"><span class="h2domitem__plus">+</span> Connect a custom domain</button>
    </div>`;
  }
  function aiState1(){
    return `<div class="h2in__title">Paste your long URL</div>
      <div class="h2in"><div class="h2in__url pvurl" id="pvaiUrl"><span class="pvurl__ph">https://example.com/your-long-url</span></div><button class="h2in__go" id="pvaiGo" type="button">Shorten ${I.arrr}</button></div>
      <p class="h2in__hint"><span class="o">✦</span> AI names your link instantly — <b>free for 7 days</b>, no login or card. Create a free account to keep it forever.</p>`;
  }
  const aiRow=(i)=>`<div class="h2pk" data-i="${i}"><span class="h2pk__radio"></span><span class="h2pk__dom">${AI_DOM}/</span><span class="h2pk__slug">${AI_NAMES[i]}</span><span class="h2pk__sp"></span><span class="h2pk__match">${AI_MATCH[i]} match</span><button class="h2pk__choose" data-i="${i}" type="button">${I.check} Choose</button></div>`;
  function aiState2(){
    return `<div class="h2res">
      <div class="h2res__head"><span class="h2res__lbl">Pick your short link</span><span class="h2res__badge">${MGI.clock} Free for 7 days</span></div>
      <div class="h2res__cap"><span class="o">✦</span> AI suggested these from your link — fix a typo and <b>Regenerate</b>, or pick one and <b>Choose</b> to lock it in.</div>
      <div class="h2in h2in--edit">
        <div class="h2dom-wrap"><button class="h2in__dom" id="pvaiDom" type="button"><span class="h2in__domtxt">${AI_DOM}</span>/ <span class="h2in__cv">▾</span></button>${pvDomList("pvaiDomList")}</div>
        <div class="h2in__url pvurl pvurl--sm" id="pvaiDest">${AI_DEST}</div>
        <button class="h2in__go h2in__go--regen" id="pvaiRegen" type="button">${I.regen} Regenerate</button>
      </div>
      <div class="h2pick" id="pvaiPick">${[0,1,2].map(aiRow).join("")}<div class="h2pk h2pk--custom" data-i="3"><span class="h2pk__radio"></span><span class="h2pk__dom">${AI_DOM}/</span><span class="h2pk__slug pvurl__ph">your-custom-name</span><span class="h2pk__sp"></span><span class="h2pk__tag">${MGI.edit} Custom name</span><button class="h2pk__choose" data-i="3" type="button">${I.check} Choose</button></div></div>
      <div class="h2res__acts"><button class="h2res__chip h2res__chip--ghost">Shorten another</button></div>
    </div>`;
  }
  function aiState3(name){
    return `<div class="h2res">
      <div class="h2res__head"><span class="h2res__lbl">Your active short link</span><span class="h2res__badge h2res__badge--ok">${I.check} Active · 7 days left</span></div>
      <div class="h2pick"><div class="h2pk is-chosen"><span class="h2pk__radio"></span><span class="h2pk__dom">${AI_DOM}/</span><span class="h2pk__chosenname">${name}</span><span class="h2pk__sp"></span><span class="h2pk__done">${I.check} Chosen</span></div></div>
      <div class="h2res__acts"><button class="h2res__chip">${I.copy} Copy link</button><button class="h2res__chip">${I.qr} Get QR code</button><button class="h2res__chip h2res__chip--ghost">Shorten another</button></div>
      <div class="h2note h2note--win">${I.check}<div class="h2note__body"><span class="h2note__line"><b>${AI_DOM}/${name}</b> is live — copied to your clipboard.</span><span class="h2note__line2">Free for <b>7 days</b>. <a class="h2note__keep" href="#">Create a free account</a> to keep it forever — no card needed.</span></div></div>
    </div>`;
  }
  function panelAI(){ return `<div class="pvai" id="pvaiRoot">${aiState1()}</div>`; }

  /* ===== panel 1: Manage smart link (t.ly-style smart routing) ===== */
  const MGI={
    device:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    desktop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg>',
    net:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12a11 11 0 0 1 15 0M8 15.5a6 6 0 0 1 8 0"/><circle cx="12" cy="19" r="1.1" fill="currentColor" stroke="none"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3 2"/></svg>',
    lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M18 6l-1 14H7L6 6"/></svg>',
    arr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 6l6 6-6 6"/></svg>',
    def:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 6 6v5"/></svg>',
    bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 2 4 13h6l-1 9 8-12h-6z"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };
  const mgBase=[
    {k:"device",cond:"Device",val:"Mobile",dest:"apps.apple.com",pill:"App Store"},
    {k:"desktop",cond:"Device",val:"Desktop",dest:"brand.com/sale",pill:"Desktop"}
  ];
  const MGC={device:"#0A84FF",desktop:"#475569",globe:"#FF5A1F",net:"#7c5cff",clock:"#0d9488",def:"#94a3b8"};
  const FW=900,FH=360,CX=288,CY=180,XL=566,CH=44,CG=12;
  function mgRow(r,added){ return `<div class="pvmg__rule${added?' pvmg__rule--added pvmg__rule--new':''}" data-k="${r.k}" data-dest="${r.dest}" data-label="${r.val}"><span class="pvmg__rico pvmg__rico--${r.k}">${MGI[r.k]||MGI.globe}</span><span class="pvmg__rcond"><b>${r.cond}</b><i>${r.val}</i></span><span class="pvmg__rarr">${MGI.arr}</span><span class="pvmg__rdest">${r.dest}</span><span class="pvmg__racts">${MGI.edit}${MGI.trash}</span></div>`; }
  function mgDefRow(){ return `<div class="pvmg__rule pvmg__rule--def" data-k="def" data-dest="brand.com/sale" data-label="Everyone else"><span class="pvmg__rico pvmg__rico--def">${MGI.def}</span><span class="pvmg__rcond"><b>Default</b><i>everyone else</i></span><span class="pvmg__rarr">${MGI.arr}</span><span class="pvmg__rdest">brand.com/sale</span></div>`; }
  /* ----- horizontal decision-flow (visitor → resolver → destinations) ----- */
  function mgCardY(n,i){ const grp=n*CH+(n-1)*CG, startY=(FH-grp)/2; return startY+i*(CH+CG)+CH/2; }
  function mgFlowHTML(dests,newIdx){
    const n=dests.length;
    const inw=`<path class="pvmgf__wire pvmgf__wire--in" d="M150,${CY} L${CX},${CY}"/>`;
    const wires=dests.map((d,i)=>{const cy=mgCardY(n,i);return `<path class="pvmgf__wire${i===newIdx?' pvmgf__wire--new':''}" data-k="${d.k}" d="M${CX},${CY} C${CX+150},${CY} ${XL-150},${cy} ${XL},${cy}"/>`;}).join("");
    const cards=dests.map((d,i)=>{const cy=mgCardY(n,i),isdef=d.k==='def';
      return `<div class="pvmgf__dest${i===newIdx?' pvmgf__dest--new':''}${isdef?' pvmgf__dest--def':''}" data-k="${d.k}" data-cy="${cy.toFixed(1)}" style="left:${(XL/FW*100).toFixed(2)}%;top:${(cy/FH*100).toFixed(2)}%"><span class="pvmgf__destic"${isdef?'':` style="background:${d.col}"`}>${MGI[d.k]||MGI.def}</span><span class="pvmgf__desttx"><b>${d.dest}</b><small>${d.label}</small></span></div>`;}).join("");
    return `<svg class="pvmgf__wires" viewBox="0 0 ${FW} ${FH}" preserveAspectRatio="xMidYMid meet">${inw}${wires}</svg>
      <div class="pvmgf__visitor" id="pvmgfVisitor"><span class="pvmgf__vico">${MGI.device}</span><span class="pvmgf__vtx"><i>Incoming visitor</i><b>iPhone · New York</b></span></div>
      <div class="pvmgf__core" id="pvmgfCore"><span class="pvmgf__coremk">${I.link}</span><span class="pvmgf__corelb">summer-sale</span><span class="pvmgf__corering"></span></div>
      <div class="pvmgf__speed" id="pvmgfSpeed">${MGI.bolt}<span>Resolved in 38ms</span></div>
      <div class="pvmgf__packet" id="pvmgfPacket"></div>
      ${cards}`;
  }
  function mgDests(p){ return [...p.querySelectorAll(".pvmg__rule")].map(r=>({k:r.dataset.k,dest:r.dataset.dest,label:r.dataset.label,col:MGC[r.dataset.k]||MGC.def})); }
  function mgSyncFlow(p,newIdx){ const fl=p.querySelector("#pvmgFlow"); if(!fl)return; fl.innerHTML=mgFlowHTML(mgDests(p),newIdx==null?-1:newIdx); }
  function mgScene(p,which){ const r=p.querySelector("#pvmgSceneRules"),f=p.querySelector("#pvmgSceneFlow"),seg=p.querySelectorAll("#pvmgSeg i"),flow=which==="flow";
    if(r)r.classList.toggle("is-on",!flow); if(f)f.classList.toggle("is-on",flow); if(seg[0])seg[0].classList.toggle("is-on",!flow); if(seg[1])seg[1].classList.toggle("is-on",flow); }
  function pkAt(pk,x,y,ms){ if(!pk)return; pk.style.transition=ms?`left ${ms}ms cubic-bezier(.4,0,.18,1),top ${ms}ms cubic-bezier(.4,0,.18,1)`:"none"; pk.style.left=(x/FW*100)+"%"; pk.style.top=(y/FH*100)+"%"; }
  function panelManage(){
    const fbase=[{k:"device",dest:"apps.apple.com",label:"Mobile",col:MGC.device},{k:"desktop",dest:"brand.com/sale",label:"Desktop",col:MGC.desktop},{k:"def",dest:"brand.com/sale",label:"Everyone else",col:MGC.def}];
    return `<div class="pvmg">
      <div class="pvmg__top">
        <div class="pvmg__ttl"><span class="pvmg__h">Smart routing</span><span class="pvmg__lk"><span class="pvmg__lico">${I.link}</span>i.ki/<b>summer-sale</b></span></div>
        <div class="pvmg__topr"><span class="pvmg__seg" id="pvmgSeg"><i class="is-on"></i><i></i></span><span class="pvmg__live2"><i></i> Active</span><button class="pvmg__save" type="button">Save</button></div>
      </div>
      <div class="pvmg__scenes" id="pvmgScenes">
        <div class="pvmg__scene pvmg__scene--rules is-on" id="pvmgSceneRules">
          <div class="pvmg__sec"><span class="pvmg__seclbl">Smart routing</span><button class="pvmg__add" id="pvmgAdd" type="button"><b>+</b> Add rule</button></div>
          <div class="pvmg__rules" id="pvmgRules">${mgBase.map(r=>mgRow(r,false)).join("")}${mgDefRow()}</div>
          <div class="pvmg__settings"><div class="pvmg__chips"><button class="pvmg__chip" data-s="pw" type="button">${MGI.lock} Password</button><button class="pvmg__chip" data-s="exp" type="button">${MGI.clock} Expiry</button><button class="pvmg__chip is-on" data-s="utm" type="button">${I.spark} UTM</button><button class="pvmg__chip" data-s="rt" type="button">${MGI.target} Retargeting</button></div></div>
          <div class="pvmg__picker" id="pvmgPicker"><div class="pvmg__plbl">Route by…</div><div class="pvmg__pcats">${["Device","Country","Browser","Language","Time","Network"].map(c=>`<span class="pvmg__pcat" data-c="${c}">${c}</span>`).join("")}</div><div class="pvmg__popts" id="pvmgPopts"></div></div>
        </div>
        <div class="pvmg__scene pvmg__scene--flow" id="pvmgSceneFlow">
          <div class="pvmg__flowhd"><span class="pvmg__seclbl">Live routing</span><span class="pvmg__flowtag">${I.spark} Resolves every visitor in <b>~38ms</b></span></div>
          <div class="pvmgf" id="pvmgFlow">${mgFlowHTML(fbase,-1)}</div>
        </div>
      </div>
    </div>`;
  }
  async function mgAddRule(p,my,r){
    const addBtn=p.querySelector("#pvmgAdd"), picker=p.querySelector("#pvmgPicker"), popts=p.querySelector("#pvmgPopts"), cats=[...p.querySelectorAll(".pvmg__pcat")];
    moveCur(addBtn); if(!await hold(540,my))return false; clickFX(); cats.forEach(c=>c.classList.remove("is-on")); popts.innerHTML=""; picker.classList.add("show"); curHide();
    if(!await hold(780,my))return false;
    const cat=cats.find(c=>c.dataset.c===r.cat);
    moveCur(cat); if(!await hold(560,my))return false; clickFX(); cat.classList.add("is-on");
    popts.innerHTML=`<span class="pvmg__popt is-sel"><span class="pvmg__poptic">${MGI[r.k]||""}</span>${r.val}</span><span class="pvmg__pdest">${MGI.arr} ${r.dest}</span>`;
    curHide();
    if(!await hold(950,my))return false;
    const def=p.querySelector(".pvmg__rule--def");
    if(def) def.insertAdjacentHTML("beforebegin", mgRow(r,true));
    picker.classList.remove("show");
    if(!await hold(820,my))return false;
    p.querySelectorAll(".pvmg__rule--new").forEach(x=>x.classList.remove("pvmg__rule--new"));
    return true;
  }
  async function mgShot(p,scn,my){
    const vis=p.querySelector("#pvmgfVisitor"),core=p.querySelector("#pvmgfCore"),pk=p.querySelector("#pvmgfPacket"),sp=p.querySelector("#pvmgfSpeed");
    const wires=[...p.querySelectorAll(".pvmgf__wire")],cards=[...p.querySelectorAll(".pvmgf__dest")];
    if(!vis||!core||!pk||!sp)return my===gen;
    wires.forEach(w=>w.classList.remove("is-on")); cards.forEach(c=>c.classList.remove("is-on","is-dim")); sp.classList.remove("show"); core.classList.remove("hit");
    vis.querySelector(".pvmgf__vico").innerHTML=scn.ic; vis.querySelector(".pvmgf__vtx b").textContent=scn.vtx; vis.classList.add("show");
    pkAt(pk,120,CY,0); pk.classList.add("go"); void pk.offsetWidth;
    if(!await hold(160,my))return false;
    const inw=wires.find(w=>w.classList.contains("pvmgf__wire--in")); inw&&inw.classList.add("is-on");
    pkAt(pk,CX,CY,340);
    if(!await hold(430,my))return false;
    core.classList.add("hit"); inw&&inw.classList.remove("is-on");
    cards.forEach(c=>c.classList.add("is-dim"));
    if(!await hold(300,my))return false;
    const card=cards.find(c=>c.dataset.k===scn.k)||cards.find(c=>c.dataset.k==="def");
    const wire=wires.find(w=>w.dataset.k===(card&&card.dataset.k)); wire&&wire.classList.add("is-on");
    pkAt(pk,XL,card?parseFloat(card.dataset.cy):CY,380);
    if(!await hold(440,my))return false;
    cards.forEach(c=>c.classList.remove("is-dim")); if(card)card.classList.add("is-on");
    sp.innerHTML=`${MGI.bolt}<span>Resolved in ${34+Math.floor(Math.random()*12)}ms</span>`; sp.classList.add("show"); pk.classList.remove("go");
    return await hold(1150,my);
  }
  async function playManage(p,my){
    // reset to base on the rules scene
    p.querySelectorAll(".pvmg__rule--added").forEach(r=>r.remove());
    p.querySelector("#pvmgPicker").classList.remove("show");
    p.querySelector("#pvmgPopts").innerHTML="";
    p.querySelectorAll(".pvmg__pcat").forEach(c=>c.classList.remove("is-on"));
    p.querySelectorAll(".pvmg__chip").forEach(c=>c.classList.toggle("is-on",c.dataset.s==="utm"));
    mgScene(p,"rules"); mgSyncFlow(p,-1); curHide(); setSteps(0);
    if(!await hold(850,my))return;
    const rounds=[
      {rule:{k:"globe",cat:"Country",cond:"Country",val:"Japan",dest:"i.ki/jp-summer",pill:"Japan"},  scn:{ic:MGI.globe,  vtx:"Android · Tokyo",  k:"globe"}},
      {rule:{k:"net",  cat:"Network",cond:"Network",val:"VPN",  dest:"brand.com/safe", pill:"VPN"},    scn:{ic:MGI.net,    vtx:"VPN · anonymized", k:"net"}},
      {rule:{k:"clock",cat:"Time",   cond:"Time",   val:"Weekends",dest:"brand.com/flash",pill:"Weekend"},scn:{ic:MGI.clock, vtx:"Saturday · 8 PM", k:"clock"}},
    ];
    for(let n=0;n<rounds.length;n++){
      const rd=rounds[n];
      // SCENE 1 — add the rule in the rules editor
      mgScene(p,"rules"); setSteps(0); if(!await hold(n?640:480,my))return;
      if(!await mgAddRule(p,my,rd.rule))return;
      if(!await hold(460,my))return;
      // SCENE 2 — slide to the live router, animate the new branch, route a matching visitor
      mgScene(p,"flow"); setSteps(1); curHide(); if(!await hold(660,my))return;
      mgSyncFlow(p, mgDests(p).length-2);
      if(!await hold(560,my))return;
      if(!await mgShot(p,rd.scn,my))return;
      if(!await hold(760,my))return;
    }
    mgScene(p,"rules"); setSteps(2);
    return await hold(900,my);
  }

  /* ===== panel 1: QR Codes (mirrors the hero QR flow) ===== */
  const QR_DEST="https://shop.acme.com/menu/summer-2026";
  function makeQR(t){ const q=qrcode(0,"M"); q.addData(t); q.make(); const n=q.getModuleCount(); let r=""; for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(q.isDark(y,x))r+=`<rect x="${x}" y="${y}" width="1" height="1"/>`; return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#fff"/><g fill="#171717">${r}</g></svg>`; }
  function qrState1(){
    return `<div class="h2in__title">Paste your URL to generate a QR</div>
      <div class="h2in"><div class="h2in__url pvurl" id="pvqrUrl"><span class="pvurl__ph">https://example.com/your-long-url</span></div><button class="h2in__go" id="pvqrGo" type="button">Generate QR ${I.arrr}</button></div>
      <p class="h2in__hint"><span class="o">✦</span> Instant QR — powered by a trackable i.ki link you can <b>edit anytime</b>. Free for 7 days, no card.</p>`;
  }
  function qrState2(slug){
    return `<div class="h2res">
      <div class="h2res__head"><span class="h2res__lbl">Your QR code</span><span class="h2res__badge h2res__badge--ok">${I.check} Active · 7 days left</span></div>
      <div class="h2res__qr">
        <div class="h2res__qrcol"><div class="h2res__qrbox pvin" id="pvqrBox">${makeQR("https://i.ki/"+slug)}</div><span class="h2res__scan">${I.qr} Scan to test</span></div>
        <div class="h2res__qrside">
          <span class="h2res__qrtag"><span class="o">✦</span> Dynamic QR — editable</span>
          <span class="h2res__lbl2">Points to</span>
          <div class="h2res__link h2res__link--sm"><span class="h2res__dom">i.ki/</span><span class="h2pk__slug" id="pvqrSlug">${slug}</span><i class="pvai__caret" id="pvqrCaret" style="display:none"></i><span class="h2res__pen">${MGI.edit}</span></div>
          <button class="h2res__copy" type="button">${I.dl} Download QR</button>
          <button class="h2res__chip h2res__chip--ghost" type="button">${I.link} Get short link</button>
        </div>
      </div>
      <div class="h2note h2note--win">${I.check}<div class="h2note__body"><span class="h2note__line">Your QR for <b>i.ki/<span id="pvqrName">${slug}</span></b> is live — edit the destination anytime, no reprint.</span><span class="h2note__line2">Free for <b>7 days</b>. <a class="h2note__keep" href="#">Create a free account</a> to keep it forever — no card needed.</span></div></div>
    </div>`;
  }
  function panelQR(){ return `<div class="pvai" id="pvqrRoot">${qrState1()}</div>`; }
  async function playQR(p,my){
    const root=p.querySelector("#pvqrRoot"); if(!root)return;
    root.innerHTML=qrState1(); curHide(); setSteps(0);
    const urlEl=root.querySelector("#pvqrUrl"), go=root.querySelector("#pvqrGo");
    if(!await hold(560,my))return;
    for(let i=0;i<=QR_DEST.length;i+=2){ if(my!==gen)return; urlEl.textContent=QR_DEST.slice(0,i); urlEl.insertAdjacentHTML("beforeend",'<span class="pvai__caret"></span>'); if(!reduced)await wait(13); if(hovered){while(hovered&&my===gen)await wait(70);} }
    urlEl.textContent=QR_DEST;
    if(!await hold(500,my))return;
    setSteps(1); moveCur(go); if(!await hold(620,my))return; clickFX(); go.innerHTML='<span class="pvspin"></span> Generating'; curHide();
    if(!await hold(900,my))return;
    root.innerHTML=qrState2("summer-menu");
    if(!await hold(1900,my))return;
    // dynamic beat: edit the slug → QR rebuilds live, no reprint
    setSteps(2);
    const slugEl=root.querySelector("#pvqrSlug"), box=root.querySelector("#pvqrBox"), name=root.querySelector("#pvqrName"), caret=root.querySelector("#pvqrCaret"), pen=root.querySelector(".h2res__pen");
    moveCur(pen); if(!await hold(580,my))return; clickFX(); caret.style.display="inline-block"; curHide();
    for(let k=0;k<4;k++){ if(my!==gen)return; slugEl.textContent=slugEl.textContent.slice(0,-1); if(!reduced)await wait(95); }
    for(const ch of "v2"){ if(my!==gen)return; slugEl.textContent+=ch; if(!reduced)await wait(150); }
    caret.style.display="none"; name.textContent=slugEl.textContent;
    box.classList.remove("pvin"); void box.offsetWidth; box.innerHTML=makeQR("https://i.ki/"+slugEl.textContent); box.classList.add("pvin");
    if(!await hold(550,my))return;
    showToast("QR updated to i.ki/"+slugEl.textContent+" — no reprint needed");
    if(!await hold(1900,my))return; hideToast();
    return await hold(800,my);
  }

  /* ===== panel 2: Manage links (dub-style link editor, i.ki skin) ===== */
  const LK_DOMS=[["i.ki","Default short domain"],["iki.link","Short i.ki domain"],["go.acme.com","Your custom domain · Pro"]];
  const LKQ='<svg class="pvlk__q" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.6-3 4.5"/><path d="M12 18h.01"/></svg>';
  const LKOG={
    x:{who:"@acmeshop · now",logo:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z"/></svg>'},
    tt:{who:"@acmeshop · 2.1M followers",logo:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>'},
    li:{who:"Acme · 12,408 followers",logo:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>'},
  };
  function lkInner(){
    return `
      <div class="pvlk__scenes">
        <div class="pvlk__scene pvlk__scene--form is-on" id="pvlkSceneForm">
          <div class="pvlk__lbl">Destination URL ${LKQ}</div>
          <div class="pvlk__field pvlk__field--mono">https://shop.acme.com/collections/summer-sale</div>
          <div class="pvlk__lbl">Short link ${LKQ}<span class="pvlk__lic">${MGI.edit}${I.copy}</span></div>
          <div class="pvlk__row">
            <button class="pvlk__dom" id="pvlkDom" type="button"><b id="pvlkDomTxt">i.ki</b>/ <i>▾</i></button>
            <div class="pvlk__slug">summer-sale</div>
            ${pvDomList("pvlkDrop")}
          </div>
          <div class="pvlk__lbl">Tags ${LKQ}<span class="pvlk__manage">Manage</span></div>
          <div class="pvlk__tags" id="pvlkTags"><span class="pvlk__tic">${I.tag}</span><span class="pvlk__tag">summer</span><span class="pvlk__tagin" id="pvlkTagIn"></span><i class="pvai__caret" id="pvlkTagCaret" style="display:none"></i></div>
          <div class="pvlk__lbl">Description ${LKQ}</div>
          <div class="pvlk__area" id="pvlkDesc"><span class="pvurl__ph" id="pvlkDescPh">Add a note so your team knows what this link is for…</span><span id="pvlkDescTx"></span><i class="pvai__caret" id="pvlkDescCaret" style="display:none"></i></div>
          <div class="pvlk__ct"><span class="pvlk__ctlbl">Conversion Tracking ${LKQ}</span><span class="pvtgl" id="pvlkCT"></span></div>
          <div class="pvlk__chips">
            <button class="pvmg__chip" id="pvlkUTM" type="button">${I.spark} UTM</button>
            <button class="pvmg__chip" id="pvlkTgt" type="button">${MGI.target} Targeting</button>
            <button class="pvmg__chip" id="pvlkAB" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><path d="M10 2v6L4.7 17a3 3 0 0 0 2.6 4.5h9.4A3 3 0 0 0 19.3 17L14 8V2"/><path d="M8.5 2h7"/><path d="M7 14h10"/></svg> A/B Test</button>
            <button class="pvmg__chip" id="pvlkPW" type="button">${MGI.lock} Password</button>
            <button class="pvmg__chip" id="pvlkExpChip" type="button">${MGI.clock} <span id="pvlkExpTxt">Expiration</span></button>
            <button class="pvmg__chip pvlk__more" id="pvlkMore" type="button">⋯</button>
            <div class="pvlk__pop" id="pvlkPop"></div>
          </div>
          <div class="pvlk__bar" id="pvlkBar"><span id="pvlkBarTx">Unsaved changes</span><span class="pvlk__sp"></span><button class="pvlk__discard" type="button">Discard</button><button class="pvlk__save" id="pvlkSave" type="button">Save changes</button></div>
        </div>
        <div class="pvlk__scene pvlk__scene--prev" id="pvlkScenePrev">
          <div class="pvlk__savedbn">${I.check} Changes saved — live everywhere in <b>~38ms</b></div>
          <div class="fxog__post fxog__post--x pvlk__post" id="pvlkPost">
            <div class="fxog__phead"><span class="fxog__av" id="pvlkPostAv">${LKOG.x.logo}</span><div class="fxog__who"><b>Acme</b><i id="pvlkPostWho">${LKOG.x.who}</i></div></div>
            <p class="fxog__txt">Summer drop is LIVE 🔥 → <span>go.acme.com/summer-sale</span></p>
            <div class="fxog__wrap"><div class="fxog__prev fxog__prev--after" style="opacity:1;transform:none"><div class="fxog__img"><b>SUMMER<br/>SALE</b><em>−40%</em></div><div class="fxog__meta"><i>go.acme.com/summer-sale</i><b>Acme Summer Sale — up to 40% off</b><span>Fresh fits for the season. Free shipping this week only.</span></div></div></div>
          </div>
          <div class="fxog__plats" id="pvlkPlats"><i>Looks right on</i><span data-p="x" class="is-on">X</span><span data-p="tt">TikTok</span><span data-p="li">LinkedIn</span></div>
          <div class="pvlk__prevcap"><span class="o">✦</span> Saved — and your link looks right everywhere you share it.</div>
        </div>
      </div>`;
  }
  function panelLinks(){ return `<div class="pvlk" id="pvlkRoot">${lkInner()}</div>`; }
  function lkScene(root,w){ root.querySelector("#pvlkSceneForm").classList.toggle("is-on",w==="form"); root.querySelector("#pvlkScenePrev").classList.toggle("is-on",w==="prev"); }
  async function typeInto(el,caret,text,my,d){ caret.style.display="inline-block"; for(const ch of text){ if(my!==gen)return false; el.textContent+=ch; if(!reduced)await wait(d||34); if(hovered){while(hovered&&my===gen)await wait(70);} } caret.style.display="none"; return my===gen; }
  async function playLinks(p,my){
    const root=p.querySelector("#pvlkRoot"); if(!root)return;
    root.innerHTML=lkInner(); curHide(); setSteps(0);
    const dom=root.querySelector("#pvlkDom"), domTxt=root.querySelector("#pvlkDomTxt"), drop=root.querySelector("#pvlkDrop");
    const bar=root.querySelector("#pvlkBar");
    if(!await hold(850,my))return;
    // 1) custom domain: open the hero-style domain menu → pick go.acme.com (Your own domain · Pro)
    setSteps(1); moveCur(dom); if(!await hold(600,my))return; clickFX(); drop.hidden=false;
    if(!await hold(1050,my))return;
    const opt=drop.querySelector('[data-d="go.acme.com"]'); moveCur(opt); if(!await hold(680,my))return; clickFX();
    drop.querySelectorAll(".h2domitem").forEach(o=>o.classList.toggle("is-sel",o.dataset.d==="go.acme.com"));
    if(!await hold(300,my))return;
    drop.hidden=true; domTxt.textContent="go.acme.com"; bar.classList.add("show"); curHide();
    if(!await hold(950,my))return;
    // 2) add a tag
    const tags=root.querySelector("#pvlkTags"), tin=root.querySelector("#pvlkTagIn"), tcar=root.querySelector("#pvlkTagCaret");
    moveCur(tags); if(!await hold(560,my))return; clickFX(); curHide();
    if(!await typeInto(tin,tcar,"paid-social",my,40))return;
    tin.insertAdjacentHTML("beforebegin",'<span class="pvlk__tag pvlk__tag--new">paid-social</span>'); tin.textContent="";
    showToast("Tag created — paid-social");
    if(!await hold(1300,my))return; hideToast();
    // 3) description
    const desc=root.querySelector("#pvlkDesc"), dtx=root.querySelector("#pvlkDescTx"), dcar=root.querySelector("#pvlkDescCaret");
    moveCur(desc); if(!await hold(540,my))return; clickFX(); root.querySelector("#pvlkDescPh").remove(); curHide();
    if(!await typeInto(dtx,dcar,"Summer drop — TikTok paid push, IG bio from Jul 1.",my,26))return;
    if(!await hold(550,my))return;
    // 3b) flick Conversion Tracking on
    const ct=root.querySelector("#pvlkCT");
    moveCur(ct); if(!await hold(560,my))return; clickFX(); ct.classList.add("on"); curHide();
    if(!await hold(650,my))return;
    // 4) tour the toolbox — every function gets clicked, like the dub demo
    const pop=root.querySelector("#pvlkPop");
    async function chipPop(chip,html,activate){
      moveCur(chip); if(!await hold(550,my))return false; clickFX();
      pop.innerHTML=html; pop.style.left=Math.max(0,Math.min(chip.offsetLeft,440))+"px"; pop.classList.add("show"); curHide();
      if(!await hold(1120,my))return false;
      pop.classList.remove("show"); if(activate)chip.classList.add("is-on");
      return await hold(260,my);
    }
    if(!await chipPop(root.querySelector("#pvlkUTM"),`<div class="pvlk__poplbl">UTM builder</div><div class="pvlk__popdate pvlk__popdate--mono">utm_source <b>tiktok</b></div><div class="pvlk__popdate pvlk__popdate--mono">utm_campaign <b>summer</b></div>`,true))return;
    if(!await chipPop(root.querySelector("#pvlkTgt"),`<div class="pvlk__poplbl">Targeting</div><div class="pvlk__popdate">${MGI.device} iOS → App Store</div><div class="pvlk__popdate">${MGI.globe} JP → i.ki/jp</div><div class="pvlk__popnote">Full rules live in Smart routing →</div>`,false))return;
    if(!await chipPop(root.querySelector("#pvlkAB"),`<div class="pvlk__poplbl">A/B test</div><div class="pvlk__popdate pvlk__popdate--mono">A · /summer-sale <b>50%</b></div><div class="pvlk__popdate pvlk__popdate--mono">B · /summer-v2 <b>50%</b></div>`,true))return;
    if(!await chipPop(root.querySelector("#pvlkPW"),`<div class="pvlk__poplbl">Password</div><div class="pvlk__popdate pvlk__popdate--mono">${MGI.lock} ••••••••</div><div class="pvlk__popnote">Required before redirecting</div>`,true))return;
    // 4b) expiration — kept with its Set click
    const chip=root.querySelector("#pvlkExpChip");
    moveCur(chip); if(!await hold(560,my))return; clickFX();
    pop.innerHTML=`<div class="pvlk__poplbl">Link expires on</div><div class="pvlk__popdate">${I.cal} Jul 31, 2026 · 11:59 PM</div><div class="pvlk__poplbl">Then redirect to</div><div class="pvlk__popdate pvlk__popdate--mono">${I.link} brand.com/sale</div><button class="pvlk__popset" id="pvlkPopSet" type="button">Set expiry</button>`;
    pop.style.left=Math.max(0,Math.min(chip.offsetLeft,440))+"px"; pop.classList.add("show");
    if(!await hold(900,my))return;
    const setBtn=root.querySelector("#pvlkPopSet"); moveCur(setBtn); if(!await hold(620,my))return; clickFX();
    pop.classList.remove("show"); chip.classList.add("is-on"); root.querySelector("#pvlkExpTxt").textContent="Jul 31, 2026"; curHide();
    if(!await hold(650,my))return;
    // 4c) ⋯ reveals the rest of the toolbox
    const more=root.querySelector("#pvlkMore");
    moveCur(more); if(!await hold(520,my))return; clickFX();
    more.insertAdjacentHTML("beforebegin",`<button class="pvmg__chip pvin" type="button">${MGI.net} Cloaking</button><button class="pvmg__chip pvin" type="button">${I.glob} Indexing</button>`);
    curHide();
    if(!await hold(950,my))return;
    // 5) save → flip to the link-preview payoff scene
    setSteps(2);
    const save=root.querySelector("#pvlkSave"); moveCur(save); if(!await hold(660,my))return; clickFX(); curHide();
    bar.classList.add("ok"); bar.querySelector("#pvlkBarTx").innerHTML=`${I.check} Saved`;
    root.querySelector(".pvlk__discard").style.display="none"; save.style.display="none";
    if(!await hold(750,my))return;
    lkScene(root,"prev");
    // payoff: the saved link as a social preview, cycling X → TikTok → LinkedIn (same component as Custom Link Previews)
    const post=root.querySelector("#pvlkPost"), av=root.querySelector("#pvlkPostAv"), who=root.querySelector("#pvlkPostWho"), plats=[...root.querySelectorAll("#pvlkPlats span")];
    const order=["x","tt","li"]; let pi=1;
    const cyc=setInterval(()=>{ if(my!==gen){clearInterval(cyc);return;} const k=order[pi%3];
      post.className="fxog__post fxog__post--"+k+" pvlk__post"; av.innerHTML=LKOG[k].logo; who.textContent=LKOG[k].who;
      plats.forEach(s=>s.classList.toggle("is-on",s.dataset.p===k)); pi++; },1600);
    const ok=await hold(5400,my); clearInterval(cyc); return ok;
  }

  /* ===== panel 4: analytics (compact to fit) ===== */
  const kpis=[["Total clicks","284,192","+18.4%"],["Unique visitors","192,840","+12.1%"],["Conversion rate","6.8%","+2.3%"],["QR scans","48,210","+31.0%"]];
  const countries=[["jp","Japan","38"],["us","United States","24"],["gb","United Kingdom","14"],["de","Germany","13"],["sg","Singapore","9"]];
  const sources=[["tiktok","TikTok","42"],["si-instagram","Instagram","28"],["si-youtube","YouTube","17"],["","Direct","13"]];
  const spark=(cls)=>`<svg class="${cls}__svg" viewBox="0 0 820 180" preserveAspectRatio="none"><defs><linearGradient id="pvg${cls}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".18"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></linearGradient></defs><path class="${cls}__area" d="M0 146 C70 138 120 108 200 98 C290 88 330 52 410 46 C470 42 520 64 600 54 C680 45 740 26 820 20 L820 180 L0 180 Z" fill="url(#pvg${cls})"/><path class="${cls}__line" d="M0 146 C70 138 120 108 200 98 C290 88 330 52 410 46 C470 42 520 64 600 54 C680 45 740 26 820 20" fill="none" stroke="#ff5a1f" stroke-width="2.6"/></svg>`;
  /* period datasets for the 30D / 7D / 24H segment animation */
  const AN={
    "30D":{perf:"last 30 days",kpi:["284,192","192,840","6.8%","48,210"],delta:["+18.4%","+12.1%","+2.3%","+31.0%"],ctry:[38,24,14,13,9],src:[42,28,17,13],dev:[62,30,8],chart:[120,138,132,158,150,176,168,196,210,202,228,242,236,262]},
    "7D":{perf:"last 7 days",kpi:["68,420","47,910","7.4%","11,860"],delta:["+9.2%","+6.4%","+1.1%","+12.0%"],ctry:[35,27,15,12,11],src:[46,26,16,12],dev:[58,33,9],chart:[150,120,186,140,206,176,232]},
    "24H":{perf:"last 24 hours",kpi:["9,840","6,720","8.1%","1,940"],delta:["+4.1%","+3.0%","+0.6%","+5.2%"],ctry:[31,29,16,13,11],src:[39,31,18,12],dev:[66,27,7],chart:[70,150,96,176,120,206,150,222,170,238,150,206]}
  };
  function anChart(v){const W=820,H=180,n=v.length,mx=Math.max.apply(null,v)*1.12,X=i=>Math.round(i/(n-1)*W),Y=t=>Math.round(165-t/mx*150);let d="M0 "+Y(v[0]);for(let i=1;i<n;i++)d+=" L"+X(i)+" "+Y(v[i]);return{line:d,area:d+" L"+W+" "+H+" L0 "+H+" Z"};}
  function anSvg(){const ch=anChart(AN["30D"].chart);return `<svg class="pvan__svg" viewBox="0 0 820 180" preserveAspectRatio="none"><defs><linearGradient id="pvgpvan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".18"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></linearGradient></defs><path class="pvan__area" d="${ch.area}" fill="url(#pvgpvan)"/><path class="pvan__line" d="${ch.line}" fill="none" stroke="#ff5a1f" stroke-width="2.6"/></svg>`;}
  const setSeg=(segs,idx)=>segs.forEach((s,i)=>s.classList.toggle("is-on",i===idx));
  function anDonut(p,dev){const mob=p.querySelector(".pvdn--mob");if(mob)mob.style.strokeDashoffset=String(Math.round(289*(1-dev[0]/100)));const c=p.querySelector(".pvan__dctr b");if(c)c.textContent=dev[0]+"%";p.querySelectorAll(".pvan__dleg b").forEach((b,i)=>{if(dev[i]!=null)b.textContent=dev[i]+"%";});}
  function anBars(p,d){const t=p.querySelectorAll(".pvan__tile");[[t[0],d.ctry],[t[2],d.src]].forEach(pair=>{const tile=pair[0],arr=pair[1];if(!tile)return;tile.querySelectorAll(".pvan__row").forEach((r,i)=>{const bar=r.querySelector(".pvan__bar i"),pct=r.querySelector(".pvan__pct");if(bar&&arr[i]!=null)bar.style.setProperty("--w",arr[i]+"%");if(pct&&arr[i]!=null)pct.textContent=arr[i]+"%";});});}
  function anChartSet(p,key){const ch=anChart(AN[key].chart),line=p.querySelector(".pvan__line"),area=p.querySelector(".pvan__area");if(line)line.setAttribute("d",ch.line);if(area)area.setAttribute("d",ch.area);}
  function anReset(p){setSeg([...p.querySelectorAll(".pvan__seg b")],0);const d=AN["30D"],perf=p.querySelector(".pvan__perf");if(perf)perf.textContent="Performance · "+d.perf;p.querySelectorAll(".pvan__kn").forEach((n,i)=>{n.dataset.to=d.kpi[i];n.textContent="0";});p.querySelectorAll(".pvan__kd").forEach((e,i)=>e.textContent=d.delta[i]+" ↑");anChartSet(p,"30D");anBars(p,d);const mob=p.querySelector(".pvdn--mob");if(mob){mob.style.transition="none";mob.style.strokeDashoffset="289";void mob.getBoundingClientRect();mob.style.transition="";}const c=p.querySelector(".pvan__dctr b");if(c)c.textContent=d.dev[0]+"%";p.querySelectorAll(".pvan__dleg b").forEach((b,i)=>b.textContent=d.dev[i]+"%");}
  function anApply(p,key,my){const d=AN[key],perf=p.querySelector(".pvan__perf");if(perf)perf.textContent="Performance · "+d.perf;p.querySelectorAll(".pvan__kn").forEach((n,i)=>{n.dataset.to=d.kpi[i];countUp(n,my);});p.querySelectorAll(".pvan__kd").forEach((e,i)=>e.textContent=d.delta[i]+" ↑");anChartSet(p,key);p.classList.remove("pvc");void p.offsetWidth;p.classList.add("pvc");anBars(p,d);anDonut(p,d.dev);}
  const flag=(c)=>c?`<img class="pvan__flag" src="img/flags/${c}.svg" alt=""/>`:`<span class="pvan__flag pvan__flag--g"></span>`;
  const srcIc=(c)=>c?`<img class="pvan__sic" src="img/logos/${c}.svg" alt=""/>`:`<span class="pvan__sic pvan__sic--g"><svg viewBox="0 0 24 24" fill="none" stroke="#737373" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg></span>`;
  const logs=[
    ["Chrome","macOS","English (US)","TikTok","No","Jakarta, ID","Jun 9, 2:47 pm"],
    ["Safari","iPhone","English (UK)","Instagram","Yes","London, UK","Jun 9, 2:41 pm"],
    ["Chrome","Android","Japanese","Direct","Yes","Tokyo, JP","Jun 9, 2:38 pm"],
    ["Edge","Windows","German","YouTube","No","Berlin, DE","Jun 9, 2:30 pm"],
    ["Samsung","Android","English (SG)","Direct","Yes","Singapore, SG","Jun 9, 2:22 pm"],
    ["Safari","iPad","English (US)","Email","No","New York, US","Jun 9, 2:14 pm"],
    ["Firefox","Linux","French","LinkedIn","No","Paris, FR","Jun 9, 2:05 pm"],
  ];
  const ICexp={csv:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',pdf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'};
  function logsHTML(){
    const cols=["Browser","Platform","Language","Referrer","QR Scan","Location","Date"];
    const body=logs.map((r)=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="pvlog__qr pvlog__qr--${r[4]==="Yes"?"y":"n"}">${r[4]}</span></td><td>${r[5]}</td><td class="pvlog__dt">${r[6]}</td></tr>`).join("");
    return `<div class="pvlog">
      <div class="pvlog__bar">
        <div class="pvlog__search">${ICexp.search}<input placeholder="Search by geo, referrer, device…" readonly></div>
        <button class="pvlog__exp" data-k="csv" type="button">${ICexp.csv} CSV</button>
        <button class="pvlog__exp" data-k="pdf" type="button">${ICexp.pdf} PDF</button>
      </div>
      <div class="pvlog__meta"><span>Showing <b>1–${logs.length}</b> of <b>48,210</b> clicks</span><span class="pvlog__live"><i></i> Live</span></div>
      <div class="pvlog__wrap"><table class="pvlog__tbl"><thead><tr>${cols.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>
    </div>`;
  }
  function panelAnalytics(){
    return `<div class="pvan">
      <div class="pvan__tabs"><button class="pvst is-on" data-v="overview" type="button">Overview</button><button class="pvst" data-v="logs" type="button">Detailed logs</button></div>
      <div class="pvan__view pvan__view--logs">${logsHTML()}</div>
      <div class="pvan__view pvan__view--overview is-on">
        <div class="pvan__top"><span class="pvan__perf">Performance · last 30 days</span><span class="pvan__seg"><b class="is-on">30D</b><b>7D</b><b>24H</b></span></div>
        <div class="pvan__kpis">${kpis.map(k=>`<div class="pvan__kpi"><div class="pvan__kl">${k[0]}</div><div class="pvan__kn" data-to="${k[1]}">0</div><div class="pvan__kd">${k[2]} ↑</div></div>`).join("")}</div>
        <div class="pvan__chart">${anSvg()}</div>
        <div class="pvan__tiles">
          <div class="pvan__tile"><div class="pvan__th">TOP COUNTRIES</div>${countries.map(c=>`<div class="pvan__row"><span class="pvan__lbl">${flag(c[0])}${c[1]}</span><span class="pvan__bar"><i style="--w:${c[2]}%"></i></span><span class="pvan__pct">${c[2]}%</span></div>`).join("")}</div>
          <div class="pvan__tile pvan__tile--donut"><div class="pvan__th">DEVICES</div><div class="pvan__donut"><svg viewBox="0 0 120 120"><circle class="pvdn pvdn--bg" cx="60" cy="60" r="46"/><circle class="pvdn pvdn--mob" cx="60" cy="60" r="46"/></svg><div class="pvan__dctr"><b>62%</b><small>Mobile</small></div></div><div class="pvan__dleg"><span><i class="d1"></i>Mobile<b>62%</b></span><span><i class="d2"></i>Desktop<b>30%</b></span><span><i class="d3"></i>Tablet<b>8%</b></span></div></div>
          <div class="pvan__tile"><div class="pvan__th">TOP SOURCES</div>${sources.map(s=>`<div class="pvan__row"><span class="pvan__lbl">${srcIc(s[0])}${s[1]}</span><span class="pvan__bar"><i style="--w:${s[2]}%"></i></span><span class="pvan__pct">${s[2]}%</span></div>`).join("")}</div>
        </div>
      </div>
    </div>`;
  }
  function setSubView(p,v){ p.querySelectorAll(".pvan__view").forEach(el=>el.classList.toggle("is-on",el.classList.contains("pvan__view--"+v))); p.querySelectorAll(".pvst").forEach(b=>b.classList.toggle("is-on",b.dataset.v===v)); }
  /* export-to-CSV/PDF feedback (spinner → ✓ Exported + toast) */
  let pvToast=null;
  function showToast(msg){ if(!win)return; if(!pvToast){pvToast=document.createElement("div");pvToast.className="pvtoast";win.appendChild(pvToast);} pvToast.innerHTML=`<span class="pvtoast__ic">${I.check}</span> ${msg}`; pvToast.classList.add("show"); }
  function hideToast(){ if(pvToast)pvToast.classList.remove("show"); }
  function expDefault(b){ return b.dataset.k==="pdf"?`${ICexp.pdf} PDF`:`${ICexp.csv} CSV`; }
  function resetExports(p){ p.querySelectorAll(".pvlog__exp").forEach(b=>{ b.className="pvlog__exp"; b.innerHTML=expDefault(b); }); }
  function doExport(p,btn,kind){ if(!btn)return; btn.className="pvlog__exp is-busy"; btn.innerHTML=`<span class="pvlog__spin"></span> Exporting…`; setTimeout(()=>{ btn.className="pvlog__exp is-done"; btn.innerHTML=`${I.check} Exported`; showToast(`analytics.${kind} exported · 48,210 rows`); },700); setTimeout(()=>{ btn.className="pvlog__exp"; btn.innerHTML=expDefault(btn); hideToast(); },2500); }

  /* ===== panel 2: affiliate (Applications + Payouts + Overview) ===== */
  const apps=[["MT","Mia Thompson","jp","@mia.thomp.son","JP"],["EB","Ethan Brooks","de","@ethan_brooks","DE"],["JC","Jessica Coleman","us","@jess.coleman","US"],["LR","Logan Rivers","gb","@logan.rivers","UK"],["SA","Sophie Anderson","sg","@sophie_a","SG"]];
  const payouts=[["SA","Sophie Anderson","#ff5a1f","pend","$340.00","Oct 2 – Nov 30"],["LR","Luca Romano","#1f9d57","pend","$340.00","Oct 1 – Nov 28"],["ES","Emma Stevenson","#3b82f6","done","$42.10","Nov 4 – Nov 24"],["LV","Lucas Vega","#a855f7","done","$33.75","Oct 5 – Nov 20"],["MT","Mia Thompson","#f59e0b","done","$19.85","Oct 6 – Nov 20"],["JT","Jimmy Tey","#ec4899","done","$342.67","Sep 12 – Nov 19"],["EC","Ethan Carter","#0ea5e9","done","$512.89","Sep 1 – Nov 18"],["OC","Olivia Carter","#6366f1","done","$785.45","Aug 23 – Nov 14"]];
  const paidOn=["Dec 12","Dec 12","Dec 8","Dec 7","Dec 7","Dec 2","Dec 2","Dec 1"];
  const plinks=[["Landing page","partners.i.ki/acme-projects"],["Application page","partners.i.ki/acme-projects/apply"],["Partner portal","partners.i.ki/programs/acme-projects"]];
  const plkIc=[I.glob,I.doc,I.portal];
  const revVals=[420,470,540,500,560,300,160,300,520,610,560,470,420,500,560,640,700,650,560,470,540,210];
  const pill=(st)=>st==="done"?`<span class="pvaf__pst pvaf__pst--done">${I.check} Completed</span>`:`<span class="pvaf__pst pvaf__pst--pend">Pending</span>`;
  const AV={"Mia Thompson":"mia","Ethan Brooks":"ethanb","Jessica Coleman":"jessica","Logan Rivers":"logan","Sophie Anderson":"sophie","Luca Romano":"luca","Emma Stevenson":"emma","Lucas Vega":"lucas","Jimmy Tey":"jimmy","Ethan Carter":"ethanc","Olivia Carter":"olivia"};
  const avImg=(name)=>`<img class="pvav__img" src="img/avatars/${AV[name]||"admin"}.jpg" alt="" loading="lazy"/>`;
  function ovChart(){const W=560,H=170,n=revVals.length,mx=800,X=i=>Math.round(i/(n-1)*W),Y=v=>Math.round(H-v/mx*H);let d="M0 "+Y(revVals[0]);for(let i=1;i<n;i++)d+=" L"+X(i)+" "+Y(revVals[i]);return{W,H,d,area:d+" L"+W+" "+H+" L0 "+H+" Z",grid:[0,200,400,600,800].map(v=>`<line x1="0" y1="${Y(v)}" x2="${W}" y2="${Y(v)}"/>`).join(""),lx:X(n-1),ly:Y(revVals[n-1])};}
  function panelAffiliate(){
    const c=ovChart();
    return `<div class="pvaf">
      <aside class="pvaf__side">
        <div class="pvaf__brand"><span class="pvaf__logo">iK</span>Partner Program</div>
        <a class="pvaf__nav" data-v="over"><span class="pvaf__ni">${I.over}</span>Overview</a>
        <a class="pvaf__nav" data-v="pay"><span class="pvaf__ni">${I.pay}</span>Payouts<b class="pvaf__cnt">2</b></a>
        <a class="pvaf__nav is-on" data-v="apps"><span class="pvaf__ni">${I.app}</span>Applications<b class="pvaf__cnt">${apps.length}</b></a>
      </aside>
      <div class="pvaf__main">
        <div class="pvaf__view pvaf__view--apps is-on" id="pvafApps">
          <div class="pvaf__head"><h4>Applications</h4><div class="pvaf__act" id="pvafAct"><span class="pvaf__sel" id="pvafSel">0 selected</span><button class="pvaf__approve">${I.check} Approve</button></div></div>
          <div class="pvaf__rows">
            ${apps.map((a,i)=>`<div class="pvaf__r" data-i="${i}"><span class="pvaf__chk"></span><span class="pvaf__av pvaf__av--img">${avImg(a[1])}</span><span class="pvaf__nm">${a[1]}<span class="pvaf__vb">${I.check}</span></span><span class="pvaf__date">Dec 12, 2026</span><span class="pvaf__cty">${flag(a[2])}${a[4]}</span><span class="pvaf__h">${a[3]}</span></div>`).join("")}
          </div>
        </div>
        <div class="pvaf__view pvaf__view--pay" id="pvafPay">
          <div class="pvaf__head"><h4>Payouts</h4></div>
          <div class="pvaf__paybar">
            <div class="pvaf__pcell"><div class="pvaf__pinfo"><span class="pvaf__pl2">Pending payouts</span><b class="pvaf__pamt" id="pvafPend">$680.00 <i>USD</i></b></div><button class="pvaf__confirm" id="pvafConfirm">${I.check} Confirm payouts</button></div>
            <div class="pvaf__pcell"><div class="pvaf__pinfo"><span class="pvaf__pl2">Total paid</span><b class="pvaf__pamt" id="pvafPaid">$10,981.00 <i>USD</i></b></div><button class="pvaf__ghost">View invoices</button></div>
          </div>
          <button class="pvaf__settings">Payout settings</button>
          <div class="pvaf__ptbl">
            <div class="pvaf__ph2"><span>Period</span><span>Partner</span><span>Status</span><span>Paid</span><span class="r">Amount</span></div>
            ${payouts.map((pp,i)=>`<div class="pvaf__pr" data-st0="${pp[3]}"><span class="pvaf__period">${pp[5]}, 2025</span><span class="pvaf__pl"><span class="pvaf__av pvaf__av--img">${avImg(pp[1])}</span>${pp[1]}</span><span class="pvaf__stwrap">${pill(pp[3])}</span><span class="pvaf__paid"><span class="pvaf__pdav">${avImg("admin")}</span>${paidOn[i]}</span><span class="pvaf__amt">${pp[4]}</span></div>`).join("")}
          </div>
          <div class="pvaf__fade"></div>
        </div>
        <div class="pvaf__view pvaf__view--over" id="pvafOver">
          <div class="pvaf__head"><h4>Overview</h4><button class="pvaf__drop"><span class="pvaf__ni">${I.cal}</span>Last 30 days <svg class="pvaf__cv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button></div>
          <div class="pvaf__ov">
            <div class="pvaf__rev">
              <div class="pvaf__revtop"><span class="pvaf__revl">Revenue</span><button class="pvaf__viewall">View all</button></div>
              <div class="pvaf__revn" data-to="$210,429.00">$0</div>
              <div class="pvaf__chart2">
                <div class="pvaf__chartrow">
                  <div class="pvaf__yax"><span>$800</span><span>$600</span><span>$400</span><span>$200</span><span>$0</span></div>
                  <div class="pvaf__plot">
                    <svg class="pvaf__svg2" viewBox="0 0 ${c.W} ${c.H}" preserveAspectRatio="none"><defs><linearGradient id="pvafg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".2"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></linearGradient></defs><g class="pvaf__grid">${c.grid}</g><path class="pvaf__area" d="${c.area}" fill="url(#pvafg)"/><path class="pvaf__line" d="${c.d}" fill="none" stroke="#ff5a1f" stroke-width="2.4"/></svg>
                    <i class="pvaf__dot" id="pvafDot" style="left:${(c.lx/c.W*100).toFixed(2)}%;top:${(c.ly/c.H*100).toFixed(2)}%"></i>
                  </div>
                </div>
                <div class="pvaf__xax"><span>Tue, Nov 11</span><span>Thu, Dec 11</span></div>
              </div>
            </div>
            <div class="pvaf__ovr">
              <div class="pvaf__tasks"><div class="pvaf__tt">Tasks</div><div class="pvaf__task">${I.check}<span>Confirm pending payouts</span><b>2</b></div><div class="pvaf__task">${I.check}<span>Respond to partners</span><b>4</b></div><div class="pvaf__task">${I.check}<span>Review new applications</span><b>12</b></div></div>
              <div class="pvaf__links"><div class="pvaf__linkstop"><span>Program links</span><button class="pvaf__brand2">${I.brush} Branding</button></div>${plinks.map((l,i)=>`<a class="pvaf__link"><span class="pvaf__lkic">${plkIc[i]}</span><span class="pvaf__lktx"><b>${l[0]}</b><i>${l[1]}</i></span></a>`).join("")}</div>
            </div>
          </div>
          <div class="pvaf__teasers">${["Top partners by revenue","Traffic sources by revenue","Recent commissions"].map(t=>`<div class="pvaf__teaser"><span>${t}</span><b>View all</b></div>`).join("")}</div>
        </div>
      </div>
    </div>`;
  }

  stage.innerHTML=`<div class="pvp is-on" data-p="0">${panelAI()}</div><div class="pvp" data-p="1">${panelQR()}</div><div class="pvp" data-p="2">${panelLinks()}</div><div class="pvp" data-p="3">${panelManage()}</div><div class="pvp" data-p="4">${panelAnalytics()}</div>`;
  const panels=[...stage.querySelectorAll(".pvp")];

  /* ===== engine ===== */
  let gen=0, hovered=false, cur=0;
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  async function hold(ms,my){ let t=0; while(t<ms){ await wait(70); if(my!==gen) return false; if(!hovered) t+=70; } return my===gen; }
  function setSteps(act){ if(stepsEl)stepsEl.innerHTML=stepSets[cur].map((s,k)=>`<span class="pvstep${k===act?" is-on":""}${k<act?" done":""}">${s}</span>`).join(""); }
  function moveCur(el,offx,offy){ if(!el||!cursor||!win)return; const w=win.getBoundingClientRect(),r=el.getBoundingClientRect(); cursor.style.opacity="1"; cursor.style.transform=`translate(${Math.round(r.left-w.left+(offx==null?r.width/2:offx))}px, ${Math.round(r.top-w.top+(offy==null?r.height/2:offy))}px)`; }
  function curHide(){ if(cursor)cursor.style.opacity="0"; }
  function clickFX(){ if(cursor){cursor.classList.remove("click");void cursor.offsetWidth;cursor.classList.add("click");} }
  function countUp(el,my){ const raw=el.dataset.to,m=raw.match(/[\d,.]+/); if(!m)return; const pre=raw.slice(0,m.index),suf=raw.slice(m.index+m[0].length),dec=(m[0].split(".")[1]||"").length,target=parseFloat(m[0].replace(/,/g,"")); const cm=(el.textContent.match(/[\d,.]+/)||["0"])[0],start=parseFloat(cm.replace(/,/g,""))||0; let t0=null; const fmt=v=>{const f=dec?v.toFixed(dec):String(Math.round(v));const q=f.split(".");q[0]=q[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return q.join(".");}; (function s(ts){ if(my!==gen)return; if(!t0)t0=ts; const p=Math.min(1,(ts-t0)/900),e=1-Math.pow(1-p,3); el.textContent=pre+fmt(start+(target-start)*e)+suf; if(p<1)requestAnimationFrame(s); })(performance.now()); }

  async function playAI(p,my){
    const root=p.querySelector("#pvaiRoot"); if(!root)return;
    root.innerHTML=aiState1(); curHide(); setSteps(0);
    const urlEl=root.querySelector("#pvaiUrl"), go=root.querySelector("#pvaiGo");
    if(!await hold(560,my))return;
    // type the long URL into the field
    for(let i=0;i<=AI_DEST.length;i+=2){ if(my!==gen)return; urlEl.textContent=AI_DEST.slice(0,i); urlEl.insertAdjacentHTML("beforeend",'<span class="pvai__caret"></span>'); if(!reduced)await wait(13); if(hovered){while(hovered&&my===gen)await wait(70);} }
    urlEl.textContent=AI_DEST;
    if(!await hold(540,my))return;
    // click Shorten -> brief loading
    setSteps(1); moveCur(go); if(!await hold(640,my))return; clickFX(); go.classList.add("is-load"); go.innerHTML='<span class="pvspin"></span> Shortening'; curHide();
    if(!await hold(1050,my))return;
    // state 2: "Pick your short link" — ranked AI names
    root.innerHTML=aiState2();
    const pick=root.querySelector("#pvaiPick"); const rows=[...pick.querySelectorAll(".h2pk")];
    rows.forEach((c,i)=>{ c.style.setProperty("--d",(i*0.08)+"s"); c.classList.add("pvin"); });
    if(!await hold(1100,my))return;
    // highlight: you can pick YOUR domain — open the hero-style domain menu, dwell, close
    const domBtn=root.querySelector("#pvaiDom"), domList=root.querySelector("#pvaiDomList");
    moveCur(domBtn); if(!await hold(600,my))return; clickFX(); domBtn.setAttribute("aria-expanded","true"); domList.hidden=false; curHide();
    if(!await hold(1650,my))return;
    domList.hidden=true; domBtn.setAttribute("aria-expanded","false");
    if(!await hold(420,my))return;
    // select the top pick (row 0) -> Choose
    setSteps(2); const r0=rows[0]; moveCur(r0); if(!await hold(540,my))return; clickFX(); r0.classList.add("is-sel");
    if(!await hold(700,my))return;
    const choose=r0.querySelector(".h2pk__choose"); moveCur(choose); if(!await hold(620,my))return; clickFX(); curHide();
    // state 3: active short link + free-account banner
    root.innerHTML=aiState3(AI_NAMES[0]);
    return await hold(2600,my);
  }

  async function playAnalytics(p,my){
    const segs=[...p.querySelectorAll(".pvan__seg b")];
    const subtabs=[...p.querySelectorAll(".pvst")];
    p.classList.remove("pvc","pvb"); anReset(p); resetExports(p); setSubView(p,"overview"); curHide(); setSteps(0);
    // 1) overview first: count KPIs, draw chart, grow bars + donut
    if(!await hold(650,my))return;
    p.querySelectorAll(".pvan__kn").forEach((n,i)=>setTimeout(()=>{if(my===gen)countUp(n,my);},i*120));
    if(!await hold(1250,my))return;
    p.classList.add("pvc");
    if(!await hold(1350,my))return;
    p.classList.add("pvb"); anDonut(p,AN["30D"].dev);
    if(!await hold(1500,my))return;
    // 2) 30D → 7D → 24H
    moveCur(segs[1]); if(!await hold(620,my))return; clickFX(); setSeg(segs,1); anApply(p,"7D",my); curHide();
    if(!await hold(1850,my))return;
    moveCur(segs[2]); if(!await hold(620,my))return; clickFX(); setSeg(segs,2); anApply(p,"24H",my); curHide();
    if(!await hold(1500,my))return;
    // 3) cursor clicks "Detailed logs" → per-click table
    moveCur(subtabs[1]); if(!await hold(640,my))return; clickFX(); setSubView(p,"logs"); curHide();
    if(!await hold(1450,my))return;
    // 4) demo an export → spinner → ✓ Exported + toast
    const csvBtn=p.querySelector('.pvlog__exp[data-k="csv"]');
    moveCur(csvBtn); if(!await hold(560,my))return; clickFX(); doExport(p,csvBtn,"csv"); curHide();
    return await hold(2400,my);
  }

  async function afView(p,v){
    p.querySelectorAll(".pvaf__view").forEach(x=>x.classList.toggle("is-on",x.classList.contains("pvaf__view--"+v)));
    p.querySelectorAll(".pvaf__nav").forEach(n=>n.classList.toggle("is-on",n.dataset.v===v));
  }
  async function playAffiliate(p,my){
    const sel=p.querySelector("#pvafSel"),act=p.querySelector("#pvafAct"),rows=[...p.querySelectorAll(".pvaf__r")];
    const pend=p.querySelector("#pvafPend"),confirmBtn=p.querySelector("#pvafConfirm"),paid=p.querySelector("#pvafPaid");
    const revn=p.querySelector(".pvaf__revn"),dot=p.querySelector("#pvafDot"),prs=[...p.querySelectorAll(".pvaf__pr")];
    const usd=v=>{const s=v.toFixed(2).split(".");s[0]=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return "$"+s.join(".")+" <i>USD</i>";};
    // reset
    afView(p,"apps"); act.classList.remove("show"); sel.textContent="0 selected";
    rows.forEach(r=>r.classList.remove("on","approved")); p.classList.remove("af-chart"); if(revn)revn.textContent="$0";
    if(pend)pend.innerHTML='$680.00 <i>USD</i>'; if(paid)paid.innerHTML='$10,981.00 <i>USD</i>'; if(confirmBtn)confirmBtn.classList.remove("is-done");
    prs.forEach(r=>{const st=r.dataset.st0;r.dataset.st=st;r.querySelector(".pvaf__stwrap").innerHTML=pill(st);r.classList.remove("just");});
    setSteps(0); curHide();
    if(!await hold(750,my))return;
    // tick Mia
    moveCur(rows[0].querySelector(".pvaf__chk")); if(!await hold(560,my))return; clickFX(); rows[0].classList.add("on"); sel.textContent="1 selected"; act.classList.add("show");
    if(!await hold(560,my))return;
    // tick Ethan
    moveCur(rows[1].querySelector(".pvaf__chk")); if(!await hold(520,my))return; clickFX(); rows[1].classList.add("on"); sel.textContent="2 selected";
    if(!await hold(520,my))return;
    // approve
    setSteps(1); moveCur(p.querySelector(".pvaf__approve")); if(!await hold(560,my))return; clickFX();
    rows[0].classList.add("approved"); rows[1].classList.add("approved"); rows[0].classList.remove("on"); rows[1].classList.remove("on"); sel.textContent="0 selected"; act.classList.remove("show");
    if(!await hold(900,my))return;
    // go Payouts
    moveCur(p.querySelector('.pvaf__nav[data-v="pay"]')); if(!await hold(560,my))return; clickFX(); afView(p,"pay"); curHide();
    if(!await hold(1050,my))return;
    // confirm payouts -> pending rows flip to Completed, pending -> $0.00
    moveCur(confirmBtn); if(!await hold(640,my))return; clickFX();
    prs.filter(r=>r.dataset.st0==="pend").forEach(r=>{r.dataset.st="done";r.querySelector(".pvaf__stwrap").innerHTML=pill("done");r.classList.add("just");});
    if(pend)pend.innerHTML='$0.00 <i>USD</i>'; if(confirmBtn)confirmBtn.classList.add("is-done");
    // total paid jumps by the confirmed $680 -> $11,661.00
    if(paid){const a=10981,b=11661,t0=performance.now();(function tw(ts){if(my!==gen)return;const pr=Math.min(1,(ts-t0)/800),e=1-Math.pow(1-pr,3);paid.innerHTML=usd(a+(b-a)*e);if(pr<1)requestAnimationFrame(tw);})(performance.now());}
    if(!await hold(1550,my))return;
    // go Overview
    setSteps(2); moveCur(p.querySelector('.pvaf__nav[data-v="over"]')); if(!await hold(560,my))return; clickFX(); afView(p,"over"); curHide(); p.classList.add("af-chart");
    if(!await hold(340,my))return; if(revn)countUp(revn,my);
    if(!await hold(1150,my))return; moveCur(dot);
    return await hold(1900,my);
  }

  function go(i){ cur=i; gen++; tabs.forEach((t,k)=>t.classList.toggle("is-on",k===i)); panels.forEach((p,k)=>p.classList.toggle("is-on",k===i)); if(urlEl)urlEl.textContent=urls[i]; curHide(); setSteps(0); }
  async function play(i,my){ const p=panels[i]; if(i===0)return await playAI(p,my); if(i===1)return await playQR(p,my); if(i===2)return await playLinks(p,my); if(i===3)return await playManage(p,my); return await playAnalytics(p,my); }

  async function loop(){
    while(true){
      const my=gen;
      const done=await play(cur,my);
      if(my!==gen) continue;            // interrupted by a tab click → replay new cur
      if(done===false) continue;
      go((cur+1)%tabs.length);          // advance through ALL tabs
    }
  }
  tabs.forEach(t=>t.addEventListener("click",()=>{ const i=+t.dataset.i; if(i!==cur) go(i); }));
  stage.addEventListener("click",e=>{ const ex=e.target.closest(".pvlog__exp"); if(ex&&!ex.classList.contains("is-busy")&&!ex.classList.contains("is-done")) doExport(ex.closest(".pvp"),ex,ex.dataset.k||"csv"); });
  if(win){ win.addEventListener("mouseenter",()=>hovered=true); win.addEventListener("mouseleave",()=>hovered=false); }

  go(0);
  if(reduced){ const an=panels[4]; an.classList.add("pvc","pvb"); an.querySelectorAll(".pvan__kn").forEach(n=>n.textContent=n.dataset.to); return; }
  setTimeout(loop,650);
})();
