import * as ProductService from '../services/products.services';

export const getAll = async (req, res) => {
    try {
        const products = await ProductService.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({error: 'Error al obtener productos'});
    }
};

export const create = async (req, res) => {
    try {
        const nuevo = await ProductService.create(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(500).json({error: 'Error al crear producto'});
    }
};

