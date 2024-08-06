"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    static associate(models) {
      Chapter.hasMany(models.Verse, { foreignKey: "chapterId" });
      Chapter.hasOne(models.Course, { foreignKey: "chapterId" });
    }
  }
  Chapter.init(
    {
      nama: DataTypes.STRING,
      namaLatin: DataTypes.STRING,
      jumlahAyat: DataTypes.INTEGER,
      tempatTurun: DataTypes.STRING,
      arti: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      audioUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
