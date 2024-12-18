const Board = function (sequelize, DataTypes) {
  return sequelize.define(
    "board",
    {
      //board_id INTEGER, PK
      boardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      boardTitle: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      boardDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      boardDetail: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      boardPicPath: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
module.exports = Board;
