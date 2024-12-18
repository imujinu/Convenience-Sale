const models = require("../models");

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
