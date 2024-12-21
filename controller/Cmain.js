const models = require("../models");
const { Products, Op } = require("../models");

exports.home = async (req, res) => {
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

exports.store = (req, res) => {
  console.log("req.query: ", req.query.query);
  console.log(req.query);
  res.render("store");
};

exports.search = async (req, res) => {
  const result = req.query;
  if (result) {
    const products = await Products.findAll({
      attributes: ["name", "price", "imageUrl", "convini"], // 필요한 속성 선택
      where: {
        name: {
          [Op.like]: `%${productName}%`, // 부분 일치 검색
        },
      },
    });
  }

  res.render("search", { products });
};
