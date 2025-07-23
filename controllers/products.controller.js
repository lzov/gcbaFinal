import * as ProductService from '../services/products.services.js';
import { exito, error } from '../services/responder.js';

export const create = async (req, res) => {
  try {
    const nuevo = await ProductService.create(req.body);
    exito(res, nuevo, 'Producto creado', 201);
  } catch (err) {
    error(res, null, 'Error al crear producto', 500);
  }
};

export const update = async (req, res) => {
  try {
    const updatedProduct = await ProductService.update(req.params.id, req.body);
    exito(res, updatedProduct, 'Producto actualizado');
  } catch (err) {
    error(res, null, err.message || 'Error al actualizar producto', 500);
  }
};
