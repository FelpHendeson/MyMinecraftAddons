# Regras de Desenvolvimento

Estas regras guiam a evolução técnica do Riftborn.

## Estado atual

O projeto está em documentação. Nenhum arquivo funcional de addon deve existir nesta etapa.

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

## Separação entre packs

- Behavior Pack deve conter comportamento, definições, receitas, loot tables, funções e scripts futuros.
- Resource Pack deve conter texturas, modelos, sons, textos de tradução e recursos visuais futuros.
- Não colocar textura no Behavior Pack.
- Não colocar lógica de comportamento no Resource Pack.

## Nesta etapa

Não criar:

- `manifest.json`.
- Itens.
- Receitas.
- Texturas.
- Scripts.
- Mobs.
- Loot tables.
- Funções.
- Arquivos funcionais de addon.
