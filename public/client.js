const socket = io();

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
            // Disable buttons after one click
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
