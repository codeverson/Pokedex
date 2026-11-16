module.exports = async (p, mapa='Torre Sem Fim') => {
  const W = ms => p.waitForTimeout(ms);
  await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
  const social = async () => p.evaluate(() => document.body.innerText.includes('Procurar') && document.body.innerText.includes('Amigos'));
  if (!(await social())) { await p.keyboard.press('d'); await W(2000); }
  await p.mouse.click(494, 180); await W(1000);
  for (let k = 0; k < 4 && !(await p.evaluate(() => document.body.innerText.includes('Procurar Grupo'))); k++) { await p.mouse.move(590, 600); await W(300); await p.mouse.click(590, 623); await W(3000); }
  const i = p.locator('input[placeholder*=Buscar]').first(); await i.fill(''); await W(800);
  const s = p.locator('select >> visible=true');
  await s.nth(0).selectOption({ label: 'Todos' }).catch(() => {}); await W(1000);
  const o = await s.nth(1).evaluate(e => [...e.options].map(x => x.text));
  const t = o.find(x => x.startsWith(mapa)); if (t) await s.nth(1).selectOption({ label: t }); await W(1500);
  await p.screenshot({path:'et4_a.png'});
  return t;
};
