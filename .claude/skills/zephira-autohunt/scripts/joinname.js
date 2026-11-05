// uso: node run.js "return await require('./joinname.js')(p,['Tormenta','Vithia'])"
// Na cidade, SEM grupo. Filtra TM1 + todos servidores, acha o card pelo NOME (folha de texto == nome) e
// clica no botão ENTRAR/Trocar do MESMO card no mesmo instante (a lista reordena!). Confirma troca de servidor.
module.exports = async (p, names) => {
  const W = ms => p.waitForTimeout(ms);
  const blur = () => p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
  const hasSearch = () => p.evaluate(() => !!document.querySelector('input[placeholder*="Buscar"]') && [...document.querySelectorAll('*')].some(e => e.offsetParent && e.children.length === 0 && /^Procurar Grupo$/.test((e.innerText || '').trim())));
  if (!(await hasSearch())) {
    await p.mouse.click(900, 450); await W(400); await blur();
    const soc = await p.evaluate(() => [...document.querySelectorAll('*')].some(e => e.offsetParent && e.children.length === 0 && /^Social$/.test((e.innerText || '').trim())));
    if (!soc) { await p.keyboard.press('d'); await W(1800); }
    await p.mouse.click(494, 180); await W(900); await p.mouse.click(590, 623); await W(2500);
  }
  await p.evaluate(() => { const ss = [...document.querySelectorAll('select')].filter(x => x.offsetParent); for (const s of ss.slice(0, 2)) { s.selectedIndex = 0; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  const i = p.locator('input[placeholder*="Buscar"] >> visible=true').first(); await i.fill('Templo Maldito 1'); await W(2500);
  for (const nm of names) {
    const pos = await p.evaluate((nm) => {
      const leaf = [...document.querySelectorAll('*')].find(e => e.offsetParent && e.children.length === 0 && (e.innerText || '').trim() === nm);
      if (!leaf) return null;
      let c = leaf;
      for (let k = 0; k < 8; k++) {
        c = c.parentElement; if (!c) return null;
        const b = [...c.querySelectorAll('button')].find(x => x.offsetParent && /ENTRAR|Trocar para/.test(x.innerText || '') && !x.disabled);
        if (b) { const q = b.getBoundingClientRect(); return [q.x + q.width / 2, q.y + q.height / 2, (b.innerText || '').replace(/\n/g, ' ')]; }
      }
      return null;
    }, nm);
    if (!pos) continue;
    await p.mouse.click(pos[0], pos[1]); await W(2500);
    if (await p.evaluate(() => document.body.innerText.includes('Trocar de servidor?'))) { await p.mouse.click(727, 451); await W(14000); }
    await W(1500);
    await p.mouse.click(865, 133); await W(800); await p.mouse.click(900, 450); await W(400); await blur();
    await p.keyboard.press('d'); await W(1800); await p.mouse.click(494, 180); await W(1200);
    const t = await p.evaluate(() => document.body.innerText);
    const n = (t.match(/\d de \d no grupo/) || [''])[0];
    const lider = await p.evaluate(() => { const r = [...document.querySelectorAll('*')].find(e => e.offsetParent && e.children.length === 0 && /^Líder$/.test((e.innerText || '').trim())); if (!r) return ''; let c = r; for (let k = 0; k < 4; k++) c = c.parentElement; return ((c && c.innerText) || '').split('\n').slice(0, 3).join(' '); });
    if (n) return 'ENTROU ' + nm + ' [' + pos[2] + '] | ' + n + ' | ' + lider;
    await p.mouse.click(808, 127); await W(500);
    await p.keyboard.press('d'); await W(1500); await p.mouse.click(494, 180); await W(800); await p.mouse.click(590, 623); await W(2500);
  }
  return 'nenhum entrou';
};
