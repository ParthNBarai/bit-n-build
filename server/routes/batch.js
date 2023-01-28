const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const BatchSchema = require('../schemas/BatchSchema')


//Route for adding new batch : /api/batch/add
router.post('/add', async (req, res) => {
    try {
        const product = await BatchSchema.find()
        let barcode = req.body.barcode
        let batchNo = req.body.batchNo
        if (product.length >= 1) {

            // console.log(product[product.length - 1])
            barcode = product[product.length - 1].barcode
            batchNo = product[product.length - 1].batchNo
        }
        const newBatch = new BatchSchema({
            // categoryName: req.body.categoryName,
            // brandName: req.body.brandName,
            batchNo: batchNo + 1,
            name: req.body.name,
            summary: req.body.summary,
            // type: req.body.type,
            createdAt: Date.now(),
            // content: req.body.content,
            barcode: barcode + 1,
            category: req.body.category,
            plant: req.body.plant,
            quantity: req.body.quantity,
            manufacturing: req.body.manufacturing,
            amount: req.body.amount,
            expiry: req.body.expiry,
        })



        const savedNew = await newBatch.save();
        res.status(200).json({ message: "Batch added!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router 