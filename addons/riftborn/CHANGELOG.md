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
- Loot table de zumbi com chance inicial de dropar 1 `Fragmento de Fenda` quando morto por jogador ou pet.
- Loot tables de esqueleto, aranha e creeper com chance de dropar 1 `Fragmento de Fenda` quando mortos por jogador ou pet.
- Item narrativo `riftborn:livro_do_perdido`, com stack máximo 1, textura placeholder e traduções em português e inglês.
- Receita shaped de crafting table para `riftborn:emblema_de_madeira`, usando apenas tábuas de madeira e `Fragmento de Fenda`.
- Script mínimo de ativação do `Emblema de Madeira`, aplicando tags ao jogador e exibindo mensagem ao usar o item.
- Sistema básico de `Energia de Fenda` para jogadores com `Emblema de Madeira` ativo, usando scoreboards `rb_energy` e `rb_energy_max`.
- Documentação oficial da arquitetura planejada de Emblemas, Catalisadores, Pergaminhos, Graus, XP de Emblema, níveis, passivas e habilidades ativas.
- Item `riftborn:cajado_de_madeira`, primeiro Catalisador Mágico de Grau I, com textura placeholder e traduções em português e inglês.
- Receita shaped de crafting table para `riftborn:cajado_de_madeira`, usando `Fragmento de Fenda` e gravetos.
- Item `riftborn:pergaminho_magico_pulso_de_energia_i`, primeiro Pergaminho Mágico de Grau I, com textura placeholder e traduções em português e inglês.
- Receita shapeless de crafting table para `riftborn:pergaminho_magico_pulso_de_energia_i`, usando papel e `Fragmento de Fenda`.
- Habilidade ativa `Pulso de Energia I`, executada pelo `Cajado de Madeira` quando o jogador possui `Emblema de Madeira` ativo, Energia de Fenda suficiente e o pergaminho compatível.

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
- Drop de `Fragmento de Fenda` rebalanceado para melhorar o início solo: zumbi 15%, esqueleto 15%, aranha 12% e creeper 18%.
- Versão técnica dos manifests incrementada para `0.1.7` para importar o build com o rebalanceamento de loot.
- Versão técnica dos manifests incrementada para `0.1.8` para importar o build com a receita survival do `Emblema de Madeira`.
- Behavior Pack atualizado com módulo JavaScript mínimo para ativação simples do `Emblema de Madeira`.
- Versão técnica dos manifests incrementada para `0.1.9` para importar o build com a ativação simples do `Emblema de Madeira`.
- `Emblema de Madeira` atualizado com botão de toque `Ativar` para facilitar o uso no mobile.
- Script de ativação do `Emblema de Madeira` atualizado com fallback por `world.afterEvents.itemUse` e debounce contra ativação duplicada.
- Versão técnica dos manifests incrementada para `0.1.10` para importar o build com a correção de ativação do `Emblema de Madeira`.
- Estado técnico `riftborn:emblema_de_madeira_ativo`, usado para exibir o botão `Desativar` quando o Emblema está ativo.
- Script do `Emblema de Madeira` atualizado para alternar entre ativação e desativação, trocando o item na mão principal e atualizando as tags do jogador.
- Versão técnica dos manifests incrementada para `0.1.11` para importar o build com o botão `Desativar`.
- `Emblema de Madeira` ativo agora garante energia máxima 20, inicializa energia atual em 20 quando necessário, regenera 1 ponto a cada 40 ticks e exibe a energia na actionbar.
- Versão técnica dos manifests incrementada para `0.1.12` para importar o build com Energia de Fenda básica.
- Documentação de design atualizada para tratar o Emblema ativo como estado persistente, separar Catalisadores e Pergaminhos do Emblema, e registrar o MVP recomendado com Cajado de Madeira Grau I e Pulso de Energia I.
- Versão técnica dos manifests incrementada para `0.2.0` para importar o build com o primeiro Catalisador Mágico.
- Versão técnica dos manifests incrementada para `0.2.1` para importar o build com o primeiro Pergaminho Mágico.
- Versão técnica dos manifests incrementada para `0.2.2` para importar o build com a primeira habilidade ativa.

### Fixed

- Ativação do `Emblema de Madeira` podia não oferecer feedback de uso claro no mobile por falta de `minecraft:interact_button`.
- Botão do `Emblema de Madeira` permanecia como `Ativar` depois da ativação, sem refletir o estado ativo do Emblema.

### Notes

- `Pulso de Energia I` é a primeira habilidade ativa funcional; ainda não existem novas famílias de habilidades, mana separada, UI customizada ou sistema avançado.
- O `Emblema de Madeira` ativa tags e Energia de Fenda básica ao ser usado; técnicas dependem de Catalisadores e Pergaminhos compatíveis.
- A actionbar é o primeiro feedback visual simples do sistema de Energia de Fenda.
- A arquitetura de Catalisadores, Pergaminhos, Graus, XP, passivas e habilidades ativas ainda é planejamento; nenhum item, receita, script, mob, habilidade, projétil, efeito de dano, manifest ou UUID foi criado ou alterado nesta etapa de documentação.
- O `Cajado de Madeira` agora executa `Pulso de Energia I` quando usado com os requisitos corretos.
- O `Pergaminho Mágico: Pulso de Energia I` agora é requisito para lançar a habilidade, mas não é consumido.
- `Pulso de Energia I` custa 5 Energia de Fenda, tem cooldown de 20 ticks por jogador, causa 5 de dano em entidades válidas à frente e aplica repulsão horizontal normalizada.
- O pergaminho não é consumido ao lançar `Pulso de Energia I`.
- Nenhum item, receita, mob, projétil customizado, UI customizada ou UUID foi criado ou alterado nesta etapa de habilidade.
- Nenhuma receita, novo item, mob customizado, script, função, textura ou UUID foi criado ou alterado nesta etapa de rebalanceamento de loot.
- As loot tables de zumbi, esqueleto, aranha e creeper substituem os arquivos vanilla dos mesmos caminhos; os pools vanilla básicos foram reproduzidos e o drop de `Fragmento de Fenda` foi adicionado em pools separados.
- O `Livro do Perdido` ainda não é entregue automaticamente ao jogador; a entrega automática fica para uma etapa futura.
- Nenhuma receita, script, `tick.json`, função, mob, habilidade ou UUID foi criado ou alterado nesta etapa do livro.
- Nenhum item, receita, loot table, script, função, mob, habilidade ou UUID foi criado ou alterado nesta etapa de substituição de texturas.
- Nenhum item novo, mob customizado, script, função, `tick.json`, mana, habilidade, ativação de Emblema, textura ou UUID foi criado ou alterado nesta etapa de receita.
- A receita do `Emblema de Madeira` não usa lápis-lazúli, ametista, ferro ou recursos de mineração avançada.
- A ativação simples remove preventivamente tags de outros Emblemas e adiciona `riftborn_emblema_ativo` e `riftborn_emblema_madeira`.
- Um novo UUID foi criado apenas para o novo módulo de script; UUIDs existentes não foram alterados.
- Nenhum UUID foi alterado.
- A textura do `Fragmento de Fenda` ainda pode evoluir, mas já representa melhor o conceito de material mágico raro.
- Se o Minecraft Bedrock detectar duplicação ao importar novo build, a versão técnica pode precisar ser incrementada em uma etapa separada.
