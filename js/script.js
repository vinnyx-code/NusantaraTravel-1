let slider = document.querySelectorAll('.slider');
let dotcont = document.querySelector('.dot-cont');
let nextbtn = document.querySelector('.nav.next');
let prevbtn = document.querySelector('.nav.prev');

let currentindex = 0;
let autoplayinterval

//menghapus class active pada semua slide
function showslider(index) {
    slider.forEach((slide, i) => {
        slide.classList.remove('active')
        if(dotcont.children[i]) {
            dotcont.children[i].classList.remove('active')
        }
    });
//tampialkan slide 
    slider[index].classList.add('active')
    if(dotcont.children[index]) {
        dotcont.children[index].classList.add('active')
    }
}

function nextslide() {
    currentindex = (currentindex + 1) % slider.length;
    showslider(currentindex);
};

function prevslide() {
    currentindex = (currentindex - 1 + slider.length) % slider.length;
    showslider(currentindex);
};

nextbtn.addEventListener('click', () => {
    nextslide();
})
prevbtn.addEventListener('click', () => {
    prevslide();
})