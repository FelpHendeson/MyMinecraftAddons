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

## 2026-06-08 - Receita survival do Emblema de Madeira

- Área: Riftborn.
- Objetivo: criar a receita survival do `Emblema de Madeira`, usando apenas madeira e Fragmentos de Fenda.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/recipes/emblema_de_madeira.json`, `CHANGELOG.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não usar lápis-lazúli, ametista, ferro ou recursos de mineração avançada; não criar itens, mobs customizados, scripts, funções, `tick.json`, mana, habilidades, ativação de Emblema, texturas ou UUIDs.
- Resultado esperado: receita shaped na crafting table com padrão `FMF/MMM/FMF`, usando `riftborn:fragmento_de_fenda` e a tag `minecraft:planks`, com build funcionando.
- Observações: no estado atual do repositório, os manifests avançaram de `[0, 1, 7]` para `[0, 1, 8]` para evitar rebaixar a versão técnica.

## 2026-06-08 - Ativação simples do Emblema de Madeira

- Área: Riftborn.
- Objetivo: implementar a primeira ativação simples do `Emblema de Madeira`, sem sistema completo de mana ou habilidades.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/emblema_de_madeira.json`, `packs/behavior_pack/scripts/main.js`, `CHANGELOG.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md`, `DEVELOPMENT_RULES.md` e este registro de prompt.
- Restrições: não criar itens, receitas, mobs, funções, `tick.json`, mana, habilidades, UI customizada, sistemas avançados, texturas ou renomear itens existentes; não alterar UUIDs existentes.
- Resultado esperado: usar `riftborn:emblema_de_madeira` remove tags futuras de outros Emblemas, adiciona `riftborn_emblema_ativo` e `riftborn_emblema_madeira`, envia mensagem ao jogador e não consome o item.
- Observações: no estado atual do repositório, os manifests avançaram de `[0, 1, 8]` para `[0, 1, 9]` para evitar rebaixar a versão técnica; um UUID novo foi criado somente para o novo módulo de script.

## 2026-06-09 - Energia de Fenda básica do Emblema de Madeira

- Área: Riftborn.
- Objetivo: implementar o primeiro estado funcional simples de `Energia de Fenda` para jogadores com `Emblema de Madeira` ativo.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/scripts/main.js`, `CHANGELOG.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md`, `DEVELOPMENT_RULES.md` e este registro de prompt.
- Restrições: não criar itens, receitas, mobs, habilidades, projéteis, efeitos de dano, UI customizada, renomear itens existentes ou alterar UUIDs.
- Resultado esperado: jogadores com `riftborn_emblema_ativo` e `riftborn_emblema_madeira` têm energia máxima 20, energia inicial 20 quando ainda não existir, regeneração de 1 ponto a cada 40 ticks e exibição por actionbar.
- Observações: a Energia de Fenda usa scoreboards `rb_energy` e `rb_energy_max`; ainda não existem técnicas, custos de energia, mana, habilidades, dano ou projéteis. Os manifests avançaram para `[0, 1, 12]` para preservar a sequência técnica atual.

## 2026-06-09 - Arquitetura de Emblemas, Catalisadores e Pergaminhos

- Área: Riftborn.
- Objetivo: atualizar a documentação de design para estruturar oficialmente o sistema planejado de Emblemas, Catalisadores, Pergaminhos, Graus, Energia de Fenda, XP de Emblema, níveis, passivas e habilidades ativas.
- Arquivos afetados: `PROJECT_CONTEXT.md`, `docs/GDD.md`, `docs/MODULES.md`, `ROADMAP.md`, `DEVELOPMENT_RULES.md`, `AGENTS.md`, `CHANGELOG.md` e este registro de prompt.
- Restrições: não criar itens, receitas, scripts, mobs, habilidades, projéteis, efeitos de dano, UI customizada, manifests ou UUIDs.
- Resultado esperado: documentação registra Emblema ativo persistente, Catalisadores como canal de execução, Pergaminhos como definição de habilidades, Graus I a V, XP e níveis de Emblema, passivas de Emblema e Catalisador, e MVP recomendado.
- Observações: o MVP recomendado documentado é Cajado de Madeira Grau I, Pergaminho Mágico: Pulso de Energia I, implementação futura de Pulso de Energia I, Lâmina Mágica Grau I e Pergaminho de Lâmina: Corte Instável I. Nenhum gameplay foi implementado nesta etapa.

