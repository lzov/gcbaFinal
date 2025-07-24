
# GCBA Final - Ecommerce SPA + API (Node.js, Express, Firebase, Vercel)

Proyecto de ecommerce con SPA (Single Page Application) en `/public` y backend Node.js + Express + Firebase Firestore. El frontend se despliega en Vercel y el backend en Render, integrados mediante proxy (`vercel.json`).

Incluye autenticación anónima con Firebase Auth para permitir operaciones CRUD de terceros, validación de productos y paginación.

---


## 📁 Estructura principal

```
gcbaFinal/
├── public/                # SPA (frontend Vercel)
│   ├── app.js             # Lógica principal SPA
│   ├── index.html         # UI y documentación
│   └── style.css          # Estilos
├── server.js              # Backend Express (Render)
├── controllers/           # Lógica de negocio
├── models/                # Acceso a Firestore
├── middlewares/           # Autenticación y validación
├── services/              # Servicios y helpers
├── config/                # Configuración Firebase
├── routes/                # Endpoints API
├── data/                  # Datos de ejemplo
├── vercel.json            # Proxy Vercel → Render
└── package.json           # Dependencias
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


## 🔀 Endpoints principales

### Autenticación

- `POST /api/auth/login` — Login con usuario fijo (admin@example.com / 1234). Devuelve JWT.
- Autenticación anónima: El SPA usa Firebase Auth para permitir operaciones CRUD a terceros.

### Productos

- `GET /api/products` — Lista todos los productos (paginado).
- `GET /api/products/:id` — Obtiene producto por ID.
- `POST /api/products` — Crea producto (requiere JWT o usuario anónimo).
- `PUT /api/products/:id` — Actualiza producto (requiere JWT o usuario anónimo).
- `DELETE /api/products/:id` — Elimina producto (requiere JWT o usuario anónimo).

> Las rutas POST, PUT y DELETE requieren el header:
> `Authorization: Bearer <token>`

La SPA usa el proxy de Vercel (`vercel.json`) para redirigir `/api/*` al backend en Render.

## 🧪 Ejemplo de uso

### 1. Crear producto desde el SPA

En el sitio, completá el formulario y presioná "Agregar producto". El frontend obtiene un token anónimo de Firebase y lo envía en el header:

```js
fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + firebaseToken
  },
  body: JSON.stringify({ sku, Desc, Marca, Modelo, Precio, Stock })
})
```

---


## ⚠️ Notas

- Los productos se almacenan en Firebase Firestore.
- El login es solo de ejemplo, con usuario y contraseña fijos.
- El SPA permite CRUD a terceros mediante autenticación anónima.
- El proxy en `vercel.json` permite usar rutas `/api/*` en el frontend sin CORS.
- El archivo `data/seed.json` es solo de referencia.