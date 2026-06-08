# Regras para Agents do Riftborn

Este arquivo orienta agents que trabalham especificamente em `addons/riftborn/`.

## Identidade do projeto

- Nome: Riftborn: Crônicas do Novo Mundo.
- Tipo: Addon para Minecraft Bedrock Edition.
- Tema: RPG, isekai, fantasia medieval e dark fantasy leve.
- Namespace planejado: `riftborn`.
- Behavior Pack planejado: `Riftborn BP`.
- Resource Pack planejado: `Riftborn RP`.

## Regras obrigatórias

- Trabalhar apenas dentro de `addons/riftborn/` quando a tarefa for sobre Riftborn.
- Preservar o namespace `riftborn` em identificadores futuros.
- Separar arquivos de Behavior Pack e Resource Pack.
- Consultar `PROJECT_CONTEXT.md` antes de criar funcionalidades.
- Seguir `DEVELOPMENT_RULES.md` para padrões técnicos.
- Atualizar documentação relevante quando fizer mudanças importantes.
- Registrar mudanças implementadas em `CHANGELOG.md`.
- Considerar que a base técnica inicial já existe, com manifests e estrutura mínima de packs.
- Não recriar manifests nem alterar UUIDs existentes sem solicitação explícita.
- Não criar muitos arquivos de uma vez sem necessidade clara.
- Não criar funcionalidades fora do escopo pedido.

## Assets e placeholders

- Não criar assets finais quando a tarefa pedir apenas placeholders.
- Placeholders devem ser identificados como temporários na documentação quando forem introduzidos.
- Texturas, modelos, sons e ícones só devem ser criados quando forem explicitamente solicitados.

## Proibições sem escopo explícito

Mesmo com a base técnica inicial criada, não criar sem pedido claro:

- Itens.
- Receitas.
- Texturas.
- Scripts.
- Mobs.
- Loot tables.
- Funções.
- Sistemas de classes.
- UI customizada.
- Gameplay.
