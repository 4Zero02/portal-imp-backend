'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Title extends Model {
    static associate(models) {
      this.belongsToMany(models.User, { 
        through: 'UserTitle', 
        as: 'Users' ,
        foreignKey: 'userId'
      });
    }
  }
  Title.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Title',
      tableName: 'Titles'
    }
  );
  return Title;
};
