const searchInput = document
  .querySelector(".section4 > .container > div > .search")
  .value.trim();
// console.log(searchInput);
const searchBtn = document.querySelector(
  ".section4 > .container > div > .searchBtn",
);
// console.log(searchBtn);

searchBtn.addEventListener("click", async () => {
  try {
    const product = await axios({
      url: "/search",
      method: "post",
      data: {
        product: searchInput,
      },
    });
  } catch (err) {
    console.error("err!", err);
  }
});
