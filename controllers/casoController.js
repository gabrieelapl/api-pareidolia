import casoService from "../services/casoService.js";
import { ObjectId } from 'mongodb';

// Listar casos
const getAllCasos = async (req, res) => {
    try {
        const casos = await casoService.getAll();
        res.status(200).json({ casos });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar casos.' });
    }
}

// Criar novo caso
const createCaso = async (req, res) => {
    try {
        const novoCaso = await casoService.Create(req.body);
        res.status(201).json({ message: 'Caso registrado!', caso: novoCaso });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar caso.' });
    }
}

// Deletar um caso
const deleteCaso = async (req, res) => {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
        try {
            await casoService.Delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar caso.' });
        }
    } else {
        res.status(400).json({ error: 'ID inválido.' });
    }
}

// Buscar apenas um caso 
const getOneCaso = async (req, res) => {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
        try {
            const caso = await casoService.getOne(id);
            if (!caso) return res.status(404).json({ error: 'Caso não encontrado.' });
            res.status(200).json({ caso });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar caso.' });
        }
    } else {
        res.status(400).json({ error: 'ID inválido.' });
    }
}

// Atualizar um caso 
const updateCaso = async (req, res) => {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
        try {
            const casoAtualizado = await casoService.Update(id, req.body);
            if (!casoAtualizado) return res.status(404).json({ error: 'Caso não encontrado.' });
            res.status(200).json({ message: 'Caso atualizado!', caso: casoAtualizado });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar caso.' });
        }
    } else {
        res.status(400).json({ error: 'ID inválido.' });
    }
}

export default { 
    getAllCasos, 
    createCaso, 
    deleteCaso, 
    getOneCaso, 
    updateCaso 
};  