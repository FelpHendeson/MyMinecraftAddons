# Prompts do Riftborn

Este arquivo registra prompts específicos usados para planejar e desenvolver o addon Riftborn.

Prompts globais do workspace devem ficar em `docs/PROMPTS.md`.

## Template de registro

Use este formato para registrar novos prompts do Riftborn:

```md
## AAAA-MM-DD - Título curto

- Área: Riftborn.
- Objetivo:
- Arquivos afetados:
- Restrições:
- Resultado esperado:
- Observações:
```

## 2026-06-08 - Criação da estrutura base

- Área: Riftborn.
- Objetivo: criar documentação específica para `Riftborn: Crônicas do Novo Mundo`, um addon de Minecraft Bedrock com tema de RPG, isekai, fantasia medieval e dark fantasy leve.
- Arquivos afetados: documentação em `addons/riftborn/` e `addons/riftborn/docs/`.
- Restrições: criar somente estrutura e documentação; não criar `manifest.json`, itens, receitas, texturas, scripts ou mobs.
- Resultado esperado: projeto independente dentro de `addons/riftborn/`, com contexto, regras, roadmap e guias iniciais.
- Observações: a premissa define o jogador como um Riftborn trazido por uma fenda dimensional para um mundo antigo, fragmentado e cheio de criaturas, relíquias, guildas e ameaças.

## 2026-06-08 - Manifests e estrutura técnica inicial

- Área: Riftborn.
- Objetivo: criar a base técnica inicial do addon com os arquivos mínimos de Behavior Pack e Resource Pack.
- Arquivos afetados: `packs/behavior_pack/manifest.json`, `packs/resource_pack/manifest.json`, pastas reservadas dos packs, `textures/item_texture.json`, arquivos de idioma e documentação relacionada.
- Restrições: não criar itens customizados, receitas, loot tables funcionais, mobs, scripts funcionais, texturas finais ou gameplay.
- Resultado esperado: o addon passa a ter manifests válidos, dependência do Behavior Pack para o Resource Pack e estrutura mínima separada por pack.
- Observações: os diretórios internos usam `.gitkeep` apenas para versionar pastas vazias.

## 2026-06-08 - Primeiro item customizado

- Área: Riftborn.
- Objetivo: criar o primeiro item customizado do addon, `Fragmento de Fenda`.
- Arquivos afetados: `packs/behavior_pack/items/fragmento_de_fenda.json`, `textures/item_texture.json`, `textures/items/fragmento_de_fenda.png`, arquivos de idioma e documentação relacionada.
- Restrições: criar somente o item `riftborn:fragmento_de_fenda`; não criar receitas, loot tables, mobs, scripts de gameplay ou outros itens.
- Resultado esperado: validar o fluxo básico de item customizado no Minecraft Bedrock com stack 64, textura registrada e nomes localizados.
- Observações: a textura criada é placeholder transparente para teste inicial, não textura final.

## 2026-06-08 - Bump técnico para 0.1.1

