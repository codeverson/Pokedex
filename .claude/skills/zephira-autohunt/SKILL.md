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
- Cristais livres vão ao Leilão a **20.000 de ouro** cada (nunca ao NPC) e **sempre devem ser subidos**: a cada relatório/ida abrir Mais>Leilão>Meus anúncios, reanunciar os expirados com `relist.js` (expirados ocupam os 20 espaços até serem coletados) e anunciar os novos da bolsa com `leilao_cristal.js`; dá para fazer no campo, fechando a janela depois; equipamentos vendidos ao ferreiro Gus (`sell2.js`). A Coleta da Auto-caça **não pega equipamento grande** (armas, armaduras, escudos, botas, luvas, braceletes) para não encher o peso; desde 05/11 pega só **Anéis e Amuletos** (pedido da usuária; lista de 15 grupos). Painel: tecla O > Coleta; adicionar = clicar o grupo na lista de baixo e ADICIONAR (1 por vez, conferir 'Lista de itens (N)'), fechar com o X (783,131) e conferir pela imagem que a Auto-caça segue 'Atacando/Parar'.
- Pacote premium de 30 dias já comprado (EXPup 30%, Awell, Fênix, Presa, Drena Almas, Redução de Mana/RES, Olho Mágico): **não comprar Awell/Fênix/EXPup**. Tempo (moeda) só para pergaminho/emergência.
- Ler a mochila pela **dica (tooltip) célula a célula**, com baú/Leilão fechados; imagem só para ouro/peso. Pergaminhos ficam na **página 2** (x≈394, y=648..714 e 758).
- Anotar todo erro com `./anota.sh "título" "o que errei" "regra"` sem a usuária pedir. Relatar **na hora** problema urgente (morte, queda, grupo desfeito, XP parado), sem esperar o alarme.
- **Todo relatório informa o tempo até o próximo nível E a hora aproximada (relógio de Brasília) em que sobe de nível (agora + tempo; somar ~10 min por ida à cidade):** `(100% − % atual) × custo do nível / mi/h`. Custo medido: nível 71 ≈ 80,8 mi (EXP 715,5 → 796,1 mi); nível 72 ≈ 90,0 mi (EXP 796,1 → 886,0 mi; tela do personagem, tecla C). Ranking: Mais > Ranking.

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

## Ao subir para o lv 75 (ordem da usuária, 09/11)
Testar os DOIS mapas e ficar no melhor XP/h: (A) Torre Sem Fim 4º andar canal Nv 75–80; (B) Templo Maldito 2 (abre no lv 75). Trocar sempre pela sequência segura (Core → cidade → sair do grupo → entrar pelo nome → Ir ao líder → Auto-caça → PK → monitor), medir ≥20 min em cada um com grupo cheio e relatar os dois números.

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
- **Anéis/colares (06/11):** `sellall.js` (usado pelo `town.js`) vende os que o Haradur não consegue equipar e GUARDA os que servem (nv≤71, For≤241, Int≤31, Tal≤90, Agi≤70, Vit≤27, classe Fighter ou sem classe): avisar a usuária quando o log trouxer 'GUARDAR (serve no Haradur)'.

## Atualização do jogo (ordem permanente da usuária, 12/11)
Quando aparecer o ícone amarelo "!" (Nova versão do jogo disponível, canto superior esquerdo): SEMPRE atualizar, sem perguntar. Clicar no ícone (17,16) > diálogo > ATUALIZAR (719,441). Recarrega ~20-30 s e volta sozinho ao personagem/grupo com Auto-caça ligada e PK mantido; conferir tooltip do PK (1065,108) e relançar o monitor. Fazer logo no próximo ciclo, sem esperar alarme.

