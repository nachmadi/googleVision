const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const index = require('./router/index')

app.use('/', index)

app.listen(3000, ()=>{
  console.log('lagi dengerin port 3000 nich');
})
