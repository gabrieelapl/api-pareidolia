import express from "express";
import mongoose from 'mongoose';
import cors from "cors";

import casoRoutes from "./routes/casoRoutes.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json()); 

app.use(cors());

app.use('/', casoRoutes);
app.use('/', userRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/pareidolia");

const port = 4000;
app.listen(port, (error) => {
    if (error) {
        console.log("Erro ao iniciar o servidor:", error);
    } else {
        console.log(`API Pareidolia rodando em http://localhost:${port}`);
    }
});