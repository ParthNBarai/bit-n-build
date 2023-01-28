const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const categorySchema = require('../schemas/CategorySchema')
const multer = require('../middleware/multer')
require("dotenv/config");


//Route for adding new batch : /api/category/add
router.post('/add', async (req, res) => {
    try {
        const newCategory = new categorySchema({
            name: req.body.name,
            summary: req.body.summary,
            createdAt: Date.now(),
        })

        const saved = await newCategory.save();
        res.status(200).json({ message: "Category added successfully!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

router.get('/get', async (req, res) => {
    try {
        const categories = await categorySchema.find();
        // console.log(categories)
        res.status(200).json(categories)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router 