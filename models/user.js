'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get fullName(){
      return this.firstName+" "+this.lastName
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{foreignKey: "UserId"})
    }

    static getMatchId(data,name){
      let idRole = []
        data.forEach(el => {
          // console.log(el.username,'=',name)
          if (el.username === name){
            idRole.push(el.id, el.rote)
          }
        })
      console.log(idRole)
      return idRole
      
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLowercase: true,
        notNull: true,
        notEmpty: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    rote: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  }),
  User.beforeCreate((user, options) => {
    user.firstName = user.firstName.toUpperCase();
    user.lastName = user.lastName.toUpperCase();
    user.password = hashingPassword(user.password)
  });
  return User;
};