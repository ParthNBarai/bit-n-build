const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const brandSchema = require('../schemas/BrandSchema')
const multer = require('../middleware/multer')
require("dotenv/config");


//Route for adding new batch : /api/category/add
router.post('/add', multer.upload.single('image'), async (req, res) => {
    try {
        const newBrand = new brandSchema({
            name: req.body.name,
            summary: req.body.summary,
            createdAt: Date.now(),
            category: req.body.category
        })

        const saved = await newBrand.save();
        res.status(200).json({ message: "Brand added successfully!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router 