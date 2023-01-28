const mongoose = require("mongoose");

// console.log(user-icon)
const productSchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        // required: true
    },

    threshold: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        default: 0
    }


});



module.exports = mongoose.model('Product', productSchema);