// Watchdog: checks every INTERVAL; fixes trivial things, exits with a reason when it needs me.
const { chromium } = require('playwright');
const fs = require('fs');
const DIR = __dirname;
const INTERVAL = 60000;
const MIN_XPH = 4_000_000;
const REPORT_EVERY = 10;
let cycles = 0;
// Regra da usuária (04/11): 2 mortes em <15 min = ir à cidade analisar (exit 22). Histórico persiste em deaths.log
const _fsd = require('fs');
function registraMorte(){ const f = DIR + '/deaths.log'; const now = Date.now(); let arr = []; try { arr = _fsd.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(Number); } catch (e) {} arr = arr.filter(t => now - t < 15 * 60000); arr.push(now); _fsd.writeFileSync(f, arr.join('\n') + '\n'); return arr.length; }

const log = (m) => fs.appendFileSync(DIR + '/monitor.log', new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }) + ' ' + m + '\n');

async function state(p) {
  return await p.evaluate(() => {
    const els = [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && e.innerText && e.innerText.trim());
    const at = (x0, x1, y0, y1) => els.filter(e => { const r = e.getBoundingClientRect(); return r.x >= x0 && r.x < x1 && r.y >= y0 && r.y < y1; });
    const txt = els.map(e => e.innerText.trim());
    const after = (label) => { const i = txt.indexOf(label); return i >= 0 ? txt[i + 1] : null; };
    // party frame: name elements at x~67 left side
    const party = at(60, 75, 120, 620).map(e => e.innerText.trim()).filter(t => !/^\d/.test(t));
    const me = at(60, 75, 120, 620).find(e => e.innerText.trim() === 'Haradur');
    const myLv = me ? (at(40, 60, 120, 620).find(e => /^\d{2,3}$/.test(e.innerText.trim()) && Math.abs(e.getBoundingClientRect().y - me.getBoundingClientRect().y) < 4) || {}).innerText : null;
    const body = document.body.innerText;
    return {
      hunting: txt.includes('● Auto-caça'),
      action: after('Ação'),
      kills: after('Abates'),
      exp: after('EXP'),
      time: (txt.find(t => /^(\d+h)?\d+m\d+s$/.test(t)) || ''),
      restam: after('Restam'),
      mortes: after('Mortes'),
      deathMsgs: (body.match(/Personagem morreu/g) || []).length,
      farMsgs: (body.match(/longe demais da área/g) || []).length,
      party, myLv,
      login: body.includes('ESQUECI A SENHA') && body.includes('ENTRAR') && !body.includes('Auto-caça'),
      map: (at(1130, 1270, 590, 640)[0] || {}).innerText || '',
      fps: (txt.find(t => /FPS$/.test(t)) || ''),
      nl: (txt.find(t => /^\d+\.\d+%$/.test(t)) || ''),
    };
  });
}

async function grayness(p) {
  const buf = await p.screenshot({ clip: { x: 300, y: 100, width: 600, height: 400 }, type: 'png' });
  fs.writeFileSync(DIR + '/mon.png', buf);
  const { execSync } = require('child_process');
  return parseFloat(execSync(`python3 -c "from PIL import Image,ImageStat;im=Image.open('${DIR}/mon.png').convert('HSV');print(ImageStat.Stat(im).mean[1])"`).toString());
}

