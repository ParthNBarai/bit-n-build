const mongoose = require("mongoose");

// console.log(user-icon)
const batchSchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    batchNo: {
        type: Number,
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
    createdAt: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    barcode: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    manufacturing: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
});



module.exports = mongoose.model('Batches', batchSchema);