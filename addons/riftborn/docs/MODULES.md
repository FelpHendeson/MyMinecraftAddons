# Módulos Planejados

Este documento organiza os módulos previstos para o Riftborn. Ele não representa implementação atual.

## Núcleo do Projeto

Base técnica do addon:

- Estrutura de Behavior Pack.
- Estrutura de Resource Pack.
- Manifests futuros.
- Namespace `riftborn`.
- Empacotamento e teste.

## Itens RPG

Status: iniciado.

Primeiros itens usados para validar progressão e identidade do addon.

Item inicial:

- `riftborn:fragmento_de_fenda`: estilhaço cristalino arrancado das rachaduras entre mundos, usado para validar o fluxo de item customizado e representar um material mágico raro.
- `riftborn:emblema_de_madeira`: primeiro Emblema universal do jogador, feito de madeira marcada pela Energia de Fenda, com stack máximo 1 e sem receita ou ativação nesta etapa.

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

Status: iniciado.

Sistema central de progressão do jogador. O Emblema é o item físico carregado, ativado e evoluído pelo jogador. Rift e Fenda representam a Energia de Fenda e o fenômeno dimensional; Emblema representa o objeto que canaliza essa energia.

Primeiro emblema planejado:

- Nome: `Emblema de Madeira`.
- Identificador: `riftborn:emblema_de_madeira`.
- Função: primeiro emblema universal.
- Material: madeira e Fragmentos de Fenda.
- Direção: primeiro vínculo do jogador com a Fenda, sem representar classe fixa.
- Estado atual: item criado com textura e traduções, ainda sem receita, ativação, Energia de Fenda ou habilidades.

Progressão planejada:

- Emblema de Madeira: início universal.
- Emblema de Cobre: melhoria universal.
- Emblemas de Ferro: início das especializações.
- Emblemas avançados: caminhos mais específicos.
- Emblemas lendários: endgame.

Regras planejadas:

- Apenas um Emblema pode estar ativo por vez.
- Ativar um Emblema substitui o anterior.
- Benefícios só acumulam dentro da mesma linhagem.
- Benefícios de Emblemas diferentes não podem ser empilhados.
- O Emblema ativo define o caminho ativo, técnicas disponíveis e benefícios futuros.

## Receitas

Receitas simples para introduzir itens de forma controlada.

Regras:

- Começar com poucas receitas.
- Evitar cadeias longas no início.
- Testar no mundo de sobrevivência.

## Loot Customizado

Recompensas ligadas à exploração e combate.

Status: iniciado.

Primeira fonte survival:

- Zumbis podem dropar 1 `Fragmento de Fenda`.
- Chance base planejada: aproximadamente 8%.
- O drop exige morte por jogador ou pet.
- Esta é uma etapa de teste antes de expandir Fragmentos de Fenda para outros mobs, estruturas ou recompensas.
- Como a loot table vanilla do zumbi precisa ser substituída no caminho `loot_tables/entities/zombie.json`, os drops vanilla básicos foram reproduzidos e o Fragmento de Fenda foi adicionado em um pool separado.

Direção futura:

- Loot simples antes de tabelas complexas.
- Recompensas coerentes com o tema de relíquias e fendas.
- Ajustes de balanceamento após testes.

## Origem e Identidade

Camada narrativa que apresenta o jogador como Riftborn.

Possíveis elementos futuros:

- Fragmentos de lore.
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

## Módulos futuros

Módulos que não pertencem ao escopo inicial:

- Sistema completo de caminhos e especializações por Emblemas.
- Skill tree.
- UI customizada complexa.
- Dungeons grandes.
- Muitos mobs customizados.
- Bosses.
- Scripts avançados.
