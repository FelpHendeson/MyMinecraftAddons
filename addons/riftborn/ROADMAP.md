# Roadmap

Roadmap planejado para o desenvolvimento incremental do Riftborn.

O roadmap descreve visão futura. Ele não indica que as funcionalidades já existem.

## Versões planejadas

### v0.1 Base técnica

Status: iniciada, parcialmente concluída.

- Manifests iniciais criados.
- Estrutura mínima dos packs criada.
- Atlas vazio de itens e arquivos de idioma criados.
- Preparar empacotamento inicial.

### v0.2 Primeiros itens

Status: próxima etapa planejada.

- Criar itens simples para validar namespace e fluxo de teste.
- Evitar itens complexos ou sistemas dependentes de scripts.

### v0.3 Receitas iniciais

- Adicionar receitas simples para os primeiros itens.
- Testar integração com o mundo de sobrevivência.

### v0.4 Loot customizado

- Introduzir loot básico ligado à exploração.
- Manter recompensas simples e fáceis de ajustar.

### v0.5 Origem do jogador

- Definir a primeira camada narrativa do Riftborn.
- Criar elementos simples que comuniquem a chegada pela fenda.
- Planejar o `Emblema de Madeira` como primeiro vínculo do jogador com a Fenda.

### v0.6 Sistema de Emblemas inicial

- Adicionar progressão inicial baseada no `Emblema de Madeira`.
- Usar o identificador planejado `riftborn:emblema_de_madeira`.
- Tratar Rift/Fenda como fonte, energia ou fenômeno dimensional.
- Tratar Emblema como item físico central que canaliza a Energia de Fenda.
- Definir a regra de apenas um Emblema ativo por vez.
- Planejar persistência do Emblema ativo após morte e remoção do item físico.
- Planejar XP e níveis de Emblema.
- Planejar passivas globais concedidas por Emblemas.
- Evitar classes fixas como sistema principal.
- Evitar skill tree complexa.

### v0.7 Catalisadores e Pergaminhos iniciais

- Planejar Catalisadores como canal de execução de habilidades.
- Criar o Cajado de Madeira Grau I como primeiro Catalisador Mágico.
- Planejar Lâminas Mágicas como primeira família de lâmina.
- Criar o Pergaminho Mágico: Pulso de Energia I.
- Planejar Pergaminhos de Lâmina.
- Definir Graus I a V para Catalisadores, Pergaminhos e habilidades.
- Preparar o próximo passo do MVP com a execução de Pulso de Energia I.
- Evitar implementar muitas habilidades antes de validar a primeira.

### v0.8 Primeira habilidade mágica

- Implementar futuramente Pulso de Energia I usando Emblema ativo, Energia de Fenda, Cajado compatível e Pergaminho compatível.
- Validar custo, regeneração, cooldown e feedback visual simples.
- Manter o escopo sem árvore de habilidades completa.

### v0.9 Lâmina Mágica inicial

- Criar futuramente Lâmina Mágica Grau I a partir de espada vanilla.
- Criar futuramente Pergaminho de Lâmina: Corte Instável I.
- Validar que Lâminas Mágicas expandem espadas vanilla sem inutilizá-las.

### v0.10 Emblema de Cobre e caminhos

- Planejar o `Emblema de Cobre` como melhoria universal.
- Introduzir caminhos definidos pelo Emblema ativo.
- Preparar a transição futura para Emblemas de Ferro como início das especializações.
- Manter a progressão controlada.

### v0.11 Primeiro mob customizado

- Criar uma criatura simples para validar fluxo de mob customizado.
- Evitar muitos mobs na mesma versão.

### v0.12 Primeiro mini-chefe

- Criar um desafio maior, mas ainda limitado.
- Validar loot e balanceamento básico.

### v1.0 Capítulo 1: A Fenda

- Consolidar a primeira experiência jogável.
- Unir base técnica, primeiros itens, Sistema de Emblemas inicial e narrativa da Fenda.

## Progressão por Emblemas

Direção planejada:

- Emblema de Madeira: início universal.
- Emblema de Cobre: melhoria universal.
- Emblemas de Ferro: início das especializações.
- Emblemas avançados: caminhos mais específicos.
- Emblemas lendários: endgame.

O Emblema ativo deve definir o caminho ativo, técnicas disponíveis e benefícios futuros. Ativar um Emblema substitui o anterior, e benefícios de Emblemas diferentes não devem ser empilhados.

## Catalisadores, Pergaminhos e Graus

Direção planejada:

- Catalisadores executam habilidades, mas não substituem Emblemas.
- Cajados executam habilidades mágicas.
- Lâminas Mágicas executam habilidades de lâmina.
- Pergaminhos definem as habilidades ativas disponíveis.
- Graus I a V controlam custo, poder e efeitos.
- Habilidades de Grau I devem custar pouca Energia de Fenda, em média 5 pontos.

MVP recomendado:

1. Documentar o sistema.
2. Criar Cajado de Madeira Grau I.
3. Criar Pergaminho Mágico: Pulso de Energia I.
4. Implementar Pulso de Energia I.
5. Criar Lâmina Mágica Grau I.
6. Criar Pergaminho de Lâmina: Corte Instável I.

## Controle de escopo

Mudanças na ordem ou no conteúdo do roadmap devem ser registradas antes da implementação.
