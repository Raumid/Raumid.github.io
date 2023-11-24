const data = {
    personal: {
        name: 'Raumid',
        middleName: 'de Jesus',
        last_name: 'Santiz Felipe',
        job: 'Desarrollador Web',
        age: function() {
            const DOB = new Date(1998, 2, 20);
            const currentDate = new Date();

            let age = currentDate.getFullYear() - DOB.getFullYear();

            if (currentDate.getMonth() < DOB.getMonth() || 
                (currentDate.getMonth() === DOB.getMonth() && currentDate.getDate() < DOB.getDate())) {
                age--;
            }
            return age;
        },
        experience: function() {
            const init = new Date(2020, 6, 1);
            const currentDate = new Date();

            let experience = currentDate.getFullYear() - init.getFullYear();
            if (currentDate.getMonth() < init.getMonth() || 
                (currentDate.getMonth() === init.getMonth() && currentDate.getDate() < init.getDate())) {
                age--;
            }
            return experience;
        },
        contacts: [
            {
                name: 'phone',
                description: '+52 81 29 71 66 86',
                href: 'tel:+52 8129716686',
                target: '_blank',
                icon: 'fa fa-phone-square'
            },
            {
                name: 'email',
                description: 'raumid98@gmail.com',
                href: 'mailto:raumid98@gmail.com?Subject=Interesado%20en%20sus%20servicios&body=Quiero%20mas%20informacion%20sobre%20algun%20servicio',
                target: '_blank',
                icon: 'fa fa-envelope'
            },
            {
                name: 'github',
                description: 'raumid.github.io/portafolio',
                href: 'https://raumid.github.io/portafolio/',
                target: '_blank',
                icon: 'fa fa-globe'
            },
            {
                name: 'linkedin',
                description: 'www.linkedin.com/in/RaumidSantizFelipe',
                href: 'https://www.linkedin.com/in/RaumidSantizFelipe',
                target: '_blank',
                icon: 'fa fa-linkedin'
            },
            {
                name: 'youtube',
                description: 'www.youtube.com/@RauDev',
                href: 'https://www.youtube.com/@RauDev',
                target: '_blank',
                icon: 'fa fa-youtube'
            }
        ]
    }
};

// principal

// CONTACTO
const ul = document.querySelector('#contact');
data.personal.contacts.map((info) => {
    const li = document.createElement("li");
    const iconSpan = document.createElement("span");
    const icon = document.createElement("i");
    const link = document.createElement("a");

    iconSpan.className = "icon";
    icon.className = info.icon;
    link.href = info.href;
    link.target = info.target;
    link.textContent = info.description;

    iconSpan.appendChild(icon);
    li.appendChild(iconSpan);
    li.appendChild(link);
    ul.appendChild(li);
});

