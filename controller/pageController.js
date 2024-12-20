// controllers/pageController.js

// 새로운 EJS 페이지 렌더링 함수
const renderAboutPage = (req, res) => {
  res.render("about", { title: "About Us" });
};

// 추가적인 페이지 렌더링 함수도 여기에 정의할 수 있습니다.
// 예: renderContactPage, renderHomePage 등

module.exports = {
  renderAboutPage,
};
