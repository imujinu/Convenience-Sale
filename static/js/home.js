const swiper = new Swiper(".swiper", {
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletActiveClass: "on",
  },

  slidesPerView: 2,
  slidesPerGroup: 1,
  centeredSlides: true,

  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },

  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
});

const swiper2 = new Swiper(".swiper2", {
  //   spaceBetween: 20,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletActiveClass: "on",
  },

  slidesPerView: 5,

  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});
