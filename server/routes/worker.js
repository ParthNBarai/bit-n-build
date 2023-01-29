const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../Authentication/GetBearerToken')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const WorkerSchema = require('../schemas/WorkerSchema');
const multer = require('multer');



router.post('/signup', async (req, res) => {
    try {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        const newWorker = new WorkerSchema({
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
        })

        const saved = await newWorker.save();
        res.status(200).json(newWorker)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = { phone: req.body.phone };
        WorkerSchema.findOne({ phone: req.body.phone })
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
                    const result = compareSync(req.body.password, user.password);
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
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router