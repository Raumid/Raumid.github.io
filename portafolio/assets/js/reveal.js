ScrollReveal(
    { 
        reset: true,
        distance: '120px',
        duration: 2500 ,
        delay: 400
    }
);

//TITLE
ScrollReveal().reveal('.rv-title', {delay: 200, origin: 'left'});
ScrollReveal().reveal('.rv-subtitle', {delay: 500, origin: 'bottom'})

ScrollReveal().reveal('.rv-box-left', {delay: 300, origin: 'left'})
ScrollReveal().reveal('.rv-box-rigth', {delay: 400, origin: 'rigth'})

ScrollReveal().reveal('.rv-tel', {delay: 300, origin: 'top'});
ScrollReveal().reveal('.rv-email', {delay: 500, origin: 'top'});