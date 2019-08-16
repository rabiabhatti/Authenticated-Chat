import express from 'express'
import session from 'express-session'
import User from '../config/user'

let router = express.Router()

router.post('/', (req, res) => {
  if (req.session && req.session.username) {
    User.findOne({ username: req.session.username }, function(err, user) {
      if (user) {
        res.json({
           loggedIn: true,  user: req.session.username
         })
      } else {
        return res.status(200).json({ errors: ["Unauthorized user"] })
      }
  })
} else {
  return res.status(200).json({ errors: ["Unauthorized user"] })
}
})

export default router
