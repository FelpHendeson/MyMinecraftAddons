# GDD - Game Design Document

Este documento descreve a visão de design do Riftborn. Ele registra intenção e direção, não implementação atual.

## Resumo

Riftborn: Crônicas do Novo Mundo é um addon de RPG para Minecraft Bedrock Edition inspirado em isekai, fantasia medieval e dark fantasy leve.

O jogador assume o papel de um Riftborn, alguém transportado por uma fenda dimensional para um mundo antigo, fragmentado e perigoso.

## Fantasia principal

O jogador deve sentir que chegou a um mundo desconhecido e precisa conquistar um lugar nele, evoluindo de sobrevivente perdido para aventureiro reconhecido.

## Experiência desejada

- Explorar lugares perigosos em busca de recursos, loot e pistas narrativas.
- Encontrar relíquias, equipamentos e materiais ligados ao mundo antigo.
- Sentir progressão sem perder a liberdade do Minecraft.
- Descobrir a história em fragmentos, não por longos textos obrigatórios.

## Loop principal

1. Explorar o mundo.
2. Encontrar ameaças, recursos ou pistas.
3. Obter loot e materiais.
4. Melhorar equipamentos ou desbloquear progresso.
5. Enfrentar desafios maiores.
6. Retornar à exploração com novas possibilidades.

## Tom do jogo

O tom deve ser de fantasia medieval com mistério e perigo moderado. A dark fantasy deve aparecer em ruínas, criaturas, relíquias e ameaças, sem transformar o projeto em terror pesado.

## Pilares

- Progressão gradual.
- Exploração recompensadora.
- Equipamentos com identidade.
- Emblemas como símbolo de despertar, vínculo e autoridade do jogador.
- Lore fragmentada.
- Ameaças crescentes.
- Sistemas simples antes de sistemas complexos.

## Sistema de Emblemas

O Emblema é o item físico central do jogador. Ele canaliza a Energia de Fenda, representa o despertar do jogador como Riftborn e estabelece o vínculo inicial com o fenômeno dimensional da Fenda.

Rift e Fenda devem ser tratados como fonte, energia ou fenômeno. Emblema deve ser usado para o item carregado, ativado e evoluído pelo jogador.

Regras planejadas:

- Apenas um Emblema pode estar ativo por vez.
- Ativar um Emblema substitui o anterior.
- O Emblema ativo deve persistir após a morte.
- O Emblema ativo deve persistir mesmo se o item físico sair do inventário.
- O Emblema só deve ser desativado por ação manual do jogador ou pela ativação de outro Emblema.
- O Emblema desbloqueia Energia de Fenda.
- O Emblema ganha XP ao matar monstros.
- O Emblema sobe de nível.
- Cada nível melhora atributos extras ou passivas concedidas pelo Emblema.
- O Emblema ativo define o caminho ativo, técnicas disponíveis e benefícios futuros.
- Benefícios só acumulam dentro da mesma linhagem de Emblemas.
- Benefícios de Emblemas diferentes não devem ser empilhados.
- O jogador começa sem classe fixa.

## Energia de Fenda

Energia de Fenda é a energia usada pelo sistema de habilidades. Ela só deve existir quando o jogador possuir um Emblema ativo.

Direção planejada:

- Habilidades ativas consomem Energia de Fenda.
- Emblemas melhores podem ter mais energia máxima.
- Emblemas melhores podem ter regeneração maior.
- Emblemas melhores podem usar a energia com mais eficiência.
- Emblemas fracos podem usar habilidades de grau alto, mas de forma pouco eficiente.
- O sistema deve começar com valores simples antes de balanceamento avançado.

## Catalisadores

Catalisadores são itens futuros usados para lançar habilidades ativas. Eles não substituem o Emblema; o Emblema define o vínculo e a Energia de Fenda, enquanto o Catalisador executa a técnica.

Famílias iniciais planejadas:

- Cajados: catalisadores mágicos.
- Lâminas Mágicas: catalisadores de lâmina.

Regras planejadas:

- Catalisadores possuem graus de I a V.
- Tipos diferentes de catalisador permitem builds diferentes.
- Catalisadores podem conceder passivas especiais.
- Catalisadores devem expandir equipamentos existentes sem invalidar a progressão vanilla.

### Cajados

Cajados são catalisadores mágicos. Eles devem ser craftados futuramente com gravetos, materiais progressivos e Fragmentos de Fenda.

Primeiro cajado:

- `Cajado de Madeira`: Catalisador Mágico de Grau I.
- Função planejada: lançar Pergaminhos Mágicos de Grau I.
- Estado atual: item, textura, tradução e receita criados; ainda sem habilidade ativa.

Variações planejadas:

- Cajado Condutor: menor custo de energia.
- Cajado Instável: mais dano, mais custo.
- Cajado Rúnico: efeitos especiais.
- Cajado Vital: utilidade ou defesa.

### Lâminas Mágicas

