//models/index.js
"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")["development"];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const UserModel = require("./User")(sequelize, Sequelize);
const ProductsModel = require("./Products")(sequelize, Sequelize);
const PCommentModel = require("./PComment")(sequelize, Sequelize);
const UserFavsModel = require("./UserFavs")(sequelize, Sequelize);
// const BCommentModel = require("./BComment")(sequelize, Sequelize); // 주석 처리
// const BoardModel = require("./Board")(sequelize, Sequelize); // 주석 처리

// Products: User through UserFavs N:M
ProductsModel.belongsToMany(UserModel, {
  through: UserFavsModel,
  foreignKey: "pId",
});
UserModel.belongsToMany(ProductsModel, {
  through: UserFavsModel,
  foreignKey: "userId",
});

// Products: PComment 1:N
ProductsModel.hasMany(PCommentModel, {
  foreignKey: "pId",
  sourceKey: "id",
});
PCommentModel.belongsTo(ProductsModel, {
  foreignKey: "pId",
  targetKey: "id",
});

// User: PComment 1:N
UserModel.hasMany(PCommentModel, {
  foreignKey: "userId",
  sourceKey: "userId",
});
PCommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "userId",
});

// User: Board 1:N
// UserModel.hasMany(BoardModel, { // 주석 처리
//   foreignKey: "userId",
//   sourceKey: "userId",
// });
// BoardModel.belongsTo(UserModel, { // 주석 처리
//   foreignKey: "userId",
//   targetKey: "userId",
// });

// Board: BComment 1:N
// BoardModel.hasMany(BCommentModel, { // 주석 처리
//   foreignKey: "boardId",
//   sourceKey: "id",
// });
// BCommentModel.belongsTo(BoardModel, { // 주석 처리
//   foreignKey: "boardId",
//   targetKey: "id",
// });

// User: BComment 1:N
// UserModel.hasMany(BCommentModel, { // 주석 처리
//   foreignKey: "userId",
//   sourceKey: "userId",
// });
// BCommentModel.belongsTo(UserModel, { // 주석 처리
//   foreignKey: "userId",
//   targetKey: "userId",
// });

db.User = UserModel;
db.Products = ProductsModel;
// db.Board = BoardModel; // 주석 처리
db.PComment = PCommentModel;
db.UserFavs = UserFavsModel;
// db.BComment = BCommentModel; // 주석 처리
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
