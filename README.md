# Projeto Swift Bank - Expo App

## Branching Strategy

A branching strategy que seguiremos, utilizará somente 2 branches principais,
uma de desenvolvimento, onde colocaremos todas as novas funcionalidades, receberá
todas as correções e será utilizada para testes antes de enviar para a branch main (produção).

Exemplo de fluxo de branches:
branch_local -> PR -> branch_dev -> Testes -> branch_main (prod)

## Gitflow

### Novas Features: 
*Commit*
feat: adiciona funcionalidade x

### Alteração de Código Existente (Refactor):
*Commit*
refactor: altera funcionalidade x

### Resolvendo Problemas (bugfix)
*Commit*
fix: resolve problema y

### Adicionando / Alterando Configurações de(o) Ferramentas/Projeto
*Commit*
chore: adiciona ferramenta X
chore: altera configuração y
chore: resolve problema da configuração z