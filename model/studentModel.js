const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A student must have a username"],
    unique: true,
    trim: true,
  },
  email_id: {
    type: String,
    required: [true, "A student must have a Email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A student must have a password"],
    unique: true,
    trim: true,
  },
  favTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
});

studentSchema.pre("find", function () {
  this.populate("favTeachers");
});

studentSchema.pre("save", function (next) {
  const student = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(student.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          student.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

studentSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Please enter the Password!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (err) {
    console.log("Error while comparing the password!", err);
  }
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
