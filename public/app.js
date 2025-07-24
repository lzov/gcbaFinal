document.addEventListener('DOMContentLoaded', async () => {
  const lista = document.getElementById('productos-lista');

  try {
    const res = await fetch('https://gcbafinal-ecommerce.onrender.com/api/products', {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();

    if (json.status !== 'success' || !Array.isArray(json.datos)) {
      throw new Error('Formato inesperado de API');
    }

    if (json.datos.length === 0) {
      lista.innerHTML = '<li>No hay productos disponibles</li>';
      return;
    }

    lista.innerHTML = ''; // limpiar estado de carga

    json.datos.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${p.Desc}</strong><br>
        SKU: ${p.sku} — Precio: $${p.Precio}
      `;
      lista.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    lista.innerHTML = `<li style="color: red;">Error: ${err.message}</li>`;
  }
});
