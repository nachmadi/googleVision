const db = require('../model/users')
const jwt = require('jsonwebtoken')
const FB = require('fb')

// const randomPass = require('achim-salt')
// const crypto = require('achim-crypto')


const login = (req, res) => {
  FB.api('/me', {fields: ['id','name','email','picture']}, (response) => {
    // res.send(response)
    console.log(response);
    db.create({
      fb_id: response.id,
      email: response.email,
      img: response.picture.data.url,
      name: response.name
    })
    .then(rows =>{
      var siapBungkus = {
        id: rows._id,
        fb_id: rows.id,
        email: rows.email,
        name: rows.name
      }
      var token = jwt.sign(siapBungkus, 'apaaa')
      res.send({token: token, name: rows.name})
    })
    .catch(err =>{
      res.send(err)
    })
  })
}



module.exports = {
  login,
}
