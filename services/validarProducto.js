// Middleware de validación de productos: verifica que los datos cumplan el formato requerido
import { validarProducto } from '../services/validarProducto.helper.js';

export default function validarProductoMiddleware(req, res, next) {
  const errores = validarProducto(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  next();
}
