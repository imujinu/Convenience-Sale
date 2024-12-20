const fetch = require("node-fetch");
const cookie = require("cookie");
const Ajv = require("ajv");
const config = require("../config");
const { parsePrice } = require("../utils/parser");

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

    const rawCookies = initialResponse.headers.raw()["set-cookie"];
    if (!rawCookies) {
      throw new Error("Set-Cookie header not found in the initial response.");
    }

    let jsessionId = "";
    rawCookies.forEach((cookieStr) => {
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

      const normalizedProducts = extractProductInfo(parsedData);
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

function extractProductInfo(data) {
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

module.exports = { fetchGS25Data };
