import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const serviceAccountPath = path.resolve('./config/authKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const productsCollection = db.collection('products');

console.log('Conectado a Firebase como:', serviceAccount.client_email);

export { db, productsCollection };
