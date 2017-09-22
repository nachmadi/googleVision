const express = require('express')
const router = express.Router()
const history = require('../controller/history')
const jwt = require('jsonwebtoken')

const midty = (req, res, next) => {
  if(req.headers.hasOwnProperty('token')){
    var decoded = jwt.verify(req.headers.token, "apaaa")
    console.log('==============================',decoded);
    req.headers.auth = decoded
    console.log("=============================>", req.headers.auth);
    next()
  }
  else {
    res.send("maaf anda harus login")
  }
}

router.get('/all', history.getall)
router.get('/', midty, history.getid)
router.post('/', midty, history.insert)
router.delete('/:id', midty ,history.remove)


module.exports = router
