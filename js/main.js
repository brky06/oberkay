document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    
    setupContactForm();
    
    setupMobileMenu();
    
    setupActiveLinks();
    
    setupCVDownload();
    
    setupSlider();
});

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = localStorage.getItem('theme');
    
    if (!currentTheme) {
        currentTheme = prefersDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    }
    
    applyTheme(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            

            alert('Form Gonderilemedi: Lutfen mail ile tekrar deneyin.');
            
            contactForm.reset();
        });
    }
}

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (!mobileMenuBtn || !mobileMenu || !mobileMenuOverlay) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        mobileMenuBtn.classList.toggle('active');
    });

    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.style.overflow = '';
        });
    });

    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    const mobileAnimationToggle = document.getElementById('mobile-animation-toggle');
    
    const mainThemeToggle = document.getElementById('theme-toggle');
    const mainLangToggle = document.getElementById('lang-toggle');
    const mainAnimationToggle = document.getElementById('animation-toggle');

    if (mobileThemeToggle && mainThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            mainThemeToggle.click();
        });
    }

    if (mobileLangToggle && mainLangToggle) {
        mobileLangToggle.addEventListener('click', () => {
            mainLangToggle.click();
        });
    }

    if (mobileAnimationToggle && mainAnimationToggle) {
        mobileAnimationToggle.addEventListener('click', () => {
            mainAnimationToggle.click();
        });
    }
}

function setupActiveLinks() {
    const currentPath = window.location.pathname;
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupCVDownload() {
    const downloadBtn = document.getElementById('download-cv');
    if (!downloadBtn) {
        console.log('CV download button not found');
        return;
    }
    
    console.log('CV download button found:', downloadBtn);
    updateCVLink();
    
    document.addEventListener('languageChanged', updateCVLink);
}

function updateCVLink() {
    const downloadBtn = document.getElementById('download-cv');
    if (!downloadBtn) {
        console.log('CV download button not found in updateCVLink');
        return;
    }
    
    const currentLang = document.documentElement.lang || 'tr';
    console.log('Current language:', currentLang);
    
    if (currentLang === 'en') {
        const enHref = downloadBtn.getAttribute('data-cv-en');
        console.log('Setting EN CV link:', enHref);
        downloadBtn.href = enHref;
    } else {
        const trHref = downloadBtn.getAttribute('data-cv-tr');
        console.log('Setting TR CV link:', trHref);
        downloadBtn.href = trHref;
    }
}

function setupSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(nextSlide, 5000);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
