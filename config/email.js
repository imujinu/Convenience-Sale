const nodemailer = require("nodemailer");
const { Email } = require("../models");
// 이메일 전송을 위한 설정
const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "wlsdnrhdwkd",
    pass: "VLFLKHKNCVC8",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

var generateRandomNumber = (min, max) => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
};

const emailAuth = async (req, res) => {
  console.log("emailAuth called");
  console.log("Request body:", req.body);

  const number = generateRandomNumber(111111, 999999);
  const { email } = req.body; // 사용자가 입력한 이메일

  const mailOptions = {
    from: "wlsdnrhdwkd@naver.com", // 발신자 이메일 주소
    to: email, // 사용자가 입력한 이메일 -> 목적지 주소 이메일
    subject: "Fun pick 구독을 환영합니다",
    html: `<h1>매월 초 편의점 할인 소식을 정기적으로 보내드립니다.</h1>
           <p>자세한 사항은 <u>http://FunPick.com </u>에서 확인해보세요!</p>
           인증번호: ${number}`,
  };

  smtpTransport.sendMail(mailOptions, async (err, response) => {
    if (err) {
      console.error("Error sending email:", err);
      res.json({ ok: false, msg: "메일 전송에 실패하였습니다." });
      return;
    } else {
      const result = await Email.findOne({
        where: {
          userEmail: email,
        },
      });

      if (result) {
        console.log("이미등록된 메일입니다.");
        res.send({ message: "이미 등록된 메일입니다" });
      } else {
        const result = await Email.create({
          userEmail: email,
        });
        res.send({ message: "이메일 등록이 완료되었습니다!" });
      }
    }
  });
};

module.exports = { smtpTransport, emailAuth };
