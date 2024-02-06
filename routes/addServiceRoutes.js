const express = require('express');
const service_route = express();

const bodyParser = require("body-parser");

service_route.use(bodyParser.json());

service_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");

const path = require("path");


service_route.use(express.static('public'));


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userImages'), function (error, sucess) {
            if (error) throw error
        });
    },

    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error1, sucsess1) {
            if (error1) throw error1
        })
    }
})

const upload = multer({ storage: storage });

const service_controller = require("../controllers/addServiceController");

service_route.post('/addService', upload.single('image'), service_controller.book_service);

service_route.get('/get_service', service_controller.get_service);


module.exports = service_route;