const express = require('express')
const router = express.Router();
require("dotenv/config");
const userSchema = require('../schemas/UserSchema')
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");


router.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(userSchema.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
    }
));

router.get("/logout", (req, res) => {
    req.logout(console.log);
    res.redirect("http://localhost:3000");
});

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.CLIENT_ID,
//             clientSecret: process.env.CLIENT_SECRET,
//             callbackURL: "/auth/google/callback",
//         },
//         function (accessToken, refreshToken, profile, done) {
//             done(null, profile);
//             console.log(profile);
//         }
//     )
// );

module.exports = { passport, router }