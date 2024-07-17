const careerPost = require("../models/careerPostModel");

const config = require('../config/config');

const addProduct_form_data = async (req, res) => {

    try {

        const careerPostForm = new careerPost({
            title: req.body.title,
            desc: req.body.desc,
            // image: req.body.image,
 

            // imagee: req.body.imagee,
            // imageee: req.body.imageee,
        })

        console.log(careerPostForm);
        const userData = await careerPostForm;
        if (!userData) {
            res.status(400).send({ success: false, msg: "some error in first case whish 400 status !" });
        } else {
            const user_data = await careerPostForm.save();
            res.status(200).send({
                success: true, data: user_data, msg: "Book Your Form !"
            })
        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

// GET PRODUCTS   METHOD

const get_addProduct_form_data = async (req, res) => {
    try {
        const articles = await careerPost.find();
        console.log("articles", articles)
        if (!articles) {
            return next(new ErrorHandler('service data not Found', 404));
        }
        else {
            res.send({ data: articles, msg: "Get youe service data successfully" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.log("400 error !1");
    }
}

module.exports = {
    addProduct_form_data,
    get_addProduct_form_data
}