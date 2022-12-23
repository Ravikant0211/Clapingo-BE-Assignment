const Teacher = require("./../model/teacherModel");
const Student = require("./../model/studentModel");

exports.addNewTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();

    const student = await Student.findById({
      _id: newTeacher.student,
    }).populate("favTeachers");
    student.favTeachers.push(newTeacher);
    await student.save();

    res.status(201).json({
      status: "success",
      data: {
        teacher: newTeacher,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    // const studentId = req.body.student_id;
    Student.findOneAndUpdate(
      // I don't know why, This logic is not working fine. I'll look into it.
      {},
      { $pull: { favTeachers: { _id: teacherId } } },
      function (error, doc) {
        if (error) {
          console.log(error);
        } else {
          console.log(doc);
        }
      }
    );

    res.status(204).json({
      status: "success",
      message: "Teacher successfully deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getFavTeacher = async (req, res) => {
  try {
    // couldn't do this part correctly, i'll look into aggregation deeply.
    const id = req.params.id;
    await Teacher.aggregate([
      {
        $sort: { rating: -1 },
      },
    ]);

    const result = await Student.findById({ _id: id }).populate("favTeachers");
    const favoriteTeacher = result.favTeachers[0];
    console.log(result);

    // const result = await Student.aggregate([
    //   {
    //     $project: {
    //       favTeachers: {
    //         $filter: {
    //           input: "$favTeachers",
    //           as: "item",
    //           in: { "$$item.student": id },
    //         },
    //       },
    //     },
    //   },
    // ]);
    // console.log(id);
    // const result = await Teacher.aggregate([
    //   {
    //     $match: { $expr: { _id: id } },
    //   },
    // {
    //   $group: {
    //     _id: null,
    //     rating: { $max: "$rating" },
    //     name: { $first: "$name" },
    //     subject: { $first: "$subject" },
    //   },
    // },
    // {
    //   $unwind: "$favTeachers",
    // },
    // ]);

    // console.log(result);

    // const newResult = await Student.aggregate([
    //   {
    //     $filter: {
    //       input: result,
    //       as: "item",
    //       cond: { $gte: { rating: 4 } },
    //     },
    //   },
    // ]);

    res.status(200).json({
      status: "success",
      favoriteTeacher,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
