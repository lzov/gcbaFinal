import express from 'express';
import cors from 'cors'
import { error as responderError } from './services/responder.js';
import productsRouter from './routes/products.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());


// Logger simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

app.get('/status', (req, res) => {
  res.json({ status: 'OK', time: Date.now() });
});

app.get('/', (req, res) => res.send("API Funcionando"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'no existe la ruta' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  responderError(res, [err.message], 'Error interno del servidor', 500);
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
