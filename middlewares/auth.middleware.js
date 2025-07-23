// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import { error } from '../services/responder.js';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, null, 'Token no proporcionado', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return error(res, null, 'Token inválido o expirado', 403);
  }
};
