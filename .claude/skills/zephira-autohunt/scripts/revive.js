// Recuperação automática: leva o Haradur de "qualquer estado" até "caçando em grupo".
// uso: node revive.js   (chrome já deve estar na 9222; revive.sh cuida disso)
const { chromium } = require('playwright');
const fs = require('fs');
const DIR = __dirname;
const cred = Object.fromEntries(fs.readFileSync(DIR + '/.cred', 'utf8').split('\n').filter(Boolean).map(l => l.split('=')));
const W = (p, ms) => p.waitForTimeout(ms);
const log = (m) => { const s = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }) + ' REVIVE ' + m; console.log(s); fs.appendFileSync(DIR + '/monitor.log', s + '\n'); };
const body = async (p) => await p.evaluate(() => document.body.innerText).catch(() => '');
const fixHud = async (p) => p.evaluate(() => document.querySelectorAll('.hud-layer').forEach(e => { e.scrollLeft = 0; e.scrollTop = 0; })).catch(() => {});
const blur = async (p) => p.evaluate(() => { const a = document.activeElement; if (a && a.blur) a.blur(); }).catch(() => {});
const mapName = async (p) => await p.evaluate(() => [...document.querySelectorAll('*')].filter(x => x.children.length === 0 && x.innerText && x.getBoundingClientRect().y > 590 && x.getBoundingClientRect().x > 1130).map(x => x.innerText.trim()).join(',')).catch(() => '');

(async () => {
  const b = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = b.contexts()[0];
  let p = ctx.pages().find(x => x.url().includes('pweb')) || ctx.pages()[0];
  await p.setViewportSize({ width: 1280, height: 800 });
  if (!p.url().includes('pweb')) { await p.goto('https://pweb.world', { waitUntil: 'domcontentloaded' }); await W(p, 15000); }
  let inWorld = false;
  for (let i = 0; i < 40 && !inWorld; i++) {
    const t = await body(p);
    if (/ENTRAR NO MUNDO/.test(t)) { log('seleção de personagem → entrar'); await p.locator('text=ENTRAR NO MUNDO >> visible=true').first().click({ force: true }).catch(() => {}); await W(p, 15000); continue; }
    if (/ESCOLHA O MUNDO/.test(t)) { log('lista de servidores → Poseidon'); await p.locator('text=Poseidon >> visible=true').first().click().catch(() => {}); await W(p, 15000); continue; }
    if (/ESQUECI A SENHA/.test(t) && /ENTRAR/.test(t)) {
      log('tela de login → entrando');
      if (await p.locator('input[type=password] >> visible=true').count() === 0) { await p.locator('text=' + cred.USER + ' >> visible=true').first().click().catch(() => {}); await W(p, 2500); }
      if (await p.locator('input[placeholder="Sua ID"] >> visible=true').count()) await p.fill('input[placeholder="Sua ID"]', cred.USER).catch(() => {});
      if (await p.locator('input[type=password] >> visible=true').count()) await p.fill('input[type=password]', cred.PASS).catch(() => {});
      await p.mouse.click(640, 486); await W(p, 15000); continue;
    }
    if (/Conexão perdida|conexão perdida/.test(t)) { log('conexão perdida → recarregar'); await p.reload({ waitUntil: 'domcontentloaded' }).catch(() => {}); await W(p, 15000); continue; }
    if (await p.locator('text=Auto-caça >> visible=true').count()) { inWorld = true; break; }
    await W(p, 6000);
  }
  if (!inWorld) { log('FALHOU: não chegou ao mundo'); process.exit(2); }
  await W(p, 6000);
  await p.locator('text=Não mostrar de novo >> visible=true').first().click().catch(() => {});
  await p.locator('text=Entendi >> visible=true').first().click().catch(() => {});
  await fixHud(p); await W(p, 1500);
  log('no mundo: ' + (await mapName(p)));
  if (/Ricarten|Navisko/.test(await mapName(p))) log('personagem está na CIDADE (não no mapa de caça)');
  // grupo?
  await blur(p); await p.keyboard.press('d'); await W(p, 2300); await p.mouse.click(494, 180); await W(p, 1800);
  const noGroup = (await body(p)).includes('Você não está em um grupo');
  await p.locator('text=× >> visible=true').first().click().catch(() => {});
  if (noGroup) {
    log('sem grupo → procurar');
    const g = await require('./listgrp.js')(p);
    const bad = ['XGame', 'giackiller', 'MeckVIP', 'Sacerziinha', '[L]una', 'nihaobaby', 'K9-Buff'];
    const c = [...(process.env.PREF ? [process.env.PREF] : []), 'TIZIU', ...g.filter(x => !bad.includes(x.leader) && x.leader !== 'TIZIU').slice(0, 6).map(x => x.leader)];
    const r = await require('./switchgrp.js')(p, c);
    log('switchgrp: ' + r.join(' | '));
  } else {
    log('já está em grupo');
  }
  await fixHud(p);
  let on = await p.evaluate(() => document.body.innerText.includes('● Auto-caça')).catch(() => false);
  if (!on) { await p.mouse.click(996, 60); await W(p, 4000); on = await p.evaluate(() => document.body.innerText.includes('● Auto-caça')).catch(() => false); }
  log('auto-caça ligada: ' + on);
  process.exit(on ? 0 : 3);
})().catch(e => { log('ERRO ' + e.message); process.exit(1); });
