const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/courses", () => {});
router.get("/my-courses", () => {});
router.post("/joinCourse/:id", () => {});
router.post("/myFavouriteCourse/:id", () => {});
router.put("/myFavouriteCourse/:id", () => {});
router.delete("/myFavouriteCourse/:id", () => {});

router.use(errorHandler);

module.exports = router;
