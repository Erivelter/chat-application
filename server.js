const WebSocket = require('ws');
const express = require('express')
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const Usuario = require('./models/Usuario');

require('./db');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app)

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

    wss.on('connection', function(socket) {
        socket.on('message', function(msg) {
            console.log('Mensagem recebida do cliente:', msg);
            
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


module.exports = { app, server };