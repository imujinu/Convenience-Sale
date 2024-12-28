// 자유게시판 댓글
const BComment = function (sequelize, DataTypes) {
  return sequelize.define(
    "bComment",
    {
      // board_comment_ID INTEGER, PK
      bcId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // board_id (게시글 번호)
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // user_id (댓글 작성자)
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // board_comment_detail LONG VARCHAR, NOT NULL
      bcDetail: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      // 작성 시점
      bcDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    { freezeTableName: true, timestamps: false },
  );
};
module.exports = BComment;
