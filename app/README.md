## 📃 Sobre

Este repositório contém uma api desenvolvida em nodejs com o framework express, que servirá de base para nossas futuras aplicações.
Possui configuração básica para iniciar um novo projeto nos moldes adotados, com as configurações de editor de código, testes automatizados e também uma ferramenta de análise da qualidade de código.

#### Documentação Técnica ➡ [**AQUI**](http://192.168.28.2:3330/tiago.ferreira/modelo-API/wiki/_pages).

<br />

## 🔨 Tecnologias
Este projeto foi desenvolvido com as seguintes tecnologias:

- Express
- Jwt
- Jest
- Visual Studio Code com EditorConfig, ESLint e Prettier
- Swagger

#### Para saber mais sobre as ferramentas usadas no projeto, clique ➡ [**AQUI**](http://192.168.28.2:3330/tiago.ferreira/modelo-API/wiki/1.-Ferramentas).

<br />

## 📚 Requisitos para rodar servidor
Ter Git para clonar o projeto.
Ter Node.js instalado.

<br />

## 🚀 Começando

<br />

## Clonar o projeto:

- https://github.com/marcellofumero/modelo-api-node.git


### Instalar as dependências na raiz do projeto:

```
npm install
```
<br />

## ⚙️ Configurar o Editor

### Instalando as extenções e estilos

#### Estilos

- Dracula Official - Tema do vs code

- Material Icon Theme - Tema para simbolizar as pastas e arquivos de acordo com seu tipo

- Fonte Fira Code - https://github.com/tonsky/FiraCode

- Copie e cole o código "settingsvscode.json" para o arquivo do VS Code "settings.json"(**Instruções** ➡ [**AQUI**](http://192.168.28.2:3330/tiago.ferreira/modelo-API/wiki/7.-C%C3%B3digos-de-Refer%C3%AAncia)).

<br />

#### Extenções Necessárias

- EditorConfig for VS code - extenção para configuração do editor

- Eslint - extenção para configuração do style-guide de fonte

- Prettier - extenção para formatação do fonte seguindo o style-guide

- Swagger Viewer - extensão para visualizar a documentação swagger direto do VS Code

- PlantUML - extensão para visualizar e gerar arquivos de documentação .puml

- Draw.io Integration - extensão para leitura e geração de fluxogramas

#### Para saber mais sobre as ferramentas usadas no projeto, clique ➡ [**AQUI**](http://192.168.28.2:3330/tiago.ferreira/modelo-API/wiki/1.-Ferramentas).

<br />

## 🎬 Iniciando Servidor


### Modo Produção
```
npm run prod
```
### Modo Hml
```
npm run hml
```
### Modo Dev
```
npm run dev
```
### Modo Dev Fast Refresh
```
npm start
```

<br />

## 🧪 Executar Testes

### Jest
```
npm test
```

Para acompanhar a cobertura dos testes com Jest, você pode iniciar o servidor e acessar o endpoint "**/test**" ou abrir o arquivo "**coverage/Icov-report/index.html**".

##### Links Importantes

- [Documentação](https://jestjs.io/pt-BR/docs/getting-started)
- [Configuração](https://jestjs.io/pt-BR/docs/configuration)

<br />

## 💬 Padronização de Commits

### git-commit-msg-linter

Um gancho git "commit-msg" para lintar sua mensagem git commit contra o popular Angular **Commit Message Guidelines**. Como um gancho, ele será executado a antes da confirmação de cada commit para garantir que a mensagem a ser enviada seja válida de acordo com as convenções. Caso contrário, o commit será abortado.

Você encontra um guia completo dos padrões de commit ➡ [**AQUI**](http://192.168.28.2:3330/tiago.ferreira/modelo-API/wiki/6.-Git-Sem%C3%A2ntico).
