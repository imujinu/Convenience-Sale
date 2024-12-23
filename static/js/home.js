// section2
const detail = document.querySelector(".section2 .detail");
detail.addEventListener("click", () => {
  window.scrollTo({
    top: 1030,
    behavior: "smooth",
  });
});

const arrow = document.querySelector(".section2 > .part2 > .arrow");
arrow.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
});

//  section3
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
  const allView = document.querySelectorAll(".section3 .view");
  allView.forEach((el) => {
    el.style.opacity = "0";
  });
  const view = slide.querySelector(".view");
  view.style.opacity = "1";
  swiper.slides.forEach((el) => (el.style.opacity = "0.3"));

  slide.style.opacity = "1";
});

for (let i = 1; i < 5; i++) {
  const slide = document.querySelector(`.section3 .slide${i}`);
  const view = slide.querySelector(".view");
  const modal = document.querySelector(`.section3 .modal${i}`);
  const modalBtn = document.querySelector(`.section3 .modalCloseBtn${i}`);
  slide.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("visible");
    document.body.style.overflow = "hidden";
  });
  view.addEventListener("click", () => {
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
const allBtn = document.querySelector(".section4 > .part2 >ul > .all ");
const oneBtn = document.querySelector(".section4 >.part2 >ul >.one ");
const twoBtn = document.querySelector(".section4 >.part2 >ul >.two ");

const menu = document.querySelectorAll(
  ".section5 > .container > .product >.menu",
);
const menu2 = document.querySelectorAll(
  ".section5 > .container > .rolling2 >.menu",
);

console.log(menu2);
console.log(menu);

allBtn.addEventListener("click", () => {
  menu.forEach((el) => {
    el.style.display = "block";
  });
  // menu2.forEach((el) => {
  //   el.style.display = "block";
  // });
});
oneBtn.addEventListener("click", () => {
  menu.forEach((el) => {
    const sale = el.querySelector(".event").textContent.trim();
    if (sale == "1+1") {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
  // menu2.forEach((el) => {
  //   const sale = el.querySelector(".event").textContent.trim();
  //   if (sale == "1+1") {
  //     el.style.display = "block";
  //   } else {
  //     el.style.display = "none";
  //   }
  // });
});
twoBtn.addEventListener("click", () => {
  menu.forEach((el) => {
    const sale = el.querySelector(".event").textContent.trim();
    if (sale == "2+1") {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
  // menu2.forEach((el) => {
  //   const sale = el.querySelector(".event").textContent.trim();
  //   if (sale == "2+1") {
  //     el.style.display = "block";
  //   } else {
  //     el.style.display = "none";
  //   }
  // });
});

// section5
const product = document.querySelector(".section5 > .container > .product");
const container = document.querySelector(".section5 > .container");
const clone = product.cloneNode(true);
product.classList.add("rolling1");
clone.classList.add("rolling2");
container.appendChild(clone);

// section8

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
      document.location.href = `/search?productName=${productName}`;
    }
  } catch (err) {
    console.error(err);
  }
});

window.addEventListener("scroll", () => {
  scroll = window.scrollY;
  const menu1 = document.querySelector(
    ".section8 > .container > .part2 > .menu1",
  );
  const menu2 = document.querySelector(
    ".section8 > .container > .part2 > .menu2",
  );
  const menu3 = document.querySelector(
    ".section8 > .container > .part2 > .menu3",
  );
  const menu4 = document.querySelector(
    ".section8 > .container > .part2 > .menu4",
  );
  if (scroll > 1088) {
    menu1.style.animation = "opacity1 0.5s forwards";
    menu2.style.animation = "opacity1 0.5s 0.5s forwards";
    menu3.style.animation = "opacity1 0.5s 1s forwards";
    menu4.style.animation = "opacity1 0.5s 1.5s forwards";
  } else {
    menu1.style.animation = "unOpacity 0.5s forwards";
    menu2.style.animation = "unOpacity 0.5s 0.5s forwards";
    menu3.style.animation = "unOpacity 0.5s 1s forwards";
    menu4.style.animation = "unOpacity 0.5s 1.5s forwards";
  }
});

// section9
async function emailVerify() {
  try {
    const email = document
      .querySelector(".section9 > .container> .inner> .email")
      .value.trim();
    const email2 = document.querySelector(
      ".section9 > .container> .inner> .email",
    );

    if (!email2.checkValidity()) {
      alert("example@naver.com 형식에 맞게 이메일을 작성해주세요");
      return;
    }

    if (email2 === "" || email2.length > 50) {
      alert("형식에 맞게 이메일을 작성해주세요");
      return;
    }
    const result = await axios({
      url: "/email",
      method: "post",
      data: {
        email,
      },
    });
    console.log("result.data::>>>", result.data);
    const { message } = result.data;
    alert(message);
  } catch (err) {
    console.error(err);
  }
}

const git = document.querySelectorAll(".footer > .container > ul > li");
git.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.style.backgroundColor = "red";
    const Img = el.querySelector("img");
    Img.style.opacity = "1";
    Img.style.bottom = "100%";
  });

  el.addEventListener("mouseleave", () => {
    el.style.backgroundColor = "ivory";
    const Img = el.querySelector("img");
    Img.style.opacity = "0";
    Img.style.bottom = "0%";
  });
});

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const section9 = document.querySelector(".section9 > .container ");

  if (scroll > 1560) {
    section9.style.opacity = "1";
  } else {
    section9.style.opacity = "0";
  }
});

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  const emailInput = document.querySelector(".section9 > .container > .inner ");
  if (scroll > 1764) {
    emailInput.style.bottom = "17%";
    emailInput.style.opacity = "1";
  } else {
    emailInput.style.bottom = "0%";
    emailInput.style.opacity = "0";
  }
});
