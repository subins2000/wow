var express = require('express')
var router = express.Router()

const Gauge = require('../models/RainGauge')
const auth = require('../middleware/auth')
const RainMeasure = require('../models/RainMeasure')

router.post('/add', auth, async (req, res) => {
  try {
    req.body.uid = req.user._id
    const gaugeModel = new Gauge(req.body)
    const gauge = await gaugeModel.save()
    res.status(201).send({
      id: gauge._id
    })
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
})

router.get('/getAll', async (req, res) => {
  try {
    const jan1ThisYear = new Date()
    jan1ThisYear.setUTCDate(1)
    jan1ThisYear.setUTCMonth(0)
    jan1ThisYear.setUTCHours(0)
    jan1ThisYear.setUTCMinutes = 0
    jan1ThisYear.setUTCMilliseconds = 0

    const gauge = await Gauge.find()
    // Wait
    gauge.forEach(async (item) => {
      const rmes = await RainMeasure.find({
        gid: item._id,
        posted: {
          $gte: jan1ThisYear
        }
      })
      var sum = 0
      var avg = 0.0
      rmes.forEach((rme) => {
        if (Number.isInteger(rme.measurement)) {
          sum += rme.measurement
        }
      })
      if (rmes.length > 0) {
        avg = sum / rmes.length
      }
      item.avgYear = avg
    })
    res.status(200).send(gauge)
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
})

router.get('/getMine', auth, async (req, res) => {
  try {
    const gauge = await Gauge.find({
      uid: req.user._id
    })
    res.status(200).send(gauge)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

// Ithaan sambhavam
