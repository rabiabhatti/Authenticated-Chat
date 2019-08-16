import express from 'express'
import session from 'express-session'

function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  } else {
    next()
  }
}
