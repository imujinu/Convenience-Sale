const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { CookieJar } = require("tough-cookie");
const { URLSearchParams } = require("url");
const config = require("../config");
const { getRandomDelay, delay } = require("../utils");
const { parsePrice } = require("../utils/parser");

async function fetchDosirakData() {
  const url = `${config.SEVENELEVEN.BASE_URL}${config.SEVENELEVEN.INITIAL_URL}`;
  const origin = config.SEVENELEVEN.BASE_URL;
  const cookieJar = new CookieJar();
  const processedProductIds = new Set();
  let intPageSize = config.SEVENELEVEN.BODY_DATA.intPageSize;
  const maxRequests = 10;
  const allProducts = [];

  async function updateCookies(url, response) {
    const setCookieHeaders = response.headers.raw()["set-cookie"];
    if (setCookieHeaders) {
      for (const cookieStr of setCookieHeaders) {
        await cookieJar.setCookie(cookieStr, url);
      }
    }
  }

  async function getCookieValue(url, cookieName) {
    const cookies = await cookieJar.getCookies(url);
    const targetCookie = cookies.find((c) => c.key === cookieName);
    return targetCookie ? targetCookie.value : null;
  }

  for (let i = 0; i < maxRequests; i++) {
    const params = new URLSearchParams();
    params.append("intPageSize", intPageSize);
    params.append("pTab", "");

    const aspSession = await getCookieValue(origin, "ASPSESSIONIDAUQSQSQS");

    const headers = {
      ...config.SEVENELEVEN.HEADERS.common,
    };

    if (aspSession) {
      headers["Cookie"] = `ASPSESSIONIDAUQSQSQS=${aspSession}`;
      console.log(`Request ${i + 1}: ASPSESSIONIDAUQSQSQS=${aspSession}`);
    } else {
      headers[
        "Cookie"
      ] = `_BS_GUUID=TqgsRiX6qidrEZf3YpNEVqLFRoyoFPUyfa17tYeU; _TRK_EX=5; _TRK_UID=5858eea44ec4186b2a15250e0467d849:1:0:1734511962387; _TRK_SID=f430679a202dc1d8ad5016c8d296b5b9; _ga=GA1.3.537959009.1734511963; _gid=GA1.3.779053290.1734511963; _ga_98PNQXW48G=GS1.3.1734511963.1.1.1734514101.60.0.0;`;
      console.log(`Request ${i + 1}: 초기 쿠키 사용`);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: params.toString(),
      });

      await updateCookies(origin, response);

      if (!response.ok) {
        console.error(`요청 ${i + 1} 실패: 상태 코드 ${response.status}`);
        break;
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      $("li").each((index, element) => {
        const productName = $(element).find(".infowrap .name").text().trim();
        const priceText = $(element)
          .find(".infowrap .price span")
          .text()
          .trim();
        const price = parsePrice(priceText);
        let imageUrl = $(element).find(".pic_product img").attr("src") || "";
        if (!imageUrl.startsWith("http")) {
          imageUrl = `https://www.7-eleven.co.kr${imageUrl}`;
        }
        const href = $(element).find("a.btn_product_01").attr("href");

        let productId = null;
        if (href && href.includes("fncGoView")) {
          const match = href.match(/fncGoView\('(\d+)'\)/);
          if (match && match[1]) {
            productId = match[1];
          }
        }

        if (productId && !processedProductIds.has(productId)) {
          processedProductIds.add(productId);
          const productData = {
            convini: "seven",
            name: productName,
            price: price,
            imageUrl: imageUrl,
          };
          allProducts.push(productData);
        }
      });

      console.log(
        `Request ${i + 1} 완료. 수집된 제품 수: ${allProducts.length}`
      );

      intPageSize += 4;
      config.SEVENELEVEN.BODY_DATA.intPageSize = intPageSize;

      const randomDelay = getRandomDelay(500, 1000);
      console.log(`지연 시간: ${(randomDelay / 1000).toFixed(2)}초\n`);
      await delay(randomDelay);
    } catch (error) {
      console.error(`요청 ${i + 1} 중 오류 발생:`, error);
      break;
    }
  }

  return allProducts;
}

module.exports = { fetchDosirakData };
