// controllers/pageController.js

const fetch = require("node-fetch");

const renderAboutPage = async (req, res) => {
  try {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();

    if (data.success) {
      let products = data.products;

      // 가능한 모든 편의점 목록 추출
      const availableConvinis = [
        ...new Set(products.map((product) => product.convini)),
      ];
      // 가능한 모든 카테고리 목록 추출
      const availableCategories = [
        ...new Set(products.flatMap((product) => product.tags)),
      ];

      // 편의점별 필터링
      const selectedConvini = req.query.convini;
      if (selectedConvini) {
        products = products.filter(
          (product) => product.convini === selectedConvini,
        );
      }

      // 카테고리별 필터링
      const selectedCategory = req.query.category;
      if (selectedCategory) {
        products = products.filter((product) =>
          product.tags.includes(selectedCategory),
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
        availableConvinis: availableConvinis,
        availableCategories: availableCategories,
        selectedConvini: selectedConvini, // 현재 선택된 편의점 정보 전달
        selectedCategory: selectedCategory,
        sortBy: sortBy,
      });
    } else {
      console.error("API 호출 실패:", data);
      res.render("about", {
        title: "About Us",
        products: [],
        errorMessage: "상품 정보를 불러오는 데 실패했습니다.",
        availableConvinis: [],
        availableCategories: [],
        selectedConvini: "",
        selectedCategory: "",
        sortBy: "",
      });
    }
  } catch (error) {
    console.error("상품 정보 로딩 중 오류 발생:", error);
    res.render("about", {
      title: "About Us",
      products: [],
      errorMessage: "상품 정보를 불러오는 중 오류가 발생했습니다.",
      availableConvinis: [],
      availableCategories: [],
      selectedConvini: "",
      selectedCategory: "",
      sortBy: "",
    });
  }
};

module.exports = {
  renderAboutPage,
};
