// cys2/241219/자유게시판
const multer = require("multer");
const path = require("path");
const models = require("../models");

// Multer 설정 (첨부 파일 저장)
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "static/uploads/board/");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
});

const posts = [];
const comments = {};

// 자유게시판 목록
exports.showBoard = (req, res) => {
  res.render("board", { posts });
};

// 글 작성 화면
exports.showWriteForm = (req, res) => {
  res.render("write");
};

// 글 작성
exports.createPost = [
  upload.single("file"),
  (req, res) => {
    const { title, category, content } = req.body;

    // 데이터 검증
    if (!title || !content) {
      return res.status(400).send("제목과 내용을 입력하세요.");
    }

    const newPost = {
      id: posts.length + 1,
      title,
      category,
      content,
      date: new Date().toLocaleString(),
      userId: req.user ? req.user.id : "익명",
      file: req.file?.filename || null,
    };

    posts.push(newPost);
    res.redirect("/board");
  },
];

// 글 확인 화면
exports.showPost = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send("게시글을 찾을 수 없습니다.");
  }
  res.render("view", { post, comments: comments[post.id] || [] });
};

// 댓글 작성
exports.createComment = (req, res) => {
  if (!req.user) {
    return res.status(401).send("로그인 후 댓글을 작성할 수 있습니다.");
  }

  const { comment } = req.body;
  const postId = parseInt(req.params.id);

  if (!comments[postId]) comments[postId] = [];
  comments[postId].push({ userId: req.user.id || "익명", text: comment });
  res.redirect(`/board/view/${postId}`);
};
