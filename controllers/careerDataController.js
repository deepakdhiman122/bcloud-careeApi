const careerdata = require("../models/careeModel");

const config = require("../config/config");

const careerPostData = async (req, res) => {
  try {
    const careerDataForm = new careerdata({
      firstName: req.body.firstName,
      email: req.body.email,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      applied: req.body.applied,
      selectType: req.body.selectType,
      desc: req.body.desc,
    });

    console.log(careerDataForm);
    const userData = await careerDataForm;
    if (!userData) {
      res.status(400).send({
        success: false,
        msg: "some error in first case whish 400 status !",
      });
    } else {
      const user_data = await careerDataForm.save();
      res.status(200).send({
        success: true,
        data: user_data,
        msg: "Book Your Form !",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
};

// GET PRODUCTS   METHOD

const get_areerPostData = async (req, res) => {
  try {
    const articles = await careerdata.find();
    console.log("articles", articles);
    if (!articles) {
      return next(new ErrorHandler("service data not Found", 404));
    } else {
      res.send({ data: articles, msg: "Get youe service data successfully" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
    console.log("400 error !1");
  }
};

const getCareerPostDataById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = await careerdata.findById(jobId);
    if (!jobData) {
      res.status(404).send({
        success: false,
        msg: "Job not found!",
      });
    } else {
      res.status(200).send({
        success: true,
        data: jobData,
        msg: "Job details retrieved successfully!",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  careerPostData,
  get_areerPostData,
  getCareerPostDataById
};
