import mongoose from 'mongoose'
import main from './main'

import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

let User = new mongoose.Schema({
  username: {
    type: Schema.Types.String,
    unique: true,
    required: true
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  }
})

User.plugin(uniqueValidator)

module.exports = mongoose.model('User', User)
