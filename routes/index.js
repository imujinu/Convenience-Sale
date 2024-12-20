// routes/index.js
const express = require("express");
const router = express.Router();

// 컨트롤러 가져오기
const main = require("../controller/Cmain.js");
const user = require("../controller/Cuser.js");
const pageController = require("../controller/pageController");
const productController = require("../controller/productController");

// ---------- Main & User 관련 라우트 ----------
router.get("/", main.home);
router.get("/login", main.get_login);
router.post("/login", user.postLogin);
router.get("/register", main.get_register);
router.post("/register", user.postRegister);
router.get("/mypage", main.mypage);
router.get("/userview", main.userview);
router.post("/upload", user.upload);

// ---------- Product 관련 라우트 ----------

// 크롤링 및 렌더링
router.get("/products/crawl", productController.crawlProducts);

// 모든 제품 조회
router.get("/products", productController.getAllProducts);

// DB 전송 API
router.post("/products/:productId/send-db", productController.sendProductToDB);

// DB 삭제 API
router.delete("/products/:productId", productController.deleteProduct);

// 태그 업데이트 API
router.put(
  "/products/:productId/update-tags",
  productController.updateProductTags,
);

// 기타 페이지
router.get("/about", pageController.renderAboutPage);

module.exports = router;
