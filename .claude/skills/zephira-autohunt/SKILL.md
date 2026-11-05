---
name: zephira-autohunt
description: Opera o personagem Haradur (conta Araujo3ve) no jogo Zephira World (pweb.world) por Chromium headless via Playwright CDP - sobe de nível em grupo no Templo Maldito 1, monitora XP/h, poções, Cores, pergaminhos, mortes e peso, vai à cidade repor estoque, troca de grupo com regras, mantém PK ligado e reporta à usuária a cada 10 min. Use quando for retomar/continuar a sessão de leveling, religar o monitor, trocar de grupo, repor poções/mana/Cores ou diagnosticar queda de conexão. NÃO resolve nem contorna verificação anti-robô (Cloudflare "Confirme que é humano"): nesse caso para e pede a usuária.
---

# Zephira Autohunt (Haradur / Araujo3ve)

Skill gerada a partir da sessão de 04–05/nov/2026. Objetivo da usuária (Bruna, pt-BR, fuso Brasília UTC−3): subir o Haradur (Fighter → Guerreiro Imortal) até o topo do ranking, **meta mínima 4 mi de XP/h**, relatando a cada ~10 min com captura de tela.

Os scripts estão em `scripts/` (copiar tudo para um diretório de trabalho; `tbag.js` precisa de `bagref2.png` na mesma pasta). Lições completas (19+ seções, erros reais e regras): `references/licoes-erros.md` - **ler o topo e as seções 13, 17, 18, 19 antes de agir**.

## Pré-requisitos
- Chromium headless com `--remote-debugging-port=9222`, perfil em `./profile`, viewport 1280×800 (`revive.sh` sobe o Chrome e faz login). Playwright instalado (`require('playwright')`).
- Credenciais **só** em `./.cred` (linhas `USER=` e `PASS=`, chmod 600). **Nunca imprimir, logar nem copiar a senha.** Este skill não contém credenciais.
- Uso dos scripts: `node run.js "<corpo async usando p>"` (o `p` é a página do jogo; `run.js` restaura o viewport se a janela encolher para 30×24).
- Duas tarefas de fundo **rastreadas** sempre vivas: `node monitor.js` e `sleep 7100` (keepalive), ambas com `run_in_background` (nunca `&`/nohup: quedas de container coincidiram com tarefas não rastreadas). Relançar o monitor toda vez que sair (código 20 = ciclo normal de relatório).

## Regras permanentes da usuária
- **Sempre em grupo.** Nunca solo, **principalmente com PK ligado**.
- **PK ligado** (+10% EXP). O botão (1065,108) só troca a cada 5 min; login zera o PK (religar e conferir pela dica "Modo PK: ligado").
- **2 mortes em <15 min** (ou 1 sem pergaminho): parar tudo, ir à cidade, contar Cores/pergaminhos, repor, consertar, só então grupo.
- Estoque mínimo: **5 Pergaminhos de Renascimento** na bolsa (os extras vão ao baú, NPC Arent, **clique direito** move item), **≥5 Cores**, poções de HP (ir à cidade antes de ~150).
- Cristais livres vão ao Leilão a **20.000 de ouro** cada (nunca ao NPC); equipamentos vendidos ao ferreiro Gus (`sell2.js`). A Coleta da Auto-caça **não pega equipamento** (lista de 9 grupos) para não encher o peso.
- Pacote premium de 30 dias já comprado (EXPup 30%, Awell, Fênix, Presa, Drena Almas, Redução de Mana/RES, Olho Mágico): **não comprar Awell/Fênix/EXPup**. Tempo (moeda) só para pergaminho/emergência.
- Ler a mochila pela **dica (tooltip) célula a célula**, com baú/Leilão fechados; imagem só para ouro/peso. Pergaminhos ficam na **página 2** (x≈394, y=648..714 e 758).
- Anotar todo erro com `./anota.sh "título" "o que errei" "regra"` sem a usuária pedir. Relatar **na hora** problema urgente (morte, queda, grupo desfeito, XP parado), sem esperar o alarme.
- **Todo relatório informa o tempo até o próximo nível E a hora aproximada (relógio de Brasília) em que sobe de nível (agora + tempo; somar ~10 min por ida à cidade):** `(100% − % atual) × custo do nível / mi/h`. Custo medido: nível 71 ≈ 80,8 mi (EXP 715,5 → 796,1 mi; tela do personagem, tecla C). Ranking: Mais > Ranking.

## Rotina de vigia (alarme a cada 10 min)
1. `./evid.sh` (registra boot/monitor/keepalive em `quedas.log`); conferir 1 monitor e ≥1 keepalive.
2. `python3 rate.py` (XP/h, poções, lv). Abrir a bolsa **só se estiver fechada** (`tbag.js` diff>110 = fechada), ler peso `n/2017`, tirar screenshot, **fechar**.
3. Dica do PK, mortes (`deaths.log`, linhas "matou Haradur"), grupo (D > Grupo: "n de 6").
4. Enviar relatório curto + screenshot (XP/h, tempo p/ próximo nível, peso, poções, ouro, mortes, PK).
5. Re-armar o alarme (10 min).

