const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
// console.log(user-icon)
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);