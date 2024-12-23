const models = require("../models");
const { Products } = require("../models");
const { Op } = require("sequelize");

// 로그인이 안된 유저 > {isLogin:false}
// 로그인이 된 유저 > {isLogin:true, user:유저}
exports.home = async (req, res) => {
  const CU = await Products.findAll({
    where: {
      cName: "CU",
    },
  });

  if (req.session.user) {
    res.render("home", {
      user: req.session.user,
      isLogin: true,
      CU,
    });
  } else {
    res.render("home", { isLogin: false, CU });
  }
};

exports.get_login = (req, res) => {
  const user = req.session.user;
  if (user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

exports.get_register = (req, res) => {
  const user = req.session.user;
  if (user) {
    res.redirect("/");
  } else {
    res.render("register");
  }
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

// const result = req.query;
// if (result) {
//   const products = await Products.findAll({
//     attributes: ["name", "price", "imageUrl", "convini"], // 필요한 속성 선택
//     where: {
//       name: {
//         [Op.like]: `%${productName}%`, // 부분 일치 검색
//       },
//     },
//   });
// }
exports.search = async (req, res) => {
  try {
    console.log("req.query>>>>", req.query.productName);
    const searchValue = req.query.productName;
    const hasQuery = searchValue.length > 0;
    const product = await Products.findAll({
      where: {
        pName: {
          [Op.like]: `%${searchValue}%`,
        },
      },
    });
    const user = req.session.user;
    if (hasQuery) {
      if (user) {
        res.render("search", { isLogin: true, user, product, searchValue });
      } else {
        res.render("search", { isLogin: false, product, searchValue });
      }
    } else {
      if (user) {
        res.render("search", { isLogin: true, user });
      } else {
        res.render("search", { isLogin: false });
      }
    }
  } catch (err) {
    console.error("err", err);
  }
};
