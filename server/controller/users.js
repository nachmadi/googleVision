const db = require('../model/users')
const randomPass = require('achim-salt')
const crypto = require('achim-crypto')
const jwt = require('jsonwebtoken')

const registerfb = (req, res) => {
  db.find({
    email: req.params.email
  })
  .then(response => {
    if(response.length === 0) {
      var secretKey = randomPass()
      var newPass = crypto(randomPass(), secretKey)
      db.create({
        email: req.body.email,
        username: req.body.username,
        password: newPass,
        secret: secretKey
        img: req.body.img
      })
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        res.send(err)
      })
    } else {
      res.send('user telah terdaftar')
    }
  })
  .catch(err => {
    res.send(err)
  })
}

const login = (req, res) => {
  db.find({
    _id: req.params.id
  })
  .then(response => {
    var token = jwt.sign({
      email: response.email
      username: response.username
    })
    res.send({token: token, username: response.username})
  })
  .catch(err => {
    res.send(err)
  })
}


module.exports = {
  login,
  registerfb
}
