const Products = function (sequelize, DataTypes) {
  return sequelize.define(
    "products",
    {
      //product_id INTEGER, PK
      pId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      //product_name VARCHAR(50), NOT NULL
      pName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // price INTEGER NOT NULL,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // event? VARCHAR(20) NOT NULL,
      event: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      //menu_name ENUM('김밥', '샐러드', '샌드위치', '도시락') NOT NULL,
      menuName: {
        type: DataTypes.ENUM,
        values: ["김밥", "샐러드", "샌드위치", "도시락"],
        allowNull: false,
      },
      //convenience_name ENUM('CU', 'GS25', '7ELEVEN') NOT NULL
      cName: {
        type: DataTypes.ENUM,
        values: ["CU", "GS25", "7ELEVEN"],
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
