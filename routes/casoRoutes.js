import express from 'express';
const casoRoutes = express.Router();
import casoController from '../controllers/casoController.js';
import Auth from '../middleware/Auth.js';

casoRoutes.get("/casos", Auth.Authorization, casoController.getAllCasos);
casoRoutes.get("/casos/:id", Auth.Authorization, casoController.getOneCaso);
casoRoutes.post("/casos", Auth.Authorization, casoController.createCaso);
casoRoutes.put("/casos/:id", Auth.Authorization, casoController.updateCaso); 
casoRoutes.delete("/casos/:id", Auth.Authorization, casoController.deleteCaso);

export default casoRoutes;