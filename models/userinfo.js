'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Login = this.belongsTo(models.Login)
    }
  };
  Userinfo.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    LoginId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Userinfo',
  });
  return Userinfo;
};
