// Troca de grupo: Core -> sair do grupo -> entrar no 1º candidato disponível -> Ir ao líder -> Auto-caça
// uso: node run.js "return await require('./switchgrp.js')(p, ['CPFcancelado','gogomago','Timmi'])"
const tip = require('./tip.js');
const bag = require('./tbag.js');
const joinsw = require('./joinsw.js');
const W = (p, ms) => p.waitForTimeout(ms);
const key = async (p, k) => { await p.evaluate(() => { const a = document.activeElement; if (a && a.blur) a.blur(); }); await p.keyboard.press(k); };
const mapName = async (p) => await p.evaluate(() => [...document.querySelectorAll('*')].filter(x => x.children.length === 0 && x.innerText && x.getBoundingClientRect().y > 590 && x.getBoundingClientRect().x > 1130).map(x => x.innerText.trim()).join(','));
const fixHud = async (p) => p.evaluate(() => document.querySelectorAll('.hud-layer').forEach(e => { e.scrollLeft = 0; e.scrollTop = 0; }));
const huntOn = async (p) => await p.evaluate(() => document.body.innerText.includes('● Auto-caça'));
const openSocialGroup = async (p) => { await key(p, 'd'); await W(p, 2300); await p.mouse.click(494, 180); await W(p, 1800); };
const openSearch = async (p) => {
  await p.mouse.click(590, 623); await W(p, 2800);
  const s = p.locator('select >> visible=true');
  await s.first().selectOption('*'); await W(p, 1500);
  const lab = await s.nth(1).evaluate((x, mp) => [...x.options].map(o => o.text).find(t => t.startsWith(mp)), process.env.MAPA || 'Santuário');
  if (lab) await s.nth(1).selectOption({ label: lab }); await W(p, 2500);
};
module.exports = async (p, cands, opt = {}) => {
  const log = []; const t0 = Date.now(); const L = (m) => log.push(Math.round((Date.now() - t0) / 1000) + 's ' + m);
  await fixHud(p);
  const TOWNS = /Ricarten|Navisko/;
  if (!opt.noCore && !TOWNS.test(await mapName(p))) {
    if (await huntOn(p)) { await p.mouse.click(996, 60); await W(p, 800); }
    if ((await bag(p)) > 110) { await p.mouse.click(640, 250); await key(p, 'v'); await W(p, 1500); }
    let used = false;
    for (const a of [276, 298]) { await p.mouse.click(a, 780); await W(p, 1000); for (let r = 0; r < 6 && !used; r++) for (let c = 0; c < 12 && !used; c++) { const x = 274 + c * 22, y = 644 + r * 22; const t = await tip(p, x, y); if (t && /^Core para (Ricarten|Navisko)$/.test(t[0])) { await p.mouse.click(x, y, { button: 'right' }); used = t[0]; } } if (used) break; }
    if (!used) return ['sem Core'];
    for (let i = 0; i < 30; i++) { await W(p, 2000); if (TOWNS.test(await mapName(p))) break; }
    await W(p, 4000); await fixHud(p); L('cidade via ' + used);
  }
  for (let k = 0; k < 3 && (await bag(p)) < 110; k++) { await key(p, 'v'); await W(p, 1000); }
  await openSocialGroup(p);
  if (!(await p.evaluate(() => document.body.innerText)).includes('Você não está em um grupo')) {
    await p.locator('text=/^Sair$/ >> visible=true').first().click(); await W(p, 1300);
    await p.locator('text=/^Sair$/ >> visible=true').last().click(); await W(p, 2500); L('saí do grupo');
    await openSocialGroup(p);
  }
  await openSearch(p);
  let joined = null;
  for (const c of cands) { const r = await joinsw(p, c); L(c + ': ' + r); if (r === 'entrou') { joined = c; break; } if (r !== 'nf') { await p.locator('text=× >> visible=true').first().click().catch(() => {}); await W(p, 800); await openSocialGroup(p); await openSearch(p); } }
  if (!joined) return [...log, 'nenhum candidato'];
  await W(p, 3000); await fixHud(p); await p.locator('text=× >> visible=true').first().click().catch(() => {}); await W(p, 600);
  await openSocialGroup(p);
  await p.locator('text=Ir ao líder >> visible=true').first().click(); await W(p, 1300);
  await p.locator('text=Ir ao líder >> visible=true').last().click();
  for (let i = 0; i < 40; i++) { await W(p, 2500); const m = await mapName(p); if (m && !TOWNS.test(m)) break; }
  for (let i = 0; i < 15; i++) { await W(p, 2500); if (!/Preparando o mapa/.test(await p.evaluate(() => document.body.innerText))) break; }
  await W(p, 3000); await fixHud(p); await p.mouse.click(806, 126).catch(() => {});
  if (!(await huntOn(p))) { await p.mouse.click(996, 60); await W(p, 4000); }
  const srv = await p.evaluate(() => (document.body.innerText.match(/[^\n]*\((Brasil|Ásia|Europa)\)/) || [''])[0]);
  L('grupo ' + joined + ' | ' + srv + ' | ' + (await mapName(p)) + ' | auto-caça ' + (await huntOn(p)));
  return log;
};
