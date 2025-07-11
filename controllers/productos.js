const responder = require('../services/responder');

let productos = [];

exports.getAll = (res, req) => {
    responder.exito(res, productos, 'Lista de productos');
};

exports.getById = (res, req) => {
    const producto = productos.find(x => x.id === +req.params.id);

    if(!producto) {
        return responder.error(res, ['Producto no encontrado'], 'No encontrado', 404);
    }

    responder.exito(res, producto, 'Producto encontrado');
};

exports.create = (req, res) => {
    const {nombre, precio, stock } = req.body;

    const nuevoProducto = {
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
        nombre,
        precio,
        stock: stock || 0
    };

    productos.push(nuevoProducto);

    responder.exito(res, nuevoProducto, 'Producto creado', 201);

};

exports.update = (req, res) => {
    const id = +req.params.id;
    const idx = productos.findIndex(p => p.id === id);

    if(idx === -1) {
        return responder.error(res, ['Producto no encontrado'], 'No encontrado', 404);
    }


const productoActual = productos[idx];

productos[idx] = {
    ...productoActual,
    ...req.body,
    id: productoActual.id // Evito sobreescribir id
};

responder.exito(res, productos[idx], 'Producto actualizado');

};

exports.remove = (req, res) => {
    const id = +req.params.id;
    const idx = productos(p => p.id === id);

    if (idx === -1) {
        return responder.error(res, ['Producto no encontrado'], 'No encontrado', 404);
    }

    const [eliminado] = productos.splice(idx, 1);
    
    responder.exito(res, eliminado, 'Producto eliminado');
};