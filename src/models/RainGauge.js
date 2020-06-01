const mongoose = require('mongoose')

const schema = mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  },
  pincode: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
})
schema.pre('save', async function (next) {
  // TODO: check if user has already submitted today. Better do this in route/controller
  next()
})

const RainGauge = mongoose.model('RainGauge', schema)

module.exports = RainGauge