Lâminas Mágicas são catalisadores de lâmina criados a partir de espadas vanilla. Elas não devem inutilizar as espadas do Minecraft; devem expandi-las.

Variações planejadas:

- Lâmina Condutora: menor custo de energia.
- Lâmina Pesada: mais dano, maior cooldown.
- Lâmina Rápida: menor cooldown, menor dano.
- Lâmina Instável: mais dano, maior consumo.

## Pergaminhos

Pergaminhos definem as habilidades ativas disponíveis para o jogador. O jogador deve precisar de um pergaminho compatível para usar a habilidade correspondente.

Famílias planejadas:

- Pergaminhos Mágicos.
- Pergaminhos de Lâmina.

Regras planejadas:

- Cada pergaminho possui grau.
- O pergaminho precisa ser compatível com o catalisador usado.
- O sistema deve futuramente definir prioridade de seleção.
- Sugestão inicial: detectar pergaminhos compatíveis na hotbar antes do inventário.

Primeiro pergaminho:

- `Pergaminho Mágico: Pulso de Energia I`: Pergaminho Mágico de Grau I.
- Técnica registrada: `Pulso de Energia I`.
- Função planejada: permitir futuramente que o `Cajado de Madeira` lance a primeira habilidade mágica ofensiva.
- Parâmetros planejados da habilidade: custo 5 Energia de Fenda, cooldown 20 ticks, dano 5 e repulsão horizontal normalizada de aproximadamente 2 blocos.
- Estado atual: item, textura, tradução e receita criados; ainda sem execução de habilidade.

## Graus

Graus representam tiers de Catalisadores, Pergaminhos e habilidades. Eles vão de I a V.

Direção planejada:

- Grau I é inicial e custa pouca Energia de Fenda.
- Habilidades de Grau I custam em média 5 Energia de Fenda.
- Graus II a V aumentam custo, poder e efeitos.
- Habilidades de grau alto podem ser usadas com Emblema fraco, mas devem consumir energia de forma pesada.

## Habilidades ativas

Habilidades ativas são executadas por Catalisadores usando Pergaminhos compatíveis.

Primeiras habilidades planejadas:

- Pulso de Energia I: primeira habilidade mágica.
- Corte Instável I: primeira habilidade de lâmina.

Essas habilidades são planejamento de design. Elas ainda não estão implementadas.

## Passivas

Passivas devem vir de duas fontes principais:

- Emblemas: passivas globais ligadas ao progresso do jogador.
- Catalisadores: passivas de build ligadas ao tipo de execução.

Níveis de Emblema devem melhorar passivas gradualmente. As primeiras passivas devem ser simples e crescer em etapas pequenas.

## Primeiro Emblema

Nome: `Emblema de Madeira`.

Identificador planejado: `riftborn:emblema_de_madeira`.

Função: primeiro emblema universal do jogador.

Material: madeira e Fragmentos de Fenda.

O `Emblema de Madeira` não representa uma classe. Ele serve como o primeiro vínculo do jogador com a Fenda, já possui Energia de Fenda básica no estado atual e deve desbloquear futuramente técnicas básicas universais.

## MVP recomendado

Sequência recomendada para validar a nova arquitetura:

1. Documentar o sistema de Emblemas, Catalisadores, Pergaminhos, Graus, Energia de Fenda, XP e passivas.
2. Criar o Cajado de Madeira Grau I.
3. Criar o Pergaminho Mágico: Pulso de Energia I.
4. Implementar futuramente Pulso de Energia I usando Cajado, Pergaminho e Emblema ativo.
5. Criar futuramente a Lâmina Mágica Grau I.
6. Criar futuramente o Pergaminho de Lâmina: Corte Instável I.

## Caminhos planejados

Caminhos são definidos pelo Emblema ativo, não por classe fixa. Eles são visão futura e não fazem parte do escopo inicial.

Possíveis caminhos:

- Caminho da Lâmina: combate direto e equipamentos resistentes.
- Caminho Arcano: relíquias, magia e conhecimento antigo.
- Caminho da Precisão: mobilidade, exploração e ataques à distância.
- Caminho das Sombras: furtividade, risco e técnicas oportunistas.
- Caminho do Sobrevivente: resistência, coleta e adaptação.

## Progressão planejada

A progressão deve começar simples. Antes de skill tree ou caminhos completos, o projeto deve validar itens, receitas, loot e recompensas básicas.

Possíveis camadas futuras:

- Emblema de Madeira como início universal.
- Emblema de Cobre como melhoria universal.
- Emblemas de Ferro como início das especializações.
- Emblemas avançados como caminhos mais específicos.
- Emblemas lendários como progressão de endgame.
- Equipamentos por caminho.
- Materiais raros.
- Recompensas de dungeons.
- Relíquias com efeitos especiais.
- Origem e reputação do jogador.

## Primeiro arco narrativo

Capítulo 1: A Fenda.

O primeiro arco deve apresentar a origem do Riftborn, sinais de uma fenda dimensional e os primeiros indícios de que o mundo antigo está fragmentado por forças maiores.
