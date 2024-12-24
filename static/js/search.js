const search = document.querySelector(".section4 > .container > div > .search");
const searchBtn = document.querySelector(
  ".section4 > .container > div > .searchBtn",
);
// console.log(searchBtn);

searchBtn.addEventListener("click", async () => {
  const productName = search.value.trim();
  try {
    const product = await axios({
      url: "/search",
      method: "get",
      params: {
        productName,
      },
    });
    document.location.href = `/search?productName=${productName}`;
  } catch (err) {
    console.error("err!", err);
  }
});

search.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const productName = search.value.trim();
    try {
      const product = await axios({
        url: "/search",
        method: "get",
        params: {
          productName,
        },
      });
      document.location.href = `/search?productName=${productName}`;
    } catch (err) {
      console.error("err!", err);
    }
  }
});

const menu = document.querySelector(".section5 > .container > .product");
for (let i = 1; i < 7; i++) {
  menu.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.querySelector("img").style.height = "70%";
    });
    el.addEventListener("mouseleave", () => {
      el.querySelector("img").style.height = "60%";
    });
  });
}
