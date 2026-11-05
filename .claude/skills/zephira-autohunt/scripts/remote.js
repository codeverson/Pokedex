// Tela remota do navegador do jogo para a USUÁRIA clicar (ela resolve a verificação humana).
// Eu não clico nada: só repasso os cliques/teclas que ela faz nesta página. Encerra sozinho em 25 min.
// uso: node remote.js   (porta 8765, só em 127.0.0.1; abrir pelo preview do app)
const http = require('http');
const { chromium } = require('playwright');
const PORT = 8765;
const HTML = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tela do jogo</title>
<style>body{margin:0;background:#111;color:#eee;font:14px system-ui}#bar{padding:8px;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
img{display:block;width:100%;max-width:1280px;cursor:crosshair}input{padding:6px;flex:1;min-width:160px}button{padding:6px 10px}</style>
<div id="bar"><b>Clique na imagem como se fosse o jogo.</b>
<input id="t" placeholder="texto para digitar (ex.: código do e-mail)"><button onclick="send()">Digitar</button>
<button onclick="key('Enter')">Enter</button><button onclick="key('Backspace')">Apagar</button><span id="s"></span></div>
<img id="i" draggable="false">
<script>
const i=document.getElementById('i'),s=document.getElementById('s');
function load(){i.src='/shot?'+Date.now()}i.onload=()=>setTimeout(load,900);i.onerror=()=>setTimeout(load,2000);load();
i.addEventListener('click',e=>{const r=i.getBoundingClientRect();const x=Math.round((e.clientX-r.left)/r.width*1280),y=Math.round((e.clientY-r.top)/r.height*800);
fetch('/click?x='+x+'&y='+y,{method:'POST'}).then(()=>s.textContent='clique '+x+','+y)});
function send(){const t=document.getElementById('t');fetch('/type?text='+encodeURIComponent(t.value),{method:'POST'}).then(()=>{s.textContent='digitado';t.value=''})}
function key(k){fetch('/key?k='+k,{method:'POST'})}
</script>`;
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:9222');
  const pages = () => b.contexts().flatMap(c => c.pages()).filter(p => /pweb\.world/.test(p.url()));
  const page = () => pages()[0];
  const srv = http.createServer(async (req, res) => {
    try {
      const u = new URL(req.url, 'http://x');
      if (u.pathname === '/') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(HTML); }
      const p = page(); if (!p) { res.writeHead(503); return res.end('sem pagina'); }
      if (u.pathname === '/shot') { const buf = await p.screenshot({ type: 'jpeg', quality: 60 }); res.writeHead(200, { 'content-type': 'image/jpeg', 'cache-control': 'no-store' }); return res.end(buf); }
      if (req.method === 'POST' && u.pathname === '/click') { await p.mouse.click(+u.searchParams.get('x'), +u.searchParams.get('y')); res.writeHead(200); return res.end('ok'); }
      if (req.method === 'POST' && u.pathname === '/type') { await p.keyboard.type(u.searchParams.get('text') || '', { delay: 60 }); res.writeHead(200); return res.end('ok'); }
      if (req.method === 'POST' && u.pathname === '/key') { await p.keyboard.press(u.searchParams.get('k')); res.writeHead(200); return res.end('ok'); }
      res.writeHead(404); res.end('?');
    } catch (e) { res.writeHead(500); res.end(String(e).slice(0, 200)); }
  });
  srv.listen(PORT, '127.0.0.1', () => console.log('remote em 127.0.0.1:' + PORT));
  setTimeout(() => { console.log('tempo esgotado: encerrando'); process.exit(0); }, 25 * 60 * 1000);
})();
