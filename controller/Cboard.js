// Cboard.js
const { Board, BComment, User } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// 자유게시판 목록 페이지
exports.showBoard = async (req, res) => {
  try {
    const boardList = await Board.findAll({
      order: [["boardId", "DESC"]],
    });

    return res.render("board", {
      isLogin: !!req.session.user,
      name: req.session.user ? req.session.user.userId : null,
      boardList,
    });
  } catch (error) {
    console.error("showBoard Error:", error);
    return res.status(500).send("서버 에러");
  }
};

// 글 작성 페이지
exports.showWriteForm = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  return res.render("write", {
    isLogin: true,
    name: req.session.user ? req.session.user.userId : null,
  });
};

// 글 작성 요청 처리
exports.createPost = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const { boardTitle, boardDetail } = req.body;
    const userId = req.session.user.userId;

    // 만약 파일 업로드가 있다면, multer로부터 req.file이 넘어옴
    let boardPicPath = null;
    if (req.file) {
      // 업로드된 이미지가 있을 경우 경로를 DB에 저장
      // 예: /static/uploads/board/파일명
      boardPicPath = `/static/uploads/board/${req.file.filename}`;
    }

    // DB에 새 글 생성
    await Board.create({
      boardTitle,
      boardDetail,
      userId,
      boardPicPath, // 업로드 이미지 경로 (NULL 가능)
      // boardDate 자동(defaultValue: NOW) or 원하는 값으로
    });

    // 글 작성 후 /board 목록 페이지로 이동
    return res.redirect("/board");
  } catch (error) {
    console.error("createPost Error:", error);
    return res.status(500).send("서버 에러");
  }
};

// 게시글 상세보기
exports.showPost = async (req, res) => {
  try {
    const boardId = req.params.id;
    const post = await Board.findOne({
      where: { boardId },
      include: [{ model: User }], // 작성자 정보
    });

    if (!post) {
      return res.status(404).send("게시글을 찾을 수 없습니다.");
    }

    // 게시글에 달린 댓글
    const comments = await BComment.findAll({
      where: { boardId },
      order: [["bcId", "ASC"]],
    });

    return res.render("view", {
      isLogin: !!req.session.user,
      name: req.session.user ? req.session.user.userId : null,
      post,
      comments,
    });
  } catch (error) {
    console.error("showPost Error:", error);
    return res.status(500).send("서버 에러");
  }
};

// 댓글 작성 처리
exports.createComment = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }
    const boardId = req.params.id;
    const { bcDetail } = req.body;
    const userId = req.session.user.userId;

    await BComment.create({
      boardId,
      bcDetail,
      userId,
    });

    return res.redirect(`/board/view/${boardId}`);
  } catch (error) {
    console.error("createComment Error:", error);
    return res.status(500).send("서버 에러");
  }
};
