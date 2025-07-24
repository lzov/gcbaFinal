import { Router } from 'express';
import * as ProductosController from '../controllers/products.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ProductosController.getAll);
router.get('/:id', ProductosController.getById);
router.post('/', verificarToken, ProductosController.create);
router.put('/:id', verificarToken, ProductosController.update);
router.delete('/:id', verificarToken, ProductosController.remove);

export default router;
