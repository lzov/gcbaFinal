const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productos');
const validarProducto = require('../services/validarProductos');

// Rutas sin validación
router.get('/', productosController.getAll);
router.get('/:id', productosController.getById);

// Rutas con validación
router.post('/', validarProducto, productosController.create);
router.put('/:id', validarProducto, productosController.update);

router.delete('/:id', productosController.remove);

module.exports = router;
