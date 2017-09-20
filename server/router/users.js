const express = require('express')
const router = express.Router()
const users = require('../controller/users')

router.post('/login/:id', users.login)
router.post('/register/:email', users.registerfb)



module.exports = router
