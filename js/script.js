// Banner slider enhancements
const slider = document.querySelectorAll('.slide-on');
const dotcont = document.querySelector('.cont-d');
const nextbtn = document.querySelector('.turn.n');
const prevbtn = document.querySelector('.turn.p');

let currentindex = 0;
let autoplayIntervalId = null;
const AUTOPLAY_DELAY = 4500; // ms

function createDots() {
    if (!dotcont) return;
    dotcont.innerHTML = '';
    slider.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot';
        d.setAttribute('aria-label', `Slide ${i + 1}`);
        d.addEventListener('click', () => goToSlide(i));
        dotcont.appendChild(d);
    });
}

function updateActive() {
    slider.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentindex);
        const dot = dotcont && dotcont.children[i];
        if (dot) dot.classList.toggle('active', i === currentindex);
    });
}

function goToSlide(index) {
    if (index < 0) index = slider.length - 1;
    if (index >= slider.length) index = 0;
    currentindex = index;
    updateActive();
}

function nextslide() {
    goToSlide((currentindex + 1) % slider.length);
}

function prevslide() {
    goToSlide((currentindex - 1 + slider.length) % slider.length);
}

function startAutoplay() {
    stopAutoplay();
    autoplayIntervalId = setInterval(nextslide, AUTOPLAY_DELAY);
}

function stopAutoplay() {
    if (autoplayIntervalId) {
        clearInterval(autoplayIntervalId);
        autoplayIntervalId = null;
    }
}

// initialize if slides exist
if (slider && slider.length) {
    createDots();
    updateActive();
    startAutoplay();

    // Button hooks
    if (nextbtn) nextbtn.addEventListener('click', () => { nextslide(); startAutoplay(); });
    if (prevbtn) prevbtn.addEventListener('click', () => { prevslide(); startAutoplay(); });

    // Pause on hover
    const container = document.querySelector('.cont-slide');
    if (container) {
        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);
    }

    // Pause when page hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoplay(); else startAutoplay();
    });

}