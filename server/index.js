import path from 'path'
import express from 'express'
import webpack from 'webpack'
import socket from 'socket.io'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import session from 'express-session'
import sharedSession from 'express-socket.io-session'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import main from './config/main'
import auth from './routes/auth'
import users from './routes/users'
import logout from './routes/logout'
import webpackConfig from '../webpack.config.dev'
import sessionMiddleWare from './routes/sessionMiddleWare'

const app = express()

const compiler = webpack(webpackConfig)
const sessionInstance = session({
  secret: "my-secret",
  resave: true,
  autoSave:true,
  saveUninitialized: true
})
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(sessionInstance)

app.use('/api/signUp', users)
app.use('/api/login', auth)
app.use('/api/logout', logout)
app.use('/api/me', sessionMiddleWare)

mongoose.connect(main.database)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
})

const io = socket(app.listen(3000, () => console.log('Running on localhost:3000')))

let allMessages = []
io.use(sharedSession(sessionInstance))

io.on("connection", function(socket) {
  console.log('We have a connection.')
  socket.on('new-message', function(msg) {
    io.emit('receive-message', socket.handshake.session.username + ': ' + msg)
    allMessages.push(socket.handshake.session.username + ': ' + msg)
  })

  allMessages.forEach(msg => {
    io.emit("receive-message", msg)
  })
})
