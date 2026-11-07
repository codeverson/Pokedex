# >>> REGRA MÃE (ordem da usuária, 04/11 12:5x): APRENDER E ANOTAR SOZINHO, SEM ELA PEDIR <<<
Toda vez que acontecer qualquer um destes, ANOTAR NA HORA com `./anota.sh "título" "o que deu errado" "regra para não repetir"`:
 (a) a usuária corrigir, reclamar ou disser 'isso é erro' / 'você errou' / 'de novo?';
 (b) eu descobrir que errei (contagem errada, clique que desfez algo, compra sem conferir, afirmação sem prova);
 (c) algo cair/quebrar (quedas, morte, peso, mana, grupo, login) e eu achar a causa;
 (d) uma ação falhar em silêncio e eu precisar de outra via.
Passos: 1) corrigir o problema; 2) anotar a lição (anota.sh grava nos 3 arquivos); 3) se for repetível, AUTOMATIZAR (monitor.js/script) em vez de depender de lembrar; 4) contar à usuária em 1 frase o que aprendi — sem esperar que peça.
RETROSPECTIVA: em todo alarme, antes de reportar, pergunto: 'houve algum erro, retrabalho ou surpresa neste ciclo?'. Se sim, anotar. Se a resposta for 'nada', não inventar lição.
Antes de agir em tarefa nova (comprar, vender, trocar grupo, login): reler a seção do assunto neste arquivo.
-------------------------------------------------------------------------------
# ERROS DE 03–04/11 E COMO NÃO REPETIR (ler no começo de cada sessão e a cada alarme)

Regra mãe: **nunca escrever "ok" sem ter olhado.** Todo relatório precisa de leitura feita naquele minuto.
O Haradur tem que continuar sozinho: se algo abaixo falhar, resolver e só avisar a usuária depois.

## 1. Estoque (Cores, Pergaminhos, Awell, poções)
- ERRO: escrevi "pergaminhos e Cores ok" ~40 vezes sem abrir a mochila. Fiquei sem Core e com 2 pergaminhos.
- ERRO: contei "2 Cores" mas eram 2 CASAS do mesmo item (1 Core). **Core e Pergaminho ocupam 2 casas cada: dividir a contagem por 2.**
- COMO: abrir a mochila (clicar no ícone da barra, **925,772**; a tecla V às vezes não abre), ler as 2 páginas (setas 276/298,780) casa por casa com `tip.js`, contar pelo NOME do tooltip. Conferir se a mochila abriu olhando a imagem (o teste por texto "Item Info" falha).
- MÍNIMOS: **5 Cores, 5 pergaminhos (ordem da usuária: ocupam muito espaço; NÃO acumular mais que 5), 150 poções Média HP**. Abaixo disso: ir à cidade/comprar ANTES, sem esperar a usuária.
- Depois de QUALQUER compra: conferir que o item entrou (saldo caiu o valor certo + item na mochila/Distribuidor). Compra por clique cego falha em silêncio.
- Pergaminho: F9 > aba Tempo > filtro "Rebirth" > 10 Tempo cada. Quantidade em (558,477), COMPRAR (640,509), CONFIRMAR (718,538), "Yes" (690,376). Item vai ao Distribuidor.

## 2. Buffs com prazo (Awell, EXPup, Fênix) — SUBSTITUÍDO: ver seção 14 (pacote 30 dias, não comprar mais)
- ERRO: o Awell (+1000 de peso) expirou às 04:41 e ninguém renovou: peso 1288/1004, "Peso excedido", caça lenta/parada por horas.
- COMO: a cada relatório passar o mouse nos ícones da coluna direita (x≈1247; y 382 EXPup, 422 Awell) e ler "Tempo restante". **Renovar quando faltar menos de 1 hora.** Awell 8h = 280 Tempo, Fênix 8h = 700, EXPup 30% 8h = 700.
- O monitor sai com código 21 quando aparece "Peso excedido": tratar na hora (comprar Awell; se a F9 recusar por peso, ver item 4).

## 3. Equipamento quebrado / durabilidade
- ERRO: morreu 3x em 15 min no Templo Maldito 1; cada morte tira integridade e as Luvas Gigantes quebraram (integridade 0 = o item para de funcionar).
- COMO: **depois de toda morte** ler a integridade dos equipados (tooltip: "Integridade: X/Y"). Se algum < 100%: ir ao Ferreiro Gus (Mapa M, ícone ~(550,440), Ir até) > "Consertar tudo" (526,347) > conferir de novo que TODOS estão no máximo (inclusive peças que não aparecem na barra). Core para ir.
- Mortes frequentes (>3 em 15 min) = mapa forte demais: voltar ao Santuário.

## 4. Peso / mochila cheia
- ERRO: deixei o loot acumular; mochila cheia impede receber do Distribuidor e comprar na F9 ("Excede o peso limite", "Espaço insuficiente").
- COMO: ir à cidade ANTES de encher: peso > 70% do limite = vender. Equipamento solto: Ferreiro Gus (`sell2.js` com a loja aberta; corrigido para só ligar o modo Vender quando estiver desligado). Cristais: Leilão a 20k.
- Largar item no chão NÃO reduz o peso mostrado. Anunciar no Leilão tira o item da bolsa (serve de emergência).
- Receber do Distribuidor em ciclos: vender > receber > vender (`cycle2.sh`).

## 5. Cristais e Leilão (regra da usuária)
- Cristais livres: Leilão a **20.000 cada**, nunca NPC. Equipamento: NPC, não Leilão (anunciei a 6k e não vendeu).
- Menu Mais (1056,60) > Leilão (1059,133). Vender: clicar item > ouro (760,433) > REVISAR ANÚNCIO (902,658) > ANUNCIAR (926,658). Meus anúncios: Cancelar + Confirmar no MESMO botão. Coletar tudo (911,658).
- Pendente: reanunciar a 20k os anúncios antigos abaixo disso (Cristal de Aranha 14k/15k/17k).

## 6. Grupo
- Regra da usuária: **sempre em grupo, nunca solo.** `joinloop.js` entra no melhor grupo aberto (média 66–80, ≥3 membros).
- ERRO: "Sair" do grupo exige CONFIRMAR: botão Sair (615,233) e depois SAIR em (734,431). Eu clicava só no primeiro e a troca não acontecia.
- Morrer pode tirar o personagem do grupo ao revive: conferir grupo depois de cada morte.
- Modo PK: por ordem da usuária (11:3x) fica LIGADO (+10% EXP); desligar só para trocar de grupo e religar em seguida (ver seção 12).
- Depois de entrar: "Ir ao líder" (5.000 de ouro), fechar janelas (Procurar Grupo X=(865,133)), conferir Auto-caça ligada.
- Trocar de grupo só quando <3 mi/h por 15 min, e conferir XP/h depois de 10 min. TM1 dá ~5,4 mi/h mas mata; Santuário ~2,5 mi/h e seguro.

## 7. Janelas abertas pausam a caça
- ERRO: mochila, F9, Leilão, mapa ou loja abertos pausam a Auto-caça; deixei várias vezes assim.
- COMO: ao terminar qualquer tarefa, fechar TUDO e olhar o painel "Auto-caça": tem que estar atacando.
- A tecla V alterna: apertar duas vezes fecha. Clique no ícone 925,772 é mais confiável.

## 8. Monitor e container
- **QUEDAS DO CONTAINER (causa mais provável, com prova em quedas.log):** a máquina é recriada (dmesg mostra 'virtual machine fork'; o disco /tmp persiste, os processos morrem) quando a sessão fica PARADA sem nenhuma tarefa rastreada em segundo plano.
  Provas: 5 quedas seguidas (21:41, 21:58, 22:10, 22:26, 22:41) com monitor via nohup, cada uma no mesmo segundo do alarme do Vigia; 6h14 SEM queda com monitor rastreado (run_in_background); quedas às 06:59 e 07:27 quando eu estava esperando a usuária sem tarefa rastreada.
  Regra: SEMPRE manter 2 tarefas rastreadas: (1) `node monitor.js` com run_in_background e (2) o keepalive `sleep 7100` com run_in_background timeout 7200000. Quando qualquer uma terminar (notificação), relançar NA HORA, antes de tudo. Nunca ficar esperando a usuária sem elas.
  Cada alarme: rodar `./evid.sh` (grava em quedas.log) para continuar provando.
- ERRO MEU (04/11): eu disse que o nohup 'não era a causa' porque houve queda às 04:55/07:27, mas nesses momentos NÃO havia tarefa rastreada (monitor tinha saído com código 21 e eu não relancei). Retratei sem checar. Conferir antes de retratar.
- COMO: monitor sempre `node monitor.js` com run_in_background. Saída 20 = relatório (religar), 17 = morte, 21 = peso excedido, 12 = sem grupo, 14 = poções.
- Se a porta 9222 não responder: `./revive.sh`, depois joinloop + Ir ao líder + Auto-caça + monitor.
- Não rodar dois monitores ao mesmo tempo (`pgrep -f "^node monitor.js"`).
- Janela do navegador pode encolher para 30x24: `run.js` agora restaura 1280x800 sozinho.

