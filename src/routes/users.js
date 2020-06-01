var express = require('express')
var router = express.Router()

const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.send({
      username: user.username,
      token
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  // Login a registered user
  try {
    const user = await User.findByCredentials(req.body.user, req.body.password)

    if (!user) {
      return res.status(401).send({
        error: 'Login failed! Check authentication credentials'
      })
    }

    res.send({
      username: user.username,
      token: user.token,
      name: user.name
    })
  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }
})

router.get('/info', auth, async (req, res) => {
  res.send({
    username: req.user.username,
    email: req.user.email,
    name: req.user.name
  })
})

router.get('/check', auth, async (req, res) => {
  res.status(200)
})

module.exports = router
