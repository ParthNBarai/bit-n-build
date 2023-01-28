const mongoose = require("mongoose");

// console.log(user-icon)
const retailerSchema = mongoose.Schema({
    retailerName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Retailer', retailerSchema);