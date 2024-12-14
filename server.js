const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const Usuario = require('./models/Usuario');
const Chat = require('./models/Chat');
const http = require('http');

require('./db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRoutes);

const wss = new WebSocket.Server({ server });

let sockets = []; // Lista de clientes conectados

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

wss.on('connection', function (socket) {
  let currentUser = null; // Variável para armazenar o nome de usuário do cliente

  socket.on('message', async function (msg) {
    try {
      const message = JSON.parse(msg.toString('utf-8'));

      // Verifica o tipo de mensagem
      if (message.type === 'join') {
        // Armazena o nome do usuário quando ele entra no chat
        currentUser = message.userName;
        console.log(`${currentUser} entrou no chat`);

        // Envia uma mensagem de boas-vindas ao cliente
        socket.send(
          JSON.stringify({ type: 'welcome', message: `Bem-vindo, ${currentUser}!` })
        );

        // Enviar para todos os outros clientes que um novo usuário entrou
        broadcast({
          type: 'join',
          userName: currentUser,
          message: `${currentUser} entrou no chat.`,
        });

        return;
      }

      if (message.type === 'message') {
        if (!currentUser) {
          console.warn('Usuário não autenticado tentando enviar mensagem.');
          socket.send(
            JSON.stringify({ type: 'error', message: 'Você precisa se autenticar primeiro.' })
          );
          return;
        }

        const { content } = message;
        console.log(`Mensagem de ${currentUser}: ${content}`);

      // Assumindo que `Usuario` é o modelo da tabela de usuários
const usuario = await Usuario.findOne({ where: { nome: currentUser } });

if (!usuario) {
  throw new Error('Usuário não encontrado');
}

// Use o ID numérico do usuário para criar a mensagem no chat
await Chat.create({
  conteudo: content,
  data: new Date(),
  usuario_id: usuario.id, // Aqui você usa o ID numérico
  sala_id: 1, // ID da sala padrão
});

        // Enviar a mensagem para todos os outros clientes conectados
        broadcast({
          type: 'message',
          userName: currentUser,
          content: content,
        });

        return;
      }
    } catch (err) {
      console.error('Erro ao processar a mensagem:', err);
      socket.send(JSON.stringify({ type: 'error', message: 'Mensagem inválida.' }));
    }
  });

  socket.on('close', function () {
    if (currentUser) {
      console.log(`Cliente desconectado: ${currentUser}`);
      broadcast({
        type: 'leave',
        userName: currentUser,
        message: `${currentUser} saiu do chat.`,
      });
    }
  });
});

// Função para enviar mensagens para todos os clientes conectados
function broadcast(message) {
  wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message)); // Envia a mensagem como JSON
    }
  });
}

module.exports = { app, server };
