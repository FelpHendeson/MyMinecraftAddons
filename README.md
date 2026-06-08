# myAddons

`myAddons` é um workspace para organizar múltiplos projetos de addons para Minecraft Bedrock Edition.

O repositório não pertence a um único addon. Ele deve guardar ideias, documentação, referências, templates, ferramentas reutilizáveis e projetos independentes, mantendo cada iniciativa separada desde o início.

## Organização dos addons

Cada addon deve ficar em uma pasta própria dentro de `addons/`:

- `addons/riftborn/`: primeiro addon ativo do workspace.
- `addons/nome_do_addon/`: padrão para futuros projetos.

Arquivos funcionais de um addon, quando existirem, devem ficar somente dentro da pasta do próprio projeto. Nenhum addon deve colocar manifests, itens, receitas, texturas, scripts, mobs ou packs diretamente na raiz do repositório.

## Áreas do workspace

- `docs/`: documentação geral do workspace, como ideias, fluxo de trabalho e prompts reutilizáveis.
- `addons/`: projetos independentes de addons.
- `shared/`: referências, templates e ferramentas que podem ser reutilizados por mais de um addon.

## Projeto ativo inicial

O primeiro projeto ativo é `riftborn`, localizado em `addons/riftborn/`.

Riftborn tem documentação própria e regras específicas. Antes de trabalhar nele, consulte `addons/riftborn/AGENTS.md` e os documentos de contexto do projeto.
