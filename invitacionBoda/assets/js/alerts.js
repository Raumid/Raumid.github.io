const btnConfirm = document.getElementById('btn-confirm');
const containerBtnConfirm = document.getElementById('container-btn-confirm');

btnConfirm.addEventListener('click', () => {
    Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Gracias por confirmar tu asistencia",
        text: 'Nos vemos pronto',
        showConfirmButton: false,
        timer: 3500
    }).then((result) => {
        console.log("the result alert", result);   
    });


});


