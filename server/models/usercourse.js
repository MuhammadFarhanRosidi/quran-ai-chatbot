"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    static associate(models) {
      UserCourse.belongsTo(models.User, { foreignKey: "userId" });
      UserCourse.belongsTo(models.Course, { foreignKey: "courseId" });
    }
  }
  UserCourse.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      isSubscribe: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserCourse",
    }
  );
  return UserCourse;
};
