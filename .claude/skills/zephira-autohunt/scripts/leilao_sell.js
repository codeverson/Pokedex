// Anuncia no Leilão cada item de loot da página da bolsa aberta. Uso: node run.js "return await require('./leilao_sell.js')(p,{max:6})"
const KEEP = /Precioso|Core|Pergaminho|Cristal|Poção|Mestre|Abóbora|Minério|Pedra|Gyfu|EXP|Força|Fênix|Presa|Nied|Colar Precioso|Anel Precioso/i;
module.exports = async (p, o = {}) => {
  const log = []; const max = o.max || 6; const price = o.price || 9000;
  for (let n = 0; n < max; n++) {
    await p.mouse.click(468, 172); await p.waitForTimeout(1500);
    const pos = await p.evaluate(() => { const items = [...document.querySelectorAll('img, canvas, div')].filter(e => e.offsetParent && e.getBoundingClientRect().y > 330 && e.getBoundingClientRect().y < 400 && e.getBoundingClientRect().x > 300 && e.getBoundingClientRect().width > 25 && e.getBoundingClientRect().width < 60); return items.map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]; }); });
    if (!pos.length) break;
    const uniq = []; for (const q of pos) if (!uniq.some(u => Math.abs(u[0] - q[0]) < 12)) uniq.push(q);
    let done = false;
    for (const [x, y] of uniq) {
      await p.mouse.click(x, y); await p.waitForTimeout(1200);
      const nm = await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].find(e => e.offsetParent && e.children.length === 0 && /Sai da sua bolsa/.test(e.innerText || '')); return e ? e.previousElementSibling?.innerText?.trim() : ''; });
      if (!nm || KEEP.test(nm) || !/Armadura|Roupão|Machado|Estrela|Luvas|Botas|Bracelete|Orbital|Esfera|Cajado|Lança|Tridente|Cobra|Anel Encantado|Colar Encantado/.test(nm)) { await p.mouse.click(468, 172); await p.waitForTimeout(1200); continue; }
      await p.mouse.click(760, 433); await p.keyboard.type(String(price)); await p.mouse.click(902, 658); await p.waitForTimeout(1600); await p.mouse.click(926, 658); await p.waitForTimeout(2400);
      log.push(nm); done = true; break;
    }
    if (!done) break;
  }
  return log.length + ' anunciados: ' + log.join(', ');
};
