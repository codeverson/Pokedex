// Acha onde estão itens (regex) na mochila por tooltip: devolve pagina, linha, coluna.
// uso: node run.js "return await require('./posbag.js')(p,/Renascimento/)"
const tip = require('./tip.js');
const bagDiff = require('./tbag.js');
module.exports = async (p, re) => {
  const W = ms => p.waitForTimeout(ms);
  await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
  const opened = (await bagDiff(p)) > 110; // diff alto = bolsa fechada
  if (opened) { await p.mouse.click(925, 772); await W(1500); }
  const out = [];
  for (const [i, pg] of [276, 298].entries()) {
    await p.mouse.click(pg, 780); await W(900);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
      const t = await tip(p, 274 + c * 22, 644 + r * 22);
      if (t && t[0] && re.test(t[0])) out.push('pag' + (i + 1) + ' linha' + (r + 1) + ' col' + (c + 1) + ' (' + (274 + c * 22) + ',' + (644 + r * 22) + ')');
    }
  }
  if (opened) { await p.mouse.click(925, 772); await W(500); }
  return out.join(' | ') || 'nenhum';
};
