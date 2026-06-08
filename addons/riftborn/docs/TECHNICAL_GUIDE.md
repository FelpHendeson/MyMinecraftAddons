# Guia Técnico

Este guia registra decisões técnicas planejadas para o Riftborn. Nenhum arquivo funcional de addon foi criado nesta etapa.

## Identidade planejada

- Namespace: `riftborn`
- Behavior Pack: `Riftborn BP`
- Resource Pack: `Riftborn RP`

## Organização planejada

- `packs/behavior_pack/`: arquivos de comportamento do addon.
- `packs/resource_pack/`: arquivos visuais e de recursos do addon.
- `assets/`: referências e materiais de apoio.
- `dist/`: exports `.mcpack` ou `.mcaddon` gerados futuramente.

## Regras técnicas

- Manter nomes técnicos em minúsculo, sem acento e preferencialmente com underscore.
- Usar o namespace `riftborn` para identificadores futuros.
- Validar mudanças em um mundo de teste do Minecraft Bedrock.
- Criar conteúdo funcional apenas quando solicitado.
- Registrar decisões relevantes nos documentos do projeto.

## Empacotamento futuro

Quando houver arquivos funcionais, o projeto poderá ser exportado como `.mcpack` ou `.mcaddon` para teste no Minecraft Bedrock.
