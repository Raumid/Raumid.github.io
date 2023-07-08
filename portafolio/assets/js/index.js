let list = document.querySelectorAll('.list');

list.forEach((item) => {
    item.addEventListener('mouseover', setActiveClass)
});

function setActiveClass() {
    list.forEach((item) => {
        item.classList.remove('active');
        this.classList.add('active');
    })
}

window.addEventListener('scroll', function() {
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

function toggleMenu() {
    let menuToggle = document.querySelector('.toggle');
    let menu = document.querySelector('.menu');

    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
}

