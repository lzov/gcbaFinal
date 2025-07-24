import admin from 'firebase-admin';
import { error } from '../services/responder.js';

export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, null, 'Token no proporcionado', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.usuario = decodedToken; // contiene uid, etc.
    next();
  } catch (err) {
    return error(res, err.message, 'Token de Firebase inválido o expirado', 403);
  }
};
