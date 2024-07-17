const mongoose = require("mongoose");

const user = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  desc: {
    type: String,
    require: true,
  },

  //   image: {
  //     type: String,
  //     require: true,
  //   },
});

module.exports = mongoose.model("careerPostModule", user);
// console.log(user);
