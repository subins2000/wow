var express = require('express')
var router = express.Router()

const RainMeasure = require('../models/RainMeasure')
const auth = require('../middleware/auth')

router.post('/add', auth, async (req, res) => {
  try {
    if (req.body.measurement === '0') {
      req.body.measured = '0'
    }

    const rainModel = new RainMeasure({
      gid: req.body.gid,
      measurement: req.body.measurement,
      measured: req.body.measured,
      notes: req.body.notes
    })

    const rain = await rainModel.save()
    res.status(200).send({
      id: rain._id
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/measurements/24Hours', async (req, res) => {
  try {
    const last24Hours = new Date()
    last24Hours.setHours(-24)

    await RainMeasure.aggregate([
      {
        $match: {
          measurement: {
            $gte: 0
          },
          posted: {
            $gte: last24Hours
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

router.get('/measurements/mine', auth, async (req, res) => {
  try {
    const measurements = await RainMeasure.find({
      uid: req.user.id
    }).lean()
    res.status(200).send(measurements)
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
})

module.exports = router
