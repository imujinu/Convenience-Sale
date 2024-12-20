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
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      // price INTEGER NOT NULL,
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // event? VARCHAR(20) NOT NULL,
      event: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      //menu_name ENUM('김밥', '샐러드', '샌드위치', '도시락') NOT NULL,
      menuName: {
        type: DataTypes.ENUM,
        values: ["김밥", "샐러드", "샌드위치", "도시락"],
        allowNull: true,
      },
      //convenience_name ENUM('CU', 'GS25', '7ELEVEN') NOT NULL
      cName: {
        type: DataTypes.ENUM,
        values: ["CU", "GS25", "7ELEVEN"],
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};

module.exports = Products;
