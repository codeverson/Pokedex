// Lê o progresso das missões sem abrir janela: linhas do chat "[Missão] ... N/M" (a mais recente de cada missão)
module.exports = async (p) => {
  return await p.evaluate(() => {
    const t = document.body.innerText;
    const re = /\[([^\]\n]+)\][^\n]*?(\d+)\/(\d+)/g; const last = {}; let m;
    while ((m = re.exec(t))) { if (/^(G|Alerta|Auto-ca)/.test(m[1])) continue; last[m[1]] = m[2] + '/' + m[3]; }
    const o = Object.entries(last).map(([k, v]) => k + ' ' + v);
    return o.length ? o.join(' · ') : 'sem progresso de missão no chat';
  });
};
