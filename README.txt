# Quiz Game com WebSocket e Socket.io

## Descrição
Este é um projeto de exemplo de um jogo de quiz em tempo real, utilizando WebSocket com a biblioteca Socket.io. O projeto inclui um servidor básico que aceita conexões de clientes, envia perguntas com imagens, recebe respostas e mantém a pontuação dos jogadores.

## Estrutura de Pastas
quiz-game/
├── src/
│ ├── index.js # Código do servidor Node.js
│ ├── config.js # Arquivo de configuração
│ ├── perguntas.json # Arquivo com perguntas e respostas
├── public/
│ ├── index.html # Página HTML do cliente
│ ├── styles.css # CSS para estilização básica
│ ├── client.js # JavaScript para conexão com o servidor WebSocket
├── README.txt # Este arquivo


## Configuração
### Dependências
- Node.js
- Socket.io

### Instalando Dependências
Para instalar as dependências do projeto, execute o comando:
npm install

### Executando o Servidor
Para iniciar o servidor, execute o comando:
node src/index.js

O servidor será iniciado e estará disponível na porta definida no arquivo `config.js`.

## Estrutura dos Arquivos

### src/index.js
Este arquivo contém o código do servidor, configurando a conexão WebSocket com os clientes, enviando perguntas, recebendo respostas e atualizando a pontuação dos jogadores.

### config.js
Este arquivo contém as configurações do servidor, como a porta na qual o servidor será executado.

### perguntas.json
Este arquivo contém as perguntas do quiz, opções de resposta, a resposta correta e URLs de imagens associadas.

### public/index.html
Este arquivo contém a estrutura HTML da página do cliente, que inclui contêineres para mensagens de boas-vindas, perguntas, opções, feedback e pontuações.

### public/styles.css
Este arquivo contém estilos CSS básicos para a página do cliente, garantindo uma aparência consistente para o jogo, incluindo o tamanho padronizado das imagens.

### public/client.js
Este arquivo contém o código JavaScript do cliente, que gerencia a conexão com o servidor WebSocket, exibe perguntas e imagens, envia respostas e atualiza a interface do usuário com feedback e pontuações.

## Recursos do Projeto

- **Conexão WebSocket**: Conexão em tempo real entre o servidor e os clientes usando Socket.io.
- **Perguntas com Imagens**: Perguntas do quiz com opções de resposta e imagens associadas.
- **Pontuação em Tempo Real**: Atualização e exibição da pontuação dos jogadores em tempo real.
- **Feedback de Respostas**: Feedback imediato sobre a correção das respostas enviadas pelos jogadores.

## Como Jogar
1. Abra o arquivo `public/index.html` em um navegador.
2. O cliente se conectará automaticamente ao servidor WebSocket.
3. As perguntas aparecerão na interface do jogo, cada uma com uma imagem associada.
4. Clique em uma opção de resposta. Você receberá um feedback indicando se a resposta está correta ou incorreta.
5. A pontuação será atualizada e exibida em tempo real.

## Autor
Desenvolvido por [Alan Marques]


