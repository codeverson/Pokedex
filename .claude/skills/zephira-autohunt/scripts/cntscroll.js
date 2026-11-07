module.exports = async (p) => {
  const res = {};
  for (const arrow of [276, 298]) {
    await p.mouse.move(640,300); await p.mouse.click(arrow, 780); await p.waitForTimeout(1000);
    let n = 0; const pos = [];
    for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
      const x = 274 + c * 22, y = 644 + r * 22;
      await p.mouse.move(600, 300); await p.waitForTimeout(90); await p.mouse.move(x, y); await p.waitForTimeout(280);
      const t = await p.evaluate(() => [...document.querySelectorAll('body *')].some(e => e.offsetParent !== null && e.children.length === 0 && /^Pergaminho de Renascimento$/.test((e.innerText||'').trim())));
      if (t) { n++; pos.push([x, y]); }
    }
    res[arrow] = { celulas: n, pos };
  }
  return res;
};
