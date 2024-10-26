document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const historialPedidos = JSON.parse(localStorage.getItem(`historial_${usuarioActual}`)) || [];
    
    const productosSumatoria = {};
    const productosPorCategoria = {};

    // Recorrer cada pedido para sumar productos y categorizarlos
    historialPedidos.forEach(pedido => {
        pedido.resumenPedidos.forEach(item => {
            // Sumatoria de productos
            if (productosSumatoria[item.producto]) {
                productosSumatoria[item.producto] += item.cantidad;
            } else {
                productosSumatoria[item.producto] = item.cantidad;
            }

            // Verificar si la categoría existe y es válida
            const categoria = item.categoria && item.categoria.trim() !== "" ? item.categoria : 'Sin Categoría';

            // Clasificación por categoría
            if (productosPorCategoria[categoria]) {
                productosPorCategoria[categoria] += item.cantidad;
            } else {
                productosPorCategoria[categoria] = item.cantidad;
            }
        });
    });

    // Convertir productosSumatoria a un arreglo y ordenar de mayor a menor
    const productosOrdenados = Object.entries(productosSumatoria)
        .sort(([, a], [, b]) => b - a); // Ordenar por cantidad (valor) de mayor a menor

    // Mostrar la sumatoria de productos ordenada
    const productosSumatoriaContenedor = document.getElementById('productos-sumatoria');
    productosOrdenados.forEach(([producto, cantidad]) => {
        const li = document.createElement('li');
        li.textContent = `${producto}: ${cantidad} unidades compradas`;
        productosSumatoriaContenedor.appendChild(li);
    });

    // Convertir productosPorCategoria a un arreglo y ordenar de mayor a menor
    const categoriasOrdenadas = Object.entries(productosPorCategoria)
        .sort(([, a], [, b]) => b - a); // Ordenar por cantidad (valor) de mayor a menor

        
    // Mostrar la cantidad de productos por categoría ordenada
    const productosCategoriaContenedor = document.getElementById('productos-categoria');
    categoriasOrdenadas.forEach(([categoria, cantidad]) => {
        const li = document.createElement('li');
        li.textContent = `${categoria}: ${cantidad} unidades compradas`;
        productosCategoriaContenedor.appendChild(li);
    });
});
function mostrarEstadisticas() {
    const resumenContenedor = document.getElementById('resumenEstadisticas');
    resumenContenedor.innerHTML = '';

    // Cargar los pedidos confirmados del localStorage
    const pedidosConfirmados = JSON.parse(localStorage.getItem('pedidoConfirmado')) || [];

    // Crear un objeto para almacenar la cantidad total por categoría
    const cantidadPorCategoria = {};

    pedidosConfirmados.resumenPedidos.forEach(pedido => {
        if (pedido.categoria) {
            if (!cantidadPorCategoria[pedido.categoria]) {
                cantidadPorCategoria[pedido.categoria] = 0;
            }
            cantidadPorCategoria[pedido.categoria] += pedido.cantidad;
        }
    });

    // Mostrar la cantidad de compras por categoría en el DOM
    for (const [categoria, cantidad] of Object.entries(cantidadPorCategoria)) {
        const estadisticaElem = document.createElement('p');
        estadisticaElem.textContent = `${categoria}: ${cantidad} productos`;
        resumenContenedor.append(estadisticaElem);
    }
}
