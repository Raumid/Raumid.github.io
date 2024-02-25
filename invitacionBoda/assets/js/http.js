const paramUrl = window.location.search;
const parametros = new URLSearchParams(paramUrl);

const nameGuest = document.querySelector('#nameGuest');
const select = document.getElementById('number-guests');
const rsvpcomments = document.getElementById('rsvpcomments');

const numguestContainer = document.getElementById("numguest-container");
const commenttContainer = document.getElementById("comment-container");
const textConfirm = document.getElementById("textConfirm");

const btnConfirm = document.getElementById('btn-confirm');
const containerBtnConfirm = document.getElementById('container-btn-confirm');

const URLDEV = "http://localhost:3500/api/guests";
const URLPROD = "https://rauneth.com/backend/api/guests";

const token = parametros.get("token");


if(token != null) {
    console.log("token", token)
    getData();
}

async function getData () {
    try {
        
        const response = await fetch(`${URLPROD}/getOne-by-token`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
        });
        const guest = await response.json();

        if(response.status != 200) {
            Swal.fire({
                // position: "top-end",
                icon: "error",
                title: "Error",
                text: guest,
                showConfirmButton: false,
                timer: 3500
            }).then((result) => {
                nameGuest.style.display = "none";
                textConfirm.innerHTML = "Este Invitado no existe o fue Eliminado"
            });
        }
        // console.log(guest);

        if(guest.c_statusguest !=  1) {
            btnConfirm.style.display = "none";
            numguestContainer.style.display = "none"
            commenttContainer.style.display = "none";
            textConfirm.innerHTML = "Gracias por confirmar"
        }

        if(nameGuest)
            nameGuest.innerHTML = guest.c_nameguest;

        
        const options = [];
        for(let i = 0; i <= guest.c_totalguest; i ++) {
            options.push(i == 0 ? "No Podremos asistir" : i);
        }

        options.forEach((option, index) => {
            const newOption = document.createElement('option');
            newOption.value = index ; 
            newOption.text = option;
            
            select.appendChild(newOption);
        });

        select.value = guest.c_totalguest;
    } catch (error) {
        console.log("error", error);
    }

}

btnConfirm.addEventListener('click', async ($event) => {
    try {
        const response = await fetch(`${URLPROD}/put-status`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: rsvpcomments.value  || '',
                numGuests: select.value || c_totalguest
            }) 
        });

        // console.log("PUT STATUS", response)

        if(response.status != 200){
            let res = await response.json();
            Swal.fire({
                // position: "top-end",
                icon: "error",
                title: "Error",
                text: res,
                showConfirmButton: false,
                timer: 3500
            }).then((result) => {
                getData();  
            });
            return;
        }

        Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Gracias por confirmar tu asistencia",
                    text: 'Nos vemos pronto',
                    showConfirmButton: false,
                    timer: 3500
                }).then((result) => {
                    console.log("the result alert", result); 
                    getData();  
                });
    } catch (error) {
        Swal.fire({
            // position: "top-end",
            icon: "error",
            title: "Algo salio mal",
            text: 'Intentalo mas tarde',
            showConfirmButton: false,
            timer: 3500
        }).then((result) => {
            getData();  
        });
    }
});

async function confirm() {
    
}