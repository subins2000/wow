var express = require('express')
var router = express.Router()

const Gauge = require('../models/RainGauge')
const auth = require('../middleware/auth')

router.post('/add', async (req, res) => {
  try {
    const gaugeModel = new Gauge(req.body)
    const gauge = await gaugeModel.save()
    res.status(200).send({
      id: gauge._id
    })
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
})

router.get('/getAll', async (req, res) => {
  try {
    const gauge = await Gauge.find()
    res.status(200).send(gauge)
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
})

module.exports = router
