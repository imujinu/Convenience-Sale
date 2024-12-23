const models = require("../models");
const { Products } = require("../models");

// 로그인이 안된 유저 > {isLogin:false}
// 로그인이 된 유저 > {isLogin:true, user:유저}
exports.home = async (req, res) => {
  console.log(req.session);
  console.log(req.session.user);
  if (req.session.user) {
    res.render("home", {
      user: req.session.user,
      isLogin: true,
    });
  } else {
    res.render("home", { isLogin: false });
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
    res.render("home", {
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
