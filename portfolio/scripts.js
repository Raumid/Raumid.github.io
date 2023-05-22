window.addEventListener('scroll', (event) => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0)
    // console.log(event);
    console.log(window.screenY)
});