/* i.ki hero tool — shorten + real QR, one input, light toggle, dual output */
const $ = (s, r = document) => r.querySelector(s);

/* real scannable QR from the vendored qrcode-generator */
function makeQR(text) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  let rects = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) rects += `<rect x="${c}" y="${r}" width="1" height="1"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#fff"/><g fill="#171717">${rects}</g></svg>`;
}
function slug(u) {
  try { const x = new URL(u); const p = x.pathname.split("/").filter(Boolean).pop() || x.hostname.split(".")[0]; return (p.replace(/[^a-z0-9-]/gi, "").slice(0, 16) || "link").toLowerCase(); }
  catch { return (String(u).replace(/[^a-z0-9-]/gi, "").slice(0, 16) || "link").toLowerCase(); }
}
const ICON = {
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
};

const toastEl = $("#toast"); let tT;
function toast(m) { toastEl.textContent = m; toastEl.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => toastEl.classList.remove("show"), 1800); }

let mode = "link";
const result = $("#result");
let current = { short: "i.ki/summer", full: "https://i.ki/summer", qr: makeQR("https://i.ki/summer") };

function render() {
  if (mode === "link") {
    result.innerHTML = `
      <div class="respane__top"><span class="respane__ic">${ICON.link}</span><span class="respane__label">Your short link</span>
        <span class="respane__actions"><button class="btn btn--light btn--mini" id="toQr">${ICON.qr} QR</button><button class="btn btn--primary btn--mini" id="copyBtn">${ICON.copy} Copy link</button></span></div>
      <div class="r-short">${current.short}</div>
      <div class="r-thumb"><div class="qrbox">${current.qr}</div><div><b>QR ready</b><small>Scan to open ${current.short}</small></div></div>`;
    $("#toQr").onclick = () => setMode("qr");
  } else {
    result.innerHTML = `
      <div class="respane__top"><span class="respane__ic">${ICON.qr}</span><span class="respane__label">Your QR code</span>
        <span class="respane__actions"><button class="btn btn--primary btn--mini" id="dlBtn">${ICON.dl} Download</button></span></div>
      <div class="r-qr"><div class="qrbox">${current.qr}</div></div>
      <div class="r-thumb"><span class="respane__ic" style="background:var(--o-soft);color:var(--o)">${ICON.link}</span><div><b>${current.short}</b><small>links to your destination</small></div>
        <button class="btn btn--light btn--mini" id="copyBtn" style="margin-left:auto">${ICON.copy} Copy</button></div>`;
    $("#dlBtn").onclick = downloadQR;
  }
  const cb = $("#copyBtn"); if (cb) cb.onclick = copyLink;
}
function generate(url) {
  const s = slug(url);
  current = { short: "i.ki/" + s, full: "https://i.ki/" + s, qr: makeQR("https://i.ki/" + s) };
  render();
}
function setMode(m) {
  mode = m;
  document.querySelectorAll(".seg__btn").forEach(b => b.classList.toggle("is-active", b.dataset.mode === m));
  $("#ctaLabel").textContent = m === "link" ? "Shorten" : "Generate QR";
  render();
}
function copyLink() { navigator.clipboard?.writeText(current.full).catch(() => {}); toast(current.short + " copied"); }
function downloadQR() {
  const blob = new Blob([current.qr], { type: "image/svg+xml" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = current.short.replace("/", "-") + "-qr.svg"; a.click();
  toast("QR downloaded");
}

/* wire up */
document.querySelectorAll(".seg__btn").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
$("#form").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#url").value.trim(); if (v) generate(v); });
document.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => { $("#url").value = c.dataset.url; generate(c.dataset.url); }));

render(); // initial (default summer example)