- Área: Riftborn.
- Objetivo: incrementar a versão técnica dos manifests de `[0, 1, 0]` para `[0, 1, 1]` para permitir nova importação no Minecraft Bedrock mobile.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `CHANGELOG.md`, `TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não alterar UUIDs, nomes, descrições, itens, receitas, mobs, scripts de gameplay ou estrutura dos packs.
- Resultado esperado: Behavior Pack, Resource Pack e dependência do BP apontando para o RP na versão `[0, 1, 1]`.
- Observações: ao importar novos builds no celular, versões repetidas com os mesmos UUIDs podem gerar erro de duplicação.

## 2026-06-08 - Melhoria visual do Fragmento de Fenda

- Área: Riftborn.
- Objetivo: melhorar a apresentação visual e conceitual do item `riftborn:fragmento_de_fenda`.
- Arquivos afetados: `textures/items/fragmento_de_fenda.png`, `CHANGELOG.md`, `MODULES.md` e este registro de prompt.
- Restrições: não recriar o item, não alterar identificador, não alterar UUIDs, não criar novos itens, receitas, loot tables, mobs, scripts de gameplay ou estrutura do projeto.
- Resultado esperado: textura pixel art 16x16 com fundo transparente, silhueta irregular, roxo/violeta/azul profundo, núcleo ciano e brilhos dimensionais sutis.
- Observações: nomes localizados permanecem `Fragmento de Fenda` e `Rift Fragment`.

## 2026-06-08 - Refinamento de Emblemas e Energia de Fenda

- Área: Riftborn.
- Objetivo: atualizar a nomenclatura e o conceito central de progressão, trocando a ideia de Rift como amuleto/item para Emblema como item físico central que canaliza a Energia de Fenda.
- Arquivos afetados: `README.md`, `PROJECT_CONTEXT.md`, `docs/GDD.md`, `docs/MODULES.md`, `ROADMAP.md`, `DEVELOPMENT_RULES.md`, `AGENTS.md`, `CHANGELOG.md` e este registro de prompt.
- Restrições: não criar itens, receitas, scripts, texturas, mobs, gameplay, manifests ou UUIDs; realizar apenas documentação, design e alinhamento de nomenclatura.
- Resultado esperado: documentação passa a tratar `Emblema de Madeira` como primeiro item central planejado, com identificador planejado `riftborn:emblema_de_madeira`, mantendo Rift/Fenda como fonte, energia ou fenômeno dimensional.
- Observações: o jogador começa sem classe fixa; caminhos futuros são definidos pelo Emblema ativo, com apenas um Emblema ativo por vez.

## 2026-06-08 - Criação do Emblema de Madeira

- Área: Riftborn.
- Objetivo: criar o item `riftborn:emblema_de_madeira`, primeiro Emblema universal do sistema de progressão.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/emblema_de_madeira.json`, `textures/item_texture.json`, `textures/items/emblema_de_madeira.png`, arquivos de idioma, `CHANGELOG.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não criar receitas, scripts, `tick.json`, funções, mana, habilidades, ativação de Emblema, mobs ou UUIDs.
- Resultado esperado: item com stack máximo 1, textura 16x16 transparente, nome em PT-BR e EN-US, manifests na versão `[0, 1, 3]` e build funcionando.
- Observações: a textura foi derivada da imagem fornecida, com fundo removido e nome final alinhado ao conceito de Emblema.

## 2026-06-08 - Drop raro de Fragmento de Fenda em zumbis

- Área: Riftborn.
- Objetivo: adicionar a primeira forma survival de obter `Fragmento de Fenda`, fazendo zumbis terem uma pequena chance de dropar o item.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/loot_tables/entities/zombie.json`, `CHANGELOG.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não criar receitas, novos itens, mobs customizados, scripts, funções, texturas ou UUIDs; não alterar a identidade dos itens existentes.
- Resultado esperado: zumbis podem dropar 1 `riftborn:fragmento_de_fenda` com chance base aproximada de 8%, preservando os drops vanilla básicos do zumbi.
- Observações: esta é uma etapa de teste antes de expandir drops para outros mobs ou fontes de recompensa.

## 2026-06-08 - Criação do Livro do Perdido

- Área: Riftborn.
- Objetivo: criar o item `riftborn:livro_do_perdido`, primeiro item narrativo/tutorial do Riftborn.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/livro_do_perdido.json`, `textures/item_texture.json`, `textures/items/livro_do_perdido.png`, arquivos de idioma, `CHANGELOG.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não criar receitas, scripts, `tick.json`, funções de entrega automática, mobs, habilidades ou UUIDs.
- Resultado esperado: item com stack máximo 1, textura 16x16 transparente, nome em PT-BR e EN-US e build funcionando.
- Observações: no estado atual do repositório, os manifests avançaram de `[0, 1, 4]` para `[0, 1, 5]` para evitar rebaixar a versão técnica.

## 2026-06-08 - Substituição de texturas dos itens iniciais

- Área: Riftborn.
- Objetivo: substituir diretamente as texturas de `Fragmento de Fenda`, `Emblema de Madeira` e `Livro do Perdido` pelos PNGs transparentes fornecidos.
- Arquivos afetados: `textures/items/fragmento_de_fenda.png`, `textures/items/emblema_de_madeira.png`, `textures/items/livro_do_perdido.png`, manifests, `CHANGELOG.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não remover fundo, recortar, redimensionar, recriar arte, criar itens, receitas, scripts, funções, mobs, habilidades ou UUIDs.
- Resultado esperado: assets substituídos diretamente e build funcionando com manifests na versão `[0, 1, 6]`.
- Observações: os arquivos fornecidos já tinham transparência real e foram copiados para os nomes usados pelo Resource Pack.

## 2026-06-08 - Rebalanceamento inicial de Fragmentos de Fenda

- Área: Riftborn.
- Objetivo: rebalancear a obtenção inicial de `Fragmento de Fenda` para jogador solo, aumentando a chance do zumbi e adicionando drops em mobs hostis comuns.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `loot_tables/entities/zombie.json`, `loot_tables/entities/skeleton.json`, `loot_tables/entities/spider.json`, `loot_tables/entities/creeper.json`, `CHANGELOG.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não criar itens, receitas, mobs customizados, scripts, funções, texturas ou UUIDs; não alterar nomes ou identidade dos itens existentes.
- Resultado esperado: zumbi e esqueleto com chance aproximada de 15%, aranha com 12% e creeper com 18%, preservando os drops vanilla básicos.
- Observações: no estado atual do repositório, os manifests avançaram de `[0, 1, 6]` para `[0, 1, 7]` para evitar rebaixar a versão técnica.
