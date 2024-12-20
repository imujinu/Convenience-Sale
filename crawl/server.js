// server.js
const express = require("express");
const { connection, initDb } = require("./db");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const port = 3000;

// ejs 설정
app.set("view engine", "ejs");
app.set("views", "./views");

// 정적 파일 제공 (public 폴더)
app.use(express.static("public"));

// JSON 파싱 미들웨어
app.use(express.json());

// CORS 미들웨어 추가: 모든 라우트('/')에 적용하기 *전에* 사용
app.use(cors()); // 모든 출처 허용

// DB 초기화
initDb((err) => {
  if (err) {
    console.error("데이터베이스 연결 오류:", err);
    process.exit(1);
  } else {
    console.log("데이터베이스 연결 성공");
  }
});

// 라우트 등록
app.use("/", routes);

// 기본 404 핸들러 (모든 라우트 뒤에 위치)
app.use((req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다.");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
