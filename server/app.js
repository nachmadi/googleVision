const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/travel', {
  useMongoClient: true,
  promiseLibrary: global.Promise
});


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const users = require('./router/users')
const history = require('./router/history')

app.use('/', users)
app.use('/asdad', history)


app.listen(3000, ()=>{
  console.log('lagi dengerin port 3000 nich');
})
