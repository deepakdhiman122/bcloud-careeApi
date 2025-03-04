const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  mobile: {
    type: String,
    require: true,
  },

  address: {
    type: String,
    require: true,
  },

  district: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  userrollid: {
    type: String,
    enum: ["admin"],
    trim: true,
  },
});

module.exports = mongoose.model("careerPageData", user);
// console.log(user);
