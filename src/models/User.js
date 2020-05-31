const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  token: {
    type: String
  },
  name: {
    type: String
  }
})

schema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

schema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({
    _id: user._id,
    expiresIn: '30d'
  }, process.env.JWT_KEY)
  user.token = token
  await user.save()
  return token
}

schema.statics.findByCredentials = async (userIdentifier, password) => {
  // Search for a user by email or username and password.
  const user = await User.findOne({ username: userIdentifier }) || await User.findOne({ email: userIdentifier })

  if (!user) {
    throw new Error('Invalid login credentials')
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials')
  }
  return user
}

const User = mongoose.model('User', schema)

module.exports = User
