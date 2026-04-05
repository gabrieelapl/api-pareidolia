import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const JWTSecret = process.env.JWTSECRET;

const Authorization = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearerToken = authToken.split(' ');
        const token = bearerToken[1];

        jwt.verify(token, JWTSecret, (error, data) => {
            if (error) {
                return res.status(401).json({ error: "Token inválido ou expirado." });
            }
            req.token = token;
            req.loggedUser = { id: data.id, email: data.email };
            return next();
        });
    } else {
        return res.status(401).json({ error: 'Acesso não autorizado. Faça login para continuar.' });
    }
}

export default { Authorization };