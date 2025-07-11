exports.exito = function (res, datos, mensaje = 'OK', status = 200) {
    return res.status(status).json({
        status: 'success',
        mensaje,
        datos
    });
};

exports.error = function(res, datos, mensaje = 'Error', status = 400) {
    return res.status(status).json({
        status: 'error',
        mensaje,
        datos
    });
};

