// Anuncia cristais livres da página aberta da bolsa no Leilão. Precisa estar em Leilão > Vender. Uso: require('./leilao_cristal.js')(p,{max:10,price:20000})
module.exports = async (p, o = {}) => {
  const log = []; const price = String(o.price || 20000);
  for (let n = 0; n < (o.max || 12); n++) {
    await p.mouse.click(468, 172); await p.waitForTimeout(1600);
    const icons = await p.evaluate(() => { const els = [...document.querySelectorAll('img, canvas, div, button')].filter(e => e.offsetParent && e.getBoundingClientRect().y > 320 && e.getBoundingClientRect().y < 420 && e.getBoundingClientRect().x > 300 && e.getBoundingClientRect().width > 25 && e.getBoundingClientRect().width < 60); const u = []; for (const e of els) { const r = e.getBoundingClientRect(); const c = [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]; if (!u.some(q => Math.abs(q[0] - c[0]) < 12 && Math.abs(q[1] - c[1]) < 12)) u.push(c); } return u; });
    if (!icons.length) break;
    let done = false;
    for (const [x, y] of icons) {
      await p.mouse.click(x, y); await p.waitForTimeout(1300);
      const nm = await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].find(e => e.offsetParent && e.children.length === 0 && /Sai da sua bolsa/.test(e.innerText || '')); return e && e.previousElementSibling ? e.previousElementSibling.innerText.trim() : ''; });
      if (!/^Cristal/.test(nm)) { await p.mouse.click(468, 172); await p.waitForTimeout(1300); continue; }
      const inp = await p.evaluate(() => { const i = [...document.querySelectorAll('input')].find(e => e.offsetParent && /1\.500\.000/.test(e.placeholder || '')); if (!i) return null; const r = i.getBoundingClientRect(); return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]; });
      if (!inp) continue;
      await p.mouse.click(inp[0], inp[1]); await p.keyboard.type(price); await p.waitForTimeout(400);
      const clickTxt = async (t) => { const pos = await p.evaluate((t) => { const b = [...document.querySelectorAll('button, div')].find(e => e.offsetParent && e.children.length === 0 && (e.innerText || '').trim().toUpperCase() === t); if (!b) return null; const r = b.getBoundingClientRect(); return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]; }, t); if (!pos) return false; await p.mouse.click(pos[0], pos[1]); return true; };
      if (!(await clickTxt('REVISAR ANÚNCIO'))) continue; await p.waitForTimeout(1500);
      if (!(await clickTxt('ANUNCIAR'))) continue; await p.waitForTimeout(2400);
      log.push(nm); done = true; break;
    }
    if (!done) break;
  }
  return log.length + ' cristais anunciados a ' + price + ': ' + log.join(', ');
};
