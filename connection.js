const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});

const connection = mongoose.connection

connection.on('connected', function() {
  console.log('connected to db')
})
connection.on('disconnected', function() {
  console.log('disconnected to db')
})
connection.on('error', function(error) {
  console.log('db connecton error', error)
})
