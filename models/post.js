'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{foreignKey: "UserId"})
      Post.hasMany(models.Post_Tag,{foreignKey: "PostId", as: "IdPosts"})
      Post.belongsToMany(models.Tag,{through: "Post_Tags"})
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      //allowNull: false,
      validate: {
        //notNull: true,
        notEmpty: {
          args : true,
          msg : 'Title Tidak Boleh Kosong !'
        }
      }
    },
    content: {
      type: DataTypes.STRING,
      //allowNull: false,
      validate: {
        //notNull: true,
        notEmpty:{
          args: true,
          msg: "Describe tidak Boleh Kosong !"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      //allowNull: false,
      validate: {
        //notNull: true,
        notEmpty: {
          args : true,
          msg : 'images Tidak Boleh Kosong !'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      //allowNull: false,
      validate: {
        //notNull: true,
        notEmpty: {
          args : true,
          msg : 'location Tidak Boleh Kosong !'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      validate: {
        //notNull: true,
        notEmpty: {
          args : true,
          
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.beforeCreate((post, options) => {
    post.status = "Open"
  })

  return Post;
};