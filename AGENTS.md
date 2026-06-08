# Regras Globais para Agents

Este arquivo define regras para qualquer agent que trabalhe no workspace `myAddons`.

O repositório contém múltiplos addons. A prioridade é preservar a separação entre projetos, documentação geral e recursos compartilhados.

## Antes de alterar arquivos

- Identifique qual área será alterada: workspace, `shared/` ou um addon específico.
- Se a tarefa for sobre um addon, identifique o addon alvo antes de editar.
- Procure e leia o `AGENTS.md` específico do addon quando ele existir.
- Confirme se a mudança pedida é documentação, estrutura, conteúdo funcional ou distribuição.

## Regras de escopo

- Não criar arquivos funcionais de addon diretamente na raiz.
- Não misturar arquivos, contexto ou documentação de addons diferentes.
- Não criar funcionalidades fora do escopo pedido.
- Trabalhar incrementalmente, com mudanças pequenas e verificáveis.
- Separar documentação geral em `docs/` e documentação específica dentro do addon correspondente.
- Usar `shared/` apenas para referências, templates e ferramentas reutilizáveis.

## Convenções

- Manter a documentação em português.
- Para arquivos técnicos futuros, preferir nomes em minúsculo, sem acento e com underscore.
- Não assumir que uma funcionalidade existe se ela estiver apenas planejada.
- Diferenciar claramente visão futura, escopo inicial, fora do escopo, regras técnicas e roadmap.

## Arquivos funcionais

Manifests, itens, receitas, texturas, scripts, mobs, loot tables e funções só devem ser criados quando forem explicitamente solicitados e sempre dentro do addon correto.
