const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const Usuario = require('./models/Usuario');
const Chat = require('./models/Chat');

require('./db');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRoutes);

const wss = new WebSocket.Server({ port: 8080 });

let sockets = []; // Lista de clientes conectados

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

wss.on('connection', function(socket) {
  console.log("Cliente conectado");
  sockets.push(socket);

  socket.on('message', async function(msg) {
    try {
        console.log('Mensagem recebida do cliente:', msg);
        const message = JSON.parse(msg.toString('utf-8'));
        const username = message.username || 'Desconhecido'; 
        const conteudo = message.conteudo;
        const sala_id=1 //define a sala um como padrão
      

        const usuario = await Usuario.findOne({ where: { nome: username } });
        if (!usuario) {
            console.error('Usuário não encontrado:', username);
            return; 
        }

        const usuario_id = usuario.id; 
        console.log(`Mensagem de ${username} (ID: ${usuario_id}): ${conteudo}`);

        // Salvar a mensagem no DB usando Sequelize
        await Chat.create({
            conteudo: conteudo,     
            usuario_id: usuario_id, 
            sala_id:sala_id
        });
        
        wss.clients.forEach(function(client) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ username: username, conteudo: conteudo })); // Envia para todos os outros clientes, exceto o que enviou
            }
        });
    } catch (err) {
        console.error('Erro ao processar a mensagem:', err);
    }
});


  // desconexão do cliente
  socket.on('close', function() {
    console.log("Cliente desconectado");
    sockets = sockets.filter(s => s !== socket);
  });
});

module.exports = { app, server };
