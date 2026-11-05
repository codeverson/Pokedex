module.exports = async (p, name) => {
  const yes = async () => { const y = p.locator('text=/^Yes$/ >> visible=true'); for (let i = 0; i < 3 && await y.count(); i++) { await y.first().click().catch(() => {}); await p.waitForTimeout(700); } };
  await yes();
  const bal = async () => (await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].find(e => e.offsetParent !== null && e.children.length === 0 && /^Tempo\s/.test((e.innerText || '').trim())); return e ? e.innerText.trim() : ''; }));
  const before = await bal();
  const r = await require('./buyf9.js')(p, name);
  await p.waitForTimeout(700);
  await p.mouse.click(640, 532); await p.waitForTimeout(1800);
  const c = p.locator('text=/^Confirmar$/ >> visible=true');
  if (await c.count()) { await c.first().click(); await p.waitForTimeout(2200); }
  await yes();
  return name + ': ' + before + ' -> ' + (await bal());
};
