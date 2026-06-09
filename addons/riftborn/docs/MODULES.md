# Módulos do Riftborn

Este documento organiza os módulos do Riftborn e separa o que já existe do que ainda é planejado.

Legenda de status:

- **Implementado**: funcional no addon atual.
- **Parcial**: base existe, mas faltam partes importantes.
- **Planejado**: ainda não implementado.

## Núcleo do Projeto

Status: **Implementado**.

Base técnica do addon:

- Estrutura de Behavior Pack.
- Estrutura de Resource Pack.
- Manifests ativos na versão `0.3.2`.
- Namespace `riftborn`.
- Empacotamento e teste via `shared/tools/build_addon.js`.

## Itens RPG

Status: **Implementado** (7 itens).

Primeiros itens usados para validar progressão e identidade do addon.

Item inicial:

- `riftborn:fragmento_de_fenda`: estilhaço cristalino arrancado das rachaduras entre mundos, usado para validar o fluxo de item customizado e representar um material mágico raro.
- `riftborn:emblema_de_madeira`: primeiro Emblema universal do jogador, feito de madeira marcada pela Energia de Fenda, com stack máximo 1 e receita survival inicial.
- `riftborn:livro_do_perdido`: primeiro item narrativo/tutorial, um relato antigo de alguém que também caiu neste mundo, com stack máximo 1 e sem entrega automática nesta etapa.
- `riftborn:cajado_de_madeira`: primeiro Catalisador Mágico de Grau I, feito de madeira comum e Fragmentos de Fenda, com stack máximo 1 e receita survival inicial.
- `riftborn:pergaminho_magico_pulso_de_energia_i`: primeiro Pergaminho Mágico de Grau I, que registra a técnica planejada `Pulso de Energia I`, com stack máximo 16 e receita survival inicial.
- `riftborn:lamina_de_madeira_fendida`: primeira Lâmina Mágica de Grau I, criada a partir de espada de madeira vanilla e Fragmento de Fenda, com stack máximo 1 e receita survival inicial.
- `riftborn:pergaminho_lamina_corte_instavel_i`: primeiro Pergaminho de Lâmina de Grau I, que registra a técnica planejada `Corte Instável I`, com stack máximo 16 e receita survival inicial.

Direção visual:

- Cristal quebrado com silhueta irregular.
- Paleta de roxo escuro, violeta e azul profundo.
- Núcleo interno ciano, como uma miniatura instável de fenda espacial.
- Pequenos brilhos dimensionais nas bordas.

Escopo planejado:

- Itens simples.
- Nomes consistentes.
- Integração com receitas e loot.

## Sistema de Emblemas

Status: **Parcial**.

Sistema central de progressão do jogador. O Emblema é o item físico carregado, ativado e evoluído pelo jogador. Rift e Fenda representam a Energia de Fenda e o fenômeno dimensional; Emblema representa o objeto que canaliza essa energia.

Primeiro emblema planejado:

- Nome: `Emblema de Madeira`.
- Identificador: `riftborn:emblema_de_madeira`.
- Função: primeiro emblema universal.
- Material: madeira e Fragmentos de Fenda.
- Direção: primeiro vínculo do jogador com a Fenda, sem representar classe fixa.
- Estado atual: item criado com textura, traduções, receita survival inicial, ativação por tags, Energia de Fenda básica e integração com `Pulso de Energia I` e `Corte Instável I`. Ainda sem XP, níveis, passivas ou benefícios permanentes de progressão.

Progressão planejada:

- Emblema de Madeira: início universal.
- Emblema de Cobre: melhoria universal.
- Emblemas de Ferro: início das especializações.
- Emblemas avançados: caminhos mais específicos.
- Emblemas lendários: endgame.

Regras planejadas:

- Apenas um Emblema pode estar ativo por vez.
- Ativar um Emblema substitui o anterior.
- O Emblema ativo deve persistir após a morte.
- O Emblema ativo deve persistir mesmo se o item físico for removido do inventário.
- O Emblema só deve ser desativado manualmente ou substituído por outro Emblema ativo.
- Emblemas desbloqueiam Energia de Fenda.
- Emblemas ganham XP ao matar monstros.
- Emblemas sobem de nível.
- Níveis de Emblema aumentam atributos extras ou passivas do Emblema.
- Benefícios só acumulam dentro da mesma linhagem.
- Benefícios de Emblemas diferentes não podem ser empilhados.
- O Emblema ativo define o caminho ativo, técnicas disponíveis e benefícios futuros.

Ativação atual:

