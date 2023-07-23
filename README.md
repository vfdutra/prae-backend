Aqui está uma versão revisada da documentação para a API SATIE(PRAE):

# API SATIE(PRAE)

Esta API foi criada usando AdonisJS 5 com TypeScript e usa PostgreSQL como seu banco de dados.

## Começando

### Pelo Google Drive

Para iniciar a API a partir dos arquivos fornecidos na pasta do Google Drive, navegue até o diretório `prae-backend` e execute o comando `node ace serve --watch` no seu terminal. Isso iniciará um servidor local na porta 3333, que pode ser acessado em http://localhost:3333/.

### Pelo GitHub

Para iniciar a API a partir do repositório do GitHub, clone-o para o diretório de sua preferência. Em seguida, execute o comando `npm install` para instalar as dependências do projeto. Depois disso, execute o comando `node ace serve --watch` para iniciar um servidor local na porta de sua preferência (o padrão é 3333).

## Configurando o Banco de Dados

No repositório, há um arquivo chamado `.env-example` que contém alguns parâmetros pré-preenchidos e outros que precisam ser preenchidos. Copie este arquivo e cole-o em um novo arquivo chamado `.env`. Em seguida, preencha os valores necessários para o seu banco de dados. Por padrão, o módulo usado é `pg` para PostgreSQL. Se você quiser usar um tipo diferente de servidor, precisará executar o comando `node ace configure @adonisjs/lucid` e selecionar a opção `mysql`.

## Usando a API

Depois de completar todos esses requisitos, você poderá usar a API. Há um arquivo anexado chamado `Insomnia.json` que pode ser importado para o software Insomnia para testar APIs. Este arquivo contém todas as rotas fornecidas pela API, juntamente com alguns parâmetros para teste.

Espero que esta versão revisada seja mais clara e concisa! Há algo mais em que eu possa ajudar?