'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chapter.init({
    nama: DataTypes.STRING,
    namaLatin: DataTypes.STRING,
    jumlahAyat: DataTypes.INTEGER,
    tempatTurun: DataTypes.STRING,
    arti: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    audioUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};