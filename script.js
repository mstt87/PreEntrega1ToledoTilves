
function calcularPrestamo() {
    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    const tasaAnual = parseFloat(document.getElementById('tasa').value);

    const tasaMensual = tasaAnual / 12 / 100;
    const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    const totalAPagar = cuotaMensual * plazo;

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `
        <p>Monto del préstamo: $${monto.toFixed(2)}</p>
        <p>Plazo en meses: ${plazo}</p>
        <p>Tasa de interés anual: ${tasaAnual}%</p>
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

function enviarDatos() {
 
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

   
    // Aquí puedes mostrar un mensaje de éxito al usuario o redirigirlo a otra página
    alert('Gracias por dejar sus datos. Un representante se pondrá en contacto con usted pronto.');
}