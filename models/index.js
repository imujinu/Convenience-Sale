// models/index.js

"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/../config/config.js")[env];
const db = {};

// (1) Sequelize 클래스를 통해서 sequelize 객체를 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// (2) 모델을 불러오면서 인자로 정보 전달
const UserModel = require("./User")(sequelize, Sequelize.DataTypes);
const ProductsModel = require("./Products")(sequelize, Sequelize.DataTypes);
const aProductsModel = require("./aProducts")(sequelize, Sequelize.DataTypes);
const PCommentModel = require("./PComment")(sequelize, Sequelize.DataTypes);
const UserFavsModel = require("./UserFavs")(sequelize, Sequelize.DataTypes);
const BCommentModel = require("./BComment")(sequelize, Sequelize.DataTypes);
const BoardModel = require("./Board")(sequelize, Sequelize.DataTypes);
const EmailModel = require("./Email")(sequelize, Sequelize.DataTypes);

// (3) 모델간 관계 설정

// 3-1: products: user through userFavs N:M
ProductsModel.belongsToMany(UserModel, {
  through: UserFavsModel,
  foreignKey: "pId",
  otherKey: "userId",
});
UserModel.belongsToMany(ProductsModel, {
  through: UserFavsModel,
  foreignKey: "userId",
  otherKey: "pId",
});

// 3-2: products: user through pComment (잘못된 관계이므로 제거)
// 기존의 N:M 관계를 제거하고, PComment를 별도의 모델로 설정
// ProductsModel.belongsToMany(UserModel, {
//   through: PCommentModel,
//   foreignKey: "pId",
// });
// UserModel.belongsToMany(ProductsModel, {
//   through: PCommentModel,
//   foreignKey: "userId",
// });

// 3-3: user: BComment: M:N
UserModel.belongsToMany(BoardModel, {
  through: BCommentModel,
  foreignKey: "userId",
  otherKey: "boardId",
});
BoardModel.belongsToMany(UserModel, {
  through: BCommentModel,
  foreignKey: "boardId",
  otherKey: "userId",
});

// 3-4: user: board 1:N
UserModel.hasMany(BoardModel, {
  foreignKey: "userId",
  sourceKey: "userId",
});
BoardModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "userId",
});

// 3-5: aProducts hasMany Pcomments
aProductsModel.hasMany(PCommentModel, {
  foreignKey: "pId",
  as: "comments",
  onDelete: "CASCADE",
});

// 3-6: User hasMany Pcomments
UserModel.hasMany(PCommentModel, {
  foreignKey: "userId",
  as: "comments",
  onDelete: "CASCADE",
});

// 3-7: Pcomments belongsTo aProducts and User
PCommentModel.belongsTo(aProductsModel, {
  foreignKey: "pId",
  as: "product",
});
PCommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});

// (4) db 객체에 모델 추가
db.User = UserModel;
db.Products = ProductsModel;
db.aProducts = aProductsModel;
db.Board = BoardModel;
db.PComment = PCommentModel;
db.UserFavs = UserFavsModel;
db.BComment = BCommentModel;
db.Email = EmailModel;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