Códigos de saída do `monitor.js`: 10 login, 12 saiu do grupo, 13 lv73, 14 poções HP<60, 17 morte, 18 cidade, **20 ciclo de relatório (relançar)**, 21 peso excedido, **22 duas mortes <15 min**, 23 EXP parado longe do grupo, 24 peso ≥75%.

## Política de troca de grupo (aprendida a caro custo)
- Cada troca custa ~10-12 min + 1 Core + 5.000 (Ir ao líder). **Não trocar só por estar <4 mi/h.** De madrugada o mapa inteiro rende pouco.
- Trocar se: <2 mi/h por 2 ciclos limpos (sem ida à cidade), ou ≤2 membros **online** (conferir em D > Grupo, não no painel lateral), ou morte.
- Em dia normal, ritmos bons foram 5–6,5 mi/h (Poseidon/Hermes à noite); Zeus deu 1,7–3,1; Ares 2,6–3,5 de madrugada.
- **Nunca sair do grupo no campo.** Sequência segura: Core (clique direito em "Core para Navisko/Ricarten") → **na cidade** sair do grupo (D > Grupo > Sair 615,233 + confirmar 734,431) → entrar pelo **nome** → confirmar "n de 6" e o líder → Ir ao líder (561,233 + 718,432) → ler estado da Auto-caça (❚❚ = ligada, ▶ = desligada) e só então clicar (996,60) → PK → monitor.
- Entrar em grupo: `node run.js "return await require('./joinname.js')(p,['NomeA','NomeB'])"` (acha o card pelo nome; a lista reordena sozinha - nunca clicar por coordenada). "Trocar para X" pede confirmar (727,451). "Em combate PK: aguarde" bloqueia entrar/Ir ao líder/Core: pausar a Auto-caça, parar o monitor e esperar.
- Ficar >5 min na cidade tira do grupo (reentrar pelo nome).

## Ida à cidade (repor) - planejar <5 min
`town.js` (Namy: vender loot + comprar Médias de HP; pode falhar em achar a Namy no Mapa Guia, fechar Mapa Guia 806,257 e Mapa do Mundo 1092,101). Mana: Leilão (Mais 1056,60 > Leilão) > Comprar > filtro > COMPRAR > PAGAR EM OURO > COMPRAR (722,468) > Yes; item vai ao Distribuidor (Mais > Distribuidor > Receber). Média de Mana ≈ 194 ouro/un; MP máx 236. Ferreiro Gus: Consertar tudo (526,347). Não clicar no chão em cidade (abre NPC/teleporte pago). Cristais: `leilao_sell.js`/`leilao_cristal.js`.

## Quedas e conexão
- Container reinicia: tudo some. `revive.sh` religa Chrome e faz login; sem grupo, usar `joinname.js` e Ir ao líder; religar Auto-caça, PK, monitor e keepalive.
- Jogo em "Reconectando..." por >5 min: **avisar a usuária**; só então recarregar a página (recarregar pode disparar a verificação).
- **Verificação Cloudflare "Confirme que é humano" na tela de login: PARAR.** Não marcar a caixa, não clicar ENTRAR para forçar, não usar serviço/skill de resolver CAPTCHA, não rodar `revive.sh` em loop. Só uma pessoa pode passar. Opções legítimas: a usuária entra pelo próprio navegador, ou usa a tela remota (`remote.js`, porta 8765, avisar o app com a ferramenta de preview; ela clica, o script só repassa; encerra em 25 min). A senha pode ser digitada no campo; a caixa é dela.

## Coordenadas úteis (1280×800)
Bolsa (ícone) 925,772 · páginas ◀276,780 ▶298,780 · Organizar 484,780 · Social tecla D (Grupo 494,180; Procurar 590,623; Ir ao líder 561,233) · Auto-caça liga/desliga 996,60 · PK 1065,108 · Menu Mais 1056,60 · F9 loja · Mapa Guia tecla M · Status tecla C (seta ▲ ao lado do atributo, ex. Força 814,640). **Pontos de status e de habilidade: PERGUNTAR à usuária onde colocar; sem resposta com escolha, NÃO gastar.**

## Armadilhas já cometidas (não repetir)
Dizer "estoque ok" sem contar; clicar a Auto-caça às cegas (é toggle); script em laço apagou a lista de Coleta; tooltip antigo devolveu item errado; clicar ENTRAR por posição na lista que reordena (caí em outro grupo/servidor); sair do grupo no campo com PK ligado (6 mortes seguidas, 5 pergaminhos); trocar de grupo por <4 sem checar online; relançar o monitor com `&`; recarregar a página em "Reconectando".
- **Ida à cidade (05/11, custou 3% EXP e 4 pergaminhos):** Core PRIMEIRO; só pausar a Auto-caça e parar o monitor depois de chegar à cidade (conferir pelo minimapa); nunca ficar parado no campo com PK. Depois de ir/trocar, contar pergaminhos (mochila + baú; reserva do baú estava vazia) e comparar o XP%: queda = morte. Entrar em grupo com `joincard.js` (imprime o card clicado), não `joinname.js`. Keepalive: `run_in_background` com `timeout: 7200000` (sem timeout morre em 30 min).
