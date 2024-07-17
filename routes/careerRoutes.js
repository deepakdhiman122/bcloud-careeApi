const express = require("express");
const career_route = express();

const bodyParser = require("body-parser");

career_route.use(bodyParser.json());

career_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");

const path = require("path");

career_route.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/userImages"),
      function (error, sucess) {
        if (error) throw error;
      }
    );
  },

  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error1, sucsess1) {
      if (error1) throw error1;
    });
  },
});

const upload = multer({ storage: storage });

const career_controller = require("../controllers/careerPostController");

career_route.post(
  "/careerPost",
  upload.single("image"),
  career_controller.addProduct_form_data
);

career_route.get("/getCareer", career_controller.get_addProduct_form_data);

module.exports = career_route;
