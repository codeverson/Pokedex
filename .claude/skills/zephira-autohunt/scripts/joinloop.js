// uso: node run.js "return await require('./joinloop.js')(p,{minutes:3})"
// Entra no melhor grupo ABERTO (sem senha) com >=4 membros e nível médio 68-76 (maior média primeiro).
// Aceita 'Trocar para <servidor>'. Precisa estar SEM grupo.
module.exports = async (p, o = {}) => {
  const end = Date.now() + (o.minutes || 3) * 60000;
  const minM = o.min ?? 4, lo = o.lo ?? 68, hi = o.hi ?? 76, dry = !!o.dry;
  const fill = async (v) => { const i = p.locator('input[placeholder*="Buscar"] >> visible=true').first(); if (await i.count()) await i.fill(v); };
  while (Date.now() < end) {
    if (!(await p.locator('text=Procurar Grupo >> visible=true').count())) {
      await p.evaluate(() => { const a = document.activeElement; a && a.blur && a.blur(); }); await p.keyboard.press('d'); await p.waitForTimeout(1500);
      await p.mouse.click(494, 180); await p.waitForTimeout(800); await p.mouse.click(590, 623); await p.waitForTimeout(1800);
    }
    const cands = [];
    for (const q of ['Santuário', 'Templo Maldito 1']) {
      await fill(q); await p.waitForTimeout(1500);
      const r = await p.evaluate(([minM, lo, hi, dry]) => {
        const out = [];
        const btns = [...document.querySelectorAll('button, div')].filter(e => e.offsetParent && e.children.length === 0 && /^(ENTRAR|Trocar para[\s\S]*)$/.test((e.innerText || '').trim()));
        for (const b of btns) {
          if (!dry && (b.disabled || b.closest('[disabled]'))) continue;
          let c = b; for (let i = 0; i < 6; i++) { c = c.parentElement; if (c && /Aberto/.test(c.innerText) && !/senha|Grupo fechado/.test(c.innerText)) break; if (i === 5) c = null; }
          if (!c) continue;
          const t = c.innerText; const m = t.match(/Nv\. (\d+)(?:–(\d+))? ?(?:\(média (\d+)\))?/); const avg = m ? (m[3] ? +m[3] : +m[1]) : 0;
          const n = t.match(/(\d)\/6/); if (!n || +n[1] >= 6 || +n[1] < minM) continue;
          if (avg >= lo && avg <= hi) { const r = b.getBoundingClientRect(); out.push({ x: r.x + r.width / 2, y: r.y + r.height / 2, avg, n: +n[1], t: t.replace(/\n/g, ' ').slice(0, 90) }); }
        }
        return out;
      }, [minM, lo, hi, dry]);
      for (const c of r) cands.push({ ...c, q });
    }
    cands.sort((a, b) => b.avg - a.avg || b.n - a.n);
    if (dry) return cands.map(c => c.avg + ' | ' + c.n + '/6 | ' + c.t).join('\n');
    for (const c of cands) {
      await fill(c.q); await p.waitForTimeout(1200);
      const pos = await p.evaluate((txt) => {
        const btns = [...document.querySelectorAll('button, div')].filter(e => e.offsetParent && e.children.length === 0 && /^(ENTRAR|Trocar para[\s\S]*)$/.test((e.innerText || '').trim()));
        for (const b of btns) { let k = b; for (let i = 0; i < 6; i++) { k = k.parentElement; if (k && k.innerText.replace(/\n/g, ' ').slice(0, 90) === txt) { const r = b.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; } } }
        return null;
      }, c.t);
      if (!pos) continue;
      await p.mouse.click(pos[0], pos[1]); await p.waitForTimeout(2500);
      if (await p.evaluate(() => document.body.innerText.includes('Trocar de servidor?'))) { await p.mouse.click(727, 451); await p.waitForTimeout(9000); }
      await p.waitForTimeout(1000);
      if (await p.evaluate(() => /Você entrou no grupo/.test(document.body.innerText))) return 'ENTROU: ' + c.t;
    }
    await p.waitForTimeout(3000);
  }
  return 'nao achei';
};