## Protocolo do Leilão - comprar poções (ordem da usuária, 13/11)
**Quando:** em TODA reposição de poções de HP (perto de 100 no painel "Restam HP"), olhar o Leilão ANTES de planejar a ida à cidade. O Leilão é global (vendedores de todos os servidores) e compra de qualquer lugar, então se der para repor por ele NÃO sair do grupo (evita ~5 min parado, ~0,5 mi de XP, e o risco de PK/queda).
**Referência de preço:** Namy = 140 ouro/poção (250 por 35.000). Leilão em 13/11: 56–75 ouro/poção para lotes de 150–800 (TioFS/Apolo 467 por 25.999; Adamsoy/Atena 350 por 20.000; Ruaneloy/Poseidon 146 por 11.000). O anúncio mostra lote e preço TOTAL: sempre dividir (preço ÷ quantidade).
**Passos:**
1. Parar o monitor (`pkill -f 'node monitor.js'`, exit 144 é esperado), Mais (1056,60) > Leilão (1059,132). FPS cai a 2–5 com a janela aberta: ser rápido.
2. Aba Comprar: nome "Poção Media de HP" + Enter, moeda = Ouro (selects), ordem "Menor preço" (muda a lista inteira; o select pode recarregar: reselecionar). Ler as páginas com `scripts/leilao_pocoes.js` (copiar para o scratchpad; clica a seta › em 689,658 e lê os cards `.auc-listing`; ~14 páginas = 2 min) e calcular ouro/poção por lote em Python.
3. Escolher o lote de MENOR ouro/poção com 250–500 unidades, e só se for < 100 ouro/poção; vendedor ≠ eu; conferir o preço total na imagem antes de clicar.
4. Comprar: COMPRAR > PAGAR EM OURO > COMPRAR (722,468) > Yes. O item NÃO vai para a bolsa: Mais > Distribuidor > Receber. Contar depois pelo painel "Restam HP" e pelo ouro (comparar antes/depois).
5. Fechar a janela (971,125) e o menu Mais (1056,60), reabrir/conferir o Social (D > Grupo) e o PK, relançar o monitor.
**Regras:** gastar só poções de HP/mana; nunca comprar Awell/Fênix/EXPup nem itens que não sejam poção, nem gastar Coins/USDT (só ouro). Não pagar > 35.000 por lote de 250 (o preço da Namy). Se o Leilão não tiver lote melhor que 100 ouro/poção ou a compra falhar, cair para a rota da Namy (`town.js`). Primeira compra de teste: preferir um lote do mesmo servidor (Poseidon) e conferir que chega no Distribuidor; registrar o resultado em `references/licoes-erros.md`.
**Estado/teste (13/11 03:15 BRT):** protocolo VALIDADO. Comprado "Poção Media de HP x146" do Ruaneloy (Poseidon) por 11.000 ouro (75/un) com o grupo de pé: Leilão > filtro do vendedor (campo "Nome do item ou vendedor" 383,331, Ctrl+A, nome, Enter) > localizar o card certo (`.auc-listing`, conferir qtd/preço no texto antes de clicar COMPRAR) > "PAGAR EM OURO" (902,508) > diálogo "Comprar no leilão?" mostra "Você paga" e "Saldo antes → depois" (COMPRAR 722,468; a compra não pode ser desfeita) > aviso "está no Distribuidor" (Yes 690,411) > fechar Leilão (971,125) > Mais > Distribuidor (1015,384) > selecionar o item > RECEBER (815,594) > pede quantidade > RECEBER (815,595) > "Você recebeu Poção Media de HP x146". NÃO usar "Receber todos" (traz também o EXPup de evento e cristais antigos). Resultado: Restam HP 91 → 235. Com a janela do Leilão aberta o Auto-caça fica "pausada (Janela aberta)" e o FPS cai a 2-4; fazer tudo em ~4 min. Próxima vez, preferir o maior lote barato (ex. 467 por 25.999 de outro servidor ainda não testado entre servidores).
**Compra entre servidores validada (13/11 06:30 BRT):** "Poção Media de HP x467" do TioFS (Apolo, outro servidor) por 25.999 ouro (56/un), saldo 562.554 → 536.555; chegou ao Distribuidor igual (Mais > Distribuidor 1015,384 > RECEBER 815,594 > RECEBER 815,595). Restam HP 101 → 566. Tempo total ~2 min com Auto-caça pausada pela janela. O leilão lê rápido (8 páginas ordenadas por "Menor preço" já mostram o melhor lote). Consumo real de HP: 1,1–2,5/min, então 467 poções duram ~4–6 h.

