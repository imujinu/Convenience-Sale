// app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./models"); // Sequelize 모델 가져오기
const routes = require("./routes/index"); // 통합된 라우트

const app = express();

// 포트 설정: 환경 변수 사용 권장
const PORT = process.env.PORT || 8080;

// EJS 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 제공 설정
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// JSON 및 URL-encoded 파싱 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 미들웨어
app.use(cors());

// Sequelize DB 연결 및 동기화
db.sequelize
  .sync({ force: false }) // force: true는 데이터베이스를 강제로 재생성
  .then(() => {
    console.log("Sequelize DB 연결 및 동기화 성공");
  })
  .catch((syncErr) => {
    console.error("Sequelize DB 동기화 실패:", syncErr);
    process.exit(1); // DB 동기화 실패 시 프로세스 종료
  });

// 라우트 등록
app.use("/", routes); // 통합된 라우트 사용

// 기본 404 핸들러
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