## 2026-06-09 - Criação do Cajado de Madeira

- Área: Riftborn.
- Objetivo: criar `riftborn:cajado_de_madeira`, primeiro Catalisador Mágico de Grau I.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/cajado_de_madeira.json`, `packs/behavior_pack/recipes/cajado_de_madeira.json`, `textures/item_texture.json`, `textures/items/cajado_de_madeira.png`, arquivos de idioma, `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `docs/GDD.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md`, `ROADMAP.md`, `DEVELOPMENT_RULES.md` e este registro de prompt.
- Restrições: não criar Pergaminhos, habilidades, mobs, scripts, projéteis, efeitos de dano, alterar Energia de Fenda, alterar ativação de Emblema, renomear itens existentes ou alterar UUIDs.
- Resultado esperado: item com stack máximo 1, textura placeholder 16x16 transparente, nome em PT-BR e EN-US, receita shaped com `Fragmento de Fenda` e gravetos, manifests na versão `[0, 2, 0]` e build funcionando.
- Observações: o `Cajado de Madeira` ainda não lança habilidades, não consome Energia de Fenda e não interage com Pergaminhos nesta etapa.

## 2026-06-09 - Criação do Pergaminho Mágico: Pulso de Energia I

- Área: Riftborn.
- Objetivo: criar `riftborn:pergaminho_magico_pulso_de_energia_i`, primeiro Pergaminho Mágico de Grau I.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/pergaminho_magico_pulso_de_energia_i.json`, `packs/behavior_pack/recipes/pergaminho_magico_pulso_de_energia_i.json`, `textures/item_texture.json`, `textures/items/pergaminho_magico_pulso_de_energia_i.png`, arquivos de idioma, `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `docs/GDD.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não implementar habilidade, dano, projétil, partículas, scripts, mobs, alterar Energia de Fenda, alterar ativação de Emblema, alterar Cajado de Madeira, renomear itens existentes ou alterar UUIDs.
- Resultado esperado: item com stack máximo 16, textura placeholder 16x16 transparente, nome em PT-BR e EN-US, receita shapeless com papel e `Fragmento de Fenda`, manifests na versão `[0, 2, 1]` e build funcionando.
- Observações: o pergaminho registra `Pulso de Energia I`, mas ainda não executa habilidade. Parâmetros planejados futuros: custo 5 Energia de Fenda, cooldown 20 ticks, dano 5 e repulsão horizontal normalizada de aproximadamente 2 blocos.

## 2026-06-09 - Implementação do Pulso de Energia I

- Área: Riftborn.
- Objetivo: implementar `Pulso de Energia I`, primeira habilidade ativa funcional do Riftborn.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/cajado_de_madeira.json`, `packs/behavior_pack/scripts/main.js`, `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `ROADMAP.md`, `DEVELOPMENT_RULES.md`, `docs/GDD.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não criar itens, receitas, mobs, novas habilidades além do `Pulso de Energia I`, projétil customizado, UI customizada, renomear itens existentes ou alterar UUIDs.
- Resultado esperado: usar `riftborn:cajado_de_madeira` tenta lançar `Pulso de Energia I`, exigindo `Emblema de Madeira` ativo, 5 Energia de Fenda, `Pergaminho Mágico: Pulso de Energia I` no inventário e cooldown disponível.
- Observações: a primeira versão da habilidade custava 5 Energia de Fenda, tinha cooldown de 20 ticks por jogador, causava 5 de dano, usava alcance de 5 blocos, aplicava repulsão horizontal normalizada aproximada de 2 blocos e não consumia o pergaminho. O Cajado recebeu custom component para ser usado como catalisador.

