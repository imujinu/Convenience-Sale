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

exports.postRegister = async (req, res) => {
  try {
    const newUser = await models.User.create({
      userId: req.body.userId,
      userPw: req.body.userPw,
      nickname: req.body.nickname,
    });
    res.send(newUser);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server error");
  }
};

exports.postLogin = (req, res) => {
  try {
    const user = models.User.findOne({
      where: {
        userId: req.body.userId,
        userPw: req.body.userPw,
      },
    }).then((result) => {
      console.log("post_signin", result);
      if (result) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Server error");
  }
};
exports.mypage = (req, res) => {
  res.render("mypage");
};
