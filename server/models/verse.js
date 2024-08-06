'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Verse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Verse.init({
    nomor: DataTypes.INTEGER,
    ar: DataTypes.STRING,
    tr: DataTypes.STRING,
    idn: DataTypes.STRING,
    chapterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Verse',
  });
  return Verse;
};