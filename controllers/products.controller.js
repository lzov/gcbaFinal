import * as ProductService from '../services/products.services.js';
import { exito, error } from '../services/responder.js';


export const getAll = async (req, res) => {
  try {
    const products = await ProductService.getAll();
    exito(res, products, 'Productos obtenidos');
  } catch (err) {
    error(res, null, 'Error al obtener productos', 500);
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductService.getById(id);
    exito(res, product, 'Producto obtenido');
  } catch (err) {
    error(res, null, 'Error al obtener el producto', 500);
  }
};

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

export const remove = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    exito(res, null, 'Producto eliminado');
  } catch (err) {
    error(res, null, err.message || 'Error al eliminar producto', 500);
  }
};
