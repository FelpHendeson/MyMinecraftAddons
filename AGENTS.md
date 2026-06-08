# Regras Globais para Agents

Este repositório é um workspace para múltiplos addons de Minecraft Bedrock. Antes de alterar qualquer arquivo, identifique qual addon, documento ou área compartilhada está sendo modificada.

## Regras gerais

- Sempre identificar qual addon está sendo alterado.
- Nunca criar arquivos funcionais de addon diretamente na raiz do repositório.
- Preservar a separação entre projetos dentro de `addons/`.
- Trabalhar de forma incremental e com escopo claro.
- Não criar funcionalidades fora do escopo pedido.
- Não misturar contexto, documentação, assets ou packs de um addon com outro.
- Consultar o `AGENTS.md` específico do addon quando ele existir.
- Usar `shared/` apenas para referências, templates e ferramentas reutilizáveis.
- Manter a documentação em português.
- Preferir nomes técnicos em minúsculo, sem acento e com underscore quando novos arquivos técnicos forem criados.

## Organização

- Addons independentes devem ficar em `addons/nome_do_addon/`.
- Documentação geral do workspace deve ficar em `docs/`.
- Recursos reutilizáveis devem ficar em `shared/`.
- Arquivos de pack, scripts, itens, receitas, texturas, mobs e manifests só devem ser criados dentro do addon correto e quando forem explicitamente solicitados.
