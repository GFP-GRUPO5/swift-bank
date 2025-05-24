# Projeto Swift Bank - Expo App
Swift Bank é um aplicativo financeiro desenvolvido com o objetivo de ajudar usuários no controle e gestão de suas finanças pessoais.

Este projeto foi criado como parte de um trabalho acadêmico para a pós-graduação da FIAP.

🚀 Tecnologias utilizadas
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)

 Funcionalidades
- Extrato de transações
- Área Pix
- Cartões.
- Transferências e Depósitos
- Investimentos

Área Logada e Área não logada
Você realiza o seu cadastro com suas informações pessoais e a partir de sua autenticação ele é carregado trazendo seu hisórico de transações e cartões já cadastrados previamente.



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
