const mongoose = require("mongoose");

// console.log(user-icon)
const categorySchema = mongoose.Schema({

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
    image: {
        type: String
    },
    sell: {
        type: Number,
        default: 0
    }
});



module.exports = mongoose.model('Categories', categorySchema);