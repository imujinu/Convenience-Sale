const { Board, BComment, User } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/**
 * 자유게시판 목록 페이지
 */
exports.showBoard = async (req, res) => {
  try {
    // 전체 게시글 찾기 (최신 순)
    const boardList = await Board.findAll({
      order: [["boardId", "DESC"]],
    });

    return res.render("board", {
      isLogin: !!req.session.user, // 로그인 여부
      name: req.session.user ? req.session.user.userId : null,
      boardList,
    });
  } catch (error) {
    console.error("showBoard Error:", error);
    return res.status(500).send("서버 에러");
  }
};

/**
 * 글 작성 페이지
 */
exports.showWriteForm = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  return res.render("boardWrite", {
    isLogin: true,
    name: req.session.user ? req.session.user.userId : null,
  });
};

/**
 * 글 작성 요청 처리
 */
exports.createPost = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const { boardTitle, boardDetail } = req.body;
    const userId = req.session.user.userId;

    // 게시글 생성
    await Board.create({
      boardTitle,
      boardDetail,
      userId, // 세션에서 가져온 userId
      // boardDate, boardPicPath 등이 필요하면 추가
    });

    return res.redirect("/board");
  } catch (error) {
    console.error("createPost Error:", error);
    return res.status(500).send("서버 에러");
  }
};

/**
 * 게시글 상세보기
 */
exports.showPost = async (req, res) => {
  try {
    const boardId = req.params.id;

    // 게시글 정보
    const post = await Board.findOne({
      where: { boardId },
      // User 모델과 1:N 관계 (만약 작성자 이름/정보를 가져오고 싶다면 include)
      include: [{ model: User }],
    });

    if (!post) {
      return res.status(404).send("게시글을 찾을 수 없습니다.");
    }

    // 해당 게시글의 댓글
    const comments = await BComment.findAll({
      where: { boardId },
      order: [["bcId", "ASC"]],
      // 댓글 작성자 정보 가져오려면 include
      // include: [{ model: User }]
    });

    return res.render("boardView", {
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

/**
 * 댓글 작성 처리
 */
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
