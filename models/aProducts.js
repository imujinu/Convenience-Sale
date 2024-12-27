// models/aProducts.js 기

const aProducts = (sequelize, DataTypes) => {
  const Aproducts = sequelize.define(
    "aProducts", // 테이블 이름
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
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

  Aproducts.associate = (models) => {
    // aProducts hasMany Pcomments is already handled in index.js
    Aproducts.hasMany(models.PComment, {
      foreignKey: "pId",
      as: "comments",
      onDelete: "CASCADE",
    });
  };

  return Aproducts;
};

module.exports = aProducts;
