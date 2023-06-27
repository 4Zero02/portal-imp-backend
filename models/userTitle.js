'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTitle extends Model {
    static associate(models) {
     // definir associações caso tenha
    }    
  }  
  UserTitle.init(
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      titleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Title',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'UserTitle',
      tableName: 'UserTitle',
      timestamps: true,
    }
  );
  return UserTitle;
};
