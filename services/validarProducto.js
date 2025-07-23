// middlewares/validarProducto.middleware.js
import { validarProducto } from '../services/validarProducto.helper.js';

export function validarProductoMiddleware(req, res, next) {
  const errores = validarProducto(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  next();
}
