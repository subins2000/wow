var express = require('express')
var router = express.Router()

const Rain = require('../models/RainMeasure')
const auth = require('../middleware/auth')

router.post('/add', auth, async (req, res) => {
  try {
    const rainModel = new Rain(req.body)
    console.log(req.body)
    const rain = await rainModel.save()
    res.status(200).send({
      id: rain._id
    })
  } catch (error) {
    res.status(400).send(error)
  }
})
// router.get('/list', async (req,res)=>{
//   try {
//     const rain = await Rain.find()
//     res.status(200).send(rain)
//   } catch (error) {
//     res.status(400).send(error)
//     console.log(error)
//   }
// })


module.exports = router