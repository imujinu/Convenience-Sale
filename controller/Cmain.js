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
      name: user.nickname,
      isLogin: true,
      CU,
      GS25,
      ELEVEN,
    });
  } else {
    res.render("home", { isLogin: false, CU, GS25, ELEVEN });
  }
};

exports.getLogin = (req, res) => {
  if (req.session.user) {
    res.render("home", {
      user: req.session.user,
      isLogin: true,
    });
  } else {
    res.render("login", { isLogin: false });
  }
};

exports.getRegister = (req, res) => {
  if (req.session.user) {
    res.render("home", {
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
      alert("세션이 만료되었습니다");
      document.location.href="/";
      </script>
      `);
  }
};
exports.mypage = (req, res) => {
  const user = req.session.user;
  if (user) {
    res.render("mypage", {
      name: user.nickname,
      userId: user.userId,
      nickname: user.nickname,
      profilePath: user.profilePath,
      isLogin: true,
    });
    console.log("userID:::", user.userId);
  } else {
    res.send(
      '<script>alert("먼저 로그인 해주세요"); location.href="/login";</script>',
    );
  }
};

exports.userview = async (req, res) => {
  // res.render("userview", { title: "회원 수정 페이지" });
  let user = req.session.user;

  if (user) {
    const updatedUser = await models.User.findOne({
      userId: user.userId,
    });

    // console.log(updatedUser);

    if (updatedUser)
      user = {
        userId: updatedUser.userId,
        userPw: updatedUser.hashedPassword,
        nickname: updatedUser.nickname,
        profilePath: updatedUser.profilePath,
      };
    req.session.user = user;
    res.render("userview", {
      name: user.nickname,
      userId: user.userId,
      nickname: user.nickname,
      // userPw: user.userPw,
      profilePath: user.profilePath,
      isLogin: true,
    });
    console.log("userID:::", user.userId);
  } else {
    res.send(
      `<script>alert("먼저 로그인 해주세요"); location.href="/login";</script>`,
      { isLogin: false },
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
  const insertQuery = req.query.productName.replaceAll(" ", "");
  const query = insertQuery.split("").join(".*");
  if (query) {
    try {
      console.log("req.query>>>>", req.query.productName);

      const product = await Products.findAll({
        where: {
          pName: {
            [Op.regexp]: query,
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
            insertQuery,
            isSearch: true,
          });
        } else {
          res.render("search", {
            isLogin: false,
            product,
            insertQuery,
            isSearch: true,
          });
        }
      } else {
        if (user) {
          res.render("search", {
            isLogin: true,
            user,
            isSearch: false,
            product,
            insertQuery,
          });
        } else {
          res.render("search", {
            isLogin: false,
            isSearch: false,
            product,
            insertQuery,
          });
        }
      }
    } catch (err) {
      console.error("err", err);
    }
  } else {
    res.redirect("/");
  }
};
