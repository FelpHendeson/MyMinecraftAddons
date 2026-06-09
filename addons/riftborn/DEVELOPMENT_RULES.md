# Regras de Desenvolvimento

Estas regras guiam a evolução técnica do Riftborn.

## Estado atual

Base técnica inicial criada, com manifests, estrutura mínima de Behavior Pack e Resource Pack, itens customizados simples e Script API mínima.

Já existem manifests, atlas de itens, arquivos de idioma, pastas técnicas reservadas, itens customizados, loot tables, receita inicial e um script mínimo de ativação do `Emblema de Madeira`. Ainda não existem mobs customizados, funções, mana, habilidades, UI customizada, benefícios de combate ou sistemas avançados.

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
- Benefícios só acumulam dentro da mesma linhagem de Emblemas.
- Não empilhar benefícios de Emblemas diferentes.
- Caminhos devem ser definidos pelo Emblema ativo, não por classe fixa.
- Não implementar técnicas, efeitos, mana, habilidades ou gameplay avançado sem uma etapa solicitada.
- A ativação simples atual só pode marcar tags e enviar mensagem.

## Regras para Script API

- Manter scripts pequenos, isolados e documentados.
- Usar Script API apenas quando componentes JSON simples não resolverem a etapa.
- Não criar arquitetura complexa antes de necessidade real.
- Não implementar loops, sistemas globais, mana, habilidades ou UI customizada sem escopo explícito.
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
