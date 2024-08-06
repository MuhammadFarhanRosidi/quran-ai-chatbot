const instance = require("../config/axiosInstance");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User, Chapter, Verse, Course, UserCourse } = require("../models/");

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
      const userId = req.user.id;
      const data = await User.findByPk(userId, {
        include: {
          model: Course,
          throught: {
            attributes: [],
          },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async handleJoinCourse(req, res, next) {
    try {
      const { courseId } = req.params;
      const userId = req.user.id;

      // Mendapatkan data course dari API eksternal
      const courseByIdResponse = await instance({
        url: `/${courseId}`,
        method: "GET",
      });
      const courseById = courseByIdResponse.data;
      console.log(courseById);

      // Pastikan bahwa chapter ada di database sebelum membuat course
      const [chapter, chapterCreated] = await Chapter.findOrCreate({
        where: { id: courseById.nomor },
        defaults: {
          nama: courseById.nama,
          namaLatin: courseById.nama_latin,
          jumlahAyat: courseById.jumlah_ayat,
          tempatTurun: courseById.tempat_turun,
          arti: courseById.arti,
          deskripsi: courseById.deskripsi,
          audioUrl: courseById.audio,
        },
      });

      // Simpan data course ke dalam database
      const [course, created] = await Course.findOrCreate({
        where: { chapterId: chapter.id },
        defaults: {
          title: courseById.nama,
          description: courseById.deskripsi,
          chapterId: chapter.id,
        },
      });

      // Masukkan data ke dalam tabel UserCourses
      await UserCourse.create({
        userId,
        courseId: course.id,
        isSubscribe: false,
      });

      res.status(201).json({ message: "Course successfully added to user" });
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
