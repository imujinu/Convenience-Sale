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

//회원 생성
exports.postRegister = async (req, res) => {
  try {
    const newUser = await models.User.create({
      userId: req.body.userId,
      userPw: req.body.userPw,
      nickname: req.body.nickname,
    });
    res.send(newUser);
    // res.render("login", { newUser });
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

// userController.js
exports.deleteAccount = async (req, res) => {
  try {
    // 현재 로그인한 사용자 정보 확인
    const userId = req.session.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "로그인이 필요합니다." });
    }

    // 사용자 정보 가져오기
    const user = await models.User.findOne({ where: { userId } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    // 비밀번호 검증
    const { password } = req.body; // 요청 본문에서 비밀번호 추출
    if (user.userPw !== password) {
      return res
        .status(401)
        .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }

    // 사용자 삭제
    const result = await models.User.destroy({ where: { userId } });

    if (result) {
      // 세션 정리
      req.session.destroy((err) => {
        if (err) {
          console.error("세션 삭제 중 오류:", err);
          return res
            .status(500)
            .json({ success: false, message: "세션 삭제 실패" });
        }
        res.clearCookie("connect.sid"); // 세션 쿠키 제거
        return res
          .status(200)
          .json({ success: true, message: "회원탈퇴가 완료되었습니다." });
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "회원탈퇴 중 오류가 발생했습니다." });
    }
  } catch (error) {
    console.error("회원탈퇴 중 오류:", error);
    res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};

exports.upload = (req, res) => {
  res.send({ ...req.body, ...req.file });
};
exports.emailSend = emailAuth;
