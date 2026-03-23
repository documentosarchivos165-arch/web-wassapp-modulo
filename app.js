const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const elementos = formulario.elements;
  let datos = {};

  for (let i = 0; i < elementos.length; i++) {
    const campo = elementos[i];

    if (!campo.name) continue;
    if (campo.type === "submit" || campo.type === "reset" || campo.type === "button") continue;

    if (campo.type === "radio") {
      if (campo.checked) {
        datos[campo.name] = campo.value;
      }
      continue;
    }

    if (campo.type === "checkbox") {
      if (campo.checked) {
        if (!datos[campo.name]) {
          datos[campo.name] = [];
        }
        datos[campo.name].push(campo.value);
      }
      continue;
    }

    datos[campo.name] = campo.value;
  }

  let datosHTML = "";

  for (let nombre in datos) {
    let valor = datos[nombre];

    if (Array.isArray(valor)) {
      valor = valor.join(", ");
    }

    datosHTML += `<div class="dato"><strong>${nombre}:</strong> ${valor}</div>`;
  }

  const nuevaVentana = window.open("", "_blank");

  nuevaVentana.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Datos del formulario</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f3f5f8;
          margin: 0;
          padding: 30px 15px;
          color: #222;
        }

        .contenedor {
          max-width: 700px;
          margin: 0 auto;
          background: #fff;
          padding: 30px;
          border: 1px solid #d9dee5;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        h1 {
          text-align: center;
          color: #1f3c88;
          margin-top: 0;
          margin-bottom: 25px;
        }

        .dato {
          margin-bottom: 12px;
          padding: 12px;
          background: #fafbfd;
          border: 1px solid #e3e8ef;
          border-radius: 8px;
        }

        .dato strong {
          color: #1f3c88;
          text-transform: capitalize;
        }
      </style>
    </head>
    <body>
      <div class="contenedor">
        <h1>Datos recogidos del formulario</h1>
        ${datosHTML}
      </div>
    </body>
    </html>
  `);

  nuevaVentana.document.close();
});