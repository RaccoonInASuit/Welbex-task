const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {

    }
  }
  Post.init({
    firstName: DataTypes.STRING,
    description: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};