- Usar o `Emblema de Madeira` alterna entre ativo e inativo por tags (`toggleWoodenEmblem`).
- No mobile, o item expõe o botão de toque neutro `Emblema`.
- O script não troca mais o item da mão principal; o estado ativo depende de tags, não do item equipado.
- A ativação adiciona `riftborn_emblema_ativo` e `riftborn_emblema_madeira`.
- A desativação remove `riftborn_emblema_ativo` e `riftborn_emblema_madeira`.
- Mensagens e actionbar informam o estado.
- O item não é consumido.
- Após morte, as tags persistem e a actionbar é restaurada no respawn.

Energia de Fenda atual:

- O sistema usa os objetivos scoreboard `rb_energy` e `rb_energy_max`.
- O `Emblema de Madeira` ativo define energia máxima 20.
- A energia atual começa em 20 quando ainda não existe para o jogador.
- Reativar o Emblema não recarrega energia já existente; apenas limita o valor entre 0 e 20.
- A regeneração inicial é de 1 ponto a cada 40 ticks.
- A energia não passa do máximo e não fica abaixo de 0.
- A actionbar exibe `Energia de Fenda: atual/max` enquanto o Emblema está ativo.
- Desativar o Emblema para a exibição da actionbar, mas não apaga a energia armazenada.
- Custos e dano já são usados por habilidades ativas iniciais, como `Pulso de Energia I` e `Corte Instável I`.

## Catalisadores

Status: **Parcial** (famílias iniciais implementadas; graus II–V e passivas ainda planejados).

Catalisadores são itens usados para executar habilidades ativas. Eles não substituem o Emblema: o Emblema mantém o vínculo, a Energia de Fenda e a progressão persistente; o Catalisador canaliza a técnica usada no momento.

Famílias iniciais:

- Cajados: catalisadores mágicos. O primeiro item implementado é `riftborn:cajado_de_madeira`.
- Lâminas Mágicas: catalisadores de lâmina.

Regras planejadas:

- Catalisadores possuem graus de I a V.
- Catalisadores podem conceder passivas especiais.
- Tipos diferentes de catalisador devem permitir builds diferentes.
- Catalisadores não devem invalidar equipamentos vanilla; devem expandir a progressão.

### Cajados

Status: iniciado.

Cajados são catalisadores mágicos. Futuramente devem usar gravetos, materiais progressivos e Fragmentos de Fenda.

Primeiro cajado:

- Nome: `Cajado de Madeira`.
- Identificador: `riftborn:cajado_de_madeira`.
- Grau: I.
- Família: Catalisador Mágico, Cajado.
- Função atual: executar `Pulso de Energia I` quando o jogador tiver Emblema de Madeira ativo, Energia de Fenda suficiente e pergaminho compatível.
- Estado atual: item, textura, tradução, receita e primeira habilidade ativa integrados.

Descrição narrativa:

- Um cajado simples, entalhado às pressas, com pequenas rachaduras violetas e ciano próximas à ponta.
- A madeira não produz magia sozinha; ela apenas dá forma à Energia de Fenda que atravessa o Riftborn.

Variações planejadas:

- Cajado Condutor: menor custo de energia.
- Cajado Instável: mais dano e mais custo.
- Cajado Rúnico: efeitos especiais.
- Cajado Vital: utilidade ou defesa.

### Lâminas Mágicas

Status: iniciado.

Lâminas Mágicas são catalisadores de lâmina criados a partir de espadas vanilla como base.

Primeira lâmina:

- Nome: `Lâmina de Madeira Fendida`.
- Identificador: `riftborn:lamina_de_madeira_fendida`.
- Grau: I.
- Família: Catalisador de Lâmina, Lâmina Mágica.
- Função atual: executar `Corte Instável I` quando o jogador tiver Emblema de Madeira ativo, Energia de Fenda suficiente e pergaminho compatível.
- Estado atual: item, textura, tradução, receita e primeira habilidade de lâmina integrados.
- Design: deve expandir a espada de madeira vanilla, não inutilizar a progressão vanilla.

Variações planejadas:

- Lâmina Condutora: menor custo.
- Lâmina Pesada: mais dano e maior cooldown.
- Lâmina Rápida: menor cooldown e menor dano.
- Lâmina Instável: mais dano e maior consumo.

## Pergaminhos

Status: **Parcial** (dois pergaminhos Grau I implementados; família completa e graus superiores planejados).

Pergaminhos definem habilidades ativas. O jogador deve precisar de um pergaminho compatível para usar a habilidade correspondente.

Famílias planejadas:

- Pergaminhos Mágicos. O primeiro item implementado é `riftborn:pergaminho_magico_pulso_de_energia_i`.
- Pergaminhos de Lâmina. O primeiro item implementado é `riftborn:pergaminho_lamina_corte_instavel_i`.

Regras planejadas:

