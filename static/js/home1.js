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
