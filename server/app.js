const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://achim:mQ8sOpOikNKXTjWt@cluster0-shard-00-00-j6d3u.mongodb.net:27017,cluster0-shard-00-01-j6d3u.mongodb.net:27017,cluster0-shard-00-02-j6d3u.mongodb.net:27017/govision?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
  useMongoClient: true,
  promiseLibrary: global.Promise
});


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const users = require('./router/users')
const history = require('./router/history')

app.use('/', users)
app.use('/history', history)


app.listen(3000, ()=>{
  console.log('lagi dengerin port 3000 nich');
})
