const mongoose = require("mongoose");

const teacherData = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A teacher must have a name"],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "A teacher must have a subject"],
    trim: true,
  },
  rating: {
    type: Number,
    default: 3.5,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

const Teacher = mongoose.model("Teacher", teacherData);
module.exports = Teacher;
