import express from 'express'
import validateInput from '../shared/validations/login'
import bcrypt from 'bcrypt'
import User from '../config/user'
import session from 'express-session'

let router = express.Router()

router.post('/', (req, res) => {
    const { username, password } = req.body

    User.findOne({username: username}, function (err, user) {
      if(err) {
        console.log(err)
        return res.status(500).send()
      }
      if(user) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if(err){
           return res.status(500).json({ error: err })
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
