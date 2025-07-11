# API REST - Productos (Node.js + Express)

Este proyecto es una API RESTful para gestionar productos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un conjunto de productos almacenados en memoria (por ahora).

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Postman (para pruebas)
- JavaScript (ES6+)

## 📁 Estructura del proyecto

```
.
├── controllers/
│   └── productos.js         # Lógica de negocio CRUD
├── routes/
│   └── productos.js         # Rutas para productos
├── services/
│   ├── responder.js         # Formato uniforme de respuestas
│   └── validarProducto.js   # Validación básica de datos
├── server.js                # Punto de entrada de la aplicación
└── package.json
```

## 📦 Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/<tu-usuario>/api-productos.git
cd api-productos
```

2. Instalá las dependencias:

```bash
npm install
```

3. Ejecutá el servidor:

```bash
node server.js
```

El servidor escuchará en `http://localhost:3000`.

---

## 🔀 Endpoints disponibles

### 📥 Crear un producto
```
POST /productos
```
**Body JSON:**
```json
{
  "nombre": "Teclado",
  "precio": 3000,
  "stock": 10
}
```

---

### 📄 Obtener todos los productos
```
GET /productos
```

---

### 🔍 Obtener producto por ID
```
GET /productos/:id
```

---

### ✏️ Actualizar producto
```
PUT /productos/:id
```
**Body JSON:**
```json
{
  "nombre": "Teclado mecánico",
  "precio": 3500
}
```

---

### ❌ Eliminar producto
```
DELETE /productos/:id
```

---

## 🛡️ Validación

Los campos `nombre` (string) y `precio` (number) son requeridos.  
Si los datos son inválidos, se devuelve una respuesta con formato:

```json
{
  "status": "error",
  "mensaje": "Datos inválidos",
  "errores": [
    "El nombre debe ser un string",
    "El precio debe ser un número"
  ]
}
```

## 🧪 Probalo con Postman o curl

```bash
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Monitor", "precio": 10000}'
```
