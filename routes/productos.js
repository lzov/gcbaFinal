const express = require('express');

const router = express.Router();
const productosController = require('.../controllers/productos');
const validarProducto = require('../services/validarProducto');


router.get('/', productosController.getAll);
router.get('/:id', productosController.getById);
router.post('/', productosController.create);
router.put('/:id', productosController.update);
router.delete('/:id', productosController.remove);


module.express = router;

