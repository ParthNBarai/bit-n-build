const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const OrderSchema = require('../schemas/OrderSchema');
const batchSchema = require('../schemas/BatchSchema');
const CategorySchema = require('../schemas/CategorySchema');
const ProductSchema = require('../schemas/ProductSchema');
const e = require('express');

router.post('/add', async (req, res) => {
    try {

        const product = await batchSchema.find({ name: req.body.productName }).sort({ expiry: 1 })
        const productname = await ProductSchema.findOne({ name: req.body.productName })
        const category = await CategorySchema.findOne({ name: req.body.categoryName })
        // console.log(product[0].expiry)
        let sales = req.body.totalAmount
        // console.log(sales)
        sales += productname.sales
        let sell = req.body.quantity;
        sell += category.sell
        // console.log(sell)
        // console.log(product)
        let quantity = req.body.quantity;
        // let newQty = 0;
        let flag
        let i = 0;
        let remove = [];
        let remQty = [];
        let expiry = [];
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
                flag = true
                remQty[i] = quantity
                quantity -= product[i].quantity
                remove[i] = product[i].batchNo;
                expiry[i] = product[i].expiry
                console.log(expiry[i])
                i++;
            }
        }
        // console.log(remove)
        if (flag) {
            // console.log("Inside if flag")
            // console.log(remQty)
            for (let index = 0; index < i; index++) {
                if (index + 1 < i) {
                    remQty[index] = remQty[index] - remQty[index + 1];
                }
                const newOrder = new OrderSchema({
                    batchNo: remove[index],
                    retailerName: req.body.retailerName,
                    createdAt: Date.now(),
                    categoryName: req.body.categoryName,
                    productName: req.body.productName,
                    quantity: remQty[index],
                    totalAmount: req.body.totalAmount,
                    status: req.body.status,
                    description: req.body.description,
                    expiry: expiry[index]
                })
                const saved = await newOrder.save()
                // console.log("Inside if flag")
                // console.log(saved)
            }
        }

        else {
            const newOrder = new OrderSchema({
                batchNo: product[0].batchNo,
                retailerName: req.body.retailerName,
                createdAt: Date.now(),
                categoryName: req.body.categoryName,
                productName: req.body.productName,
                quantity: req.body.quantity,
                totalAmount: req.body.totalAmount,
                status: req.body.status,
                description: req.body.description,
                expiry: product[0].expiry
            })
            const saved = await newOrder.save()
        }


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

        const setSell = await CategorySchema.updateOne({ name: req.body.categoryName }, {
            $set: {
                sell: sell
            }
        })
        const setSales = await ProductSchema.updateOne({ name: req.body.productName }, {
            $set: {
                sales: sales
            }
        })
        // console.log(setSales)
        res.status(200).json({ message: "New Order placed!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

router.get('/get', async (req, res) => {
    try {
        const orders = await OrderSchema.find().sort({ expiry: 1 });
        res.status(200).json(orders)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router