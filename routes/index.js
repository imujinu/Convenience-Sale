const express = require("express");
const router = express.Router();
const controller = require("../controller/Cvisitor.js");

router.get("/", controller.home);
router.get("/mypage", controller.mypage);

module.exports = router;
