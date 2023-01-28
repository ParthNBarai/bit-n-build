const mongoose = require("mongoose");

// console.log(user-icon)
const brandSchema = mongoose.Schema({
    name: {
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
    category: {
        types: String,
        required: true
    }
});



module.exports = mongoose.model('Brands', brandSchema);