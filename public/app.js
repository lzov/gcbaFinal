document.addEventListener('DOMContentLoaded', async () => {
  const lista = document.getElementById('productos-lista');

  try {
    const res = await fetch('https://gcbafinal-ecommerce.onrender.com/api/products', {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const json = await res.json();

    if (json.status !== 'success' || !Array.isArray(json.datos)) {
      throw new Error('Formato inesperado de la respuesta');
    }

    if (json.datos.length === 0) {
      lista.innerHTML = '<li>No hay productos disponibles</li>';
      return;
    }

    json.datos.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.Desc} - SKU: ${p.sku}`;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    lista.innerHTML = `<li>Error: ${err.message}</li>`;
  }
});
