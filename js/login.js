document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('error-msg');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Leer el archivo JSON de usuarios
        try {
            const response = await fetch('../json/usuarios.json'); // Asegurarse que la ruta es correcta
            const data = await response.json();
            const usuarios = data.usuarios;

            // Verificar si el usuario y la contraseña coinciden
            const usuarioEncontrado = usuarios.find(user => user.username === username && user.password === password);

            if (usuarioEncontrado) {
                errorMsg.textContent = '';
                // Redirigir a la nueva página tienda.html
                window.location.href = './pages/tienda.html';
            } else {
                errorMsg.textContent = '';
                // Mostrar un SweetAlert si el usuario o la contraseña son incorrectos
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrectos'
                });
            }
        } catch (error) {
            console.error('Error al leer el archivo JSON:', error);
        }
    });
});

