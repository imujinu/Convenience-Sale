// cys2/241219/자유게시판
const express = require("express");
const router = express.Router();
const boardController = require("../controller/Cboard");

router.get("/", boardController.showBoard);
router.get("/write", boardController.showWriteForm);
router.post("/write", boardController.createPost);
router.get("/view/:id", boardController.showPost);
router.post("/view/:id/comment", boardController.createComment);

module.exports = router;
