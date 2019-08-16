import express from 'express'
import bcrypt from 'bcrypt'

import User from '../config/user'
import validateInput from '../shared/validations/signup'

let router = express.Router()


router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body)

    if (isValid) {
      let { username, password, email } = req.body;
      let password_code = bcrypt.hashSync(password, 10);

      let newuser = new User({
        username, email, password: password_code,
      }).save()
      .then( newuser =>
        res.json({ success: true })
      )
      .catch(err => res.status(500).json({ error: err }))
    } else {
      res.status(400).json(errors);
    }
})

export default router
