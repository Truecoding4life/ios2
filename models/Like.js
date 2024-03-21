const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


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
        freezeTableName: true, 
        underscored: true,
        modelName: "like", 
        indexes: [
            // Create a composite unique index on user_id and resource_id
            {
                unique: true,
                fields: ['user_id', 'resource_id']
            }
        ] 
      }
);


module.exports = Like;