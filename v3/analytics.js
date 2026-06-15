/* Analytics section — strong link analytics dashboard: KPIs, live chart, geo/device/source breakdowns, interactive range. */
(function analytics(){
  const stage = document.querySelector("#anStage");
  if(!stage) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = v => Math.floor(v).toLocaleString("en-US");

  const IC = {
    up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10M17 9v8H9"/></svg>',
    direct:'<svg viewBox="0 0 24 24" fill="none" stroke="#737373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  };
  const L="img/logos/", F="img/flags/";

  /* ---- chart geometry ---- */
  const W=620,H=148,pad=6;
  const X=(i,n)=>pad+(i/(n-1))*(W-pad*2);
  const Y=(v,max)=>H-pad-(v/max)*(H-pad*2);
  function series(n,seed,spikeAt){ let s=seed; const r=()=>((s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff); const a=[]; for(let i=0;i<n;i++){ const t=i/(n-1); const hill=Math.sin(Math.min(t,0.92)*Math.PI*0.86); a.push(28+44*hill+(r()-0.5)*7); } const mx=Math.max(...a); a[spikeAt]=mx*1.16; return a.map(v=>Math.max(10,v)); }
  function paths(vals){ const n=vals.length, max=Math.max(...vals)*1.12; let line="M"+X(0,n).toFixed(1)+" "+Y(vals[0],max).toFixed(1); for(let i=1;i<n;i++) line+=" L"+X(i,n).toFixed(1)+" "+Y(vals[i],max).toFixed(1); const area=line+` L${X(n-1,n).toFixed(1)} ${H-pad} L${X(0,n).toFixed(1)} ${H-pad} Z`; let pi=0; vals.forEach((v,i)=>{if(v>vals[pi])pi=i;}); return {line,area,px:(X(pi,n)/W*100),py:(Y(vals[pi],max)/H*100),pi}; }

  /* ---- range datasets ---- */
  const RANGES={
    "30D":{label:"last 30 days",vals:series(30,42,18),total:284192,uniq:192840,conv:"6.8%",qr:48210,d:[18.4,12.1,2.3,31.0],dateOf:i=>`${i+1} Mar`},
    "7D":{label:"last 7 days",vals:series(7,9,4),total:71204,uniq:51330,conv:"7.2%",qr:12880,d:[9.2,7.4,1.1,14.6],dateOf:i=>`Day ${i+1}`},
    "24H":{label:"last 24 hours",vals:series(24,77,14),total:11842,uniq:8410,conv:"6.1%",qr:2110,d:[5.3,4.1,-0.6,8.2],dateOf:i=>`${String(i).padStart(2,"0")}:00`},
  };

  const countries=[["jp","Japan",38],["us","United States",24],["gb","United Kingdom",14],["de","Germany",13],["sg","Singapore",9]];
  const sources=[["TikTok",L+"tiktok.svg",42,true],["Instagram",L+"si-instagram.svg",28,false],["YouTube",L+"si-youtube.svg",17,false],["Direct",null,13,false]];
  const dseg=[["Mobile",62,"var(--o)"],["Desktop",30,"#ffb59a"],["Tablet",8,"#ffe2d6"]];
  const Rr=52,C=2*Math.PI*Rr; let off=0;
  const donut=dseg.map(([n,p,c])=>{const len=p/100*C;const seg=`<circle cx="64" cy="64" r="${Rr}" fill="none" stroke="${c}" stroke-width="16" stroke-dasharray="${len.toFixed(1)} ${(C-len).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}"/>`;off+=len;return seg;}).join("");

  const kpis=[["Total clicks","clicks","total",true],["Unique visitors","uniq","uniq",false],["Conversion rate","conv","conv",false],["QR scans","qr","qr",false]];
  const cur=RANGES["30D"]; const cp=paths(cur.vals);
  const peakClicks=()=>{const v=cur.vals;const sum=v.reduce((a,b)=>a+b,0);return Math.round(cur.total*v[cp.pi]/sum);};

  stage.innerHTML=`
    <div class="an-card">
      <div class="an-chrome"><i class="dot r"></i><i class="dot y"></i><i class="dot g"></i><span class="an-chrome__url">app.i.ki / analytics</span><span class="an-live"><span class="an-live__d"></span>Live</span></div>
      <div class="an-body">
        <div class="an-head">
          <span class="an-head__l">Performance · <span id="anLabel">last 30 days</span></span>
          <div class="an-range" id="anRange"><span class="an-range__p is-on" data-r="30D">30D</span><span class="an-range__p" data-r="7D">7D</span><span class="an-range__p" data-r="24H">24H</span></div>
        </div>
        <div class="an-kpis">${kpis.map(([lbl,k,key,live],i)=>{const v=key==="conv"?cur[key]:fmt(cur[key]);const dv=cur.d[i];const up=dv>=0;return `<div class="an-kpi"><span class="an-kpi__l">${lbl}</span><span class="an-kpi__v" ${live?'id="anClicks" data-an-counter="'+cur.total+'"':'data-k="'+key+'"'}>${v}</span><span class="an-kpi__d ${up?'up':'down'}" data-d="${i}">${up?IC.up:IC.down}${Math.abs(dv)}%</span></div>`;}).join("")}</div>
        <div class="an-chart">
          <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="an-chart__svg">
            <defs><linearGradient id="anFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".2"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></linearGradient></defs>
            <path class="an-chart__area" d="${cp.area}" fill="url(#anFill)"/>
            <path class="an-chart__line" d="${cp.line}" fill="none" stroke="#ff5a1f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="an-chart__dot" id="anDot" style="left:${cp.px}%;top:${cp.py}%"></span>
          <div class="an-note" id="anNote" style="left:${cp.px}%;top:${cp.py}%"><span class="an-note__k">Peak</span><b id="anPeakV">${fmt(peakClicks())} clicks</b><small id="anPeakD">${cur.dateOf(cp.pi)}</small></div>
        </div>
        <div class="an-grid">
          <div class="an-tile">
            <div class="an-tile__h">Top countries</div>
            <ul class="an-bars">${countries.map(([cc,n,v],i)=>`<li style="--d:${i*0.06}s"><img class="an-bars__flag" src="${F+cc}.svg" alt="${n}"><span class="an-bars__n">${n}</span><span class="an-bars__track"><span class="an-bars__fill" style="--w:${v*2.4}%"></span></span><span class="an-bars__v">${v}%</span></li>`).join("")}</ul>
          </div>
          <div class="an-tile an-tile--donut">
            <div class="an-tile__h">Devices</div>
            <div class="an-d"><svg viewBox="0 0 128 128" class="an-d__svg">${donut}</svg><div class="an-d__c"><b>62%</b><small>Mobile</small></div></div>
            <ul class="an-d__leg">${dseg.map(([n,p,c])=>`<li><i style="background:${c}"></i>${n} <b>${p}%</b></li>`).join("")}</ul>
          </div>
          <div class="an-tile">
            <div class="an-tile__h">Top sources</div>
            <ul class="an-bars an-bars--src">${sources.map(([n,logo,v,hot],i)=>`<li style="--d:${i*0.06}s" class="${hot?'is-hot':''}">${logo?`<img class="an-bars__logo" src="${logo}" alt="${n}">`:`<span class="an-bars__logo an-bars__logo--g">${IC.direct}</span>`}<span class="an-bars__n">${n}</span><span class="an-bars__track"><span class="an-bars__fill" style="--w:${v*2.2}%"></span></span><span class="an-bars__v">${v}%</span></li>`).join("")}</ul>
          </div>
        </div>
      </div>
    </div>`;

  /* ---- interactivity: range toggle ---- */
  const lineEl=stage.querySelector(".an-chart__line"), areaEl=stage.querySelector(".an-chart__area");
  const dot=stage.querySelector("#anDot"), note=stage.querySelector("#anNote");
  let curKey="30D";
  function drawLine(animate){ if(!lineEl) return; if(reduced||!animate){ lineEl.style.transition="none"; lineEl.style.strokeDasharray="none"; lineEl.style.strokeDashoffset=0; return;} const len=lineEl.getTotalLength(); lineEl.style.transition="none"; lineEl.style.strokeDasharray=len; lineEl.style.strokeDashoffset=len; void lineEl.getBoundingClientRect(); lineEl.style.transition="stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1)"; lineEl.style.strokeDashoffset=0; }
  function setRange(k){
    const r=RANGES[k]; if(!r) return; curKey=k;
    const p=paths(r.vals);
    lineEl.setAttribute("d",p.line); areaEl.setAttribute("d",p.area);
    dot.style.left=p.px+"%"; dot.style.top=p.py+"%"; note.style.left=p.px+"%"; note.style.top=p.py+"%";
    stage.querySelector("#anLabel").textContent=r.label;
    const sum=r.vals.reduce((a,b)=>a+b,0); const pk=Math.round(r.total*r.vals[p.pi]/sum);
    stage.querySelector("#anPeakV").textContent=fmt(pk)+" clicks"; stage.querySelector("#anPeakD").textContent=r.dateOf(p.pi);
    // KPIs
    const clicksEl=stage.querySelector("#anClicks"); clicksEl.textContent=fmt(r.total); clicksEl.dataset.anCounter=r.total;
    stage.querySelectorAll(".an-kpi__v[data-k]").forEach(el=>{const key=el.dataset.k; el.textContent=key==="conv"?r[key]:fmt(r[key]);});
    stage.querySelectorAll(".an-kpi__d").forEach(el=>{const i=+el.dataset.d; const dv=r.d[i]; const up=dv>=0; el.className="an-kpi__d "+(up?"up":"down"); el.innerHTML=(up?IC.up:IC.down)+Math.abs(dv)+"%";});
    drawLine(true);
  }
  stage.querySelector("#anRange").addEventListener("click",e=>{ const b=e.target.closest(".an-range__p"); if(!b) return; stage.querySelectorAll(".an-range__p").forEach(x=>x.classList.toggle("is-on",x===b)); setRange(b.dataset.r); });

  /* ---- enter motion + live counter ---- */
  let started=false, ticker=null;
  function startTick(){ if(reduced) return; if(ticker) clearInterval(ticker); const el=stage.querySelector("#anClicks"); let v=+el.dataset.anCounter; ticker=setInterval(()=>{ v+=Math.ceil(Math.random()*8+2); el.textContent=fmt(v); },1300); }
  function go(){ if(started) return; started=true; stage.classList.add("an--in"); drawLine(true); startTick(); }
  if("IntersectionObserver" in window){ const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){go();io.disconnect();}});},{threshold:0.2}); io.observe(stage); }
  setTimeout(go,1200);
})();
