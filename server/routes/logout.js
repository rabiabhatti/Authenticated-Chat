import express from 'express'
import session from 'express-session'

let router = express.Router()


router.post('/', (req, res) => {
  req.session.destroy()
  res.json({status: 1})
})

export default router
