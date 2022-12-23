const express = require("express");
const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");

const app = express();
app.use(express.json()); // body parser

app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);

module.exports = app;
