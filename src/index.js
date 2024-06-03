const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const config = require('./config');
const perguntas = require('./perguntas.json');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let pontuacaoDoJogador = {};
let perguntasPorJogador = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Cliente conectado!');
    socket.emit('welcomido', { boasVindas: 'Bem-vindo ao Jogo de Perguntas e Respostas!', playerId: 'Seu ID é: ' + socket.id });
    pontuacaoDoJogador[socket.id] = 0;
    perguntasPorJogador[socket.id] = { perguntasRespondidas: [] };

    socket.on('iniciarQuiz', () => {
        perguntasPorJogador[socket.id].perguntasRespondidas = [];
        enviarPergunta(socket);
    });

    socket.on('resetarQuiz', () => {
        resetarQuiz(socket);
        socket.emit('resetado');
    });

    socket.on('disconnect', () => {
        console.log('Cliente foi de base!');
        delete pontuacaoDoJogador[socket.id];
        delete perguntasPorJogador[socket.id];
    });

    socket.on('resposta', (data) => {
        const { resposta, playerId } = data;
        const jogador = perguntasPorJogador[playerId];
        const perguntaAtual = perguntas[jogador.perguntasRespondidas.length - 1];

        if (resposta === perguntaAtual.correta) {
            pontuacaoDoJogador[playerId] += 1;
            socket.emit('repostaDaResposta', { correto: true });
        } else {
            socket.emit('repostaDaResposta', { correto: false });
        }

        io.to(playerId).emit('atualizarPontuacao', pontuacaoDoJogador);

        if (jogador.perguntasRespondidas.length < perguntas.length) {
            enviarPergunta(socket);
        } else {
            socket.emit('quizTerminado');
        }
    });
});

function enviarPergunta(socket) {
    const jogador = perguntasPorJogador[socket.id];
    if (jogador.perguntasRespondidas.length < perguntas.length) {
        const proximaPergunta = perguntas[jogador.perguntasRespondidas.length];
        jogador.perguntasRespondidas.push(proximaPergunta);
        socket.emit('pergunta', proximaPergunta);
    }
}

function resetarQuiz(socket) {
    pontuacaoDoJogador[socket.id] = 0;
    perguntasPorJogador[socket.id] = { perguntasRespondidas: [] };
}

server.listen(config.port, () => {
    console.log(`Servidor rodando na porta: ${config.port}`);
});
