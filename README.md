# API REST - Productos (Node.js + Express + Firebase)

API RESTful para gestión de productos, autenticación JWT y persistencia en Firebase Firestore.

---

## 📁 Estructura del proyecto

```
gcbaFinal/
├── config/
│   ├── authKey.json               # Credenciales de Firebase
│   └── firebase.js                # Configuración de Firebase
├── controllers/
│   ├── auth.controller.js         # Lógica de login y JWT
│   └── products.controller.js     # Lógica de negocio de productos
├── data/
│   └── seed.json                  # Datos de ejemplo
├── middlewares/
│   └── auth.middleware.js         # Middleware de autenticación JWT
├── models/
│   └── product.model.js           # Acceso a productos en Firestore
├── routes/
│   ├── auth.routes.js             # Rutas de autenticación
│   └── products.routes.js         # Rutas CRUD de productos
├── services/
│   ├── products.services.js       # Lógica de servicios de productos
│   ├── responder.js               # Helpers para respuestas uniformes
│   ├── validarProducto.helper.js  # Lógica de validación de productos (helper)
│   └── validarProducto.js         # Middleware de validación de productos
├── .env                           # Variables de entorno
├── .gitignore
├── package.json
├── README.md
└── server.js                      # Punto de entrada de la aplicación
```

---

## 🛡️ Validación de productos

Los productos deben tener los siguientes campos:

- `sku` (string o número, requerido)
- `Desc` (string, requerido)
- `Marca` (string, requerido)
- `Modelo` (string, requerido)
- `Precio` (número, requerido)
- `Stock` (número, requerido)

Si los datos son inválidos, la API responde con:

```json
{
  "errores": [
    "El campo \"Desc\" es requerido y debe ser un string",
    "El campo \"Precio\" es requerido y debe ser un número"
  ]
}
```

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

> Las rutas POST, PUT y DELETE requieren el header:  
> `Authorization: Bearer <token>`

#### Obtener todos los productos
```
GET /api/products
```

#### Obtener producto por ID
```
GET /api/products/:id
```

#### Crear un producto (protegido y validado)
```
POST /api/products
```
**Body JSON:**
```json
{
  "sku": "0016",
  "Desc": "Reloj digital resistente al agua",
  "Marca": "Casio",
  "Modelo": "G-Shock",
  "Precio": 120,
  "Stock": 15
}
```

#### Actualizar producto (protegido y validado)
```
PUT /api/products/:id
```
**Body JSON:** igual que el de creación.

#### Eliminar producto (protegido)
```
DELETE /api/products/:id
```

---

## 🧪 Prueba rápida con curl

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "sku": "0016",
    "Desc": "Reloj digital resistente al agua",
    "Marca": "Casio",
    "Modelo": "G-Shock",
    "Precio": 120,
    "Stock": 15
  }'
```

> Cambia `<token>` por el JWT obtenido en el login.

---

## ⚠️ Notas

- Los productos se almacenan en Firebase Firestore.
- El login es solo de ejemplo, con usuario y contraseña fijos.
- El archivo `data/seed.json` es solo de referencia, no se