module.exports = async (p) => {
  const grab = async () => p.evaluate(() =>
    [...document.querySelectorAll('.auc-listing')].map(c => c.innerText.replace(/\n+/g, ' | ')));
  const out = [];
  const pg = await p.evaluate(() => document.body.innerText.match(/(\d+) \/ (\d+)/));
  const total = pg ? parseInt(pg[2]) : 1;
  out.push('PAGES ' + total);
  for (let i = 0; i < Math.min(total, 40); i++) {
    out.push(...await grab());
    await p.mouse.click(689, 658);
    await p.waitForTimeout(1100);
  }
  return out.join('\n');
};
