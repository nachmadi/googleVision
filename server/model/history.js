const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  tempat: String,
  tanggal: String,
  img: String,
  status: false,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
})

const History = mongoose.model('History', historySchema)

module.exports = History
