const db = require('../model/users')
const randomPass = require('achim-salt')
const crypto = require('achim-crypto')
const jwt = require('jsonwebtoken')
const FB = require('fb')
//
// const login = (req, res) => {
//   FB.api('/me', {fields: ['id','name','email','picture']})
//   .then(response => {
//     res.send(response)
//     // db.create({
//     //   fb_id: response.id,
//     //   email: response.email,
//     //   img: response.picture.data.url,
//     //   name: response.name
//     // })
//     // .then(rows =>{
//     //   var token = jwt.sign(rows, 'apaaa')
//     //   res.send({token: token, name: rows.name})
//     // })
//     // .catch(err =>{
//     //   res.send(err)
//     // })
//  })
//  .catch(err =>{
//    res.send(err)
//  })
// }


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
        fb_id: response.id,
        email: response.email,
      }
      console.log(rows);
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
