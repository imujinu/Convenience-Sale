// 게시판 라우터
const express = require("express");
const router = express.Router();
const controller = require("../controller/Cboard");

// 자유 게시판 화면
router.get("/", controller.showBoard);
// 글 작성 화면
router.get("/write", controller.showWriteForm);
// 글 등록 처리
router.post("/write", controller.createPost);
// 글 확인 화면
router.get("/view/:id", controller.showPost);
// 의견 작성 처리
router.post("/comment/:id", controller.createComment);

module.exports = router;
