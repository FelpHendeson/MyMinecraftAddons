# Changelog

Todas as mudanças relevantes do projeto Riftborn devem ser registradas aqui.

## Unreleased

### Added

- Estrutura inicial de documentação e organização do projeto.
- Pastas reservadas para behavior pack, resource pack, assets e distribuição.
- Manifests iniciais do Behavior Pack e Resource Pack na versão `0.1.0`.
- Estrutura técnica mínima dos packs com pastas reservadas para itens, receitas, loot tables, entidades, funções, scripts, texturas, textos e sons.
- Atlas vazio `textures/item_texture.json` e arquivos de idioma `pt_BR.lang` e `en_US.lang`.
- Ferramenta compartilhada de build para gerar `.mcpack` e `.mcaddon`.
- Primeiros arquivos exportados em `dist/` para teste de importação no Minecraft Bedrock.
- Primeiro item customizado: `riftborn:fragmento_de_fenda`, com textura placeholder e traduções em português e inglês.
- Item `riftborn:emblema_de_madeira`, primeiro Emblema universal do jogador, com stack máximo 1, textura e traduções em português e inglês.
- Loot table de zumbi com chance inicial aproximada de 8% de dropar 1 `Fragmento de Fenda` quando morto por jogador ou pet.
- Item narrativo `riftborn:livro_do_perdido`, com stack máximo 1, textura placeholder e traduções em português e inglês.

### Changed

- Documentação base revisada para orientar melhor futuras etapas de desenvolvimento.
- Guia técnico atualizado para registrar a base técnica inicial dos packs.
- Documentação do Riftborn atualizada para reconhecer que a base técnica inicial já existe.
- Fluxo geral atualizado com o comando de build local.
- Versão técnica dos manifests incrementada para `0.1.1` para permitir nova importação no Minecraft Bedrock.
- Textura do `Fragmento de Fenda` substituída por pixel art 16x16 com silhueta irregular, núcleo ciano e brilho dimensional.
- Conceito de progressão refinado: Rift/Fenda passa a representar fonte, energia ou fenômeno dimensional, enquanto Emblema passa a ser o item físico central do jogador.
- Primeiro item central planejado renomeado conceitualmente para `Emblema de Madeira`, com identificador planejado `riftborn:emblema_de_madeira`.
- Versão técnica dos manifests incrementada para `0.1.3` para importar o novo build com o `Emblema de Madeira`.
- Versão técnica dos manifests incrementada para `0.1.4` para importar o build com o primeiro drop survival de `Fragmento de Fenda`.
- Versão técnica dos manifests incrementada para `0.1.5` para importar o build com o `Livro do Perdido`.
- Texturas de `Fragmento de Fenda`, `Emblema de Madeira` e `Livro do Perdido` substituídas pelos PNGs transparentes fornecidos.
- Versão técnica dos manifests incrementada para `0.1.6` para importar o build com as texturas atualizadas.

### Fixed

- Nenhuma correção registrada.

### Notes

- Nenhuma receita, mob, script funcional, função, habilidade ou gameplay foi criado.
- O `Emblema de Madeira` ainda não ativa Energia de Fenda e ainda não concede habilidades.
- Nenhuma receita, novo item, mob customizado, script, função, textura ou UUID foi criado ou alterado nesta etapa de loot.
- A loot table do zumbi substitui o arquivo vanilla do mesmo caminho; os pools vanilla básicos foram reproduzidos e o drop de `Fragmento de Fenda` foi adicionado em um pool separado.
- O `Livro do Perdido` ainda não é entregue automaticamente ao jogador; a entrega automática fica para uma etapa futura.
- Nenhuma receita, script, `tick.json`, função, mob, habilidade ou UUID foi criado ou alterado nesta etapa do livro.
- Nenhum item, receita, loot table, script, função, mob, habilidade ou UUID foi criado ou alterado nesta etapa de substituição de texturas.
- Nenhum UUID foi alterado.
- A textura do `Fragmento de Fenda` ainda pode evoluir, mas já representa melhor o conceito de material mágico raro.
- Se o Minecraft Bedrock detectar duplicação ao importar novo build, a versão técnica pode precisar ser incrementada em uma etapa separada.
