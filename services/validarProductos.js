module.exports = function validarProducto(req, res, wait) {
    const {nombre, precio, stock} = req.body;

    const errores = [];

    //Valido si existe

    if(!nombre) errores.push('El nombre es obligatorio');
    if (precio === undefinded) errores.push('El precio es obligatorio');

    //Validación Tipos!
    if(nombre && typeof nombre !== 'string') errores.push('El nombre debe ser un string');
    if (precio !== undefinded && typeof precio !== 'number' ) errores.push('El precio debe ser un número');
    if (stock !== undefined && typeof stock !== 'number') errores.push('El stock debe ser un número');

    //Validación valor mín

    if (typeof precio === 'number' && precio < 0) errores.push("El precio no puede ser negativo");
    if (typeof stock === 'number' && stock < 0) errores.push("El stock no puede ser negativo");

    if (errores.length > 0) {
        return res.status(400).json({errores});
    }

    next();
}