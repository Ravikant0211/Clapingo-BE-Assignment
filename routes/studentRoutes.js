const express = require("express");
const studentController = require("./../controller/studentController");

const router = express.Router();

router.route("/register").post(studentController.createStudent);
router.route("/login").post(studentController.loginStudent);
router
  .route("/profile")
  .post(studentController.verifyToken, studentController.getProfile);

module.exports = router;
