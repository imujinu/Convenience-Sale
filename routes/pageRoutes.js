// routes/pageRoutes.js
const express = require("express");
const router = express.Router();
const pageController = require("../controller/pageController");

// 예: About 페이지 렌더링 라우트
router.get("/about", pageController.renderAboutPage);

// 추가적인 페이지 라우트를 여기에 정의할 수 있습니다.
// 예: router.get("/contact", pageController.renderContactPage);

module.exports = router;
