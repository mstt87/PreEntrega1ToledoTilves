const prestamos = [
    { tipo: 'Personal', tasa: 10 },
    { tipo: 'Hipotecario', tasa: 6 },
    { tipo: 'Automotriz', tasa: 8 }
];

function calcularPrestamo() {
    const campos = ['monto', 'plazo', 'tipo-prestamo'];

    // Verificar que todos los campos del formulario estén completos
    for (let campo of campos) {
        const valor = document.getElementById(campo).value.trim();
        if (valor === '') {
            alert('Por favor, complete todos los campos correctamente.'); // Se muestra una alerta si algún campo está vacío
            return;
        }
    }

    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    const tipoPrestamo = document.getElementById('tipo-prestamo').value;

    const tasa = obtenerTasa(tipoPrestamo);

    if (!tasa) {
        alert('Tipo de préstamo no válido.');
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
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" placeholder="Ingrese su nombre">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Ingrese su email">
        </div>
        <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" placeholder="Ingrese su teléfono">
        </div>
        <button onclick="enviarDatos()">Enviar</button>
    `;
}

function obtenerTasa(tipoPrestamo) {
    const prestamo = prestamos.find(prestamo => prestamo.tipo === tipoPrestamo);
    return prestamo ? prestamo.tasa : null;
}

function enviarDatos() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    // Verificar que todos los campos del formulario estén completos
    if (nombre === '' || email === '' || telefono === '') {
        alert('Por favor, complete todos los campos del formulario.');
        return;
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    // Validar el formato del número de teléfono
    const telefonoRegex = /^\d{9}$/; // Por ejemplo, 9 dígitos sin espacios ni guiones
    if (!telefonoRegex.test(telefono)) {
        alert('Por favor, ingrese un número de teléfono válido.');
        return;
    }

    // Si todos los campos están correctos, mostrar mensaje de éxito
    alert('Gracias por dejar sus datos. Un representante se pondrá en contacto con usted pronto.');
}
