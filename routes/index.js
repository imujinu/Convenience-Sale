const express = require("express");
const router = express.Router();
const controller = require("../controller/Cvisitor.js");

router.get("/", controller.home);
router.get("/login", controller.get_login);
router.get("/register", controller.get_register);

//회원가입
router.post("/register", controller.postRegister);
//Login 페이지
router.post("/login", controller.postLogin);
module.exports = router;
