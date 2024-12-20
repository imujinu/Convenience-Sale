// 필요한 모듈 불러오기
// const fetch = require("node-fetch"); // 제거
const cheerio = require("cheerio");
const { CookieJar } = require("tough-cookie");
const { URLSearchParams } = require("url");
const Ajv = require("ajv");
const cookie = require("cookie");
const config = require("./config"); // 설정 파일 로드 (변경 X)

// 공통 유틸리티 함수
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomDelay(min = 2000, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// CU 제품 크롤링 함수
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
            // 절대경로 조합 제거
            // if (!imgSrc.startsWith("http")) {
            //   imgSrc = `${config.CU.BASE_URL}${imgSrc}`;
            // }

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
        config.CU.BODY_DATA.pageIndex = pageIndex;
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

// 7-Eleven Dosirak 데이터 크롤링 함수
async function fetchDosirakData() {
  const url = `${config.SEVENELEVEN.BASE_URL}${config.SEVENELEVEN.INITIAL_URL}`;
  const referer = "https://www.7-eleven.co.kr/product/bestdosirakList.asp";
  const origin = config.SEVENELEVEN.BASE_URL;

  const cookieJar = new CookieJar();
  const processedProductIds = new Set();
  let intPageSize = config.SEVENELEVEN.BODY_DATA.intPageSize;
  const maxRequests = 10;
  const allProducts = [];

  async function updateCookies(url, response) {
    const setCookieHeaders = response.headers.get("set-cookie");
    if (setCookieHeaders) {
      // set-cookie는 여러 개일 수 있으므로 배열로 처리
      const cookies = Array.isArray(setCookieHeaders)
        ? setCookieHeaders
        : [setCookieHeaders];
      for (const cookieStr of cookies) {
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

// GS25 데이터 크롤링 함수
async function fetchGS25Data() {
  const ajv = new Ajv();
  const validate = ajv.compile(config.GS25.SCHEMA);

  let allProducts = [];
  let currentPage = config.GS25.BODY_DATA.pageNum;
  let totalPages = 1;

  try {
    const initialResponse = await fetch(
      `${config.GS25.BASE_URL}${config.GS25.INITIAL_URL}`,
      {
        headers: {
          ...config.GS25.HEADERS.common,
          ...config.GS25.HEADERS.initial,
        },
      }
    );

    if (!initialResponse.ok) {
      throw new Error(
        `Failed to fetch initial page: ${initialResponse.status}`
      );
    }

    const initialText = await initialResponse.text();
    const csrfTokenMatch = initialText.match(
      /<input type="hidden" name="CSRFToken" value="([^"]+)"\s*\/?>/
    );

    if (!csrfTokenMatch) {
      throw new Error("CSRF token not found in the initial response.");
    }
    const csrfToken = csrfTokenMatch[1];

    const rawCookies = initialResponse.headers.get("set-cookie");
    if (!rawCookies) {
      throw new Error("Set-Cookie header not found in the initial response.");
    }

    let jsessionId = "";
    const cookies = Array.isArray(rawCookies) ? rawCookies : [rawCookies];
    cookies.forEach((cookieStr) => {
      const parsedCookie = cookie.parse(cookieStr);
      if (parsedCookie.JSESSIONID) {
        jsessionId = `JSESSIONID=${parsedCookie.JSESSIONID}`;
      }
    });

    if (!jsessionId) {
      throw new Error("JSESSIONID not found in the Set-Cookie headers.");
    }

    do {
      const response = await fetch(
        `${config.GS25.BASE_URL}${config.GS25.DATA_URL}?CSRFToken=${csrfToken}`,
        {
          method: "POST",
          headers: {
            ...config.GS25.HEADERS.common,
            ...config.GS25.HEADERS.data,
            Cookie: jsessionId,
          },
          body: new URLSearchParams({
            ...config.GS25.BODY_DATA,
            pageNum: currentPage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("응답이 JSON이 아닙니다.");
      }

      const data = await response.json();
      let parsedData = data;

      if (typeof data === "string") {
        try {
          parsedData = JSON.parse(data);
        } catch (parseError) {
          throw new Error("중첩된 JSON 파싱 실패: " + parseError.message);
        }
      }

      const valid = validate(parsedData);
      if (!valid) {
        console.error(
          `JSON 데이터 검증 오류 (페이지 ${currentPage}):`,
          validate.errors
        );
      }

      totalPages = parsedData.SubPageListPagination.numberOfPages;

      const normalizedProducts = extractProductInfo(
        parsedData,
        config.GS25.BASE_URL
      );
      allProducts = allProducts.concat(normalizedProducts);

      console.log(
        `페이지 ${currentPage} 데이터 추출 완료. 총 제품 수: ${allProducts.length}`
      );

      currentPage++;
      config.GS25.BODY_DATA.pageNum = currentPage;
    } while (currentPage <= totalPages);

    console.log(
      `총 ${allProducts.length}개의 GS25 상품 정보가 추출되었습니다.`
    );
  } catch (error) {
    console.error("Error fetching GS25 data:", error);
  }

  return allProducts;
}

function extractProductInfo(data, BASE_URL) {
  const products = [];

  if (data.SubPageListData && Array.isArray(data.SubPageListData)) {
    data.SubPageListData.forEach((item) => {
      const name = item.goodsNm || "이름 없음";
      const price =
        item.price !== undefined && item.price !== null ? item.price : 0;

      let imageUrl = "https://image.woodongs.com/default-image.jpg";
      if (item.attFileNm) {
        imageUrl = item.attFileNm;
      } else if (item.attFileNmOld) {
        imageUrl = item.attFileNmOld;
      } else if (item.attFileId) {
        imageUrl = item.attFileId;
      } else if (item.attFileIdOld) {
        imageUrl = item.attFileIdOld;
      }

      if (
        imageUrl !== "이미지 없음" &&
        imageUrl !== "https://image.woodongs.com/default-image.jpg"
      ) {
        const woodongsMatch = imageUrl.match(
          /(https:\/\/image\.woodongs\.com\/.*)/
        );
        if (woodongsMatch) {
          imageUrl = woodongsMatch[1];
        } else {
          imageUrl = "https://image.woodongs.com/default-image.jpg";
        }
      }

      products.push({
        name,
        price,
        imageUrl,
        convini: "gs25",
      });
    });
  } else {
    console.warn("SubPageListData가 존재하지 않거나 배열이 아닙니다.");
  }

  return products;
}

function parsePrice(priceText) {
  const priceNumber = parseInt(priceText.replace(/[^0-9]/g, ""), 10);
  return isNaN(priceNumber) ? 0 : priceNumber;
}

// 모듈 내보내기
module.exports = {
  crawlCUProducts,
  fetchDosirakData,
  fetchGS25Data,
};
