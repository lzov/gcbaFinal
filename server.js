// Archivo principal del backend. Configura y levanta el servidor Express.
import express from 'express';
import cors from 'cors'
import { error as responderError } from './services/responder.js';
import productsRouter from './routes/products.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

// Middlewares globales
app.use(express.json()); // Permite recibir JSON en requests
app.use(cors()); // Habilita CORS para todos los orígenes

// Logger simple para desarrollo
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rutas principales de la API
app.use('/api/products', productsRouter); // CRUD de productos
app.use('/api/auth', authRouter); // Autenticación

// Endpoint de status para monitoreo
app.get('/status', (req, res) => {
  res.json({ status: 'OK', time: Date.now() });
});

// Endpoint raíz
app.get('/', (req, res) => res.send("API Funcionando"));

// Handler para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'no existe la ruta' });
});

// Handler de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  responderError(res, [err.message], 'Error interno del servidor', 500);
});

// Inicialización del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
