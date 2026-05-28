# teste-senai

Projeto de testes automatizados com [Cypress](https://www.cypress.io/) para o sistema [Seu Barriga](https://seubarriga.wcaquino.me), desenvolvido durante o treinamento SENAI.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Cypress 15](https://www.cypress.io/)

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Configuração

Para rodar os testes de backend, crie o arquivo `cypress.env.json` na raiz do projeto:

```json
{
  "BACKEND_URL": "https://seubarriga.wcaquino.me",
  "FRONTEND_URL": "https://seubarriga.wcaquino.me/login",
  "USER": "seu-email@exemplo.com",
  "PASSWORD": "sua-senha"
}
```

> Este arquivo não deve ser versionado pois contém credenciais.

## Executando os testes

Abre a interface visual do Cypress:

```bash
npm run open
```

Executa todos os testes em modo headless:

```bash
npx cypress run
```

Executa apenas os testes de frontend:

```bash
npx cypress run --spec "cypress/e2e/frontend/**"
```

Executa apenas os testes de backend:

```bash
npx cypress run --spec "cypress/e2e/backend/**"
```

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── frontend/
│   │   ├── login.cy.js              # Testes E2E da tela de login
│   │   └── cadastrar-usuario.cy.js  # Testes E2E da tela de cadastro
│   └── backend/
│       └── login.cy.js              # Testes de API do endpoint de login
└── support/
    ├── e2e.js                       # Ponto de entrada do suporte
    ├── commands.js                  # Custom commands gerais
    ├── commands_login.js            # Custom commands de login
    └── locators/
        └── login.locators.js        # Seletores e textos da tela de login
```

## Cobertura de testes

### Frontend — Login (`login.cy.js`)

| Cenário | Resultado esperado |
|---|---|
| Exibe o formulário de login | Formulário com campos e botão visíveis |
| Login com sucesso | Alerta de boas-vindas e link "Sair" |
| Credenciais inválidas | Mensagem de erro |
| Login sem email | Mensagem "Email é um campo obrigatório" |
| Login sem senha | Mensagem "Senha é um campo obrigatório" |
| Login sem nenhum campo | Duas mensagens de erro |
| Email em formato inválido | Validação nativa do browser (`:invalid`) |

### Frontend — Cadastro (`cadastrar-usuario.cy.js`)

| Cenário | Resultado esperado |
|---|---|
| Cadastro com sucesso | Alerta de sucesso |
| Email já cadastrado | Alerta de erro |
| Campo nome em branco | Alerta de erro |
| Campo email em branco | Alerta de erro |
| Campo senha em branco | Alerta de erro |
| Todos os campos em branco | Alerta de erro |

### Backend — Login (`backend/login.cy.js`)

| Cenário | Status HTTP esperado |
|---|---|
| Login com sucesso | 200 + token JWT |
| Senha inválida | 401 |
| Usuário inexistente | 400 |
| Sem email no body | 500 |
| Sem senha no body | 401 |
