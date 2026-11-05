#!/bin/bash
# Garante: chrome vivo → jogo no mundo/grupo/caçando → monitor rodando.
S=/tmp/claude-0/-home-user-Pokedex/df6a8a99-38a1-5a22-91cd-902aef338422/scratchpad
cd $S
AGE=$(( $(date +%s) - $(stat -c %Y monitor.log) ))
if curl -s --max-time 3 localhost:9222/json/version >/dev/null && pgrep -f "^node monitor.js" >/dev/null && [ $AGE -lt 240 ]; then echo "saudável (monitor.log atualizado há ${AGE}s)"; exit 0; fi
if ! curl -s --max-time 3 localhost:9222/json/version >/dev/null; then
  echo "chrome morto → relançando"
  rm -f $S/profile/Singleton* 2>/dev/null
  nohup /opt/pw-browsers/chromium-1243/chrome-linux64/chrome --headless=new --no-sandbox --remote-debugging-port=9222 --user-data-dir=$S/profile --window-size=1280,800 --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist --proxy-server=$HTTPS_PROXY --autoplay-policy=no-user-gesture-required about:blank > $S/chrome.log 2>&1 &
  for i in $(seq 1 30); do curl -s --max-time 2 localhost:9222/json/version >/dev/null && break; sleep 2; done
fi
timeout 600 node revive.js
echo "revive exit=$?"
if ! pgrep -f "^node monitor.js" >/dev/null; then
  echo "NAO lancei o monitor aqui (nohup nao e rastreado): lance com node monitor.js em run_in_background"
fi
