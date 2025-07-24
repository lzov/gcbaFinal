document.addEventListener('DOMContentLoaded', async () => {
  const lista = document.getElementById('productos-lista');

  try {
    const res = await fetch('https://TU_BACKEND.vercel.app/api/productos');
    const json = await res.json();

    if (json.status !== 'success') throw new Error('Error al cargar productos');

    json.datos.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nombre} - $${p.precio}`;
      lista.appendChild(li);
    });
  } catch (err) {
    lista.innerHTML = `<li>Error: ${err.message}</li>`;
  }
});
