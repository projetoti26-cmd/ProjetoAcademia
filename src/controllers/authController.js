const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ erro: "E-mail ou senha incorretos." });

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaValida) return res.status(401).json({ erro: "E-mail ou senha incorretos." });

        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token, usuario: { nome: usuario.nome, tipo: usuario.tipo } });
    } catch (error) {
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
};