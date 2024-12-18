// const boxCreate = document.querySelector(".section1 .part2 > .container2");
// const hiddenBox = document.querySelector(".section1 .part3");
// boxCreate.addEventListener("mouseover", () => {
//   hiddenBox.style.height = "100px";
// });
// boxCreate.addEventListener("mouseleave", () => {
//   hiddenBox.style.height = "0px";
// });

for (let i = 1; i < 6; i++) {
  const store = document.querySelector(`.section1 .part2 .store${i}`);
  const menu = document.querySelector(`.section1 .part2 .menu${i}`);

  store.addEventListener("mouseover", () => {
    store.style.backgroundColor = "#fdfcdc";
    menu.style.backgroundColor = "#fdfcdc";
    menu.style.height = "150px";
  });
  store.addEventListener("mouseleave", () => {
    store.style.backgroundColor = "";
    menu.style.backgroundColor = "";
    menu.style.height = "0px";
  });
}

// window.addEventListener("scroll", () => {
//   const scroll = window.scrollY;
//   console.log(scroll);
// });

const detail = document.querySelector(".section2 .detail");
detail.addEventListener("click", () => {
  window.scrollTo({
    top: 1030,
    behavior: "smooth",
  });
});

const swiper = new Swiper(".swiper", {
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletActiveClass: "on",
  },

  slidesPerView: 2,
  centeredSlides: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
});

const stopBtn = document.querySelector(".stopBtn");
stopBtn.addEventListener("click", () => {
  const running = swiper.autoplay.running;

  if (running) {
    swiper.autoplay.stop();
    stopBtn.src = "./static/image/stopbtn1.png";
  } else if (!running) {
    swiper.autoplay.start();
    stopBtn.src = "./static/image/stopbtn2.png";
  }
});

swiper.on("slideChange", () => {
  const active = swiper.activeIndex;
  const slide = swiper.slides[active];

  swiper.slides.forEach((el) => (el.style.opacity = "0.3"));

  slide.style.opacity = "1";
});

for (let i = 1; i < 5; i++) {
  const slide = document.querySelector(`.section3 .slide${i}`);
  const modal = document.querySelector(`.section3 .modal${i}`);
  const modalBtn = document.querySelector(`.section3 .modalCloseBtn${i}`);
  slide.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("visible");
    document.body.style.overflow = "hidden";
  });
  modalBtn.addEventListener("click", () => {
    modal.classList.remove("visible");
    modal.classList.add("hidden");
    document.body.style.removeProperty("overflow");
  });
}

// section4

const swiper2 = new Swiper(".swiper2", {
  //   spaceBetween: 20,

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  //   bulletActiveClass: "on",
  // },

  slidesPerView: 5,

  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});
