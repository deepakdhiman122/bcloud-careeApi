const mongoose = require("mongoose")

const Addservice = mongoose.Schema({

    servicename: {
        type: String,
        require: true
    },

    serviceproducttype: {
        type: String,
        require: true
    },

    serviceproductcategory: {
        type: String,
        require: true

    },

    servicedetails: {
        type: String,
        require: true
    },

    rating: {
        type: String,
        require: true
    },

    salesprice: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model("addService", Addservice);
// console.log(user);