## 9. Honestidade nos relatórios
- Não prometer o que não conferi; não dizer "provável causa" como se fosse resolvida; dizer o que não sei.
- Corrigir na hora quando descobrir que errei, dizendo exatamente o quê.
- Cada relatório: XP/h (rate.py), mortes, estoque CONTADO, tempo dos buffs, integridade, missão.

## 10. Checklist do relatório (fazer na ordem, em 2 min)
1. uptime / porta 9222 / monitor vivo   2. rate.py   3. quest.js   4. mochila: Cores, pergaminhos, poções, peso   5. buffs (Awell/EXPup tempo restante)   6. integridade do equipamento   7. fechar janelas, caça ligada   8. só então enviar o relatório

## 11. Cidade, Core e mana (aprendido em 04/11)
- **Usar Core TIRA o personagem do grupo.** Depois de qualquer ida à cidade: `joinloop.js` (média 66–80, ≥3 membros) + "Ir ao líder" + conferir Auto-caça ligada. Morrer também pode tirar do grupo.
- **Mana:** a Auto-caça no Templo Maldito 1 gastou ~40 poções de mana em 15 min e chegou a "MP 0" (o painel O mostra "Restam HP · MP · RES"). Sem mana o dano cai e o ritmo despenca (2,5 mi/h). Conferir "Restam MP" a cada relatório; se < 30, comprar.
- **Onde comprar mana:** a Namy NÃO vende (só HP e STM). Comprar no **Leilão > Comprar > filtro "Mana"** (lotes de 100, ~300 a ~550 ouro cada), conferir diálogo, PAGAR EM OURO (902,509), COMPRAR (722,469), "Yes" (690,412). Item cai no Distribuidor/mochila.
- **ANTES de comprar mana conferir o MP máximo** (janela C: MP 57/236 → máx 236) **e o regen da poção.** Mística de Mana regen 1700–2100 = ~8 barras inteiras por poção (desperdício). Para barra de 236 a Média de Mana serve. Comprei 100 Místicas (30.000 ouro) sem conferir: erro. Medir o consumo no relatório seguinte.
- Namy: Média de HP (270,233) em lote de 250; Core para Ricarten (282,380). Cada compra: ler o diálogo, conferir saldo caiu o valor certo.
- Loja de NPC aberta bloqueia a tecla M: fechar a loja (X em 563,169) antes de abrir o mapa. Clicar no NPC reabre a loja.
- `goto_npc.js` leva ao NPC pelo Mapa Guia (Gus [550,440], Namy [575,460]). `cycle2.sh` repete vender+receber do Distribuidor.
- Leilão e janelas pausam a Auto-caça: fechar e conferir "atacando".
- Fênix: agora vem no pacote de 30 dias (ver 15b); não comprar separado.

## 12. PK (ordem da usuária, 04/11 11:3x): MANTER PK LIGADO (+10% EXP)
- Botão espadas cruzadas (1065,108); tooltip mostra "Modo PK: ligado/desligado". Só pode alternar a cada 5 min.
- Ligado: não vale em cidade nem contra o próprio grupo/clã. Risco: jogadores com PK ligado podem atacar (3 mortes com PK em 03/11).
- Para TROCAR de grupo o jogo pode bloquear com PK ligado ("combate PvP"): desligar, trocar de grupo e LIGAR DE NOVO assim que passar 5 min.
- Conferir o estado do PK em todo relatório (checklist) e religar se estiver desligado. Se morrer por PK mais de 2x em 15 min, avisar a usuária antes de desligar.

## 13. REGRA (usuária, 04/11 11:4x): 2 MORTES EM MENOS DE 15 MIN = IR À CIDADE ANALISAR. SEMPRE.
- O `monitor.js` agora grava cada morte em `deaths.log` e SAI COM CÓDIGO 22 na 2ª morte dentro de 15 min (código 17 = 1ª morte). Código 22: parar tudo e fazer o roteiro abaixo, sem esperar a usuária.
- ROTEIRO (nesta ordem):
  1. Core para Ricarten (conferir que há ≥1; senão Leilão/F9).  2. Ferreiro Gus > Consertar tudo > conferir integridade de TODAS as peças.
  3. ANALISAR a causa e anotar no diario.md: mapa/monstros que mataram (log do chat "perdeu EXP"), HP/MP restantes ("Restam" do painel), poções HP/MP usadas, buffs ativos (Awell/EXPup/Fênix), PK ligado?, DPS do grupo, nível médio do grupo vs o meu, integridade antes do conserto.
  4. Corrigir: renovar buff vencido; repor poções (HP Média 250, mana pelo Leilão); vender loot; Cores até 5; pergaminhos até 5 (nunca acima de 5).
  5. DECIDIR o mapa: se as mortes vieram de monstros de nível alto (TM1 nv75–79), voltar ao Santuário até estabilizar; se foram PK, avisar a usuária e manter PK ligado só se ela mandar.
  6. joinloop.js (Core tira do grupo) + Ir ao líder + Auto-caça + PK ligado + monitor e keepalive rastreados. Relatar à usuária o que causou e o que mudou.
- Contar também mortes que o contador não mostrou: conferir os pergaminhos (5 → 15 compra mostrou que houve mais mortes que o contador).
- Relatório: incluir OURO (rodapé da bolsa: screenshot clip x240,y760,w300,h40) e variação desde o relatório anterior.

## 14. AJUSTES DA USUÁRIA (lista viva, mais novo embaixo)
- 04/11 11:4x: **manter 5 Pergaminhos de Renascimento** (não 10/15), pois ocupam muito espaço (2 casas cada). Repor até 5 sempre que cair para 3 ou menos (F9 > Tempo > "Rebirth", 10 Tempo cada, quantidade = 5 − atual). Hoje há 15 na mochila: não comprar mais até gastar. Eles são vinculados (não vendem); não descartar sem ordem.
- 04/11 11:4x: usuária logou na conta para comprar premium de 30 dias (Awell, Fênix, Redução de Mana). NÃO logar/revive enquanto ela estiver na conta; só depois de "pode voltar".
- 04/11 11:5x: usuária colocou ALGUNS PERGAMINHOS NO BAÚ (quantidade desconhecida). Ao voltar: contar o que sobrou na mochila (meta 5) E no baú (Armazém: 'Vigia Arent' ~(582,429) ou 'Warehouse keeper Arent' ~(617,499) no Mapa Guia de Ricarten). Se a mochila tiver <3, retirar do baú antes de comprar na F9. O baú é a reserva: não comprar pergaminho enquanto houver no baú. Contar também o que há no baú no relatório (tooltip do baú).

- 04/11 12:0x: **NÃO COMPRAR MAIS Awell, Fênix nem EXPup de 8h/3h** (a usuária comprou o pacote de 30 dias). Esta regra SUBSTITUI a seção 2 e as regras antigas ("renovar Awell com <1h", "Awell 8h = 280 Tempo", "Fênix 700 Tempo", "comprar premiums de Tempo que der"). Tempo (moeda) fica só para Pergaminhos (10 cada, repor até 5) e emergências. Se o Awell 30d acabar ou aparecer "Peso excedido" com o buff ativo, AVISAR a usuária antes de gastar.
## 15. PACOTE PREMIUM 30 DIAS (usuária comprou 04/11; 6.000 Coin com -25%; tempo corre online E offline)
- Conteúdo: Poção EXPup30%, Olho Mágico, Presa Vampírica, Drena Almas, Redução de Mana (-30%), Redução de RES (-30%), Força de Awell, Fênix. Negociável.
- Ícones (coluna direita ~x1200-1250): EXP UP = EXPup; punho = Awell; pássaro laranja = Fênix; DOWN azul = Redução de Mana; DOWN verde = Redução de RES; dentes = Presa Vampírica; olho dourado = Olho Mágico; silhueta azul = Drena Almas (prováveis); dragãozinho = pet (fora do pacote). Há mais ícones escondidos atrás do botão ›.
- Com o pacote NÃO precisa comprar Awell/Fênix/EXPup de 8h. Checar o 'Tempo restante' (passar o mouse em CADA ícone) uma vez por dia e avisar a usuária com 3 dias restantes. Registrar a data de vencimento no diario.md ao voltar.
- Esperado: gasto de poções de mana e estamina cair ~30%. Medir ('Restam MP') e anotar o novo consumo/h.
- Pesquisa na internet (04/11): 5 buscas não acharam lista de buffs do Priston Tale; os itens vêm do jogo (Zephira World, servidor privado). Usar a imagem da usuária e os tooltips do jogo como fonte.

