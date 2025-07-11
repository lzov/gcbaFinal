const express = require('express');
const app = express();
app.use(express.json());

const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);


app.get('/status', (req,res) => {
    res.json({status: 'OK', time: Date.now()});
});


app.get('/', (req, res) => res.send("API Funcionando"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.use((req, res) => res.status(404).json({error: 'no existe la ruta'}));

app.use((err, req, res, next ) => {
    console.error(err.stack); 
    res.status(500).json({error: 'Error interno del servidor'});

});

