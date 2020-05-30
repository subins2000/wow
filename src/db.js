require('dotenv').config()

const mongoose = require('mongoose')

function connect () {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
}

module.exports = { connect }
