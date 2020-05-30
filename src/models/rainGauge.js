const mongoose = require('mongoose')
const locSchema = mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
})
const gaugeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    coord: [locSchema]
})
gaugeSchema.pre('save', async function (next) {
    // TODO: check if user has already submitted today. Better do this in route/controller
    next()
})

const GaugeData = mongoose.model('GaugeData', gaugeSchema)

module.exports = GaugeData
