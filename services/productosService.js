const fs = require('fs').promises;
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/productos.json');

exports.leerProductos = async () => {
    try {
        const data = await fs.readFile(rutaArchivo, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

exports.guardarProductos = async (productos) => {
    await fs.writeFile(rutaArchivo, JSON.stringify(productos, null, 2));
};
