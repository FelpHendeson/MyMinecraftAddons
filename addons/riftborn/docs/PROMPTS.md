# Prompts do Riftborn

Este arquivo registra prompts específicos usados para planejar e desenvolver o addon Riftborn.

Prompts globais do workspace devem ficar em `docs/PROMPTS.md`.

## Template de registro

Use este formato para registrar novos prompts do Riftborn:

```md
## AAAA-MM-DD - Título curto

- Área: Riftborn.
- Objetivo:
- Arquivos afetados:
- Restrições:
- Resultado esperado:
- Observações:
```

## 2026-06-08 - Criação da estrutura base

- Área: Riftborn.
- Objetivo: criar documentação específica para `Riftborn: Crônicas do Novo Mundo`, um addon de Minecraft Bedrock com tema de RPG, isekai, fantasia medieval e dark fantasy leve.
- Arquivos afetados: documentação em `addons/riftborn/` e `addons/riftborn/docs/`.
- Restrições: criar somente estrutura e documentação; não criar `manifest.json`, itens, receitas, texturas, scripts ou mobs.
- Resultado esperado: projeto independente dentro de `addons/riftborn/`, com contexto, regras, roadmap e guias iniciais.
- Observações: a premissa define o jogador como um Riftborn trazido por uma fenda dimensional para um mundo antigo, fragmentado e cheio de criaturas, relíquias, guildas e ameaças.

## 2026-06-08 - Manifests e estrutura técnica inicial

- Área: Riftborn.
- Objetivo: criar a base técnica inicial do addon com os arquivos mínimos de Behavior Pack e Resource Pack.
- Arquivos afetados: `packs/behavior_pack/manifest.json`, `packs/resource_pack/manifest.json`, pastas reservadas dos packs, `textures/item_texture.json`, arquivos de idioma e documentação relacionada.
- Restrições: não criar itens customizados, receitas, loot tables funcionais, mobs, scripts funcionais, texturas finais ou gameplay.
- Resultado esperado: o addon passa a ter manifests válidos, dependência do Behavior Pack para o Resource Pack e estrutura mínima separada por pack.
- Observações: os diretórios internos usam `.gitkeep` apenas para versionar pastas vazias.

## 2026-06-08 - Primeiro item customizado

- Área: Riftborn.
- Objetivo: criar o primeiro item customizado do addon, `Fragmento de Fenda`.
- Arquivos afetados: `packs/behavior_pack/items/fragmento_de_fenda.json`, `textures/item_texture.json`, `textures/items/fragmento_de_fenda.png`, arquivos de idioma e documentação relacionada.
- Restrições: criar somente o item `riftborn:fragmento_de_fenda`; não criar receitas, loot tables, mobs, scripts de gameplay ou outros itens.
- Resultado esperado: validar o fluxo básico de item customizado no Minecraft Bedrock com stack 64, textura registrada e nomes localizados.
- Observações: a textura criada é placeholder transparente para teste inicial, não textura final.

## 2026-06-08 - Bump técnico para 0.1.1

- Área: Riftborn.
- Objetivo: incrementar a versão técnica dos manifests de `[0, 1, 0]` para `[0, 1, 1]` para permitir nova importação no Minecraft Bedrock mobile.
- Arquivos afetados: manifests do Behavior Pack e Resource Pack, `CHANGELOG.md`, `TECHNICAL_GUIDE.md` e este registro de prompt.
- Restrições: não alterar UUIDs, nomes, descrições, itens, receitas, mobs, scripts de gameplay ou estrutura dos packs.
- Resultado esperado: Behavior Pack, Resource Pack e dependência do BP apontando para o RP na versão `[0, 1, 1]`.
- Observações: ao importar novos builds no celular, versões repetidas com os mesmos UUIDs podem gerar erro de duplicação.
