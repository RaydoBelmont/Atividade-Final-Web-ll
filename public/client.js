const socket = io();

document.getElementById('botao-iniciar').addEventListener('click', () => {
    document.getElementById('botao-iniciar').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    iniciarQuiz();
});

document.getElementById('botao-resetar').addEventListener('click', () => {
    resetarQuiz();
});

function iniciarQuiz() {
    socket.emit('iniciarQuiz');
}

function resetarQuiz() {
    socket.emit('resetarQuiz');
}

socket.on('welcomido', (message) => {
    const { boasVindas, playerId } = message;
    document.getElementById('mensagem-boasvindas').innerText = boasVindas;
    document.getElementById('player-id').innerText = playerId;
});

socket.on('pergunta', (pergunta) => {
    document.getElementById('tituloPergunta').innerText = pergunta.pergunta;
    const divImagem = document.getElementById('imagem-pergunta');
    if (pergunta.imagem) {
        const img = document.createElement('img');
        img.src = pergunta.imagem;
        img.alt = 'Imagem da pergunta';
        divImagem.innerHTML = '';
        divImagem.appendChild(img);
    } else {
        divImagem.innerHTML = '';
    }
    const containerDasOpcoes = document.getElementById('options');
    containerDasOpcoes.innerHTML = '';
    pergunta.opcoes.forEach(opcao => {
        const button = document.createElement('button');
        button.innerText = opcao;
        button.addEventListener('click', () => {
            socket.emit('resposta', { resposta: opcao, playerId: socket.id });
            Array.from(containerDasOpcoes.children).forEach(btn => btn.disabled = true);
        });
        containerDasOpcoes.appendChild(button);
    });
});

socket.on('repostaDaResposta', (data) => {
    const containerDaRespostaDaResposta = document.getElementById('repostaDaResposta');
    if (data.correto) {
        containerDaRespostaDaResposta.innerText = 'Resposta correta!';
    } else {
        containerDaRespostaDaResposta.innerText = 'Resposta incorreta!';
    }
});

socket.on('atualizarPontuacao', (pontos) => {
    const containerDoPlayer = document.getElementById('pontuacao');
    containerDoPlayer.innerHTML = '<h3>Pontuação</h3>';
    for (let jogador in pontos) {
        const p = document.createElement('p');
        p.innerText = `Jogador ${jogador}: ${pontos[jogador]}`;
        containerDoPlayer.appendChild(p);
    }
});

socket.on('quizTerminado', () => {
    const containerDaRespostaDaResposta = document.getElementById('repostaDaResposta');
    containerDaRespostaDaResposta.innerText = 'Quiz terminado! Obrigado por jogar.';
    const containerDasOpcoes = document.getElementById('options');
    containerDasOpcoes.innerHTML = '';
    document.getElementById('botao-resetar').style.display = 'inline-block';
});

socket.on('resetado', () => {
    document.getElementById('botao-iniciar').style.display = 'inline-block';
    document.getElementById('botao-resetar').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('repostaDaResposta').innerText = '';
    document.getElementById('pontuacao').innerHTML = '';
});
