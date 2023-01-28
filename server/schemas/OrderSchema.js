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
    categoryId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
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
});



module.exports = mongoose.model('Orders', orderSchema);