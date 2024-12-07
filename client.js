const WebSocket = require('ws')
const socket = new WebSocket('ws://localhost:8080');

socket.on('open', function(){
    console.log("conectado ao servidor")
    socket.send("cheguei servidor!")
});
socket.on('open', function(){
    console.log("conectado ao servidor")
    socket.send("familia servidor!")
});

socket.on("message", function(msg){
    console.log('Resposta do servidor:', msg)
});