(async () => {
  const b = await chromium.connectOverCDP('http://localhost:9222');
  const p = b.contexts()[0].pages().find(x => x.url().includes('pweb')) || b.contexts()[0].pages()[0];
  let fixFails = 0;
  let lastDeaths = null; let lastDeathMsgs = null; let lastFar = null;
  let lastKills = null, killsStale = 0, lastLeaderAt = 0, leaderTries = 0; // regra 04/11: sem abates por >=2 ciclos = longe do grupo -> Ir ao líder
  const goLeader = async () => {
    await p.evaluate(() => { const a = document.activeElement; if (a && a.blur) a.blur(); });
    await p.mouse.click(900, 520); await p.keyboard.press('d'); await new Promise(r => setTimeout(r, 2300));
    await p.mouse.click(494, 180); await new Promise(r => setTimeout(r, 1800));
    try { await p.locator('text=Ir ao líder >> visible=true').first().click({ timeout: 4000 }); await new Promise(r => setTimeout(r, 1300)); await p.locator('text=Ir ao líder >> visible=true').last().click({ timeout: 4000 }); } catch (e) { log('ir ao lider falhou'); }
    await new Promise(r => setTimeout(r, 20000));
    await p.evaluate(() => document.querySelectorAll('.hud-layer').forEach(e => { e.scrollLeft = 0; e.scrollTop = 0; }));
    await p.mouse.click(806, 126).catch(() => {});
    if (!(await p.evaluate(() => document.body.innerText.includes('● Auto-caça')))) { await p.mouse.click(996, 60); await new Promise(r => setTimeout(r, 3000)); }
    log('ir ao lider + auto-caça');
  };
  log('monitor start');
  await new Promise(r => setTimeout(r, INTERVAL));
  while (true) {
    let s;
    try { s = await state(p); } catch (e) { log('ERR ' + e.message); process.exit(3); }
    const sat = await grayness(p).catch(() => 99);
    const m = (s.exp || '').match(/\(([\d.]+)\/h\)/);
    const xph = m ? parseInt(m[1].replace(/\./g, '')) : null;
    const mins = (() => { const h = s.time.match(/(\d+)h/), t = s.time.match(/(\d+)m/); return (h ? 60 * h[1] : 0) + (t ? +t[1] : 0); })();
    const hp = parseInt(((s.restam || '').match(/HP (\d+)/) || [])[1] || '-1');
    const lv = s.myLv;
    log(`hunt=${s.hunting} act=${s.action} exp=${s.exp} t=${s.time} hpPots=${hp} mortes=${s.mortes} party=${s.party.length} lv=${lv} nl=${s.nl} map=${s.map} sat=${sat.toFixed(0)} ${s.fps}`);
    if (lastDeathMsgs === null) { lastDeathMsgs = s.deathMsgs; lastFar = s.farMsgs; }
    if (s.deathMsgs < lastDeathMsgs) lastDeathMsgs = s.deathMsgs;
    if (s.farMsgs < lastFar) lastFar = s.farMsgs;
    if (s.deathMsgs > lastDeathMsgs) { const n = registraMorte(); await p.screenshot({ path: DIR + '/report.png' }); if (n >= 2) { log('EXIT 2 mortes em <15min -> CIDADE ANALISAR (' + n + ')'); process.exit(22); } log('EXIT morte (mensagem)'); process.exit(17); }
    if (await p.evaluate(() => document.body.innerText.includes('Peso excedido')).catch(() => false)) { log('EXIT peso excedido'); await p.screenshot({ path: DIR + '/report.png' }); process.exit(21); }
    { const _w = await p.evaluate(() => { const m = document.body.innerText.match(/(\d+)\/(\d{4})/); return m ? [+m[1], +m[2]] : null; }).catch(() => null);
      // peso só aparece com a mochila aberta; o ciclo de organizar abre a mochila: ler logo depois
      if (_w && _w[1] >= 1000 && _w[0] / _w[1] >= 0.75) { log('EXIT peso ' + _w[0] + '/' + _w[1] + ' >= 75% -> ir a cidade vender'); await p.screenshot({ path: DIR + '/report.png' }); process.exit(24); } }
    if (/Ricarten|Navisko/.test(s.map)) { log('EXIT na cidade'); await p.screenshot({ path: DIR + '/report.png' }); process.exit(18); }
    if (s.farMsgs > lastFar) { lastFar = s.farMsgs; log('longe da área -> ir ao líder'); await goLeader(); continue; }
    // EXP parado por 2 ciclos (~2 min) com a caça ligada = parado/longe do grupo (erro de 04/11: 6 min a 0,2 mi/h)
    { const k = s.exp != null ? parseInt(String(s.exp).split('(')[0].replace(/\D/g, '')) : null;
      if (s.hunting && k !== null && !isNaN(k)) {
        if (lastKills !== null && k <= lastKills) killsStale++; else { killsStale = 0; leaderTries = 0; }
        lastKills = k;
        if (killsStale >= 2 && Date.now() - lastLeaderAt > 4 * 60000) {
          lastLeaderAt = Date.now(); leaderTries++;
          log('EXP parado ha ' + killsStale + ' ciclos (acao=' + s.action + ') -> ir ao lider (tentativa ' + leaderTries + ')');
          if (leaderTries >= 3) { log('EXIT parado longe do grupo apos 3 tentativas'); await p.screenshot({ path: DIR + '/report.png' }); process.exit(23); }
          await goLeader(); killsStale = 0; lastKills = null; continue;
        }
      } else if (!s.hunting) { killsStale = 0; lastKills = null; } }
    const d = s.mortes ? parseInt(s.mortes) : 0;
    if (lastDeaths === null) lastDeaths = d;
    if (d > lastDeaths) { lastDeaths = d; const n = registraMorte(); await p.screenshot({ path: DIR + '/report.png' }); if (n >= 2) { log('EXIT 2 mortes em <15min -> CIDADE ANALISAR (' + n + ')'); process.exit(22); } log('EXIT nova morte (total ' + d + ')'); process.exit(17); }
    if (s.login) { log('EXIT disconnected'); process.exit(10); }
    if (sat < 12) { log('EXIT dead?'); process.exit(11); }
    if (s.party.length < 2 && !process.env.SOLO) { log('EXIT left group'); process.exit(12); }
    if (lv && +lv >= 73) { log('EXIT level 73'); process.exit(13); }
    if (hp >= 0 && hp < 60) { log('EXIT low hp potions'); process.exit(14); }
    if (xph !== null && mins >= 15 && xph < MIN_XPH) { log('aviso: xp/h abaixo da meta ' + xph + ' (trocar de grupo se persistir)'); }
    if (!s.hunting) {
      fixFails++;
      if (fixFails === 1) { log('auto-hunt off -> ir ao líder'); await goLeader(); continue; }
      log('auto-hunt off -> pressing P');
      await p.mouse.click(640, 250).catch(() => {});
      await p.keyboard.press('p').catch(() => {});
      if (fixFails >= 3) { log('EXIT cannot keep auto-hunt on'); process.exit(16); }
      await new Promise(r => setTimeout(r, 15000));
      continue;
    }
    fixFails = 0;
    // organize inventory (both pages)
    try {
      const { execSync } = require('child_process');
      const bagOpen = async () => {
        await p.screenshot({ path: DIR + '/bagchk.png', clip: { x: 470, y: 768, width: 30, height: 24 } });
        const d = parseFloat(execSync(`python3 -c "from PIL import Image,ImageChops,ImageStat;a=Image.open('${DIR}/bagchk.png').convert('RGB');b=Image.open('${DIR}/bagref2.png').convert('RGB');print(sum(ImageStat.Stat(ImageChops.difference(a,b)).mean))"`).toString());
        return d < 110;
      };
      if (!(await bagOpen())) { await p.mouse.click(640, 250); await p.keyboard.press('v'); await new Promise(r => setTimeout(r, 1800)); }
      if (await bagOpen()) {
        await p.mouse.click(276, 780); await new Promise(r => setTimeout(r, 1200));
        await p.mouse.click(484, 780); await new Promise(r => setTimeout(r, 1500));
        await p.mouse.click(298, 780); await new Promise(r => setTimeout(r, 1200));
        await p.mouse.click(484, 780); await new Promise(r => setTimeout(r, 1500));
        await p.mouse.click(276, 780); await new Promise(r => setTimeout(r, 1000));
        await p.keyboard.press('v'); log('inventario organizado (2 paginas)');
      } else log('bolsa nao abriu para organizar');
    } catch (e) { log('organize err ' + e.message); }
    cycles++;
    if (cycles >= REPORT_EVERY) { await p.screenshot({ path: DIR + '/report.png' }); log('EXIT report'); process.exit(20); }
    await new Promise(r => setTimeout(r, INTERVAL));
  }
})();
