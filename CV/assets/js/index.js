function cargarEstilos(callback) {
  const url = "assets/css/style.css";
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const estiloCSS = xhr.responseText;
        callback(estiloCSS);
      } else {
        console.error("Error al cargar el archivo CSS");
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// Función para descargar el PDF
function descargarPDF() {
  const contenidoHTML = document.getElementById("contenido").innerHTML;
  const opciones = {
    margin: 10,
    filename: "archivo.pdf",
  };

  const ventana = window.open("", "", "height=500,width=800");
  ventana.document.write(
    "<html><head><title>" + opciones.filename + "</title>"
  );

  // Cargar estilos desde el archivo CSS y agregarlos al PDF
  cargarEstilos(function (estiloCSS) {
    ventana.document.write("<style>" + estiloCSS + "</style>");
    ventana.document.write("</head><body>");
    ventana.document.write(contenidoHTML);
    ventana.document.write("</body></html>");
    ventana.document.close();

    ventana.onload = function () {
      ventana.focus();
      ventana.print();
      ventana.close();
    };
  });
}
