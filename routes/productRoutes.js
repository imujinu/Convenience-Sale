const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

// 크롤링 및 렌더링 엔드포인트
router.get("/crawl", productController.crawlProducts);

// 태그 업데이트 API
router.put("/products/:productId/tags", productController.updateProductTags);

// DB 전송 API
router.post("/products/:productId/send-db", productController.sendProductToDB);

// DB 삭제 API
router.delete("/products/:productId", productController.deleteProduct);

// 모든 제품 조회 API
router.get("/products", productController.getAllProducts);

module.exports = router;
