const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/productos.json');

exports.leerProductos = async () => {
    try {
        const data = await fs.promises.readFile('../data/productos.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

exports.guardarProductos = async (productos) => {
    await fs.writeFile(rutaArchivo, JSON.stringify(productos, null, 2));
};
