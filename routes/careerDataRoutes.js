const express = require("express");
const careerData_route = express();

const bodyParser = require("body-parser");

careerData_route.use(bodyParser.json());

careerData_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");

const path = require("path");

careerData_route.use(express.static("public"));

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

const career_data_controller = require("../controllers/careerDataController");

careerData_route.post(
  "/careerDataPost",
  upload.single("image"),
  career_data_controller.careerPostData
);

careerData_route.get(
  "/getCareerData",
  career_data_controller.get_areerPostData
);
careerData_route.get("/jobs/:id", career_data_controller.getCareerPostDataById
);

module.exports = careerData_route;
