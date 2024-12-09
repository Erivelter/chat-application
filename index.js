//Esse é o arquivo que você deve rodar, entendeu!
const { app, server } = require('./server'); 
require('dotenv').config();

const PORT = process.env.APP_PORT

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