### 15b. EFEITOS EXATOS (informados pela usuária, 04/11 12:0x) — todos 30 dias
- Poção EXPup 30%: +30% de EXP.
- Olho Mágico: aumenta o drop.
- Presa Vampírica: ao bater, recupera HP.
- Drena Almas: ao bater, recupera MP (deve derrubar o consumo de poção de mana).
- Redução de Mana 30% e Redução de RES (estamina) 30%: gastam 30% menos.
- Força de Awell: +1000 de peso.
- Fênix: +10% de EXP e 30% de chance de um drop extra (NÃO é ressurreição; eu supunha errado). O aviso da Auto-caça "Sem Fênix na mochila" só significa que o buff não está ativo.
- EXP total empilhado: EXPup 30% + Fênix 10% + PK 10%.
- CONSEQUÊNCIA: mais drop = mochila enche mais rápido -> ir à cidade vender com mais frequência (checar peso/casas em todo relatório); mais loot = mais ouro por hora (medir de novo).
- Conferir no relatório se TODOS os 8 buffs estão ativos (ícones) e o menor tempo restante.

## 16. LER A MOCHILA POR IMAGEM, SEM PASSAR O MOUSE (ordem da usuária, 04/11 12:3x)
- Passar o mouse em cada casa é lento, pausa a Auto-caça e falhou várias vezes hoje (mochila fechada, tooltip vazio). Contar pela IMAGEM do ícone.
- ÍCONES JÁ APRENDIDOS (pela usuária e por tooltips):
  - **Pergaminho de Renascimento** = rolo BRANCO e AZUL com uma cruz azul "+" e pontas marrons. 2 casas. Tooltip: vinculado à conta, age sozinho ao morrer, não perde EXP nem ouro, revive no local em 10 s com metade do HP, gasta 1 por morte, não vale no Bless Castle, não pode ser vendido por ouro.
  - **Core para Ricarten** = tubo DOURADO com joia ciano. 2 casas.
  - Poção EXPup 30% = frasco com selo "EXP UP". Pilhas de poção mostram o NÚMERO no canto do ícone (47, 9, 511...).
  - Cristais = esferas coloridas (Decapitador verde, Místico azul-claro, Aranha roxo).
- COMO: screenshot recortado só da mochila (x240–530, y630–770 com a página aberta), uma página por vez; contar os ícones de cada tipo; cada Core/Pergaminho conta 1 por ícone (não por casa). Comparar com a pilha/numeração.
- MELHORIA A FAZER ao voltar ao jogo: (1) ver se o DOM entrega o item sem hover (elementFromPoint em uma casa: src/classe/data-*), o que daria leitura exata sem tooltip; (2) se não, montar `icones.json` com o recorte de cada item conhecido (aprendido uma única vez por tooltip) e comparar por similaridade.
- Tooltip só para APRENDER um ícone novo, não para contar.
- Core para Ricarten (tooltip da usuária 12:3x): 'Voltar para Ricarten', clique direito para usar, leva ao destino, chega com 10 s de proteção, NÃO funciona em Bellatra nem na Arena de Quest, preço de venda 200. Ícone = rolo dourado comprido (diferente do pergaminho branco-azul). Na mochila, ao lado: pilha com número (ex.: 100) = poção; cristal verde-escuro; cristal roxo.
- 04/11 12:5x TESTE da leitura por imagem: contei ~16 pergaminhos olhando o recorte; a contagem exata por tooltip deu 11 (e 5 Cores). Imagem NÃO é confiável para contar quando rolos se misturam (pergaminho branco-azul x core dourado). Método que vale: matriz por tooltip, 1 vez por relatório, ~1 min, com a Auto-caça pausada só durante a leitura; imagem só para conferir o peso/ouro e ver se há algo novo.
- ESTADO DA MOCHILA (12:5x, exato): 5 Cores, 11 pergaminhos (meta 5: sobram 6 -> guardar no baú na próxima ida à cidade, NÃO descartar), ouro 780.410. Premiums do pacote com 719h37m (~30 dias) às 12:4x; pet Terry 2h35m.

## 17. AUTO-CAÇA: NUNCA CLICAR 996,60 SEM LER O ESTADO (erro de 04/11 12:3x)
- O botão (996,60) é um INTERRUPTOR. Clicar sem ler desliga o que estava ligado. Hoje liguei, desliguei e deixei parado ao lado do grupo; a usuária avisou 'isso é erro'.
- Ler o estado ANTES: ícone ❚❚ (pausa) = LIGADA; ▶ = DESLIGADA/pausada. Só clicar se estiver ▶. Depois de clicar, esperar 8 s e conferir 'Ação' no painel (Procurando/Atacando/Usando).
- Depois de 'Ir ao líder' ou de login: o Haradur pode ficar longe do grupo (6 min em 'Procurando alvo', 0,2 mi/h). Usar Ir ao líder, esperar 15 s e conferir o ritmo em 2 min.
- A janela do navegador encolhe para 30x24 às vezes: captura preta e leitura 'PARADO' FALSA. Se a imagem vier preta, restaurar com setViewportSize(1280,800) e ler de novo antes de concluir (run.js já restaura no início, mas não no meio de um comando longo).
- Fechar a mochila (925,772) e janelas ao terminar: mochila aberta pausa a Auto-caça.

## 18. FICAR LONGE DO GRUPO = ERRO (usuária, 04/11 12:4x): 'precisa cuidar isso'
- Sintoma: Auto-caça ligada mas 'Procurando alvo', EXP parado, 0,2 mi/h (aconteceu 6 min depois de entrar no jogo).
- AUTOMÁTICO: `monitor.js` lê o EXP do painel a cada ~1 min; se não sobe por 2 ciclos seguidos com a caça ligada, usa 'Ir ao líder' sozinho (5.000 de ouro, no máximo 1 vez a cada 4 min). Na 3ª tentativa sem sucesso sai com código 23: ir ver a tela (grupo desfeito? líder em outro mapa? preso?) e procurar outro grupo (joinloop).
- MANUAL (depois de login, Core, troca de grupo, morte): esperar 20 s, fazer 'Ir ao líder' e confirmar em 2 min que o ritmo passou de 3 mi/h. Nunca deixar mais de 3 min com EXP parado.
- Códigos do monitor: 10 login, 12 sem grupo, 13 lv73, 14 poções HP<60, 17 morte, 18 cidade, 20 relatório, 21 peso excedido, 22 2 mortes em 15 min, 23 parado longe do grupo.

- [LIÇÃO 04/11 12:31] **Estado antes de clicar; ler o ritmo depois** — ERRO: liguei a Auto-caça às cegas e a desliguei; fiquei 6 min longe do grupo a 0,2 mi/h sem perceber — REGRA: ler o estado do interruptor antes; 2 min depois de login/Core/morte conferir o EXP/h; o monitor agora usa Ir ao líder se o EXP parar (seção 18)

- [LIÇÃO 04/11 12:31] **Contar por imagem erra** — ERRO: estimei ~16 pergaminhos olhando o recorte; o real eram 11 — REGRA: contar por tooltip em matriz; imagem só para conferir ouro/peso (seção 16)

- [LIÇÃO 04/11 12:31] **Comprar sem conferir os números** — ERRO: comprei Mística de Mana sem ver que o MP máximo é 236 — REGRA: antes de comprar item de recuperação, ler o máximo do personagem (janela C) e o regen do item

- [LIÇÃO 04/11 13:19] **Guardar item no baú: clique DIREITO, não arrastar** — ERRO: tentei arrastar os pergaminhos para o baú (Armazém) e nada entrou; o realce verde era só o alvo — REGRA: com o Armazém do Arent aberto (Mapa Guia > Warehouse keeper Arent > Ir até), clique direito no item da mochila move 1 para o baú; conferir pelo peso do baú (n/2392 sobe 2 por pergaminho). Pergaminho vinculado pode ir ao baú.

- [LIÇÃO 04/11 13:25] **Tooltip às vezes devolve item antigo** — ERRO: contei 5 Cores, 5 ícones e 1 casa, mas a matriz célula a célula mostrou 8 Cores (4 por página); o tip.js pega o primeiro tooltip do DOM e pode vir de outra janela (baú/Leilão) ou de uma leitura anterior — REGRA: contar SEMPRE pela matriz (uma linha por fileira, símbolo por célula) com baú/Leilão FECHADOS; não confiar em contagem agregada; se número parecer estranho, refazer a matriz

- [LIÇÃO 04/11 13:25] **Ida à cidade: roteiro que funcionou (04/11 13:1x)** — ERRO: peso 77% (1543/2004) exigiu ir vender; esqueci de fechar baú/Social antes de procurar grupo e o layout deslocou 48px (hud-layer scrollLeft) — REGRA: ordem: Core > Gus (vender até 0 itens) > Arent (baú: clique direito) > Leilão (Coletar tudo) > fechar TODAS as janelas (mouse down/up com pausa) > hud-layer scrollLeft=0 > joinloop > Ir ao líder > ler estado da Auto-caça > PK > monitor. Pergaminhos 11 -> 5 (6 no baú), Cores 8, ouro 910.406

