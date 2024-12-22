for (let i = 1; i < 6; i++) {
  const store = document.querySelector(`.section1 .part2 .store${i}`);
  const menu = document.querySelector(`.section1 .part2 .menu${i}`);
  const storeDetail = document.querySelector(
    `.section1 > .container > .part2 > .navbar > .store${i} > li:nth-of-type(1)`,
  );
  store.addEventListener("mouseover", () => {
    store.style.backgroundColor = "#fdfcdc";
    storeDetail.style.textDecoration = "underline";
    menu.style.backgroundColor = "#fdfcdc";
    menu.style.height = "150px";
  });
  store.addEventListener("mouseleave", () => {
    store.style.backgroundColor = "";
    storeDetail.style.textDecoration = "none";
    menu.style.backgroundColor = "";
    menu.style.height = "0px";
  });
}
