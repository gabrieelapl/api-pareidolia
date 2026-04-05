import userService from "../services/userService.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const JWTSecret = process.env.JWTSECRET;

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await userService.Create(name, email, hash);
        res.status(201).json({ message: 'Usuário clínico cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getOne(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            jwt.sign({ id: user._id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                if (err) return res.status(500).json({ error: "Erro ao gerar token" });
                res.status(200).json({ token: token, message: "Login realizado!" });
            });
        } else {
            res.status(401).json({ error: "Credenciais inválidas." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no login.' });
    }
}

export default { createUser, loginUser };