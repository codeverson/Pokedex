#!/bin/bash
# uso: ./anota.sh "TÍTULO CURTO" "o que deu errado" "como evitar (regra concreta)"
# Grava a lição nos 3 lugares de uma vez: licoes-erros.md, guia-rapido.md e diario.md (com hora de Brasília)
cd /tmp/claude-0/-home-user-Pokedex/df6a8a99-38a1-5a22-91cd-902aef338422/scratchpad
H=$(TZ=America/Sao_Paulo date '+%d/%m %H:%M')
printf '\n- [LIÇÃO %s] **%s** — ERRO: %s — REGRA: %s\n' "$H" "$1" "$2" "$3" >> licoes-erros.md
printf '\n- [LIÇÃO %s] **%s** — ERRO: %s — REGRA: %s\n' "$H" "$1" "$2" "$3" >> guia-rapido.md
printf -- '- %s LICAO: %s | erro: %s | regra: %s\n' "$H" "$1" "$2" "$3" >> diario.md
echo "anotado: $1"
