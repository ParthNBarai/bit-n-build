const mongoose = require("mongoose");

// console.log(user-icon)
const productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true
    }

});



module.exports = mongoose.model('Product', productSchema);