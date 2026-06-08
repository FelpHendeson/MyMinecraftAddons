# Guia Técnico

Este guia registra decisões técnicas planejadas para o Riftborn. Nenhum arquivo funcional de addon foi criado nesta etapa.

## Behavior Pack

O Behavior Pack deve conter regras e comportamento do addon.

Conteúdos futuros possíveis:

- Manifests.
- Itens.
- Receitas.
- Loot tables.
- Funções.
- Scripts.
- Entidades customizadas.

Esses arquivos ainda não existem e só devem ser criados quando solicitados.

## Resource Pack

O Resource Pack deve conter recursos visuais e de apresentação.

Conteúdos futuros possíveis:

- Texturas.
- Modelos.
- Sons.
- Textos de tradução.
- Ícones.

Esses arquivos ainda não existem e só devem ser criados quando solicitados.

## Estrutura esperada

- `packs/behavior_pack/`: behavior pack futuro.
- `packs/resource_pack/`: resource pack futuro.
- `assets/`: referências e materiais de apoio.
- `dist/`: arquivos exportados para teste e distribuição.
- `docs/`: documentação de design, módulos, prompts e guia técnico.

## Namespace

- Namespace planejado: `riftborn`.
- Identificadores futuros devem seguir `riftborn:nome_do_recurso`.
- Não usar namespaces de outros projetos.

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

## Validações antes de testar

- Confirmar que os arquivos estão no pack correto.
- Validar JSON quando houver arquivos JSON.
- Conferir namespace `riftborn`.
- Confirmar que UUIDs futuros são únicos.
- Verificar se a mudança está dentro do escopo da versão.
- Atualizar documentação e changelog quando necessário.
