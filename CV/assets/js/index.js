const btnDownload = document.querySelector("#btnDownload");

const nameFile = "CV_RaumidSantizFelipe-Desarrollador";
const extensionFile = ".PDF";

btnDownload.addEventListener("click", async function() {
  window.html2canvas = html2canvas;
  window.jsPDF = window.jspdf.jsPDF;

  const doc = new jsPDF();
  // doc.addPage("a4", "landscape");

  //TRY WITH IMG CANVAS
  const contentCanvas = await html2canvas(document.getElementById("contenido")
  ,{
  //   scrollX:0,
  //   scrollY:0,
    windowWidth: 2000,
    windowHeight: 4000
  }
  );

  const imgWidth = contentCanvas.width;
  const imgHeight = contentCanvas.height;

  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = doc.internal.pageSize.getHeight();

  const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  const adjustedWidth = imgWidth * scaleFactor;
  const adjustedHeight = imgHeight * scaleFactor;

  const xPosition = (pdfWidth - adjustedWidth) / 2;
  const yPosition = (pdfHeight - adjustedHeight) / 2;

  const image = contentCanvas.toDataURL("image/png");
  doc.addImage(image, "png",0, 0, adjustedWidth, pdfHeight - 20);
  doc.save(nameFile + extensionFile);
});