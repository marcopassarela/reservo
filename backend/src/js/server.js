// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve arquivos estáticos do frontend

// Chave secreta para assinar o JWT (guarde isso em um arquivo .env em produção)
const SECRET_KEY = 'sua-chave-secreta-super-segura';

// Usuário fictício (em produção, use um banco de dados)
const usuarioValido = { username: 'admin', senha: '123456' };

// Middleware para proteger rotas
function verificarToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login.html');
    }
    try {
        jwt.verify(token, SECRET_KEY);
        next(); // Token válido, prossegue
    } catch (err) {
        res.redirect('/login.html'); // Token inválido, redireciona
    }
}

// Rota de login
app.post('/login', (req, res) => {
    const { username, senha } = req.body;
    if (username === usuarioValido.username && senha === usuarioValido.senha) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }); // Cookie seguro
        res.json({ success: true, redirect: '/agenda.html' });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

// Rota protegida para agenda.html
app.get('/agenda.html', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/agenda.html'));
});

// Rota para logout (opcional)
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login.html');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});