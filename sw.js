const CACHE="scout-volley-v3";
const CORE=["./","index.html","manifest.webmanifest","lib/jspdf.umd.min.js","lib/jspdf.plugin.autotable.min.js","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(res=>{ if(res&&(res.ok||res.type==="opaque")){const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp));} return res; }).catch(()=>hit);
    return hit||net;
  }));
});
