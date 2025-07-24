import admin from 'firebase-admin';
import { firebaseConfig } from './config.js';

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore();

export { db };
export const productsCollection = db.collection('productos');
export default admin;
