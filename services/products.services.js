import { productsCollection } from '../config/firebase.js';

// Obtener todos los productos, con filtros opcionales
export const getAll = async (query = {}) => {
  const snapshot = await productsCollection.get();
  let productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Filtros por campos reales
  if (query.desc) {
    productos = productos.filter(p =>
      typeof p.Desc === 'string' && p.Desc.toLowerCase().includes(query.desc.toLowerCase())
    );
  }
  if (query.marca) {
    productos = productos.filter(p =>
      typeof p.Marca === 'string' && p.Marca.toLowerCase() === query.marca.toLowerCase()
    );
  }
  if (query.modelo) {
    productos = productos.filter(p =>
      typeof p.Modelo === 'string' && p.Modelo.toLowerCase() === query.modelo.toLowerCase()
    );
  }
  if (query.minPrecio) {
    productos = productos.filter(p => Number(p.Precio) >= Number(query.minPrecio));
  }
  if (query.maxPrecio) {
    productos = productos.filter(p => Number(p.Precio) <= Number(query.maxPrecio));
  }
  if (query.orden === 'asc') {
    productos = productos.sort((a, b) => a.Precio - b.Precio);
  }
  if (query.orden === 'desc') {
    productos = productos.sort((a, b) => b.Precio - a.Precio);
  }
  return productos;
};

// Obtener un producto por ID
export const getById = async (id) => {
  const doc = await productsCollection.doc(id).get();
  if (!doc.exists) {
    throw new Error('Producto no encontrado');
  }
  return { id: doc.id, ...doc.data() };
};

// Crear un nuevo producto
export const create = async (data) => {
  const nuevo = await productsCollection.add(data);
  const doc = await nuevo.get();
  return { id: doc.id, ...doc.data() };
};

// Actualizar un producto por ID
export const update = async (id, data) => {
  const ref = productsCollection.doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error('Producto no encontrado para actualizar');
  }
  await ref.update(data);
  const actualizado = await ref.get();
  return { id: actualizado.id, ...actualizado.data() };
};

// Eliminar un producto por ID
export const remove = async (id) => {
  const ref = productsCollection.doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error('Producto no encontrado para eliminar');
  }
  await ref.delete();
  return { id }; // o un mensaje de confirmación
};
