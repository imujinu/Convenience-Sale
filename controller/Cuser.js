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

//회원 생성
exports.postRegister = async (req, res) => {
  try {
    const newUser = await models.User.create({
      userId: req.body.userId,
      userPw: req.body.userPw,
      nickname: req.body.nickname,
    });
    // res.send(newUser);
    res.render("login", { newUser });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server error");
  }
};

//로그인하기
exports.postLogin = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        userId: req.body.userId,
        userPw: req.body.userPw,
      },
    });
    console.log("postLogin: ", user);
    if (user) {
      req.session.user = {
        userId: user.userId,
        userPw: user.userPw,
        nickname: user.nickname,
        profilePath: user.profilePath,
      };
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).send("Server error");
  }
};

//회원가입 시 아이디 중복 확인
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

//회원정보 수정 페이지에서 닉네임 변경 시 닉네임 중복 확인
exports.postCheckNickname = async (req, res) => {
  try {
    const nickname = req.body.nickname;
    const user = await models.User.findOne({ where: { nickname } });
    console.log("user nickname: ", user);
    if (user) {
      res.send({ isDuplicate: true });
    } else {
      res.send({ isDuplicate: false });
    }
  } catch (err) {
    console.error("Error checking nickname:", err);
    res.status(500).send("Server error");
  }
};
exports.postUpdateUser = async (req, res) => {
  try {
    const { userId, newNickname } = req.body; // userId와 newNickname 추출

    const result = await models.User.update(
      { nickname: newNickname }, // 닉네임 업데이트
      { where: { userId } }, // 조건: userId
    );
    console.log("넘어온 id: ", req.body.userId);
    console.log("넘어온 새 닉네임: ", req.body.newNickname);
    if (result[0] > 0) {
      res.send({ success: true, nickname: newNickname });
    } else {
      res.send({
        success: false,
        message: "수정할 사용자 정보를 찾을 수 없습니다.",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ success: false, message: "서버 오류" });
  }
};

exports.upload = (req, res) => {
  res.send({ ...req.body, ...req.file });
};
