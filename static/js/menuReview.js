(async function getProducts() {
  try {
    const products = await axios({
      url: "/products",
      method: "get",
    });
    const result = products.data.json();
    result.forEach((el) => {
      const { name, price, imageUrl } = el;

      const product = document.querySelector(
        ".section5 > .container > .product ",
      );
      const menu = document.createElement("div");
      menu.className = "menu";

      menu.innerHTML = `
        <img src ="${imageUrl}" alt="${name}>
        <div class="text">
        <p> ${name}</p>
        <p> ${price}원 </p>
        
        `;
      product.append(menu);
    });
  } catch {
    (err) => {
      console.err("err!", err);
    };
  }
})();
