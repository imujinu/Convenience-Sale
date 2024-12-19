const models = require("../models");
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

exports.upload = (req, res) => {
  const profileUpload = upload.single("user");

  profileUpload(req, res, (err) => {
    res.send({ ...req.body, ...req.file });
  });
};
