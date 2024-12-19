// 게시판 컨트롤러
const posts = [];
const comments = {};

exports.showBoard = (req, res) => {
  res.render("board", { posts });
};

exports.showWriteForm = (req, res) => {
  res.render("write");
};

exports.createPost = (req, res) => {
  const { title, category, content } = req.body;
  const file = req.file;

  // 서버에 전달된 데이터 확인
  console.log("등록된 데이터:", { title, category, content, file });

  const newPost = {
    id: posts.length + 1,
    title,
    category,
    content,
    date: new Date().toLocaleString(),
    userId: "testUser", // 로그인 기능 추가 전까지 임시 설정
    file: file?.filename || null, // 파일명 저장
  };

  posts.push(newPost);
  console.log("게시판 데이터:", posts);

  res.redirect("/board");
};

exports.showPost = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  res.render("view", { post, comments: comments[post.id] || [] });
};

exports.createComment = (req, res) => {
  const { comment } = req.body;
  const postId = parseInt(req.params.id);
  if (!comments[postId]) comments[postId] = [];
  comments[postId].push({ userId: "testUser", text: comment });
  res.redirect(`/board/view/${postId}`);
};
