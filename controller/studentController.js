const jwt = require("jsonwebtoken");
const { findOne } = require("./../model/studentModel");
const Student = require("./../model/studentModel");
// const Teacher = require("./../model/teacherModel");
const SECRETKEY = "kj*&jfs384^jads%jlskdf475#$jfd8@jofkjfd";

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.loginStudent = async (req, res) => {
  const emailId = req.body.email_id;
  const password = req.body.password;
  try {
    const student = await Student.findOne({ email_id: emailId }).populate(
      "favTeachers"
    );

    if (!student) throw new Error("Email id is not registered");
    const result = await student.comparePassword(password);
    if (result) {
      jwt.sign({ student }, SECRETKEY, { expiresIn: "300s" }, (err, token) => {
        res.status(200).json({
          token,
        });
      });
    } else {
      throw new Error("Please enter valid password.");
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  jwt.verify(req.token, SECRETKEY, (err, authData) => {
    const newAuthData = { ...authData }; // deep copy
    const data = newAuthData.student;
    delete data["password"];

    if (err) {
      res.send({ result: "Invalid token" });
    } else {
      res.status(200).json({
        message: "Profile accessed",
        data,
      });
    }
  });
};

exports.verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.send({ result: "Empty token" });
  } else {
    req.token = token;
    next();
  }
};
