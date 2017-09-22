const express = require('express')
const router = express.Router()
const users = require('../controller/users')
const FB = require('fb')
const fb = new FB.Facebook({version: 'v2.10'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.fbaccesstoken);
  next()
}

router.get('/login', setAccessToken, users.login)

// router.get('/login', setAccessToken, (req, res) => {
//   FB.api('/me', {fields: ['id','name','email','picture']}, (response) => {
//     res.send(response)
//   })
// })
//

module.exports = router
