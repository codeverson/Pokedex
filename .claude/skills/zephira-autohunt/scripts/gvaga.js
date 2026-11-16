// Busca de grupos de um mapa em TODOS os servidores, com campo limpo. Fecha tudo e religa a Auto-caça.
// uso: node run.js "return await require('./gsearch.js')(p,'Templo Maldito 1')"
module.exports = async (p, mapa = 'Templo Maldito 1') => {
  const W = ms => p.waitForTimeout(ms);
  await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
  // garante o Social aberto (D abre/FECHA: só aperta se não estiver aberto)
  const social = async () => p.evaluate(() => document.body.innerText.includes('Procurar') && document.body.innerText.includes('Amigos'));
  if (!(await social())) { await p.keyboard.press('d'); await W(2000); }
  await p.mouse.click(494, 180); await W(1000);
  for (let k = 0; k < 4 && !(await p.evaluate(() => document.body.innerText.includes('Procurar Grupo'))); k++) { await p.mouse.move(590, 600); await W(300); await p.mouse.click(590, 623); await W(3000); }
  if (!(await p.evaluate(() => document.body.innerText.includes('Procurar Grupo')))) return 'painel nao abriu';
  const i = p.locator('input[placeholder*=Buscar]').first(); await i.fill(''); await W(1000);
  const s = p.locator('select >> visible=true');
  await s.nth(0).selectOption({ label: 'Todos' }).catch(() => {}); await W(1200);
  const o = await s.nth(1).evaluate(e => [...e.options].map(x => x.text));
  const t = o.find(x => x.startsWith(mapa)); if (t) await s.nth(1).selectOption({ label: t }); await W(1500);
  await s.nth(2).selectOption({ label: 'Nível (média)' }).catch(() => {}); await W(1500);
  const cards = await p.evaluate(() => [...document.querySelectorAll('*')].filter(e => e.offsetParent !== null && e.querySelectorAll('button').length === 1 && /\d\/6/.test(e.innerText || '') && e.innerText.length < 260).map(e => e.innerText.replace(/\n+/g, ' | ').replace(/Sem objetivo definido \| /, '').replace(/Trocar para \w+/, '').slice(0, 110)));
  await p.mouse.click(865, 133); await W(600); await p.mouse.click(808, 127); await W(500);
  await p.mouse.move(640, 300); await W(1500);
  let on = await p.evaluate(() => document.body.innerText.includes('● Auto-caça'));
  if (!on) { await p.mouse.click(996, 60); await W(3000); }
  await p.mouse.move(640, 300);
  return JSON.stringify({ mapaOpt: t || 'sem opcao', autocaca_estava_on: on, grupos: [...new Set(cards)].filter(c => !/^\d\/6/.test(c)).filter(c => !/Cheio|CHEIO/.test(c)) });
};