- [LIÇÃO 04/11 13:39] **Loot com Olho Magico + Fenix enche a bolsa em ~30 min** — ERRO: esperava 1 h entre idas a cidade; em 11 min entraram 15 equipamentos (+374 de peso, 1221 -> 1595/2004, 80%) — REGRA: o monitor deve avisar peso >75% (nova saida 24) e a ida vender passa a ser a cada ~30-40 min; manter 5 Cores (tem 8) e ir a cidade com o ciclo: Core > Gus > Leilao coletar > joinloop. Medir ouro liquido por hora com a venda do loot (hoje +99.760 em 15 itens)

## 13b. PESO >= 75% = IR VENDER (monitor sai com código 24; só lê quando a mochila está aberta no ciclo de organizar)
- Com Olho Mágico + Fênix a bolsa enche em ~30 min (15 equipamentos em 11 min). Roteiro: Core > Gus (sell2.js) > Leilão Coletar tudo > Arent só se pergaminhos > 5 > fechar janelas > hud-layer scrollLeft=0 > joinloop > Ir ao líder > estado da Auto-caça > PK > monitor.
- Meta: sair da cidade com peso < 1250/2004.

- [LIÇÃO 04/11 13:52] **Script em loop apagou a lista de coleta inteira** — ERRO: removi grupos de equipamento da Coleta da Auto-caça com um laço que achava o nome na lista de BUSCA (embaixo) e clicava no x da lista real: a lista caiu de 20 para 1 item (Cores, poções, cristais, sheltoms, Force Orbs, quest saíram) — REGRA: mexer em configuração da Auto-caça: 1) anotar o estado ANTES (lista completa por texto), 2) agir 1 item por vez, 3) conferir o contador 'Lista de itens (N)' e o nome do item removido a cada clique, 4) parar no primeiro resultado inesperado, 5) nunca em laço cego. Lista original (20): Todas as poções, Poções de vida/mana/estamina, Sheltoms, Force Orbs, Cristais de invocação, Itens de quest, Itens de evento, Abóbora, Minérios e runas, Pedras de aging e mix, Pedras de mature de skill, Cores, Receitas, Armas, Armaduras e robes, Escudos, Botas, Luvas, Braceletes e orbs, Amuletos, Anéis

## 19. COLETA DA AUTO-CAÇA: NÃO PEGAR EQUIPAMENTO (ordem da usuária, 04/11 13:5x: 'não adianta ficar vendendo loot e perder XP')
- Conta: cada ida à cidade = ~9 min fora do grupo = ~1,2% de nível perdido (7,9%/h), e rende ~86 mil de ouro; com drop extra (Olho Mágico + Fênix) a bolsa enchia a cada ~25 min (2,4 idas/h = -36% do tempo, nível/h 7,9% -> 5,1%).
- Solução: a Auto-caça NÃO coleta mais Armas, Armaduras e robes, Escudos, Botas, Luvas, Braceletes e orbs, Amuletos, Anéis nem Receitas. Lista de coleta = 9 grupos: Todas as poções, Sheltoms, Force Orbs, Cristais de invocação, Minérios e runas, Pedras de aging e mix, Pedras de mature de skill, Cores, Itens de evento (+ Itens de quest sempre).
- Onde: painel da Auto-caça (tecla O) > aba Coleta > 'Lista de itens (N)'. Modo 'Só os itens da lista'. Remover = × ao lado do item DA LISTA REAL (abaixo de 'Mostrando 80 de 2651'); adicionar = digitar o nome em 'Buscar item ou grupo' e ADICIONAR.
- Peso agora deve subir só com poções/cristais/sheltoms: a ida à cidade fica rara (poções, mana, Cores, cristais). Monitor: peso 75% (exit 24) continua, mas deve disparar muito menos. Medir o peso/h no relatório.
- Ouro: cai (loot de equipamento ~86 mil por 25 min = ~200 mil/h) mas o XP/h sobe. Para ouro, cristais a 20k no Leilão.
- NUNCA mexer na lista com laço cego (ver lição de 04/11 13:5x): 1 item por vez e conferir o contador.

- [LIÇÃO 04/11 14:58] **Ranking existe** — ERRO: Não sabia onde ver o top 1 — REGRA: Mais > Ranking (clicar texto Ranking). Em 04/11 14:5x: top1 TheBoy lv86 39%; Haradur #3211 lv70

- [LIÇÃO 04/11 18:42] **Nível 71 (18:36 BRT)** — ERRO: Custo do nível 71 medido na tela de personagem (C): EXP 715.534.830 -> próximo 796.078.348 (~80,8 mi no total) — REGRA: Pontos de status: tecla C, clicar seta ▲ da Força (814,640) por ponto. Grupo DeadPooLMG se desfez -> joinloop lo70 hi76 -> WeeD + Ir ao líder. Custo nv70 estimado ~65 mi

- [LIÇÃO 04/11 18:46] **Sempre informar tempo para o próximo nível** — ERRO: A usuária pediu: em todo relatório dizer quanto tempo falta para o próximo lv — REGRA: Fórmula: (100% - % atual) x custo do nível (nv71 ≈ 80,8 mi; ver tela C: EXP e Próximo nível) / mi/h do ritmo. Informar em TODO relatório, junto com XP/h

- [LIÇÃO 04/11 18:59] **Entrar em grupo: confirmar pelo quadro de grupo** — ERRO: Cliquei ENTRAR via joinloop/chat e li 'entrou no grupo' de uma linha antiga do chat; fiquei solo ~3 min e gastei 5.000 de Ir ao líder sem grupo — REGRA: Depois de entrar, confirmar na janela D > Grupo (n de 6 no grupo) ou pelo quadro de membros à esquerda; não confiar em texto do chat. 'Muitos pedidos seguidos': esperar ~10 s e clicar ENTRAR direto

- [LIÇÃO 04/11 19:28] **NUNCA sair de um grupo ao lado de outro grupo com PK ligado** — ERRO: Saí do grupo do WeeD (3,2 mi/h) e fiquei solo no mesmo ponto: com PK ligado, os membros do WeeD (Katchan) me mataram 5x seguidas (5 pergaminhos) e a flag 'Em combate PK' bloqueou entrar em grupo e usar Core. Também o Ir ao líder do Kellis não teletransportou — REGRA: Antes de sair de um grupo: ver se há outros jogadores em PK perto; trocar de grupo SEM ficar solo (entrar no novo e só então sair do antigo não é possível) -> preferir Core ANTES de sair (cidade não tem PK), depois entrar no novo grupo e Ir ao líder. Se ficar solo em PK: não gastar tempo, usar Core assim que o aviso sumir; contar pergaminhos depois. Confirmar entrada pela janela D>Grupo (n de 6), não pelo chat

- [LIÇÃO 04/11 19:33] **Contar URGENTE na hora** — ERRO: A usuária pediu: sempre contar problemas urgentes imediatamente, sem esperar o alarme — REGRA: Morte em PK, grupo desfeito, sem pergaminho/Core, peso/queda do container, XP parado: mandar mensagem + SendUserFile NA HORA, depois resolver

- [LIÇÃO 04/11 19:41] **O que o PK ensinou (04/11 19:xx)** — ERRO: PK ligado + sem grupo perto de outro grupo = alvo: Katchan do WeeD matou 6x; a flag Em combate PK bloqueia entrar em grupo, Ir ao líder, Core e desligar PK; Auto-caça ligada renova o combate; morte sem pergaminho = perde EXP do nível e ouro; monitor religando a Auto-caça atrapalha — REGRA: 1) Nunca ficar solo com PK ligado; 2) trocar de grupo: Core primeiro (cidade não tem PK) ou PK off ANTES (só vale 5 min) 3) se preso: Auto-caça off + monitor parado, esperar o aviso sumir, Core 4) morreu sem pergaminho -> botão Town 5) contar pergaminhos após qualquer morte e repor do baú 6) avaliar se o +10% de XP do PK compensa o risco

- [LIÇÃO 04/11 19:41] **Regra das 2 mortes: NÃO cumpri** — ERRO: A usuária mandou: 2 mortes em <15 min -> cidade analisar, sempre. Hoje tive 6 mortes seguidas e fiquei tentando entrar em grupo/Core em vez de ir à cidade e contar Cores/pergaminhos — REGRA: Na 2ª morte (ou 1ª sem pergaminho): parar TUDO, botão Town / Core, contar Cores e pergaminhos por tooltip, repor do baú, consertar no Gus, só então grupo. Monitor deve contar mortes pela linha 'PVP> ... matou Haradur' e 'Pergaminho de Renascimento usado' (hoje não pegou: monitor parado/ sem exit 22)

