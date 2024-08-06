const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/courses", Controller.showCourses);
router.get("/my-courses", Controller.showMyCourses);
router.get("/detailCourse/:id", Controller.showDetailCourse);
router.post("/joinCourse/:courseId", Controller.handleJoinCourse);
router.put("/editMyCourse/:id", Controller.handleEditCourse);
router.delete("/deleteMyCourse/:id", Controller.handleDeleteCourse);

router.use(errorHandler);

module.exports = router;
