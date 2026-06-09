# Riftborn: Crônicas do Novo Mundo

`Riftborn: Crônicas do Novo Mundo` é um addon planejado para Minecraft Bedrock Edition.

A proposta é transformar gradualmente o Minecraft em uma experiência de RPG com progressão por Emblemas, caminhos de especialização, loot, equipamentos, dungeons, guildas e história, sem abandonar a base de exploração e sobrevivência do jogo.

## Premissa

O jogador é um Riftborn: alguém trazido por uma fenda dimensional para um mundo antigo, fragmentado e cheio de criaturas, relíquias, guildas e ameaças.

## Status atual

O projeto possui base técnica funcional com manifests, estrutura de Behavior Pack e Resource Pack, itens iniciais e empacotamento local.

Já existem itens customizados simples para validar o fluxo do addon. Ainda não há receitas, scripts, mobs, funções, habilidades, ativação de Emblemas ou sistemas de gameplay implementados.

## Escopo inicial futuro

A primeira fase funcional deve focar em:

- Base técnica.
- Manifests.
- Itens simples.
- Receitas simples.
- Empacotamento.

Sistemas avançados devem esperar versões posteriores.

## Estrutura local

- `AGENTS.md`: regras para agents que trabalham no Riftborn.
- `PROJECT_CONTEXT.md`: visão, premissa, escopo e limites do projeto.
- `DEVELOPMENT_RULES.md`: regras técnicas e convenções futuras.
- `ROADMAP.md`: planejamento de versões.
- `CHANGELOG.md`: registro de mudanças.
- `docs/`: documentação de design, módulos, guia técnico e prompts.
- `packs/behavior_pack/`: pasta reservada para o behavior pack.
- `packs/resource_pack/`: pasta reservada para o resource pack.
- `assets/`: referências e materiais de apoio.
- `dist/`: exports futuros para teste e distribuição.

## Testes futuros

Quando houver conteúdo funcional, o addon deverá ser empacotado como `.mcpack` ou `.mcaddon`, enviado para o celular, importado no Minecraft Bedrock e testado em um mundo separado de desenvolvimento.