- [LIÇÃO 04/11 19:48] **Vendas no Leilão (04/11)** — ERRO: Usuária perguntou se cristais venderam — REGRA: Meus anúncios > chip Vendidos mostra data/valor. 04/11: Rei Hopi 15:53 e 15:56 (DNjiXz000), Figon 11:38 (Shakira), todos a 20k (recebe 19k). 18 à venda, nada a coletar às 19:5x

- [LIÇÃO 04/11 20:12] **Detectar bolsa aberta pela imagem** — ERRO: posbag/countbag usavam o texto '\d+/\d{4}' para saber se a bolsa estava aberta; o texto não aparece no DOM e o script FECHAVA a bolsa aberta e lia casas vazias (contou 0 pergaminhos e 1) — REGRA: Usar tbag.js (diferença de pixels do ícone da bolsa: >110 = fechada) como o town.js; nunca clicar o ícone da bolsa sem saber o estado

- [LIÇÃO 04/11 20:14] **Onde ficam os pergaminhos na mochila** — ERRO: A varredura por tooltip dizia 0/1 pergaminhos por causa da grade errada (passo 22 px não bate com as casas da página 2, os pergaminhos estão em x=394) — REGRA: Página 2 da bolsa (◀▶ 276/298,780): 4 pergaminhos em x=394,y=648/670/692/714 e 1 em (372-394,758). Conferir com tip.js nessas posições; para contar de verdade usar a imagem recortada x240 y630 300x170 junto com o tooltip

- [LIÇÃO 04/11 20:39] **Queda do container 20:30 e retomada** — ERRO: Container reiniciou (queda 6); revive.sh entrou no jogo mas caiu em Navisko (Poseidon), sem grupo, filtro de mapa do Procurar Grupo desregulado (joinloop 'nao achei') — REGRA: Após queda: revive.sh -> se sem grupo: abrir D>Grupo>Procurar, selects: mapa = 'Todos os mapas' (selectedIndex 0), texto 'Templo Maldito 1'; ENTRAR em grupo do MESMO servidor (sem Trocar para); confirmar 'n de 6 no grupo', Ir ao líder, Auto-caça (ler estado), PK ligar (login zera PK), monitor e keepalive em run_in_background

- [LIÇÃO 04/11 23:02] **Troca de grupo desnecessária e cliques às cegas (23:0x)** — ERRO: Fui à cidade por Core achando que o grupo caiu (2 online + 1 offline, 4,7 mi/h = acima da meta) e, na cidade, a sequência de cliques no D>Grupo caiu em Ir ao líder: paguei 5.000 e voltei ao mesmo grupo; gastei 1 Core e ~10 min — REGRA: Antes de trocar: ver o XP/h (>=4 não troca) e o n de membros ONLINE; não repetir sequência de cliques com o Social possivelmente já aberto (tecla d alterna): ler a tela antes. Trocar de verdade só se XP/h<4 em 2 ciclos ou grupo <=2 online

- [LIÇÃO 04/11 23:27] **Ler a janela de grupo ANTES de decidir trocar (23:2x)** — ERRO: Achei que o grupo tinha 2 online por causa do painel lateral (Khalifa sumiu da lista lateral) e do 'offline' do letthodeguillet; na janela D>Grupo eram 4 online, e 5 depois. Gastei 2 Cores e 10.000 de ouro nas duas idas à cidade — REGRA: Para saber quem está online: D>Grupo (Nv e bolinha verde). O painel lateral esconde membros longe. XP/h<4: confirmar 2 ciclos limpos antes de trocar; e comparar com a média da sessão da Auto-caça (mi/h do painel)

- [LIÇÃO 05/11 00:45] **Lista do Procurar Grupo muda de ordem** — ERRO: Cliquei na linha 2 achando que era Tormenta, mas a lista reordenou (Mais recentes) e entrei no F3 de novo; perdi 1 Core, 10k de ouro e 10 min — REGRA: Antes de clicar ENTRAR, ler a posição do botão pelo NOME do grupo (script que acha o card com o nome e clica no ENTRAR dele), nunca por coordenada fixa; conferir depois pelo nome do líder

- [LIÇÃO 05/11 01:11] **Namy não achada no Mapa Guia de Ricarten (3 tentativas)** — ERRO: town.js não encontrou a Namy; cidade era Ricarten — REGRA: Se Namy falhar: comprar poções só na próxima ida (HP 207 dura ~1 h); fechar Mapa Guia (806,257) e Mapa do Mundo (1092,101) antes de qualquer outro clique

- [LIÇÃO 05/11 01:16] **joinname.js v2 (DOM) e lista de grupos que reordena** — ERRO: Listas reordenaram entre ler e clicar: caí em Selene sem querer; joinname v1 não achava botões (não são folhas) — REGRA: Usar joinname.js v2: acha a folha com o NOME do grupo, sobe até o card com o botão ENTRAR/Trocar e clica no mesmo instante; confirmar pelo nome do líder em D>Grupo; Zeus rendeu 1,7-3,1 mi/h em 4 grupos (BlackMage, F3, Vithia): preferir Poseidon/Hermes/Ares

- [LIÇÃO 05/11 02:00] **Ficar >5 min na cidade tira do grupo; janela do Guardião dos Canais abre ao clicar no chão** — ERRO: Na ida à cidade (comprar poções/mana) fiquei ~10 min e o jogo me tirou do grupo; cliques em (900,450) abrem NPCs (Guardião dos Canais/Mix) em Ricarten — REGRA: Ida à cidade: planejar < 5 min OU aceitar re-entrada (joinname pelo nome) + Ir ao líder; não clicar no chão em cidade; Leilão: Comprar > filtro > COMPRAR > PAGAR EM OURO > COMPRAR (722,468) > Yes; item vai ao Distribuidor (Mais > Distribuidor) > Receber todos; Média de Mana x102 = 19.777 ouro (194/un)

- [LIÇÃO 05/11 04:04] **Queda de conexão do jogo + verificação Cloudflare no login (04/11 ~04:00)** — ERRO: Jogo ficou em 'Reconectando...' >6 min; reload mostrou login com 'Confirme que é humano' (Cloudflare Turnstile) e revive.sh ficou em loop 'tela de login → entrando' por 3 min (exit 124) — REGRA: NÃO tentar burlar a verificação anti-robô. Avisar a usuária NA HORA e esperar ela logar/liberar. revive.sh deve detectar o desafio e parar (não ficar em loop). Antes de recarregar a página, esperar >=5 min de Reconectando (não tinha desafio no 1º login); recarregar pode disparar o desafio

- [LIÇÃO 05/11 11:31] **Login voltou sem Cloudflare após reiniciar o Chrome e esperar** — ERRO: A verificação 'Confirme que é humano' sumiu depois de fechar/abrir o navegador, ~7 h depois do disparo; o login comum funcionou (senha + ENTRAR) — REGRA: Se o desafio aparecer: parar, avisar, NÃO burlar; tentar de novo mais tarde com Chrome reiniciado. Login normal: revive.sh; se parar em 'sem grupo' (Sair), usar joinname.js + Ir ao líder + liga Auto-caça (ler ❚❚/▶) + PK + monitor + keepalive

- [LIÇÃO 05/11 11:49] **joinname.js clica no chão (900,450) e abriu o Guardião dos Canais (teleporte pago)** — ERRO: Mesmo ainda no grupo, joinname rodou, clicou em (900,450) para 'focar' e abriu a janela do teleporte em Ricarten; só fechei no X (865,133), não teleportei — REGRA: joinname.js: só clicar no chão se Social não estiver aberto E fora de cidade; em cidade nunca clicar no chão. Antes de usar joinname, checar se ainda está no grupo (D>Grupo 'n de 6'): se estiver, só Ir ao líder

- [LIÇÃO 05/11 12:10] **Horário em Brasília errado desde o login de hoje** — ERRO: Escrevi 08:30/09:10 quando eram 11:30/12:10: rate.py já mostra BRT e eu subtraí 3 h de novo; keepalive/alarmes citados com horário errado — REGRA: Brasília = UTC-3: ler 'date -u' e subtrair 3 UMA vez (ou usar o relógio do rate.py que já é BRT). Conferir a hora antes de escrever qualquer horário ao usuário

- [LIÇÃO 05/11 13:05] **Sem Core para Ricarten = preso em Navisko (Namy fica em Ricarten)** — ERRO: Usei os 'Core para Ricarten' nas idas e comprei só Core para Navisko; ao chegar a Navisko não havia como ir à Namy: Teleport Core só lista campos/masmorras, Navisko não tem loja de poções (só Bellatra, ferreiro, armazém). Perdi ~13 min fora, sem perder o grupo — REGRA: Na cidade de destino sempre comprar 4+ 'Core para Ricarten' na Namy (town.js cores:4). Se faltar: Leilão (Mais>Leilão>Comprar, 'Core para Ricarten', ~10 mil ouro, pagar em ouro, receber no Distribuidor). Conferir Cores de AMBOS os destinos no estoque, não só o total

