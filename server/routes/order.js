const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const OrderSchema = require('../schemas/OrderSchema');
const batchSchema = require('../schemas/BatchSchema')

router.post('/add', async (req, res) => {
    try {

        const product = await batchSchema.find({ name: req.body.productName }).sort({ expiry: 1 })

        // console.log(product)
        let quantity = req.body.quantity;
        // let newQty = 0;
        let i = 0;
        let remove = [];
        if (quantity < product[0].quantity) {
            quantity = product[0].quantity - quantity
            const updateBatch = await batchSchema.updateOne({ batchNo: product[0].batchNo }, {
                $set:
                {
                    quantity: quantity
                }
            })
        }
        else if (quantity == product[0].quantity) {
            quantity = 0;
            // remove[0] = product[0].batchNo;
            await batchSchema.deleteOne({ batchNo: product[0].batchNo })
        }
        else {
            while (quantity > 0) {
                // console.log("inside loop")
                quantity -= product[i].quantity
                remove[i] = product[i].batchNo;
                i++;
            }
        }
        // console.log(remove)
        const newOrder = new OrderSchema({
            batchNo: req.body.batchNo,
            retailerName: req.body.retailerName,
            createdAt: Date.now(),
            categoryName: req.body.categoryName,
            productName: req.body.productName,
            quantity: req.body.quantity,
            totalAmount: req.body.totalAmount,
            status: req.body.status,
            description: req.body.description,
        })

        const saved = await newOrder.save()

        for (let j = 0; j < i - 1; j++) {
            const deleteDate = await batchSchema.deleteOne({ batchNo: remove[j] })
            // console.log(deleteDate)
        }
        // const deleteData = await batchSchema.deleteMany({ batchNo: remove })
        // console.log(deleteData)
        // console.log(quantity)
        if (quantity < 0) {
            quantity = 0 - quantity
            const updateBatch = await batchSchema.updateOne({ batchNo: remove[remove.length - 1] }, {
                $set:
                {
                    quantity: quantity
                }
            })
        }
        res.status(200).json({ message: "New Order placed!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router