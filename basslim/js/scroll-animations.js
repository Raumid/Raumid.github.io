// Intersection Observer for scroll animations
const animateOnScroll = () => {
    // Select all elements with the animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .section-reveal');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Create new observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the element is in the viewport
                if (entry.isIntersecting) {
                    // Add the visible class to trigger the animation
                    entry.target.classList.add('visible');
                    
                    // Optional: Unobserve the element after it's been animated
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Remove the visible class when element is out of view
                    // entry.target.classList.remove('visible');
                }
            });
        }, {
            // Trigger the callback when the element is 20% visible in the viewport
            threshold: 0.2,
            // Start the callback when the element is 50px from the viewport
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe each element
        animateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(element => {
            element.classList.add('visible');
        });
    }
};

// Parallax effect for hero section
const parallaxEffect = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
};

// Staggered animation for elements with delay classes
const staggeredAnimation = () => {
    const elements = document.querySelectorAll('[class*="delay-"]');
    
    elements.forEach(element => {
        // Extract delay value from class name (e.g., 'delay-200' -> 200)
        const delayClass = Array.from(element.classList).find(className => className.startsWith('delay-'));
        if (delayClass) {
            const delay = parseInt(delayClass.split('-')[1]);
            element.style.transitionDelay = `${delay}ms`;
        }
    });
};

// Initialize all animations when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize parallax effect
    parallaxEffect();
    
    // Initialize staggered animations
    staggeredAnimation();
    
    // Add loaded class to body when everything is ready
    document.body.classList.add('loaded');
});

// Re-run animations when the window is resized
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.remove('loaded');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.add('loaded');
        staggeredAnimation();
    }, 250);
});

// Animate progress bars on scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if ('IntersectionObserver' in window) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width + '%';
                    progressBar.setAttribute('aria-valuenow', width);
                    progressObserver.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.setAttribute('aria-valuenow', width);
        });
    }
};

// Call this function when you have progress bars to animate
// animateProgressBars();

// Counter animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster
    
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.animated) {
                    const target = +entry.target.getAttribute('data-target');
                    const count = +entry.target.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + increment);
                        entry.target.animated = true;
                        animateCounter(entry.target, count, target, increment);
                    } else {
                        entry.target.innerText = target;
                    }
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            counter.animated = false;
            counterObserver.observe(counter);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            counter.innerText = target;
        });
    }
};

function animateCounter(element, current, target, increment) {
    if (current < target) {
        element.innerText = Math.ceil(current + increment);
        setTimeout(() => {
            animateCounter(element, current + increment, target, increment);
        }, 1);
    } else {
        element.innerText = target;
    }
}

// Call this function when you have counters to animate
// animateCounters();
