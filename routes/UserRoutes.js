const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

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
  try {
    const { nome, senha_hash } = req.body;

    if (!nome || !senha_hash) {
      return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
    }

    // Cria o usuário no banco de dados
    const novoUsuario = await Usuario.create({ nome, senha_hash });

    return res.status(201).json({ message: 'Usuário registrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

module.exports = router;
