const instance = require("../config/axiosInstance");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User, Chapter, Verse, Course } = require("../models/");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let data = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "CredentialsRequired" };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw { name: "Unauthorized" };
      }
      const comparePass = comparePassword(password, foundUser.password);
      if (!comparePass) {
        throw { name: "Unauthorized" };
      }
      const access_token = signToken({ id: foundUser.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async showCourses(req, res, next) {
    try {
      const { data } = await instance({
        url: "/",
        method: "GET",
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async showMyCourses(req, res, next) {
    try {
      const data = await Course.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async handleJoinCourse(req, res, next) {
    try {
      const data = await Course.create();
    } catch (error) {
      next(error);
    }
  }
  static async handleAddFavouriteCourse(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  static async handleEditFavouriteCourse(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  static async handleDeleteFavouriteCourse(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