- [LIÇÃO 05/11 14:19] **Pergaminhos: contar ITENS, não casas/posições** — ERRO: Disse '5 pergaminhos' desde as 20:00 (e de novo hoje) mas a página 2 tem 8 casas = 4 pergaminhos (2 casas cada, fileiras de 2). Contei posições de tooltip em x=394, não itens — REGRA: Contar pergaminhos/Cores = casas ocupadas ÷ 2 (cada um ocupa 2 casas lado a lado). Conferir com screenshot recortado x240 y630 300x170: 1 pergaminho = 1 ícone largo. Mínimo 5: repor (baú Arent, ou Tempo 10/un na F9 com filtro Rebirth)

- [LIÇÃO 05/11 14:48] **REGRA NOVA: pontos de status só com resposta da usuária** — ERRO: Eu gastava os pontos de status em Força sem perguntar (nv 71: +5, e +5 da missão Amizade de Michelle) — REGRA: Ao subir de nível ou ganhar pontos: PERGUNTAR onde colocar (Força/Inteligência/Talento/Agilidade/Vitalidade; tecla C) e NÃO gastar enquanto ela não disser 'ok' com a escolha. Vale também para ponto de habilidade. Pontos ficam guardados

- [LIÇÃO 05/11 14:49] **Commit da skill: sempre, sem esperar** — ERRO: A usuária autorizou: ao alterar a skill zephira-autohunt, fazer commit e push na hora — REGRA: Branch claude/zephira-autohunt-skill; antes de commitar, grep por senha/e-mail/código (nada deve ir); sem PR e sem mexer na master salvo pedido; mensagem de commit com as linhas de atribuição

- [LIÇÃO 05/11 16:05] **town.js falhou: disse 'cheguei em Ricarten' mas o personagem seguia no Templo Maldito** — ERRO: O town.js relatou chegada em Ricarten sem confirmar o local; o Haradur ficou parado no campo com Auto-caça pausada e PK ligado por ~3 min, e matei o monitor antes. — REGRA: Após Core, conferir o mapa (minimapa/nome da área) antes de agir; se não saiu do campo, religar Auto-caça na hora e relançar o monitor; nunca deixar o personagem parado no campo com PK.

- [LIÇÃO 05/11 16:42] **joinname entrou no grupo errado (NinaSacer/Zephira) ao buscar Rihanna26** — ERRO: joinname subia ate um container que continha varios cards e clicou o botao de outro card; entrei em grupo pior (avg 71) e tive que sair e reentrar (+3 min na cidade). — REGRA: Usar joincard.js (menor container com o nome E 1 so botao; imprime o card clicado) e conferir lider/servidor depois (D>Grupo + barra de titulo 'Servidor').

- [LIÇÃO 05/11 17:12] **Keepalive 'sleep 7100' morreu em 30 min; town.js deixou personagem parado e morri sem checar** — ERRO: Sem timeout explicito, run_in_background mata a tarefa em 30 min (keepalive caiu 16:36->17:06). Tambem: pausei Auto-caca no campo e town.js levou ~60s para o Core, tempo em que morri (perdi ~3% EXP e 4 pergaminhos); o monitor estava parado. — REGRA: Keepalive: usar timeout 7200000. Antes de ir a cidade: NAO pausar Auto-caca no campo; usar o Core primeiro (clique direito) e so pausar ao chegar; manter monitor ate sair do campo; apos cada ida contar pergaminhos (baú tinha so 1: reserva acabou).

- [LIÇÃO 05/11 17:14] **Morte no campo na ida à cidade (05/11 ~16:55): -3% EXP, -4 pergaminhos** — ERRO: Pausei a Auto-caça no campo com PK ligado e rodei town.js, que levou ~60 s até o Core; fiquei parado perto de mobs nv79/jogadores, morri (1+ vezes) sem monitor (parado para a troca). Só vi pelo XP caído e pergaminhos sumidos. town.js também disse 'cheguei em Ricarten' sem conferir o mapa. Baú só tinha 1 pergaminho (reserva acabou). Keepalive sleep sem timeout morreu em 30 min. — REGRA: REGRAS: 1) Core PRIMEIRO (clique direito) e só pausar Auto-caça/parar monitor DEPOIS de chegar na cidade (conferir nome no minimapa). 2) Nunca deixar o personagem parado no campo com PK ligado, nem 1 min. 3) Após qualquer ida/troca contar pergaminhos (mochila+baú) e XP% antes/depois; XP% caindo = morte. 4) Manter 5 na mochila e conferir a reserva do baú (hoje 0): comprar na F9 Tempo 'Rebirth' (10 Tempo cada, receber no Distribuidor). 5) Keepalive: run_in_background com timeout 7200000. 6) joincard.js em vez de joinname.js.

- [LIÇÃO 05/11 18:21] **Monitor saiu 12 (saiu do grupo) mas continuava em grupo 6/6** — ERRO: O líder do grupo mudou (AutoMechduBiiLL saiu, Birica virou líder, Yangghen entrou) e o painel de grupo falhou numa leitura; exit 12 foi falso alarme. — REGRA: Exit 12: conferir D>Grupo ('n de 6') antes de agir; se 6/6, só relançar o monitor; líder pode mudar e o grupo segue.

- [LIÇÃO 05/11 19:25] **Relatórios devem trazer a HORA estimada de subir de nível** — ERRO: A usuária pediu a hora aproximada (relógio de Brasília) em que o Haradur sobe de nível, além do tempo restante. — REGRA: Todo relatório: tempo p/ próximo nível E a hora do relógio (agora + tempo; somar ~10 min por ida à cidade), em BRT.

- [LIÇÃO 05/11 19:28] **Coleta da Auto-caça: anéis e amuletos ligados (pedido da usuária 05/11 19:3x)** — ERRO: Usuária quis pegar só anéis e colares para vender. Anéis já estavam na lista (por isso as vendas de Anel Encantado); adicionei 'Amuletos' (lista 14 -> 15). Auto-caça apareceu 'Parado pelo jogador' durante a edição do painel; religuei em segundos pelo botão INICIAR. — REGRA: Coleta atual (15): poções, Sheltoms, Force Orbs, Cristais, Minérios, Pedras aging/mix, Pedras mature, Cores, Itens de evento, Receitas, Anéis, Amuletos (+quest). NÃO coletar armas/armaduras/escudos/botas/luvas/braceletes. Ao mexer no painel (tecla O), conferir 'Atacando/Parar' depois e fechar com o X (783,131); o regex de texto pega o log antigo: confirmar pela imagem.

- [LIÇÃO 05/11 20:10] **Cristais: 18 anúncios expirados a 20k estavam ocupando os 20 espaços do Leilão (05/11 20:1x)** — ERRO: Anúncios de 24 h a 20.000 expiram sem vender (média de mercado do Cristal de Decapitador = 10.527 em 30 dias; vendi 11 ao todo); expirados contam nos 20 espaços até coletar, então a bolsa não conseguia anunciar novos cristais. Reanunciei 12 expirados (agora 15 À venda). Sobraram 5 expirados que NÃO são cristais (Mestre de Habilidades 15k). — REGRA: REGRA (usuária: 'sempre suba os cristais'): a cada relatório/ida, abrir Mais>Leilão>Meus anúncios, ver 'Expirados (n)' e rodar relist.js (REANUNCIAR a 20.000, 24 h); depois Vender > anunciar cristais novos da bolsa (leilao_cristal.js). Pode ser feito no campo (janela do Leilão), sem ir à cidade; fechar a janela com o X e conferir que a Auto-caça segue Atacando. Se não vender em 2-3 dias, avisar a usuária (preço 20k = 2x a média).

- [LIÇÃO 05/11 22:07] **Fiquei SEM GRUPO no campo com PK ligado (22:0x) após reinício do container** — ERRO: Depois do revive o jogo disse 'já está em grupo', mas ~15 min depois o painel D>Grupo mostrava 'Você não está em um grupo' (Auto-caça procurando alvo sozinha, PK ligado). O monitor deu exit 12 (real, não falso). Usei o Core na hora; sem morte. — REGRA: Após revive/reinício: conferir D>Grupo ('n de 6') e o líder, não confiar no texto do revive. Exit 12: SEMPRE conferir D>Grupo; se SEM GRUPO: Core imediatamente (sem pausar), só depois entrar em grupo.

