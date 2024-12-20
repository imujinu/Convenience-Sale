// cys2/241219/자유게시판
const express = require("express");
const router = express.Router();
const boardController = require("../controller/Cboard");

// 자유게시판 화면
router.get("/", boardController.showBoard);

// 글 작성 화면
router.get("/write", boardController.showWriteForm);

// 글 작성
router.post("/write", boardController.createPost);

// 글 확인 화면
router.get("/view/:id", boardController.showPost);

// 댓글 작성
router.post("/view/:id/comment", boardController.createComment);

module.exports = router;
