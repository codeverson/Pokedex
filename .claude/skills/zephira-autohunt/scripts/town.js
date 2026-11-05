// Ida rápida à cidade: Core -> Namy (vender + comprar) -> organizar -> Ir ao líder -> Auto-caça
// uso: node run.js "return await require('./town.js')(p, {pots:250, cores:4})"
const tip = require('./tip.js');
const bagOpenDiff = require('./tbag.js');
const sellall = require('./sellall.js');
const W = (p, ms) => p.waitForTimeout(ms);
const key = async (p, k) => { await p.evaluate(() => { const a = document.activeElement; if (a && a.blur) a.blur(); }); await p.keyboard.press(k); };
const txt = async (p) => await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && e.innerText && e.innerText.trim()).map(e => e.innerText.trim()));
const mapName = async (p) => await p.evaluate(() => [...document.querySelectorAll('*')].filter(x => x.children.length === 0 && x.innerText && x.getBoundingClientRect().y > 590 && x.getBoundingClientRect().x > 1130).map(x => x.innerText.trim()).join(','));
const fixHud = async (p) => p.evaluate(() => document.querySelectorAll('.hud-layer').forEach(e => { e.scrollLeft = 0; e.scrollTop = 0; }));
const openBag = async (p) => { if ((await bagOpenDiff(p)) > 110) { await p.mouse.click(640, 250); await key(p, 'v'); await W(p, 1500); } return (await bagOpenDiff(p)) < 110; };
const closeBag = async (p) => { if ((await bagOpenDiff(p)) < 110) { await key(p, 'v'); await W(p, 800); } };
const blurAll = async (p) => p.evaluate(() => { const a = document.activeElement; if (a && a.blur) a.blur(); }).catch(() => {});
const huntOn = async (p) => (await txt(p)).includes('● Auto-caça');

