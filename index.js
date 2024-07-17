// const express = require('express');
// const app = express();
// const cors = require('cors');
// const dotenv = require('dotenv');

// // const username = encodeURLComponent("krystalgrowmore");
// // const password = encodeURLComponent("krystal20@#grow%24");
// // const clusterUrl = "62.72.12.181:27017/growmore";
// // const authMechanism = "SCRAM-SHA-1";

// // const uri = `mongodb://${username}:${password}@${clusterUrl}?authMechanism=${authMechanism}`;
// // console.log("uri:", uri);

// // mongoose.connect(uri).then((conn) => {
// //     console.log("Database Connected Succesfully :");

// // }).catch((error) => {
// //     console.log("Some error in DB Connection :", error);
// // })

// // dotenv config
// dotenv.config();

// // dotenv file code ..
// require('dotenv').config();
// console.log(process.env.PORT);
// console.log(process.env.SECRET_KEY);

// const corsOptions = {
//     origin: 'http://localhost:4200',
//     credentials: true,//access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }
// console.log(corsOptions);
// app.use(cors(corsOptions));

// const mongoose = require('mongoose');

// // mongoose.connect(process.env.DB_URL, {
// //     autoIndex: true
// // }).then((conn) => {
// //     console.log('DataBase Connected Successfully');
// // }).catch((error) => {
// //     console.log('Some Error in DB Connection', error);
// // });

// mongoose.connect("mongodb://127.0.0.1:27017/growmore_MAIN", {
//     autoIndex: true
// }).then((conn) => {
//     console.log('DataBase Connected Successfully');
// }).catch((error) => {
//     console.log('Some Error in DB Connection', error);
// });

// commented new 2/6/24
// const port = process.env.PORT || 8080
// // monogdb atlas listen here
// app.listen(port, () => {
//     console.log(`Server Running in ${process.env.NODE_MODE} Mode on Port ${process.env.PORT} `);
// })

const mongoose = require("mongoose");
// dotenv is for reading config file
const dotenv = require("dotenv");
/* Config the Path */
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
/* Handel uncaughtException */
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// console.log(corsOptions);
app.use(cors(corsOptions));

mongoose
  .connect("mongodb://127.0.0.1:27017/bcloudServer", {
    autoIndex: true,
  })
  .then((conn) => {
    console.log("DataBase Connected Successfully");
  })
  .catch((error) => {
    console.log("Some Error in DB Connection", error);
  });

// user routes
const user_routes = require("./routes/userRoute");
app.use("/api", user_routes);

// career routes

// user routes
const careerr_routes = require("./routes/careerRoutes");
app.use("/api", careerr_routes);

// user routes
const careerr_data_routes = require("./routes/careerDataRoutes");
app.use("/api", careerr_data_routes);

app.listen(3000, function () {
  console.log("Server is ready !");
});
