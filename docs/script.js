// ===== لوگوی متحرک AIdea =====
const logoAI = document.querySelector('.logo-ai');
const logoDEA = document.querySelector('.logo-dea');
const logoContainer = document.querySelector('.logo');
let timeoutId = null;

// ریست اولیه
function resetLogo() {
    logoAI.style.transition = 'none';
    logoDEA.style.transition = 'none';
    logoAI.style.opacity = '0';
    logoDEA.style.opacity = '0';
    logoAI.style.transform = 'translateX(30px)';
    logoDEA.style.transform = 'translateX(30px)';
    logoAI.style.filter = 'blur(0px)';
    logoDEA.style.filter = 'blur(0px)';

    //强制执行回流
    void logoAI.offsetWidth;
}

// انیمیشن اصلی
function animateLogo() {
    // پاک کردن تایمر قبلی
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    resetLogo();

    // انیمیشن AI
    logoAI.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    logoAI.style.opacity = '1';
    logoAI.style.transform = 'translateX(0)';

    // بعد 0.4 ثانیه، انیمیشن DEA
    setTimeout(() => {
        logoDEA.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        logoDEA.style.opacity = '1';
        logoDEA.style.transform = 'translateX(0)';
    }, 400);

    // بعد 3 ثانیه، هر دو محو بشن
    setTimeout(() => {
        logoAI.style.transition = 'all 1s ease-out';
        logoDEA.style.transition = 'all 1s ease-out';
        logoAI.style.opacity = '0';
        logoDEA.style.opacity = '0';
        logoAI.style.filter = 'blur(5px)';
        logoDEA.style.filter = 'blur(5px)';
        logoAI.style.transform = 'translateX(-15px)';
        logoDEA.style.transform = 'translateX(-15px)';
    }, 3000);

    // بعد 4.5 ثانیه، دوباره اجرا کن
    timeoutId = setTimeout(() => {
        animateLogo();
    }, 4800);
}

// شروع انیمیشن بعد از نیم ثانیه
setTimeout(() => {
    animateLogo();
}, 500);

// ===== هاور: مات شدن (موقت) =====
logoContainer.addEventListener('mouseenter', () => {
    // پاک کردن تایمر
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // قطع انیمیشن و مات کردن
    logoAI.style.transition = 'all 0.2s ease';
    logoDEA.style.transition = 'all 0.2s ease';
    logoAI.style.opacity = '0.4';
    logoDEA.style.opacity = '0.4';
    logoAI.style.filter = 'blur(3px)';
    logoDEA.style.filter = 'blur(3px)';
    logoAI.style.transform = 'none';
    logoDEA.style.transform = 'none';
});

logoContainer.addEventListener('mouseleave', () => {
    // برگردوندن به حالت عادی و اجرای دوباره انیمیشن
    logoAI.style.opacity = '0';
    logoDEA.style.opacity = '0';
    logoAI.style.filter = 'blur(0px)';
    logoDEA.style.filter = 'blur(0px)';
    animateLogo();
});

// // ===== اسلایدر استک کارت =====
// class CardStack {
//     constructor() {
//         this.cards = document.querySelectorAll('.stack-card');
//         this.prevBtn = document.getElementById('stackPrev');
//         this.nextBtn = document.getElementById('stackNext');
//         this.counter = document.getElementById('stackCounter');
//         this.currentIndex = 0;
//         this.totalCards = this.cards.length;
//         this.animating = false;

//         this.init();
//     }

//     init() {
//         this.updateCards();

//         this.prevBtn.addEventListener('click', () => this.prev());
//         this.nextBtn.addEventListener('click', () => this.next());

//         // سوایپ لمسی برای موبایل
//         let touchStartX = 0;
//         let touchEndX = 0;

//         const container = document.querySelector('.stack-cards');

//         container.addEventListener('touchstart', (e) => {
//             touchStartX = e.changedTouches[0].screenX;
//         });

//         container.addEventListener('touchend', (e) => {
//             touchEndX = e.changedTouches[0].screenX;
//             if (touchEndX < touchStartX - 50) this.next();
//             if (touchEndX > touchStartX + 50) this.prev();
//         });
//     }

//     updateCards() {
//         // به‌روزرسانی شمارنده
//         this.counter.textContent = `${this.currentIndex + 1} / ${this.totalCards}`;

//         // تنظیم z-index و نمایش کارت‌ها
//         this.cards.forEach((card, i) => {
//             if (i === this.currentIndex) {
//                 card.style.opacity = '1';
//                 card.style.transform = 'scale(1)';
//                 card.style.zIndex = this.totalCards - i;
//             } else if (i > this.currentIndex) {
//                 const offset = (i - this.currentIndex) * 15;
//                 card.style.opacity = '0.6';
//                 card.style.transform = `scale(${1 - (i - this.currentIndex) * 0.05}) translateY(${offset}px)`;
//                 card.style.zIndex = this.totalCards - i;
//             } else {
//                 card.style.opacity = '0';
//                 card.style.transform = 'translateX(100%)';
//                 card.style.zIndex = 0;
//             }
//         });
//     }

