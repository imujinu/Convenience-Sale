const User = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      //user_id VARCHAR(20), PK
      userId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      //user_pw VARCHAR(20), NOT NULL
      userPw: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // nickname VARCHAR(20) NOT NULL,
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      //profile_picture_path VARCHAR(70) NULL, DEFAULT:
      profilePath: {
        type: DataTypes.STRING(70),
        allowNull: true,
        defaultValue: "static/image/default.jpg",
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};

module.exports = User;
