const express = require("express");
const router = express.Router();
const main = require("../controller/Cmain.js");
const product = require("../controller/Cproduct.js");
const user = require("../controller/Cuser.js");

router.get("/", main.home);
router.get("/login", main.get_login);
router.get("/register", main.get_register);
router.get("/mypage", main.mypage);

//회원가입
router.post("/register", user.postRegister);
//Login 페이지
router.post("/login", user.postLogin);
module.exports = router;