- [LIÇÃO 06/11 00:13] **Colar/anel: guardar só o que o Haradur consegue equipar; o resto vende (pedido 06/11)** — ERRO: A usuária pediu colar e anel para equipar; nenhum dos que tenho serve (Int exigida 44-62 vs Haradur 31; classes Atalanta/Sacerdotisa/Mágico). Ela respondeu: avisar se cair um que sirva; o que não serve pode vender. — REGRA: sellall.js agora GUARDA anel/colar/amuleto com requisitos <= nv71/For241/Int31/Tal90/Agi70/Vit27 e classe Fighter ou sem classe; o resto vende na Namy. Quando aparecer 'GUARDAR (serve no Haradur)' no log da ida à cidade: AVISAR a usuária e comparar com o equipado antes de equipar.

- [LIÇÃO 06/11 01:23] **LEVEL UP: Haradur chegou ao lv 72 em 06/11 ~01:22 BRT** — ERRO: lv 71 -> 72 por volta de 01:22 (previsto 01:20). Tela C: EXP 796.146.732, Próximo nível 886.035.202 => custo do lv 72 = 886,04 - 796,08 = ~89,96 mi (lv 71 custou ~80,8 mi). Pontos de status: 5 (Estatística 5) + 1 ponto de habilidade guardado; NADA gasto, aguardando a usuária. Grupo Hermes/Tijolonolula 6/6 a ~4,2 mi/h. — REGRA: Tempo p/ lv 73 = (100% - %) x 90 mi / mi/h (~21 h a 4,2 mi/h). Atualizar relatórios e SKILL (custo nv72 ~90 mi). Perguntar onde colocar 5 pontos de status e 1 de habilidade; sem resposta, não gastar.

- [LIÇÃO 06/11 03:44] **Troca de grupo 03:29-03:50: Core para Navisko levou a Ricarten; repair.js demorou ~5 min (travou a sessão)** — ERRO: Ritmo caiu a 2,9-3,2 mi/h por 2 ciclos: fui à cidade (Core, town.js: vendi 4 colares+2 anéis, +250 poções, +4 Cores), repair.js (varre o mapa; ~5 min) e voltei ao grupo OrionGamesATS (Hermes, 6/6) em vez de Guedes (que sumiu da lista). Perdi uns 15 min de caça; o XP% não caiu (sem morte). Core: tooltips da bolsa (tip.js) trazem item velho; conferir por IMAGEM (hover+screenshot). — REGRA: Ida à cidade ~15 min: Core (conferir por imagem o nome do Core), town.js, repair.js só se integridade baixa (demora), sair do grupo na cidade, joincard.js, Ir ao líder, Auto-caça, PK, monitor.

- [LIÇÃO 06/11 04:11] **Tentei trocar do grupo OrionGamesATS para Kinadocasovqt (04:10) e voltei ao mesmo grupo** — ERRO: Core (Navisko->Ricarten) OK e sair do grupo OK ('SEM GRUPO'), mas joincard.js('Kinadocasovqt') terminou sem confirmar e acabei de volta no grupo OrionGamesATS com 'Você foi até OrionGamesATS (5.000)'. Gastei ~10 min e 5.000 de ouro para ficar onde estava; grupo rende 2,7-3 mi/h (Hunki nv60 e Estígio nv79 alternados). — REGRA: joincard.js deve SEMPRE imprimir o resultado e eu conferir D>Grupo (líder e n/6) ANTES de Ir ao líder; se o card não existe, escolher outro da lista imediatamente (não deixar rodar sozinho). Ver se o monitor (exit 12/ir ao líder) religou em outro grupo.

- [LIÇÃO 06/11 04:28] **Monitor ligado me puxou de volta ('Ir ao líder' 5.000 x2) durante a troca de grupo (04:24-04:40)** — ERRO: Usei o Core mas deixei o monitor rodando: ele detectou longe do grupo e deu 'Ir ao líder' sozinho, me devolvendo ao campo no grupo velho (2 vezes = 10.000 de ouro e ~15 min). Só funcionou depois de pkill monitor ANTES do Core e conferir D>Grupo entre cada passo. — REGRA: Troca de grupo: 1) pkill -f 'node monitor.js' ANTES do Core (a Auto-caça continua atacando no campo durante os ~12 s do Core); 2) Core (confirmar nome por imagem, as posições dos Cores mudam; achar por hover varrendo a bolsa); 3) cidade: sair do grupo; 4) joincard.js + conferir D>Grupo (líder e n/6); 5) Ir ao líder; 6) Auto-caça; PK; relançar monitor.

- [LIÇÃO 06/11 05:28] **town.js travou na loja da Namy (timeout 330 s) e passei >5 min na cidade (05:20-05:30)** — ERRO: town.js ficou preso na venda (loja aberta, sellall) e foi encerrado por timeout; as poções já tinham sido compradas (439), os Cores não conferi; saí do grupo por ficar >5 min e tive que reentrar. XP não caiu. Poções subiram só de 239 para 439. — REGRA: Se town.js passar de ~4 min: conferir a tela e fechar a loja manualmente; conferir 'comprei' no log. Contar Cores (Core para Ricarten e Navisko) por hover antes de voltar; comprar 4 Cores na Namy (282,380 + 722,542) se ficarem <5.

- [LIÇÃO 06/11 06:22] **Quest Lago da Ganância solo** — ERRO: Viajei pelo IR da quest (cutscene) ainda no grupo do TM1, cheguei sozinho no Lago com mobs nv79 e PK on; sai do grupo e morri 4x, perdi EXP — REGRA: Antes da quest: entrar em grupo do Lago (Leronay etc) NA CIDADE e Ir ao líder; nunca viajar solo; ter >=5 pergaminhos; filtro de grupo digitar no campo (nao no chat)

- [LIÇÃO 06/11 09:38] **Auto-caça pausada após busca de grupo** — ERRO: Abrir/fechar Procurar Grupo (clique na tela/teclas) deixou a Auto-caça em pausa e o monitor não a religa — REGRA: Após cada busca de grupo, conferir o botão (❚❚=on) e religar; o hover do HUD pode enganar

- [LIÇÃO 06/11 10:07] **Regra: voltar ao melhor mapa após quest** — ERRO: Usuária: sempre que acabar uma quest em outro mapa, voltar para o mapa de melhor up (e pode usar todos os servidores para achar grupo) — REGRA: Após entregar quest fora do mapa de up: Core, grupo com melhor XP/h (todos os servers permitidos), Ir ao líder, caça+PK, monitor

- [LIÇÃO 06/11 10:08] **PERDA DE XP INACEITÁVEL (regra da usuária)** — ERRO: Perdi ~3% EXP (16,6->13,58) no Lago: botão IR da quest teletransportou sozinho para mapa nv79 fora do grupo; 4 mortes, última sem pergaminho — REGRA: NUNCA clicar IR/Viajar de quest sem grupo do destino já formado; manter >=5 pergaminhos SEMPRE ANTES de qualquer saída do mapa padrão; morte sem pergaminho = parar e voltar à cidade na hora; qualquer plano com risco de morte exige grupo + pergaminhos conferidos por hover

- [LIÇÃO 06/11 10:53] **Regra: pergaminhos <=2 = ida urgente à cidade** — ERRO: Usuária: se morrer e restarem 2 pergaminhos (ou menos), voltar à cidade URGENTE para repor até 5 — REGRA: Toda morte: contar pergaminhos na hora (hover, página 2); <=2 => Core imediato, repor (Tempo: F9>Rebirth, 10 Tempo cada, recebe no Distribuidor) até 5; monitor exit 17 = conferir pergaminhos primeiro

- [LIÇÃO 06/11 11:27] **Digitei texto sem a janela de busca aberta** — ERRO: O atalho D não abriu o Social (janela da Ajuda aberta antes); letras de 'Terra Proibida' viraram atalhos (painel Auto-caça, habilidades) — REGRA: Antes de digitar, CONFIRMAR por screenshot/DOM que o input de busca está visível (usar locator input visible), nunca clicar+digitar às cegas; fechar janelas de Ajuda (X 970,125) e conferir

- [LIÇÃO 06/11 11:30] **Texto digitado na caixa de chat** — ERRO: locator('input visible').first() pegou o input do chat (fundo da tela), não o da busca de grupo; 'Terra'/'Santu' ficaram no chat (nada enviado) — REGRA: Usar o input do painel Procurar Grupo (placeholder Buscar líder), nunca o primeiro input visível; limpar o chat após

- [LIÇÃO 06/11 11:55] **Templo Maldito 2 exige nível 75** — ERRO: Tentei Ir ao líder para um grupo de TM2 (Fagundes, Zephira) e o jogo recusou: requer nível 75; o Haradur é 72. Troquei de servidor (Hermes->Zephira) à toa — REGRA: Antes de trocar de servidor/grupo, checar nível mínimo do mapa. TM2 = nível 75+; Haradur 72 só TM1 (até ~73-74 de média). Listas 'perto do meu nível' NÃO garantem acesso

