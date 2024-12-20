// app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const { initDb } = require("./db"); // DB 초기화 함수
const db = require("./models"); // Sequelize 모델 가져오기
const productRoutes = require("./routes/productRoutes"); // 제품 관련 라우트
const pageRoutes = require("./routes/pageRoutes"); // 페이지 관련 라우트
const combinedRoutes = require("./routes/index"); // 기타 통합 라우트 (필요 시)

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

// DB 초기화 및 Sequelize 동기화
initDb((err) => {
  if (err) {
    console.error("데이터베이스 연결 오류:", err);
    process.exit(1);
  } else {
    console.log("데이터베이스 연결 성공");

    db.sequelize
      .sync({ force: false }) // force: true는 데이터베이스를 강제로 재생성
      .then(() => {
        console.log("Sequelize DB 연결 및 동기화 성공");
      })
      .catch((syncErr) => {
        console.error("Sequelize DB 동기화 실패:", syncErr);
      });
  }
});

// 라우트 등록
app.use("/products", productRoutes); // 제품 관련 라우트
app.use("/pages", pageRoutes); // 페이지 관련 라우트
app.use("/", combinedRoutes); // 기타 통합 라우트 (필요 시)

// 기본 404 핸들러
app.use((req, res) => {
  // 상황에 따라 EJS 렌더링 또는 텍스트 응답 선택
  // EJS를 사용하려면 views 폴더에 404.ejs 파일이 존재해야 합니다.
  res.status(404).render("404", { url: req.originalUrl });
  // 또는 단순 텍스트 응답:
  // res.status(404).send("페이지를 찾을 수 없습니다.");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
