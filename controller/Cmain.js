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

exports.getLogin = (req, res) => {
  if (req.session.user) {
    res.render("login", {
      user: req.session.user,
      isLogin: true,
    });
  } else {
    res.render("login", { isLogin: false });
  }
};

exports.getRegister = (req, res) => {
  if (req.session.user) {
    res.render("register", {
      user: req.session.user,
      isLogin: true,
    });
  } else {
    res.render("register", { isLogin: false });
  }
};
exports.getLogout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/");
    });
  } else {
    res.send(`
      <script>
      alert("이미 세션이 만료되었다");
      document.location.href="/";
      </script>
      `);
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
