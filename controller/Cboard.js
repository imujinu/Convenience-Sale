// 자유게시판 컨트롤러
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

// 게시글 및 댓글 저장소
const posts = [];
const comments = {};

// 자유게시판 목록 화면
exports.showBoard = (req, res) => {
  res.render("board", { posts, user: req.session.user }); // 로그인 상태 전달
};

// 글 작성 화면
exports.showWriteForm = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  res.render("write");
};

// 글 작성 처리
exports.createPost = [
  upload.single("file"),
  (req, res) => {
    const { title, category, content, password } = req.body;

    // 데이터 검증
    if (!title || !content || !password || !/^\d{4}$/.test(password)) {
      return res.status(400).send("입력 정보를 확인하세요.");
    }

    // 새 글 객체 생성
    const newPost = {
      id: posts.length + 1,
      title,
      category,
      content,
      password,
      date: new Date().toLocaleString(),
      userId: req.session.user ? req.session.user.id : "익명",
      file: req.file?.filename || null,
    };

    posts.push(newPost);
    res.redirect("/board");
  },
];

// 글 삭제 처리
exports.deletePost = (req, res) => {
  const postId = parseInt(req.params.id);
  const { password } = req.body;

  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).send("게시글을 찾을 수 없습니다.");
  }

  if (posts[postIndex].password !== password) {
    return res.status(400).send("비밀번호가 일치하지 않습니다.");
  }

  posts.splice(postIndex, 1);
  res.redirect("/board");
};

// 글 확인 화면
exports.showPost = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send("게시글을 찾을 수 없습니다.");
  }

  res.render("view", {
    post,
    comments: comments[post.id] || [],
    user: req.session.user,
  });
};

// 댓글 작성 처리
exports.createComment = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("로그인 후 댓글을 작성할 수 있습니다.");
  }

  const { comment } = req.body;
  const postId = parseInt(req.params.id);

  if (!comments[postId]) comments[postId] = [];
  comments[postId].push({
    userId: req.session.user.id || "익명",
    text: comment,
  });

  res.redirect(`/board/view/${postId}`);
};
