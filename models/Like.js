const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Resource = require('./Resource');

class Like extends Model {}

Like.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        resource_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'resource',
                key: 'id',
            },     
        }
    },
    {
        sequelize,
        freezeTableName: false,
        underscored: false,
        modelName: "comment",
      }
);


module.exports = Like;