require("dotenv").config();
const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

module.exports = db