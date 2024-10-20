document.addEventListener("DOMContentLoaded", () => {
    const pedidoConfirmado = localStorage.getItem('pedidoConfirmado');
    const contenedor = document.getElementById('resumenPedidoConfirmado'); // Corregido el ID

    if (pedidoConfirmado) {
        const datosPedido = JSON.parse(pedidoConfirmado);
        const fechaElem = document.createElement('p');
        fechaElem.textContent = `Fecha de pedido: ${datosPedido.fecha}`;
        contenedor.append(fechaElem);

        datosPedido.resumenPedidos.forEach((pedido, index) => {
            const pedidoElem = document.createElement('p');
            pedidoElem.textContent = `${index + 1}. ${pedido.producto}: ${pedido.cantidad} (${pedido.umc} por UMC) - Total: $${pedido.totalPrecio.toFixed(2)}`;
            contenedor.append(pedidoElem);
        });

        const totalElem = document.createElement('p');
        const totalFinal = datosPedido.resumenPedidos.reduce((acc, pedido) => acc + pedido.totalPrecio, 0);
        totalElem.textContent = `Total de la compra: $${totalFinal.toFixed(2)}`;
        contenedor.append(totalElem);
    } else {
        contenedor.textContent = "No se encontraron datos de un pedido confirmado.";
    }
});


