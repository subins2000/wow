var express = require('express')
var router = express.Router()

const Gauge = require('../models/rainGauge')
const auth = require('../middleware/auth')

router.post('/register',async (req,res)=>{
    try{
        const gaugeModel=new Gauge(req.body)
        await gaugeModel.save()
        res.send(Gauge.find().all())
    }
    catch(error){
        res.status(400).send(error)
        console.log(error)
    }
})

module.exports = router