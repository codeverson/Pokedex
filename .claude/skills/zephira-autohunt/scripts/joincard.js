// uso: node run.js "return await require('./joincard.js')(p,'Kalvineitor')"  (na cidade, SEM grupo, Procurar Grupo aberto ou abre)
// Acha o MENOR container que contem o nome do lider E exatamente 1 botao ENTRAR/Trocar; imprime o card antes de clicar.
module.exports = async (p, name) => {
  const W = ms => p.waitForTimeout(ms);
  const has = () => p.evaluate(() => !!document.querySelector('input[placeholder*="Buscar"]'));
  if (!(await has())) { await p.keyboard.press('d'); await W(1500); await p.mouse.click(494, 180); await W(900); await p.mouse.click(590, 623); await W(2500); }
  await p.evaluate(() => { const ss = [...document.querySelectorAll('select')].filter(x => x.offsetParent); for (const s of ss.slice(0, 2)) { s.selectedIndex = 0; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await p.locator('input[placeholder*="Buscar"] >> visible=true').first().fill('Templo Maldito 1'); await W(2500);
  const r = await p.evaluate((nm) => {
    const btns = [...document.querySelectorAll('button')].filter(b => b.offsetParent && /ENTRAR|Trocar para/.test(b.innerText || '') && !b.disabled);
    for (const b of btns) {
      let c = b.parentElement;
      for (let k = 0; k < 8 && c; k++, c = c.parentElement) {
        const n = [...c.querySelectorAll('button')].filter(x => x.offsetParent && /ENTRAR|Trocar para|PEDIR/.test(x.innerText || '')).length;
        if (n > 1) break;
        if ((c.innerText || '').includes(nm)) { const q = b.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2, card: (c.innerText || '').replace(/\n+/g, ' | ').slice(0, 200) }; }
      }
    }
    return null;
  }, name);
  if (!r) return 'card nao achado: ' + name;
  await p.mouse.click(r.x, r.y); await W(2500);
  if (await p.evaluate(() => document.body.innerText.includes('Trocar de servidor?'))) { await p.mouse.click(727, 451); await W(14000); }
  await W(1500);
  return 'CLICOU card: ' + r.card;
};
