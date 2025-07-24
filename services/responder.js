// Helpers para respuestas uniformes de la API
// exito: respuesta exitosa
// error: respuesta de error
export function exito(res, datos, mensaje = 'OK', status = 200) {
  return res.status(status).json({
    status: 'success',
    mensaje,
    datos
  });
}

export function error(res, datos, mensaje = 'Error', status = 400) {
  return res.status(status).json({
    status: 'error',
    mensaje,
    datos
  });
}
