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
//(3) 모델간 관계 설정
//3-1: products: user through userFavs N:M
// ProductsModel.belongsTo(UserModel, {
//   through: UserFavsModel,
//   foreignKey: "pId",
// });
// UserModel.belongsTo(ProductsModel, {
//   through: UserFavsModel,
//   foreignKey: "userId",
// });
//3-2: products: PComment 1:N
// ProductsModel.hasMany(PCommentModel, {
//   foreignKey: "pId",
//   sourceKey: "pId",
// });
// PCommentModel.belongsTo(ProductsModel, {
//   foreignKey: "pId",
//   targetKey: "pId",
// });
//3-3: user: PComment: 1:N
UserModel.hasMany(PCommentModel, {
  foreignKey: "userId",
  sourceKey: "userId",
});
PCommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "userId",
});
//3-6: user: bComment through board N:M

//(4) db 객체에 모델 추가
db.User = UserModel;
db.Products = ProductsModel;
db.Board = BoardModel;
db.PComment = PCommentModel;
db.UserFavs = UserFavsModel;
db.BComment = BCommentModel;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
