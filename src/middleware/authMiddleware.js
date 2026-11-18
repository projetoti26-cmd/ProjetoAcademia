import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ erro: "Nenhum token fornecido." });

    const bearerToken = token.split(' ')[1];
    
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ erro: "Sessão expirada ou inválida." });
        req.usuarioId = decoded.id;
        req.usuarioTipo = decoded.tipo;
        next();
    });
};

export default { verificarToken };