## 2026-06-09 - Refatoração do Pulso de Energia I para projétil

- Área: Riftborn.
- Objetivo: refatorar `Pulso de Energia I` para funcionar como projétil mágico real, disparado pela mira do jogador.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/cajado_de_madeira.json`, `packs/behavior_pack/scripts/main.js`, `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `ROADMAP.md`, `docs/GDD.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não criar novos catalisadores, receitas, mobs, habilidades além do `Pulso de Energia I`, UI customizada, alterar UUIDs ou reestruturar o projeto.
- Resultado esperado: o Cajado de Madeira dispara um projétil mágico scriptado que nasce à frente do jogador, segue a mira, causa 5 de dano, aplica knockback horizontal normalizado, consome 5 Energia de Fenda no disparo e expira ao atingir alvo, bloco, alcance ou tempo limite.
- Observações: a solução usa Script API em vez de `minecraft:shooter` para validar Emblema, Pergaminho, Energia de Fenda e cooldown antes do disparo. O carregamento completo estilo arco e VFX dedicados ficam para melhoria futura.

## 2026-06-09 - Base inicial de Habilidades de Lâmina

- Área: Riftborn.
- Objetivo: criar `riftborn:lamina_de_madeira_fendida` e `riftborn:pergaminho_lamina_corte_instavel_i`, primeiros itens da trilha de Habilidades de Lâmina.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/lamina_de_madeira_fendida.json`, `packs/behavior_pack/items/pergaminho_lamina_corte_instavel_i.json`, `packs/behavior_pack/recipes/lamina_de_madeira_fendida.json`, `packs/behavior_pack/recipes/pergaminho_lamina_corte_instavel_i.json`, `textures/item_texture.json`, texturas dos dois itens, arquivos de idioma, `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `ROADMAP.md`, `DEVELOPMENT_RULES.md`, `docs/GDD.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não implementar `Corte Instável I`, dano de lâmina, hitbox de corte, partículas de corte, scripts novos, mobs, novas habilidades, alterar Energia de Fenda, alterar Emblema, alterar Pulso de Energia ou alterar UUIDs.
- Resultado esperado: Lâmina de Madeira Fendida com stack máximo 1, Pergaminho de Lâmina: Corte Instável I com stack máximo 16, texturas 16x16 transparentes, traduções, receitas baratas e manifests na versão `[0, 3, 0]`.
- Observações: a Lâmina usa `minecraft:wooden_sword` e Fragmento de Fenda; o Pergaminho usa papel, Fragmento de Fenda e graveto. A execução de `Corte Instável I` fica para etapa futura.

## 2026-06-09 - Implementação do Corte Instável I

- Área: Riftborn.
- Objetivo: implementar `Corte Instável I`, primeira habilidade de lâmina funcional do Riftborn.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `packs/behavior_pack/items/lamina_de_madeira_fendida.json`, `packs/behavior_pack/scripts/main.js`, `CHANGELOG.md`, `PROJECT_CONTEXT.md`, `docs/GDD.md`, `docs/MODULES.md`, `docs/TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não criar itens, receitas, mobs, novas habilidades além do `Corte Instável I`, projéteis, UI customizada, renomear itens existentes, alterar Energia de Fenda, alterar o Emblema, alterar o Pulso de Energia ou alterar UUIDs.
- Resultado esperado: usar `riftborn:lamina_de_madeira_fendida` tenta executar `Corte Instável I`, exigindo `Emblema de Madeira` ativo, 5 Energia de Fenda, `Pergaminho de Lâmina: Corte Instável I` no inventário e cooldown disponível.
- Observações: a técnica custa 5 Energia de Fenda, tem cooldown de 20 ticks por jogador, causa 5 de dano, afeta área frontal curta de 3 blocos, aplica knockback horizontal normalizado leve e não consome o pergaminho. A ativação por uso da lâmina foi escolhida por estabilidade no Bedrock mobile; detecção por ataque fica para avaliação futura.
