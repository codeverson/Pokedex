// vende Cores deixando "keep" de cada tipo; max = limite de vendas nesta chamada. Loja da Namy aberta.
const tip = require('./tip.js');
module.exports = async (p, keep = 5, max = 20) => {
  const log = []; const sold = { N: 0, R: 0 }; const seen = { N: 0, R: 0 };
  // 1) contar total por tipo
  const cells = [];
  for (const arrow of [276, 298]) {
    await p.mouse.click(arrow, 780); await p.waitForTimeout(1000);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
      const x = 274 + c * 22, y = 644 + r * 22;
      const t = await tip(p, x, y); if (!t) continue;
      const k = t[0] === 'Core para Navisko' ? 'N' : t[0] === 'Core para Ricarten' ? 'R' : null;
      if (k) cells.push({ arrow, x, y, k, name: t[0] });
    }
  }
  const total = { N: cells.filter(c => c.k === 'N').length, R: cells.filter(c => c.k === 'R').length };
  log.push('total N=' + total.N + ' R=' + total.R);
  const want = { N: Math.max(0, total.N - keep), R: Math.max(0, total.R - keep) };
  let cur = null, n = 0;
  for (const ce of cells) {
    if (n >= max) break;
    if (sold[ce.k] >= want[ce.k]) continue;
    if (cur !== ce.arrow) { await p.mouse.click(ce.arrow, 780); await p.waitForTimeout(1000); cur = ce.arrow; }
    const t = await tip(p, ce.x, ce.y); if (!t || t[0] !== ce.name) { log.push('pulei ' + ce.x + ',' + ce.y); continue; }
    await p.mouse.click(ce.x, ce.y); await p.waitForTimeout(600);
    await p.mouse.click(360, 300); await p.waitForTimeout(1300);
    const dlg = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && e.innerText).map(e => e.innerText.trim()));
    const i = dlg.indexOf('Vender item?');
    if (i < 0) { log.push('sem dialogo'); await p.mouse.click(ce.x, ce.y); await p.waitForTimeout(400); continue; }
    if (dlg[i + 1] !== ce.name) { log.push('CANCEL ' + dlg[i + 1]); await p.locator('text=/^Cancelar$/ >> visible=true').last().click().catch(() => {}); continue; }
    await p.locator('text=/^Vender$/ >> visible=true').last().click(); await p.waitForTimeout(1300);
    sold[ce.k]++; n++;
  }
  log.push('vendidos N=' + sold.N + ' R=' + sold.R + ' (meta: ' + want.N + '/' + want.R + ')');
  return log;
};
