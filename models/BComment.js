const BComment = function (sequelize, DataTypes) {
  return sequelize.define(
    "bComment",
    {
      //board_comment_ID INTEGER, PK
      bcId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      //board_comment_detail LONG VARCHAR, NOT NULL
      bcDetail: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      freezeTable: true,
      timeStamps: false,
    },
  );
};
module.exports = BComment;
