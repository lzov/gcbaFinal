import { productsCollection } from '../config/firebase.js';

// Obtener todos los productos, con filtros opcionales
export const getAll = async ({ min, max, orden, nombre }) => {
  const snapshot = await productsCollection.get();
  let productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (nombre) {
    productos = productos.filter(p =>
      p.nombre?.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (!isNaN(min)) {
    productos = productos.filter(p => p.precio >= Number(min));
  }

  if (!isNaN(max)) {
    productos = productos.filter(p => p.precio <= Number(max));
  }

  if (orden === 'asc') {
    productos.sort((a, b) => a.precio - b.precio);
  } else if (orden === 'desc') {
    productos.sort((a, b) => b.precio - a.precio);
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
