"use strict";

const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")["development"];
const db = {};
//(1) Sequelize 클래스를 통해서 sequelize 객체를 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);
//(2) 모델을 불러오면서 인자로 정보 전달
const UserModel = require("./User")(sequelize, Sequelize);
const ProductsModel = require("./Products")(sequelize, Sequelize);
const PCommentModel = require("./PComment")(sequelize, Sequelize);
const UserFavsModel = require("./UserFavs")(sequelize, Sequelize);
const BCommentModel = require("./BComment")(sequelize, Sequelize);
const BoardModel = require("./Board")(sequelize, Sequelize);
// const EmailModel = require("./Email")(sequelize, Sequelize);
//(3) 모델간 관계 설정
//3-1: products: user through userFavs N:M
ProductsModel.belongsToMany(UserModel, {
  through: UserFavsModel,
  foreignKey: "pId",
});
UserModel.belongsToMany(ProductsModel, {
  through: UserFavsModel,
  foreignKey: "userId",
});
//3-2: products: user through pComment N:M
ProductsModel.belongsToMany(UserModel, {
  through: PCommentModel,
  foreignKey: "pId",
});
UserModel.belongsToMany(ProductsModel, {
  through: PCommentModel,
  foreignKey: "userId",
});
//3-3: user: BComment: M:N
UserModel.belongsToMany(BoardModel, {
  through: BCommentModel,
  foreignKey: "userId",
});
BoardModel.belongsToMany(UserModel, {
  through: BCommentModel,
  foreignKey: "boardId",
});
//3-4: user: board 1:N
UserModel.hasMany(BoardModel, {
  foreignKey: "userId",
  sourceKey: "userId",
});
BoardModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "userId",
});

//(4) db 객체에 모델 추가
db.User = UserModel;
db.Products = ProductsModel;
db.Board = BoardModel;
db.PComment = PCommentModel;
db.UserFavs = UserFavsModel;
db.BComment = BCommentModel;
// db.Email = EmailModel;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
