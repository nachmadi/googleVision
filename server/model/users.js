const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fb_id: String,
  name: String,
  email: String,
  img: String,
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
