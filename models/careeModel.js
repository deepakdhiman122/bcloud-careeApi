const mongoose = require("mongoose");

const user = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  country: {
    type: String,
  },

  phoneNumber: {
    type: String,
    require: true,
  },

  applied: {
    type: String,
    require: true,
  },

  selectType: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  
  
});

module.exports = mongoose.model("careerData", user);
// console.log(user);
