// Vende todo equipamento das págs. 1 e 2 com a loja do ferreiro JÁ ABERTA. Liga o modo Vender 1x por página.
const tip = require('./tip.js');
const NEVER = /Precioso|Core|Pergaminho|Cristal|Poção|Mestre de Habil|Abóbora|Minério|Pedra/;
module.exports = async (p) => {
  const W = (ms) => p.waitForTimeout(ms); const log = []; let gold = 0, n = 0;
  const modoOn = async () => await p.evaluate(() => { const b = document.querySelector('button.sh-mode.on'); return !!(b && b.offsetParent); });
  const ligar = async () => { if (!(await modoOn())) { await p.mouse.click(492, 380); await W(700); } };
  const dlg = async () => await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && e.innerText).map(e => e.innerText.trim()); const i = e.findIndex(s => /Vender item\?/.test(s)); return i < 0 ? null : e.slice(i, i + 5).join(' | '); });
  for (let round = 0; round < 3; round++) {
    let soldRound = 0;
    for (const a of [276, 298]) {
      await p.mouse.click(a, 780); await W(900);
      await ligar();
      for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
        const x = 274 + c * 22, y = 644 + r * 22; const t = await tip(p, x, y);
        if (!t || !t[0] || NEVER.test(t[0])) continue;
        if (!t.join(' ').includes('Integridade') && !/^(Anel|Amuleto|Colar|Bracelete)/.test(t[0])) continue;
        await p.mouse.click(x, y); await W(1100);
        const d = await dlg();
        if (d && !NEVER.test(d)) { await p.mouse.click(727, 487); await W(1300); n++; soldRound++; const m = d.match(/Recebe: ([\d.]+)/); if (m) gold += parseInt(m[1].replace(/\./g, '')); log.push('V ' + d.split(' | ')[1]); }
        else if (d) { await p.keyboard.press('Escape'); log.push('pulei ' + d.split(' | ')[1]); }
        else { await ligar(); }
      }
    }
    if (!soldRound) break;
  }
  log.push('total ' + n + ' itens, +' + gold + ' ouro');
  return log;
};
