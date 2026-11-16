// Reanuncia a 20.000 os cristais expirados do Leilão (Mais>Leilão>Meus anúncios). Para no 1º imprevisto.
// uso: node run.js "return await require('./relist.js')(p,{max:20,price:'20000'})"
module.exports = async (p, o = {}) => {
  const W = ms => p.waitForTimeout(ms); const log = []; const price = o.price || '20000';
  const clickText = async (re) => { const pos = await p.evaluate((src) => { const r = new RegExp(src, 'i'); const b = [...document.querySelectorAll('button, div, span')].find(e => e.offsetParent && e.children.length === 0 && r.test((e.innerText || '').trim())); if (!b) return null; b.scrollIntoView({ block: 'center' }); const q = b.getBoundingClientRect(); return [q.x + q.width / 2, q.y + q.height / 2]; }, re.source); if (!pos) return false; await p.mouse.click(pos[0], pos[1]); return true; };
  for (let n = 0; n < (o.max || 20); n++) {
    const exp = await p.evaluate(() => { const m = document.body.innerText.match(/Expirados \((\d+)\)/); return m ? +m[1] : -1; });
    if (exp === 0) break; if (exp < 0) { log.push('painel Meus anúncios fechado'); break; }
    if (!(await clickText(/^REANUNCIAR$/))) { log.push('sem botão REANUNCIAR'); break; } await W(1600);
    const nm = await p.evaluate(() => { const e = [...document.querySelectorAll('*')].find(x => x.offsetParent && x.children.length === 0 && /^Cristal/.test((x.innerText || '').trim())); return e ? e.innerText.trim() : ''; });
    if (!/^Cristal/.test(nm)) { log.push('item inesperado: ' + nm); await clickText(/^Voltar$/); break; }
    const inp = await p.evaluate(() => { const i = [...document.querySelectorAll('input')].find(e => e.offsetParent && e.getBoundingClientRect().y > 380 && e.getBoundingClientRect().y < 420); if (!i) return null; const r = i.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, i.value]; });
    if (inp && inp[2].replace(/\D/g, '') !== price) { await p.mouse.click(inp[0], inp[1], { clickCount: 3 }); await p.keyboard.type(price); await W(400); }
    if (!(await clickText(/REVISAR E ANUNCIAR DE NOVO/))) { log.push('sem REVISAR'); break; } await W(1600);
    if (!(await clickText(/^ANUNCIAR DE NOVO$/))) { log.push('sem confirmar'); break; } await W(2500);
    log.push(nm);
  }
  return log.length + ': ' + log.join(', ');
};
