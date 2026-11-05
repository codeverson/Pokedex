// Entra no grupo de um líder (mesmo servidor ou trocando de servidor).
// Só devolve 'entrou' se aparecer uma linha NOVA "Você entrou no grupo de <líder>" (o chat guarda linhas antigas).
module.exports = async (p, leader) => {
  const body = async () => await p.evaluate(() => document.body.innerText).catch(() => '');
  const countJoin = (t) => (t.match(/Você entrou no grupo de [^\n.]*/g) || []).length;
  const joinedLeader = (t) => { const m = t.match(/Você entrou no grupo de ([^\n.]*)/g) || []; return m.length ? m[m.length - 1] : ''; };
  const before = countJoin(await body());
  const r = await p.evaluate((leader) => {
    const n = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.innerText && e.innerText.trim() === leader && e.offsetParent);
    if (!n) return null;
    let c = n;
    for (let i = 0; i < 8; i++) {
      c = c.parentElement;
      const b = [...c.querySelectorAll('*')].find(x => x.children.length === 0 && x.innerText && /Trocar para|^ENTRAR$|^PEDIR$/.test(x.innerText.trim()));
      if (b) {
        // garante que o botão é deste cartão: o cartão só pode citar UM líder
        const crowns = c.innerText.split('\n').filter(s => /^[♛★]$/.test(s.trim())).length;
        if (crowns > 1) return 'multi';
        b.scrollIntoView({ block: 'center' });
        const q = b.getBoundingClientRect();
        return [q.x + q.width / 2, q.y + q.height / 2, b.innerText.trim()];
      }
    }
    return null;
  }, leader);
  if (!r) return 'nf';
  if (r === 'multi') return 'cartao-ambiguo';
  await p.mouse.click(r[0], r[1]); await p.waitForTimeout(2500);
  const sw = /Trocar/.test(r[2]);
  if (sw) {
    const dlg = p.locator('text=/^Trocar$/ >> visible=true');
    if (await dlg.count()) await dlg.last().click(); else return 'sem-confirmacao';
  }
  const limit = sw ? 36 : 6;
  for (let i = 0; i < limit; i++) {
    await p.waitForTimeout(sw ? 5000 : 1500);
    const t = await body();
    if (sw && /cheio/i.test(t) && /ESCOLHA/.test(t)) return 'cheio';
    if (countJoin(t) > before && joinedLeader(t).includes(leader)) return 'entrou';
    if (!sw && /Com aprovação|Grupo fechado|Com senha|lotado|cheio/i.test(t.slice(-1500)) && countJoin(t) === before && i >= 2) break;
  }
  const t = await body();
  return (t.match(/[^\n]*(Aguardando|recusad|lotado|senha incorreta|Grupo fechado)[^\n]*/) || ['sem-entrada'])[0];
};
