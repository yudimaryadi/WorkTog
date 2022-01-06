'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static getIdPost(){
    //   let idPost = sequelize.query(
    //     `
    //     SELECT id
    //     FROM "Posts"
    //     `, {type: QueryTypes.SELECT}
    //   );
    //   return idPost
    // }
    static associate(models) {
      // define association here
      Post_Tag.belongsTo(models.Post, {foreignKey: "PostId"})
      Post_Tag.belongsTo(models.Tag, {foreignKey: "TagId"})
    }
  };
  Post_Tag.init({
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post_Tag',
  });
  // Post_Tag.beforeCreate((posttag, options) => {
  //   posttag.PostId = Post_Tag.getIdPost
    
  // });
  return Post_Tag;
};