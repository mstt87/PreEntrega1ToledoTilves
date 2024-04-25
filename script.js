const prestamosJSON = localStorage.getItem('prestamos');
const prestamos = prestamosJSON ? JSON.parse(prestamosJSON) : [
    { tipo: 'Personal', tasa: 10 },
    { tipo: 'Hipotecario', tasa: 6 },
    { tipo: 'Automotriz', tasa: 8 }
];

function guardarPrestamosEnLocalStorage() {
    localStorage.setItem('prestamos', JSON.stringify(prestamos));
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeElement = document.getElementById('mensaje');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.remove('oculto');
    mensajeElement.classList.add(tipo);
}

function ocultarMensaje() {
    const mensajeElement = document.getElementById('mensaje');
    mensajeElement.classList.add('oculto');
    mensajeElement.classList.remove('error');
    mensajeElement.classList.remove('exito');
}

function limpiarFormulario() {
    document.getElementById('formulario').reset();
}

function calcularPrestamo() {
    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    const tipoPrestamo = document.getElementById('tipo-prestamo').value;

    const tasa = obtenerTasa(tipoPrestamo);

    if (!tasa) {
        mostrarMensaje('Tipo de préstamo no válido.', 'error');
        return;
    }

    // Calcular la cuota mensual y el total a pagar
    const tasaMensual = tasa / 12 / 100;
    const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    const totalAPagar = cuotaMensual * plazo;

    // Mostrar los resultados en la página
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `
        <p>Monto del préstamo: $${monto.toFixed(2)}</p>
        <p>Plazo en meses: ${plazo}</p>
        <p>Tipo de préstamo: ${tipoPrestamo}</p>
        <p>Tasa de interés anual: ${tasa}%</p>
        <p>Cuota mensual: $${cuotaMensual.toFixed(2)}</p>
        <p>Total a pagar: $${totalAPagar.toFixed(2)}</p>
        <p>¡Gracias por usar nuestro simulador! La información del préstamo ha sido calculada con éxito.</p>
        <p>Si desea continuar con el proceso de solicitud, por favor complete el siguiente formulario:</p>
    `;

    // Mostrar el formulario de solicitud
    document.getElementById('formulario').classList.remove('oculto');

    // Limpiar el formulario después de calcular el préstamo
    limpiarFormulario();

    // Guardar préstamos en el LocalStorage
    guardarPrestamosEnLocalStorage();

    ocultarMensaje();
}

function obtenerTasa(tipoPrestamo) {
    const prestamo = prestamos.find(prestamo => prestamo.tipo === tipoPrestamo);
    return prestamo ? prestamo.tasa : null;
}

function enviarDatos() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (nombre === '' || email === '' || telefono === '') {
        mostrarMensaje('Por favor, complete todos los campos del formulario.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje('Por favor, ingrese un correo electrónico válido.', 'error');
        return;
    }

    const usuario = { nombre, email, telefono };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Mostrar mensaje emergente
    const modal = document.getElementById('modal');
    modal.classList.add('visible');

    // Ocultar el modal después de 3 segundos
    setTimeout(() => {
        modal.classList.remove('visible');
    }, 3000);

    // Limpiar el formulario después de enviar los datos
    limpiarFormulario();
}

function cargarDatosUsuario() {
    const usuarioJSON = localStorage.getItem('usuario');
    if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('email').value = usuario.email;
        document.getElementById('telefono').value = usuario.telefono;
    }
}

cargarDatosUsuario();

// Capturar eventos del usuario sobre los inputs y botones
document.getElementById('calcular-btn').addEventListener('click', calcularPrestamo);
document.getElementById('enviar-btn').addEventListener('click', enviarDatos);

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', ocultarMensaje);
});



// Agregar evento de submit al formulario
document.getElementById('formulario').addEventListener('submit', function(event) {
    // Evitar que el formulario se envíe de manera predeterminada
    event.preventDefault();

    // Enviar los datos
    enviarDatos();

    // Limpiar el formulario
    limpiarFormulario();
});