//     next() {
//         if (this.animating) return;
//         this.animating = true;

//         const currentCard = this.cards[this.currentIndex];
//         currentCard.classList.add('exit-right');

//         setTimeout(() => {
//             if (this.currentIndex < this.totalCards - 1) {
//                 this.currentIndex++;
//             } else {
//                 this.currentIndex = 0;
//             }
//             currentCard.classList.remove('exit-right');
//             this.updateCards();
//             this.animating = false;
//         }, 400);
//     }

//     prev() {
//         if (this.animating) return;
//         this.animating = true;

//         const currentCard = this.cards[this.currentIndex];
//         currentCard.classList.add('exit-left');

//         setTimeout(() => {
//             if (this.currentIndex > 0) {
//                 this.currentIndex--;
//             } else {
//                 this.currentIndex = this.totalCards - 1;
//             }
//             currentCard.classList.remove('exit-left');
//             this.updateCards();
//             this.animating = false;
//         }, 400);
//     }
// }

// // راه‌اندازی اسلایدر
// document.addEventListener('DOMContentLoaded', () => {
//     new CardStack();
// });





// ===== اسلایدر افقی با سوایپ لمسی =====
const sliderContainer = document.getElementById('glassSlider');
const track = document.getElementById('glassTrack');
const prevBtn = document.getElementById('glassPrev');
const nextBtn = document.getElementById('glassNext');
const dots = document.querySelectorAll('#glassDots .dot');
let currentIndex = 0;
const cards = document.querySelectorAll('.glass-card');
const cardWidth = cards[0]?.offsetWidth + 30 || 410;

function updateDots() {
    const scrollLeft = sliderContainer.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    currentIndex = Math.min(newIndex, cards.length - 1);

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function scrollToIndex(index) {
    sliderContainer.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
    });
}

prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
    }
});

nextBtn?.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        scrollToIndex(currentIndex + 1);
    }
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        scrollToIndex(i);
    });
});

sliderContainer.addEventListener('scroll', () => {
    updateDots();
});

window.addEventListener('resize', () => {
    updateDots();
});

updateDots();

// ===== اسلایدر با نقطه‌های فعال =====
const sliderContainer = document.getElementById('servicesSlider');
const track = document.getElementById('servicesTrack');
const prevBtn = document.getElementById('servicesPrev');
const nextBtn = document.getElementById('servicesNext');
const dotsContainer = document.getElementById('servicesDots');
let currentIndex = 0;
const cards = document.querySelectorAll('.service-card-custom');
let cardWidth = 390; // عرض کارت + gap

function updateCardWidth() {
    if (cards.length > 0) {
        const card = cards[0];
        const style = getComputedStyle(card);
        const width = card.offsetWidth;
        const gap = 30; // gap از CSS
        cardWidth = width + gap;
    }
}

function updateDots() {
    const scrollLeft = sliderContainer.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    currentIndex = Math.min(Math.max(newIndex, 0), cards.length - 1);

    const dots = document.querySelectorAll('.dot-custom');
    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function scrollToIndex(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;

    sliderContainer.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
    });

    currentIndex = index;
    updateDots();
}

// دکمه قبلی
prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
    }
});

// دکمه بعدی
nextBtn?.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        scrollToIndex(currentIndex + 1);
    }
});

// کلیک روی نقطه‌ها
function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot-custom');
        if (i === currentIndex) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            scrollToIndex(i);
        });
        dotsContainer.appendChild(dot);
    });
}

// رویداد اسکرول
sliderContainer.addEventListener('scroll', () => {
    updateDots();
});

// ریسایز ویندوز
window.addEventListener('resize', () => {
    updateCardWidth();
    updateDots();
});

// مقداردهی اولیه
function init() {
    updateCardWidth();
    createDots();
    updateDots();
}

init();

// ===== شمارنده متحرک آمار =====// شمارنده ساده// ===== شمارنده اعداد آمار =====
function startCounters() {
    // اعداد هدف و المان‌ها
    const counters = [
        { id: 'stat1', target: 201, suffix: '', current: 0 },
        { id: 'stat2', target: 8, suffix: '', current: 0 },
        { id: 'stat3', target: 145, suffix: '', current: 0 }
    ];

    // stat4 رو جدا چون عددی نیست (۲۴-۷)
    const stat4 = document.getElementById('stat4');
    if (stat4) stat4.textContent = '۲۴/۷';

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (!element) return;

        const duration = 2000; // مدت زمان شمارش (2 ثانیه)
        const stepTime = 20; // هر 20 میلی‌ثانیه یک بار افزایش
        const steps = duration / stepTime;
        const increment = counter.target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                element.textContent = counter.target + counter.suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + counter.suffix;
            }
        }, stepTime);
    });
}

// وقتی صفحه کامل لود شد، شمارنده شروع بشه
window.addEventListener('load', () => {
    startCounters();
});
