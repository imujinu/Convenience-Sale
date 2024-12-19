const PComment = function (sequelize, DataTypes) {
  return sequelize.define(
    "Pcomments",
    {
      //product_comment_id INTEGER, PK
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      //product_comment_detail LONG VARCHAR, NOT NULL
      commentDetail: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      freezeTable: true,
      timeStamps: false,
    },
  );
};
module.exports = PComment;
