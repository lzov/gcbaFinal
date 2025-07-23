# API REST - Productos (Node.js + Express + Firebase)

API RESTful para gestionar productos, con autenticación JWT y persistencia en Firebase Firestore.

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Firebase Firestore
- JSON Web Tokens (JWT)
- JavaScript (ES6+)
- Postman (para pruebas)

## 📁 Estructura del proyecto

```
.
├── config/
│   ├── authKey.json         # Credenciales de Firebase
│   └── firebase.js          # Configuración de Firebase
├── controllers/
│   ├── auth.controller.js   # Login y generación de JWT
│   └── products.controller.js
├── data/
│   └── seed.json            # Datos de ejemplo (no usados en producción)
├── middlewares/
│   └── auth.middleware.js   # Middleware de autenticación JWT
├── models/
│   └── product.model.js     # Acceso a Firestore
├── routes/
│   ├── auth.routes.js       # Ruta de login
│   └── products.routes.js   # Rutas CRUD de productos
├── services/
│   ├── products.services.js
│   ├── responder.js         # Formato uniforme de respuestas
│   └── validarProducto.js   # Validación de datos de producto
├── server.js                # Punto de entrada de la aplicación
└── package.json
```

## 📦 Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/lzov/gcbaFinal.git
cd gcbaFinal
```

2. Instalá las dependencias:

```bash
npm install
```

3. Configurá las variables de entorno en un archivo `.env`:

```
JWT_SECRET=tu_clave_secreta
PORT=3000
```

4. Asegurate de tener el archivo `config/authKey.json` con las credenciales de Firebase.

5. Ejecutá el servidor:

```bash
npm start
```

El servidor estará en `http://localhost:3000`.

---

## 🔀 Endpoints disponibles

### Autenticación

#### Login
```
POST /api/auth/login
```
**Body JSON:**
```json
{
  "email": "admin@example.com",
  "password": "1234"
}
```
**Respuesta:**
```json
{
  "status": "success",
  "mensaje": "Login exitoso",
  "datos": {
    "token": "..."
  }
}
```

---

### Productos

> Todas las rutas protegidas requieren el header:  
> `Authorization: Bearer <token>`

#### Obtener todos los productos
```
GET /api/products
```

#### Obtener producto por ID
```
GET /api/products/:id
```

#### Crear un producto (protegido)
```
POST /api/products
```
**Body JSON:**
```json
{
  "nombre": "Teclado",
  "precio": 3000,
  "stock": 10
}
```

#### Actualizar producto (protegido)
```
PUT /api/products/:id
```
**Body JSON:**
```json
{
  "nombre": "Teclado mecánico",
  "precio": 3500
}
```

#### Eliminar producto (protegido)
```
DELETE /api/products/:id
```

---

## 🛡️ Validación

Los campos `nombre` (string) y `precio` (number) son requeridos.  
Si los datos son inválidos, se devuelve una respuesta con formato:

```json
{
  "errores": [
    "El nombre debe ser un string",
    "El precio debe ser un número"
  ]
}
```

---

## 🧪 Prueba rápida con curl

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"nombre":"Monitor", "precio": 10000}'
```

---

## ⚠️ Notas

- Los productos se almacenan en Firebase Firestore.
- El login es solo de ejemplo, con usuario y contraseña fijos.
- El archivo `data/seed.json` es solo de referencia, no se utiliza en producción.