- [LIÇÃO 06/11 12:17] **Templo Maldito 2 exige nível 75** — ERRO: Tentei Ir ao líder para grupo de TM2 (Fagundes, Zephira) e o jogo recusou: requer nível 75; Haradur é 72. Troquei de servidor Hermes->Zephira à toa e perdi ~40 min de caça — REGRA: Antes de trocar de servidor/grupo, checar nível mínimo do mapa. TM2 = nível 75+; Haradur só TM1. Listas 'perto do meu nível' NÃO garantem acesso

- [LIÇÃO 06/11 12:43] **Procurei o NPC da Torre Sem Fim 4o Andar e não achei** — ERRO: Em Ricarten, NPCs de Teleporte perto da Namy: Secretária Karina (Bellatra), Arauto dos Heróis (ranking), Mestre dos Clans (clã): nenhum leva à Torre. Gastei ~30 min parado — REGRA: Não procurar NPC às cegas: perguntar o NOME do NPC à usuária antes; ou testar entrar por grupo da Torre (Ir ao líder). Voltar a caçar em grupo ENQUANTO investiga

- [LIÇÃO 06/11 13:12] **Busca de grupo vazia por filtro antigo** — ERRO: O campo de busca de 'Procurar Grupo' guardou o texto anterior (OrionGamesATS) e a lista veio vazia no ciclo das 12:58; reportei 'sem grupos' sem checar o filtro — REGRA: Ao abrir Procurar Grupo, SEMPRE limpar o campo (fill('')) e conferir os filtros antes de concluir que não há grupos

- [LIÇÃO 06/11 15:13] **Troca de grupo: comandos às cegas confundiram** — ERRO: Primeira tentativa (15:09): pkill monitor + Core + cliques no Social sem conferir tela; terminei de volta no campo (Ir ao líder acionado, -5.000 ouro) e com a Auto-caça desligada ~1 min — REGRA: Troca de grupo: conferir POR IMAGEM cada passo (mapa Navisko, Social aberto e botão Sair, diálogo 'Deseja sair do grupo', 'Você não está em grupo') antes do próximo clique; nunca encadear cliques em um único comando

- [LIÇÃO 06/11 17:46] **Ferreiro não achado em Ricarten; aviso de integridade** — ERRO: Aviso 'Equipamento com integridade baixa': arma 30/64. repair.js procurou 'Ferreiro Goden/Gus' em Ricarten por ~3 min e não achou; 'Vigia Arent' é o Armazém (baú) — REGRA: Ao aparecer o aviso, ler a Integridade pela dica dos itens equipados (>=50% = sem urgência). Descobrir onde fica o ferreiro (outra cidade?) e anotar; não gastar >2 min varrendo mapa

- [LIÇÃO 06/11 18:13] **Portal Guardian: NPC não achado em Ricarten** — ERRO: Aviso do jogo/print da usuária (evento Portal Guardian: teleporte por nível, +10-15% EXP, 10.000 de ouro p/ Lv 70+). Varri os NPCs de Ricarten (Helper Pria, Guarda, Nina/Bellatra, Teleport BC, Guardião da Câmara dos Ecos, Salon, Arent, Karina, Danu): nenhum é o Guardião. Gastei ~14 min fora do grupo — REGRA: Ao receber aviso de evento, perguntar à usuária ONDE está o NPC antes de varrer mapa; no máximo 3 min de busca; voltar ao grupo logo

- [LIÇÃO 06/11 18:38] **Portal Guardian: segunda busca em Ricarten sem sucesso** — ERRO: Usuária disse 'Ricarten, guardião do portal'. Fui (Core), olhei Mapa Guia/busca do mapa-múndi/menu Mais (Eventos, Canais ET4, Portão do Inferno, Buffs). Nenhum 'Guardião do Portal'; 'Canais ET4' no menu não abre painel; Eventos não lista o Portal. ~12 min fora do campo (sem perder o grupo) — REGRA: Pedir à usuária um print do NPC com o minimapa/coordenada antes de nova busca; não repetir varredura

- [LIÇÃO 06/11 19:27] **Arma errada (Garra) equipada** — ERRO: Estava batendo com Garra Brutal 30/64 em vez do Machado — REGRA: Apertar W troca o set; conferir arma após login/cidade/morte

- [LIÇÃO 06/11 21:56] **Ferreiro Umph fica em Navisko (reparo)** — ERRO: Aviso de integridade baixa: escudo 6/54, luvas 19/72, botas 47/91, armadura 79/114 (machado 111/114). Ferreiro Umph em Navisko, no canto superior direito perto do spawn (Core para Navisko) — REGRA: Core para Navisko -> clicar no NPC Ferreiro Umph (1220,105) -> Loja abre -> botao martelos cruzados (527,347) repara tudo (custou 14.237) -> fechar loja (563,169) -> D>Grupo>Ir ao lider (601,233 + 718,432) -> Auto-caca -> PK -> monitor. Ida inteira ~6 min; ler integridade por hover nos slots 673,660 / 724,660 / 775,660 / 846,690 / 920,690

- [LIÇÃO 06/11 22:48] **Guardiao dos Canais abre ao clicar no chao em Ricarten (joinname.js)** — ERRO: joinname.js clicou (900,450) com o painel Procurar Grupo fechado e abriu o Guardiao dos Canais (teleporte pago 10.000 + taxa; evento XP +10%, Nv 70+, Templo Maldito 1 campo). Digitou 'Templo Maldito 1' na busca dele. Nao teleportei. — REGRA: NPC do Portal/Guardiao dos Canais = clicar no chao em Ricarten (900,450). Nao clicar chao em cidade por acidente. Corrigir joinname.js para nao clicar no mapa. Trocar de grupo so se a vaga do destino for confirmada na lista ANTES de sair do grupo atual (sai e a vaga some: Imoan 5/6 sumiu em 4 min); lista pode mostrar botao fora da tela: scrollIntoView antes de clicar

- [LIÇÃO 07/11 01:23] **Pergaminhos eram so 1 (nao 5); bolsa cheia bloqueou Distribuidor** — ERRO: Contagem por celulas enganou: cada Pergaminho de Renascimento ocupa 2 celulas e so havia 1. Distribuidor recusou receber (Espaço insuficiente) com a bolsa cheia de anéis/colares inúteis. Tecla V digitada com o chat em foco escreveu VV no chat (limpo, nada enviado) — REGRA: Contar pergaminhos por IMAGEM da bolsa (icone amarelo/branco com cruz azul, 2 celulas cada), nao por hover. Comprar: F9>Tempo>Premium, rolar a lista ate Pergaminho de Renascimento (10 Tempo), comprar, Distribuidor (839,221) selecionar o item, RECEBER. Se Espaço insuficiente: rodar sellall.js com a loja da Namy aberta (vende colares/aneis inuteis). Abrir bolsa clicando o icone 925,772 e conferir com tbag.js (<110=aberta); nunca apertar V com chat em foco

- [LIÇÃO 07/11 01:44] **Guardiao dos Canais = portal da Torre Sem Fim 4o Andar (ET4)** — ERRO: Usuaria queria entrar no ET4 (grupo Lapaliga/Apolo). Ir ao lider NAO funciona de Ricarten para o canal da Torre. O caminho e o NPC Guardiao dos Canais em Ricarten (clicar no chao em 900,450 perto da Namy): escolhe canal Nv. 70+ (70-75, XP +10%, 10.000 ouro + taxa), TELEPORTAR (804,649) + confirmar (713,503); depois D>Grupo>Ir ao lider (5.000). Grupo da Lapaliga encheu durante a troca de servidor (Ares->Apolo) — REGRA: Para ET4: estar NO GRUPO de destino (entrar pelo Procurar Grupo), abrir o Guardiao dos Canais, teleportar para o canal do nivel, Ir ao lider, Auto-caca, PK, monitor. Antes de trocar de servidor, conferir que a vaga existe; lista pode mudar em segundos. Grupo da Torre: mobs nv69-80, XP+10%, tem Core de Retorno. Vender Cores: sellcores.js (deixa 5 de cada), loja da Namy aberta

- [LIÇÃO 07/11 03:06] **Container reiniciou 02:57: revive caiu em Navisko sem grupo, PK off, auto-caca ligada sozinha** — ERRO: revive.sh entrou em Poseidon/Navisko; gvaga/gsearch ligaram a Auto-caca na cidade e o Haradur ficou em combate solo com monstros (PK off). Troca de servidor Poseidon->Zephira so funcionou depois de desligar a Auto-caca (Voce esta em combate) — REGRA: Apos revive: NAO usar gsearch (liga Auto-caca); conferir mapa; se Auto-caca on fora de grupo, desligar (996,60) e afastar-se; entrar no grupo (Trocar para X + 727,451), D>Grupo, Ir ao lider, Auto-caca, PK (login zera) e monitor
