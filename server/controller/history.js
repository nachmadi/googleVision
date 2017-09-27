const db = require('../model/history')
const FB = require('fb')

const getall = (req, res) =>{
  db.find()
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

const getid = (req, res) =>{
  db.find({
    author: req.headers.auth.id
  })
  .populate({path: 'author', select: 'name'})
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}


const insert = (req, res) =>{
  db.create({
    place: req.body.place,
    date: req.body.date,
    img: req.body.img,
    status: false,
    author: req.headers.auth.id
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

const remove = (req, res) => {
  db.remove({
    _id: req.params.id,
    author: req.headers.auth.id
  })
  .then(response => {
    res.send(response)
  })
  .catch(err =>{
    res.send(err)
  })
}



module.exports = {
  insert,
  getid,
  getall,
  remove
}
