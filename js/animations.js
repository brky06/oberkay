

let animationsEnabled = true;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('animations') === 'disabled') {
        animationsEnabled = false;
        document.body.classList.add('reduced-animations');
    }
    
    if (reducedMotion && animationsEnabled) {
        animationsEnabled = false;
        document.body.classList.add('reduced-animations');
    }
    
    updateAnimationToggle();
    
    enableScrollAnimations();
    
    const animToggle = document.getElementById('animation-toggle');
    if (animToggle) {
        animToggle.addEventListener('click', toggleAnimations);
    }
});

function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    
    if (animationsEnabled) {
        document.body.classList.remove('reduced-animations');
        localStorage.setItem('animations', 'enabled');
    } else {
        document.body.classList.add('reduced-animations');
        localStorage.setItem('animations', 'disabled');
    }
    
    updateAnimationToggle();
}

function updateAnimationToggle() {
    const animToggle = document.getElementById('animation-toggle');
    if (animToggle) {
        animToggle.innerHTML = animationsEnabled ? '✨' : '⚡';
        animToggle.setAttribute('aria-label', 
            animationsEnabled ? 'Animasyonları Kapat' : 'Animasyonları Aç');
    }
}

function enableScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && animationsEnabled) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && animationsEnabled) {
                element.classList.add('show');
            }
        });
    }, 100);
}

if (document.querySelector('.slider')) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    let slideInterval;
    
    function startSlider() {
        if (animationsEnabled) {
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    function goToSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlider();
        startSlider();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopSlider();
            startSlider();
        });
    });
    
    startSlider();
}