module.exports = async (p, opt = {}) => {
  const pots = opt.pots ?? 250, cores = opt.cores ?? 4;
  const log = []; const t0 = Date.now(); const L = (m) => log.push(Math.round((Date.now() - t0) / 1000) + 's ' + m);
  await fixHud(p);
  // 1) Core para Ricarten
  if (!(await mapName(p)).includes('Ricarten')) {
    if (await huntOn(p)) { await p.mouse.click(996, 60); await W(p, 800); }
    if (!(await openBag(p))) return ['bolsa não abriu'];
    let used = false;
    for (const arrow of [276, 298]) {
      await p.mouse.click(arrow, 780); await W(p, 1000);
      for (let r = 0; r < 6 && !used; r++) for (let c = 0; c < 12 && !used; c++) {
        const x = 274 + c * 22, y = 644 + r * 22; const t = await tip(p, x, y);
        if (t && t[0] === 'Core para Ricarten') { await p.mouse.click(x, y, { button: 'right' }); used = true; }
      }
      if (used) break;
    }
    if (!used) return [...log, 'sem Core para Ricarten'];
    for (let i = 0; i < 30; i++) { await W(p, 2000); if ((await mapName(p)).includes('Ricarten')) break; }
    await W(p, 4000); await fixHud(p); L('cheguei em Ricarten');
  }
  // 3) Namy pelo Mapa Guia (até 3 tentativas: abre o mapa, procura o ícone, fecha e repete)
  const mapOpen = async () => await p.evaluate(() => document.body.innerText.includes('Mapa Guia'));
  const closeMaps = async () => { for (let k = 0; k < 2; k++) { if (await mapOpen()) { await p.mouse.click(805, 257).catch(() => {}); await W(p, 700); } } if (await p.evaluate(() => document.body.innerText.includes('Mapa do Mundo'))) { await p.mouse.click(1091, 102).catch(() => {}); await W(p, 700); } };
  let hit = false;
  for (let attempt = 0; attempt < 3 && !hit; attempt++) {
    await closeMaps();
    await blurAll(p); await key(p, 'm'); await W(p, 2500); await fixHud(p);
    if (!(await mapOpen())) { L('mapa não abriu (tentativa ' + (attempt + 1) + ')'); continue; }
    for (const [dx, dy] of [[0, 0], [0, 2], [0, -2], [-3, 0], [3, 0], [0, 4], [0, -4], [0, -16], [0, 16], [-3, 6], [3, -6], [-6, 0], [6, 0]]) {
      await p.mouse.click(575 + dx, 459 + dy); await W(p, 650);
      const n = await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].find(e => e.offsetParent !== null && e.children.length === 0 && e.innerText && /Namy —/.test(e.innerText)); return !!e; });
      if (n) { hit = true; break; }
      const f = p.locator('text=Fechar >> visible=true'); if (await f.count()) await f.first().click().catch(() => {});
    }
    if (!hit) L('Namy não achada na tentativa ' + (attempt + 1));
  }
  if (!hit) return [...log, 'Namy não encontrada no mapa'];
  await p.locator('text=Ir até >> visible=true').first().click();
  for (let i = 0; i < 40; i++) { await W(p, 3000); if (await p.locator('text=/^Loja$/ >> visible=true').count()) break; }
  if (!(await p.locator('text=/^Loja$/ >> visible=true').count())) return [...log, 'loja da Namy não abriu'];
  L('Namy aberta');
  // 4) Vender (até 4 passadas)
  if (!(await openBag(p))) L('bolsa não abriu p/ vender');
  for (let k = 0; k < 4; k++) { const r = (await sellall(p)).filter(s => s.startsWith('VENDIDO')); log.push(...r); if (!r.length) break; }
  L('vendas ok');
  // 5) Comprar Poção Média de HP (270,233) e Cores (282,380)
  if (pots > 0) {
    await p.mouse.click(270, 233); await W(p, 1500);
    const nm = (await txt(p)).find(s => /: quantidade$/.test(s)) || '';
    if (/Media de HP/.test(nm)) { await p.locator('input[type=text] >> visible=true').last().fill(String(pots)); await W(p, 600); await p.locator('text=/^Comprar$/ >> visible=true').last().click(); await W(p, 2000); L('comprei ' + pots + ' Médias'); }
    else L('diálogo de poção inesperado: ' + nm);
  }
  for (let i = 0; i < cores; i++) { await p.mouse.click(282, 380); await W(p, 1300); await p.mouse.click(722, 542); await W(p, 1500); }
  if (cores) L('comprei ' + cores + ' Cores');
  await p.mouse.click(563, 169); await W(p, 600);
  // 6) Organizar as 2 páginas
  if (await openBag(p)) { for (const a of [276, 298]) { await p.mouse.click(a, 780); await W(p, 900); await p.mouse.click(484, 780); await W(p, 1200); } await p.mouse.click(276, 780); await closeBag(p); L('organizado'); }
  // 7) Grupo: Ir ao líder
  if (opt.noLeader) { L('compras prontas (sem Ir ao líder)'); return log; }
  await key(p, 'd'); await W(p, 2200); await p.mouse.click(494, 180); await W(p, 1500);
  if ((await p.evaluate(() => document.body.innerText)).includes('Você não está em um grupo')) { L('SEM GRUPO'); return log; }
  await p.locator('text=Ir ao líder >> visible=true').first().click(); await W(p, 1200);
  await p.locator('text=Ir ao líder >> visible=true').last().click();
  for (let i = 0; i < 40; i++) { await W(p, 2500); const m = await mapName(p); if (m && !m.includes('Ricarten')) break; }
  for (let i = 0; i < 12; i++) { await W(p, 2500); if (!/Preparando o mapa/.test(await p.evaluate(() => document.body.innerText))) break; }
  await W(p, 3000); await fixHud(p); await p.mouse.click(806, 126).catch(() => {});
  if (!(await huntOn(p))) { await p.mouse.click(996, 60); await W(p, 4000); }
  L('de volta: ' + (await mapName(p)) + ' | auto-caça ' + (await huntOn(p)));
  return log;
};
