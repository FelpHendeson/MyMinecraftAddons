# Regras de Desenvolvimento

Estas regras guiam a evolução técnica do Riftborn.

## Estado atual

Base técnica inicial criada, com manifests, estrutura mínima de Behavior Pack e Resource Pack, itens customizados simples, Script API mínima e Energia de Fenda básica.

Já existem manifests, atlas de itens, arquivos de idioma, pastas técnicas reservadas, itens customizados, loot tables, receita inicial, um script de ativação/desativação do `Emblema de Madeira` e um sistema básico de Energia de Fenda por scoreboard. Ainda não existem mobs customizados, funções, mana, habilidades, UI customizada, benefícios de combate ou sistemas avançados.

## Desenvolvimento incremental

- Implementar uma etapa pequena por vez.
- Validar cada mudança antes de avançar.
- Documentar decisões relevantes.
- Não adicionar sistemas avançados antes da base técnica.
- Não criar conteúdo fora do escopo solicitado.

## Namespace

- Namespace planejado: `riftborn`.
- Identificadores futuros devem seguir o padrão `riftborn:nome_do_recurso`.
- Não usar namespaces genéricos ou de outros addons.

## Convenção de nomes

- Usar nomes técnicos em minúsculo.
- Não usar acentos em nomes de arquivos, pastas ou identificadores técnicos.
- Preferir underscore para separar palavras: `fragmento_de_fenda`.
- Evitar espaços em nomes de arquivos técnicos.
- Documentação pode usar títulos em português com acentos.
- Usar `emblema` para itens físicos centrais de progressão.
- Manter `rift` e `fenda` para energia, fonte ou fenômeno dimensional.
- O primeiro emblema planejado deve usar o identificador `riftborn:emblema_de_madeira`.

## Regras de design para Emblemas

- Apenas um Emblema pode estar ativo por vez.
- Ativar um Emblema substitui o anterior.
- O Emblema ativo deve ser tratado como estado persistente do jogador.
- O Emblema ativo planejado deve sobreviver à morte e à remoção do item físico do inventário.
- O Emblema só deve ser desativado por ação manual do jogador ou pela ativação de outro Emblema.
- Emblemas podem ganhar XP e níveis em etapas futuras.
- Níveis de Emblema devem melhorar atributos extras ou passivas gradualmente.
- Benefícios só acumulam dentro da mesma linhagem de Emblemas.
- Não empilhar benefícios de Emblemas diferentes.
- Caminhos devem ser definidos pelo Emblema ativo, não por classe fixa.
- Não implementar técnicas, efeitos, mana, habilidades ou gameplay avançado sem uma etapa solicitada.
- A Energia de Fenda básica atual só pode manter valores de energia, regenerar até o máximo e exibir actionbar.

## Regras de design para Energia, Catalisadores e Pergaminhos

- Energia de Fenda é a energia do sistema e deve depender de Emblema ativo.
- Habilidades ativas futuras devem consumir Energia de Fenda.
- Catalisadores futuros executam habilidades, mas não substituem Emblemas.
- Cajados devem ser a família inicial de catalisadores mágicos.
- Lâminas Mágicas devem ser a família inicial de catalisadores de lâmina.
- Pergaminhos futuros definem habilidades ativas disponíveis.
- Pergaminhos devem ser compatíveis com o catalisador usado.
- Graus devem ir de I a V.
- Grau I deve ser a entrada do sistema e ter baixo custo de energia.
- Habilidades, custos, cooldowns, dano, projéteis e efeitos só devem ser implementados quando solicitados explicitamente.

## Regras para Script API

- Manter scripts pequenos, isolados e documentados.
- Usar Script API apenas quando componentes JSON simples não resolverem a etapa.
- Não criar arquitetura complexa antes de necessidade real.
- Não implementar loops, sistemas globais, mana, habilidades ou UI customizada sem escopo explícito.
- O loop atual permitido é apenas o de Energia de Fenda básica do `Emblema de Madeira`, com regeneração simples e actionbar.
- Não alterar UUIDs existentes; novos UUIDs só podem ser criados para novos módulos quando necessário.

## Padrão de arquivos

- Behavior Pack deve ficar em `packs/behavior_pack/`.
- Resource Pack deve ficar em `packs/resource_pack/`.
- Referências e materiais de apoio devem ficar em `assets/`.
- Arquivos exportados devem ficar em `dist/`.
- Documentação específica deve ficar na raiz do projeto ou em `docs/`.

## Regras para JSON futuro

- JSON deve ser válido e formatado de forma legível.
- Usar indentação consistente.
- Não deixar comentários dentro de arquivos JSON.
- Não duplicar identificadores.
- Manter nomes e caminhos alinhados com o namespace `riftborn`.

## Regras para UUIDs futuros

- UUIDs de manifests devem ser únicos.
- Não reutilizar UUIDs entre behavior pack, resource pack e módulos.
- Registrar ou revisar UUIDs quando manifests forem criados.
- Gerar novos UUIDs quando um pack independente exigir identidade própria.
- Não regenerar UUIDs de manifests existentes sem necessidade clara e solicitação explícita.

## Separação entre packs

- Behavior Pack deve conter comportamento, definições, receitas, loot tables, funções e scripts futuros.
- Resource Pack deve conter texturas, modelos, sons, textos de tradução e recursos visuais futuros.
- Não colocar textura no Behavior Pack.
- Não colocar lógica de comportamento no Resource Pack.

## Funcionalidades fora do escopo atual

Não criar:

- Itens.
- Receitas.
- Texturas.
- Mobs.
- Loot tables.
- Funções.
- Gameplay.

Esses arquivos só devem ser adicionados quando fizerem parte de uma etapa solicitada.