## SEMPRE SEGUIR (ordem permanente da usuária, 13/11)
**Nunca ficar parada e nunca parar para perguntar.** Em 13/11 parei ~6h45 após um reinício do worker (perguntei sobre quests e ninguém viu; personagem offline, sem XP nem relatos). Regra: depois de QUALQUER reinício, queda ou mensagem da usuária, retomar sozinha NA HORA, sem esperar resposta: conferir `date -u` > Chrome (comando de recuperação acima) > 5 keepalives > `login_only.js` > Social: **procurar** grupo (NUNCA criar grupo; se criar sem querer, desfazer) > Ir ao líder > Auto-caça > PK > monitor > relato com screenshot. Decidir pelas regras e relatar depois; não usar AskUserQuestion no meio do trabalho. Quests só se a usuária pedir, sem abandonar o grupo/XP por horas. Digitar texto só com `locator.fill` em campo de texto (a tecla D/letras soltas disparam atalhos do jogo).


## Black Friday Potion (Tempo) - comprar todo dia (ordem da usuária, 14/11)
- Ordem: "a de Tempo pode comprar sempre". Comprar 1x por dia na Loja (F9 > Tempo > Premium, última carta "Black Friday Potion (3h)", 300 Tempo, limite 1 por conta por dia; o limite reinicia à meia-noite) e ATIVAR com clique direito no frasco. Efeito: +5% EXP de monstros, +5% ataque, -10% dano recebido, 3 h, tempo corre mesmo offline, não acumula com outra igual.
- Só a versão de Tempo (300 Tempo). A de Boss Point continua dependendo de "sim" dela.
- Como fazer sem erro: pausar o monitor (pkill -f 'node monitor.js'), abrir a bolsa e deixar na PÁGINA 2 (a página 1 está cheia e a loja recusa com "sem espaço no inventário"), abrir F9 > Tempo > Premium, ARRASTAR a janela da loja para cima (título de 500,125 até 500,45) porque a bolsa cobre o botão COMPRAR da última carta; clicar COMPRAR (603,575 depois do arrasto), conferir o diálogo (qtd 1, 300) e CONFIRMAR (640,460 e 718,466), fechar o aviso (Yes), fechar a loja (971,44), passar o mouse no frasco na bolsa e ativar com clique direito. Relançar o monitor.
- Antes de comprar, conferir o saldo de Tempo (reserva para Terry 700 e pergaminhos 10 cada; hoje 4.720).

## Terry (3 Horas) das Tarefas do Dia - resgatar todo dia (ordem da usuária, 14/11)
- Ordem: "resgate o Terry também todo dia". Mais > Eventos (menu "Mais" em 1056,60; "Eventos" em ~1030,276) > aba "Tarefas do Dia" (640,172) > carta "Caçada rápida" (derrotar 1000 monstros; paga Terry 3 Horas) > RECEBER (~913,280). Reinicia todo dia às 00:00 BRT/UTC-3 (o painel mostra "Reinicia em ...").
- O prêmio vai para o Distribuidor se a bolsa estiver cheia ("Recompensa recebida! Parte dos itens foi para o Distribuidor"). Não ativar por cima da Terry de 8 h que já está ativa (não sei se soma ou se perde); ativar quando a de 8 h acabar, ou comparar antes. Terry 8 h comprada às ~17:00 BRT de 13/11 vale até ~01:00 BRT de 14/11.
- Aproveitar a mesma abertura para conferir as outras tarefas do dia e semanais (Caçador de chefes, Coletor, Terror dos chefes, Coragem na Bellatra) e receber o que estiver pronto, sem gastar Tempo.
- Fazer com o monitor parado e fechar a janela (971,125) depois; religar o monitor.

