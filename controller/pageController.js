// controllers/pageController.js

const fetch = require("node-fetch");

const renderAboutPage = async (req, res) => {
  try {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();

    if (data.success) {
      let products = data.products;

      // 가능한 모든 편의점 목록 추출 (convenienceName 사용)
      const availableConvinces = [
        ...new Set(products.map((product) => product.convenienceName)),
      ];

      // 가능한 모든 이벤트 목록 추출 (event 사용)
      const availableEvents = [
        ...new Set(products.map((product) => product.event)),
      ];

      // 편의점별 필터링 (convenienceName 기준)
      const selectedConvenience = req.query.convenience;
      if (selectedConvenience) {
        products = products.filter(
          (product) => product.convenienceName === selectedConvenience,
        );
      }

      // 이벤트별 필터링 (event 기준)
      const selectedEvent = req.query.event;
      if (selectedEvent) {
        products = products.filter(
          (product) => product.event === selectedEvent,
        );
      }

      // 가격별 정렬
      const sortBy = req.query.sortBy;
      if (sortBy === "priceAsc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceDesc") {
        products.sort((a, b) => b.price - a.price);
      }

      res.render("about", {
        title: "FRESH FOOD",
        products: products,
        errorMessage: undefined,
        availableConvinces: availableConvinces,
        availableEvents: availableEvents,
        selectedConvenience: selectedConvenience, // 현재 선택된 편의점 정보 전달
        selectedEvent: selectedEvent, // 현재 선택된 이벤트 정보 전달
        sortBy: sortBy,
      });
    } else {
      console.error("API 호출 실패:", data);
      res.render("about", {
        title: "About Us",
        products: [],
        errorMessage: "상품 정보를 불러오는 데 실패했습니다.",
        availableConvinces: [],
        availableEvents: [],
        selectedConvenience: "",
        selectedEvent: "",
        sortBy: "",
      });
    }
  } catch (error) {
    console.error("상품 정보 로딩 중 오류 발생:", error);
    res.render("about", {
      title: "About Us",
      products: [],
      errorMessage: "상품 정보를 불러오는 중 오류가 발생했습니다.",
      availableConvinces: [],
      availableEvents: [],
      selectedConvenience: "",
      selectedEvent: "",
      sortBy: "",
    });
  }
};

module.exports = {
  renderAboutPage,
};
