ScrollReveal(
    { 
        reset: true,
        // distance: '40px',
        duration: 1500 ,
        delay: 100
    }
);

// //TITLE
ScrollReveal().reveal('.rv-title', {delay: 200, origin: 'left', distance: '120px'});
ScrollReveal().reveal('.rv-subtitle', {delay: 400, origin: 'bottom', distance: '120px'})

ScrollReveal().reveal('.rv-box-left', {delay: 250, origin: 'left', distance: '120px'});
ScrollReveal().reveal('.rv-box-right', {delay: 500, origin: 'right', distance: '20px'});

ScrollReveal().reveal('.rv-tel', {delay: 250, origin: 'top', distance: '120px'});
ScrollReveal().reveal('.rv-email', {delay: 400, origin: 'top', distance: '120px'});