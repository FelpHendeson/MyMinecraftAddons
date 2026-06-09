# Guia Técnico

Este guia registra decisões técnicas planejadas e a base técnica inicial do Riftborn.

## Behavior Pack

O Behavior Pack deve conter regras e comportamento do addon.

Estrutura atual:

- Manifest inicial.
- Pastas reservadas para itens, receitas, loot tables, funções, scripts e entidades.
- Itens customizados simples em `items/`.
- Script mínimo em `scripts/main.js` para ativação simples do `Emblema de Madeira`.

Conteúdos futuros possíveis, ainda não implementados:

- Receitas.
- Loot tables.
- Funções.
- Scripts adicionais.
- Entidades customizadas.

O manifest inicial já existe em `packs/behavior_pack/manifest.json`. Novos conteúdos de comportamento só devem ser criados quando solicitados.

## Resource Pack

O Resource Pack deve conter recursos visuais e de apresentação.

Estrutura atual:

- Manifest inicial.
- Atlas de itens `textures/item_texture.json`.
- Arquivos de idioma `texts/pt_BR.lang` e `texts/en_US.lang`.
- Texturas de itens em `textures/items/`.
- Pasta reservada para sons.

Conteúdos futuros possíveis, ainda não implementados:

- Modelos.
- Sons.
- Textos de tradução adicionais.
- Ícones adicionais.

Texturas finais, modelos, sons e ícones adicionais só devem ser criados quando solicitados.

## Estrutura esperada

- `packs/behavior_pack/`: behavior pack futuro.
- `packs/resource_pack/`: resource pack futuro.
- `assets/`: referências e materiais de apoio.
- `dist/`: arquivos exportados para teste e distribuição.
- `docs/`: documentação de design, módulos, prompts e guia técnico.

## Manifests criados

- Behavior Pack: `packs/behavior_pack/manifest.json`.
- Resource Pack: `packs/resource_pack/manifest.json`.
- Versão atual dos packs: `[0, 1, 9]`.
- `min_engine_version`: `[1, 21, 10]`.
- O Behavior Pack declara dependência do Resource Pack pelo UUID do header do Resource Pack.

UUIDs atuais:

- Header do Behavior Pack: `736b3a47-6b63-4645-8561-add453b60a67`.
- Módulo do Behavior Pack: `30d5092e-c227-419d-b2e0-30103067f02a`.
- Header do Resource Pack: `18b8c365-1426-4ab9-8e78-e09b573b299e`.
- Módulo do Resource Pack: `c4c97fc6-137d-48b0-b529-20ae2a41a483`.
- Módulo de script do Behavior Pack: `34bff15a-c852-4f3a-b4fe-a04113a1a236`.

Esses UUIDs não devem ser alterados ou regenerados sem necessidade clara e solicitação explícita.

## Namespace

- Namespace planejado: `riftborn`.
- Identificadores futuros devem seguir `riftborn:nome_do_recurso`.
- Não usar namespaces de outros projetos.

## Itens atuais

- `riftborn:fragmento_de_fenda`: material mágico raro ligado às fendas dimensionais.
- `riftborn:emblema_de_madeira`: primeiro Emblema universal do jogador, com stack máximo 1 e botão de interação `Ativar`.
- `riftborn:livro_do_perdido`: primeiro item narrativo/tutorial do addon, com stack máximo 1.

O `Emblema de Madeira` possui receita survival inicial em `recipes/emblema_de_madeira.json` e ativação simples por uso do item. O item usa `format_version` `1.21.10` para suportar o componente customizado e expõe o botão de toque `Ativar` por `minecraft:interact_button`. Ele ainda não possui mana, habilidades, benefícios de combate ou funções. Esses comportamentos pertencem a etapas futuras.

O `Livro do Perdido` ainda não é entregue automaticamente ao jogador. Entrega automática, funções ou scripts de tutorial pertencem a etapas futuras.

## Loot tables atuais

- `loot_tables/entities/zombie.json`: substitui a loot table vanilla do zumbi para adicionar uma chance base aproximada de 15% de dropar 1 `riftborn:fragmento_de_fenda` quando morto por jogador ou pet.
- `loot_tables/entities/skeleton.json`: substitui a loot table vanilla do esqueleto para adicionar uma chance base aproximada de 15% de dropar 1 `riftborn:fragmento_de_fenda` quando morto por jogador ou pet.
- `loot_tables/entities/spider.json`: substitui a loot table vanilla da aranha para adicionar uma chance base aproximada de 12% de dropar 1 `riftborn:fragmento_de_fenda` quando morta por jogador ou pet.
- `loot_tables/entities/creeper.json`: substitui a loot table vanilla do creeper para adicionar uma chance base aproximada de 18% de dropar 1 `riftborn:fragmento_de_fenda` quando morto por jogador ou pet.

Essas tabelas reproduzem os pools vanilla básicos e adicionam o Fragmento de Fenda em pools separados. Esta é a primeira família de fontes survival planejada para Fragmentos de Fenda e deve ser revisada após testes de balanceamento.

## Receitas atuais

- `recipes/emblema_de_madeira.json`: receita shaped de crafting table para `riftborn:emblema_de_madeira`, usando 4 `riftborn:fragmento_de_fenda` e 5 tábuas de madeira pela tag `minecraft:planks`.

A receita usa apenas madeira e Fragmentos de Fenda para manter o primeiro Emblema acessível ao jogador solo nas primeiras noites.

## Scripts atuais

- `scripts/main.js`: registra o item custom component `riftborn:ativar_emblema_madeira` e também escuta `world.afterEvents.itemUse` como fallback para ativar o `Emblema de Madeira` quando o jogador usa o item.

A ativação remove preventivamente tags de Emblemas planejados, adiciona `riftborn_emblema_ativo` e `riftborn_emblema_madeira`, e envia uma mensagem ao jogador. O script possui um debounce curto para evitar ativação duplicada quando o custom component e o fallback disparam no mesmo uso. O script não consome o item, não cria mana, não concede habilidades e não aplica benefícios de combate.

## Empacotamento futuro

Quando houver arquivos funcionais, o projeto poderá gerar:

- `.mcpack` para behavior pack ou resource pack separado.
- `.mcaddon` para um pacote contendo behavior pack e resource pack juntos.

Arquivos exportados devem ficar em `dist/`.

## Fluxo de teste no celular

1. Empacotar o addon no PC.
2. Enviar o `.mcpack` ou `.mcaddon` para o celular.
3. Abrir o arquivo com Minecraft Bedrock.
4. Ativar o pack em um mundo de teste.
5. Testar a alteração.
6. Corrigir no PC e repetir.

Ao testar um novo build no celular, incremente a versão dos manifests ou remova os packs antigos do armazenamento do Minecraft antes de importar novamente. Reimportar o mesmo UUID com a mesma versão pode causar erro de duplicação.

## Validações antes de testar

- Confirmar que os arquivos estão no pack correto.
- Validar JSON quando houver arquivos JSON.
- Conferir namespace `riftborn`.
- Confirmar que UUIDs futuros são únicos.
- Verificar se a mudança está dentro do escopo da versão.
- Atualizar documentação e changelog quando necessário.
- Confirmar que itens, receitas, mobs, scripts funcionais e texturas finais só foram adicionados quando estiverem dentro do escopo solicitado.
