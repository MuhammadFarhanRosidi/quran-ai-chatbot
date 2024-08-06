const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/courses", Controller.showCourses);
router.get("/my-courses", Controller.showMyCourses);
router.post("/joinCourse/:id", Controller.handleJoinCourse);
router.post("/myFavouriteCourse/:id", Controller.handleAddFavouriteCourse);
router.put("/myFavouriteCourse/:id", Controller.handleEditFavouriteCourse);
router.delete("/myFavouriteCourse/:id", Controller.handleDeleteFavouriteCourse);

router.use(errorHandler);

module.exports = router;
