// 1. FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO (Se ejecuta desde consola.html, index.html, etc.)
function agregarCarrito(nombre, precio, imagen) {
    // Intentar obtener el carrito actual de localStorage, si no existe, iniciar uno vacío []
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya existe en el carrito para solo sumarle la cantidad
    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        // Si es nuevo, lo agregamos con cantidad 1
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }

    // Guardar el carrito actualizado de vuelta en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Alerta visual amigable
    alert(`¡${nombre} se agregó al carrito con éxito!`);
}

// 2. LÓGICA PARA MOSTRAR EL CARRITO (Solo se ejecuta si estamos en la página del carrito)
// Verificamos si existe el contenedor de la tabla en el documento actual
document.addEventListener('DOMContentLoaded', () => {
    const tablaCarrito = document.getElementById('items-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    // Si ambos elementos existen, significa que el usuario está en 'carrito.html'
    if (tablaCarrito && totalCarrito) {
        renderizarCarrito(tablaCarrito, totalCarrito);
    }
});

function renderizarCarrito(tabla, totalContenedor) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    tabla.innerHTML = ''; // Limpiar la tabla por si acaso
    let total = 0;

    if (carrito.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-center py-4">Tu carrito está vacío. ¡Ve a la sección de consolas!</td></tr>`;
        totalContenedor.innerText = '0.00';
        return;
    }

    // Recorrer los elementos del carrito y construir las filas de la tabla
    carrito.forEach((producto, index) => {
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        tabla.innerHTML += `
            <tr class="align-middle">
                <td><img src="${producto.imagen}" width="60" class="img-thumbnail me-2">${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})">
                        <i class="btn-close"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    totalContenedor.innerText = total.toFixed(2);
}

// 3. FUNCIÓN PARA ELIMINAR UN PRODUCTO DEL CARRITO
function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Remover el elemento usando su índice de posición
    carrito.splice(index, 1);
    
    // Guardar los cambios y volver a pintar la tabla
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Recargar la vista del carrito
    const tablaCarrito = document.getElementById('items-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    renderizarCarrito(tablaCarrito, totalCarrito);
}

// 4. FUNCIÓN PARA VACIAR TODO EL CARRITO
function vaciarCarrito() {

    if (localStorage.getItem("carrito") != null){
        if (JSON.parse(localStorage.getItem("carrito")).length != 0){
            if  (confirm("¿Estás seguro de que quieres vaciar todo tu carrito?")) {
                localStorage.removeItem('carrito');
                location.reload(); // Recarga la página para limpiar los datos en pantalla
            }
        }

    }
}
// 5. FUNCIÓN PARA PROCESAR EL PAGO Y LIMPIAR EL CARRITO
function procesarPago() {
    // 1. Mostrar el mensaje de éxito al usuario
    alert('¡Gracias por su compra en Nintendo Store! Su pedido ha sido procesado.');
    
    // 2. Borrar por completo el carrito del localStorage
    localStorage.removeItem('carrito');
    
    // 3. Redireccionar al usuario al inicio o recargar la página para que se vea vacío
    location.reload();
}