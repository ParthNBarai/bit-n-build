const mongoose = require("mongoose");

const workerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }


});


module.exports = mongoose.model('Worker', workerSchema);