// services/validarProducto.js
export default function validarProducto(req, res, next) {
  const { nombre, precio, descripcion, stock } = req.body;

  const errores = [];

  // Validaciones...
  if (!nombre) errores.push('El nombre es obligatorio');
  if (precio === undefined) errores.push('El precio es obligatorio');
  if (nombre && typeof nombre !== 'string') errores.push('El nombre debe ser un string');
  if (precio !== undefined && typeof precio !== 'number') errores.push('El precio debe ser un número');
  if (stock !== undefined && typeof stock !== 'number') errores.push('El stock debe ser un número');
  if (descripcion !== undefined && typeof descripcion !== 'string') errores.push('La descripción debe ser un string');
  if (typeof precio === 'number' && precio < 0) errores.push('El precio no puede ser negativo');
  if (typeof stock === 'number' && stock < 0) errores.push('El stock no puede ser negativo');

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
}
