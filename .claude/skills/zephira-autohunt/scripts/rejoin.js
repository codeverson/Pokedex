// uso: node run.js "return await require('./rejoin.js')(p,{minutes:10})"
// Preso solo/em combate PK: tenta ENTRAR a cada 12 s em qualquer grupo aberto do TM1 (Hermes) até conseguir.
// Confirma pelo texto "Você entrou no grupo de" SEM o aviso "Em combate PK: aguarde" e pela janela de grupo.
module.exports = async (p, o = {}) => {
  const end = Date.now() + (o.minutes || 10) * 60000;
  const W = ms => p.waitForTimeout(ms);
  let tries = 0, log = [];
  while (Date.now() < end) {
    if (!(await p.locator('text=Procurar Grupo >> visible=true').count())) {
      await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
      await p.keyboard.press('d'); await W(1500); await p.mouse.click(494, 180); await W(800); await p.mouse.click(590, 623); await W(2000);
      await p.mouse.click(808, 127); await W(500);
    }
    const pos = await p.evaluate(() => {
      const out = [];
      document.querySelectorAll('button,div').forEach(b => {
        if (!b.offsetParent || b.children.length || !/^ENTRAR$/.test((b.innerText || '').trim()) || b.disabled) return;
        let c = b; for (let k = 0; k < 6; k++) { c = c.parentElement; if (c && /Aberto/.test(c.innerText) && /(\d)\/6/.test(c.innerText)) break; }
        const n = c && c.innerText.match(/(\d)\/6/); const m = c && c.innerText.match(/média (\d+)/);
        if (!n || +n[1] < 3 || +n[1] > 5) return;
        const r = b.getBoundingClientRect(); out.push([r.x + r.width / 2, r.y + r.height / 2, m ? +m[1] : 0]);
      });
      return out.sort((a, b) => b[2] - a[2]);
    });
    tries++;
    if (pos[0]) {
      await p.mouse.click(pos[0][0], pos[0][1]); await W(3500);
      const t = await p.evaluate(() => document.body.innerText);
      const blocked = /Em combate PK: aguarde/.test(t.split('\n').slice(-40).join('\n')) && await p.evaluate(() => [...document.querySelectorAll('*')].some(e => e.offsetParent && e.children.length === 0 && /Em combate PK: aguarde/.test(e.innerText || '')));
      const inGroup = await p.evaluate(() => /Você já está em um grupo|\d de \d no grupo/.test(document.body.innerText));
      if (!blocked) {
        // confirmar pela aba Grupo
        await p.mouse.click(865, 133); await W(800);
        await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); });
        await p.keyboard.press('d'); await W(1500); await p.mouse.click(494, 180); await W(1000);
        const ok = await p.evaluate(() => /\d de \d no grupo/.test(document.body.innerText));
        if (ok) return 'ENTROU (tentativa ' + tries + ')';
        await p.mouse.click(808, 127); await W(500);
      }
    }
    await W(12000);
  }
  return 'nao entrou em ' + tries + ' tentativas';
};
