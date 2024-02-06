const serviceData = require("../models/addServiceModel");

const config = require('../config/config');

const book_service = async (req, res) => {

    try {

        const bookService = new serviceData({
            servicename: req.body.servicename,
            serviceproducttype: req.body.serviceproducttype,
            serviceproductcategory: req.body.serviceproductcategory,
            servicedetails: req.body.servicedetails,
            rating: req.body.rating,
            salesprice: req.body.salesprice,
        })

        console.log(bookService);
        const userData = await serviceData;
        if (!userData) {
            res.status(400).send({ success: false, msg: "some error in first case whish 400 status !" });
        } else {
            const user_data = await bookService.save();
            res.status(200).send({
                success: true, data: user_data, msg: "Add Services successfull !"
            })
        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

// GET PRODUCTS   METHOD

const get_service = async (req, res) => {
    try {
        const articles = await serviceData.find();
        console.log("articles", articles)
        if (!articles) {
            return next(new ErrorHandler('service data not Found', 404));
        }
        else {
            res.send({ data: articles, msg: "Get youe service data successfully" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.log("400 error !1")
    }
}

module.exports = {
    book_service,
    get_service
}