const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const CategorySchema = require('../schemas/CategorySchema');
const OrderSchema = require('../schemas/OrderSchema');
const ProductSchema = require('../schemas/ProductSchema');


router.get('/get', async (req, res) => {
    const categories = await CategorySchema.find();
    const length = categories.length;

    let name = [];
    let sell = 0;
    let percentageOfSell = [];

    for (let i = 0; i < length; i++) {
        name[i] = categories[i].name
        sell += categories[i].sell
    }

    for (let i = 0; i < length; i++) {
        percentageOfSell[i] = (categories[i].sell / sell) * 100;
    }

    const piechart = {
        length: length,
        categories: name,
        percentage: percentageOfSell
    }

    // console.log(piechart)
    res.status(200).json(piechart)

})

router.post('/get/barGraph', async (req, res) => {
    const param = req.body.param;
    if (param === "yearly") {
        // console.log("jjsjsjsjs")
        const date = new Date()
        let productName = []
        let productSales = []
        const year = date.getFullYear();
        const products = await ProductSchema.find()
        // console.log(products)
        // console.log(new Date(`${year-1}-03-31`))
        for (let i = 0; i < products.length; i++) {
            let sales = 0;
            const orderData = await OrderSchema.find({
                $and: [{ productName: products[i].name }, {
                    createdAt: {
                        $lt: new Date(`${year}-03-31`),
                        $gt: new Date(`${year - 1}-04-01`)
                    }
                }]
            });
            productName[i] = products[i].name
            for (let j = 0; j < orderData.length; j++) {
                // console.log(orderData[j])
                sales += orderData[j].totalAmount
            }
            productSales[i] = sales;
            // console.log(orderData)
        }

        // console.log(productName)
        // console.log(productSales)

        const barGraph = {
            length: productName.length,
            categories: productName,
            productSales: productSales
        }
        res.status(200).json(barGraph)
    }
    else {
        const date = new Date()
        let productName = []
        let productSales = []
        let productSalesNew = []

        // productSalesQuarterly.fill(0)
        const year = date.getFullYear();
        const products = await ProductSchema.find()
        // console.log(products)
        // console.log(new Date(`${year-1}-03-31`))
        for (let i = 0; i < products.length; i++) {
            let productSalesQuarterly = new Array(4).fill(0)
            let sales = 0;
            const orderData = await OrderSchema.find({
                $and: [{ productName: products[i].name }, {
                    createdAt: {
                        $lt: new Date(`${year}-03-31`),
                        $gt: new Date(`${year - 1}-04-01`)
                    }
                }]
            });
            productName[i] = products[i].name
            // console.log(productSalesQuarterly[0])
            for (let j = 0; j < orderData.length; j++) {
                // console.log(orderData[j])
                if (orderData[j].createdAt.getMonth() + 1 >= 4 && orderData[j].createdAt.getMonth() + 1 <= 6) {
                    productSalesQuarterly[0] += orderData[j].totalAmount
                }
                else if (orderData[j].createdAt.getMonth() + 1 >= 7 && orderData[j].createdAt.getMonth() + 1 <= 9) {
                    productSalesQuarterly[1] += orderData[j].totalAmount
                }
                else if (orderData[j].createdAt.getMonth() + 1 >= 10 && orderData[j].createdAt.getMonth() + 1 <= 12) {
                    productSalesQuarterly[2] += orderData[j].totalAmount
                }
                else if (orderData[j].createdAt.getMonth() + 1 >= 1 && orderData[j].createdAt.getMonth() + 1 <= 3) {
                    // console.log("India")
                    productSalesQuarterly[3] += orderData[j].totalAmount
                }


            }
            productSales[i] = productSalesQuarterly
            // console.log(productSalesQuarterly)
        }

        // console.log(productSales[0][0])
        // console.log(productName)

        for (let i = 0; i < 4; i++) {
            let sales = 0
            for (let j = 0; j < productSales.length; j++) {
                sales += productSales[j][i]
            }
            productSalesNew[i] = sales
        }
        const barGraph = {
            length: productName.length,
            categories: productName,
            productSales: productSalesNew
        }
        res.status(200).json(barGraph)
    }
})

module.exports = router