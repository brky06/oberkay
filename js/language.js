
let currentLang = 'tr';
let translations = {
    en: {},
    tr: {}
};

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations()
        .then(() => {
            const savedLang = localStorage.getItem('language');
            if (savedLang) {
                currentLang = savedLang;
            }
            
            applyTranslations();
            
            const langToggle = document.getElementById('lang-toggle');
            if (langToggle) {
                langToggle.addEventListener('click', toggleLanguage);
                updateLanguageToggle();
            }
        })
        .catch(error => {
            console.error('Çeviriler yüklenirken hata oluştu:', error);
        });
});

async function loadTranslations() {
    try {
        const rootPath = window.location.pathname.includes('/projects/') ? '../' : '';
        
        const [enResponse, trResponse] = await Promise.all([
            fetch(`${rootPath}assets/lang/en.json`),
            fetch(`${rootPath}assets/lang/tr.json`)
        ]);

        const enData = await enResponse.json();
        const trData = await trResponse.json();

        translations.en = enData;
        translations.tr = trData;
        
        return true;
    } catch (error) {
        console.error('Çeviri dosyaları yüklenirken hata:', error);
        return false;
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    
    localStorage.setItem('language', currentLang);
    
    applyTranslations();
    
    updateLanguageToggle();
    
    const event = new CustomEvent('languageChanged', { detail: { language: currentLang } });
    document.dispatchEvent(event);
}

function updateLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = translations[currentLang].lang_button;
    }
}

function applyTranslations() {
    document.title = getTranslation(document.title.split('|')[0].trim(), true) || document.title;
    
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        const translation = getTranslation(key);
        
        if (translation) {
            if (element.querySelector('img')) {
                return;
            }
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.value = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
    });
    
    document.documentElement.lang = currentLang;
}

function getTranslation(key, isTitle = false) {
    if (translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    
    if (isTitle && key) {
        const titleKey = Object.keys(translations[currentLang]).find(k => 
            k.endsWith('_title') && translations[currentLang][k].startsWith(key)
        );
        
        if (titleKey) {
            return translations[currentLang][titleKey];
        }
    }
    
    return key;
}
