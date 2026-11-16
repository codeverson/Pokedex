// Conta itens da mochila por tooltip (bolsa aberta). Cada Core/Pergaminho ocupa 2 casas -> divide por 2.
// uso: node run.js "return await require('./countbag.js')(p)"
const tip = require('./tip.js');
module.exports = async (p) => {
  const W = ms => p.waitForTimeout(ms);
  await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
  if (!(await p.evaluate(() => /\d+\/\d{4}/.test(document.body.innerText)))) { await p.mouse.click(925, 772); await W(1500); }
  const out = {};
  for (const pg of [276, 298]) {
    await p.mouse.click(pg, 780); await W(900);
    const cnt = {};
    for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
      const t = await tip(p, 274 + c * 22, 644 + r * 22);
      if (t && t[0]) { const k = t[0]; cnt[k] = (cnt[k] || 0) + 1; }
    }
    out[pg === 276 ? 'p1' : 'p2'] = cnt;
  }
  return JSON.stringify(out);
};
