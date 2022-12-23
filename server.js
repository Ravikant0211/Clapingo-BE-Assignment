const mongoose = require("mongoose");

const app = require("./app");

const DB =
  "mongodb+srv://Ravikant02:Ravi@02111@cluster0.dcigwul.mongodb.net/Clapingo";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Congratulations! You are now connected to Database.`);
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
