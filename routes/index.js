const express = require("express");
const router = express.Router();
const main = require("../controller/Cmain.js");
const product = require("../controller/Cproduct.js");
const user = require("../controller/Cuser.js");
const boardController = require("../controller/Cboard");

// 메인 라우트
router.get("/", main.home);
router.get("/login", main.get_login);
router.get("/register", main.get_register);
// 마이페이지
router.get("/mypage", main.mypage);
// 회원정보 수정
router.get("/userview", main.userview);
//상품검색 페이지
router.get("/search", main.search);
// 매장찾기 페이지
router.get("/store", main.store);

//회원가입
router.post("/register", user.postRegister);
router.post("/login", user.postLogin);
router.post("/checkDuplication", user.postCheck);
// 파일 업로드
router.post("/upload", user.upload);

// 자유게시판 관련 라우트
router.get("/board", boardController.showBoard);
router.get("/board/write", boardController.showWriteForm);
router.post("/board/write", boardController.createPost);
router.get("/board/view/:id", boardController.showPost);
router.post("/board/view/:id/comment", boardController.createComment);

module.exports = router;
