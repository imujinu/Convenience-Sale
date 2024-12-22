const models = require("../models");
const { emailAuth } = require("../config/email");

const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "uploads/");
    },
    filename: (req, file, done) => {
      const extension = path.extname(file.originalname);

      done(
        null,
        path.basename(file.originalname, extension) + Date.now() + extension,
      );
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

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
    });
    console.log("postLogin: ", user);
    if (user) {
      req.session.user = {
        id: user.id,
        userId: user.userId,
      };
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Server error");
  }
};

exports.postCheck = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingUser = await models.User.findOne({ where: { userId } });

    if (existingUser) {
      return res.status(200).json({ isDuplicate: true });
    }
    res.status(200).json({ isDuplicate: false });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

exports.getLogout = (req, res) => {};

exports.upload = (req, res) => {
  res.send({ ...req.body, ...req.file });
};

exports.emailSend = emailAuth;
