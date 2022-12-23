const express = require("express");
const studentController = require("../controller/teacherController");
const { route } = require("./studentRoutes");

const router = express.Router();

router.route("/addNewTeacher").post(studentController.addNewTeacher);
router.route("/deleteTeacher/:id").delete(studentController.deleteTeacher);
router.route("/getFavTeacher/:id").get(studentController.getFavTeacher);

module.exports = router;
