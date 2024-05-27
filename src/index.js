const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const config = require('./config');
const perguntas = require('./perguntas.json');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let pontuacaoDoJogador = {};
let numeroDaPergunta = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Cliente conectado!');
    socket.emit('welcomido', { boasVindas: 'Bem-vindo ao Jogo de Perguntas e Respostas!', playerId: 'Seu ID é: ' + socket.id });
    pontuacaoDoJogador[socket.id] = 0;

    enviarPergunta(socket);

    socket.on('disconnect', () => {
        console.log('Cliente foi de base!');
        delete pontuacaoDoJogador[socket.id];
    });

    socket.on('resposta', (data) => {
        const { resposta, playerId } = data;
        const perguntaAtual = perguntas[numeroDaPergunta];

        if (resposta === perguntaAtual.correta) {
            pontuacaoDoJogador[playerId] += 1;
            socket.emit('repostaDaResposta', { correto: true });
        } else {
            socket.emit('repostaDaResposta', { correto: false });
        }

        io.emit('atualizarPontuacao', pontuacaoDoJogador);
        enviarPergunta(socket);
    });
});

function enviarPergunta(socket) {
    numeroDaPergunta = (numeroDaPergunta + 1) % perguntas.length;
    const pergunta = perguntas[numeroDaPergunta];
    socket.emit('pergunta', pergunta);
}

server.listen(config.port, () => {
    console.log(`Servidor rodando na porta: ${config.port}`);
});



