#!/bin/bash
# Registra o estado a cada alarme para provar/derrubar a hipótese das quedas
cd /tmp/claude-0/-home-user-Pokedex/df6a8a99-38a1-5a22-91cd-902aef338422/scratchpad
echo "$(TZ=America/Sao_Paulo date '+%d/%m %H:%M') boot=$(uptime -s) monitor_rastreado=$(pgrep -fc '^node monitor.js') keepalive=$(pgrep -fc 'sleep 7100')" >> quedas.log
tail -1 quedas.log
