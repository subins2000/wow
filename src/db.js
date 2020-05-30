require('dotenv').config()

const mongoose = require('mongoose')
const User = require('./models/User')

function connect () {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
}

module.exports = { connect }
