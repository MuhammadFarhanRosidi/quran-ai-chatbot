const instance = require("../config/axiosInstance");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User, Chapter, Verse, Course, UserCourse } = require("../models/");
const { OAuth2Client } = require("google-auth-library");

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

  static async googleLogin(req, res, next) {
    try {
      if (!req.body.googleToken) {
        throw { name: "MissingGoogleToken" };
      }
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience:
          "287364404368-f49dj7sv08k07ld12oouc1u9u9n64q16.apps.googleusercontent.com",
      });

      const { email } = ticket.getPayload();
      const [user] = await User.findOrCreate({
        where: { email: email },
        defaults: {
          username: email,
          email: email,
          password:
            Date.now().toString() + "-DUMMY-" + Math.random().toFixed(0),
        },
      });
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error, "<<<<<<");
      next(error);
    }
  }

  static async showCourses(req, res, next) {
    try {
      const { data } = await instance({
        url: "/surah",
        method: "GET",
      });

      const chapters = data.data.map((surah) => ({
        number: surah.number,
        name: {
          arab: surah.name.short,
          translation: surah.name.translation.id,
        },
        tafsir: surah.tafsir.id,
      }));

      res.status(200).json({
        chapters,
      });
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
      res.status(200).json({
        id: data.id,
        username: data.username,
        Courses: data.Courses,
      });
    } catch (error) {
      next(error);
    }
  }
  static async showDetailCourse(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await instance({
        method: "GET",
        url: `/surah/${id}`,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  // static async handleJoinCourse(req, res, next) {
  //   try {
  //     const { courseId } = req.params;
  //     const userId = req.user.id;
  //     const courseByIdResponse = await instance({
  //       url: `/${courseId}`,
  //       method: "GET",
  //     });
  //     const courseById = courseByIdResponse.data;
  //     const [chapter, chapterCreated] = await Chapter.findOrCreate({
  //       where: { id: courseById.number },
  //       defaults: {
  //         nama: courseById.nama,
  //         namaLatin: courseById.nama_latin,
  //         jumlahAyat: courseById.jumlah_ayat,
  //         tempatTurun: courseById.tempat_turun,
  //         arti: courseById.arti,
  //         deskripsi: courseById.deskripsi,
  //         audioUrl: courseById.audio,
  //       },
  //     });
  //     const [course, created] = await Course.findOrCreate({
  //       where: { chapterId: chapter.id },
  //       defaults: {
  //         title: courseById.nama,
  //         description: courseById.deskripsi,
  //         chapterId: chapter.id,
  //       },
  //     });
  //     await UserCourse.create({
  //       userId,
  //       courseId: course.id,
  //       isSubscribe: false,
  //     });
  //     res.status(201).json({ message: "Course successfully added to user" });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  static async handleJoinCourse(req, res, next) {
    try {
      const { courseId } = req.params; // Menggunakan `number` dari chapter sebagai `courseId`
      const userId = req.user.id;

      // Mendapatkan data course berdasarkan `courseId`
      const courseByIdResponse = await instance({
        url: `/surah/${courseId}`,
        method: "GET",
      });

      const courseById = courseByIdResponse.data.data; // Sesuaikan dengan struktur data API

      // Simpan data chapter jika belum ada
      const [chapter, chapterCreated] = await Chapter.findOrCreate({
        where: { id: courseById.number },
        defaults: {
          nama: courseById.name.transliteration.id,
          namaLatin: courseById.name.transliteration.en,
          jumlahAyat: courseById.numberOfVerses,
          tempatTurun: courseById.revelation.id,
          arti: courseById.name.translation.id,
          deskripsi: courseById.tafsir.id,
          audioUrl: courseById.verses[0].audio.primary,
        },
      });

      // Simpan data course jika belum ada
      const [course, created] = await Course.findOrCreate({
        where: { chapterId: chapter.id },
        defaults: {
          title: courseById.name.transliteration.id,
          description: courseById.tafsir.id,
          chapterId: chapter.id,
        },
      });

      // Buat relasi antara user dan course
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

  static async showEditCourse(req, res, next) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (!course) {
        throw { name: "NotFound", message: "Course not found" };
      }
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  }
  static async handleEditCourse(req, res, next) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const [updated] = await Course.update(
        { description },
        {
          where: { id },
        }
      );
      if (updated) {
        const updatedCourse = await Course.findOne({ where: { id } });
        res.status(200).json({ message: updatedCourse });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async handleDeleteCourse(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Course.destroy({
        where: { id },
      });
      if (deleted) {
        res.status(200).json({ message: "Course successfully deleted" });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
