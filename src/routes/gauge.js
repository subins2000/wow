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

    await RainMeasure.aggregate([
      {
        $match: {
          measurement: {
            $gte: 0
          },
          posted: {
            $gte: jan1ThisYear
          }
        }
      },
      {
        $group: {
          _id: '$gid',
          avgYear: { $avg: '$measurement' }
        }
      }
    ], async (error, gauges) => {
      if (error) {
        throw new Error({ error })
      }

      let gaugeInfo
      for (const k in gauges) {
        gaugeInfo = await Gauge.findOne({
          _id: gauges[k]._id
        }).lean()

        gauges[k] = { ...gauges[k], ...gaugeInfo }
      }

      res.status(200).send(gauges)
    })
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
