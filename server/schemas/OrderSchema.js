const mongoose = require("mongoose");

// console.log(user-icon)
const orderSchema = mongoose.Schema({
    batchNo: {
        type: String,
        required: true
    },
    retailerName: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    expiry: {
        type: Date,
        required: true
    }
});



module.exports = mongoose.model('Orders', orderSchema);