const express = require('express');
const responder = require('./services/responder');

const app = express();

app.use(express.json());

// Logger simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);

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
  responder.error(res, [err.message], 'Error interno del servidor', 500);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
