const mongoose = require('mongoose')
const RainGauge = require('./RainGauge')

const schema = mongoose.Schema({
  gid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RainGauge',
    required: true
  },
  measurement: {
    type: Number
  },
  measured: {
    type: Date,
    required: true
  },
  posted: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
})

schema.pre('save', async function (next) {
  // TODO: check if user has already submitted today. Better do this in route/controller
  next()
})

const RainMeasure = mongoose.model('RainMeasure', schema)

module.exports = RainMeasure
