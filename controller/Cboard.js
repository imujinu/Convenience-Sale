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
  const newPost = {
    id: posts.length + 1,
    title,
    category,
    content,
    date: new Date().toLocaleString(),
    userId: "testUser",
    file: req.file?.filename || null,
  };
  posts.push(newPost);
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
