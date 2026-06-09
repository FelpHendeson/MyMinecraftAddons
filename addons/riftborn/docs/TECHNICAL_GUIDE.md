# Guia Técnico

Este guia registra decisões técnicas planejadas e a base técnica inicial do Riftborn.

## Behavior Pack

O Behavior Pack deve conter regras e comportamento do addon.

Estrutura atual:

- Manifest inicial.
- Pastas reservadas para itens, receitas, loot tables, funções, scripts e entidades.
- Itens customizados simples em `items/`.
- Script em `scripts/main.js` para ativação, desativação e Energia de Fenda básica do `Emblema de Madeira`.

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
- Versão atual dos packs: `[0, 2, 4]`.
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
- `riftborn:emblema_de_madeira_ativo`: estado técnico ativo do `Emblema de Madeira`, com stack máximo 1 e botão de interação `Desativar`.
- `riftborn:livro_do_perdido`: primeiro item narrativo/tutorial do addon, com stack máximo 1.
- `riftborn:cajado_de_madeira`: primeiro Catalisador Mágico de Grau I, com stack máximo 1.
- `riftborn:pergaminho_magico_pulso_de_energia_i`: primeiro Pergaminho Mágico de Grau I, com stack máximo 16.

O `Emblema de Madeira` possui receita survival inicial em `recipes/emblema_de_madeira.json` e ativação simples por uso do item. O item usa `format_version` `1.21.10` para suportar o componente customizado e expõe o botão de toque `Ativar` por `minecraft:interact_button`. Ao ativar, o script troca o item na mão principal pelo estado técnico `riftborn:emblema_de_madeira_ativo`, que expõe o botão `Desativar`. Ele possui Energia de Fenda básica exibida na actionbar e permite a execução de `Pulso de Energia I` quando combinado com Cajado e Pergaminho compatíveis.

O `Livro do Perdido` ainda não é entregue automaticamente ao jogador. Entrega automática, funções ou scripts de tutorial pertencem a etapas futuras.

O `Cajado de Madeira` é um item de equipamento e usa o ícone `cajado_de_madeira`. Ele usa `format_version` `1.21.10`, expõe o botão de toque `Usar` por `minecraft:interact_button` e registra o custom component `riftborn:usar_cajado_de_madeira`. Usar o cajado tenta lançar `Pulso de Energia I`.

O `Pergaminho Mágico: Pulso de Energia I` é um item simples e usa o ícone `pergaminho_magico_pulso_de_energia_i`. Ele registra a técnica `Pulso de Energia I`. O pergaminho precisa existir no inventário do jogador para a habilidade ser executada e não é consumido.

## Loot tables atuais

- `loot_tables/entities/zombie.json`: substitui a loot table vanilla do zumbi para adicionar uma chance base aproximada de 15% de dropar 1 `riftborn:fragmento_de_fenda` quando morto por jogador ou pet.
- `loot_tables/entities/skeleton.json`: substitui a loot table vanilla do esqueleto para adicionar uma chance base aproximada de 15% de dropar 1 `riftborn:fragmento_de_fenda` quando morto por jogador ou pet.
- `loot_tables/entities/spider.json`: substitui a loot table vanilla da aranha para adicionar uma chance base aproximada de 12% de dropar 1 `riftborn:fragmento_de_fenda` quando morta por jogador ou pet.
- `loot_tables/entities/creeper.json`: substitui a loot table vanilla do creeper para adicionar uma chance base aproximada de 18% de dropar 1 `riftborn:fragmento_de_fenda` quando morto por jogador ou pet.

Essas tabelas reproduzem os pools vanilla básicos e adicionam o Fragmento de Fenda em pools separados. Esta é a primeira família de fontes survival planejada para Fragmentos de Fenda e deve ser revisada após testes de balanceamento.

## Receitas atuais

- `recipes/emblema_de_madeira.json`: receita shaped de crafting table para `riftborn:emblema_de_madeira`, usando 4 `riftborn:fragmento_de_fenda` e 5 tábuas de madeira pela tag `minecraft:planks`.
- `recipes/cajado_de_madeira.json`: receita shaped de crafting table para `riftborn:cajado_de_madeira`, usando 1 `riftborn:fragmento_de_fenda` e 2 `minecraft:stick` no padrão `.F./.G./.G.`.
- `recipes/pergaminho_magico_pulso_de_energia_i.json`: receita shapeless de crafting table para `riftborn:pergaminho_magico_pulso_de_energia_i`, usando 1 `minecraft:paper` e 1 `riftborn:fragmento_de_fenda`.

