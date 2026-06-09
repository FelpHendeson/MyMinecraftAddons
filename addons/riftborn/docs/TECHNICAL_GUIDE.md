# Guia Técnico

Este guia registra decisões técnicas planejadas e a base técnica inicial do Riftborn.

## Behavior Pack

O Behavior Pack deve conter regras e comportamento do addon.

Estrutura atual:

- Manifest inicial.
- Pastas reservadas para itens, receitas, loot tables, funções, scripts e entidades.
- Itens customizados simples em `items/`.

Conteúdos futuros possíveis, ainda não implementados:

- Receitas.
- Loot tables.
- Funções.
- Scripts.
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
- Versão atual dos packs: `[0, 1, 3]`.
- `min_engine_version`: `[1, 20, 0]`.
- O Behavior Pack declara dependência do Resource Pack pelo UUID do header do Resource Pack.

UUIDs atuais:

- Header do Behavior Pack: `736b3a47-6b63-4645-8561-add453b60a67`.
- Módulo do Behavior Pack: `30d5092e-c227-419d-b2e0-30103067f02a`.
- Header do Resource Pack: `18b8c365-1426-4ab9-8e78-e09b573b299e`.
- Módulo do Resource Pack: `c4c97fc6-137d-48b0-b529-20ae2a41a483`.

Esses UUIDs não devem ser alterados ou regenerados sem necessidade clara e solicitação explícita.

## Namespace

- Namespace planejado: `riftborn`.
- Identificadores futuros devem seguir `riftborn:nome_do_recurso`.
- Não usar namespaces de outros projetos.

## Itens atuais

- `riftborn:fragmento_de_fenda`: material mágico raro ligado às fendas dimensionais.
- `riftborn:emblema_de_madeira`: primeiro Emblema universal do jogador, com stack máximo 1.

O `Emblema de Madeira` ainda não possui receita, ativação de Energia de Fenda, habilidades, scripts ou funções. Esses comportamentos pertencem a etapas futuras.

## Loot tables atuais

- `loot_tables/entities/zombie.json`: substitui a loot table vanilla do zumbi para adicionar uma chance base aproximada de 8% de dropar 1 `riftborn:fragmento_de_fenda` quando morto por jogador ou pet.

A tabela do zumbi reproduz os pools vanilla básicos e adiciona o Fragmento de Fenda em um pool separado. Esta é a primeira fonte survival planejada para Fragmentos de Fenda e deve ser revisada após testes de balanceamento.

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
