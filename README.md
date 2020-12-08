# Projeto de estão de Projetos & Qualidade de Software

## Universidade Federal de São Carlos

#### Integrantes

- Bernardo Camargo [@bernardocamargo](https://github.com/bernacamargo)
- Felipe
- Giuliano

#### Objetivo

objetivo é que ao fim do projeto, tenhamos uma aplicação bem desenvolvida e bem estruturada, sem gargalos durante sua produção e sem problemas, com um acompanhamento preciso do que está acontecendo em cada fase de entrega do aplicativo e que ofereça ao usuário, uma boa usabilidade.

#### Descrição

A Diretoria Store irá conter as principais funcionalidades de um E-Commerce como login, cadastro de usuário, carrinho de compras e irá conectar com um banco de dados que simula e armazena dados de uma ERP responsável pela parte administrativa do aplicativo. 
Desta maneira, teremos um aplicativo E-Commerce que visa promover ao usuário a facilidade de realizar a visualização e aquisição de produtos por meio de um dispositivo mobile. 

## Setup do sistema

#### Banco de dados

Crie um banco de dados utilizando o MySQL e coloque o nome que desejar.

#### Configurar o ambiente

Crie o arquivo .env na raiz do projeto e configure seguindo o modelo do arquivo já existente `.env`. 
Atente-se a configurar corretamente as credenciais de acesso a banco de dados.

#### Gere uma APP_KEY

```js
adonis generate:key
```

#### Migrations

Rode o seguinte comando para executar as migrations.

```js
adonis migration:run
```