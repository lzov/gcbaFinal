// services/validarProducto.helper.js
export function validarProducto(producto) {
  const errores = [];

  if (!producto.Desc || typeof producto.Desc !== 'string') {
    errores.push('El campo "Desc" es requerido y debe ser un string');
  }
  if (!producto.Marca || typeof producto.Marca !== 'string') {
    errores.push('El campo "Marca" es requerido y debe ser un string');
  }
  if (!producto.Modelo || typeof producto.Modelo !== 'string') {
    errores.push('El campo "Modelo" es requerido y debe ser un string');
  }
  if (producto.Precio === undefined || typeof producto.Precio !== 'number' || isNaN(producto.Precio)) {
    errores.push('El campo "Precio" es requerido y debe ser un número');
  }
  if (producto.Stock === undefined || typeof producto.Stock !== 'number' || isNaN(producto.Stock)) {
    errores.push('El campo "Stock" es requerido y debe ser un número');
  }
  if (!producto.sku || (typeof producto.sku !== 'string' && typeof producto.sku !== 'number')) {
    errores.push('El campo "sku" es requerido y debe ser un string o número');
  }

  return errores;
}
