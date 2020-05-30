require('dotenv').config()

const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true })

function connect () {
  client.connect(err => {
    console.log(err)

    const collection = client.db('wow').collection('users')
    // perform actions on the collection object
    client.close()
  })
}

module.exports = { connect }