const config = require('dotenv').config()

const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(config.DB_URL, { useNewUrlParser: true })

client.connect(err => {
  const collection = client.db('wow').collection("users")
  // perform actions on the collection object
  client.close()
})
