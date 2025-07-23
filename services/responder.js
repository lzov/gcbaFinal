// services/responder.js
export const exito = (res, datos, mensaje = 'OK', status = 200) => {
  return res.status(status).json({
    status: 'success',
    mensaje,
    datos
  });
};

export const error = (res, datos, mensaje = 'Error', status = 400) => {
  return res.status(status).json({
    status: 'error',
    mensaje,
    datos
  });
};
