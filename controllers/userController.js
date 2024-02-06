const Users = require("../models/userModel");

// const Vender = require('../models/venderSignUpMode');

const bcryptjs = require("bcryptjs");

const config = require('../config/config');

const jwt = require('jsonwebtoken');


const create_token = async (id) => {

    try {
        const token = jwt.sign({ _id: id }, config.secret_jwt);
        return token;

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const securePassword = async (password) => {
    try {

        const passwordHash = bcryptjs.hash(password, 10);
        return passwordHash;

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

const register_user = async (req, res) => {

    try {

        const spassword = await securePassword(req.body.password);
        console.log("spassword: ", spassword);

        const growUser = new Users({
            name: req.body.name,
            mobile: req.body.mobile,
            address: req.body.address,
            district: req.body.district,
            email: req.body.email,
            password: spassword,

            userrollid: req.body.userrollid,
        })
        console.log("grow user: ", growUser);
        const userData = await Users.findOne({ email: req.body.email });
        if (userData) {
            res.status(200).send({ success: false, msg: "This email is already exist !" })
        } else {
            const user_data = await growUser.save();
            res.status(200).send({ success: true, data: user_data, msg: "register successfully" })
        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

// register vender...

// logn method

const user_login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(req.body.password);

        const userData = await Users.findOne({ email: email })
        if (userData) {
            const passwordMatch = await bcryptjs.compare(password, userData.password);
            if (passwordMatch) {
                const tokenData = await create_token(userData._id);
                const userResult = {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    userrollid: userData.userrollid,
                    token: tokenData
                }
                const response = {
                    success: true,
                    msg: "User Details",
                    data: userResult
                }
                res.status(200).send(response);

            } else {
                res.status(200).send({ success: false, msg: "Login details are incorrected !" });
            }
        } else {
            res.status(200).send({ success: false, msg: "Login details are incorrected !" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

// GET PRODUCTS  METHOD

const get_register = async (req, res) => {
    try {
        const articles = await User.find();
        console.log("articles", articles)
        if (!articles) {
            return next(new ErrorHandler('register user not Found', 404));
        }
        else {
            res.send(articles);
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.log("400 error !1")
    }
}

module.exports = {
    register_user,
    user_login,
    get_register
}