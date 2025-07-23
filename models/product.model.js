import { productsCollection } from "../config/firebase.js";

export const getAll = async () => {
  const snapshot = await productsCollection.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getById = async (id) => {
  const doc = await productsCollection.doc(id).get();
  if (!doc.exists) throw new Error("Producto no encontrado");
  return { id: doc.id, ...doc.data() };
};

export const create = async (productData) => {
  const docRef = await productsCollection.add(productData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
};

export const update = async (id, updatedData) => {
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) throw new Error("Producto no encontrado");
  await docRef.update(updatedData);
  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

export const remove = async (id) => {
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    throw new Error('Producto no encontrado');
  }
  await docRef.delete();
};