A receita usa apenas madeira e Fragmentos de Fenda para manter o primeiro Emblema acessível ao jogador solo nas primeiras noites.

A receita do `Cajado de Madeira` usa apenas gravetos e Fragmento de Fenda para manter o primeiro Catalisador Mágico acessível, sem adicionar habilidades nesta etapa.

A receita do `Pergaminho Mágico: Pulso de Energia I` é barata para permitir acesso inicial à primeira técnica planejada após obter papel e Fragmentos de Fenda. Ela não consome Emblema ou Cajado.

## Scripts atuais

- `scripts/main.js`: registra os item custom components `riftborn:ativar_emblema_madeira`, `riftborn:desativar_emblema_madeira` e `riftborn:usar_cajado_de_madeira`, e também escuta `world.afterEvents.itemUse` como fallback para alternar o `Emblema de Madeira` ou usar o `Cajado de Madeira`.

A ativação remove preventivamente tags de Emblemas planejados, adiciona `riftborn_emblema_ativo` e `riftborn_emblema_madeira`, troca o item na mão principal para o estado ativo e envia uma mensagem ao jogador. A desativação remove `riftborn_emblema_ativo` e `riftborn_emblema_madeira`, limpa a actionbar, troca o item na mão principal para o estado inativo e envia uma mensagem ao jogador. O script possui um debounce curto para evitar alternância duplicada quando o custom component e o fallback disparam no mesmo uso.

Energia de Fenda básica:

- O estado é persistido em scoreboards com os objetivos `rb_energy` e `rb_energy_max`.
- O `Emblema de Madeira` ativo garante energia máxima 20.
- A energia atual é inicializada em 20 apenas quando ainda não existe para o jogador.
- Valores existentes são preservados e limitados entre 0 e 20.
- A regeneração inicial é de 1 ponto a cada 40 ticks.
- A actionbar exibe `§dEnergia de Fenda: §f{atual}§7/§f{max}` enquanto o jogador possui as tags `riftborn_emblema_ativo` e `riftborn_emblema_madeira`.
- A Energia de Fenda básica não cria mana separada, não causa dano por si só e não dispara projéteis. Custos e dano aparecem apenas quando uma habilidade ativa, como `Pulso de Energia I`, é executada.

Pulso de Energia I:

- É executado ao usar `riftborn:cajado_de_madeira`.
- Requer `riftborn_emblema_ativo` e `riftborn_emblema_madeira`.
- Requer energia atual de pelo menos 5.
- Requer pelo menos 1 `riftborn:pergaminho_magico_pulso_de_energia_i` no inventário ou hotbar.
- Não consome o pergaminho.
- Custa 5 Energia de Fenda no disparo, mesmo quando não atinge alvo.
- Tem cooldown de 20 ticks por jogador.
- Usa um projétil mágico scriptado, criado à frente dos olhos do jogador com base em `player.getViewDirection()`.
- O projétil viaja aproximadamente 10 blocos, com velocidade 0,75 bloco por tick, e expira ao atingir entidade, bloco, alcance máximo ou tempo limite.
- O loop do projétil testa colisão por amostras entre a posição anterior e a próxima para reduzir falhas quando a mira está diretamente sobre o alvo.
- Não atinge o próprio jogador e evita entidades sem componente de vida, como itens dropados e projéteis.
- Aplica 5 de dano e repulsão horizontal normalizada de força aproximada 2, com impulso vertical pequeno de 0,15.
- Usa partículas vanilla simples não textuais, priorizando `minecraft:blue_flame_particle` e usando `minecraft:basic_flame_particle` como fallback, além de sons vanilla simples quando disponíveis.
- Não cria entidade customizada, mob, item, receita, projétil customizado por JSON ou UI customizada.
- A abordagem foi escolhida em Script API porque `minecraft:shooter` não oferece, neste escopo, um ponto simples e estável para validar Emblema, Pergaminho, Energia de Fenda e cooldown antes do disparo.
- Carregamento completo estilo arco ainda é melhoria futura; o uso atual dispara imediatamente após a validação.

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
