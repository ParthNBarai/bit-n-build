const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const CategorySchema = require('../schemas/CategorySchema');


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

module.exports = router