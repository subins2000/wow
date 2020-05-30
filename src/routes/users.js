var express = require('express')
var router = express.Router()

const User = require('../models/User')

router.post('/register', async (req, res, next) => {
  try {
    console.log(req.body)
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
