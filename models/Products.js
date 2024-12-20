// models/Products.js
const Products = function (sequelize, DataTypes) {
  return sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.STRING, // ID를 문자열로 변경
        primaryKey: true,
        // autoIncrement: true, // 자동 증가 제거
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      convini: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};

module.exports = Products;
