const UserFavs = function (sequelize, DataTypes) {
  return sequelize.define(
    "userFavs",
    {
      //favorite_index INTEGER, PK
      favIndex: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};

module.exports = UserFavs;