## Força Devine, bolsa cheia e loja de Tempo (aprendido em 13/11 à noite)
- Força Devine: item de caça da categoria "Forças" da loja de Tempo (F9 > Tempo > Premium > Forças, 355,456): Devine 150 Tempo, Murky 120 Tempo. Comprei 10 (1.500 Tempo) a pedido dela. O painel da Auto-caça passa a mostrar "Force: N usadas · restam M" e a Auto-caça usa sozinha (1 unidade durou mais de 45 min). DPS de 30 s do Haradur foi de ~290-400 para ~480-610 depois da Devine (quadro do grupo: de ~420-470 para ~500-1.100). O XP/h do grupo quase não mudou (~8,3-8,9 mi/h). Efeito exato do item não aparece em nenhum texto do jogo.
- Compra para o Distribuidor ou pela loja só funciona com a bolsa na PÁGINA 2: a página 1 está cheia de anéis e colares e o jogo responde "Espaço insuficiente"/"sem espaço no inventário". Antes de receber/comprar, abrir a bolsa e clicar a seta (298,780) para a página 2. O monitor reabre a bolsa na página 1 nos ciclos dele; não dá para fixar.
- Para liberar slots de verdade: vender os anéis/colares da página 1 no NPC em Ricarten (junto da ida de reposição de poções; consumo real ~1 poção/min, limite de 100 chega ~23:00 BRT de 13/11).
- Quando a bolsa cobre o botão COMPRAR da loja, arrastar a janela da loja para cima (título de 500,125 até 500,45). Clique sintético por JavaScript NÃO funciona no jogo; só clique de mouse real.
- Eventos: Mais > Eventos mostra tarefas diárias/semanais/Corrida de Nível; o Calendário só mostra horários (Bellatra, Boss Time). Corrida de Nível já recebida até o nível 40+ (6/7), próxima exige nível maior.
- Ranking: geral sobe ~4 posições por 10% de XP (13/11: 2201º às 17:18, 2181º às 19:38, 2177º às 20:19); o topo está todo no nível 87, então só o nível 78 dá salto grande.
- Black Friday: a de Tempo é diária (ver seção acima); a de Boss Point também é 1 por dia e só com "sim" dela.

## Distribuidor, bolsa cheia e Leilão (aprendido em 14/11 às 22:40 BRT)
- "Espaço insuficiente" ao RECEBER no Distribuidor = faltam slots na bolsa para o item NÃO empilhável (Core, Terry). Item empilhável que já tem pilha na bolsa (poções) entra mesmo assim. Poção ×794 entrou com a bolsa cheia.
- "Abra o Distribuidor pela Loja de Itens de novo" / "Sua conta está conectada em outro servidor": a sessão do Distribuidor expirou (reconexão do jogo, aparece "Reconectando..." no painel da Auto-caça). Fechar (866,133) e reabrir por F9 > botão Distribuidor (839,141 no topo da loja) e tentar de novo. Item selecionado: RECEBER (815,594; sobe para 815,576 quando aparece uma mensagem de aviso; olhar a imagem).
- Anúncio no Leilão para liberar slot de graça (abre no campo): Mais (1056,60) > Leilão (1059,132) > Vender (468,172) > clicar o anel na grade (715,351) > campo Ouro (placeholder 1.500.000) > REVISAR ANÚNCIO (902,658) > ANUNCIAR (926,658). O item sai da bolsa e fica guardado no Leilão (recuperável em Meus anúncios). Anel Encantado: 726 vendidos em 30 dias, média 43 mil; anunciei 2 a 30.000. Isso NÃO bastou para receber o Core (continuou "Espaço insuficiente"), então vender os anéis no NPC em Ricarten continua sendo o caminho para liberar a página 1.
- Compra de poção de HP (22:41 BRT): 794 por 50.000 (63/un) de WesleySafadao (Ares) no Leilão; Restam HP 73 → 866. Passos iguais ao protocolo acima; filtro do vendedor no campo "Nome do item ou vendedor" (placeholder contém "vendedor").
- Zerou o PK sozinho: depois da reconexão/queda de grupo o Modo PK volta a "desligado". Sempre passar o mouse em 1065,108 e ligar de novo.
- Saídas 12 do monitor (saiu do grupo): em 14/11 ocorreram 2 vezes (21:44 e 22:08) com lag/bônus Twitch bugado no servidor. Recuperar pelo Social > Procurar e FILTRAR pelo nome do líder antes de clicar ENTRAR (a lista reordena sozinha e já entrei no grupo errado).
