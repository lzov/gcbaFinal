import express from 'express';
import * as controller from '../controllers/products.controller.js';
import validarProducto from '../services/validarProducto.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Rutas protegidas (requieren token válido)
router.post('/', verificarToken, validarProducto, controller.create);
router.put('/:id', verificarToken, validarProducto, controller.update);
router.delete('/:id', verificarToken, controller.remove);

export default router;
