// Compartir tarjeta + toast. Todo lo demas de la tarjeta es HTML puro:
// si este archivo no carga, la pagina sigue completa y funcional.

const btnShare = document.getElementById('btn-share');
const btnSave = document.getElementById('btn-save');
const toastEl = document.getElementById('toast');

let toastTimer;

function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

if (btnShare) {
    const canShare = typeof navigator.share === 'function';
    const canCopy = !!(navigator.clipboard && navigator.clipboard.writeText);

    // Sin ninguna de las dos APIs no se muestra el boton: mejor ausente que muerto.
    if (canShare || canCopy) {
        btnShare.hidden = false;

        btnShare.addEventListener('click', async () => {
            const url = window.location.href;

            if (canShare) {
                try {
                    await navigator.share({
                        title: 'Raumid Santiz — Software Engineer Full-Stack',
                        text: 'Mi tarjeta de presentación digital',
                        url: url
                    });
                    return;
                } catch (error) {
                    // El usuario cerro la hoja de compartir: no es un fallo.
                    if (error && error.name === 'AbortError') return;
                    // Cualquier otro error cae al portapapeles.
                }
            }

            try {
                await navigator.clipboard.writeText(url);
                toast('Enlace copiado');
            } catch (error) {
                toast('No se pudo compartir');
            }
        });
    }
}

// En iOS la hoja de Contactos tarda un instante en aparecer y parece que no paso nada.
if (btnSave) {
    btnSave.addEventListener('click', () => toast('Abriendo contacto…'));
}
