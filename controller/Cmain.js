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
  res.render("mypage");
};
