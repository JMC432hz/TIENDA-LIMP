document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const historialPedidos = JSON.parse(localStorage.getItem(`historial_${usuarioActual}`)) || [];
    const historialContenedor = document.getElementById('historialPedidos');
    const botonEstadisticas = document.getElementById('verEstadisticas');

    if (historialPedidos.length === 0) {
        historialContenedor.textContent = "No hay pedidos en su historial.";
    } else {
        historialPedidos.forEach((pedido, index) => {
            const pedidoElem = document.createElement('div');
            pedidoElem.classList.add('pedido-item');
            pedidoElem.innerHTML = `
                <h3>Pedido ${index + 1}</h3>
                <p>Fecha: ${pedido.fecha}</p>
                <ul>
                    ${pedido.resumenPedidos.map(item => `
                        <li>${item.producto} - Cantidad: ${item.cantidad} (${item.umc}) - Total: $${item.totalPrecio.toFixed(2)}</li>
                    `).join('')}
                </ul>
            `;
            historialContenedor.appendChild(pedidoElem);
        });
    }

    // Event listener para abrir la página de estadísticas
    botonEstadisticas.addEventListener('click', () => {
        window.open('estadisticas.html', '_blank');
    });
});
