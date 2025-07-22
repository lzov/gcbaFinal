import express from 'express';
import * as controller from '../controllers/products.controller';
import validarProducto from '../services/validarProducto';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/', validarProducto, controller.create);
router.put('/:id', validarProducto, controller.update);

router.delete('/:id', controller.remove);

export default router;


