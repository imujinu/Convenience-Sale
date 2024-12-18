const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const PORT = 8080;

// View 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 제공
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 요청 본문 처리
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 파일 업로드 설정
const upload = multer({ dest: "uploads/" });

// 라우터 불러오기
const boardRouter = require("./routes/board");
app.use("/board", boardRouter);

// 메인 화면 리다이렉트
app.get("/", (req, res) => res.redirect("/board"));

// 404 페이지 설정
app.use((req, res) => res.status(404).render("404"));

app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`);
});