- Cada pergaminho possui grau.
- O pergaminho precisa ser compatível com o catalisador.
- A prioridade de seleção deve ser definida futuramente.
- Sugestão inicial: procurar pergaminhos compatíveis na hotbar antes do inventário.

Primeiro pergaminho:

- Nome: `Pergaminho Mágico: Pulso de Energia I`.
- Identificador: `riftborn:pergaminho_magico_pulso_de_energia_i`.
- Grau: I.
- Família: Pergaminho Mágico.
- Técnica registrada: `Pulso de Energia I`.
- Função atual: permitir que o `Cajado de Madeira` lance `Pulso de Energia I` quando o jogador tiver Emblema de Madeira ativo e Energia de Fenda suficiente.
- Parâmetros atuais: custo 5 Energia de Fenda, cooldown 20 ticks por jogador, dano 5, alcance aproximado de 10 blocos e repulsão horizontal normalizada de aproximadamente 2 blocos.
- Estado atual: item, textura, tradução, receita e execução de habilidade criados. O pergaminho não é consumido.

Primeiro pergaminho de lâmina:

- Nome: `Pergaminho de Lâmina: Corte Instável I`.
- Identificador: `riftborn:pergaminho_lamina_corte_instavel_i`.
- Grau: I.
- Família: Pergaminho de Lâmina.
- Técnica registrada: `Corte Instável I`.
- Função atual: permitir que a `Lâmina de Madeira Fendida` lance `Corte Instável I` quando o jogador tiver Emblema de Madeira ativo e Energia de Fenda suficiente.
- Parâmetros atuais: custo 5 Energia de Fenda, cooldown 20 ticks por jogador, dano 5, alcance frontal de 3 blocos, raio lateral aproximado de 1,5 bloco e knockback leve horizontal normalizado.
- Estado atual: item, textura, tradução, receita e execução de habilidade criados. O pergaminho não é consumido.

## Graus

Status: **Planejado** (apenas Grau I funcional hoje).

Graus vão de I a V e organizam Catalisadores, Pergaminhos e habilidades.

Direção planejada:

- Grau I é inicial e custa pouca Energia de Fenda.
- Habilidades de Grau I custam em média 5 Energia de Fenda.
- Graus II a V aumentam custo, poder e efeitos.
- Emblemas fracos podem usar habilidades de grau alto, mas de forma ineficiente.

## Habilidades ativas

Status: **Parcial** (`Pulso de Energia I` e `Corte Instável I` implementadas).

Habilidades ativas são executadas por Catalisadores usando Pergaminhos compatíveis.

Primeiras habilidades:

- `Pulso de Energia I`: primeira habilidade mágica funcional.
- `Corte Instável I`: primeira habilidade de lâmina funcional.

`Pulso de Energia I` já existe no addon como habilidade simples de Grau I.

Pulso de Energia I:

- Requer `riftborn_emblema_ativo` e `riftborn_emblema_madeira`.
- Requer pelo menos 1 `riftborn:pergaminho_magico_pulso_de_energia_i` no inventário.
- É executado ao usar `riftborn:cajado_de_madeira`.
- Custa 5 Energia de Fenda mesmo se não atingir nenhum alvo.
- Tem cooldown de 20 ticks por jogador.
- Dispara um projétil mágico scriptado à frente dos olhos do jogador, alinhado com a direção da mira.
- O projétil viaja pelo mundo, usa partículas vanilla não textuais e expira ao atingir entidade, bloco, alcance ou tempo limite.
- Atinge entidades vivas no caminho do projétil.
- Causa 5 de dano.
- Aplica repulsão horizontal normalizada para evitar força extra em diagonais.
- Não atinge o próprio jogador.
- Não cria entidade customizada de projétil por JSON nesta etapa.
- O carregamento completo estilo arco ainda é melhoria futura; o disparo atual é imediato.

Corte Instável I:

- Requer `riftborn_emblema_ativo` e `riftborn_emblema_madeira`.
- Requer pelo menos 1 `riftborn:pergaminho_lamina_corte_instavel_i` no inventário.
- É executado ao usar `riftborn:lamina_de_madeira_fendida`.
- Custa 5 Energia de Fenda mesmo se não atingir nenhum alvo.
- Tem cooldown de 20 ticks por jogador.
- Afeta entidades vivas em área frontal curta, com alcance de 3 blocos e raio lateral aproximado de 1,5 bloco.
- Causa 5 de dano.
- Aplica knockback leve horizontal normalizado para evitar força extra em diagonais.
- Não atinge o próprio jogador e não atinge entidades atrás.
- Não cria projétil, não quebra blocos e não consome o pergaminho.
- A ativação por uso do item foi escolhida como primeira abordagem por estabilidade no Bedrock mobile; detecção por ataque pode ser avaliada futuramente.

