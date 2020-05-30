const mongoose = require('mongoose')

const gaugeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
})
gaugeSchema.pre('save', async function (next) {
  // TODO: check if user has already submitted today. Better do this in route/controller
  next()
})

const GaugeData = mongoose.model('GaugeData', gaugeSchema)

module.exports = GaugeData
