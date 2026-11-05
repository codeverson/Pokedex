// uso: node run.js "return await require('./goto_npc.js')(p,[550,440],/^Loja$/)"  (clica no ícone do NPC no Mapa Guia e usa 'Ir até')
module.exports = async (p, xy, waitRe) => {
  await p.mouse.click(640, 560).catch(() => {}); await p.waitForTimeout(300);
  await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
  if (!(await p.evaluate(() => document.body.innerText.includes('Mapa Guia')))) { await p.keyboard.press('m'); await p.waitForTimeout(2500); }
  if (!(await p.evaluate(() => document.body.innerText.includes('Mapa Guia')))) return 'mapa nao abriu';
  let hit = false;
  for (const [dx, dy] of [[0,0],[0,2],[0,-2],[-3,0],[3,0],[0,4],[0,-4],[0,-8],[0,8],[-5,0],[5,0],[0,12],[0,-12]]) {
    await p.mouse.click(xy[0] + dx, xy[1] + dy); await p.waitForTimeout(600);
    if (await p.locator('text=Ir até >> visible=true').count()) { hit = true; break; }
  }
  if (!hit) return 'icone nao achado';
  await p.locator('text=Ir até >> visible=true').first().click();
  for (let i = 0; i < 40; i++) { await p.waitForTimeout(2500); if (await p.locator(waitRe ? 'text=' + waitRe : 'text=/^Loja$/').count() && await p.locator('text=/^Loja$/ >> visible=true').count()) return 'chegou'; }
  return 'nao chegou (timeout)';
};
