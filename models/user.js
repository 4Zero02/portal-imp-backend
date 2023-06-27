'use strict';
const { Model } = require('sequelize');
const { isCPF } = require('brazilian-values');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Title, { 
        through: 'UserTitle', 
        as: 'Titles' ,
        foreignKey: 'userId'
      });
    }    
  }  
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
        validate: {
          isCPF(value) {
            if (!isCPF(value)) {
              throw new Error('Invalid CPF');
            }
          },
        },
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      registration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      university: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('Admin', 'Diretoria', 'Afiliado'),
        defaultValue: 'Afiliado',
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      membership_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_DATE'),
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );
  return User;
};
