const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../Authentication/GetBearerToken')
const fetchuser = require('../middleware/fetchuser')
const userSchema = require('../schemas/UserSchema')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
require("dotenv/config");


//Route for user signup : /api/user/signup
router.post('/signup', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid Email').isEmail()
], async (req, res) => {
    try {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newUser = new userSchema({
            id: req.body.password,
            username: req.body.name,
            email: req.body.email,
        })

        const newUserToken = {
            email: newUser.email,
            name: newUser.name,
        }
        // console.log(newUser)
        const jsontoken = await auth.tokenGenerate(req, res, newUserToken);
        const saved = await newUser.save();
        // console.log(saved)
        res.status(200).json({
            success: 1,
            message: "Successful signup!",
            token: jsontoken,
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})


//Route for user login : /api/user/login
router.post('/login', [
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid Email').isEmail()
], async (req, res) => {
    try {
        const user = { email: req.body.email };
        userSchema.findOne({ email: req.body.email })
            .exec()
            .then(async user => {
                // console.log(user)
                if (!user) {
                    return res.status(403).json({
                        error: {
                            message: "User Not Found, Kindly Register!"
                        }
                    })
                }

                else {
                    const result = compareSync(req.body.password, user.id);
                    if (result) {
                        user.id = undefined;
                        const newUser = {
                            email: user.email,
                            name: user.name,
                        }
                        // console.log(newUser)
                        const jsontoken = await auth.tokenGenerate(req, res, newUser);

                        // console.log("refresh")
                        // console.log(refresh)

                        return res.status(200).json({
                            success: 1,
                            message: "Successful login!",
                            token: jsontoken,

                        });
                    }
                    else {
                        // console.log(err.message)
                        return res.status(403).json({
                            error: {
                                message: "Username or Password Invalid!"
                            }
                        })
                    }

                }

            })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})
module.exports = router 