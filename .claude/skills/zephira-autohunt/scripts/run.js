// usage: node run.js '<async js body using p (page)>' [shot.png]
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = b.contexts()[0];
  let p = ctx.pages().find(x => x.url().includes('pweb')) || ctx.pages()[0];
  try {
    const w = await p.evaluate(() => innerWidth).catch(() => 1280); if (w < 1000) { await p.setViewportSize({ width: 1280, height: 800 }).catch(() => {}); await p.waitForTimeout(1500); }
    const f = new Function('p','ctx','require', 'return (async()=>{' + process.argv[2] + '})()');
    const r = await f(p, ctx, require);
    if (r !== undefined) console.log(typeof r === 'string' ? r : JSON.stringify(r));
  } catch (e) { console.log('ERR', e.message); }
  if (process.argv[3]) await p.screenshot({ path: __dirname + '/' + process.argv[3] });
  process.exit(0);
})();
