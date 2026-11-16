// returns tooltip lines for item under (x,y) or null
module.exports = async (p, x, y) => {
  await p.mouse.move(1000, 300); await p.waitForTimeout(150);
  await p.mouse.move(x, y); await p.waitForTimeout(450);
  return await p.evaluate(() => {
    const anchors = [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && e.innerText && /^(Preço de venda:|Clique direito para usar|Vinculado à conta|Para Mix, Aging e Force|Cristal|Regen de (HP|MP|RES) ?:)$/.test(e.innerText.trim()));
    for (const a of anchors) { let c = a; for (let i = 0; i < 6; i++) { c = c.parentElement; if (!c) break; const lines = c.innerText.split('\n').map(s => s.trim()).filter(Boolean); if (lines.length >= 3 && lines.length < 40) return lines; } }
    return null;
  });
};
