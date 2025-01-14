const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Para hash da senha
const Usuario = require('../models/Usuario');

router.post('/login', async (req,res) => {
  try{
    const { nome, senha } = req.body;

       // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ where: { nome } });

     if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
       // Compara senha fornecida com o hash no banco
       const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

       if (!senhaValida) {
         return res.status(401).json({ message: 'Senha incorreta.' });
       }
   
       return res.status(200).json({ message: 'Login bem-sucedido!', usuario: usuario.nome });
     } catch (error) {
       console.error('Erro ao realizar login:', error);
       return res.status(500).json({ message: 'Erro ao realizar login.' });
     }
   });
   

router.post('/register', async (req, res) => {
  try {
    const { nome, senha} = req.body;

    if (!nome || !senha) {
      return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
    }
    // Hash da senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // Cria o usuário no banco de dados
    const novoUsuario = await Usuario.create({ nome, senha_hash });

    return res.status(201).json({ message: 'Usuário registrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

module.exports = router;
