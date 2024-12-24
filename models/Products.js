const Products = function (sequelize, DataTypes) {
  return sequelize.define(
    "products",
    {
      //product_id INTEGER, PK
      pId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      //product_name VARCHAR(50), NOT NULL
      pName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // price INTEGER NOT NULL,
      price: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // event? VARCHAR(20) NOT NULL,
      event: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      //convenience_name ENUM('CU', 'GS25', '7ELEVEN') NOT NULL
      cName: {
        type: DataTypes.ENUM,
        values: ["CU", "GS25", "7ELEVEN"],
        allowNull: false,
      },
      imagePath: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};

module.exports = Products;
