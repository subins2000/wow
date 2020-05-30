require('dotenv').config()

const mongoose = require('mongoose')
const User = require('./models/User')

const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true })

function connect () {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
}

module.exports = { connect }
