# Tech Challenge Fase 03 - Gerenciamento financeiro com Swift Bank

## Visão Geral do Projeto

Este projeto foi desenvolvido como parte do terceiro Tech Challenge da FIAP para a pós-graduação em Front-end Engeneering. O Swift Bank é um aplicativo financeiro desenvolvido com o objetivo de ajudar usuários no controle e gestão de suas finanças pessoais.

O protótipo das telas está disponível no [Figma](https://www.figma.com/design/fXYzzALNGyWgQf1YoNtjJe/Swift-Bank--Acervo---Fa%C3%A7a-uma-c%C3%B3pia-?node-id=0-1&p=f&t=IjwcB59zc19hC3Lu-0).

## Principais Funcionalidades

### **Página Home**
- Criar cadastro
- Fazer login
- Recuperar a senha

- ### **Página Inicial**
- Navegação em stack
- Apresenta as informações de cada usuário(a) de acordo com o e-mail cadastrado
- Exibe um extrato com as últimas transações realizadas
- Gráfico mostra a quantidade e os tipos de transação
- Oferece áreas para realizar transações do tipo: Pix, Depósito e Transferência

## Instruções para Execução

### **Pré-requisitos**
1. Certifique-se de ter o **Node.js**. As versões usadas neste projeto foram: Node (22.14.0) e npm (10.9.2).
   - É recomendado usar o `nvm` para gerenciar as versões do Node.js.
   - Antes de prosseguir, execute `nvm use` (e, caso necessário, `nvm install` e novamente `nvm use`).

2. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. criar um arquivo `.env` com as informações da API do Firebase;
5. Rodar projeto com o comando:
   ```bash
   npm run start
   ```

 ## Tecnologias  e metodologias aplicadas:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [date-fns](https://date-fns.org/)
- [React Nativte Chart Kit](https://www.npmjs.com/package/react-native-chart-kit)
- [StyleSheet](https://reactnative.dev/docs/stylesheet)
- [DDD simplificado](https://medium.com/beelabacademy/domain-driven-design-vs-arquitetura-em-camadas-d01455698ec5)

## Estatégia de Branch
A branching strategy que seguiremos, utilizará somente 2 branches principais,
uma de desenvolvimento, onde colocaremos todas as novas funcionalidades, receberá
todas as correções e será utilizada para testes antes de enviar para a branch main (produção).

Exemplo de fluxo de branches:
branch_local -> PR -> branch_dev -> Testes -> branch_main (prod)

## Fluxo do Git

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

---

Este documento foi criado para fornecer orientações claras sobre o projeto Bytebank e sua execução.
