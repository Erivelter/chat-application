const express = require('express');
const Usuario = require('../models/Usuario'); 
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/login', async (req,res) => {
    const dados_user_recebido={
        username:req.body.username,
        password: req.body.password
    };
    try{
       const usuario = await Usuario.findOne({
        where: {nome: dados_user_recebido.username}
       });
       if (!usuario || !(await bcrypt.compare(dados_user_recebido.password, usuario.senha_hash))) {
        return res.status(401).send({ message: 'Usuário ou senha incorretos :(' });
    }
       res.status(200).send({message:'Login bem-sucedido :)', username: usuario.nome})

    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).send({ message: 'Erro ao realizar login.' });
    }
});

router.post('/register', async (req, res) => {
    
    const dados_user = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const senha_hash = await bcrypt.hash(dados_user.password, 10);
        const usuarioCriado = await Usuario.create({
            nome: dados_user.username,
            senha_hash: senha_hash
        });

        console.log('Usuário cadastrado:', usuarioCriado);

        res.status(201).send({
            message: 'Usuário registrado com sucesso!',
            dados_user: dados_user.username
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).send({ message: 'Erro ao registrar usuário.' });
    }
});

module.exports = router;