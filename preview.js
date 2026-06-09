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
  const urls=["app.i.ki / links / new","app.i.ki / analytics","app.i.ki / partners"];
  const stepSets=[
    ["Paste your long link","AI generates 3 names","Pick the best short link"],
    ["Track every click live","Watch the trend build","Break it down by source"],
    ["Review partner applications","Approve & confirm payouts","Watch revenue grow"],
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
  };

  /* ===== panel 0: AI ===== */
  const recs=[["i.ki/summer-sale","Clear & memorable","98%"],["i.ki/acme-summer","Brand + campaign","94%"],["i.ki/sale-2026","Short & punchy","91%"]];
  function panelAI(){
    return `<div class="pvai">
      <div class="pvai__h">Create a short link</div>
      <label class="pvai__lbl">Destination URL</label>
      <div class="pvai__field"><span id="pvaiUrl"></span><span class="pvai__caret" id="pvaiCaret"></span></div>
      <label class="pvai__lbl">Short link</label>
      <div class="pvai__row"><div class="pvai__dom">i.ki/<span class="pvai__slug" id="pvaiSlug">…</span></div><button class="pvai__gen" id="pvaiGen">${I.spark} Generate with AI</button></div>
      <div class="pvai__recs" id="pvaiRecs"></div>
      <div class="pvai__action">
        <button class="pvai__create" id="pvaiCreate">${I.link} Create short link <span class="pvai__arr">→</span></button>
        <div class="pvai__live" id="pvaiLive"><span class="pvai__lic">${I.check}</span><span class="pvai__ltx"><b id="pvaiLiveLink">i.ki/summer-sale</b> is live · copied to clipboard</span></div>
      </div>
    </div>`;
  }
  const recCard=(r)=>`<div class="pvrec"><div class="pvrec__l"><span class="pvrec__ic">${I.link}</span><div class="pvrec__txt"><b>${r[0]}</b><i>${r[1]}</i></div></div><div class="pvrec__r"><span class="pvrec__match">${r[2]} match</span><span class="pvrec__copy">${I.copy}</span></div></div>`;
  const skel=()=>`<div class="pvrec pvrec--skel"><span class="pvskel pvskel--ic"></span><span class="pvskel pvskel--ln"></span><span class="pvskel pvskel--sm"></span></div>`;

  /* ===== panel 1: analytics (compact to fit) ===== */
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
  function panelAnalytics(){
    return `<div class="pvan">
      <div class="pvan__top"><span class="pvan__perf">Performance · last 30 days</span><span class="pvan__seg"><b class="is-on">30D</b><b>7D</b><b>24H</b></span></div>
      <div class="pvan__kpis">${kpis.map(k=>`<div class="pvan__kpi"><div class="pvan__kl">${k[0]}</div><div class="pvan__kn" data-to="${k[1]}">0</div><div class="pvan__kd">${k[2]} ↑</div></div>`).join("")}</div>
      <div class="pvan__chart">${anSvg()}</div>
      <div class="pvan__tiles">
        <div class="pvan__tile"><div class="pvan__th">TOP COUNTRIES</div>${countries.map(c=>`<div class="pvan__row"><span class="pvan__lbl">${flag(c[0])}${c[1]}</span><span class="pvan__bar"><i style="--w:${c[2]}%"></i></span><span class="pvan__pct">${c[2]}%</span></div>`).join("")}</div>
        <div class="pvan__tile pvan__tile--donut"><div class="pvan__th">DEVICES</div><div class="pvan__donut"><svg viewBox="0 0 120 120"><circle class="pvdn pvdn--bg" cx="60" cy="60" r="46"/><circle class="pvdn pvdn--mob" cx="60" cy="60" r="46"/></svg><div class="pvan__dctr"><b>62%</b><small>Mobile</small></div></div><div class="pvan__dleg"><span><i class="d1"></i>Mobile<b>62%</b></span><span><i class="d2"></i>Desktop<b>30%</b></span><span><i class="d3"></i>Tablet<b>8%</b></span></div></div>
        <div class="pvan__tile"><div class="pvan__th">TOP SOURCES</div>${sources.map(s=>`<div class="pvan__row"><span class="pvan__lbl">${srcIc(s[0])}${s[1]}</span><span class="pvan__bar"><i style="--w:${s[2]}%"></i></span><span class="pvan__pct">${s[2]}%</span></div>`).join("")}</div>
      </div>
    </div>`;
  }

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

  stage.innerHTML=`<div class="pvp is-on" data-p="0">${panelAI()}</div><div class="pvp" data-p="1">${panelAnalytics()}</div><div class="pvp" data-p="2">${panelAffiliate()}</div>`;
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
    const urlT="https://shop.acme.com/collections/summer-sale-2026?utm_source=tiktok&utm_campaign=launch";
    const uEl=p.querySelector("#pvaiUrl"),caret=p.querySelector("#pvaiCaret"),slug=p.querySelector("#pvaiSlug"),gn=p.querySelector("#pvaiGen"),rc=p.querySelector("#pvaiRecs");
    const createBtn=p.querySelector("#pvaiCreate"),live=p.querySelector("#pvaiLive");
    uEl.textContent="";slug.textContent="…";gn.classList.remove("is-busy");rc.className="pvai__recs";rc.innerHTML="";caret.style.display="inline-block";
    createBtn.classList.remove("show");live.classList.remove("show");
    setSteps(0); curHide();
    if(!await hold(520,my))return;
    for(let i=0;i<=urlT.length;i+=2){ if(my!==gen)return; uEl.textContent=urlT.slice(0,i); if(!reduced)await wait(13); if(hovered){while(hovered&&my===gen)await wait(70);} }
    uEl.textContent=urlT; caret.style.display="none";
    if(!await hold(560,my))return;
    setSteps(1); moveCur(gn);
    if(!await hold(620,my))return;
    clickFX(); gn.classList.add("is-busy"); curHide(); rc.classList.add("show"); rc.innerHTML=skel()+skel()+skel();
    if(!await hold(1150,my))return;
    gn.classList.remove("is-busy"); rc.innerHTML=recs.map(recCard).join("");
    const cards=[...rc.querySelectorAll(".pvrec")]; cards.forEach((c,i)=>{c.style.setProperty("--d",(i*0.11)+"s");c.classList.add("in");});
    if(!await hold(1000,my))return;
    setSteps(2); slug.textContent="summer-sale"; cards[0].classList.add("is-sel"); moveCur(cards[0],null,null);
    if(!await hold(440,my))return; clickFX();
    // pick made -> reveal the Create CTA as the clear next step
    if(!await hold(650,my))return; createBtn.classList.add("show");
    if(!await hold(820,my))return; moveCur(createBtn);
    if(!await hold(640,my))return; clickFX();
    // created -> success confirmation (link is live)
    createBtn.classList.remove("show"); live.classList.add("show"); curHide();
    return await hold(2400,my);
  }

  async function playAnalytics(p,my){
    const segs=[...p.querySelectorAll(".pvan__seg b")];
    p.classList.remove("pvc","pvb"); anReset(p); curHide(); setSteps(0);
    if(!await hold(340,my))return;
    // 30D: count KPIs, draw chart, grow bars + donut
    p.querySelectorAll(".pvan__kn").forEach((n,i)=>setTimeout(()=>{if(my===gen)countUp(n,my);},i*120));
    if(!await hold(1250,my))return;
    p.classList.add("pvc");
    if(!await hold(1350,my))return;
    p.classList.add("pvb"); anDonut(p,AN["30D"].dev);
    if(!await hold(1550,my))return;
    // switch to 7D
    moveCur(segs[1]); if(!await hold(640,my))return; clickFX(); setSeg(segs,1); anApply(p,"7D",my); curHide();
    if(!await hold(1950,my))return;
    // switch to 24H
    moveCur(segs[2]); if(!await hold(640,my))return; clickFX(); setSeg(segs,2); anApply(p,"24H",my); curHide();
    return await hold(2050,my);
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
  async function play(i,my){ const p=panels[i]; if(i===0)return await playAI(p,my); if(i===1)return await playAnalytics(p,my); return await playAffiliate(p,my); }

  async function loop(){
    while(true){
      const my=gen;
      const done=await play(cur,my);
      if(my!==gen) continue;            // interrupted by a tab click → replay new cur
      if(done===false) continue;
      go((cur+1)%3);                    // advance
    }
  }
  tabs.forEach(t=>t.addEventListener("click",()=>{ const i=+t.dataset.i; if(i!==cur) go(i); }));
  if(win){ win.addEventListener("mouseenter",()=>hovered=true); win.addEventListener("mouseleave",()=>hovered=false); }

  go(0);
  if(reduced){ panels[1].classList.add("pvc","pvb"); return; }
  setTimeout(loop,650);
})();
