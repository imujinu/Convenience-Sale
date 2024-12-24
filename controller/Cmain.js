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
  const GS25 = await Products.findAll({
    where: {
      cName: "GS25",
    },
  });
  const ELEVEN = await Products.findAll({
    where: {
      cName: "7ELEVEN",
    },
  });

  const user = req.session.user;

  if (user) {
    res.render("home", {
      user: user.nickname,
      isLogin: true,
      CU,
      GS25,
      ELEVEN,
    });
  } else {
    res.render("home", { isLogin: false, CU, GS25, ELEVEN });
  }
};

exports.get_login = (req, res) => {
  if (req.session.user) {
    res.render("login", {
      user: req.session.user,
      isLogin: true,
    });
  } else {
    res.render("login", { isLogin: false });
  }
};

exports.get_register = (req, res) => {
  if (req.session.user) {
    res.render("register", {
      user: req.session.user,
      isLogin: true,
    });
  } else {
    res.render("register", { isLogin: false });
  }
};

exports.mypage = (req, res) => {
  const user = req.session.user;
  if (user) {
    res.render("mypage", {
      userId: user.userId,
      nickname: user.nickname,
      profilePath: user.profilePath,
    });
    console.log("userID:::", user.userId);
  } else {
    res.send(
      '<script>alert("먼저 로그인 해주세요"); location.href="/login";</script>',
    );
  }
};

exports.userview = (req, res) => {
  // res.render("userview", { title: "회원 수정 페이지" });
  const user = req.session.user;
  if (user) {
    res.render("userview", {
      userId: user.userId,
      nickname: user.nickname,
      userPw: user.userPw,
      profilePath: user.profilePath,
    });
    console.log("userID:::", user.userPw);
  } else {
    res.send(
      '<script>alert("먼저 로그인 해주세요"); location.href="/login";</script>',
    );
  }
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

    const product = await Products.findAll({
      where: {
        pName: {
          [Op.like]: `%${searchValue}%`,
        },
      },
    });
    const user = req.session.user;

    if (product.length > 0) {
      if (user) {
        res.render("search", {
          isLogin: true,
          user,
          product,
          searchValue,
          isSearch: true,
        });
      } else {
        res.render("search", {
          isLogin: false,
          product,
          searchValue,
          isSearch: true,
        });
      }
    } else {
      if (user) {
        res.render("search", { isLogin: true, user, isSearch: false });
      } else {
        res.render("search", { isLogin: false, isSearch: false });
      }
    }
  } catch (err) {
    console.error("err", err);
  }
};
