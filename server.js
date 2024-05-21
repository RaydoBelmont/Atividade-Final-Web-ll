const express = require('express');
const { Server } = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
const wss = new Server({ server });

wss.on('connection', ws => {
  console.log('Cliente conectado');
  ws.on('message', message => {
    console.log(`Mensagem recebida: ${message}`);
  });
});
