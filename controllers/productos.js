const responder = require("../services/responder");
const service = require("../services/productosService");

exports.getAll = async (req, res) => {
  const productos = await service.leerProductos();
  responder.exito(res, productos, "Lista de productos");
};

exports.getById = async (req, res) => {
  const productos = await service.leerProductos();
  const producto = productos.find((x) => x.id === +req.params.id);

  if (!producto) {
    return responder.error(
      res,
      ["Producto no encontrado"],
      "No encontrado",
      404
    );
  }
  responder.exito(res, producto, "Producto encontrado");
};

exports.create = async (req, res) => {
  const productos = await service.leerProductos();
  const { nombre, precio, descripcion, stock } = req.body;

  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio,
    descripcion,
    stock: stock || 0,
  };

  productos.push(nuevoProducto);
  await service.guardarProductos(productos);

  responder.exito(res, nuevoProducto, "Producto creado", 201);
};

exports.update = async (req, res) => {
  const productos = await service.leerProductos();
  const id = +req.params.id;
  const idx = productos.findIndex((p) => p.id === id);

  if (idx === -1) {
    return responder.error(
      res,
      ["Producto no encontrado"],
      "No encontrado",
      404
    );
  }

  productos[idx] = {
    ...productos[idx],
    ...req.body,
    id: productos[idx].id,
  };

  await service.guardarProductos(productos);
  responder.exito(res, productos[idx], "Producto actualizado");
};

exports.remove = async (req, res) => {
  const productos = await service.leerProductos();
  const id = +req.params.id;
  const idx = productos.findIndex((p) => p.id === id);

  if (idx === -1) {
    return responder.error(
      res,
      ["Producto no encontrado"],
      "No encontrado",
      404
    );
  }

  const [eliminado] = productos.splice(idx, 1);
  await service.guardarProductos(productos);

  responder.exito(res, eliminado, "Producto eliminado");
};
