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

const product = document.querySelector(".section5 > .container > .product");
const container = document.querySelector(".section5 > .container");
const clone = product.cloneNode(true);
product.classList.add("rolling1");
clone.classList.add("rolling2");
container.appendChild(clone);

// (async function getProducts() {
//   try {
//     const products = await axios({
//       url: "/products",
//       method: "get",
//     });
//     const result = products.data.json();
//     result.forEach((el) => {
//       const { name, price, imageUrl } = el;

//       const product = document.querySelector(
//         ".section5 > .container > .product ",
//       );
//       const menu = document.createElement("div");
//       menu.className = "menu";

//       menu.innerHTML = `
//       <img src ="${imageUrl}" alt="${name}>
//       <div class="text">
//       <p> ${name}</p>
//       <p> ${price}원 </p>
//       <a/>
//       `;
//       product.append(menu);
//     });
//   } catch {
//     (err) => {
//       console.err("err!", err);
//     };
//   }
// })();

const search = document.querySelector(
  ".section8 > .container > .part1 > .search",
);
const searchText = document.querySelector(
  ".section8 > .container > .part1 > .searchText",
);
search.addEventListener("click", async () => {
  try {
    if (searchText.value.trim() === "") {
      alert("검색어를 입력해주세요!");
    } else {
      console.log("검색어 입력됨");
      console.log(searchText.value);
      const productName = searchText.value;
      const result = await axios({
        url: "/search",
        method: "get",
        params: {
          productName,
        },
      });
      document.location.href = "/search";
    }
  } catch (err) {
    console.error(err);
  }
});
