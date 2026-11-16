// Vai ao Ferreiro Goden (ou Gus), clica "Consertar tudo" e fecha a loja. Retorna texto.
module.exports = async (p, who = 'Goden') => {
  const W = (ms) => p.waitForTimeout(ms);
  await p.evaluate(() => { const a = document.activeElement; if (a && a.blur) a.blur(); });
  await p.keyboard.press('m'); await W(2500);
  if (!(await p.evaluate(() => document.body.innerText.includes('Mapa Guia')))) return 'mapa não abriu';
  let found = null;
  outer: for (let x = 500; x < 790; x += 8) for (let y = 360; y < 580; y += 8) {
    await p.mouse.click(x, y); await W(220);
    const n = await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].find(e => e.offsetParent !== null && e.children.length === 0 && e.innerText && /Ferreiro (Goden|Gus) —/.test(e.innerText)); return e ? e.innerText : null; });
    if (n) { found = n; break outer; }
  }
  if (!found) return 'ferreiro não achado';
  await p.locator('text=Ir até >> visible=true').first().click();
  for (let i = 0; i < 30; i++) { await W(3000); if (await p.locator('text=/^Loja$/ >> visible=true').count()) break; }
  if (!(await p.locator('text=/^Loja$/ >> visible=true').count())) return 'loja não abriu';
  const gold0 = await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && /^\d{1,3}(\.\d{3})+$/.test((e.innerText || '').trim())); return e.length ? e[e.length - 1].innerText : ''; });
  await p.mouse.click(526, 347); await W(1500);
  const dlg = p.locator('text=/Consertar|Reparar/ >> visible=true');
  // possível confirmação
  const conf = p.locator('text=/^(Consertar|Sim|Confirmar|OK|Yes)$/ >> visible=true');
  if (await conf.count()) { await conf.last().click().catch(() => {}); await W(1500); }
  const gold1 = await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && /^\d{1,3}(\.\d{3})+$/.test((e.innerText || '').trim())); return e.length ? e[e.length - 1].innerText : ''; });
  await p.mouse.click(563, 169); await W(600);
  return found + ' | ouro ' + gold0 + ' -> ' + gold1;
};
