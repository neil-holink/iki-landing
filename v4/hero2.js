/* Hero tool v2 — clean state 1 (no domain selector) → AI pick + subdomain + regenerate → choose/lock-in + free-account banner.
   ?hero=a = single+chips (legacy), ?hero=b = ranked picker (legacy), default = NEW flow. */
(function hero2(){
  const card=document.querySelector("#h2card");
  const seg=document.querySelector("#h2seg");
  const trust=document.querySelector("#h2trust");
  if(!card) return;
  const IC={
    copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"/></svg>',
    qr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/><path d="M21 21h.01M21 17v.01M17 21v.01"/></svg>',
    dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    arr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    regen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></svg>',
    spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 5L18 8.5 13.5 10 12 15l-1.5-5L6 8.5 10.5 7z"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>',
  };
  let mode="link";
  const hv=new URLSearchParams(location.search).get("hero");
  const heroVar = hv==="a"?"a":(hv==="b"?"b":"new"); /* default = new flow */
  let domain="i.ki";
  const DOMAINS=[
    {d:"i.ki",note:"Default short domain"},
    {d:"iki.link",note:"Short i.ki domain"},
    {d:"iki.to",note:"Short i.ki domain"},
  ];
  const CUSTOM={d:"go.acme.com",note:"Your verified brand domain"};
  function domItem(o,isCustom){return `<button class="h2domitem${isCustom?' h2domitem--custom':''}${o.d===domain?' is-sel':''}" data-d="${o.d}" type="button" role="option"><span class="h2domitem__l"><span class="h2domitem__d">${o.d}/</span><span class="h2domitem__n">${o.note}</span></span>${o.tag?`<span class="h2domitem__tag">${o.tag}</span>`:''}<span class="h2domitem__ck">${IC.check}</span></button>`;}

  function makeQR(text){ const q=qrcode(0,"M"); q.addData(text); q.make(); const n=q.getModuleCount(); let r=""; for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(q.isDark(y,x))r+=`<rect x="${x}" y="${y}" width="1" height="1"/>`; return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#fff"/><g fill="#171717">${r}</g></svg>`; }
  function slugify(u){ try{const x=new URL(/^https?:/.test(u)?u:"https://"+u);const p=x.pathname.split("/").filter(Boolean).pop()||x.hostname.split(".")[0];return (p.replace(/[^a-z0-9-]/gi,"").slice(0,18)||"link").toLowerCase();}catch{return (String(u).replace(/[^a-z0-9-]/gi,"").slice(0,18)||"link").toLowerCase();} }
  function cleanSlug(s){return (s||"").replace(/[^a-z0-9-]/gi,"").toLowerCase().replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,18);}
  function hostOf(dest){try{const x=new URL(/^https?:/.test(dest)?dest:"https://"+dest);const ps=x.hostname.replace(/^www\./,"").split(".");return ps.length>=2?ps[ps.length-2]:ps[0];}catch{return"";}}
  /* candidate pool for AI name suggestions (randomized on regenerate) */
  function namePool(dest,primary){
    const base=cleanSlug(primary)||"link";
    const host=cleanSlug(hostOf(dest));
    const words=base.split("-").filter(Boolean);
    const w0=words[0]||host||"link", w1=words[1]||"";
    const yr=(base.match(/20\d\d/)||[])[0]||"2026";
    const pool=[]; const add=s=>{s=cleanSlug(s);if(s&&!pool.includes(s))pool.push(s);};
    add(base);
    if(w1)add(w0+"-"+w1);
    add(w0);
    if(host&&host!==w0)add(host+"-"+w0);
    if(host&&host!==w0)add(w0+"-"+host);
    add(w0+"-link"); add("go-"+w0); add("get-"+w0); add(w0+"-hq");
    add("my-"+w0); add("try-"+w0); add(w0+"-"+yr); add(words.join("")); add(w0+"-page");
    return pool.length?pool:["link","go-link","my-link"];
  }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function pick3(pool,forceFirst){
    const out=[]; if(forceFirst){const f=cleanSlug(forceFirst);if(f)out.push(f);}
    for(const x of shuffle(pool)){if(out.length>=3)break;if(!out.includes(x))out.push(x);}
    let k=1; while(out.length<3){out.push(cleanSlug((forceFirst||"link")+"-"+(++k)));}
    return out.slice(0,3);
  }
  function matchPcts(){
    const a=96+Math.floor(Math.random()*4);
    const b=Math.max(90,a-(3+Math.floor(Math.random()*3)));
    const c=Math.max(85,b-(2+Math.floor(Math.random()*3)));
    return [a,b,c].map(n=>n+"%");
  }
  function toast(m){ const t=document.querySelector("#toast"); if(t){t.textContent=m;t.classList.add("show");clearTimeout(window.__h2t);window.__h2t=setTimeout(()=>t.classList.remove("show"),1700);} }
  function sizeSlug(el){ const fs=parseFloat(getComputedStyle(el).fontSize)||18; const cw=fs*0.62; const len=(el.value||el.placeholder||"").length||4; el.style.width=Math.max(48,len*cw+16)+"px"; }

  /* ---- state 1: input (NO domain selector) ---- */
  function renderInput(){
    card.innerHTML = `<div class="h2in__title">${mode==="link"?"Paste your long URL":"Paste your URL to generate a QR"}</div>
    <div class="h2in">
      <input class="h2in__url" id="h2url" placeholder="https://example.com/your-long-url" autocomplete="off" spellcheck="false"/>
      <button class="h2in__go" id="h2go" type="button">${mode==="link"?"Shorten":"Generate QR"} ${IC.arr}</button>
    </div>
    <p class="h2in__hint">${mode==="link"?`<span class="o">✦</span> AI names your link instantly — <b>free for 7 days</b>, no login or card. Create a free account to keep it forever.`:`<span class="o">✦</span> Instant QR — powered by a trackable i.ki link you can <b>edit anytime</b>. Free for 7 days, no card.`}</p>`;
    const go=card.querySelector("#h2go"), url=card.querySelector("#h2url");
    const run=()=>{ const v=url.value.trim(); if(!v){url.focus();return;} mode==="link"?renderLink(slugify(v),v):renderQR(slugify(v),v); };
    go.addEventListener("click",run); url.addEventListener("keydown",e=>{if(e.key==="Enter")run();}); url.focus();
  }

  /* shared dropdown wiring (used in new flow state 2) */
  function wireDom(onChange){
    const domBtn=card.querySelector("#h2dom"), domList=card.querySelector("#h2domlist");
    if(!domBtn) return;
    const onDoc=e=>{ if(!e.target.closest(".h2dom-wrap")) closeDom(); };
    function closeDom(){ domList.hidden=true; domBtn.setAttribute("aria-expanded","false"); document.removeEventListener("click",onDoc); }
    domBtn.addEventListener("click",e=>{ e.stopPropagation(); if(domList.hidden){ domList.hidden=false; domBtn.setAttribute("aria-expanded","true"); setTimeout(()=>document.addEventListener("click",onDoc),0); } else closeDom(); });
    domList.addEventListener("click",e=>{ const it=e.target.closest(".h2domitem"); if(!it)return; if(it.dataset.add){ closeDom(); toast("Custom domains are available on the Pro plan"); return; } domain=it.dataset.d; domList.querySelectorAll(".h2domitem").forEach(b=>b.classList.toggle("is-sel",b.dataset.d===domain)); closeDom(); onChange&&onChange(); });
  }

  function renderLink(slug,dest){ return heroVar==="a"?renderLinkA(slug,dest):(heroVar==="b"?renderLinkB(slug,dest):renderLinkNew(slug,dest)); }

  /* ---- NEW flow: AI pick + subdomain + regenerate + choose/lock-in ---- */
  function renderLinkNew(slug,dest){
    let curSlug=slug, curDest=dest;
    let names=pick3(namePool(curDest,curSlug),curSlug);
    let matches=matchPcts();
    let sel=0;
    const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
    function editRowHTML(){
      return `<div class="h2in h2in--edit">
        <div class="h2dom-wrap">
          <button class="h2in__dom" id="h2dom" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="h2in__domtxt">${domain}</span>/ <span class="h2in__cv">▾</span></button>
          <div class="h2domlist" id="h2domlist" role="listbox" hidden>
            <div class="h2domlbl">i.ki domains</div>
            ${DOMAINS.map(o=>domItem(o)).join("")}
            <div class="h2domdiv"></div>
            <div class="h2domlbl">Your own domain <span class="h2dompro">Pro</span></div>
            ${domItem(CUSTOM,true)}
            <button class="h2domitem h2domitem--add" data-add="1" type="button"><span class="h2domitem__plus">+</span> Connect a custom domain</button>
          </div>
        </div>
        <input class="h2in__url" id="h2dest" value="${esc(curDest)}" spellcheck="false" aria-label="Your long URL"/>
        <button class="h2in__go h2in__go--regen" id="h2regen" type="button">${IC.regen} Regenerate</button>
      </div>`;
    }
    function rowsHTML(){
      const ai=names.slice(0,3).map((n,i)=>`<div class="h2pk${i===sel?' is-sel':''}" data-i="${i}"><span class="h2pk__radio"></span><span class="h2pk__dom">${domain}/</span><input class="h2pk__slug" value="${n}" data-i="${i}" spellcheck="false" aria-label="AI name ${i+1}"${i===sel?'':' readonly tabindex="-1"'}/><span class="h2pk__sp"></span><span class="h2pk__match">${matches[i]} match</span><button class="h2pk__choose" data-i="${i}" type="button">${IC.check} Choose</button></div>`).join("");
      const custom=`<div class="h2pk h2pk--custom${sel===3?' is-sel':''}" data-i="3"><span class="h2pk__radio"></span><span class="h2pk__dom">${domain}/</span><input class="h2pk__slug" value="" placeholder="your-custom-name" data-i="3" spellcheck="false" aria-label="Custom name"${sel===3?'':' readonly tabindex="-1"'}/><span class="h2pk__sp"></span><span class="h2pk__tag">${IC.edit} Custom name</span><button class="h2pk__choose" data-i="3" type="button">${IC.check} Choose</button></div>`;
      return ai+custom;
    }
    function initInputs(){ [...card.querySelectorAll("#h2pick .h2pk__slug")].forEach(inp=>{ sizeSlug(inp); inp.oninput=()=>{inp.value=inp.value.replace(/[^a-z0-9-]/gi,"").toLowerCase();sizeSlug(inp);}; }); }
    function select(i){ sel=i; card.querySelectorAll("#h2pick .h2pk").forEach((el,idx)=>{ el.classList.toggle("is-sel",idx===i); const inp=el.querySelector(".h2pk__slug"); if(idx===i){inp.removeAttribute("readonly");inp.removeAttribute("tabindex");}else{inp.setAttribute("readonly","");inp.setAttribute("tabindex","-1");} }); }
    function choose(name){ const n=cleanSlug(name)||curSlug; navigator.clipboard&&navigator.clipboard.writeText("https://"+domain+"/"+n); toast("Copied "+domain+"/"+n); renderChosen(n,curDest); }
    function draw(){
      card.innerHTML=`<div class="h2res">
        <div class="h2res__head"><span class="h2res__lbl">Pick your short link</span><span class="h2res__badge">${IC.clock} Free for 7 days</span></div>
        <div class="h2res__cap"><span class="o">✦</span> AI suggested these from your link — fix a typo and <b>Regenerate</b>, or pick one and <b>Choose</b> to lock it in.</div>
        ${editRowHTML()}
        <div class="h2pick" id="h2pick">${rowsHTML()}</div>
        <div class="h2res__acts"><button class="h2res__chip h2res__chip--ghost" id="h2new">Shorten another</button></div>
      </div>`;
      const pick=card.querySelector("#h2pick");
      initInputs();
      pick.addEventListener("click",e=>{
        const ch=e.target.closest(".h2pk__choose");
        if(ch){ const i=+ch.dataset.i; const inp=pick.querySelector('.h2pk__slug[data-i="'+i+'"]'); const v=(inp.value||"").trim(); if(i!==sel){select(i);} if(!v){inp.focus();return;} choose(v); return; }
        const row=e.target.closest(".h2pk"); if(row){ const i=+row.dataset.i; select(i); const inp=pick.querySelector('.h2pk__slug[data-i="'+i+'"]'); inp.focus(); if(i<3)inp.select(); }
      });
      wireDom(()=>{ card.querySelectorAll("#h2pick .h2pk__dom").forEach(d=>d.textContent=domain+"/"); const t=card.querySelector(".h2in__domtxt"); if(t)t.textContent=domain; });
      function regenerate(){ const v=(card.querySelector("#h2dest")?.value||"").trim(); if(v){curDest=v;curSlug=slugify(v);} names=pick3(namePool(curDest,curSlug),null); matches=matchPcts(); sel=0; const pk=card.querySelector("#h2pick"); pk.innerHTML=rowsHTML(); initInputs(); pk.classList.remove("is-regen"); void pk.offsetWidth; pk.classList.add("is-regen"); const rb=card.querySelector("#h2regen"); if(rb){rb.classList.remove("is-spin"); void rb.offsetWidth; rb.classList.add("is-spin");} }
      card.querySelector("#h2regen").addEventListener("click",regenerate);
      const destEl=card.querySelector("#h2dest"); if(destEl) destEl.addEventListener("keydown",e=>{ if(e.key==="Enter"){e.preventDefault();regenerate();} });
      card.querySelector("#h2new").addEventListener("click",renderInput);
      setTimeout(()=>{const f=card.querySelector("#h2pick .h2pk.is-sel .h2pk__slug");if(f){f.focus();f.select&&f.select();}},60);
    }
    draw();
  }

  /* ---- chosen / locked-in state + revamped free-account banner ---- */
  function renderChosen(name,dest){
    card.innerHTML=`<div class="h2res">
      <div class="h2res__head"><span class="h2res__lbl">Your active short link</span><span class="h2res__badge h2res__badge--ok">${IC.check} Active · 7 days left</span></div>
      <div class="h2pick"><div class="h2pk is-chosen"><span class="h2pk__radio"></span><span class="h2pk__dom">${domain}/</span><span class="h2pk__chosenname">${name}</span><span class="h2pk__sp"></span><span class="h2pk__done">${IC.check} Chosen</span></div></div>
      <div class="h2res__acts">
        <button class="h2res__chip" id="h2copy">${IC.copy} Copy link</button>
        <button class="h2res__chip" id="h2toqr">${IC.qr} Get QR code</button>
        <button class="h2res__chip h2res__chip--ghost" id="h2new">Shorten another</button>
      </div>
      ${winNote(`<b>${domain}/${name}</b> is live — copied to your clipboard.`)}
    </div>`;
    card.querySelector("#h2copy").addEventListener("click",()=>{navigator.clipboard&&navigator.clipboard.writeText("https://"+domain+"/"+name);toast("Copied "+domain+"/"+name);});
    card.querySelector("#h2toqr").addEventListener("click",()=>{mode="qr";setSeg();renderQR(name,dest);});
    card.querySelector("#h2new").addEventListener("click",renderInput);
  }

  function noteHTML(kind){ return `<div class="h2note">${IC.check}<span><b>Live now</b> — ${kind} works instantly, no login. Free for <b>7 days</b> — <a href="#">create a free account</a> to keep it forever, no card needed.</span></div>`; }
  function winNote(line1){ return `<div class="h2note h2note--win">${IC.check}<div class="h2note__body"><span class="h2note__line">${line1}</span><span class="h2note__line2">Free for <b>7 days</b>. <a class="h2note__keep" href="#">Create a free account</a> to keep it forever — no card needed.</span></div></div>`; }

  /* ---- Legacy Option A: single auto-suggest + alternative chips (?hero=a) ---- */
  function renderLinkA(slug,dest){
    const names=[slug,...aiAlts(dest,slug)];
    const multi=names.length>1;
    const cap=multi?`<span class="o">✦</span> AI suggested ${names.length} names from your link — pick one or edit it to make it yours.`:`<span class="o">✦</span> AI suggested this name from your link — edit the highlighted part to make it yours.`;
    const altsRow=multi?`<div class="h2res__alts" id="h2alts">${names.map((n,i)=>`<button class="h2alt${i===0?' is-on':''}" data-s="${n}" type="button">${n}</button>`).join("")}</div>`:"";
    card.innerHTML=`<div class="h2res">
      <div class="h2res__head"><span class="h2res__lbl">Your short link</span><span class="h2res__badge">${IC.clock} Free for 7 days</span></div>
      <div class="h2res__link" id="h2linkrow">
        <span class="h2res__dom">${domain}/</span>
        <input class="h2res__slug" id="h2slug" value="${slug}" spellcheck="false" aria-label="Customize your link"/>
        <span class="h2res__pen" title="Customize">${IC.edit}</span>
        <button class="h2res__copy" id="h2copy">${IC.copy} Copy</button>
      </div>
      <div class="h2res__cap">${cap}</div>
      ${altsRow}
      <div class="h2res__acts"><button class="h2res__chip" id="h2toqr">${IC.qr} Get QR code</button><button class="h2res__chip h2res__chip--ghost" id="h2new">Shorten another</button></div>
      ${noteHTML("your link")}
    </div>`;
    const slugEl=card.querySelector("#h2slug"); sizeSlug(slugEl);
    const altsEl=card.querySelector("#h2alts");
    const syncAlts=()=>{ if(altsEl)altsEl.querySelectorAll(".h2alt").forEach(x=>x.classList.toggle("is-on",x.dataset.s===slugEl.value)); };
    slugEl.addEventListener("input",()=>{slugEl.value=slugEl.value.replace(/[^a-z0-9-]/gi,"").toLowerCase();sizeSlug(slugEl);syncAlts();});
    if(altsEl)altsEl.addEventListener("click",e=>{const b=e.target.closest(".h2alt");if(!b)return;slugEl.value=b.dataset.s;sizeSlug(slugEl);syncAlts();slugEl.focus();});
    card.querySelector("#h2linkrow").addEventListener("click",e=>{ if(e.target.closest(".h2res__pen")) slugEl.focus(); });
    card.querySelector("#h2copy").addEventListener("click",()=>{const s=slugEl.value||"link";navigator.clipboard&&navigator.clipboard.writeText("https://"+domain+"/"+s);toast("Copied "+domain+"/"+s);});
    card.querySelector("#h2toqr").addEventListener("click",()=>{mode="qr";setSeg();renderQR(slugEl.value||slug,dest);});
    card.querySelector("#h2new").addEventListener("click",renderInput);
    setTimeout(()=>{slugEl.focus();slugEl.select();},60);
  }
  function aiAlts(dest,primary){
    let host=""; try{const x=new URL(/^https?:/.test(dest)?dest:"https://"+dest);const ps=x.hostname.replace(/^www\./,"").split(".");host=ps.length>=2?ps[ps.length-2]:ps[0];}catch{}
    const clean=s=>(s||"").replace(/[^a-z0-9-]/gi,"").toLowerCase().replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,18);
    const base=clean(primary); const words=base.split("-").filter(Boolean);
    const yr=(base.match(/20\d\d/)||[])[0]; const no=words.filter(w=>!/^20\d\d$/.test(w));
    const out=[]; const add=v=>{v=clean(v);if(v&&v!==base&&!out.includes(v))out.push(v);};
    if(host&&no[0])add(host+"-"+no[0]);
    if(no.length>1)add(no.slice(0,2).join("-"));
    if(yr&&no[0])add(no[0]+"-"+yr);
    add((no[0]||host||"go")+"-"+(no[1]||"link"));
    return out.slice(0,2);
  }

  /* ---- Legacy Option B: ranked 3-name picker (?hero=b) ---- */
  function renderLinkB(slug,dest){
    const names=[slug,...aiAlts(dest,slug)];
    while(names.length<3) names.push((slug+"-"+(names.length+1)).replace(/-+/g,"-").slice(0,18));
    const matches=["98%","94%","91%"];
    let sel=0;
    card.innerHTML=`<div class="h2res">
      <div class="h2res__head"><span class="h2res__lbl">Your short link</span><span class="h2res__badge">${IC.clock} Free for 7 days</span></div>
      <div class="h2res__cap"><span class="o">✦</span> AI suggested 3 names — pick one, or create your own.</div>
      <div class="h2pick" id="h2pick">${names.slice(0,3).map((n,i)=>`<div class="h2pk${i===0?' is-sel':''}" data-i="${i}"><span class="h2pk__radio"></span><span class="h2pk__dom">${domain}/</span><input class="h2pk__slug" value="${n}" data-i="${i}" spellcheck="false" aria-label="Short link option ${i+1}"${i===0?'':' readonly tabindex="-1"'}/><span class="h2pk__sp"></span><span class="h2pk__match">${matches[i]} match</span><button class="h2pk__copy" data-i="${i}" type="button">${IC.copy} Copy</button></div>`).join("")}<div class="h2pk h2pk--custom" data-i="3"><span class="h2pk__radio"></span><span class="h2pk__dom">${domain}/</span><input class="h2pk__slug" value="" placeholder="your-custom-name" data-i="3" spellcheck="false" aria-label="Custom short link" readonly tabindex="-1"/><span class="h2pk__sp"></span><span class="h2pk__tag">${IC.edit} Custom name</span><button class="h2pk__copy" data-i="3" type="button">${IC.copy} Copy</button></div></div>
      <div class="h2res__acts"><button class="h2res__chip" id="h2toqr">${IC.qr} Get QR code</button><button class="h2res__chip h2res__chip--ghost" id="h2new">Shorten another</button></div>
      ${noteHTML("your link")}
    </div>`;
    const pick=card.querySelector("#h2pick");
    const inputs=[...pick.querySelectorAll(".h2pk__slug")];
    inputs.forEach(inp=>{ sizeSlug(inp); inp.addEventListener("input",()=>{inp.value=inp.value.replace(/[^a-z0-9-]/gi,"").toLowerCase();sizeSlug(inp);}); });
    function select(i){ sel=i; pick.querySelectorAll(".h2pk").forEach((el,idx)=>{ el.classList.toggle("is-sel",idx===i); const inp=el.querySelector(".h2pk__slug"); if(idx===i){inp.removeAttribute("readonly");inp.removeAttribute("tabindex");}else{inp.setAttribute("readonly","");inp.setAttribute("tabindex","-1");} }); }
    pick.addEventListener("click",e=>{
      const cp=e.target.closest(".h2pk__copy");
      if(cp){ const i=+cp.dataset.i; const v=inputs[i].value.trim(); if(!v){ inputs[i].focus(); return; } navigator.clipboard&&navigator.clipboard.writeText("https://"+domain+"/"+v); toast("Copied "+domain+"/"+v); return; }
      const row=e.target.closest(".h2pk"); if(row){ const i=+row.dataset.i; select(i); inputs[i].focus(); if(i<3) inputs[i].select(); }
    });
    card.querySelector("#h2toqr").addEventListener("click",()=>{const v=inputs[sel].value||slug;mode="qr";setSeg();renderQR(v,dest);});
    card.querySelector("#h2new").addEventListener("click",renderInput);
    setTimeout(()=>{inputs[0].focus();inputs[0].select();},60);
  }

  /* ---- QR result ---- */
  function renderQR(slug,dest){
    card.innerHTML=`<div class="h2res">
      <div class="h2res__head"><span class="h2res__lbl">Your QR code</span><span class="h2res__badge h2res__badge--ok">${IC.check} Active · 7 days left</span></div>
      <div class="h2res__qr">
        <div class="h2res__qrcol">
          <div class="h2res__qrbox" id="h2qrbox">${makeQR("https://"+domain+"/"+slug)}</div>
          <span class="h2res__scan">${IC.qr} Scan to test</span>
        </div>
        <div class="h2res__qrside">
          <span class="h2res__qrtag"><span class="o">✦</span> Dynamic QR — editable</span>
          <span class="h2res__lbl2">Points to</span>
          <div class="h2res__link h2res__link--sm" id="h2linkrow"><span class="h2res__dom">${domain}/</span><input class="h2res__slug" id="h2slug" value="${slug}" spellcheck="false"/><span class="h2res__pen" title="Edit — the QR updates live">${IC.edit}</span></div>
          <button class="h2res__copy" id="h2dl">${IC.dl} Download QR</button>
          <button class="h2res__chip h2res__chip--ghost" id="h2tolink">${IC.link} Get short link</button>
        </div>
      </div>
      ${winNote(`Your QR for <b>${domain}/${slug}</b> is live — edit the destination anytime, no reprint.`)}
    </div>`;
    const slugEl=card.querySelector("#h2slug"), box=card.querySelector("#h2qrbox"); sizeSlug(slugEl);
    slugEl.addEventListener("input",()=>{slugEl.value=slugEl.value.replace(/[^a-z0-9-]/gi,"").toLowerCase();sizeSlug(slugEl);box.innerHTML=makeQR("https://"+domain+"/"+(slugEl.value||"link"));});
    card.querySelector("#h2linkrow").addEventListener("click",e=>{if(e.target.closest(".h2res__pen"))slugEl.focus();});
    card.querySelector("#h2dl").addEventListener("click",()=>{const s=slugEl.value||"link";const blob=new Blob([makeQR("https://i.ki/"+s)],{type:"image/svg+xml"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=s+"-qr.svg";a.click();toast("QR downloaded");});
    card.querySelector("#h2tolink").addEventListener("click",()=>{mode="link";setSeg();renderLink(slugEl.value||slug,dest);});
  }

  /* ---- segmented toggle ---- */
  function moveSeg(){ const on=seg.querySelector(".h2seg__b.is-on"),sl=document.querySelector("#h2segSl"); if(on&&sl){sl.style.width=on.offsetWidth+"px";sl.style.transform=`translateX(${on.offsetLeft-4}px)`;} }
  function setSeg(){ seg.querySelectorAll(".h2seg__b").forEach(b=>b.classList.toggle("is-on",b.dataset.m===mode)); moveSeg(); }
  seg.addEventListener("click",e=>{const b=e.target.closest(".h2seg__b");if(!b||b.dataset.m===mode)return;mode=b.dataset.m;setSeg();renderInput();});
  addEventListener("resize",moveSeg);

  /* ---- trust strip ---- */
  trust.innerHTML=`
    <div class="h2tp">
      <span class="h2tp__stars">${"★★★★★"}</span>
      <span class="h2tp__txt"><b>10,000+</b> Growth teams rate this product <b>4.8/5.0</b></span>
    </div>
    <span class="h2tp__div"></span>
    <div class="h2pts">${[["SOC 2 Type II"],["99.99% SLA"],["Global CDN"],["SSL Encryption"]].map(([t])=>`<span class="h2pt">${IC.check}${t}</span>`).join("")}</div>`;

  renderInput(); setSeg(); requestAnimationFrame(moveSeg);
})();
