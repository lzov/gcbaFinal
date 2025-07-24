
// Utilidad para construir la query string según los filtros seleccionados
function buildQueryString(filters) {
  const params = new URLSearchParams();
  if (filters.marca) params.append('marca', filters.marca);
  if (filters.desc) params.append('desc', filters.desc);
  if (filters.modelo) params.append('modelo', filters.modelo);
  if (filters.minPrecio) params.append('minPrecio', filters.minPrecio);
  if (filters.maxPrecio) params.append('maxPrecio', filters.maxPrecio);
  if (filters.orden) params.append('orden', filters.orden);
  return params.toString() ? '?' + params.toString() : '';
}

async function cargarProductos(filters = {}) {
  const lista = document.getElementById('productos-lista');
  const query = buildQueryString(filters);
  try {
    const res = await fetch('https://gcbafinal-ecommerce.onrender.com/api/products' + query, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.status !== 'success' || !Array.isArray(json.datos)) {
      throw new Error('Formato inesperado de API');
    }
    if (json.datos.length === 0) {
      lista.innerHTML = '<li>No hay productos disponibles</li>';
      return;
    }
    lista.innerHTML = '';
    json.datos.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${p.Desc}</strong><br>
        Marca: ${p.Marca} | Modelo: ${p.Modelo}<br>
        SKU: ${p.sku} — Precio: $${p.Precio} — Stock: ${p.Stock}
      `;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    lista.innerHTML = `<li style="color: red;">Error: ${err.message}</li>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  const form = document.getElementById('filtros-form');
  const resetBtn = document.getElementById('reset-filtros');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const filters = {};
      for (const [key, value] of data.entries()) {
        if (value && value !== '') filters[key] = value;
      }
      cargarProductos(filters);
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      cargarProductos();
    });
  }
});
