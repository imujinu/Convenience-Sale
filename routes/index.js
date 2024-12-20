// routes/index.js
const express = require("express");
const router = express.Router();
const { connection } = require("../db"); // DB 연결 추가
const pageController = require("../controller/pageController");
// 컨트롤러 가져오기
const main = require("../controller/Cmain.js");
const product = require("../controller/Cproduct.js");
const user = require("../controller/Cuser.js");
const productController = require("../controller/productController");
// ---------- Main & User 관련 라우트 ----------

// 홈 페이지
router.get("/", main.home);

// 로그인 페이지
router.get("/login", main.get_login);
router.post("/login", user.postLogin);

// 회원가입 페이지
router.get("/register", main.get_register);
router.post("/register", user.postRegister);

// 마이페이지
router.get("/mypage", main.mypage);

// 회원정보 수정 페이지
router.get("/userview", main.userview);

// 사진 업로드
router.post("/upload", user.upload);

// ---------- Product 관련 라우트 ----------

// 모든 상품 조회
router.get("/products", (req, res) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("상품 조회 오류:", err);
      res.status(500).json({ error: "상품을 조회할 수 없습니다." });
    } else {
      res.json(results);
    }
  });
});

// 특정 상품 조회
router.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, results) => {
      if (err) {
        console.error("상품 조회 오류:", err);
        res.status(500).json({ error: "상품을 조회할 수 없습니다." });
      } else if (results.length === 0) {
        res.status(404).json({ error: "해당 ID의 상품을 찾을 수 없습니다." });
      } else {
        res.json(results[0]);
      }
    },
  );
});

// 상품 추가
router.post("/products", (req, res) => {
  const { name, price, description } = req.body;
  connection.query(
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
    [name, price, description],
    (err, result) => {
      if (err) {
        console.error("상품 추가 오류:", err);
        res.status(500).json({ error: "상품을 추가할 수 없습니다." });
      } else {
        res.json({
          message: "상품이 성공적으로 추가되었습니다.",
          productId: result.insertId,
        });
      }
    },
  );
});

// 상품 수정
router.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { name, price, description } = req.body;
  connection.query(
    "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
    [name, price, description, productId],
    (err, result) => {
      if (err) {
        console.error("상품 수정 오류:", err);
        res.status(500).json({ error: "상품을 수정할 수 없습니다." });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "해당 ID의 상품을 찾을 수 없습니다." });
      } else {
        res.json({ message: "상품이 성공적으로 수정되었습니다." });
      }
    },
  );
});

// 상품 삭제
router.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  connection.query(
    "DELETE FROM products WHERE id = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.error("상품 삭제 오류:", err);
        res.status(500).json({ error: "상품을 삭제할 수 없습니다." });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "해당 ID의 상품을 찾을 수 없습니다." });
      } else {
        res.json({ message: "상품이 성공적으로 삭제되었습니다." });
      }
    },
  );
});

router.get("/about", pageController.renderAboutPage);

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
