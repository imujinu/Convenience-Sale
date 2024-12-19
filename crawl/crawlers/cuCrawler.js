const fetch = require("node-fetch");
const cheerio = require("cheerio");
const config = require("../config");
const { sleep } = require("../utils");
const { parsePrice } = require("../utils/parser");

async function crawlCUProducts() {
  let pageIndex = config.CU.BODY_DATA.pageIndex;
  let hasMoreProducts = true;
  const allProducts = [];

  while (hasMoreProducts) {
    try {
      const response = await fetch(
        `${config.CU.BASE_URL}${config.CU.INITIAL_URL}`,
        {
          credentials: "include",
          headers: {
            ...config.CU.HEADERS.common,
            ...config.CU.HEADERS.initial,
          },
          referrer:
            "https://cu.bgfretail.com/product/product.do?category=product&depth2=4&sf=N",
          body: new URLSearchParams(config.CU.BODY_DATA).toString(),
          method: "POST",
          mode: "cors",
        }
      );

      if (!response.ok) {
        console.error(`CU 요청 실패: 상태 코드 ${response.status}`);
        break;
      }

      const text = await response.text();
      const $ = cheerio.load(text);
      const productList = $(".prod_list");

      if (productList.length > 0) {
        const products = productList
          .map((i, product) => {
            let imgSrc = $(product).find(".prod_img img").attr("src") || "";
            if (!imgSrc.startsWith("http")) {
              imgSrc = `${config.CU.BASE_URL}${imgSrc}`;
            }
            const name = $(product).find(".name p").text().trim();
            const priceText = $(product).find(".price strong").text().trim();
            const price = parsePrice(priceText);

            return { convini: "cu", name, price, imageUrl: imgSrc };
          })
          .get();

        allProducts.push(...products);
        console.log(
          `CU 페이지 ${pageIndex} 크롤링 완료. 총 제품 수: ${allProducts.length}`
        );
        pageIndex++;
        config.CU.BODY_DATA.pageIndex = pageIndex; // 업데이트된 페이지 번호 반영
      } else {
        hasMoreProducts = false;
        console.log("CU 더 이상 제품이 없습니다.");
      }

      await sleep(1000); // 1초 대기
    } catch (error) {
      console.error(`CU 크롤링 중 오류 발생:`, error);
      break;
    }
  }
  return allProducts;
}

module.exports = { crawlCUProducts };
