const tip = require('./tip.js');
const NEVER = /Precioso|Core|Pergaminho|Cristal|Poção|Mestre|Abóbora|Força|Presa|Fênix|Terry|Murky|Raident|Sereneo|Fadeo|Transparo|Sparky|Devine|Celesto|Mirage|Minério|Pedra|Gyfu|EXP/i;
module.exports = async (p) => {
  const log = [];
  for (const arrow of [276, 298]) {
    await p.mouse.click(arrow, 780); await p.waitForTimeout(1200);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
      const x = 274 + c * 22, y = 644 + r * 22;
      const t = await tip(p, x, y); if (!t) continue;
      const name = t[0];
      const equip = t.some(s => /^Integridade/.test(s)) || /^(Anel|Amuleto|Colar|Bracelete|Orbe|Orbital)/.test(name);
      if (!equip || NEVER.test(name) || t.some(s => /Vinculado/.test(s))) { if (equip) log.push('skip ' + name); continue; }
      // Pedido da usuária (06/11): colar/anel/amuleto que o Haradur (Fighter nv71, For 241 Int 31 Tal 90 Agi 70 Vit 27) CONSEGUE equipar fica na bolsa; o resto vende.
      if (/^(Anel|Colar|Amuleto)/.test(name)) {
        const need = (k) => { const l = t.find(s => new RegExp('^Requer ' + k).test(s)); return l ? +l.replace(/\D/g, '') : 0; };
        const cls = t.find(s => /^(Fighter|Mechanician|Pikeman|Archer|Knight|Atalanta|Magician|Priestess|Assassin|Shaman)$/.test(s));
        const ok = need('N.vel') <= 71 && need('For') <= 241 && need('Intelig') <= 31 && need('Talento') <= 90 && need('Agilidade') <= 70 && need('Vitalidade') <= 27 && (!cls || cls === 'Fighter');
        if (ok) { log.push('GUARDAR (serve no Haradur): ' + name + ' | ' + t.filter(s => /Adicional|Requer|Defesa|Absor/.test(s)).join(', ')); continue; }
      }
      await p.mouse.click(x, y); await p.waitForTimeout(700);
      await p.mouse.click(360, 300); await p.waitForTimeout(1500);
      const dlg = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.offsetParent !== null && e.children.length === 0 && e.innerText).map(e => e.innerText.trim()));
      const i = dlg.indexOf('Vender item?');
      if (i < 0) { log.push('?? sem dialogo ' + name); await p.mouse.click(x, y); await p.waitForTimeout(500); continue; }
      const dname = dlg[i + 1], price = (dlg.find(s => /^Recebe:/.test(s)) || '');
      if (dname !== name) { log.push('CANCEL nome difere ' + name + ' vs ' + dname); await p.locator('text=/^Cancelar$/ >> visible=true').last().click().catch(() => {}); continue; }
      await p.locator('text=/^Vender$/ >> visible=true').last().click(); await p.waitForTimeout(1500);
      log.push('VENDIDO ' + name + ' ' + price);
    }
  }
  return log;
};
