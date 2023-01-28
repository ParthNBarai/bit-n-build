const mongoose = require("mongoose");

// console.log(user-icon)
const soldSchema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Sold', soldSchema);