const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const retailerSchema = require('../schemas/RetailerSchema');

//Route for adding new batch : /api/retailer/add
router.post('/add', async (req, res) => {
    try {
        const newRetailer = new retailerSchema({
            retailerName: req.body.name,
            phone: req.body.phone,
            summary: req.body.summary,
            createdAt: Date.now(),
            address: req.body.address
        })

        const saved = await newRetailer.save();
        res.status(200).json({ message: "Retailer added!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router 