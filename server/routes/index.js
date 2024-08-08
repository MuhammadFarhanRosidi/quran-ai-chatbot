const Controller = require("../controllers/controller");
const gemini = require("../helpers/gemini");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.post("/quran-chatbot", async (req, res, next) => {
  try {
    const { message } = req.body;
    let data = await gemini(message);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.use(authentication);

router.get("/courses", Controller.showCourses);
router.get("/my-courses", Controller.showMyCourses);
router.get("/detailCourse/:id", Controller.showDetailCourse);
router.post("/joinCourse/:courseId", Controller.handleJoinCourse);
router.get("/editMyCourse/:id", Controller.showEditCourse);
router.put("/editMyCourse/:id", Controller.handleEditCourse);
router.delete("/deleteMyCourse/:id", Controller.handleDeleteCourse);

router.use(errorHandler);

module.exports = router;
