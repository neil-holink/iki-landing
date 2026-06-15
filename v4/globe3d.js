/* Interactive WebGL globe (cobe) — auto-rotates + drag-to-spin 360, orange city markers on real land coords. */
import createGlobe from "./vendor/cobe.js";
(function(){
  const canvas = document.querySelector(".g__globecanvas");
  if(!canvas) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let phi = 0, width = 0, drag = 0, down = false, lastX = 0, vel = 0;
  const onResize = () => { width = canvas.offsetWidth; };
  window.addEventListener("resize", onResize); onResize();

  canvas.addEventListener("pointerdown", e => { down = true; lastX = e.clientX; vel = 0; canvas.style.cursor = "grabbing"; canvas.setPointerCapture?.(e.pointerId); });
  canvas.addEventListener("pointerup", () => { down = false; canvas.style.cursor = "grab"; });
  canvas.addEventListener("pointerleave", () => { down = false; });
  canvas.addEventListener("pointermove", e => { if(!down) return; const dx = e.clientX - lastX; lastX = e.clientX; vel = dx * 0.006; drag += vel; });

  // real city coordinates [lat, lng] — markers rotate WITH the globe, always on land
  const markers = [
    {location:[40.71,-74.01],size:0.06},  // New York
    {location:[37.77,-122.42],size:0.05}, // San Francisco
    {location:[43.65,-79.38],size:0.05},  // Toronto
    {location:[19.43,-99.13],size:0.05},  // Mexico City
    {location:[-23.55,-46.63],size:0.05}, // São Paulo
    {location:[51.51,-0.13],size:0.05},   // London
    {location:[52.52,13.40],size:0.045},  // Berlin
    {location:[35.68,139.65],size:0.05},  // Tokyo
    {location:[1.35,103.82],size:0.05},   // Singapore
    {location:[-6.21,106.85],size:0.05},  // Jakarta
    {location:[19.08,72.88],size:0.045},  // Mumbai
    {location:[-33.87,151.21],size:0.045} // Sydney
  ];

  createGlobe(canvas, {
    devicePixelRatio: 2,
    width: width*2, height: width*2,
    phi: 0, theta: 0.22,
    dark: 0, diffuse: 0.55, mapSamples: 16000, mapBrightness: 2.1,
    baseColor: [0.81,0.81,0.84], markerColor: [1, 90/255, 31/255], glowColor: [1,1,1],
    markers, opacity: 0.95,
    onRender: (state) => {
      if(!down && !reduced){ phi += 0.0035; }
      if(!down){ drag *= 0.92; phi += vel; vel *= 0.9; }   // momentum after release
      state.phi = phi + drag;
      state.width = width*2; state.height = width*2;
    }
  });
  canvas.style.opacity = "0"; canvas.style.transition = "opacity .9s ease";
  requestAnimationFrame(() => { canvas.style.opacity = "1"; });
})();
