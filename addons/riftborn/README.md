# Riftborn: Crônicas do Novo Mundo

`Riftborn: Crônicas do Novo Mundo` é um addon planejado para Minecraft Bedrock Edition.

A proposta é transformar gradualmente o Minecraft em uma experiência de RPG com progressão por Emblemas, caminhos de especialização, loot, equipamentos, dungeons, guildas e história, sem abandonar a base de exploração e sobrevivência do jogo.

## Premissa

O jogador é um Riftborn: alguém trazido por uma fenda dimensional para um mundo antigo, fragmentado e cheio de criaturas, relíquias, guildas e ameaças.

## Status atual

Versão técnica atual: `0.3.3`.

### Implementado

- Manifests, Behavior Pack, Resource Pack e empacotamento local (`.mcpack` / `.mcaddon`).
- 7 itens customizados, 5 receitas, 4 loot tables e traduções `pt_BR` / `en_US`.
- Script API em `scripts/main.js` com Emblema de Madeira, Energia de Fenda, `Pulso de Energia I` e `Corte Instável I`.
- Drops de `Fragmento de Fenda` em zumbi, esqueleto, aranha e creeper.

### Parcial

- Persistência do Emblema ativo por tags (sobrevive à morte); feedback visual restaurado no respawn.
- `Livro do Perdido` sem entrega automática.
- Projétil de `Pulso de Energia I` simulado por script (não é entidade JSON).

### Planejado

- XP e níveis de Emblema, passivas, Emblema de Cobre, mobs customizados, narrativa expandida e UI avançada.

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
- `dist/`: exports gerados pelo build para teste e distribuição.

## Testes

Empacotar com `node shared/tools/build_addon.js riftborn`, importar o `.mcaddon` no Minecraft Bedrock 1.21.10+ e validar em um mundo de desenvolvimento separado. Incrementar a versão dos manifests ou remover packs antigos antes de reimportar.
