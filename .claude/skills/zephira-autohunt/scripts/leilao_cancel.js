// Cancela anúncios de EQUIPAMENTO (não cristais/outros). Precisa estar em Leilão > Meus anúncios.
const GEAR = /^(Armadura|Roupão|Machado|Estrela|Luvas|Botas|Bracelete|Orbital|Esfera|Cajado|Lança|Tridente|Cobra|Anel Encantado|Colar Encantado|Escudo|Capacete|Espada|Arco|Adaga|Martelo|Foice)/;
module.exports = async (p, o = {}) => {
  let n = 0; const nomes = [];
  for (let i = 0; i < (o.max || 40); i++) {
    const pos = await p.evaluate((src) => {
      const re = new RegExp(src);
      const btns = [...document.querySelectorAll('button, div')].filter(e => e.offsetParent && e.children.length === 0 && /^Cancelar$/.test((e.innerText || '').trim()));
      for (const b of btns) {
        let c = b; for (let k = 0; k < 6; k++) { c = c.parentElement; if (!c) break; const nm = [...c.querySelectorAll('*')].find(x => x.children.length === 0 && x.innerText && /^[A-ZÀ-Ú]/.test(x.innerText.trim()) && !/^(Cancelar|Linkar|À venda|Confirmar)/.test(x.innerText.trim()) && x.getBoundingClientRect().height < 30); if (nm && c.querySelectorAll('button, div').length < 40) { const name = nm.innerText.trim(); if (re.test(name)) { b.scrollIntoView({ block: 'center' }); const r = b.getBoundingClientRect(); return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2), name]; } break; } }
      }
      return null;
    }, GEAR.source);
    if (!pos) break;
    await p.mouse.click(pos[0], pos[1]); await p.waitForTimeout(900);
    const conf = await p.evaluate(() => { const b = [...document.querySelectorAll('button, div')].find(e => e.offsetParent && e.children.length === 0 && /^Confirmar$/.test((e.innerText || '').trim())); if (!b) return null; const r = b.getBoundingClientRect(); return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]; });
    if (!conf) break;
    await p.mouse.click(conf[0], conf[1]); await p.waitForTimeout(1700);
    n++; nomes.push(pos[2]);
  }
  return n + ' cancelados: ' + nomes.join(', ');
};