## XP, níveis e passivas

Status: **Planejado**.

Emblemas devem ganhar XP ao matar monstros e subir de nível. Cada nível deve melhorar atributos extras ou passivas dadas pelo Emblema.

Fontes de passivas planejadas:

- Emblemas: passivas globais de progressão.
- Catalisadores: passivas de build.

Passivas devem começar simples e evoluir gradualmente.

## Receitas

Receitas simples para introduzir itens de forma controlada.

Regras:

- Começar com poucas receitas.
- Evitar cadeias longas no início.
- Testar no mundo de sobrevivência.
- `Emblema de Madeira` usa receita shaped na crafting table com padrão `FMF/MMM/FMF`.
- `F` representa `riftborn:fragmento_de_fenda`.
- `M` representa tábuas de madeira pela tag `minecraft:planks`.
- A receita não usa lápis-lazúli, ametista, ferro ou recursos de mineração avançada.
- `Cajado de Madeira` usa receita shaped na crafting table com padrão `.F./.G./.G.`.
- No `Cajado de Madeira`, `F` representa `riftborn:fragmento_de_fenda` e `G` representa `minecraft:stick`.
- `Pergaminho Mágico: Pulso de Energia I` usa receita shapeless na crafting table com 1 `minecraft:paper` e 1 `riftborn:fragmento_de_fenda`.
- A receita do primeiro Pergaminho Mágico não usa lápis-lazúli, ametista, ferro, diamante, Emblema ou Cajado.
- `Lâmina de Madeira Fendida` usa receita shapeless na crafting table com 1 `minecraft:wooden_sword` e 1 `riftborn:fragmento_de_fenda`.
- `Pergaminho de Lâmina: Corte Instável I` usa receita shapeless na crafting table com 1 `minecraft:paper`, 1 `riftborn:fragmento_de_fenda` e 1 `minecraft:stick`.
- As receitas iniciais de lâmina não usam lápis-lazúli, ametista, ferro, diamante, Emblema ou Catalisador como ingrediente consumido.

## Loot Customizado

Recompensas ligadas à exploração e combate.

Status: **Implementado** (primeira família de drops em 4 mobs hostis).

Primeira fonte survival:

- Zumbis podem dropar 1 `Fragmento de Fenda` com chance aproximada de 15%.
- Esqueletos podem dropar 1 `Fragmento de Fenda` com chance aproximada de 15%.
- Aranhas podem dropar 1 `Fragmento de Fenda` com chance aproximada de 12%.
- Creepers podem dropar 1 `Fragmento de Fenda` com chance aproximada de 18%.
- O drop exige morte por jogador ou pet.
- Esta é uma etapa de teste antes de expandir Fragmentos de Fenda para outros mobs, estruturas ou recompensas.
- Como as loot tables vanilla precisam ser substituídas nos caminhos `loot_tables/entities/*.json`, os drops vanilla básicos foram reproduzidos e o Fragmento de Fenda foi adicionado em pools separados.

Direção futura:

- Loot simples antes de tabelas complexas.
- Recompensas coerentes com o tema de relíquias e fendas.
- Ajustes de balanceamento após testes.

## Origem e Identidade

Camada narrativa que apresenta o jogador como Riftborn.

Possíveis elementos futuros:

- Fragmentos de lore.
- Livro do Perdido como primeiro contato narrativo/tutorial do jogador.
- Emblemas ligados à Energia de Fenda.
- Primeiros sinais do mundo antigo.

## Caminhos

Status: planejado.

Caminhos futuros devem ser definidos pelo Emblema ativo, não por classe fixa.

Caminhos previstos:

- Caminho da Lâmina.
- Caminho Arcano.
- Caminho da Precisão.
- Caminho das Sombras.
- Caminho do Sobrevivente.

## MVP recomendado

Status: **Concluído**.

Sequência recomendada:

1. Documentar o sistema.
2. Criar o Cajado de Madeira Grau I.
3. Criar o Pergaminho Mágico: Pulso de Energia I.
4. Implementar Pulso de Energia I com Cajado, Pergaminho e Emblema ativo.
5. Criar a Lâmina Mágica Grau I.
6. Criar o Pergaminho de Lâmina: Corte Instável I.
7. Implementar `Corte Instável I` com Emblema ativo, Energia de Fenda, Lâmina de Madeira Fendida e Pergaminho de Lâmina compatível.

## Módulos futuros

Módulos que não pertencem ao escopo inicial:

- Sistema completo de caminhos e especializações por Emblemas.
- Skill tree.
- UI customizada complexa.
- Dungeons grandes.
- Muitos mobs customizados.
- Bosses.
- Scripts avançados.
