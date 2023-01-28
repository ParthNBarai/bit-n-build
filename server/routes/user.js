const express = require('express')
const router = express.Router();
const userSchema = require('../schemas/UserSchema')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
require("dotenv/config");

router.post('/signup', async (req, res) => {
    try {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newUser = new userSchema({
            id: req.body.password,
            username: req.body.name,
            email: req.body.email,
        })

        const saved = await newUser.save();
        // console.log(saved)
        res.status(200).json("User Created!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router 