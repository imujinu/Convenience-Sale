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
      hashedPassword: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING(60),
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
        defaultValue: "static/image/default-profile.jpg",
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};

module.exports = User;
