import { productsCollection } from "../config/firebase";

export const getAllProducts = async () => {
  const snapshot = await productsCollection.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const doc = await productsCollection.doc(id).get();
  if (!doc.exists) throw new Error("Producto no encontrado");
  return { id: doc.id, ...doc.data() };
};

export const createProduct = async(productData) => {
    const docRef = await productsCollection.add(productData);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data()};
}

export const deleteProduct = async (id) => {
    await productsCollection.doc(id).delete();
}

