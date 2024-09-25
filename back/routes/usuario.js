const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { cadastrarUsuario, buscarUsuarioPorEmail } = require('../controllers/usuario');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const { status } = await buscarUsuarioPorEmail(email);
    if (status === 200) {
      return res.status(400).json({ message: 'Usuário já cadastrado.' });
    }

    // criptografar a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    await cadastrarUsuario({
      email: email,
      senha: hashedPassword,
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar o usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar o usuário.' });
  }
});

const JWT_SECRET = "uma_chave_secreta_super_segura"

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    console.log(req.headers)

    try {
      if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      }
  
      const { status, data: usuario } = await buscarUsuarioPorEmail(email);
  
      if (status !== 200) {
        return res.status(400).json({ message: 'Dados incorretos.' });
      }
  
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ message: 'Dados incorretos.' });
      }
  
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro no servidor ao fazer login.' });
    }
  });

module.exports = router;
