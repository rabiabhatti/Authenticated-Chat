import express from 'express'
import bcrypt from 'bcrypt'

import User from '../config/user'

let router = express.Router()

router.post('/', (req, res) => {
    const { username, password } = req.body

    User.findOne({username: username}, function (err, user) {
      if(err) {
        return res.status(500).json({ errors: err })
      }
      if(user) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if(err){
           return res.status(500).json({ errors: err })
          }
         if(isMatch) {
           req.session.username = user.username
           req.session.save()
            res.json({
               success: true,  user: req.session.username
             })
         } else {
           return res.status(401).json({ errors: { form: "Invalid Credentials" } })
         }
        })
      } else {
        return res.status(401).json({ errors: { form: "Invalid Credentials" } })
      }
    })
})

export default router
