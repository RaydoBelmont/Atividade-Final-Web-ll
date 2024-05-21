# Servidor WebSocket

Este projeto é um servidor WebSocket básico usando Node.js e a biblioteca `ws`.

## Pré-requisitos

Antes de iniciar, certifique-se de ter o Node.js e o npm instalados em sua máquina. Para verificar, execute os comandos:

```bash
node -v
npm -v

Se eles não estiverem instalados, faça o download e instale o Node.js do site oficial.

## Configuração

Clone o repositório para a sua máquina local usando:

git clone https://github.com/RaydoBelmont/Atividade-Final-Web-ll.git

Navegue até a pasta do projeto e instale as dependências necessárias com:

npm install

## Iniciando o Servidor

Para iniciar o servidor, execute:

node server.js

O servidor agora estará rodando e ouvindo na porta definida (por padrão 3000). Você pode conectar-se ao servidor WebSocket usando um cliente WebSocket de sua escolha.

## Estrutura do Projeto

O projeto está estruturado da seguinte maneira:

- `src/`: Código-fonte do servidor.
- `public/`: Arquivos estáticos acessíveis ao público.
- `views/`: Arquivos de template ou HTML.
- `server.js`: Arquivo principal do servidor WebSocket.
- `.env`: Arquivo para armazenar variáveis de ambiente.