document.addEventListener("DOMContentLoaded", () => {
    const pedidoConfirmado = localStorage.getItem('pedidoConfirmado');
    const contenedor = document.getElementById('resumenPedidoConfirmado');
    const botonImprimir = document.getElementById('imprimirCotizacion');

    if (pedidoConfirmado) {
        const datosPedido = JSON.parse(pedidoConfirmado);
        
        // Mostrar fecha del pedido
        const fechaElem = document.createElement('p');
        fechaElem.textContent = `Fecha de pedido: ${datosPedido.fecha}`;
        contenedor.append(fechaElem);

        // Iterar sobre cada producto del resumen de pedidos
        datosPedido.resumenPedidos.forEach((pedido, index) => {
            // Crear un contenedor para cada ítem de la compra
            const pedidoElem = document.createElement('div');
            pedidoElem.classList.add('item-pedido');

            // Añadir imagen del producto con validación simplificada
            const imagenElem = document.createElement('img');
            imagenElem.src = pedido.imagen ? pedido.imagen : '../img/default.jpg'; // Ruta a una imagen por defecto si no hay imagen
            imagenElem.alt = pedido.producto || 'Producto';
            imagenElem.classList.add('imagen-producto');

            // Información del producto
            const infoElem = document.createElement('p');
            infoElem.textContent = `${index + 1}. ${pedido.producto || 'Producto desconocido'} - Cantidad: ${pedido.cantidad || 0} (${pedido.umc || 'UMC desconocida'} por UMC) - Total: $${pedido.totalPrecio ? pedido.totalPrecio.toFixed(2) : '0.00'}`;

            // Añadir la imagen y la información al contenedor del pedido
            pedidoElem.append(imagenElem);
            pedidoElem.append(infoElem);
            contenedor.append(pedidoElem);
        });

        // Mostrar el total de la compra
        const totalElem = document.createElement('p');
        const total = datosPedido.resumenPedidos.reduce((acc, pedido) => acc + (pedido.totalPrecio || 0), 0);
        totalElem.textContent = `Total de la compra: $${total.toFixed(2)}`;
        contenedor.append(totalElem);
    } else {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = 'No se encontró ningún pedido confirmado.';
        contenedor.append(mensajeError);
    }

    // Evento para imprimir la cotización
    botonImprimir.addEventListener('click', () => {
        window.print();
    });
});
