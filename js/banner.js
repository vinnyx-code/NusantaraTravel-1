let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let nextBtn = document.querySelector(".turn.next");
let prevBtn = document.querySelector(".turn.prev");
let container = document.querySelector(".cont-slide");
let currentIndex = 0;
let autoPlay;

// fungsi fade smooth
function showSlide(index) {
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    slide.style.zIndex = "0";
  });

  slides[index].classList.add("active");
  slides[index].style.zIndex = "1";

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentIndex = index;
}

// tombol next & prev
function nextSlide() {
  showSlide(currentIndex + 1);
  resetAutoPlay();
}

function prevSlide() {
  showSlide(currentIndex - 1);
  resetAutoPlay();
}

// event listener
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// dots
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAutoPlay();
  });
});

// autoplay
function startAutoPlay() {
  autoPlay = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 7000);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

// pause saat hover
container.addEventListener("mouseenter", () => clearInterval(autoPlay));
container.addEventListener("mouseleave", startAutoPlay);

// start
showSlide(0);
startAutoPlay();
