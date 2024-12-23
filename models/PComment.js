// models/PComment.js
const PComment = function (sequelize, DataTypes) {
  return sequelize.define(
    "Pcomments", // Changed table name to match your original
    {
      commentId: {
        // Changed field name to match your original
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Assuming you want auto-increment
      },
      commentDetail: {
        // Changed field name to match your original
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      pId: {
        // Foreign key for Product
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        // Foreign key for User
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        // Add createdAt timestamp
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        // Add updatedAt timestamp
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true, // Changed to freezeTableName (correct spelling)
      timestamps: true, // Enable timestamps
    },
  );
};
module.exports = PComment;
