const mongoose = require("mongoose");

// console.log(user-icon)
const batchSchema = mongoose.Schema({
    // categoryName: {
    //     type: String,
    //     required: true
    // },
    // brandName: {
    //     type: String,
    //     required: true
    // },
    batchNo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    // type: {
    //     type: String,
    //     // required: true
    // },
    createdAt: {
        type: Date,
        required: true
    },
    // content: {
    //     type: String,
    //     required: true
    // },
    barcode: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    plant: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    manufacturing: {
        type: Date,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
});



module.exports = mongoose.model('Batches', batchSchema);