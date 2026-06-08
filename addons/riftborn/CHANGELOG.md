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

### Changed

- Documentação base revisada para orientar melhor futuras etapas de desenvolvimento.
- Guia técnico atualizado para registrar a base técnica inicial dos packs.
- Documentação do Riftborn atualizada para reconhecer que a base técnica inicial já existe.
- Fluxo geral atualizado com o comando de build local.
- Versão técnica dos manifests incrementada para `0.1.1` para permitir nova importação no Minecraft Bedrock.
- Textura do `Fragmento de Fenda` substituída por pixel art 16x16 com silhueta irregular, núcleo ciano e brilho dimensional.

### Fixed

- Nenhuma correção registrada.

### Notes

- Nenhuma receita, loot table, mob, script funcional ou gameplay foi criado.
- A textura do `Fragmento de Fenda` ainda pode evoluir, mas já representa melhor o conceito de material mágico raro.
- Se o Minecraft Bedrock detectar duplicação ao importar novo build, a versão técnica pode precisar ser incrementada em uma etapa separada.
