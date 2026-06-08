# Fluxo Geral de Trabalho

Este é o fluxo base para desenvolver e testar addons de Minecraft Bedrock neste workspace.

## Ciclo principal

1. Desenvolver o addon no PC, dentro da pasta correta em `addons/nome_do_addon/`.
2. Empacotar o behavior pack e/ou resource pack como `.mcpack` ou `.mcaddon`, conforme a etapa do projeto.
3. Enviar o arquivo exportado para o celular.
4. Abrir o arquivo com Minecraft Bedrock.
5. Ativar o pack no mundo de teste.
6. Testar o comportamento dentro do jogo.
7. Corrigir problemas encontrados no PC.
8. Repetir o ciclo até a alteração funcionar como esperado.

## Boas práticas

- Usar sempre um mundo de teste separado.
- Fazer mudanças pequenas para facilitar identificação de erro.
- Registrar mudanças relevantes no `CHANGELOG.md` do addon.
- Validar nomes, namespaces e estrutura antes de empacotar.
- Não misturar arquivos de projetos diferentes.

## Observação

Este fluxo é geral. Cada addon pode ter instruções próprias em sua documentação local.
