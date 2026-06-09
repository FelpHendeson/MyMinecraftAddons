# Contexto do Projeto

## Nome completo

Riftborn: Crônicas do Novo Mundo

## Tipo

Addon para Minecraft Bedrock Edition.

## Tema

RPG, isekai, fantasia medieval e dark fantasy leve.

## Premissa

O jogador é um Riftborn, alguém trazido por uma fenda dimensional para um mundo antigo, fragmentado e cheio de criaturas, relíquias, guildas e ameaças.

## Pilares

- Progressão gradual.
- Exploração recompensadora.
- Equipamentos com identidade.
- Emblemas como eixo físico da progressão do jogador.
- Lore fragmentada.
- Ameaças crescentes.
- Sistemas simples antes de sistemas complexos.

## Objetivo de longo prazo

Transformar gradualmente o Minecraft Bedrock em uma experiência de RPG com progressão por Emblemas, caminhos de especialização, loot, equipamentos, dungeons, guildas e história.

## Visão futura

O Riftborn deve evoluir para um addon com identidade própria, onde o jogador avança como aventureiro em um mundo afetado por fendas dimensionais, facções, relíquias antigas e ameaças progressivas.

Esta visão é planejada, não implementada.

## Conceito central

Rift representa a Fenda, a Energia de Fenda e o fenômeno dimensional que altera o mundo. O termo não deve ser usado como nome principal do item físico de progressão do jogador.

Emblema representa o item central carregado, ativado e evoluído pelo jogador. Ele canaliza a Energia de Fenda, simboliza o despertar do jogador como Riftborn e define o caminho ativo, técnicas disponíveis e benefícios futuros.

O primeiro item central planejado é o `Emblema de Madeira`, com identificador planejado `riftborn:emblema_de_madeira`. Ele é um emblema universal feito de madeira e Fragmentos de Fenda, não representa classe fixa e serve como o primeiro vínculo do jogador com a Fenda.

## Arquitetura de progressão planejada

O sistema de progressão do Riftborn deve ser organizado em Emblemas, Energia de Fenda, Catalisadores, Pergaminhos, Graus, XP de Emblema, níveis e passivas.

Emblemas são o núcleo persistente do jogador Riftborn. Apenas um Emblema pode estar ativo por vez. O Emblema ativo deve continuar ativo após a morte e mesmo se o item físico for removido do inventário. Ele só deve deixar de estar ativo quando o jogador desativar manualmente ou ativar outro Emblema.

Energia de Fenda é a energia do sistema. Ela só existe com Emblema ativo e deve ser usada futuramente para lançar habilidades. Emblemas melhores podem oferecer mais energia, melhor regeneração ou maior eficiência.

Catalisadores são itens usados para executar habilidades ativas. Eles não substituem o Emblema; servem como canal de execução das técnicas. As famílias iniciais planejadas são Cajados, para habilidades mágicas, e Lâminas Mágicas, para habilidades de lâmina.

O primeiro Catalisador Mágico é o `Cajado de Madeira`, com identificador `riftborn:cajado_de_madeira`. Ele é um cajado rudimentar de Grau I feito de gravetos e Fragmento de Fenda. No estado atual, é apenas item, textura, tradução e receita; habilidades com cajado dependem de Pergaminhos e etapas futuras.

Pergaminhos são itens que definem quais habilidades ativas podem ser usadas. Eles devem existir em famílias mágicas e de lâmina, possuir grau e exigir compatibilidade com o catalisador usado.

O primeiro Pergaminho Mágico é o `Pergaminho Mágico: Pulso de Energia I`, com identificador `riftborn:pergaminho_magico_pulso_de_energia_i`. Ele registra a técnica `Pulso de Energia I`, primeira habilidade ativa funcional do Riftborn. No estado atual, a técnica é executada pelo `Cajado de Madeira` quando o jogador possui `Emblema de Madeira` ativo, Energia de Fenda suficiente e o pergaminho compatível no inventário. A técnica dispara um projétil mágico scriptado que viaja pela direção da mira.

A primeira Lâmina Mágica é a `Lâmina de Madeira Fendida`, com identificador `riftborn:lamina_de_madeira_fendida`. Ela usa uma espada de madeira vanilla como base infundida por Fragmento de Fenda. O primeiro Pergaminho de Lâmina é `Pergaminho de Lâmina: Corte Instável I`, com identificador `riftborn:pergaminho_lamina_corte_instavel_i`. Esses itens criam a base de Habilidades de Lâmina, mas ainda não executam habilidade.

Graus vão de I a V. Grau I é a entrada do sistema, com baixo custo de Energia de Fenda. Graus maiores aumentam custo, poder e efeitos. Emblemas fracos podem usar habilidades de grau alto, mas de forma ineficiente por causa do consumo elevado.

Emblemas devem ganhar XP ao matar monstros, subir de nível e melhorar passivas ou atributos extras dados pelo Emblema. Catalisadores também podem conceder passivas de build.

## Planejamento técnico

- Namespace planejado: `riftborn`.
- Behavior Pack planejado: `Riftborn BP`.
- Resource Pack planejado: `Riftborn RP`.

## Escopo inicial

A primeira fase funcional deve criar apenas:

- Base técnica.
- Documentação técnica.
- Manifests.
- Itens simples.
- Receitas simples.
- Empacotamento.

## Fora do escopo inicial

- Bosses.
- Dungeons grandes.
- Sistema completo de caminhos e especializações por Emblemas.
- Classes fixas como sistema principal.
- Skill tree.
- UI customizada complexa.
- Scripts avançados.
- Muitos mobs customizados.
