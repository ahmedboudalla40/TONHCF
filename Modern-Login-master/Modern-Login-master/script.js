const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerBtnAr = document.getElementById('registerAr');
const loginBtnAr = document.getElementById('loginAr');
const langToggle = document.getElementById('langToggle');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

registerBtnAr.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtnAr.addEventListener('click', () => {
    container.classList.remove("active");
});

langToggle.addEventListener('click', toggleLanguage);

// Language Toggle Function
function toggleLanguage() {
    const isEnglish = document.documentElement.lang === 'en';
    
    // Toggle HTML lang attribute and direction
    document.documentElement.lang = isEnglish ? 'ar' : 'en';
    document.documentElement.dir = isEnglish ? 'rtl' : 'ltr';
    
    // Toggle button text
    langToggle.textContent = isEnglish ? 'English' : 'عربي';
    
    // Toggle visibility of language-specific elements
    const enElements = document.querySelectorAll('.en, .en-placeholder');
    const arElements = document.querySelectorAll('.ar, .ar-placeholder');
    
    enElements.forEach(el => {
        el.style.display = isEnglish ? 'none' : 'block';
    });
    
    arElements.forEach(el => {
        el.style.display = isEnglish ? 'block' : 'none';
    });
    
    // Handle input placeholders
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (isEnglish) {
            input.style.textAlign = 'right';
        } else {
            input.style.textAlign = 'left';
        }
    });
}