const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./User')

const measureRainSchema = mongoose.Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  measurement: {
    type: Number
  },
  posted: {
    type: Date,
    default: Date.now
  }
})

measureRainSchema.pre('save', async function (next) {
  // TODO: check if user has already submitted today. Better do this in route/controller
  next()
})

const MeasureRain = mongoose.model('MeasureRain', measureRainSchema)

module.exports = MeasureRain
