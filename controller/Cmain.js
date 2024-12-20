const models = require("../models");
exports.home = (req, res) => {
  res.render("home");
};

exports.get_login = (req, res) => {
  res.render("login");
};

exports.get_register = (req, res) => {
  res.render("register");
};

exports.mypage = (req, res) => {
  // 로그인된 회원인지 아닌지 판단
  res.render("mypage");
};

exports.userview = (req, res) => {
  res.render("userview", { title: "회원 수정 페이지" });
};
