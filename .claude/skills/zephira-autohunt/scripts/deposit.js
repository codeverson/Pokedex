// Guarda no baú (Armazém aberto, só págs. 1–2 liberadas) sheltoms, livros de habilidade e roupões.
const tip = require('./tip.js');
const { execSync } = require('child_process');
const DIR = __dirname;
const STORE = /^(Murky|Raident|Sereneo|Fadeo|Transparo|Sparky|Devine|Mestre de Habilidades.*|Roupão dos Mestres)$/;
const sizeOf = (n) => /^Roupão/.test(n) ? [3, 4] : /^Mestre/.test(n) ? [1, 1] : [2, 1]; // [larg, alt]
module.exports = async (p) => {
  const log = [];
  const wt = async () => { const s = await p.evaluate(() => ([...document.querySelectorAll('body *')].find(e => e.offsetParent !== null && e.children.length === 0 && e.innerText && /^\d+\/2392$/.test(e.innerText.trim())) || {}).innerText); return s ? parseInt(s) : -1; };
  const tabX = { 1: 475, 2: 498 };
  const occOf = async (pg) => { await p.mouse.click(tabX[pg], 342); await p.waitForTimeout(1000); await p.mouse.move(700, 500); await p.waitForTimeout(300); await p.screenshot({ path: DIR + '/occ.png' }); return JSON.parse(execSync('python3 ' + DIR + '/occ.py ' + DIR + '/occ.png').toString()); };
  const occ = { 1: await occOf(1), 2: await occOf(2) };
  const alloc = (pg, w, h) => { const g = occ[pg]; for (let r = 0; r + h <= 9; r++) for (let c = 0; c + w <= 9; c++) { let ok = true; for (let i = 0; i < h && ok; i++) for (let j = 0; j < w; j++) if (g[r + i][c + j]) { ok = false; break; } if (ok) { for (let i = 0; i < h; i++) for (let j = 0; j < w; j++) g[r + i][c + j] = 1; return [c, r]; } } return null; };
  log.push('livres pág.1: ' + occ[1].flat().filter(x => !x).length + ' | pág.2: ' + occ[2].flat().filter(x => !x).length);
  let moved = 0;
  for (const arrow of [276, 298]) {
    await p.mouse.click(arrow, 780); await p.waitForTimeout(900);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
      const x = 274 + c * 22, y = 644 + r * 22;
      const t = await tip(p, x, y);
      if (!t || !STORE.test(t[0])) continue;
      const name = t[0]; const [w, h] = sizeOf(name);
      let pg = 2, pos = alloc(2, w, h); if (!pos) { pg = 1; pos = alloc(1, w, h); }
      if (!pos) { log.push('SEM ESPAÇO no baú para ' + name); return log; }
      await p.mouse.click(tabX[pg], 342); await p.waitForTimeout(900);
      const before = await wt();
      await p.mouse.click(x, y); await p.waitForTimeout(600);
      await p.mouse.click(270 + 22 * pos[0], 189 + 22 * pos[1]); await p.waitForTimeout(1200);
      const after = await wt();
      if (after > before) { moved++; log.push('guardado ' + name + ' (pág.' + pg + ' ' + pos + ')'); }
      else { await p.mouse.click(x, y); await p.waitForTimeout(600); log.push('FALHOU ' + name + ' (pág.' + pg + ' ' + pos + ') — devolvi à bolsa e parei'); return log; }
    }
  }
  log.push('total guardado: ' + moved);
  return log;
};
