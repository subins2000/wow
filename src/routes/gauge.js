var express = require('express')
var router = express.Router()

const Gauge = require('../models/RainGauge')
const auth = require('../middleware/auth')
const Rmeasure = require('../models/RainMeasure')

router.post('/add', auth, async (req, res) => {
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
    //Wait
    gauge.forEach(async (item) => {
      console.log(item._id)
      const rmes = await Rmeasure.find({ "gid": item._id })
      var sum = 0
      var avg = 0.0
      rmes.forEach((subin) => {
        //sum += 
        if  (Number.isInteger(subin.measurement)){
          sum+=subin.measurement
        }
      })
      if (rmes.length>0){
        avg = sum / rmes.length
        console.log(avg)
      }
      
    })
    res.status(200).send(avg)
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
})

module.exports = router

//Ithaan sambhavam
