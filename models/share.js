'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Share.init({
    symbol:{
      type: DataTypes.STRING,
      unique:true,
      validate:{
        is: /(.*[A-Z]){3}/i,
      },
    },
    price: DataTypes.DECIMAL 
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};