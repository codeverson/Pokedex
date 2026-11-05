module.exports = async (p, name) => {
  const pos = await p.evaluate((name) => {
    const e = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.innerText && e.innerText.trim() === name);
    if (!e) return null; let c = e;
    for (let i = 0; i < 5; i++) { c = c.parentElement; const b = [...c.querySelectorAll('*')].find(x => x.children.length === 0 && x.innerText && x.innerText.trim() === 'COMPRAR'); if (b) { b.scrollIntoView({ block: 'center' }); const r = b.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; } }
    return null;
  }, name);
  if (!pos) return name + ': nf';
  await p.mouse.click(pos[0], pos[1]); await p.waitForTimeout(2000);
  const dlg = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && e.innerText && /Comprar|comprar|Confirm|Tempo|Custo|saldo/i.test(e.innerText)).map(e => e.innerText.trim()).slice(-8));
  return name + ': ' + dlg.join(' | ');
};
