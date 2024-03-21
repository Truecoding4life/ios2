const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    resource_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "resource",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Set default value to current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Set default value to current timestamp
    },
  },
  {
    sequelize,
    freezeTableName: false,
    underscored: false,
    modelName: "comment",
  }
);

module.exports = Comment;
