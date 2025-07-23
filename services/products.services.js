import * as ProductModel from '../models/product.model.js';

export const getAll = () => ProductModel.getAllProducts();
export const getById = (id) => ProductModel.getProductById(id);
export const create = (data) => ProductModel.createProduct(data);
export const update = (id, data) => ProductModel.updateProduct(id, data)
export const remove = (id) => ProductModel.deleteProduct(id);
