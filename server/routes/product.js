const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const productSchema = require('../schemas/ProductSchema')


//Route for adding new batch : /api/product/add
router.post('/add', async (req, res) => {

    try {

        const newProduct = new productSchema({
            categoryName: req.body.categoryName,
            brandName: req.body.brandName,
            name: req.body.name,
            summary: req.body.summary,
            type: req.body.type,
            threshold: req.body.threshold,
            price: req.body.price,
        })

        const saved = await newProduct.save()
        res.status(200).json({ message: "Product added!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router 