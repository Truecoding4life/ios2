const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./Comment');

class Resource extends Model {}

Resource.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    category_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },

    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'resource',
  }
);


module.exports = Resource;

