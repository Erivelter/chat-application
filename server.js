const WebSocket = require('ws');
const express = require('express')
const path = require('path')

const app = express();
const server = require('http').createServer(app)

const wss = new WebSocket.Server({ port: 8080 });
let sockets = []; // Lista de clientes conectados
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

wss.on('connection', function(socket) {
    console.log("Cliente conectado");

    sockets.push(socket);

    
    wss.on('connection', function(socket) {
        socket.on('message', function(msg) {
            console.log('Mensagem recebida do cliente:', msg);
            // Envia a mensagem recebida de volta para todos os clientes conectados
            wss.clients.forEach(function(client) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(msg); // Envia para todos os clientes, exceto o que enviou
                }
            });
        });
    });

    wss.on('close', function() {
        console.log("Cliente desconectado");
    
        sockets = sockets.filter(s => s !== socket);
    });
});

server.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});