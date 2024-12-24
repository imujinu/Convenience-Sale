const express = require("express");
const router = express.Router();
const main = require("../controller/Cmain.js");
const product = require("../controller/Cproduct.js");
const user = require("../controller/Cuser.js");
const pageController = require("../controller/pageController");
const productController = require("../controller/productController");
const upload = require("../utils/multer.js");

const boardController = require("../controller/Cboard");

// 메인 라우트
router.get("/", main.home);
router.get("/login", main.getLogin);
router.get("/register", main.getRegister);
router.get("/logout", main.getLogout);
// 마이페이지
router.get("/mypage", main.mypage);
// 회원정보 수정
router.get("/userview", main.userview);
//상품검색 페이지
router.get("/search", main.search);
//이메일 전송
router.post("/email", user.emailSend);
//회원가입
router.post("/register", user.postRegister);
router.post("/login", user.postLogin);
router.post("/checkDuplication", user.postCheck);
//회원정보 수정
router.post("/checkNickname", user.postCheckNickname);
router.post("/updateUser", user.postUpdateUser);
//사진 업로드
router.post("/upload", upload.single("user"), user.upload);
router.get("/upload", (req, res) => {
  res.json({ message: "test" });
});

// 로그아웃
router.get("/logout", user.logout);

//회원탈퇴
router.post("/deleteAccount", user.deleteAccount);

// 파일 업로드
router.post("/upload", user.upload);

// 로그인 체크 미들웨어 추가
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // 로그인 상태일 때만 다음 단계로 진행
    next();
  } else {
    // 로그인 상태가 아니면 에러 처리
    res.status(401).json({ message: "로그인이 필요합니다." });
  }
};
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
// 자유게시판 라우트

router.get("/board", boardController.showBoard);
router.get("/board/write", boardController.showWriteForm);
router.post("/board/write", boardController.createPost);
router.get("/board/view/:id", boardController.showPost);
router.post("/board/view/:id/comment", boardController.createComment);
router.post("/board/view/:id/delete", boardController.deletePost);

module.exports = router;
