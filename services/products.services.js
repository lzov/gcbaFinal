import * as ProductModel from '../models/product.model.js';

export const getAll = () => ProductModel.getAll();
export const getById = (id) => ProductModel.getById(id);
export const create = (data) => ProductModel.create(data);
export const update = (id, data) => ProductModel.update(id, data);
export const remove = (id) => ProductModel.remove(id);
