var express = require('express')
var router = express.Router()

const Rain = require('../models/MeasureRain')
const auth = require('../middleware/auth')
// /api/rain/add
// /api/rain/get?pincode=
// /api/rain/list
router.post('/add', auth, async (req, res) => {
    try {
        const rainModel = new Rain(req.body)
        await rainModel.save()

    } catch (error) {
        res.status(400).send(error)
    }
})